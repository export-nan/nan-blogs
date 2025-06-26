import { defineUserConfig } from "vuepress";
import { getDirname, path } from "@vuepress/utils";
const __dirname = getDirname(import.meta.url);

import theme from "./theme.js";
console.log(path.resolve(
  __dirname,
  "./theme/HomePage.vue",
),'________________________________________')


import { viteBundler } from '@vuepress/bundler-vite'

export default defineUserConfig({
  base: "/",

  bundler: viteBundler({
    viteOptions: {},
    vuePluginOptions: {},
  }),

  title: "NAN",

  theme,

  shouldPrefetch: false,

  alias: {
    "@theme-hope/components/HomePage": path.resolve(
      __dirname,
      "./theme/HomePage.vue",
    ),
  }
});
