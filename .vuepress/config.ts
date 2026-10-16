import { defineUserConfig } from "vuepress";
import { getDirname } from "vuepress/utils";
// import ensureDirPlugin from '../light/index';
import { viteBundler } from '@vuepress/bundler-vite'


const __dirname = getDirname(import.meta.url);
import theme from "./theme.js";
import { buildLumen } from '../scripts/build-Lumen.mjs';


export default defineUserConfig({
  base: "/",
  plugins: [{ name: 'Lumen', onInitialized: async () => { await buildLumen(); } }],
  // plugins: [ensureDirPlugin],
  bundler: viteBundler({
    viteOptions: {
      server: {
        watch: {
          ignored: [
            "**/.git/**",
            "**/.git/fsmonitor--daemon.ipc",
          ],
        },
      },
    },
    vuePluginOptions: {},
  }),

  title: "NAN",

  theme,

  shouldPrefetch: false,
});
