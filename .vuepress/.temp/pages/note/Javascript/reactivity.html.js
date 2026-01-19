import comp from "/Users/nan/code/nan-dome/nan-blogs/.vuepress/.temp/pages/note/Javascript/reactivity.html.vue"
const data = JSON.parse("{\"path\":\"/note/Javascript/reactivity.html\",\"title\":\"vue 响应式数据原理\",\"lang\":\"en-US\",\"frontmatter\":{\"title\":\"vue 响应式数据原理\",\"date\":\"2023-02-14T00:00:00.000Z\",\"tag\":[\"vue\",\"源码\"],\"category\":[\"Javascript/Typescript\"],\"description\":\"什么是响应式? 首先响应式是一个过程，由两个参与者组成，一个是触发者，另个是响应者 触发者：数据 响应者：引用数据的函数 (vue3中称之为副作用函数(effect)) 当数据改变时，引用数据的副作用函数响应数据的改变并重新执行，这个过程就是响应式 响应式核心：Proxy 代理 new Proxy 传入一个源对象，返回一个Proxy实例 基本的响应式实...\",\"head\":[[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"vue 响应式数据原理\\\",\\\"image\\\":[\\\"\\\"],\\\"datePublished\\\":\\\"2023-02-14T00:00:00.000Z\\\",\\\"dateModified\\\":null,\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"NAN\\\",\\\"url\\\":\\\"https://github.com/open-nan\\\"}]}\"],[\"meta\",{\"property\":\"og:url\",\"content\":\"https://export-nan.github.io/nan-blogs/note/Javascript/reactivity.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"NAN\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"vue 响应式数据原理\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"什么是响应式? 首先响应式是一个过程，由两个参与者组成，一个是触发者，另个是响应者 触发者：数据 响应者：引用数据的函数 (vue3中称之为副作用函数(effect)) 当数据改变时，引用数据的副作用函数响应数据的改变并重新执行，这个过程就是响应式 响应式核心：Proxy 代理 new Proxy 传入一个源对象，返回一个Proxy实例 基本的响应式实...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"en-US\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"源码\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"vue\"}],[\"meta\",{\"property\":\"article:published_time\",\"content\":\"2023-02-14T00:00:00.000Z\"}]]},\"readingTime\":{\"minutes\":9.33,\"words\":2799},\"filePathRelative\":\"note/Javascript/reactivity.md\",\"excerpt\":\"<h2>什么是响应式?</h2>\\n<p>首先响应式是一个过程，由两个参与者组成，一个是<code>触发者</code>，另个是<code>响应者</code></p>\\n<ul>\\n<li>触发者：数据</li>\\n<li>响应者：引用数据的函数 (vue3中称之为<code>副作用函数(effect)</code>)</li>\\n</ul>\\n<p>当数据改变时，引用数据的<code>副作用函数</code>响应数据的改变并重新执行，这个过程就是响应式</p>\\n<h2>响应式核心：Proxy 代理</h2>\\n<p><code>new Proxy</code> 传入一个源对象，返回一个<code>Proxy</code>实例</p>\",\"autoDesc\":true}")
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
