const e=JSON.parse('{"key":"v-fc98a00c","path":"/site-log/deploy.html","title":"Github CI + Docker 实现部署到远程服务器","lang":"en-US","frontmatter":{"title":"Github CI + Docker 实现部署到远程服务器","tag":["vuepress","markdown"],"order":1,"author":"NAN","date":"2023-02-16T00:00:00.000Z","sticky":"true1","star":true,"description":"技术选型 markdown vuepress Github actions Docker 阿里云轻量级服务器 思路 博客文档部分采用 markdown 进行编写，将github仓库作为我们的文章数据源，使用 vuepress 对文章进行静态文件编译，借助 Github actions 将编译好的静态文件作为镜像推送到Docke Hub上，推送成功后Github actions通知云服务器进行Docke更新，云服务器将更新后的Docker 镜像做为容器运行并提供web服务","head":[["meta",{"property":"og:url","content":"https://github.com/export-nan/site-log/deploy.html"}],["meta",{"property":"og:site_name","content":"NAN"}],["meta",{"property":"og:title","content":"Github CI + Docker 实现部署到远程服务器"}],["meta",{"property":"og:description","content":"技术选型 markdown vuepress Github actions Docker 阿里云轻量级服务器 思路 博客文档部分采用 markdown 进行编写，将github仓库作为我们的文章数据源，使用 vuepress 对文章进行静态文件编译，借助 Github actions 将编译好的静态文件作为镜像推送到Docke Hub上，推送成功后Github actions通知云服务器进行Docke更新，云服务器将更新后的Docker 镜像做为容器运行并提供web服务"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"property":"og:updated_time","content":"2023-02-16T06:59:51.000Z"}],["meta",{"property":"article:author","content":"NAN"}],["meta",{"property":"article:tag","content":"vuepress"}],["meta",{"property":"article:tag","content":"markdown"}],["meta",{"property":"article:published_time","content":"2023-02-16T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-02-16T06:59:51.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Github CI + Docker 实现部署到远程服务器\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-02-16T00:00:00.000Z\\",\\"dateModified\\":\\"2023-02-16T06:59:51.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"NAN\\"}]}"]]},"headers":[{"level":2,"title":"技术选型","slug":"技术选型","link":"#技术选型","children":[]},{"level":2,"title":"思路","slug":"思路","link":"#思路","children":[]}],"git":{"createdTime":1676433458000,"updatedTime":1676530791000,"contributors":[{"name":"NAN","email":"export.nan@gmail.com","commits":5}]},"readingTime":{"minutes":2.03,"words":610},"filePathRelative":"site-log/deploy.md","localizedDate":"February 16, 2023","excerpt":"<h2> 技术选型</h2>\\n<ul>\\n<li>markdown</li>\\n<li>vuepress</li>\\n<li>Github actions</li>\\n<li>Docker</li>\\n<li>阿里云轻量级服务器</li>\\n</ul>\\n<h2> 思路</h2>\\n<p>博客文档部分采用 <code>markdown</code> 进行编写，将github仓库作为我们的文章数据源，使用 <code>vuepress</code> 对文章进行静态文件编译，借助 <code>Github actions</code> 将编译好的静态文件作为镜像推送到<code>Docke Hub</code>上，推送成功后<code>Github actions</code>通知云服务器进行<code>Docke</code>更新，云服务器将更新后的<code>Docker 镜像</code>做为容器运行并提供web服务</p>","autoDesc":true}');export{e as data};