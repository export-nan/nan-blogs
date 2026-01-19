import { defineUserConfig } from "vuepress";
import { getDirname } from "@vuepress/utils";

const __dirname = getDirname(import.meta.url);

import theme from "./theme.js";


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
});
