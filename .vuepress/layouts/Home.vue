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
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  if (gl === null) {
    alert("Unable to initialize WebGL. Your browser or machine may not support it.");
  }else{
    const mousePosition = {x: 0, y: 0, fv: 0};
    window.onmousemove = (e)=>{
      const rect = (gl.canvas as HTMLCanvasElement).getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width * 2;
      const y = -(e.clientY - rect.top  - rect.height / 2) / rect.height * 2;
      mousePosition.x = x;
      mousePosition.y = y;
    }
    // window.ontouchmove = (e)=>{
    //   const rect = (gl.canvas as HTMLCanvasElement).getBoundingClientRect();
    //   const x = (e.clientX - rect.left - rect.width / 2) / rect.width * 2;
    //   const y = -(e.clientY - rect.top  - rect.height / 2) / rect.height * 2;
    //   mousePosition.x = x;
    //   mousePosition.y = y;
    // }

    const z = 0.01;
    window.ontouchstart = (e)=>{
      (function AnimationFrame() {
        mousePosition.fv += z;
        if(z > 0&& mousePosition.fv >= 0.05){
          mousePosition.fv = 0.05;
        }else if(z < 0 && mousePosition.fv <= 0){
          mousePosition.fv = 0;
          AnimationFrame = false
          return
        }
        console.log(mousePosition);
        window.requestAnimationFrame(() => {
          AnimationFrame();
        })
      })()
    }
    window.ontouchend = (e)=>{
      z = -0.01;
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
  background-color: #0000;
}
</style>