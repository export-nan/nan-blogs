<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { withBase } from 'vuepress/client';

interface Photo {
  id: string; title: string; capturedAt: string; date: string;
  preview: string; original: string; width: number; height: number;
}
const photos = ref<Photo[]>([]);
const loading = ref(true);
const failed = ref(false);
const viewer = ref<HTMLDialogElement>();
const selected = ref<Photo>();
const groups = computed(() => {
  const result = new Map<string, Photo[]>();
  for (const photo of photos.value) {
    if (!result.has(photo.date)) result.set(photo.date, []);
    result.get(photo.date)!.push(photo);
  }
  return [...result].map(([date, items]) => ({ date, items }));
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
function open(photo: Photo) {
  selected.value = photo;
  viewer.value?.showModal();
}
</script>

<template>
  <div class="Lumen">
    <p class="intro">用照片收藏生活里的片刻。<span v-if="photos.length">共 {{ photos.length }} 张照片</span></p>
    <p v-if="loading" role="status">正在加载照片…</p>
    <p v-else-if="failed" role="alert">照片加载失败，请刷新页面重试。</p>
    <div v-else-if="!photos.length" class="empty">还没有照片，期待第一段光影故事。</div>
    <section v-for="group in groups" :key="group.date" class="day">
      <h2><time :datetime="group.date">{{ group.date.replaceAll('-', '.') }}</time><small>{{ group.items.length }} 张</small></h2>
      <div class="grid">
        <figure v-for="photo in group.items" :key="photo.id">
          <button class="thumbnail" type="button" :aria-label="`查看原图：${photo.title}`" @click="open(photo)">
            <img :src="withBase(photo.preview)" :alt="photo.title" :width="photo.width" :height="photo.height" loading="lazy" decoding="async">
          </button>
          <figcaption>{{ photo.title }}</figcaption>
        </figure>
      </div>
    </section>
    <dialog ref="viewer" class="viewer" aria-label="照片原图" @click="(event) => { if (event.target === viewer) viewer?.close(); }">
      <template v-if="selected">
        <div class="toolbar">
          <span>{{ selected.title }}</span>
          <a :href="withBase(selected.original)" target="_blank" rel="noopener">打开全尺寸 JPG ↗</a>
          <button type="button" autofocus aria-label="关闭原图" @click="viewer?.close()">关闭 ×</button>
        </div>
        <img class="original" :src="withBase(selected.original)" :alt="selected.title">
        <p>{{ selected.date }} · {{ selected.width }} × {{ selected.height }}</p>
      </template>
    </dialog>
  </div>
</template>

<style scoped>
.Lumen { margin: 1.5rem 0 3rem; }
.intro { color: var(--vp-c-text-mute, #777); }
.intro span { display: inline-block; margin-left: 1rem; font-size: .85em; }
.empty { padding: 4rem 1rem; text-align: center; border: 1px dashed #8886; border-radius: 16px; }
.day { position: relative; margin-left: .4rem; padding: 0 0 2rem 1.5rem; border-left: 2px solid #8883; }
.day h2 { display: flex; align-items: center; gap: 1rem; border: 0; font-size: 1.25rem; padding-top: 0; }
.day h2::before { content: ''; position: absolute; left: -6px; width: 10px; height: 10px; border-radius: 50%; background: var(--vp-c-accent, #3eaf7c); }
small { font-size: .7em; font-weight: normal; opacity: .6; }
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(190px, 1fr)); gap: 1.2rem; }
figure { margin: 0; min-width: 0; }
.thumbnail { display: block; padding: 0; border: 0; width: 100%; background: #8881; border-radius: 12px; overflow: hidden; cursor: zoom-in; }
.thumbnail img { display: block; width: 100%; height: auto; aspect-ratio: 4 / 3; object-fit: cover; transition: transform .25s; }
.thumbnail:hover img { transform: scale(1.035); }
.thumbnail:focus-visible { outline: 3px solid var(--vp-c-accent, #3eaf7c); outline-offset: 3px; }
figcaption { padding: .5rem .2rem; font-size: .85rem; overflow-wrap: anywhere; opacity: .75; }
.viewer { width: min(1200px, 94vw); max-width: 94vw; max-height: 94dvh; box-sizing: border-box; padding: 1rem; border: 1px solid #8885; border-radius: 12px; background: var(--vp-c-bg, #fff); color: inherit; }
.viewer::backdrop { background: #000c; }
.toolbar { display: flex; flex-wrap: wrap; align-items: center; gap: .8rem; margin-bottom: 1rem; }
.toolbar span { flex: 1; overflow-wrap: anywhere; }
.toolbar button { padding: .4rem .7rem; cursor: pointer; border: 1px solid #8886; border-radius: 6px; background: transparent; color: inherit; }
.original { display: block; max-width: 100%; max-height: 74dvh; width: auto; height: auto; margin: auto; object-fit: contain; }
.viewer p { text-align: center; opacity: .65; font-size: .85rem; }
@media (max-width: 480px) { .day { padding-left: 1rem; } .grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: .65rem; } }
@media (prefers-reduced-motion: reduce) { .thumbnail img { transition: none; } }
</style>
