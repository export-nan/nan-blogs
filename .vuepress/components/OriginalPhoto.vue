<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { withBase } from 'vuepress/client';
import ImageSkeleton from './ImageSkeleton.vue';
import PixelReveal from './PixelReveal.vue';

interface OriginalTile { src: string; x: number; y: number; width: number; height: number }
interface OriginalRow { src: string; y: number; height: number }
interface PhotoSource {
  id: string; original: string; preview: string; width: number; height: number;
  title?: string; originalTiles?: OriginalTile[]; originalRows?: OriginalRow[];
}
interface TileTask { request: number; controller: AbortController }
const props = defineProps<{ photo: PhotoSource }>();
const previewImage = ref<HTMLImageElement>();
const fallbackImage = ref<HTMLImageElement>();
const previewSource = ref<string>();
const fallbackSource = ref<string>();
const previewReady = ref(false);
const tilePlan = ref<OriginalTile[]>();
const completedTiles = ref<Record<number, { url: string; progress: number; complete: boolean; request: number }>>({});
const pendingReveals = new Map<number, { url: string; resolve: () => void }>();
const loadedArea = ref(0);
const status = ref<'loading' | 'loaded' | 'error'>('loading');
const revision = ref(0);
const urls = new Set<string>();
let mounted = false;
let tileTask: TileTask | undefined;
const ratio = computed(() => props.photo.width > 0 && props.photo.height > 0 ? props.photo.width / props.photo.height : 1);
const progress = computed(() => status.value === 'loaded' ? 1 : tilePlan.value ? Math.min(1, loadedArea.value / (props.photo.width * props.photo.height)) : 0);
const percent = computed(() => Math.floor(progress.value * 100));
const indeterminate = computed(() => !tilePlan.value && status.value !== 'loaded');
const progressText = computed(() => status.value === 'error'
  ? tilePlan.value ? `部分原图加载失败，已清晰面积 ${percent.value}%` : '加载失败'
  : indeterminate.value ? '正在加载原图，进度未知' : `已清晰面积 ${percent.value}%`);

function positiveInteger(value: number) {
  return Number.isSafeInteger(value) && value > 0;
}

function validTiles(tiles: OriginalTile[] | undefined, width: number, height: number): OriginalTile[] | undefined {
  if (!Array.isArray(tiles) || !tiles.length) return;
  const checked: OriginalTile[] = [];
  let area = 0;
  for (const tile of tiles) {
    if (!tile || typeof tile.src !== 'string' || !tile.src.trim() || !Number.isSafeInteger(tile.x) || tile.x < 0 || !Number.isSafeInteger(tile.y) || tile.y < 0 || !positiveInteger(tile.width) || !positiveInteger(tile.height) || tile.width > width - tile.x || tile.height > height - tile.y) return;
    if (checked.some(other => tile.x < other.x + other.width && tile.x + tile.width > other.x && tile.y < other.y + other.height && tile.y + tile.height > other.y)) return;
    checked.push({ src: tile.src, x: tile.x, y: tile.y, width: tile.width, height: tile.height });
    area += tile.width * tile.height;
  }
  return area === width * height ? checked : undefined;
}

function validPlan(photo: PhotoSource): OriginalTile[] | undefined {
  if (!positiveInteger(photo.width) || !positiveInteger(photo.height) || !Number.isSafeInteger(photo.width * photo.height)) return;
  const tiles = validTiles(photo.originalTiles, photo.width, photo.height);
  if (tiles) return tiles;
  if (!Array.isArray(photo.originalRows) || !photo.originalRows.length) return;
  let nextY = 0;
  const rows: OriginalTile[] = [];
  for (const row of photo.originalRows) {
    if (!row || !Number.isSafeInteger(row.y) || row.y !== nextY || !positiveInteger(row.height)) return;
    rows.push({ ...row, x: 0, width: photo.width });
    nextY += row.height;
  }
  return nextY === photo.height ? validTiles(rows, photo.width, photo.height) : undefined;
}

function tileStyle(tile: OriginalTile) {
  return {
    left: `${tile.x / props.photo.width * 100}%`, top: `${tile.y / props.photo.height * 100}%`,
    width: `${tile.width / props.photo.width * 100}%`, height: `${tile.height / props.photo.height * 100}%`,
  };
}

function releaseUrl(url: string) {
  if (urls.delete(url)) URL.revokeObjectURL(url);
}

function stop() {
  revision.value++;
  tileTask?.controller.abort();
  tileTask = undefined;
  for (const reveal of pendingReveals.values()) reveal.resolve();
  pendingReveals.clear();
  for (const url of urls) URL.revokeObjectURL(url);
  urls.clear();
}

