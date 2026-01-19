<template><div><h1 id="unix命令行使用日志" tabindex="-1"><a class="header-anchor" href="#unix命令行使用日志"><span>Unix命令行使用日志</span></a></h1>
<h2 id="启动命令行工具加载慢" tabindex="-1"><a class="header-anchor" href="#启动命令行工具加载慢"><span>启动命令行工具加载慢</span></a></h2>
<p>最近遇到启动命令行工具加载慢的问题，表现为每次打开一个新的zsh终端窗口时，需要等待几秒钟才能看到命令提示符。<br>
目标为找到是那些启动依赖导致加载慢的。</p>
<p>首先在 .zshrc 顶部加上：</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-shell"><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">zmodload</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> zsh/zprof</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>在 .zshrc 末尾加上：</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-shell"><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">zprof</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>然后重新打开一个终端，会自动打印出：</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-shell"><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">num</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">  calls</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">                time</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">                       self</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">            name</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">-----------------------------------------------------------------------------------</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)    1         300.45    300.45   51.85%     300.45   51.85%  eval</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">2</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)    1         180.02    180.02   31.10%     180.02   31.10%  pyenv init</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">3</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)    1          60.01     60.01   10.36%      60.01   10.36%  oh-my-zsh.sh</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里可以看到是什么在导致加载慢，然后根据提示去优化。绝大多少情况下都是再.zshrc中有一些插件或者命令导致加载慢，比如我这里就是pyenv init导致加载慢，因为pyenv init会加载很多python的版本，导致加载慢，所以这里可以尝试注释掉pyenv init，去掉后再打开终端，发现加载速度明显提升。</p>
</div></template>


