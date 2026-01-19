import comp from "/Users/nan/code/nan-dome/nan-blogs/.vuepress/.temp/pages/note/go/4-keyword-identifier.html.vue"
const data = JSON.parse("{\"path\":\"/note/go/4-keyword-identifier.html\",\"title\":\"关键字与标识符\",\"lang\":\"en-US\",\"frontmatter\":{\"title\":\"关键字与标识符\",\"order\":4,\"category\":[\"GO\"],\"description\":\"标识符规范 go语言中的标识符严格区分大小写。标识符中只能使用字母、数字和下划线，并且不能以数字开头。关键字与预定义标识符`不能作为标识符使用。 go语言中常用的标识符的命名规范： 在go语言中需要暴露到包外使用的标识符都必须以大写字母开头，不需要暴露的标识符都应以小写字母开头。 关键字与预定义标识符 Go 语言中有 25 个关键字 除了以上介绍的这些...\",\"head\":[[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"关键字与标识符\\\",\\\"image\\\":[\\\"\\\"],\\\"dateModified\\\":null,\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"NAN\\\",\\\"url\\\":\\\"https://github.com/open-nan\\\"}]}\"],[\"meta\",{\"property\":\"og:url\",\"content\":\"https://export-nan.github.io/nan-blogs/note/go/4-keyword-identifier.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"NAN\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"关键字与标识符\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"标识符规范 go语言中的标识符严格区分大小写。标识符中只能使用字母、数字和下划线，并且不能以数字开头。关键字与预定义标识符`不能作为标识符使用。 go语言中常用的标识符的命名规范： 在go语言中需要暴露到包外使用的标识符都必须以大写字母开头，不需要暴露的标识符都应以小写字母开头。 关键字与预定义标识符 Go 语言中有 25 个关键字 除了以上介绍的这些...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"en-US\"}]]},\"readingTime\":{\"minutes\":2.62,\"words\":785},\"filePathRelative\":\"note/go/4-keyword-identifier.md\",\"excerpt\":\"<h2>标识符规范</h2>\\n<p>go语言中的标识符严格区分大小写。标识符中只能使用字母、数字和下划线，并且不能以数字开头。关键字与预定义标识符`不能作为标识符使用。</p>\\n<p>go语言中常用的标识符的命名规范：</p>\\n<table>\\n<thead>\\n<tr>\\n<th>场景</th>\\n<th>命名规范</th>\\n<th>示例</th>\\n</tr>\\n</thead>\\n<tbody>\\n<tr>\\n<td>项目名</td>\\n<td>全部小写字母，中横线隔开</td>\\n<td>hello-world</td>\\n</tr>\\n<tr>\\n<td>包名</td>\\n<td>包名与目录名保持一致, 全部小写, 简单明了<br> 不能使用下划线, 不能用<code>标准库</code>名称</td>\\n<td>calculator</td>\\n</tr>\\n<tr>\\n<td>模块名</td>\\n<td>小写蛇形命名法</td>\\n<td>user_info.go</td>\\n</tr>\\n<tr>\\n<td>常量</td>\\n<td>大写蛇形命名法</td>\\n<td>HTTP_PORT</td>\\n</tr>\\n<tr>\\n<td>变量/函数/结构体</td>\\n<td>驼峰命名法, 严格区分大小写</td>\\n<td>userName/UserName</td>\\n</tr>\\n<tr>\\n<td>接口</td>\\n<td>驼峰命名法 + er后缀</td>\\n<td>Reader</td>\\n</tr>\\n</tbody>\\n</table>\",\"autoDesc\":true}")
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
