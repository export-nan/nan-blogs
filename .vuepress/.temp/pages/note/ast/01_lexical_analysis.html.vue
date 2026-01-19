<template><div><h2 id="词法分析的主要任务" tabindex="-1"><a class="header-anchor" href="#词法分析的主要任务"><span>词法分析的主要任务</span></a></h2>
<ol>
<li>从左往右逐行扫描源字符码，识别各个单词，确定单词的类型</li>
<li>将识别出的单词转换成统一的<code v-pre>词法单元:token</code>进行表示，</li>
</ol>
<h3 id="token-种别码-属性值" tabindex="-1"><a class="header-anchor" href="#token-种别码-属性值"><span>token &lt;种别码, 属性值&gt;</span></a></h3>
<div class="language-ts line-numbers-mode" data-highlighter="shiki" data-ext="ts" data-title="ts" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">token</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">  // 种别码 </span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">  kind</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF">:</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF"> ...</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">  // 属性值</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">  value</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF">...</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以将我们编程中遇见的单词大致分为一下几种形式</p>
<table>
<thead>
<tr>
<th style="text-align:center"></th>
<th style="text-align:center">单词类型</th>
<th style="text-align:left">种别</th>
<th style="text-align:left">种别码</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">1</td>
<td style="text-align:center">关键字</td>
<td style="text-align:left">if, else, for, fun, ...</td>
<td style="text-align:left">一词一码</td>
</tr>
<tr>
<td style="text-align:center">2</td>
<td style="text-align:center">标识符</td>
<td style="text-align:left">变量, 浮点型, 字符型, ...</td>
<td style="text-align:left">多词一码</td>
</tr>
<tr>
<td style="text-align:center">3</td>
<td style="text-align:center">常量</td>
<td style="text-align:left">变量, 浮点型, 字符型, ...</td>
<td style="text-align:left">一型一码</td>
</tr>
<tr>
<td style="text-align:center">4</td>
<td style="text-align:center">运算符</td>
<td style="text-align:left">算数、关系、逻辑 运算符</td>
<td style="text-align:left">一词一码/一型一码</td>
</tr>
<tr>
<td style="text-align:center">5</td>
<td style="text-align:center">界限字符</td>
<td style="text-align:left">; () =  {} ...</td>
<td style="text-align:left">一词一码</td>
</tr>
</tbody>
</table>
<p>我们在分析</p>
<div class="language-ts line-numbers-mode" data-highlighter="shiki" data-ext="ts" data-title="ts" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">  while</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">( </span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">i</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> !=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 100</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> ){</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">    i</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> ++</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  }</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>的时候，
我们可以将它分解为以下token序列</p>
<div class="language-ts line-numbers-mode" data-highlighter="shiki" data-ext="ts" data-title="ts" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">const</span><span style="--shiki-light:#986801;--shiki-dark:#E5C07B"> tokenList</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> [</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">  // while</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  { </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">kind</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF">:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 'WHILE'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">value</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF">:</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> null</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, }</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">  // (</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  { </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">kind</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF">:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 'SLP'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">value</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF">:</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> null</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, }</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">  // i</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  { </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">kind</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF">:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 'IDN'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">value</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF">:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 'i'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, }</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">  // !=</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  { </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">kind</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF">:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 'NE'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">value</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF">:</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> null</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, }</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">  // )</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  { </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">kind</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF">:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 'SRP'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">value</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF">:</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> null</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, }</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">  // {</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  { </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">kind</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF">:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 'LP'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">value</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF">:</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> null</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, }</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">  // i</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  { </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">kind</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF">:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 'IDN'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">value</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF">:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 'i'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, }</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">  // ++</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  { </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">kind</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF">:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 'INC'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">value</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF">:</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> null</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, }</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">  // ;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  { </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">kind</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF">:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 'SEMI'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">value</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF">:</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> null</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, }</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">  // }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  { </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">kind</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF">:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 'RP'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">value</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF">:</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> null</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">]</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


