<template><div><h2 id="常用命令" tabindex="-1"><a class="header-anchor" href="#常用命令"><span>常用命令</span></a></h2>
<ul>
<li>编译并生成可执行文件</li>
</ul>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-shell"><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">  go</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> build</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> main.go</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><ul>
<li>编译为（二进制）并运行</li>
</ul>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-shell"><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">  go</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> run</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> main.go</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><ul>
<li>管理依赖</li>
</ul>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-shell"><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">  go</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> mod</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> init</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> &#x3C;</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">project</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> nam</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">e> </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 初始化项目: 创建go.mod文件 (包管理工具)</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">  go</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> mod</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> tidy</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"> # 整理依赖: 添加缺失的模块并删除无用的模块</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">  go</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> mod</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> download</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"> # 下载依赖包到本地</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">  go</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> mod</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> verify</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"> # 验证依赖是否正确</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>下载并安装依赖依赖</li>
</ul>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-shell"><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">  go</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> get</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -u</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> github.com/gin-gonic/gin</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"> # 下载依赖</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">  go</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> get</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -u</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> github.com/gin-gonic/gin@v1.7.4</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"> # 下载指定版本的依赖</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>编译与安装包</li>
</ul>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-shell"><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">  go</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> install</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> github.com/gin-gonic/gin</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"> # 编译并安装包</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><ul>
<li>删除源码包和管理源码包里编译生成的文件</li>
</ul>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-shell"><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">  go</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> clean</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -modcache</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"> # 删除源码包</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">  go</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> clean</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -i</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"> # 删除管理源码包里编译生成的文件</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>查看 go 的环境变量</li>
</ul>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-shell"><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">  go</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> env</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><ul>
<li>格式化代码</li>
</ul>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-shell"><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">  go</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> fmt</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> main.go</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><ul>
<li>查看Go的当前版本</li>
</ul>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-shell"><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">  go</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> version</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><ul>
<li>查看Go工具</li>
</ul>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-shell"><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">  go</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> tool</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><ul>
<li>查看包的文档</li>
</ul>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-shell"><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">  go</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> doc</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> fmt</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></div></template>


