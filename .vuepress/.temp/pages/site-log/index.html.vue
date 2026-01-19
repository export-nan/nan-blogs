<template><div><h1 id="起源" tabindex="-1"><a class="header-anchor" href="#起源"><span>起源</span></a></h1>
<h2 id="站点技术选型" tabindex="-1"><a class="header-anchor" href="#站点技术选型"><span>站点技术选型</span></a></h2>
<p>技术栈</p>
<ul>
<li>markdown</li>
<li>vuepress</li>
<li>Github pase</li>
<li>Github actions</li>
</ul>
<p>思路：博客文档部分采用 <code v-pre>markdown</code> 进行编写，将github仓库作为我们的文章数据源，使用 <code v-pre>vuepress</code> 对文章进行静态文件编译，采用 <code v-pre>vuepress-theme-hope</code> 进行主题开发，借助 <code v-pre>Github actions</code> 进行自动化部署。</p>
<p>为什么是 <code v-pre>markdown</code>？ 拜托！<code v-pre>markdown</code> 真的超好用的好吧，我真的爱死mardown了_(:з」∠)_</p>
<p>采用<code v-pre>vuepress</code>编译为静态文件的好处: 首先我们只编写 markdown 文件并 push 到git远端上，这样保证了我们文档笔记的安全性，你也不想你写了很久的笔记因为服务器到期或者其他原因突然离你而去对吧？而且这样我们不用考虑后端交互，只专注于 <code v-pre>markdown</code> 文档编写,<code v-pre>vuepress</code>会帮我搞定一切，并且因为最终编译为静态文件这便于了我们网站在SEO方面的优化，最后我们只要配置好我们的<code v-pre>Github actions</code>我们就可以很方便的对我们的博客内容进行推送</p>
<h2 id="站点规划" tabindex="-1"><a class="header-anchor" href="#站点规划"><span>站点规划</span></a></h2>
<ul class="task-list-container">
<li class="task-list-item"><input type="checkbox" class="task-list-item-checkbox" id="task-item-0" checked="checked" disabled="disabled"><label class="task-list-item-label" for="task-item-0"> 基于<code v-pre>docker</code>自动发布到<code v-pre>阿里云</code></label></li>
<li class="task-list-item"><input type="checkbox" class="task-list-item-checkbox" id="task-item-1" checked="checked" disabled="disabled"><label class="task-list-item-label" for="task-item-1"> 基于<code v-pre>Github actions</code>自动发布到<code v-pre>Github page</code></label></li>
<li class="task-list-item"><input type="checkbox" class="task-list-item-checkbox" id="task-item-2" checked="checked" disabled="disabled"><label class="task-list-item-label" for="task-item-2"> 建站</label></li>
</ul>
<h2 id="源码地址" tabindex="-1"><a class="header-anchor" href="#源码地址"><span>源码地址</span></a></h2>
<p>Github URl: <a href="https://github.com/export-nan/nan-blogs" target="_blank" rel="noopener noreferrer"><em>https://github.com/export-nan/nan-blogs</em></a></p>
<h2 id="技术栈相关" tabindex="-1"><a class="header-anchor" href="#技术栈相关"><span>技术栈相关</span></a></h2>
<p>vuepress: <a href="https://v2.vuepress.vuejs.org/zh/" target="_blank" rel="noopener noreferrer">https://v2.vuepress.vuejs.org/zh/</a></p>
<p>vuepress-theme-hope: <a href="https://theme-hope.vuejs.press/zh/" target="_blank" rel="noopener noreferrer">https://theme-hope.vuejs.press/zh/</a></p>
<p>Github pase: <a href="https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site" target="_blank" rel="noopener noreferrer">https://docs.github.com</a></p>
<p>markdown: <a href="https://commonmark.org/help/" target="_blank" rel="noopener noreferrer">markdown 教程</a></p>
</div></template>


