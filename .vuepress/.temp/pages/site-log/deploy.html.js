import comp from "/Users/nan/code/nan-dome/nan-blogs/.vuepress/.temp/pages/site-log/deploy.html.vue"
const data = JSON.parse("{\"path\":\"/site-log/deploy.html\",\"title\":\"Github CI + Docker 实现部署到远程服务器\",\"lang\":\"en-US\",\"frontmatter\":{\"title\":\"Github CI + Docker 实现部署到远程服务器\",\"tag\":[\"vuepress\",\"markdown\"],\"order\":1,\"author\":\"NAN\",\"date\":\"2023-02-16T00:00:00.000Z\",\"sticky\":\"true1\",\"star\":true,\"description\":\"技术选型 markdown vuepress Github actions Docker 阿里云轻量级服务器 思路 博客文档部分采用 markdown 进行编写，将github仓库作为我们的文章数据源，使用 vuepress 对文章进行静态文件编译，借助 Github actions 将编译好的静态文件作为镜像推送到Docke Hub上，推送成功后Gi...\",\"head\":[[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"Github CI + Docker 实现部署到远程服务器\\\",\\\"image\\\":[\\\"\\\"],\\\"datePublished\\\":\\\"2023-02-16T00:00:00.000Z\\\",\\\"dateModified\\\":null,\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"NAN\\\"}]}\"],[\"meta\",{\"property\":\"og:url\",\"content\":\"https://export-nan.github.io/nan-blogs/site-log/deploy.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"NAN\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"Github CI + Docker 实现部署到远程服务器\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"技术选型 markdown vuepress Github actions Docker 阿里云轻量级服务器 思路 博客文档部分采用 markdown 进行编写，将github仓库作为我们的文章数据源，使用 vuepress 对文章进行静态文件编译，借助 Github actions 将编译好的静态文件作为镜像推送到Docke Hub上，推送成功后Gi...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"en-US\"}],[\"meta\",{\"property\":\"article:author\",\"content\":\"NAN\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"markdown\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"vuepress\"}],[\"meta\",{\"property\":\"article:published_time\",\"content\":\"2023-02-16T00:00:00.000Z\"}]]},\"readingTime\":{\"minutes\":2.03,\"words\":609},\"filePathRelative\":\"site-log/deploy.md\",\"excerpt\":\"<h2>技术选型</h2>\\n<ul>\\n<li>markdown</li>\\n<li>vuepress</li>\\n<li>Github actions</li>\\n<li>Docker</li>\\n<li>阿里云轻量级服务器</li>\\n</ul>\\n<h2>思路</h2>\\n<p>博客文档部分采用 <code>markdown</code> 进行编写，将github仓库作为我们的文章数据源，使用 <code>vuepress</code> 对文章进行静态文件编译，借助 <code>Github actions</code> 将编译好的静态文件作为镜像推送到<code>Docke Hub</code>上，推送成功后<code>Github actions</code>通知云服务器进行<code>Docke</code>更新，云服务器将更新后的<code>Docker 镜像</code>做为容器运行并提供web服务</p>\",\"autoDesc\":true}")
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
