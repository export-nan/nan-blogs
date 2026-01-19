import comp from "/Users/nan/code/nan-dome/nan-blogs/.vuepress/.temp/pages/note/graphics/04.shader.html.vue"
const data = JSON.parse("{\"path\":\"/note/graphics/04.shader.html\",\"title\":\"着色\",\"lang\":\"en-US\",\"frontmatter\":{\"title\":\"着色\",\"order\":4,\"category\":[\"graphics\"],\"description\":\"着色 漫反射项 $$ K(I/r^2) \\\\times max(0,l.n) $$ 其中 $K = 漫反射系数$ , $I = 光照的强度$, $r = 光源离当前平面度距离$ 高光项 $$ K_s(I/r^2) \\\\times max(0, n.h)^2 $$ 环境光项 $$ K_aI_a $$\",\"head\":[[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"着色\\\",\\\"image\\\":[\\\"\\\"],\\\"dateModified\\\":null,\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"NAN\\\",\\\"url\\\":\\\"https://github.com/open-nan\\\"}]}\"],[\"meta\",{\"property\":\"og:url\",\"content\":\"https://export-nan.github.io/nan-blogs/note/graphics/04.shader.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"NAN\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"着色\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"着色 漫反射项 $$ K(I/r^2) \\\\times max(0,l.n) $$ 其中 $K = 漫反射系数$ , $I = 光照的强度$, $r = 光源离当前平面度距离$ 高光项 $$ K_s(I/r^2) \\\\times max(0, n.h)^2 $$ 环境光项 $$ K_aI_a $$\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"en-US\"}]]},\"readingTime\":{\"minutes\":0.2,\"words\":61},\"filePathRelative\":\"note/graphics/04.shader.md\",\"excerpt\":\"\\n<h2>漫反射项</h2>\\n<p>$$<br>\\nK(I/r^2) \\\\times max(0,l.n)<br>\\n$$</p>\\n<p>其中 $K = 漫反射系数$ , $I = 光照的强度$, $r = 光源离当前平面度距离$</p>\\n<h2>高光项</h2>\\n<p>$$<br>\\nK_s(I/r^2) \\\\times max(0, n.h)^2<br>\\n$$</p>\\n<h2>环境光项</h2>\\n<p>$$<br>\\nK_aI_a<br>\\n$$</p>\\n\",\"autoDesc\":true}")
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
