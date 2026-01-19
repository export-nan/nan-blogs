import { hopeTheme } from "vuepress-theme-hope";
import { Navbar } from "./navbar.js";
import { Sidebar } from "./sidebar.js";

export default hopeTheme({
  hostname: "https://export-nan.github.io/nan-blogs/",

  author: {
    name: "NAN",
    url: "https://github.com/open-nan",
  },

  repo: "export-nan/nan-blogs",

  docsBranch: "docs",

  docsDir: "./",

  blog: {
    name: 'NAN',
    avatar: '/avatar.JPG',
    description: "一个前端开发者",
    intro: "/intro.html",
  },

  footer: "这里是页脚 _(:з」∠)_",

  locales: {
    "/": {
      // navbar
      navbar: Navbar,
      // sidebar
      sidebar: Sidebar,

      displayFooter: true,

      // page meta
      metaLocales: {
        editLink: "有错误的地方？在Github上给我提一个issue吧",
      },
    },
  },

  plugins: {
    blog: true,

    comment: {
      provider: "Giscus",
      repo: "export-nan/nan-blogs",
      repoId: "R_kgDOI-_szw",
      category: "General",
      categoryId: "DIC_kwDOI-_sz84CWS9I",
    },

    // all features are enabled for demo, only preserve features you need here
    mdEnhance: {
      align: true,
      attrs: true,
      chart: true,
      codetabs: true,
      container: true,
      demo: true,
      echarts: true,
      figure: true,
      flowchart: true,
      gfm: true,
      imgLazyload: true,
      imgSize: true,
      include: true,
      katex: true,
      mark: true,
      mermaid: true,
      playground: {
        presets: ["ts", "vue"],
      },
      // presentation: {
      //   plugins: ["highlight", "math", "search", "notes", "zoom"],
      // },
      stylize: [
        {
          matcher: "Recommended",
          replacer: ({ tag }: any) => {
            if (tag === "em")
              return {
                tag: "Badge",
                attrs: { type: "tip" },
                content: "Recommended",
              };
          },
        },
      ],
      sub: true,
      sup: true,
      tabs: true,
      vPre: true,
      vuePlayground: true,
    },
  },
},  { custom: true });
