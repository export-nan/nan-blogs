<template><div><h2 id="数据类型" tabindex="-1"><a class="header-anchor" href="#数据类型"><span>数据类型</span></a></h2>
<ul>
<li>基本数据类型
<ul>
<li>布尔（bool）</li>
<li>数值类型:
<ul>
<li>整形（int）</li>
<li>浮点型（float）</li>
</ul>
</li>
<li>字符串类型 (string)</li>
</ul>
</li>
<li>派生数据类型
<ul>
<li>指针</li>
<li>数组(Array)</li>
<li>结构体(struct)</li>
<li>管道(channel)</li>
<li>切片(slice)</li>
<li>接口(interface)</li>
<li>映射(Map)</li>
<li>函数(func)</li>
</ul>
</li>
</ul>
<h2 id="内存分配方式" tabindex="-1"><a class="header-anchor" href="#内存分配方式"><span>内存分配方式</span></a></h2>
<div class="hint-container tip">
<p class="hint-container-title">数据类型的分类</p>
<p>值类型： 布尔类型、数值类型、字符串类型、数组类型、结构体类型<br>
引用类型：指针、通道、切片、接口、映射、函数</p>
</div>
<p>内存空间分为<code v-pre>栈内存</code>和<code v-pre>堆内存</code>，值类型一般由内存中的栈内存进行空间分配，</p>
<h3 id="值类型的内存分配" tabindex="-1"><a class="header-anchor" href="#值类型的内存分配"><span>值类型的内存分配</span></a></h3>
<p>声明的本质是命令计算机在内存上开辟一块内存空间用来存放我们的数据，内存地址用来标记这块空间，为了方便我们编程，现代计算机语言中通常使用标识符来代替内存地址</p>
<div class="language-go line-numbers-mode" data-highlighter="shiki" data-ext="go" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-go"><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">                   //   标识符      地址      栈内存</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">var</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> x</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">:</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">int</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B"> =</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 1</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">      //     X       0X0001      1</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">var</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> y</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">:</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">int</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B"> =</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> x</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">      //     Y       0X0002      1     &#x3C;=    x  将 x 的值拷贝过来</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里实际上是开辟了两块不同的内存空间，当我们改变 x 的值的时候 y 并不会随之改变</p>
<div class="language-go line-numbers-mode" data-highlighter="shiki" data-ext="go" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-go"><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">                   //   标识符      地址      栈内存</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">var</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> x</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">:</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">int</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B"> =</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 1</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">      //     X       0X0001      1     &#x3C;=  2    这里的值被下面改变了</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">var</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> y</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">:</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">int</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B"> =</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> x</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">      //     Y       0X0002      1    这里的值还是1</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">x</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B"> =</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 2</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">              //     它会去寻找 标识符 x 对于的地址所指向的内存空间，并改变其中的值</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="引用类型的内存分配" tabindex="-1"><a class="header-anchor" href="#引用类型的内存分配"><span>引用类型的内存分配</span></a></h3>
<p>在引用类型中通常将数据存储在堆内存里，在标识符对于的栈内存空间中实际上存储的是堆内存的内存地址</p>
<div class="language-go line-numbers-mode" data-highlighter="shiki" data-ext="go" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-go"><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">                      // 标识符     地址      栈内存           内存地址      堆内存      </span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">x</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> [</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">2</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">3</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">]         </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">//   x     0x00001   0x10001          0x10001     [1,2,3]    </span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">y</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B"> =</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> x</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">                 //   y     0x00002   0x10001</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个时候 y 与 x 是指向的同一块堆内存，所以当我改变 x 中的一个元素的值时，y 也会跟着一起被改变</p>
<div class="hint-container tip">
<p class="hint-container-title">引用类型对于内存空间的分配是动态的</p>
<p>在golang的设计理念中数组和结构体的长度是固定的，所它们是值类型而不是引用类型，我们在定义他们的时候要指定长度和存储的元素的数据类型</p>
</div>
<h3 id="指针" tabindex="-1"><a class="header-anchor" href="#指针"><span>指针</span></a></h3>
<p>指针的本质就是内存地址, 我们可以使用<code v-pre>&amp;</code>+<code v-pre>标识符</code>的形式获取一个这个标识符所代表的指针，也可以使用<code v-pre>*</code>前缀来找到一个指针所指向的内存空间中的值</p>
<div class="language-go line-numbers-mode" data-highlighter="shiki" data-ext="go" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-go"><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">                        // 标识符     地址      栈内存</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">var</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> x</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> int</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B"> =</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 1</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">           //   x     0x00001      1</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">var</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> ptr</span><span style="--shiki-light:#383A42;--shiki-dark:#C678DD"> *</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">int</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#C678DD"> &#x26;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">x</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">       //  ptr    0x00002   0x00001         将 x 这个标识符所代表的内存地址放到栈内存里</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">var</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> y</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> int</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#C678DD"> *</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">ptr</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">        //   y     0x00003      1            将 0x00001 这个指针指向的内存中的值放到这里</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container tip">
<p class="hint-container-title">指针本身是没有类型的, 它是一段16进制的地址索引</p>
<div class="language-go line-numbers-mode" data-highlighter="shiki" data-ext="go" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-go"><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">var</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> ptr</span><span style="--shiki-light:#383A42;--shiki-dark:#C678DD"> *</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">int</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#C678DD"> &#x26;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">x</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>这里的 int 表示这个指针所指向内存空间中的值的内型，比如当 x 为一个浮点型时</p>
<div class="language-go line-numbers-mode" data-highlighter="shiki" data-ext="go" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-go"><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">var</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> ptr</span><span style="--shiki-light:#383A42;--shiki-dark:#C678DD"> *</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">float64</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#C678DD"> &#x26;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">x</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></div>
<h2 id="数值类型的存储空间和取值范围" tabindex="-1"><a class="header-anchor" href="#数值类型的存储空间和取值范围"><span>数值类型的存储空间和取值范围</span></a></h2>
<h3 id="整型" tabindex="-1"><a class="header-anchor" href="#整型"><span>整型</span></a></h3>
<table>
<thead>
<tr>
<th>名称</th>
<th>字节数</th>
<th>存储位数</th>
<th>取值范围</th>
</tr>
</thead>
<tbody>
<tr>
<td>int</td>
<td>4/8</td>
<td>32/64</td>
<td>-2<sup>31</sup> ~ 2<sup>31-1</sup> / -2<sup>64</sup> ~ 2<sup>64-1</sup></td>
</tr>
<tr>
<td>int8</td>
<td>1</td>
<td>8</td>
<td>-2<sup>7</sup> ~ 2<sup>7-1</sup> (-128 ~ 127)</td>
</tr>
<tr>
<td>int16</td>
<td>2</td>
<td>16</td>
<td>-2<sup>15</sup> ~ 2<sup>15-1</sup> (-32768 ~ 32767)</td>
</tr>
<tr>
<td>int32</td>
<td>4</td>
<td>32</td>
<td>-2<sup>31</sup> ~ 2<sup>31-1</sup> (-2147483648 ~ 2147483647)</td>
</tr>
<tr>
<td>int64</td>
<td>8</td>
<td>64</td>
<td>-2<sup>63</sup> ~ 2<sup>63-1</sup></td>
</tr>
<tr>
<td>uint</td>
<td>4/8</td>
<td>32/64</td>
<td>0 ~ 2<sup>32-1</sup> / 0 ~ 2<sup>64-1</sup></td>
</tr>
<tr>
<td>uint8</td>
<td>1</td>
<td>8</td>
<td>0 ~ 2<sup>8-1</sup> (0 ~ 255)</td>
</tr>
<tr>
<td>uint16</td>
<td>2</td>
<td>16</td>
<td>0 ~ 2<sup>16-1</sup> (0 ~ 65535)</td>
</tr>
<tr>
<td>uint32</td>
<td>4</td>
<td>32</td>
<td>0 ~ 2<sup>32-1</sup> (0 ~ 4294967295)</td>
</tr>
<tr>
<td>uint64</td>
<td>8</td>
<td>64</td>
<td>0 ~ 2<sup>64-1</sup> (0 ~ 18446744073709551615)</td>
</tr>
</tbody>
</table>
<h3 id="浮点型" tabindex="-1"><a class="header-anchor" href="#浮点型"><span>浮点型</span></a></h3>
<table>
<thead>
<tr>
<th>名称</th>
<th>字节数</th>
<th>存储位数</th>
<th>负数的取值范围</th>
<th>正数的取值范围</th>
</tr>
</thead>
<tbody>
<tr>
<td>float32</td>
<td>4</td>
<td>32</td>
<td>-3.4E38 ~ -1.4E-45</td>
<td>1.4E-45 ~ 3.4E38</td>
</tr>
<tr>
<td>float64</td>
<td>8</td>
<td>64</td>
<td>-1.7E308 ~ -4.9E-324</td>
<td>4.9E-324 ~ 1.7E308</td>
</tr>
</tbody>
</table>
<h3 id="复数" tabindex="-1"><a class="header-anchor" href="#复数"><span>复数</span></a></h3>
<p>复数由两个浮点数组成，分别是实部和虚部</p>
<table>
<thead>
<tr>
<th>名称</th>
<th>字节数</th>
<th>存储位数</th>
<th>取值范围</th>
</tr>
</thead>
<tbody>
<tr>
<td>complex64</td>
<td>8</td>
<td>64</td>
<td>(-1.18E4932 ~ -4.9E-324i) ~ (1.18E4932 ~ 4.9E-324i)</td>
</tr>
<tr>
<td>complex128</td>
<td>16</td>
<td>128</td>
<td>(-1.18E4932 ~ -4.9E-324i) ~ (1.18E4932 ~ 4.9E-324i)</td>
</tr>
</tbody>
</table>
<h2 id="字符类型" tabindex="-1"><a class="header-anchor" href="#字符类型"><span>字符类型</span></a></h2>
<h3 id="单个字符-char" tabindex="-1"><a class="header-anchor" href="#单个字符-char"><span>单个字符(char)</span></a></h3>
<p>在 golang 中用单引好表示单个字符</p>
<div class="language-go line-numbers-mode" data-highlighter="shiki" data-ext="go" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-go"><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">var</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> ch</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B"> =</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> '</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">a</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h3 id="asclii字符" tabindex="-1"><a class="header-anchor" href="#asclii字符"><span>ASCLII字符</span></a></h3>
<p>使用<code v-pre>byte</code>来表示ASCLII码中的字符，它实际上是一个unint8类型，也就是一个字节，长度为8位，取值范围为0 ~ 255</p>
<div class="language-go line-numbers-mode" data-highlighter="shiki" data-ext="go" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-go"><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">var</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> ch</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> byte</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B"> =</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> '</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">a</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">fmt</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">Println</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">ch</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">) </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// 97  &#x3C;=  'a' 的ASCLII码</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">var</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> ch</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> byte</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B"> =</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 97</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">fmt</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">Println</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">%c</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> ch</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">) </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">//</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="unicode字符" tabindex="-1"><a class="header-anchor" href="#unicode字符"><span>Unicode字符</span></a></h3>
<p>使用<code v-pre>rune</code>来表示Unicode中的字符，它实际上是一个int32类型，也就是4个字节，长度为32位，取值范围为-2<sup>31</sup> ~ 2<sup>31-1</sup></p>
<div class="language-go line-numbers-mode" data-highlighter="shiki" data-ext="go" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-go"><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">var</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> ch</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> rune</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B"> =</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> '</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">你</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">fmt</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">Println</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">ch</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">) </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// 20320  &#x3C;=  '你' 的Unicode码</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">var</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> ch</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> rune</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B"> =</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 20320</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">fmt</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">Println</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">%c</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> ch</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">) </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// 你</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="字符串" tabindex="-1"><a class="header-anchor" href="#字符串"><span>字符串</span></a></h3>
<p>字符串是由字符组成的合集，在golang使用双引号来表示字符串</p>
<div class="language-go line-numbers-mode" data-highlighter="shiki" data-ext="go" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-go"><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">var</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> str</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> string</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B"> =</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> "hello world"</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">var</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> str2</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> string</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B"> =</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> '</span><span style="--shiki-light:white;--shiki-dark:#FFFFFF">hello world</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"> // 编译错误</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>字符串的长度可以通过<code v-pre>len()</code>函数来获取</p>
<div class="language-go line-numbers-mode" data-highlighter="shiki" data-ext="go" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-go"><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">var</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> str</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> string</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B"> =</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> "hello world"</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">fmt</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">Println</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">len</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">str</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)) </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// 11</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>字符串的拼接可以使用<code v-pre>+</code>符号</p>
<div class="language-go line-numbers-mode" data-highlighter="shiki" data-ext="go" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-go"><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">var</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> str1</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> string</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B"> =</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> "hello world"</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">var</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> str2</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> string</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B"> =</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> "NAN"</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">var</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> str3</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> string</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B"> =</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> str1</span><span style="--shiki-light:#383A42;--shiki-dark:#C678DD"> +</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> ", "</span><span style="--shiki-light:#383A42;--shiki-dark:#C678DD"> +</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> str2</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在golang中的中文字符占用 3 个字节，英文字符占用 1 个字节</p>
<div class="language-go line-numbers-mode" data-highlighter="shiki" data-ext="go" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-go"><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">var</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> strA</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> string</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B"> =</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> "I"</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">fmt</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">Println</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">len</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">strA</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)) </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// 1</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">var</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> strB</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> string</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B"> =</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> "我"</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">fmt</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">Println</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">len</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">strB</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)) </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// 3</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


