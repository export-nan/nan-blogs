<template><div><h2 id="weblg-容器" tabindex="-1"><a class="header-anchor" href="#weblg-容器"><span>WebLG 容器</span></a></h2>
<p>在浏览器使用 canvas 作为 weblg 容器</p>
<div class="language-html line-numbers-mode" data-highlighter="shiki" data-ext="html" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-html"><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">canvas</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">  id</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"canvas"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">> &#x3C;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">canvas</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>在声明canvas上下文对象时使用 weblg 作为 contextId</p>
<div class="language-ts line-numbers-mode" data-highlighter="shiki" data-ext="ts" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-ts"><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">const</span><span style="--shiki-light:#986801;--shiki-dark:#E5C07B"> ctx</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B"> document</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">querySelector</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">HTMLCanvasElement</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">>(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"#canvas"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)?.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">getContext</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"webgl"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h2 id="坐标系与绘制区间" tabindex="-1"><a class="header-anchor" href="#坐标系与绘制区间"><span>坐标系与绘制区间</span></a></h2>
<div class="hint-container tip">
<p class="hint-container-title">webgl使用的是正交右手坐标系 切每一个方向可使用的值的区间为0到1 超出该区间的图像不会绘制</p>
<p>x最左边为-1,最右边为1;<br>
y轴最下边为-1，最上边为1;<br>
z轴朝向你的方向最大值为1，远离你的方向最大值为-1;</p>
</div>
<div class="hint-container info">
<p class="hint-container-title">注：这些值与Canvas的尺寸无关，无论Canvas的长宽比是多少，WebGl的区间值都是一致的。</p>
</div>
<figure><img src="@source/note/.vuepress/public/assets/webgl/coordinate.png" alt="正交右手坐标系" tabindex="0" loading="lazy"><figcaption>正交右手坐标系</figcaption></figure>
<h2 id="webgl-渲染管线" tabindex="-1"><a class="header-anchor" href="#webgl-渲染管线"><span>WebGL 渲染管线</span></a></h2>
<p>渲染管线就像一条流水线，由一系列具有特定功能的数宇电路单元组成，下一个功能单元处理上一个功能单元生成的数据，逐级处理数据。<br>
顶点着色器和片元着色器是可编程的功能单元，拥有更大的自主性，还有光栅器、深度测试等不可编程的功能单元。CPU会通过WebGL APl和GPU通信，传递着色器程序和数据，GPU执行的着色器程序可以通过useProgram方法切换，传递数据就是把CPU主存中的数据传送到GPU的显存中。</p>
<figure><img src="@source/note/.vuepress/public/assets/webgl/rendering_pipeline.jpg" alt="渲染管线" tabindex="0" loading="lazy"><figcaption>渲染管线</figcaption></figure>
</div></template>


