<template >
  <canvas
    ref="canvasDOM" 
    :canvas-id="canvasId"
    :width="props.width"
    :height="props.height"
  />
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { RegularIcosahedronGraphShader } from './regularIcosahedronGraphShader'
import { ShaderDrag } from './ShaderDrag'


// 定义 props
export interface Props {
  canvasId?: string,
  width?: number,
  height?: number
}
const props = withDefaults(defineProps<Props>(), {
  width: 500,
  height: 500
})

// 定义 canvasId
const canvasId  = props.canvasId
// 定义 canvasDOM
const canvasDOM = ref<HTMLCanvasElement>()

// 定义 canvas 上下文对象
let ctx:WebGLRenderingContext | null  = null

let shaderDrag: ShaderDrag|null = null 



onMounted(() => {
  // 获取 canvas 上下文对象
  ctx = canvasDOM.value?.getContext("webgl") as WebGLRenderingContext;

  shaderDrag = new ShaderDrag(canvasDOM.value as HTMLCanvasElement)

  shaderDrag.use(RegularIcosahedronGraphShader)

})




</script>