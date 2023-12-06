import { defineUserConfig } from "vuepress";
import theme from "./theme.js";
import { path } from "@vuepress/utils";


export default defineUserConfig({
  base: "/",

  title: "NAN",

  theme,

  shouldPrefetch: false,
});