function onPixelProgress(index: number, fraction: number, url: string) {
  const entry = completedTiles.value[index];
  const tile = tilePlan.value?.[index];
  if (!mounted || !entry || !tile || entry.url !== url || entry.request !== revision.value || !Number.isFinite(fraction)) return;
  const next = Math.max(entry.progress, Math.min(1, fraction));
  loadedArea.value += (next - entry.progress) * tile.width * tile.height;
  entry.progress = next;
}

function onPixelsComplete(index: number, url: string) {
  const entry = completedTiles.value[index];
  if (!mounted || !entry || entry.url !== url || entry.request !== revision.value) return;
  onPixelProgress(index, 1, url);
  entry.complete = true;
  const reveal = pendingReveals.get(index);
  if (reveal?.url === url) {
    pendingReveals.delete(index);
    reveal.resolve();
  }
}

function isCurrent(task: TileTask) {
  return mounted && task === tileTask && task.request === revision.value && !task.controller.signal.aborted;
}

async function loadTile(tile: OriginalTile, index: number, task: TileTask) {
  const response = await fetch(withBase(tile.src), { signal: task.controller.signal });
  if (!isCurrent(task)) return;
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const blob = await response.blob();
  if (!isCurrent(task)) return;
  const url = URL.createObjectURL(blob);
  urls.add(url);
  try {
    const image = new Image();
    image.src = url;
    await image.decode();
    if (!isCurrent(task)) {
      releaseUrl(url);
      return;
    }
    if (image.naturalWidth !== tile.width || image.naturalHeight !== tile.height) throw new Error('Unexpected original tile dimensions.');
    // Keep the worker occupied until the decoded pixels have actually appeared.
    completedTiles.value[index] = { url, progress: 0, complete: false, request: task.request };
    await new Promise<void>((resolve) => pendingReveals.set(index, { url, resolve }));
  } catch (error) {
    releaseUrl(url);
    throw error;
  }
}

async function loadTiles(request: number) {
  const tiles = tilePlan.value;
  if (!mounted || request !== revision.value || tileTask || !tiles) return;
  const pending = tiles.map((tile, index) => ({ tile, index })).filter(({ index }) => !completedTiles.value[index]?.complete);
  const task = { request, controller: new AbortController() };
  tileTask = task;
  status.value = 'loading';
  let cursor = 0;
  const worker = async () => {
    while (isCurrent(task)) {
      const next = pending[cursor++];
      if (!next) return;
      try {
        await loadTile(next.tile, next.index, task);
      } catch {
        // Other tiles can finish; retry only the missing ones after all workers settle.
      }
    }
  };
  try {
    await Promise.all(Array.from({ length: Math.min(3, pending.length) }, worker));
    if (isCurrent(task)) status.value = tiles.every((_, index) => completedTiles.value[index]?.complete) ? 'loaded' : 'error';
  } finally {
    if (tileTask === task) tileTask = undefined;
  }
}

function onPreviewState(event: Event) {
  if (!mounted || event.currentTarget !== previewImage.value) return;
  previewReady.value = event.type === 'load' && previewImage.value.naturalWidth > 0;
}

function onFallbackState(event: Event) {
  if (!mounted || tilePlan.value || event.currentTarget !== fallbackImage.value) return;
  status.value = event.type === 'load' && fallbackImage.value.naturalWidth > 0 ? 'loaded' : 'error';
}

function start() {
  stop();
  const request = revision.value;
  completedTiles.value = {};
  loadedArea.value = 0;
  previewReady.value = false;
  status.value = 'loading';
  tilePlan.value = validPlan(props.photo);
  previewSource.value = withBase(props.photo.preview);
  fallbackSource.value = tilePlan.value ? undefined : withBase(props.photo.original);
  if (tilePlan.value) void loadTiles(request);
  void nextTick(() => {
    if (!mounted || request !== revision.value) return;
    const preview = previewImage.value;
    if (preview?.complete && preview.naturalWidth > 0) previewReady.value = true;
    const fallback = fallbackImage.value;
    if (!tilePlan.value && fallback?.complete) status.value = fallback.naturalWidth > 0 ? 'loaded' : 'error';
  });
}

function retry() {
  if (status.value !== 'error') return;
  if (tilePlan.value) void loadTiles(revision.value);
  else start();
}

onMounted(() => {
  mounted = true;
  start();
});
watch(() => [props.photo.id, props.photo.original, props.photo.preview, props.photo.width, props.photo.height, props.photo.originalTiles, props.photo.originalRows], () => {
  if (mounted) start();
}, { deep: true, flush: 'sync' });
onBeforeUnmount(() => {
  mounted = false;
  stop();
});
</script>

