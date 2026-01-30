<script setup lang="ts">
import { Blog } from "vuepress-theme-hope/blog";
import { onMounted, ref } from "vue";
import webgl from './shader.ts';

const webglCanvas = ref<HTMLCanvasElement|null>(null);
const width = 1920;
const height = 1080;

onMounted(() => {
  const canvas = webglCanvas.value;
  if (!canvas) return;
  const gl = canvas.getContext('webgl2');
  if (gl === null) {
    alert("Unable to initialize WebGL. Your browser or machine may not support it.");
  }else{
    const mousePosition = {x: -2, y: 2}
    window.onmousemove = (e)=>{
      const rect = (gl.canvas as HTMLCanvasElement).getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width * 2;
      const y = -(e.clientY - rect.top  - rect.height / 2) / rect.height * 2;
      mousePosition.x = x;
      mousePosition.y = y;
    }

    webgl(gl, mousePosition);
  }
});

</script>

<template>
  <Blog>
    <!-- 覆盖默认 Hero 标志为更高级的，像主题主页一样 -->
    <template #heroBg>
      <canvas class="webgl-canvas" :width="width" :height="height" ref="webglCanvas"></canvas>
    </template>
  </Blog>
</template>
<style scoped>
.webgl-canvas {
  position: absolute;
  width: auto;
  height: 100%;
}
</style>