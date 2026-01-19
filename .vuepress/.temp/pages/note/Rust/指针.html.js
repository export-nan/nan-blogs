import comp from "/Users/nan/code/nan-dome/nan-blogs/.vuepress/.temp/pages/note/Rust/指针.html.vue"
const data = JSON.parse("{\"path\":\"/note/Rust/%E6%8C%87%E9%92%88.html\",\"title\":\"指针\",\"lang\":\"en-US\",\"frontmatter\":{\"description\":\"指针 对指针的理解 指针是一个变量，它存储了另一个变量的内存地址。通过指针，我们可以在内存上快速的找到我们要访问的数据。 Tips 在这里我们借用 LLDB 调试，来直观的观察数据在内存上的表现形式，这有助于帮助我们理解这些数据储存的底层逻辑。 关于如何使用 LLDB 调试 rust，我们可以参考 LLDB 调试 这篇文章。 先来一个简单的例子 这里我...\",\"head\":[[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"指针\\\",\\\"image\\\":[\\\"\\\"],\\\"dateModified\\\":null,\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"NAN\\\",\\\"url\\\":\\\"https://github.com/open-nan\\\"}]}\"],[\"meta\",{\"property\":\"og:url\",\"content\":\"https://export-nan.github.io/nan-blogs/note/Rust/%E6%8C%87%E9%92%88.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"NAN\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"指针\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"指针 对指针的理解 指针是一个变量，它存储了另一个变量的内存地址。通过指针，我们可以在内存上快速的找到我们要访问的数据。 Tips 在这里我们借用 LLDB 调试，来直观的观察数据在内存上的表现形式，这有助于帮助我们理解这些数据储存的底层逻辑。 关于如何使用 LLDB 调试 rust，我们可以参考 LLDB 调试 这篇文章。 先来一个简单的例子 这里我...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"en-US\"}]]},\"readingTime\":{\"minutes\":2.63,\"words\":790},\"filePathRelative\":\"note/Rust/指针.md\",\"excerpt\":\"\\n<h2>对指针的理解</h2>\\n<p>指针是一个变量，它存储了另一个变量的内存地址。通过指针，我们可以在内存上快速的找到我们要访问的数据。</p>\\n<div class=\\\"hint-container tip\\\">\\n<p class=\\\"hint-container-title\\\">Tips</p>\\n<p>在这里我们借用 LLDB 调试，来直观的观察数据在内存上的表现形式，这有助于帮助我们理解这些数据储存的底层逻辑。<br>\\n关于如何使用 LLDB 调试 rust，我们可以参考 <a href=\\\"https://nan-dome.github.io/nan-blogs/note/Rust/LLDB%20%E8%B0%83%E8%AF%95.html\\\" target=\\\"_blank\\\" rel=\\\"noopener noreferrer\\\">LLDB 调试</a> 这篇文章。</p>\\n</div>\",\"autoDesc\":true}")
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
