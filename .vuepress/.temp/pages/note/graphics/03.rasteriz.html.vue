<template><div><h1 id="视口的定义-viewport" tabindex="-1"><a class="header-anchor" href="#视口的定义-viewport"><span>视口的定义（viewport）</span></a></h1>
<h2 id="屏幕空间" tabindex="-1"><a class="header-anchor" href="#屏幕空间"><span>屏幕空间</span></a></h2>
<p>在计算机图像学中使用视角field-of-veiw(fovY)和长宽(aspect ratio)比来定义视口</p>
<figure><img src="@source/.vuepress/public/assets/graphics/viewport.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>在知道视角fovY之后我们可以得到屏幕在竖直方向上的半径$t$</p>
<figure><img src="@source/.vuepress/public/assets/graphics/viewport-tivial.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>$$<br>
t = tan\frac{fovY}{2} * |n|<br>
$$</p>
<p>视口的上下分别为<br>
$$<br>
viewT=t\qquad viewB=-t<br>
$$</p>
<p>视口的水平方向上的半径$r$可以利用长宽比得到<br>
$$<br>
r = aspect*t\qquad viewR= r \qquad viewL = -r<br>
$$</p>
<h1 id="光栅化" tabindex="-1"><a class="header-anchor" href="#光栅化"><span>光栅化</span></a></h1>
<div class="hint-container tip">
<p class="hint-container-title">光栅化就是将模型映射到平面上的过程</p>
</div>
<h2 id="像素与屏幕空间" tabindex="-1"><a class="header-anchor" href="#像素与屏幕空间"><span>像素与屏幕空间</span></a></h2>
<p>屏幕的最小单位为像素，每个像素由三元色(rgb)和明亮程度组成</p>
<figure><img src="@source/.vuepress/public/assets/graphics/screen-space.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<div class="hint-container info">
<p class="hint-container-title">在有些图像api中将坐标系的原点定在屏幕的左上角并反转y轴的方向</p>
</div>
<ul>
<li>像素的坐标为$\begin{pmatrix}x,y\end{pmatrix}$</li>
<li>像素取值范围为$\begin{pmatrix}0,0\end{pmatrix}-&gt;\begin{pmatrix}width-1,height-1\end{pmatrix}$</li>
<li>像素的中心为$\begin{pmatrix}x+0.5,y+0.5\end{pmatrix}$</li>
<li>屏幕的空间为$\begin{pmatrix}0,0\end{pmatrix}-&gt;\begin{pmatrix}width,height\end{pmatrix}$</li>
</ul>
<h2 id="映射到视口矩阵" tabindex="-1"><a class="header-anchor" href="#映射到视口矩阵"><span>映射到视口矩阵</span></a></h2>
<h1 id="在投影变换中我们将模型压缩成为了一个-begin-bmatrix-1-1-end-bmatrix-3-的-标准矩阵-viewing-md-正交投影-orthographic-projection-在这里我们暂时不对-z-轴进行处理-先将标准矩阵的-begin-bmatrix-1-1-end-bmatrix-2-映射到-begin-bmatrix-0-width-end-bmatrix-times-begin-bmatrix-0-height-end-bmatrix-上-并且将原点平移到屏幕的左下角-mviewport" tabindex="-1"><a class="header-anchor" href="#在投影变换中我们将模型压缩成为了一个-begin-bmatrix-1-1-end-bmatrix-3-的-标准矩阵-viewing-md-正交投影-orthographic-projection-在这里我们暂时不对-z-轴进行处理-先将标准矩阵的-begin-bmatrix-1-1-end-bmatrix-2-映射到-begin-bmatrix-0-width-end-bmatrix-times-begin-bmatrix-0-height-end-bmatrix-上-并且将原点平移到屏幕的左下角-mviewport"><span>在投影变换中我们将模型压缩成为了一个$\begin{bmatrix}-1,1\end{bmatrix}<sup>3$的[标准矩阵](./viewing.md/#正交投影-orthographic-projection)，在这里我们暂时不对$z$轴进行处理，先将标准矩阵的$\begin{bmatrix}-1,1\end{bmatrix}</sup>2$映射到$\begin{bmatrix}0,width\end{bmatrix} \times \begin{bmatrix}0,height\end{bmatrix}$上，并且将原点平移到屏幕的左下角<br>
$$<br>
Mviewport</span></a></h1>
<p>\begin{pmatrix}<br>
\frac{width}{2} &amp; 0 &amp; 0 &amp; \frac{width}{2} \<br>
0 &amp; \frac{height}{2} &amp; 0 &amp; \frac{height}{2} \<br>
0 &amp; 0 &amp; 1 &amp; 0 \<br>
0 &amp; 0 &amp; 0 &amp; 1 \<br>
\end{pmatrix}<br>
$$</p>
<h2 id="三角型-图形学最基本的多边形" tabindex="-1"><a class="header-anchor" href="#三角型-图形学最基本的多边形"><span>三角型: 图形学最基本的多边形</span></a></h2>
<div class="hint-container tip">
<p class="hint-container-title">性质:</p>
<ol>
<li>三角型色边最少的三角形</li>
<li>任何其他不同的多边形都能被分割成三角形</li>
<li>三角型的三个点一定是在同一个平面的</li>
</ol>
</div>
<h3 id="采样法判断屏幕上的一个点是否在三角形内" tabindex="-1"><a class="header-anchor" href="#采样法判断屏幕上的一个点是否在三角形内"><span>采样法判断屏幕上的一个点是否在三角形内</span></a></h3>
<p>给定一个函数，去判断该函数内的x，y与三角形三个顶点间向量的叉积的方向是否一致，就可以求出改点，就可以得出该点是否在三角型的内部</p>
<div class="hint-container info">
<p class="hint-container-title">这里的n代指三角形的顶点</p>
<p>$n&gt;0$，$n&lt;=3$，当 $n=3$ 时 $n+1=0$</p>
</div>
<p>$$<br>
p = \begin{pmatrix}<br>
x &amp; y &amp; z<br>
\end{pmatrix}<br>
\qquad<br>
t = \begin{pmatrix}<br>
t^1 \<br>
t^2 \<br>
t^3 \<br>
\end{pmatrix}<br>
\qquad<br>
t^n = \begin{pmatrix}<br>
t_x^n &amp; t_y^n &amp; t_z^n<br>
\end{pmatrix}<br>
$$<br>
求出三角形顶点到当前坐标之间的向量$v_p<sup>n$与三角形顶点之间的向量$v_t</sup>n$<br>
$$<br>
v_p^n = p - t^n =<br>
\begin{pmatrix}<br>
x - t_x^n \<br>
y - t_y^n \<br>
z - t_z^n<br>
\end{pmatrix}<br>
\qquad<br>
v_t^n = t^{n+1} - t^n = \begin{pmatrix}<br>
t_x^{n+1} - t_x^n \<br>
t_y^{n+1} - t_y^n \<br>
t_z^{n+1} - t_z^n<br>
\end{pmatrix}<br>
$$<br>
求出向量$v_t<sup>n$与向量$v_p</sup>n$的叉积<br>
$$<br>
c^n = v_t^n \times v_p^n = \begin{pmatrix}<br>
0 &amp; -(t_z^{n+1} - t_z^n) &amp; t_y^{n+1} - t_y^n \<br>
t_y^{n+1} - t_y^n  &amp; 0 &amp; -(t_x^{n+1} - t_x^n) \<br>
-(t_y^{n+1} - t_y^n) &amp; t_x^{n+1} - t_x^n &amp; 0<br>
\end{pmatrix}<br>
\begin{pmatrix}<br>
x - t_x^n \<br>
y - t_y^n \<br>
z - t_z^n<br>
\end{pmatrix}<br>
$$<br>
计算$z$轴的值<br>
$$<br>
z_n = c_z^n = (t_x^{n+1} - t_x^n)(y - t_y^n) -(t_y^{n+1} - t_y^n)( x - t_x^n )<br>
$$</p>
<div class="hint-container tip">
<p class="hint-container-title">如果z轴的方向同为正或负则点在三角形内</p>
<div class="language-c++ line-numbers-mode" data-highlighter="shiki" data-ext="c++" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-c++"><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(z0 </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">></span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 0</span><span style="--shiki-light:#A626A4;--shiki-dark:#56B6C2"> &#x26;&#x26;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> z1 </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">></span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 0</span><span style="--shiki-light:#A626A4;--shiki-dark:#56B6C2"> &#x26;&#x26;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> z2 </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">></span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 0</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span><span style="--shiki-light:#A626A4;--shiki-dark:#56B6C2">||</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">( z0 </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">&#x3C;</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 0</span><span style="--shiki-light:#A626A4;--shiki-dark:#56B6C2"> &#x26;&#x26;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> z1 </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">&#x3C;</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 0</span><span style="--shiki-light:#A626A4;--shiki-dark:#56B6C2"> &#x26;&#x26;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> z2 </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">&#x3C;</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 0</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>在计算机图形学中我们通常以一个像素的中心点，去判断</p>
</div>
<p>我们使用一个连续的函数去遍历屏幕上的每一个点，对点进行判断，如果在三角形内我们就将它改变颜色并渲染到屏幕上，这样我们就完成了一个基本的三角形的图形光栅化</p>
<h3 id="包围盒优化光栅算法" tabindex="-1"><a class="header-anchor" href="#包围盒优化光栅算法"><span>包围盒优化光栅算法</span></a></h3>
<h2 id="反走样-抗锯齿-与深度缓冲" tabindex="-1"><a class="header-anchor" href="#反走样-抗锯齿-与深度缓冲"><span>反走样(抗锯齿)与深度缓冲</span></a></h2>
</div></template>


