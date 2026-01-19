<template><div><h1 id="观测变换" tabindex="-1"><a class="header-anchor" href="#观测变换"><span>观测变换</span></a></h1>
<div class="hint-container info">
<p class="hint-container-title">提问：在现实生活中我们如何将一个三维的世界变成一个二维的平面</p>
<ol>
<li>我们在三维世界中准备好一些模型(模型变换 model transformation)</li>
<li>我们架设好我们的相机(视图变换 view transformation)</li>
<li>我们将模型投影到我们的相机上(投影变换 projection transformation)<br>
在计算机图形学中将这三步简称为MVG</li>
</ol>
</div>
<h2 id="视图-摄像机变换-view-camera-transformation" tabindex="-1"><a class="header-anchor" href="#视图-摄像机变换-view-camera-transformation"><span>视图/摄像机变换 view / Camera transformation</span></a></h2>
<ul>
<li>定义该 veiw 的位置$\vec{e}$</li>
<li>定义向什么地方看$\hat{g}$（look-at/gaze direction）</li>
<li>定义一个向上的方向$\hat{t}$</li>
</ul>
<p>在计算机图形学中我们通常将<code v-pre>view</code>的位置$\vec{e}$ 放在原点，将<code v-pre>view</code>的朝向$\hat{g}$ 与 <code v-pre>-Z</code> 重合，将视图的上方向$\hat{t}$ 与 <code v-pre>Y</code> 重合</p>
<figure><img src="@source/.vuepress/public/assets/graphics/view-transformation.png" alt="view-transformation" tabindex="0" loading="lazy"><figcaption>view-transformation</figcaption></figure>
<ul>
<li>
<p>将视图平移到原点<br>
$$<br>
T_{view}<br>
=<br>
\begin{pmatrix}<br>
0 &amp; 0 &amp; 0 &amp; -X_e\<br>
0 &amp; 0 &amp; 0 &amp; -Y_e  \<br>
0 &amp; 0 &amp; 0 &amp; -Z_e\<br>
0 &amp; 0 &amp; 0 &amp; 1\<br>
\end{pmatrix}<br>
$$</p>
</li>
<li>
<p>旋转到 $\hat{g}$，$\hat{t}$ 与<code v-pre>-Z</code>,<code v-pre>Y</code>重合并不是很方便计算，但我们可以先反过来求<code v-pre>-Z</code>,<code v-pre>Y</code> 与 $\hat{g}$，$\hat{t}$重合<br>
$$<br>
R^-<em>{view}<br>
=<br>
\begin{pmatrix}<br>
x</em>{g \times t} &amp; x_{t} &amp; x_{-g} &amp; 0 \<br>
y_{g \times t} &amp; y_{t} &amp; y_{-g} &amp; 0 \<br>
z_{g \times t} &amp; z_{t} &amp; z_{-g} &amp; 0\<br>
0 &amp; 0 &amp; 0 &amp; 1\<br>
\end{pmatrix}<br>
$$</p>
</li>
<li>
<p>我们再求逆就可以获得旋转后的视图矩阵，且因为旋转矩阵为正交矩阵，正交矩阵的逆等于它的转置<br>
$$<br>
R_{view}<br>
=<br>
\begin{pmatrix}<br>
x_{g \times t} &amp; y_{g \times t} &amp; z_{g \times t} &amp; 0\<br>
x_{t} &amp; y_{t} &amp; z_{t} &amp; 0  \<br>
x_{-g} &amp; y_{-g} &amp; z_{-g} &amp; 0\<br>
0 &amp; 0 &amp; 0 &amp; 1\<br>
\end{pmatrix}<br>
$$</p>
<div class="hint-container tip">
<p class="hint-container-title">正交于正交矩阵</p>
<h4 id="正交" tabindex="-1"><a class="header-anchor" href="#正交"><span>正交</span></a></h4>
<p>正交是指两个向量之间的夹角为 90 度，即它们垂直且不相关。两个正交向量之积为 0，也就是说它们没有共同的方向，因此可以相互抵消。正交性对分析几何中的物理性质非常重要，例如在力学和电磁学中，它们可以用来表示不同的力或不同的电磁场。</p>
<h4 id="正交矩阵" tabindex="-1"><a class="header-anchor" href="#正交矩阵"><span>正交矩阵</span></a></h4>
<p>正交矩阵是一种特殊的矩阵，它具有以下特性：它的列向量之间相互正交、它的行向量之间相互正交，而且它的转置也是它自己（即 $A^T = A$）</p>
</div>
</li>
</ul>
<p>我们先进行平移变换$T_{view}$然后在进行旋转变换$R_{view}$就可以得到视图变换$M_{view}$<br>
$$<br>
M_{view} = R_{view}T_{view}<br>
$$</p>
<h2 id="投影变换-projection-transformation" tabindex="-1"><a class="header-anchor" href="#投影变换-projection-transformation"><span>投影变换 projection transformation</span></a></h2>
<div class="hint-container tip">
<p class="hint-container-title">投影分为</p>
<figure><img src="@source/.vuepress/public/assets/graphics/projection-transformation.png" alt="projection-transformation" tabindex="0" loading="lazy"><figcaption>projection-transformation</figcaption></figure>
</div>
<h3 id="正交投影-orthographic-projection" tabindex="-1"><a class="header-anchor" href="#正交投影-orthographic-projection"><span>正交投影 Orthographic projection</span></a></h3>
<p>我们先定义一个立方体，用$[l,r]$表示左和右，用$[t,b]$表示上和下，用$[f,n]$表示远和近，然后我们将这个立方体先平移到中心与原点对齐，再将他们的宽度都缩放成各方向长度都为2的标准矩阵</p>
<div class="hint-container info">
<p class="hint-container-title">因为我们是从 -Z 往里看的，所以这里的n实际上是大于f的</p>
</div>
<h1 ortho="" id="m" tabindex="-1"><a class="header-anchor" href="#m"><span><img src="@source/.vuepress/public/assets/graphics/orthographic-projection.png" alt="projection-transformation" loading="lazy"><br>
$$<br>
M_</span></a></h1>
<p>\begin{bmatrix}<br>
\frac{2}{r-l} &amp; 0 &amp; 0 &amp; 0 \<br>
0 &amp; \frac{2}{t-b} &amp; 0 &amp; 0 \<br>
0 &amp; 0 &amp; \frac{2}{n-f} &amp; 0 \<br>
0 &amp; 0 &amp; 0 &amp; 1 \<br>
\end{bmatrix}<br>
\begin{bmatrix}<br>
1 &amp; 0 &amp; 0 &amp;  -\frac{r+l}{2}\<br>
0 &amp; 1 &amp; 0 &amp;  -\frac{t+b}{2}\<br>
0 &amp; 0 &amp; 1 &amp;  -\frac{n+f}{2}\<br>
0 &amp; 0 &amp; 0 &amp; 1 \<br>
\end{bmatrix}<br>
$$</p>
<h3 id="透视投影-perspective-projection" tabindex="-1"><a class="header-anchor" href="#透视投影-perspective-projection"><span>透视投影 Perspective projection</span></a></h3>
<p>在透视投影中，我们可以将它简单的分为两步</p>
<ul>
<li>我们先将投影的远平面$f$挤压到与近平面$n$的长宽都有一样</li>
<li>然后我们在做一次正交投影就好了<br>
<img src="@source/.vuepress/public/assets/graphics/perspective-orthographic.png" alt="对模型进行压缩" loading="lazy"></li>
</ul>
<h4 id="挤压远平面-f" tabindex="-1"><a class="header-anchor" href="#挤压远平面-f"><span>挤压远平面$f$</span></a></h4>
<p>我们先观察其中当个向量的变化<br>
<img src="@source/.vuepress/public/assets/graphics/projection-vec.png" alt="" loading="lazy"><br>
不难发现这实际上是一个相识三角形，从中我们可以得出<br>
$$<br>
y^{\prime} = \frac{n}{z} y<br>
$$<br>
同理<br>
$$<br>
x^{\prime} = \frac{n}{z} x<br>
$$</p>
<div class="hint-container tip">
<p class="hint-container-title">在奇次坐标中</p>
<h1 pmatrix="" id="begin-pmatrix-x-y-z-1-end" tabindex="-1"><a class="header-anchor" href="#begin-pmatrix-x-y-z-1-end"><span>$$<br>
\begin{pmatrix}<br>
x &amp; y &amp; z &amp; 1<br>
\end</span></a></h1>
<h1 pmatrix="" id="begin-pmatrix-kx-ky-kz-k-neq0-end" tabindex="-1"><a class="header-anchor" href="#begin-pmatrix-kx-ky-kz-k-neq0-end"><span>\begin{pmatrix}<br>
kx &amp; ky &amp; kz &amp; k \neq	0<br>
\end</span></a></h1>
<p>\begin{pmatrix}<br>
zx &amp; zy &amp; z^2 &amp; z \neq	0<br>
\end{pmatrix}<br>
$$<br>
它们表示的都是空间中的同一个点</p>
</div>
<h1 pmatrix="" id="begin-pmatrix-x-y-z-1-end-pmatrix-begin-pmatrix-nx-z-ny-z-unknown-1-end" tabindex="-1"><a class="header-anchor" href="#begin-pmatrix-x-y-z-1-end-pmatrix-begin-pmatrix-nx-z-ny-z-unknown-1-end"><span>$$<br>
\begin{pmatrix}<br>
x \ y \ z \ 1<br>
\end{pmatrix}<br>
=&gt;<br>
\begin{pmatrix}<br>
nx/z \ ny/z \ unknown \ 1<br>
\end</span></a></h1>
<p>\begin{pmatrix}<br>
nx \ ny \ still \ unknown \ z<br>
\end{pmatrix}<br>
$$<br>
这样我们可以得出压缩矩形的前两行<br>
$$<br>
M_{p-&gt;o} =<br>
\begin{pmatrix}<br>
n &amp; 0 &amp; 0 &amp; 0 \<br>
0 &amp; n &amp; 0 &amp; 0 \<br>
? &amp; ? &amp; ? &amp; ? \<br>
0 &amp; 0 &amp; 1 &amp; 0<br>
\end{pmatrix}<br>
$$</p>
<div class="hint-container tip">
<p class="hint-container-title">现在我们只剩下$z$列没有求出来，我们再观察压缩模型</p>
<figure><img src="@source/.vuepress/public/assets/graphics/perspective-orthographic.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<ul>
<li>在近平面$n$的任何一个点的$\begin{pmatrix}x &amp; y &amp; z\end{pmatrix}$都不会发生变化</li>
<li>在远平面$f$的任何一个点的$z$也不会发生变化</li>
</ul>
</div>
<p>所以在近平面$n$中,我们可以却定<code v-pre>z</code>行的前两列为0,切它经过矩阵之后永远等于它自己</p>
<p>$$</p>
<h1 pmatrix="" id="begin-pmatrix-x-y-n-1-end-pmatrix-begin-pmatrix-x-y-n-1-end" tabindex="-1"><a class="header-anchor" href="#begin-pmatrix-x-y-n-1-end-pmatrix-begin-pmatrix-x-y-n-1-end"><span>\begin{pmatrix}<br>
x \ y \ n \ 1<br>
\end{pmatrix}<br>
=&gt;<br>
\begin{pmatrix}<br>
x \ y \ n \ 1<br>
\end</span></a></h1>
<h1 pmatrix="" id="begin-pmatrix-xn-yn-n-2-n-end-pmatrix-qquad-begin-pmatrix-0-0-a-b-end-pmatrix-begin-pmatrix-x-y-n-1-end-pmatrix-n-2-即-an-b-n-2-在远屏幕-f-上-begin-pmatrix-0-0-f-1-end-pmatrix-begin-pmatrix-0-0-f-1-end" tabindex="-1"><a class="header-anchor" href="#begin-pmatrix-xn-yn-n-2-n-end-pmatrix-qquad-begin-pmatrix-0-0-a-b-end-pmatrix-begin-pmatrix-x-y-n-1-end-pmatrix-n-2-即-an-b-n-2-在远屏幕-f-上-begin-pmatrix-0-0-f-1-end-pmatrix-begin-pmatrix-0-0-f-1-end"><span>\begin{pmatrix}<br>
xn \ yn \ n^2 \ n<br>
\end{pmatrix}<br>
\qquad<br>
\begin{pmatrix}<br>
0 &amp; 0 &amp; A &amp; B<br>
\end{pmatrix}<br>
\begin{pmatrix}<br>
x \ y \ n \ 1<br>
\end{pmatrix}<br>
= n^2<br>
$$<br>
即<br>
$$<br>
An + B = n^2<br>
$$<br>
在远屏幕$f$上<br>
$$<br>
\begin{pmatrix}<br>
0 \ 0 \ f \ 1<br>
\end{pmatrix}<br>
=&gt;<br>
\begin{pmatrix}<br>
0 \ 0 \ f \ 1<br>
\end</span></a></h1>
<p>\begin{pmatrix}<br>
0 \ 0 \ f^2 \ f<br>
\end{pmatrix}<br>
\qquad<br>
Af + B = f^2<br>
$$<br>
将以上两个方程组成方程组<br>
$$<br>
\left{<br>
\begin{array}{c}<br>
An + B = n^2 \<br>
Af + B = f^2\<br>
\end{array}<br>
\right.<br>
得出:<br>
\left{<br>
\begin{array}{c}<br>
A = n + f \<br>
B = -fn \<br>
\end{array}<br>
\right.<br>
$$<br>
这里我们就补全了我们的压缩矩阵<br>
$$<br>
M_{p-&gt;o} =<br>
\begin{pmatrix}<br>
n &amp; 0 &amp; 0 &amp; 0 \<br>
0 &amp; n &amp; 0 &amp; 0 \<br>
0 &amp; 0 &amp; n+f &amp; -fn \<br>
0 &amp; 0 &amp; 1 &amp; 0<br>
\end{pmatrix}<br>
$$<br>
<img src="@source/.vuepress/public/assets/graphics/perspective-orthographic.png" alt="" loading="lazy"></p>
<ul>
<li>在近平面$n$的任何一个点的$\begin{pmatrix}x &amp; y &amp; z\end{pmatrix}$都不会发生变化</li>
<li>在远平面$f$的任何一个点的$z$也不会发生变化</li>
</ul>
<p>现在我们只要将压缩后的视图进行正交投影就得到了我们的透视投影的矩阵<br>
$$<br>
M_{presp}=M_{ortho}M_{p-&gt;o}<br>
$$</p>
<div class="hint-container tip">
<p class="hint-container-title">疑问?: 当$n$$f$中间的任意一个平面被压缩时它的<code v-pre>z</code>是远离我们的近平面还是靠近？</p>
<p>我们带入一个特殊的平面$\frac{n+f}{2}$</p>
<p 2="">$$<br>
\begin{pmatrix}<br>
x &amp; y &amp; \frac{n+f}{2} \ 1<br>
\end{pmatrix}<br>
\begin{pmatrix}<br>
0 \ 0 \ \ n + f \ -fn<br>
\end{pmatrix}<br>
= \frac{(n+f)^2}{2} - fn<br>
= \frac{n^2 +f^2}</p>
<p>$$<br>
因为:<br>
$$<br>
\frac{n^2 +f^2}{2} &gt; 0<br>
$$<br>
所$z^{\prime}$一定是远离$z$的</p>
</div>
</div></template>


