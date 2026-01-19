import { defineClientConfig } from "vuepress/client";
import { onMounted } from 'vue'
import Blog from "./layouts/Home.vue";

export default defineClientConfig({
  // 你可以在这里添加或覆盖布局
  layouts: {
    // 一个主页布局，带有自定义的 Hero 标志
    Blog,
  },
  setup() {
    onMounted(() => {
    })
  },
});