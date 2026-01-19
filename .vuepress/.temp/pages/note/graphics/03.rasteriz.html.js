import comp from "/Users/nan/code/nan-dome/nan-blogs/.vuepress/.temp/pages/note/graphics/03.rasteriz.html.vue"
const data = JSON.parse("{\"path\":\"/note/graphics/03.rasteriz.html\",\"title\":\"视口与光栅化\",\"lang\":\"en-US\",\"frontmatter\":{\"title\":\"视口与光栅化\",\"order\":3,\"category\":[\"graphics\"],\"description\":\"视口的定义（viewport） 屏幕空间 在计算机图像学中使用视角field-of-veiw(fovY)和长宽(aspect ratio)比来定义视口 在知道视角fovY之后我们可以得到屏幕在竖直方向上的半径$t$ $$ t = tan\\\\frac{fovY}{2} * |n| $$ 视口的上下分别为 $$ viewT=t\\\\qquad viewB=-t ...\",\"head\":[[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"视口与光栅化\\\",\\\"image\\\":[\\\"\\\"],\\\"dateModified\\\":null,\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"NAN\\\",\\\"url\\\":\\\"https://github.com/open-nan\\\"}]}\"],[\"meta\",{\"property\":\"og:url\",\"content\":\"https://export-nan.github.io/nan-blogs/note/graphics/03.rasteriz.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"NAN\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"视口与光栅化\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"视口的定义（viewport） 屏幕空间 在计算机图像学中使用视角field-of-veiw(fovY)和长宽(aspect ratio)比来定义视口 在知道视角fovY之后我们可以得到屏幕在竖直方向上的半径$t$ $$ t = tan\\\\frac{fovY}{2} * |n| $$ 视口的上下分别为 $$ viewT=t\\\\qquad viewB=-t ...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"en-US\"}]]},\"readingTime\":{\"minutes\":3.12,\"words\":936},\"filePathRelative\":\"note/graphics/03.rasteriz.md\",\"excerpt\":\"\\n<h2>屏幕空间</h2>\\n<p>在计算机图像学中使用视角field-of-veiw(fovY)和长宽(aspect ratio)比来定义视口</p>\\n<figure><figcaption></figcaption></figure>\\n<p>在知道视角fovY之后我们可以得到屏幕在竖直方向上的半径$t$</p>\\n<figure><figcaption></figcaption></figure>\\n<p>$$<br>\\nt = tan\\\\frac{fovY}{2} * |n|<br>\\n$$</p>\\n<p>视口的上下分别为<br>\\n$$<br>\\nviewT=t\\\\qquad viewB=-t<br>\\n$$</p>\",\"autoDesc\":true}")
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
