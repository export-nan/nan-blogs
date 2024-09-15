import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as n,c as a,e as i}from"./app-Sq5YptIr.js";const r={};function l(o,e){return n(),a("div",null,e[0]||(e[0]=[i(`<h2 id="技术选型" tabindex="-1"><a class="header-anchor" href="#技术选型" aria-hidden="true">#</a> 技术选型</h2><ul><li>markdown</li><li>vuepress</li><li>Github actions</li><li>Docker</li><li>阿里云轻量级服务器</li></ul><h2 id="思路" tabindex="-1"><a class="header-anchor" href="#思路" aria-hidden="true">#</a> 思路</h2><p>博客文档部分采用 <code>markdown</code> 进行编写，将github仓库作为我们的文章数据源，使用 <code>vuepress</code> 对文章进行静态文件编译，借助 <code>Github actions</code> 将编译好的静态文件作为镜像推送到<code>Docke Hub</code>上，推送成功后<code>Github actions</code>通知云服务器进行<code>Docke</code>更新，云服务器将更新后的<code>Docker 镜像</code>做为容器运行并提供web服务</p><div class="language-mermaid line-numbers-mode" data-ext="mermaid"><pre class="language-mermaid"><code><span class="token keyword">flowchart</span> BT
  local<span class="token text string">(本地代码)</span>
  web<span class="token text string">(web页面)</span>

  <span class="token keyword">subgraph</span> githubServer <span class="token text string">[github actions]</span>
    <span class="token keyword">direction</span> LR
    github<span class="token text string">([github仓库])</span>
    githubIC<span class="token text string">([github actions\\n对代码进行构建])</span>
    <span class="token keyword">end</span>


  docker<span class="token text string">(docker镜像仓库)</span>
  server<span class="token text string">([远端服务器])</span>


  local<span class="token arrow operator">--&gt;</span><span class="token label property">|推送|</span>github
  github<span class="token arrow operator">--&gt;</span><span class="token label property">|触发|</span>githubIC
  githubIC<span class="token arrow operator">--&gt;</span><span class="token label property">|推送镜像|</span>docker
  githubIC<span class="token arrow operator">--&gt;</span><span class="token label property">|提醒更新|</span>server
  server<span class="token arrow operator">&lt;--&gt;</span><span class="token label property">|获取更新|</span>docker
  server<span class="token arrow operator">--&gt;</span><span class="token label property">|提供web服务|</span>web
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container tip"><p class="hint-container-title">疑问</p><p>为什么选择 markdown？</p><ul><li>拜托！markdown真的超好用的好吧，我真的爱死mardown了_(:з」∠)_</li></ul><p>采用vuepress编译为静态文件的好处</p><ul><li>首先我们只编写 <code>markdown</code> 文件并 push 到git远端库上，这样保证了我们文档笔记的安全性，你也不想你写了很久的笔记因为服务器到期或者其他原因突然离你而去对吧？而且这样我们不用考虑后端交互，只专注于 <code>markdown</code> 文档编写,<code>vuepress</code>会帮我搞定一切</li><li>并且因为最终编译为静态文件这便于了我们网站在SEO方面的优化，最后我们只要配置好我们的<code>Github actions</code>我们就可以很方便的对我们的博客内容进行推送</li></ul><p>为什么不直接通过scp将静态文件推送到云服务上？</p><ul><li>我想你也跟我一样，会担心某天想更换一个服务商，导致我们要更换服务器，这时我们的服务变更导致的重装系统时，我们往往需要根据不同的服务器进行环境配置，这使得我们的系统迁移变得很笨重，如果我们将系统打包成为<code>Docker镜像</code>，我们就只需要想下载软件一样<code>安装Docker</code>并运行就好了</li></ul></div>`,6)]))}const c=s(r,[["render",l],["__file","deploy.html.vue"]]);export{c as default};
