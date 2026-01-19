import { sidebar } from "vuepress-theme-hope";

export const Sidebar = sidebar({
  "/": [
    "",
    {
      text: "学习笔记",
      icon: "edit",
      prefix: "note/",
      children: "structure",
    },
    {
      text: "建站日志",
      icon: "log",
      prefix: "site-log/",
      children: "structure",
    },
    // "intro",
    // "slides",
  ],
});
