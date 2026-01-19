import comp from "/Users/nan/code/nan-dome/nan-blogs/.vuepress/.temp/pages/note/Unix/cmd.html.vue"
const data = JSON.parse("{\"path\":\"/note/Unix/cmd.html\",\"title\":\"Unix命令行使用日志\",\"lang\":\"en-US\",\"frontmatter\":{\"description\":\"Unix命令行使用日志 启动命令行工具加载慢 最近遇到启动命令行工具加载慢的问题，表现为每次打开一个新的zsh终端窗口时，需要等待几秒钟才能看到命令提示符。 目标为找到是那些启动依赖导致加载慢的。 首先在 .zshrc 顶部加上： 在 .zshrc 末尾加上： 然后重新打开一个终端，会自动打印出： 这里可以看到是什么在导致加载慢，然后根据提示去优化。绝...\",\"head\":[[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"Unix命令行使用日志\\\",\\\"image\\\":[\\\"\\\"],\\\"dateModified\\\":null,\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"NAN\\\",\\\"url\\\":\\\"https://github.com/open-nan\\\"}]}\"],[\"meta\",{\"property\":\"og:url\",\"content\":\"https://export-nan.github.io/nan-blogs/note/Unix/cmd.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"NAN\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"Unix命令行使用日志\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"Unix命令行使用日志 启动命令行工具加载慢 最近遇到启动命令行工具加载慢的问题，表现为每次打开一个新的zsh终端窗口时，需要等待几秒钟才能看到命令提示符。 目标为找到是那些启动依赖导致加载慢的。 首先在 .zshrc 顶部加上： 在 .zshrc 末尾加上： 然后重新打开一个终端，会自动打印出： 这里可以看到是什么在导致加载慢，然后根据提示去优化。绝...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"en-US\"}]]},\"readingTime\":{\"minutes\":0.89,\"words\":267},\"filePathRelative\":\"note/Unix/cmd.md\",\"excerpt\":\"\\n<h2>启动命令行工具加载慢</h2>\\n<p>最近遇到启动命令行工具加载慢的问题，表现为每次打开一个新的zsh终端窗口时，需要等待几秒钟才能看到命令提示符。<br>\\n目标为找到是那些启动依赖导致加载慢的。</p>\\n<p>首先在 .zshrc 顶部加上：</p>\\n<div class=\\\"language-shell line-numbers-mode\\\" data-highlighter=\\\"shiki\\\" data-ext=\\\"shell\\\" style=\\\"--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34\\\"><pre class=\\\"shiki shiki-themes one-light one-dark-pro vp-code\\\"><code class=\\\"language-shell\\\"><span class=\\\"line\\\"><span style=\\\"--shiki-light:#4078F2;--shiki-dark:#61AFEF\\\">zmodload</span><span style=\\\"--shiki-light:#50A14F;--shiki-dark:#98C379\\\"> zsh/zprof</span></span></code></pre>\\n<div class=\\\"line-numbers\\\" aria-hidden=\\\"true\\\" style=\\\"counter-reset:line-number 0\\\"><div class=\\\"line-number\\\"></div></div></div>\",\"autoDesc\":true}")
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
