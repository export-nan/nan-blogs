import { defineUserConfig } from "vuepress";
import { getDirname } from "vuepress/utils";
import ensureDirPlugin from '../light/index';
import { viteBundler } from '@vuepress/bundler-vite'


const __dirname = getDirname(import.meta.url);
import theme from "./theme.js";


export default defineUserConfig({
  base: "/",
  plugins: [ensureDirPlugin],
  bundler: viteBundler({
    viteOptions: {},
    vuePluginOptions: {},
  }),

  title: "NAN",

  theme,

  shouldPrefetch: false,
});
