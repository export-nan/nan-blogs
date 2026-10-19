<script lang="ts">
const pendingImages = new Map<Element, () => void>();
let imageObserver: IntersectionObserver | undefined;

function observeImage(target: Element, load: () => void): () => void {
  if (typeof IntersectionObserver === 'undefined') {
    load();
    return () => {};
  }
  imageObserver ??= new IntersectionObserver((entries, observer) => {
    if (observer !== imageObserver) return;
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      const start = pendingImages.get(entry.target);
      pendingImages.delete(entry.target);
      observer.unobserve(entry.target);
      start?.();
    }
    if (!pendingImages.size) {
      observer.disconnect();
      imageObserver = undefined;
    }
  }, { rootMargin: '300px 0px', threshold: 0 });
  pendingImages.set(target, load);
  imageObserver.observe(target);

  return () => {
    if (pendingImages.get(target) !== load) return;
    pendingImages.delete(target);
    imageObserver?.unobserve(target);
    if (!pendingImages.size) {
      imageObserver?.disconnect();
      imageObserver = undefined;
    }
  };
}
</script>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import ImageSkeleton from './ImageSkeleton.vue';

const props = defineProps<{ src: string; alt: string; width: number; height: number }>();
const container = ref<HTMLElement>();
const imageElement = ref<HTMLImageElement>();
const imageSource = ref<string>();
const status = ref<'waiting' | 'loading' | 'loaded' | 'error'>('waiting');
const revision = ref(0);
const ratio = computed(() => Number.isFinite(props.width) && props.width > 0 && Number.isFinite(props.height) && props.height > 0
  ? props.width / props.height : 1);
let mounted = false;
let stopObserving = () => {};

function isCurrent(image: HTMLImageElement, request: number) {
  return mounted && request === revision.value && image === imageElement.value && imageSource.value === props.src;
}

async function finishLoading(image: HTMLImageElement, request: number) {
  if (!isCurrent(image, request) || status.value !== 'loading') return;
  try {
    if (typeof image.decode === 'function') await image.decode();
  } catch {
    // A successful load can still be displayed when decode() is unavailable or rejects.
  }
  if (!isCurrent(image, request) || status.value !== 'loading') return;
  status.value = image.naturalWidth > 0 ? 'loaded' : 'error';
}

function onLoad(event: Event) {
  void finishLoading(event.currentTarget as HTMLImageElement, revision.value);
}

function onError(event: Event) {
  if (isCurrent(event.currentTarget as HTMLImageElement, revision.value)) status.value = 'error';
}

function reset() {
  const request = ++revision.value;
  stopObserving();
  imageSource.value = undefined;
  status.value = 'waiting';
  if (!mounted || !container.value) return;

  stopObserving = observeImage(container.value, () => {
    if (!mounted || request !== revision.value) return;
    if (!props.src) {
      status.value = 'error';
      return;
    }
    status.value = 'loading';
    imageSource.value = props.src;
    void nextTick(() => {
      const image = imageElement.value;
      if (!image || !isCurrent(image, request) || !image.complete) return;
      if (image.naturalWidth > 0) void finishLoading(image, request);
      else status.value = 'error';
    });
  });
}

onMounted(() => {
  mounted = true;
  reset();
});
watch(() => props.src, reset, { flush: 'sync' });
onBeforeUnmount(() => {
  mounted = false;
  revision.value++;
  stopObserving();
});
</script>

<template>
  <div ref="container" class="lazy-image" :style="{ aspectRatio: ratio }">
    <ImageSkeleton v-if="status === 'waiting' || status === 'loading'" class="lazy-image__skeleton" aria-hidden="true" />
    <img v-if="imageSource" :key="revision" ref="imageElement" v-show="status === 'loaded'" class="lazy-image__image"
      :src="imageSource" :alt="alt" :width="width" :height="height" loading="eager" decoding="async" @load="onLoad" @error="onError">
    <span v-if="status === 'loading'" class="lazy-image__status" role="status">正在加载图片…</span>
    <span v-else-if="status === 'error'" class="lazy-image__error" role="status">图片加载失败</span>
  </div>
</template>

<style scoped>
.lazy-image {
  position: relative;
  display: block;
  width: 100%;
  overflow: hidden;
  border-radius: inherit;
}

.lazy-image > .lazy-image__skeleton,
.lazy-image > .lazy-image__image,
.lazy-image > .lazy-image__error {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.lazy-image__image {
  display: block;
  object-fit: contain;
}

.lazy-image__error {
  display: grid;
  place-items: center;
  padding: .75rem;
  box-sizing: border-box;
  color: var(--vp-c-text-mute, #777);
  font-size: .85rem;
}

.lazy-image__status {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  clip-path: inset(50%);
  white-space: nowrap;
  border: 0;
}
</style>
