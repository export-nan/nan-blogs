<template><div><h1 id="线性代数" tabindex="-1"><a class="header-anchor" href="#线性代数"><span>线性代数</span></a></h1>
<h1 id="向量" tabindex="-1"><a class="header-anchor" href="#向量"><span>向量</span></a></h1>
<h2 id="向量-vectors-是一个点指向另一个点的方向" tabindex="-1"><a class="header-anchor" href="#向量-vectors-是一个点指向另一个点的方向"><span>向量(vectors),是一个点指向另一个点的方向</span></a></h2>
<p>$$ \vec{AB} = B - A $$</p>
<h3 id="任何表示的长度为1个单位的向量我们称为单位向量-等于向量-向量的长度" tabindex="-1"><a class="header-anchor" href="#任何表示的长度为1个单位的向量我们称为单位向量-等于向量-向量的长度"><span>任何表示的长度为1个单位的向量我们称为单位向量，等于向量/向量的长度</span></a></h3>
<p>$$ \hat{AB} =  \vec{AB}/||\vec{AB}|| $$</p>
<figure><img src="@source/.vuepress/public/assets/graphics/vector-addition.png" alt="向量相加" tabindex="0" loading="lazy"><figcaption>向量相加</figcaption></figure>
<h3 id="将向量引入到坐标系中表示为" tabindex="-1"><a class="header-anchor" href="#将向量引入到坐标系中表示为"><span>将向量引入到坐标系中表示为</span></a></h3>
<p>$$<br>
\vec{a} =  \begin{pmatrix} x \ y \ \end{pmatrix}<br>
\qquad<br>
\vec{a}^T = \begin{pmatrix} x &amp; y \ \end{pmatrix}<br>
\qquad<br>
||\vec{a}|| = \sqrt{x<sup>2+y</sup>2}<br>
$$</p>
<h3 id="向量的乘法" tabindex="-1"><a class="header-anchor" href="#向量的乘法"><span>向量的乘法</span></a></h3>
<ul>
<li>向量的点乘<br>
$$ \vec{a} . \vec{b} = ||\vec{a}||||\vec{b}||cos\theta $$<br>
这可以帮助我们快速的确定两个向量之间的夹角$cos\theta$<br>
$$ cos\theta = \hat{a}.\hat{b} $$<br>
作用：</li>
</ul>
<ol>
<li>当点乘结果逐渐趋向1时，我们可以知道这两个向量的方向越接近</li>
<li>当点乘结果为0时，我们可以知道这两个向量的方向互相垂直</li>
<li>当点乘结果逐渐趋向-1时，我们可以知道这两个向量的方向相反</li>
</ol>
<p>它满足运算的交换率，与结合率<br>
$$ \vec{a} . \vec{b} = \vec{b} . \vec{a} \qquad \vec{a} . (\vec{b}+\vec{c}) =\vec{a} . \vec{b} + \vec{a} . \vec{c} $$</p>
<ul>
<li>向量的叉乘<br>
$$ \vec{a} \times \vec{b} = ||\vec{a} \times \vec{b}|| = ||\vec{a}||||\vec{b}||sin\phi$$</li>
</ul>
<p>在三维坐标系中(右手坐标系中)<br>
$$ \vec{x} \times \vec{y} = +\vec{z}<br>
$$</p>
<p>叉乘没有交换率<br>
$$  \vec{a} \times \vec{b} = -\vec{b} \times \vec{a}<br>
$$</p>
<p>作用:</p>
<ol>
<li>利用向量叉乘我们可以判断一个向量在另一个向量的左侧还是右侧</li>
<li>可以判断一个点在一个多边形点内侧还是外侧</li>
</ol>
<h1 id="矩阵" tabindex="-1"><a class="header-anchor" href="#矩阵"><span>矩阵</span></a></h1>
<h3 id="矩阵的乘积" tabindex="-1"><a class="header-anchor" href="#矩阵的乘积"><span>矩阵的乘积</span></a></h3>
<p>必须满足$(M \times N)(N \times P) = (M \times P)$</p>
<h1 pmatrix="" id="矩阵的乘积的结果中的单个目标等于矩阵a的行与矩阵b的列的元素分别相乘在并将元素相加-begin-pmatrix-a1-a2-b1-b2-c1-c2-end-pmatrix-begin-pmatrix-a1-a2-b1-b2-end" tabindex="-1"><a class="header-anchor" href="#矩阵的乘积的结果中的单个目标等于矩阵a的行与矩阵b的列的元素分别相乘在并将元素相加-begin-pmatrix-a1-a2-b1-b2-c1-c2-end-pmatrix-begin-pmatrix-a1-a2-b1-b2-end"><span>矩阵的乘积的结果中的单个目标等于矩阵A的行与矩阵B的列的元素分别相乘在并将元素相加<br>
$$<br>
\begin{pmatrix}<br>
a1 &amp; a2\<br>
b1 &amp; b2\<br>
c1 &amp; c2\<br>
\end{pmatrix}<br>
\begin{pmatrix}<br>
A1 &amp; A2\<br>
B1 &amp; B2\<br>
\end</span></a></h1>
<p>\begin{pmatrix}<br>
a1 \times A1 + a2 \times B1 &amp; a1 \times A2 + a2 \times B2\ b1 \times A1 + b2 \times B1 &amp; b1 \times A2 + b2 \times B2\ c1 \times A1 + c2 \times B1 &amp; c1 \times A2 + c2 \times B2\ \end{pmatrix}<br>
$$</p>
<h1 id="只有对角线为1-其他元素为0对矩阵为单位矩阵-i-3-times-3" tabindex="-1"><a class="header-anchor" href="#只有对角线为1-其他元素为0对矩阵为单位矩阵-i-3-times-3"><span>只有对角线为1，其他元素为0对矩阵为单位矩阵<br>
$$<br>
I_{3 \times 3}</span></a></h1>
<p>\begin{pmatrix}<br>
1&amp;0&amp;0\<br>
0&amp;1&amp;0\<br>
0&amp;0&amp;1\<br>
\end{pmatrix}<br>
$$</p>
<h2 id="向量的点乘" tabindex="-1"><a class="header-anchor" href="#向量的点乘"><span>向量的点乘</span></a></h2>
<h1 b="" id="vec-a-vec" tabindex="-1"><a class="header-anchor" href="#vec-a-vec"><span>$$<br>
\vec{a}.\vec</span></a></h1>
<h1 b="" id="vec-a-t-vec" tabindex="-1"><a class="header-anchor" href="#vec-a-t-vec"><span>\vec{a}^T\vec</span></a></h1>
<h1 pmatrix="" id="begin-pmatrix-x-a-y-a-z-a-end-pmatrix-begin-pmatrix-x-b-y-b-z-b-end" tabindex="-1"><a class="header-anchor" href="#begin-pmatrix-x-a-y-a-z-a-end-pmatrix-begin-pmatrix-x-b-y-b-z-b-end"><span>\begin{pmatrix} x_a&amp;y_a&amp;z_a \end{pmatrix}<br>
\begin{pmatrix} x_b \ y_b \ z_b \end</span></a></h1>
<p>(x_ax_b+y_zy_b+z_az_b)<br>
$$</p>
<h2 id="向量的叉乘" tabindex="-1"><a class="header-anchor" href="#向量的叉乘"><span>向量的叉乘</span></a></h2>
<h1 b="" id="vec-a-times-vec" tabindex="-1"><a class="header-anchor" href="#vec-a-times-vec"><span>$$<br>
\vec{a} \times \vec</span></a></h1>
<p>\begin{pmatrix}<br>
0 &amp; -z_a &amp; y_a \<br>
z_a &amp; 0 &amp; -x_a \<br>
-y_z &amp; x_z &amp; 0<br>
\end{pmatrix}<br>
\begin{pmatrix} x_b \ y_b \ z_b \end{pmatrix}<br>
$$</p>
<h3 id="矩阵的变换" tabindex="-1"><a class="header-anchor" href="#矩阵的变换"><span>矩阵的变换</span></a></h3>
<ul>
<li>
<h1 id="缩放-scale-sa" tabindex="-1"><a class="header-anchor" href="#缩放-scale-sa"><span>缩放(scale)<br>
$$<br>
SA</span></a></h1>
<p>\begin{pmatrix}<br>
s_x &amp; 0 &amp; 0\<br>
0 &amp; s_y &amp; 0 \<br>
0 &amp; 0 &amp; s_z<br>
\end{pmatrix}<br>
\begin{pmatrix} x \ y \ z \end{pmatrix}<br>
$$</p>
</li>
<li>
<h1 id="切变-shear-sa" tabindex="-1"><a class="header-anchor" href="#切变-shear-sa"><span>切变(shear)<br>
$$<br>
SA</span></a></h1>
<p>\begin{pmatrix} 1 &amp; s_y \ s_x &amp; 1 \end{pmatrix}<br>
\begin{pmatrix} x \ y  \end{pmatrix}<br>
$$</p>
</li>
<li>
<h1 id="旋转-retition-r-theta" tabindex="-1"><a class="header-anchor" href="#旋转-retition-r-theta"><span>旋转(Retition)<br>
$$<br>
R_\theta</span></a></h1>
<h1 id="begin-pmatrix-cos-theta-sin-theta-sin-theta-cos-theta-end-pmatrix-r-theta" tabindex="-1"><a class="header-anchor" href="#begin-pmatrix-cos-theta-sin-theta-sin-theta-cos-theta-end-pmatrix-r-theta"><span>\begin{pmatrix} cos\theta &amp; -sin\theta \ sin\theta &amp; cos\theta \end{pmatrix}<br>
$$<br>
$$<br>
R^-_\theta</span></a></h1>
<p>\begin{pmatrix} cos\theta &amp; sin\theta \ -sin\theta &amp; cos\theta \end{pmatrix}<br>
$$</p>
</li>
</ul>
<h1 id="奇次坐标" tabindex="-1"><a class="header-anchor" href="#奇次坐标"><span>奇次坐标</span></a></h1>
<p>在平移变换中我们无法使用线性变换的法制进行转换<br>
$$<br>
TA =<br>
\begin{pmatrix}a &amp; b \ c &amp; d \end{pmatrix}<br>
\begin{pmatrix}x \ y \end{pmatrix}<br>
+<br>
\begin{pmatrix}t_x\ t_y \end{pmatrix}<br>
$$<br>
这时我们添加一个坐标 w 用来将它同化为线性变换</p>
<h1 pmatrix="" id="ta-begin-pmatrix-1-0-t-x-0-1-t-y-0-0-1-end-pmatrix-begin-pmatrix-x-y-w-end" tabindex="-1"><a class="header-anchor" href="#ta-begin-pmatrix-1-0-t-x-0-1-t-y-0-0-1-end-pmatrix-begin-pmatrix-x-y-w-end"><span>$$<br>
TA =<br>
\begin{pmatrix}1 &amp; 0 &amp; t_x\ 0 &amp; 1 &amp; t_y \ 0 &amp; 0 &amp; 1\end{pmatrix}<br>
\begin{pmatrix}x \ y \ w\end</span></a></h1>
<p>\begin{pmatrix}x+xt_x\ y+yt_y \ w^2\end{pmatrix}<br>
$$<br>
当$w \neq 0$时这是点坐标<br>
$$<br>
P = \begin{pmatrix}x / w &amp; y / w &amp; 1 \end{pmatrix}<br>
$$</p>
<p>当$w = 0$时这是向量<br>
$$<br>
V = \begin{pmatrix}x &amp; y &amp; 0 \end{pmatrix}<br>
$$</p>
<h2 id="奇次坐标在三维中的转换" tabindex="-1"><a class="header-anchor" href="#奇次坐标在三维中的转换"><span>奇次坐标在三维中的转换</span></a></h2>
<h1 pmatrix="" id="begin-pmatrix-x-prime-y-prime-z-prime-w-end" tabindex="-1"><a class="header-anchor" href="#begin-pmatrix-x-prime-y-prime-z-prime-w-end"><span>$$<br>
\begin{pmatrix} x^\prime \ y^\prime \ z^\prime \ w \end</span></a></h1>
<p>\begin{pmatrix}<br>
a &amp; b &amp; c &amp; t_x \<br>
d &amp; e &amp; f &amp; t_y \<br>
g &amp; h &amp; i &amp; t_z \<br>
0 &amp; 0 &amp; 0 &amp; 1<br>
\end{pmatrix}<br>
.<br>
\begin{pmatrix} x \ y \ z \ w \end{pmatrix}<br>
$$</p>
<p>Scale</p>
<h1 id="s-s-x-s-y-s-z" tabindex="-1"><a class="header-anchor" href="#s-s-x-s-y-s-z"><span>$$<br>
S(s_x,s_y,s_z)</span></a></h1>
<p>\begin{pmatrix}<br>
s_x &amp; 0 &amp; 0 &amp; 0 \<br>
0 &amp; s_y &amp; 0 &amp; 0 \<br>
0 &amp; 0 &amp; s_z &amp; 0 \<br>
0 &amp; 0 &amp; 0 &amp; 1<br>
\end{pmatrix}<br>
$$</p>
<h1 id="translation-t-t-x-t-y-t-z" tabindex="-1"><a class="header-anchor" href="#translation-t-t-x-t-y-t-z"><span>Translation<br>
$$<br>
T(t_x,t_y,t_z)</span></a></h1>
<p>\begin{pmatrix}<br>
1 &amp; 0 &amp; 0 &amp; t_x \<br>
0 &amp; 1 &amp; 0 &amp; t_y \<br>
0 &amp; 0 &amp; 1 &amp; t_z \<br>
0 &amp; 0 &amp; 0 &amp; 1<br>
\end{pmatrix}<br>
$$</p>
<p>Rotation</p>
<h1 id="r-x-theta" tabindex="-1"><a class="header-anchor" href="#r-x-theta"><span>$$<br>
R_x(\theta)</span></a></h1>
<h1 id="begin-pmatrix-1-0-0-0-0-cos-theta-sin-theta-0-0-sin-theta-cos-theta-0-0-0-0-1-end-pmatrix-r-y-theta" tabindex="-1"><a class="header-anchor" href="#begin-pmatrix-1-0-0-0-0-cos-theta-sin-theta-0-0-sin-theta-cos-theta-0-0-0-0-1-end-pmatrix-r-y-theta"><span>\begin{pmatrix}<br>
1 &amp; 0 &amp; 0 &amp; 0  \<br>
0 &amp; cos\theta &amp; -sin\theta &amp; 0 \<br>
0 &amp; sin\theta &amp; cos\theta &amp; 0 \<br>
0 &amp; 0 &amp; 0 &amp; 1<br>
\end{pmatrix}<br>
$$<br>
$$<br>
R_y(\theta)</span></a></h1>
<h1 id="begin-pmatrix-cos-theta-0-sin-theta-0-0-1-0-0-sin-theta-0-cos-theta-0-0-0-0-1-end-pmatrix-r-z-theta" tabindex="-1"><a class="header-anchor" href="#begin-pmatrix-cos-theta-0-sin-theta-0-0-1-0-0-sin-theta-0-cos-theta-0-0-0-0-1-end-pmatrix-r-z-theta"><span>\begin{pmatrix}<br>
cos\theta &amp; 0 &amp; sin\theta &amp; 0 \<br>
0 &amp; 1 &amp; 0 &amp; 0 \<br>
-sin\theta &amp; 0 &amp; cos\theta &amp; 0 \<br>
0 &amp; 0 &amp; 0 &amp; 1<br>
\end{pmatrix}<br>
$$<br>
$$<br>
R_z(\theta)</span></a></h1>
<p>\begin{pmatrix}<br>
cos\theta &amp; -sin\theta &amp; 0 &amp; 0 \<br>
sin\theta &amp; cos\theta &amp; 0 &amp; 0 \<br>
0 &amp; 0 &amp; 1 &amp; 0\<br>
0 &amp; 0 &amp; 0 &amp; 1<br>
\end{pmatrix}<br>
$$</p>
<h2 id="罗德里格斯公式" tabindex="-1"><a class="header-anchor" href="#罗德里格斯公式"><span>罗德里格斯公式</span></a></h2>
<p>$$<br>
R(n,\alpha)=<br>
cos(\alpha)I +<br>
(1-cos(\alpha))nn^T +<br>
sin(\alpha)N<br>
$$<br>
其中<br>
$$<br>
n = 旋转的轴向量（过原点）<br>
\qquad<br>
\alpha = 旋转的角度<br>
$$<br>
$$<br>
n^T = n的转置<br>
\qquad<br>
N =<br>
\begin{pmatrix}<br>
0 &amp; -n_z &amp; n_y \<br>
n_z &amp; 0 &amp; -n_x \<br>
-n_y &amp; n_x &amp; 0<br>
\end{pmatrix}<br>
\qquad<br>
I = 单位矩阵<br>
$$</p>
</div></template>


