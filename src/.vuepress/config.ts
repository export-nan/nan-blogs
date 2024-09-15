import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/nan-blogs/",

  title: "NAN",

  theme,

  shouldPrefetch: false,
});
