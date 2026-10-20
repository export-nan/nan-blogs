<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';

interface RevealSession {
  id: number; src: string; width: number; height: number;
  image?: HTMLImageElement; context?: CanvasRenderingContext2D; pixels?: ImageData;
  source?: Uint32Array; output?: Uint32Array; order?: Uint32Array;
  canvasWidth: number; canvasHeight: number; painted: number; total: number;
  progress: number; startedAt?: number; finishing: boolean; complete: boolean;
}
const props = defineProps<{ src: string; width: number; height: number }>();
const emit = defineEmits<{ progress: [fraction: number, src: string]; complete: [src: string] }>();
const container = ref<HTMLElement>();
const canvas = ref<HTMLCanvasElement>();
const nativeImage = ref<HTMLImageElement>();
const activeSource = ref<string>();
const revealVisible = ref(false);
const nativeReady = ref(false);
const revision = ref(0);
let mounted = false;
let session: RevealSession | undefined;
let frame: number | undefined;
let resizeObserver: ResizeObserver | undefined;
let motionQuery: MediaQueryList | undefined;
const duration = 260;

function current(request: RevealSession) {
  return mounted && request === session;
}

function cancelFrame() {
  if (frame !== undefined) cancelAnimationFrame(frame);
  frame = undefined;
}

function releasePixels(request: RevealSession) {
  const buffer = request.context?.canvas;
  if (buffer) {
    buffer.width = 0;
    buffer.height = 0;
  }
  request.context = undefined;
  request.pixels = undefined;
  request.source = undefined;
  request.output = undefined;
  request.order = undefined;
  request.image = undefined;
}

function report(request: RevealSession, fraction: number) {
  if (!current(request)) return;
  const progress = Math.max(request.progress, Math.min(1, Math.max(0, fraction)));
  if (progress === request.progress) return;
  request.progress = progress;
  emit('progress', progress, request.src);
}

async function finish(request: RevealSession) {
  if (!current(request) || request.finishing || request.complete) return;
  request.finishing = true;
  cancelFrame();
  await nextTick();
  if (!current(request)) return;
  const image = nativeImage.value;
  try {
    if (image && typeof image.decode === 'function') await image.decode();
  } catch {
    // The parent already validated the source; keep a native image fallback.
  }
  if (!current(request)) return;
  revealVisible.value = true;
  nativeReady.value = true;
  await nextTick();
  if (!current(request)) return;
  releasePixels(request);
  report(request, 1);
  if (!current(request)) return;
  request.complete = true;
  emit('complete', request.src);
}

function paint(request: RevealSession, target: number) {
  if (!request.context || !request.pixels || !request.source || !request.output || !request.order || target <= request.painted) return;
  let left = request.canvasWidth, top = request.canvasHeight, right = 0, bottom = 0;
  for (let point = request.painted; point < target; point++) {
    const index = request.order[point];
    request.output[index] = request.source[index];
    const x = index % request.canvasWidth;
    const y = Math.floor(index / request.canvasWidth);
    left = Math.min(left, x); right = Math.max(right, x);
    top = Math.min(top, y); bottom = Math.max(bottom, y);
  }
  request.context.putImageData(request.pixels, 0, 0, left, top, right - left + 1, bottom - top + 1);
  request.painted = target;
  report(request, target / request.total);
}

function prepare(request: RevealSession) {
  const bounds = container.value?.getBoundingClientRect();
  if (!bounds || bounds.width <= 0 || bounds.height <= 0 || !canvas.value || !request.image) return false;
  const density = Number.isFinite(window.devicePixelRatio) && window.devicePixelRatio > 0 ? window.devicePixelRatio : 1;
  const width = Math.max(1, Math.round(bounds.width * density));
  const height = Math.max(1, Math.round(bounds.height * density));
  if (width === request.canvasWidth && height === request.canvasHeight) return true;
  const context = canvas.value.getContext('2d', { alpha: true });
  const sample = document.createElement('canvas');
  const sampleContext = sample.getContext('2d', { willReadFrequently: true });
  if (!context || !sampleContext) throw new Error('Canvas is unavailable.');
  canvas.value.width = sample.width = width;
  canvas.value.height = sample.height = height;
  sampleContext.drawImage(request.image, 0, 0, width, height);
  const source = sampleContext.getImageData(0, 0, width, height);
  sample.width = sample.height = 0;
  request.source = new Uint32Array(source.data.buffer, source.data.byteOffset, width * height);
  request.pixels = context.createImageData(width, height);
  request.output = new Uint32Array(request.pixels.data.buffer, request.pixels.data.byteOffset, width * height);
  request.order = Uint32Array.from({ length: width * height }, (_, index) => index);
  for (let index = request.order.length - 1; index > 0; index--) {
    const other = Math.floor(Math.random() * (index + 1));
    [request.order[index], request.order[other]] = [request.order[other], request.order[index]];
  }
  request.context = context;
  request.canvasWidth = width; request.canvasHeight = height;
  request.total = width * height; request.painted = 0;
  request.startedAt ??= performance.now();
  // Rebuild at the current fraction after resize; never report a smaller fraction.
  paint(request, Math.min(request.total, Math.ceil(request.progress * request.total)));
  if (current(request)) revealVisible.value = true;
  return true;
}

