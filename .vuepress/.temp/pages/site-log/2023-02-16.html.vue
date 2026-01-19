<template><div><h2 id="技术选型" tabindex="-1"><a class="header-anchor" href="#技术选型"><span>技术选型</span></a></h2>
<ul>
<li>markdown</li>
<li>vuepress</li>
<li>Github actions</li>
<li>Docker</li>
<li>阿里云轻量级服务器</li>
</ul>
<h2 id="思路" tabindex="-1"><a class="header-anchor" href="#思路"><span>思路</span></a></h2>
<p>博客文档部分采用 <code v-pre>markdown</code> 进行编写，将github仓库作为我们的文章数据源，使用 <code v-pre>vuepress</code> 对文章进行静态文件编译，借助 <code v-pre>Github actions</code> 将编译好的静态文件作为镜像推送到<code v-pre>Docke Hub</code>上，推送成功后<code v-pre>Github actions</code>通知云服务器进行<code v-pre>Docke</code>更新，云服务器将更新后的<code v-pre>Docker 镜像</code>做为容器运行并提供web服务</p>
<div class="language-mermaid line-numbers-mode" data-highlighter="shiki" data-ext="mermaid" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-mermaid"><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">flowchart BT</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  local(本地代码)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  web(web页面)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  subgraph githubServer [github actions]</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    direction LR</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    github([github仓库])</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    githubIC([github actions\n对代码进行构建])</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    end</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  docker(docker镜像仓库)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  server([远端服务器])</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  local-->|推送|github</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  github-->|触发|githubIC</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  githubIC-->|推送镜像|docker</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  githubIC-->|提醒更新|server</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  server&#x3C;-->|获取更新|docker</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  server-->|提供web服务|web</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container tip">
<p class="hint-container-title">疑问</p>
<p>为什么选择 markdown？</p>
<ul>
<li>拜托！markdown真的超好用的好吧，我真的爱死mardown了_(:з」∠)_</li>
</ul>
<p>采用vuepress编译为静态文件的好处</p>
<ul>
<li>首先我们只编写 <code v-pre>markdown</code> 文件并 push 到git远端库上，这样保证了我们文档笔记的安全性，你也不想你写了很久的笔记因为服务器到期或者其他原因突然离你而去对吧？而且这样我们不用考虑后端交互，只专注于 <code v-pre>markdown</code> 文档编写,<code v-pre>vuepress</code>会帮我搞定一切</li>
<li>并且因为最终编译为静态文件这便于了我们网站在SEO方面的优化，最后我们只要配置好我们的<code v-pre>Github actions</code>我们就可以很方便的对我们的博客内容进行推送</li>
</ul>
<p>为什么不直接通过scp将静态文件推送到云服务上？</p>
<ul>
<li>我想你也跟我一样，会担心某天想更换一个服务商，导致我们要更换服务器，这时我们的服务变更导致的重装系统时，我们往往需要根据不同的服务器进行环境配置，这使得我们的系统迁移变得很笨重，如果我们将系统打包成为<code v-pre>Docker镜像</code>，我们就只需要想下载软件一样<code v-pre>安装Docker</code>并运行就好了</li>
</ul>
</div>
</div></template>


