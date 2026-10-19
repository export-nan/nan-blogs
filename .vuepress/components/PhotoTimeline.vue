<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from 'vue';
import { withBase } from 'vuepress/client';
import ImageSkeleton from './ImageSkeleton.vue';

interface PhotoMetadata {
  camera?: string; lens?: string; iso?: number; aperture?: number;
  exposureTime?: number; focalLength?: number; focalLength35mm?: number;
}
interface Photo {
  id: string; title: string; capturedAt: string; date: string;
  preview: string; original: string; width: number; height: number;
  metadata?: PhotoMetadata;
}
const photos = ref<Photo[]>([]);
const loading = ref(true);
const failed = ref(false);
const viewer = ref<HTMLDialogElement>();
const selected = ref<Photo>();
const originalImage = ref<HTMLImageElement>();
const imageStatus = ref<'loading' | 'loaded' | 'error'>('loading');
let viewerRequest = 0;
const details = computed(() => {
  const metadata = selected.value?.metadata;
  if (!metadata) return [];
  const items: { label: string; value: string; equipment?: boolean }[] = [];
  if (metadata.camera) items.push({ label: '相机', value: metadata.camera, equipment: true });
  if (metadata.lens) items.push({ label: '镜头', value: metadata.lens, equipment: true });
  if (positive(metadata.iso)) items.push({ label: '感光度', value: `ISO ${formatNumber(metadata.iso)}` });
  if (positive(metadata.aperture)) items.push({ label: '光圈', value: `f/${formatNumber(metadata.aperture)}` });
  if (positive(metadata.exposureTime)) items.push({ label: '快门', value: formatExposure(metadata.exposureTime) });
  if (positive(metadata.focalLength)) {
    let value = `${formatNumber(metadata.focalLength)} mm`;
    if (positive(metadata.focalLength35mm) && metadata.focalLength35mm !== metadata.focalLength) {
      value += `（等效 ${formatNumber(metadata.focalLength35mm)} mm）`;
    }
    items.push({ label: '焦距', value });
  } else if (positive(metadata.focalLength35mm)) {
    items.push({ label: '等效焦距', value: `${formatNumber(metadata.focalLength35mm)} mm` });
  }
  return items;
});
function positive(value: number | undefined): value is number {
  return typeof value === 'number' && Number.isFinite(value) && value > 0;
}
function formatNumber(value: number) {
  return String(Number(value.toPrecision(4)));
}
function formatExposure(seconds: number) {
  const reciprocal = 1 / seconds;
  const denominator = Math.round(reciprocal);
  // Keep fractional seconds accurate instead of rounding 0.8 s to 1/1 s.
  if (seconds < 1 && denominator >= 2 && Math.abs(reciprocal - denominator) < 0.01) {
    return `1/${denominator} s`;
  }
  return `${formatNumber(seconds)} s`;
}
const groups = computed(() => {
  const result = new Map<string, Photo[]>();
  for (const photo of photos.value) {
    const month = photo.date.slice(0, 7);
    if (!result.has(month)) result.set(month, []);
    result.get(month)!.push(photo);
  }
  return [...result].map(([month, items]) => ({ month, items }));
});
onMounted(async () => {
  try {
    const response = await fetch(withBase('Lumen/photos.json'));
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    photos.value = await response.json();
  } catch {
    failed.value = true;
  } finally {
    loading.value = false;
  }
});
async function open(photo: Photo) {
  const request = ++viewerRequest;
  imageStatus.value = 'loading';
  selected.value = photo;
  await nextTick();
  const dialog = viewer.value;
  if (request !== viewerRequest || !dialog?.isConnected) return;
  const image = originalImage.value;
  if (image?.complete) imageStatus.value = image.naturalWidth > 0 ? 'loaded' : 'error';
  if (!dialog.open) dialog.showModal();
  dialog.scrollTop = 0;
}
function resetViewer() {
  viewerRequest++;
  selected.value = undefined;
  imageStatus.value = 'loading';
}
function closeViewer() {
  resetViewer();
  viewer.value?.close();
}
function onViewerClose() {
  // An earlier close event may arrive after another photo has already opened.
  if (!viewer.value?.open) resetViewer();
}
function onImageState(event: Event) {
  if (event.currentTarget !== originalImage.value) return;
  imageStatus.value = event.type === 'load' ? 'loaded' : 'error';
}
</script>