function queueFrame(request: RevealSession) {
  if (!current(request) || request.finishing || frame !== undefined) return;
  const scheduled = requestAnimationFrame(time => {
    if (frame === scheduled) frame = undefined;
    if (!current(request) || request.finishing) return;
    try {
      if (prepare(request)) {
        const fraction = Math.min(1, Math.max(0, (time - request.startedAt!) / duration));
        paint(request, Math.max(request.painted, Math.floor(request.total * fraction)));
        if (request.painted === request.total) {
          void finish(request);
          return;
        }
      }
      queueFrame(request);
    } catch {
      void finish(request);
    }
  });
  frame = scheduled;
}

function refresh() {
  const request = session;
  if (!request || !current(request) || !request.image || request.finishing || request.complete) return;
  if (motionQuery?.matches) {
    void finish(request);
    return;
  }
  try {
    if (prepare(request) && request.painted === request.total) void finish(request);
    else queueFrame(request);
  } catch {
    void finish(request);
  }
}

function start() {
  cancelFrame();
  if (session) releasePixels(session);
  const request: RevealSession = {
    id: ++revision.value, src: props.src, width: props.width, height: props.height,
    canvasWidth: 0, canvasHeight: 0, painted: 0, total: 0, progress: 0,
    finishing: false, complete: false,
  };
  session = request;
  revealVisible.value = false;
  nativeReady.value = false;
  activeSource.value = request.src;
  emit('progress', 0, request.src);
  void (async () => {
    await nextTick();
    if (!current(request)) return;
    try {
      const image = new Image();
      image.src = request.src;
      await image.decode();
      if (!current(request)) return;
      if (image.naturalWidth !== request.width || image.naturalHeight !== request.height) throw new Error('Unexpected reveal dimensions.');
      request.image = image;
      refresh();
    } catch {
      if (current(request)) void finish(request);
    }
  })();
}

onMounted(() => {
  mounted = true;
  motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  motionQuery.addEventListener('change', refresh);
  if (typeof ResizeObserver !== 'undefined') {
    resizeObserver = new ResizeObserver(refresh);
    if (container.value) resizeObserver.observe(container.value);
  } else window.addEventListener('resize', refresh);
  start();
});
watch(() => [props.src, props.width, props.height], () => {
  if (mounted) start();
}, { flush: 'sync' });
onBeforeUnmount(() => {
  mounted = false;
  if (session) releasePixels(session);
  session = undefined;
  revision.value++;
  cancelFrame();
  resizeObserver?.disconnect();
  motionQuery?.removeEventListener('change', refresh);
  window.removeEventListener('resize', refresh);
});
</script>

<template>
  <div ref="container" class="pixel-reveal" :class="{ 'is-visible': revealVisible }">
    <img v-if="activeSource" :key="revision" ref="nativeImage" v-show="nativeReady" :src="activeSource" :width="width" :height="height" alt="" aria-hidden="true" decoding="async">
    <canvas v-if="!nativeReady" :key="`canvas-${revision}`" ref="canvas" aria-hidden="true"></canvas>
  </div>
</template>

<style scoped>
.pixel-reveal { position: absolute; inset: 0; width: 100%; height: 100%; opacity: 0; }
.pixel-reveal.is-visible { opacity: 1; animation: original-fade-in .3s ease-out both; }
.pixel-reveal > canvas,
.pixel-reveal > img { position: absolute; inset: 0; display: block; width: 100%; height: 100%; object-fit: fill; }
@keyframes original-fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
@media (prefers-reduced-motion: reduce) { .pixel-reveal.is-visible { animation: none; } }
</style>
