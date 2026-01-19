import comp from "/Users/nan/code/nan-dome/nan-blogs/.vuepress/.temp/pages/site-log/2023-02-13.html.vue"
const data = JSON.parse("{\"path\":\"/site-log/2023-02-13.html\",\"title\":\"vuepress + Github actions 搭建自动化的集成的博客发布栈\",\"lang\":\"en-US\",\"frontmatter\":{\"title\":\"vuepress + Github actions 搭建自动化的集成的博客发布栈\",\"tag\":[\"vuepress\",\"markdown\"],\"order\":1,\"author\":\"NAN\",\"date\":\"2023-02-13T00:00:00.000Z\",\"sticky\":\"true1\",\"star\":true,\"description\":\"起源 站点技术选型 技术栈 markdown vuepress Github pase Github actions 思路：博客文档部分采用 markdown 进行编写，将github仓库作为我们的文章数据源，使用 vuepress 对文章进行静态文件编译，采用 vuepress-theme-hope 进行主题开发，借助 Github actions ...\"},\"readingTime\":{\"minutes\":1.81,\"words\":543},\"filePathRelative\":\"site-log/2023-02-13.md\",\"excerpt\":\"\\n<h2>站点技术选型</h2>\\n<p>技术栈</p>\\n<ul>\\n<li>markdown</li>\\n<li>vuepress</li>\\n<li>Github pase</li>\\n<li>Github actions</li>\\n</ul>\\n<p>思路：博客文档部分采用 <code>markdown</code> 进行编写，将github仓库作为我们的文章数据源，使用 <code>vuepress</code> 对文章进行静态文件编译，采用 <code>vuepress-theme-hope</code> 进行主题开发，借助 <code>Github actions</code> 进行自动化部署。</p>\",\"autoDesc\":true}")
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