<template>
  <div class="Lumen">
    <p class="intro">用照片收藏生活里的片刻。<span v-if="photos.length">共 {{ photos.length }} 张照片</span></p>
    <p v-if="loading" role="status">正在加载照片…</p>
    <p v-else-if="failed" role="alert">照片加载失败，请刷新页面重试。</p>
    <div v-else-if="!photos.length" class="empty">还没有照片，期待第一段光影故事。</div>
    <div v-if="groups.length" class="photo-timeline">
      <section v-for="group in groups" :key="group.month" class="month">
        <h2><time :datetime="group.month">{{ group.month.replace('-', ' 年 ') }} 月</time><small>{{ group.items.length }} 张</small></h2>
        <div class="photo-wall">
          <figure v-for="photo in group.items" :key="photo.id">
            <button class="thumbnail" type="button" :aria-label="`查看原图：${photo.title}`" @click="open(photo)">
              <img :src="withBase(photo.preview)" :alt="photo.title" :width="photo.width" :height="photo.height" loading="lazy" decoding="async">
            </button>
            <figcaption><span>{{ photo.title }}</span><time :datetime="photo.date">{{ photo.date.replaceAll('-', '.') }}</time></figcaption>
          </figure>
        </div>
      </section>
    </div>
    <dialog ref="viewer" class="viewer" aria-label="照片原图" @cancel.prevent="closeViewer" @close="onViewerClose" @click="(event) => { if (event.target === viewer) closeViewer(); }">
      <template v-if="selected">
        <div class="toolbar">
          <span>{{ selected.title }}</span>
          <a :href="withBase(selected.original)" target="_blank" rel="noopener">打开全尺寸 JPG ↗</a>
          <button type="button" autofocus aria-label="关闭原图" @click="closeViewer">关闭 ×</button>
        </div>
        <div class="original-frame" :style="{ '--photo-width': `${selected.width}px`, '--photo-ratio': selected.width / selected.height }">
          <ImageSkeleton v-if="imageStatus === 'loading'" class="original-skeleton" label="正在加载原图…" />
          <p v-else-if="imageStatus === 'error'" class="image-error" role="alert">原图加载失败，请关闭后重试，或打开全尺寸 JPG。</p>
          <img :key="selected.id" ref="originalImage" v-show="imageStatus === 'loaded'" class="original" :src="withBase(selected.original)" :alt="selected.title" :width="selected.width" :height="selected.height" @load="onImageState" @error="onImageState">
        </div>
        <p>{{ selected.date }} · {{ selected.width }} × {{ selected.height }}</p>
        <dl v-if="details.length" class="photo-details" aria-label="拍摄参数">
          <div v-for="item in details" :key="item.label" :class="{ equipment: item.equipment }">
            <dt>{{ item.label }}</dt>
            <dd>{{ item.value }}</dd>
          </div>
        </dl>
      </template>
    </dialog>
  </div>
</template>

<style scoped>
.Lumen { margin: 1.5rem 0 3rem; }
.intro { color: var(--vp-c-text-mute, #777); }
.intro span { display: inline-block; margin-left: 1rem; font-size: .85em; }
.empty { padding: 4rem 1rem; text-align: center; border: 1px dashed #8886; border-radius: 16px; }
.photo-timeline { position: relative; }
.photo-timeline::before { content: ''; position: absolute; top: 0; bottom: 0; left: -1rem; width: 2px; background: #8883; }
.month { position: relative; margin: 0; padding: 0 0 2rem; }
.month h2 { display: flex; align-items: center; gap: 1rem; margin: 0 0 1rem; border: 0; font-size: 1.25rem; padding-top: 0; }
.month h2::before { content: ''; position: absolute; left: calc(-1rem - 4px); width: 10px; height: 10px; border-radius: 50%; background: var(--vp-c-accent, #3eaf7c); }
small { font-size: .7em; font-weight: normal; opacity: .6; }
.photo-wall { columns: 3 210px; column-gap: .75rem; }
figure { display: block; width: 100%; margin: 0 0 .9rem; min-width: 0; break-inside: avoid; }
.thumbnail { display: block; padding: 0; border: 0; width: 100%; background: #8881; border-radius: 6px; overflow: hidden; cursor: zoom-in; transition: box-shadow .2s; }
.thumbnail img { display: block; width: 100%; height: auto; }
.thumbnail:hover { box-shadow: 0 4px 14px #0002; }
.thumbnail:focus-visible { outline: 3px solid var(--vp-c-accent, #3eaf7c); outline-offset: 3px; }
figcaption { display: flex; justify-content: space-between; flex-wrap: wrap; gap: .2rem .5rem; padding: .4rem .1rem 0; font-size: .75rem; overflow-wrap: anywhere; opacity: .7; }
figcaption time { white-space: nowrap; }
.viewer { width: min(1200px, 94vw); max-width: 94vw; max-height: 94dvh; box-sizing: border-box; padding: 1rem; border: 1px solid #8885; border-radius: 12px; background: var(--vp-c-bg, #fff); color: inherit; }
.viewer::backdrop { background: #000c; }
.toolbar { display: flex; flex-wrap: wrap; align-items: center; gap: .8rem; margin-bottom: 1rem; }
.toolbar span { flex: 1; overflow-wrap: anywhere; }
.toolbar button { padding: .4rem .7rem; cursor: pointer; border: 1px solid #8886; border-radius: 6px; background: transparent; color: inherit; }
.original-frame { --photo-max-height: 74dvh; position: relative; width: min(100%, var(--photo-width), calc(var(--photo-max-height) * var(--photo-ratio))); aspect-ratio: var(--photo-ratio); margin: auto; }
.original-frame > .original, .original-frame > .original-skeleton { position: absolute; inset: 0; width: 100%; height: 100%; }
.original { display: block; object-fit: contain; }
.viewer p { text-align: center; opacity: .65; font-size: .85rem; }
.image-error { position: absolute; inset: 0; display: grid; place-items: center; margin: 0; padding: 1rem; }
.photo-details { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: .9rem 1rem; margin: 1rem 0 0; padding: 1rem .25rem .25rem; border-top: 1px solid #8883; }
.photo-details .equipment { grid-column: span 2; }
.photo-details dt { font-size: .75rem; opacity: .65; }
.photo-details dd { margin: .2rem 0 0; font-size: .85rem; overflow-wrap: anywhere; }
@media (min-width: 601px) { .original-frame { --photo-max-height: min(74dvh, max(12rem, calc(94dvh - 19rem))); } }
@media (max-width: 600px) { .photo-details { grid-template-columns: repeat(2, minmax(0, 1fr)); } .photo-details .equipment { grid-column: 1 / -1; } }
@media (max-width: 480px) { .photo-wall { columns: 2; column-gap: .5rem; } figure { margin-bottom: .65rem; } }
@media (prefers-reduced-motion: reduce) { .thumbnail { transition: none; } }
</style>
