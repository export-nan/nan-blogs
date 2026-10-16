<script setup lang="ts">
import { Blog } from "vuepress-theme-hope/blog";
import { onMounted, onUnmounted, ref } from "vue";
import webgl, { type MousePosition } from './shader.ts';

const webglCanvas = ref<HTMLCanvasElement|null>(null);
const heroInfoVisible = ref(true);
const width = 1920;
const height = 1080;
let cleanup: (() => void) | undefined;

const toggleHeroInfo = (event: MouseEvent) => {
  if (!(event.target instanceof Element)) return;
  if (!event.target.closest(".vp-blog-hero, .vp-blog-hero-info, .webgl-canvas")) return;

  heroInfoVisible.value = !heroInfoVisible.value;
};

onMounted(() => {
  const canvas = webglCanvas.value;
  if (!canvas) return;
  const gl = canvas.getContext('webgl2');
  if (!gl) {
    console.warn('WebGL 2 is unavailable; the animated background is disabled.');
    return;
  }
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  const mousePosition: MousePosition = { x: 0, y: 0, active: false };
  const updatePointer = (event: PointerEvent) => {
    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) {
      mousePosition.active = false;
      return;
    }
    mousePosition.x = (event.clientX - rect.left) / rect.width * 2 - 1;
    mousePosition.y = 1 - (event.clientY - rect.top) / rect.height * 2;
    mousePosition.active = Math.abs(mousePosition.x) <= 1 && Math.abs(mousePosition.y) <= 1;
  };
  const resetPointer = () => { mousePosition.active = false; };
  const releasePointer = (event: PointerEvent) => {
    if (event.pointerType !== 'mouse') resetPointer();
  };
  const leaveWindow = (event: PointerEvent) => {
    if (!event.relatedTarget) resetPointer();
  };
  const dispose = webgl(gl, mousePosition);
  window.addEventListener('pointermove', updatePointer);
  window.addEventListener('pointerdown', updatePointer);
  window.addEventListener('pointerup', releasePointer);
  window.addEventListener('pointercancel', resetPointer);
  window.addEventListener('pointerout', leaveWindow);
  window.addEventListener('blur', resetPointer);
  cleanup = () => {
    window.removeEventListener('pointermove', updatePointer);
    window.removeEventListener('pointerdown', updatePointer);
    window.removeEventListener('pointerup', releasePointer);
    window.removeEventListener('pointercancel', resetPointer);
    window.removeEventListener('pointerout', leaveWindow);
    window.removeEventListener('blur', resetPointer);
    dispose();
  };
});

onUnmounted(() => { cleanup?.(); });

</script>

<template>
  <div
    class="shader-blog-home"
    :class="{ 'hero-info-hidden': !heroInfoVisible }"
    @click="toggleHeroInfo"
  >
    <Blog>
      <!-- 覆盖默认 Hero 标志为更高级的，像主题主页一样 -->
      <template #heroBg>
        <canvas class="webgl-canvas" :width="width" :height="height" ref="webglCanvas"></canvas>
      </template>
    </Blog>
  </div>
</template>
<style scoped>
.webgl-canvas {
  position: absolute;
  width: auto;
  height: 100%;
  background-color: #0000;
}

:global(.shader-blog-home .vp-blog-hero-info) {
  user-select: none;
  -webkit-user-select: none;
  transition:
    opacity .32s ease,
    transform .32s ease,
    visibility .32s ease;
}

:global(.shader-blog-home.hero-info-hidden .vp-blog-hero-info) {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transform: translateY(-18px) scale(.98);
}
</style>