<template>
  <div class="original-photo" :style="{ '--photo-width': `${photo.width}px`, '--photo-ratio': ratio }">
    <div class="original-stage">
      <div class="original-frame" role="img" :aria-label="photo.title || '照片原图'">
        <ImageSkeleton v-if="!previewReady && status !== 'loaded'" class="original-skeleton" aria-hidden="true" />
        <img v-if="previewSource" :key="`preview-${revision}`" ref="previewImage" v-show="previewReady" class="original-preview"
          :src="previewSource" alt="" aria-hidden="true" :width="photo.width" :height="photo.height" loading="eager" decoding="async" @load="onPreviewState" @error="onPreviewState">
        <div v-for="(tile, index) in tilePlan" :key="`${revision}-${index}`" class="original-cell" :style="tileStyle(tile)">
          <PixelReveal v-if="completedTiles[index]" :key="completedTiles[index].url" :src="completedTiles[index].url" :width="tile.width" :height="tile.height"
            @progress="(fraction, url) => onPixelProgress(index, fraction, url)" @complete="(url) => onPixelsComplete(index, url)" />
        </div>
        <img v-if="fallbackSource" :key="`original-${revision}`" ref="fallbackImage" v-show="status !== 'error'" class="original"
          :src="fallbackSource" alt="" aria-hidden="true" :width="photo.width" :height="photo.height" loading="eager" @load="onFallbackState" @error="onFallbackState">
      </div>
      <Transition name="progress-fade">
        <div v-if="status !== 'loaded'" class="original-progress" :class="{ 'is-indeterminate': indeterminate }" role="progressbar" aria-label="原图加载进度"
          aria-valuemin="0" aria-valuemax="100" :aria-valuenow="indeterminate ? undefined : progress * 100" :aria-valuetext="progressText">
          <span class="original-progress__fill" :style="{ height: `${progress * 100}%` }" aria-hidden="true"></span>
          <span class="original-progress__label" aria-hidden="true">{{ indeterminate ? status === 'error' ? '!' : '…' : `${percent}%` }}</span>
        </div>
      </Transition>
    </div>
    <p v-if="status === 'error'" class="original-error" role="alert">
      部分原图加载失败，已显示的清晰区域会保留。
      <button type="button" @click="retry">重试加载</button>
    </p>
    <span v-else class="original-status" role="status">{{ status === 'loaded' ? '原图加载完成' : '正在加载原图…' }}</span>
  </div>
</template>

<style scoped>
.original-photo {
  --photo-max-height: 74dvh;
  box-sizing: border-box;
  min-width: 0;
  padding: 0 2rem 1.75rem;
}

.original-stage {
  position: relative;
  width: min(100%, var(--photo-width), calc(var(--photo-max-height) * var(--photo-ratio)));
  aspect-ratio: var(--photo-ratio);
  margin: auto;
}

.original-frame { position: absolute; inset: 0; overflow: hidden; }
.original-frame > .original-skeleton,
.original-frame > .original-preview,
.original-frame > .original { position: absolute; inset: 0; width: 100%; height: 100%; }
.original-frame > .original-preview { display: block; object-fit: fill; }
.original-frame > .original { display: block; object-fit: contain; }
.original-frame > .original-cell { position: absolute; }

.original-progress {
  position: absolute;
  top: 0;
  bottom: 0;
  left: calc(100% + .5rem);
  width: .375rem;
  border-radius: 1rem;
  background: var(--vp-c-bg-alt, #ddd);
}
.original-progress__fill { position: absolute; top: 0; left: 0; width: 100%; border-radius: inherit; background: var(--vp-c-accent, #3eaf7c); }
.original-progress__label { position: absolute; top: calc(100% + .35rem); left: 50%; width: 2.5rem; transform: translateX(-50%); text-align: center; font-size: .7rem; line-height: 1.4; color: var(--vp-c-text-mute, #777); }
.original-progress.is-indeterminate { background: repeating-linear-gradient(135deg, var(--vp-c-bg-alt, #ddd) 0 4px, var(--vp-c-border, #aaa) 4px 8px); }
.progress-fade-leave-active { transition: opacity .35s ease; }
.progress-fade-leave-to { opacity: 0; }
.original-error { display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: .5rem; margin: .75rem 0 0; font-size: .85rem; }
.original-error button { padding: .35rem .6rem; border: 1px solid var(--vp-c-border, #8886); border-radius: 6px; background: transparent; color: inherit; cursor: pointer; }
.original-status { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
@media (min-width: 601px) { .original-photo { --photo-max-height: min(74dvh, max(12rem, calc(94dvh - 19rem))); } }
@media (prefers-reduced-motion: reduce) { .progress-fade-leave-active { transition: none; } }
</style>
