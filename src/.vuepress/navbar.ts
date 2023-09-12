import { navbar } from "vuepress-theme-hope";

export const Navbar = navbar([
    "/",
    {
        text: "学习笔记",
        icon: "edit",
        link: "/note/",
    },
    {
        text: "建站日志",
        icon: "any",
        link: "/site-log/"
    },
    {
        text: "其他",
        icon: "any",
        link: "/other/"
    }
]);
