import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  title: "NAN",

  theme,

  shouldPrefetch: false,
});
