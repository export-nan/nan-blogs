import comp from "/Users/nan/code/nan-dome/nan-blogs/.vuepress/.temp/pages/index.html.vue"
const data = JSON.parse("{\"path\":\"/\",\"title\":\"主页\",\"lang\":\"en-US\",\"frontmatter\":{\"home\":true,\"layout\":\"Blog\",\"icon\":\"home\",\"title\":\"主页\",\"heroText\":\"NAN的个人博客\",\"bgImage\":\"/banner-2023-02-27.webp\",\"heroFullScreen\":true,\"tagline\":\"世界这么广阔，我穷尽一生也只能窥其一角\",\"projects\":[{\"name\":\"chatgpt-api 脚本\",\"desc\":\"基于chatgpt-api接入的Dos脚本\",\"link\":\"https://github.com/export-nan/chatgpt-script\"}],\"footer\":\"这里是页脚 _(:з」∠)_\",\"description\":\"你是这里的第 :open-nan 个访客 你好！我是NAN，一个前端开发工程师 这是我的博客地址: epxort-nan.work 希望你在这里能找到属于你自己的灵感! github-snake\"},\"readingTime\":{\"minutes\":0.69,\"words\":207},\"filePathRelative\":\"README.md\",\"excerpt\":\"<h2>你是这里的第 <img src=\\\"https://count.getloli.com/get/@:open-nan\\\" alt=\\\":open-nan\\\" loading=\\\"lazy\\\"> 个访客</h2>\\n<p>你好！我是NAN，一个前端开发工程师<br>\\n这是我的博客地址: <a href=\\\"epxort-nan.work\\\">epxort-nan.work</a><br>\\n希望你在这里能找到属于你自己的灵感!</p>\\n<!-- [![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=anuraghazra)](https://github.com/anuraghazra/github-readme-stats) -->\",\"autoDesc\":true}")
export { comp, data }

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
