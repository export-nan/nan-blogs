import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as a,c as e,e as i}from"./app-rkgOiK7U.js";const o={};function l(t,n){return a(),e("div",null,n[0]||(n[0]=[i(`<h2 id="概念" tabindex="-1"><a class="header-anchor" href="#概念" aria-hidden="true">#</a> 概念</h2><p><code>变量</code>与<code>常量</code>是数据在内存中的抽象, 它们是内存地址的别名，用来方便我们操作内存中的数据。</p><p>比如我们有一组运算 $X = A + B， A = 1，B = 2 $ 需要完成，在计算机中我们需要</p><ol><li>将 1 存储到内存中，假设存储在地址 0X0001，并为这个内存地址取一个别名 A</li><li>将 2 存储到内存中，假设存储在地址 0X0002，并为这个内存地址取一个别名 B</li><li>然后将 A 与 2 相加，得到结果 3， 在CUP中实际上就是：内存地址 0X0001 与 0X0002 所存放的数相加</li><li>把结果 3 存储到内存中，假设存储在地址 0X0003，并为这个内存地址取一个别名 X</li></ol><p>在内存中的表现形式：</p><table><thead><tr><th>别名</th><th>内存地址</th><th>值</th></tr></thead><tbody><tr><td>A</td><td>0X0001</td><td>1</td></tr><tr><td>B</td><td>0X0002</td><td>2</td></tr><tr><td>X</td><td>0X0003</td><td>3</td></tr></tbody></table><p>有时这里的变量名也叫做标识符，及标识内存地址的符号，目的是为了方便我们在编程时对内存中的数据的进行存取</p><h2 id="变量" tabindex="-1"><a class="header-anchor" href="#变量" aria-hidden="true">#</a> 变量</h2><p>可变的数据，当我们不确定一个数据的值是否是不变的时候，我们通常用变量来定义这个值</p><h3 id="声明" tabindex="-1"><a class="header-anchor" href="#声明" aria-hidden="true">#</a> 声明</h3><p>在 Golang 中，我们使用 <code>var</code> 关键字来声明一个变量，语法如下：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">/**
关键字 变量标识符 类型 赋值符号 值
var     x      int    =     1
*/</span> 
<span class="token keyword">var</span> x <span class="token builtin">int</span> <span class="token operator">=</span> <span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在声明变量时可以不初始化，可以在变量声明之后进行再进行赋予值</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>  <span class="token keyword">var</span> x <span class="token builtin">int</span> <span class="token comment">// 这里会现在内存上开辟一块 int 类型的内存空间，并为这个内存地址取一个别名 x</span>
  <span class="token operator">...</span><span class="token operator">...</span>
  <span class="token comment">/**
  我们可以在需要为x赋值的时候，再进行赋值
  */</span> 
  x <span class="token operator">=</span> <span class="token number">1</span> <span class="token comment">// 将数值 1 存储到内存中 x 标注的(内存地址指向的)空间中</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在Golang中声明的变量必须使用，不使用会让程序报错，如果不想使用这个变量，可以使用 <code>_</code> 来代替变量名</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>  <span class="token keyword">var</span> <span class="token boolean">_</span> <span class="token builtin">int</span> <span class="token operator">=</span> <span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在 Golang 中，常量不可以在同一作用域下重复声明</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">var</span> x <span class="token operator">=</span> <span class="token number">1</span>
<span class="token keyword">var</span> x <span class="token operator">=</span> <span class="token number">2</span> <span class="token comment">// 这里会报错，因为 x 已经声明过了</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">var</span> x <span class="token operator">=</span> <span class="token number">1</span> 
<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> x <span class="token operator">=</span> <span class="token number">2</span> <span class="token comment">// 这里不会报错，因为这里 x 在 main 函数中是重新声明的, 它们不在一个作用于内</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在 Golang 中，我们可以同时声明多个变量，语法如下：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>  <span class="token comment">// 批量声明法，可以单独指定每一个变量的类型</span>
  <span class="token keyword">var</span> <span class="token punctuation">(</span>
    a <span class="token builtin">int</span> <span class="token operator">=</span> <span class="token number">1</span>
    b <span class="token builtin">int</span> <span class="token operator">=</span> <span class="token number">2</span>
  <span class="token punctuation">)</span>

  <span class="token comment">// 单一声明法(多重声明法)，只能批量声明同类型的变量</span>
  <span class="token keyword">var</span> x<span class="token punctuation">,</span> y <span class="token builtin">int</span> <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span> 
  <span class="token comment">/**
  这里的语法可以理解为
  关键字 (变量标识符, 变量标识符) 类型 赋值符号 (值, 值)
  var      x, y               int   =      1,2
  简单的说就是int定义了()中的所有变量的类型

  var x int, y int = 1, 2 // 如果这样写会报语法错误
  */</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在声明变量时，如果初始化了值，可以省略类型，Golang 会根据初始化的值自动推断变量的类型</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>  <span class="token keyword">var</span> x <span class="token operator">=</span> <span class="token number">1</span> <span class="token comment">// 这里会自动推断 x 的类型为 int</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在函数内部，可以使用 <code>:=</code> 来声明并初始化变量，这种声明方式叫做简短声明，它只能在函数内部使用</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>  x <span class="token operator">:=</span> <span class="token number">1</span> 
  <span class="token comment">/**
    它的本质是先使用 var 声明变量，然后使用 := 进行赋值
    var x int
    x = 1
  */</span>

  <span class="token comment">// 它也可以用于同时声明多个变量</span>
  x<span class="token punctuation">,</span> y <span class="token operator">:=</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在 Golang 中，我们可以使用 <code>_</code> 来表示匿名变量，它表示忽略这个值，不进行存储，这个在我们获取函数的返回时非常有用</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>  <span class="token boolean">_</span><span class="token punctuation">,</span> b <span class="token operator">:=</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span> <span class="token comment">// 这里会忽略 1，只存储 2 到 b 中</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="常量" tabindex="-1"><a class="header-anchor" href="#常量" aria-hidden="true">#</a> 常量</h2><p>恒定不变的数据，当我们确定一个数据的值是不变的时候，我们通常用用常量来定义这个值，它用来替代值的重复使用，且限制其的改变，它在编译时确定，在运行时不能改变</p><h3 id="声明-1" tabindex="-1"><a class="header-anchor" href="#声明-1" aria-hidden="true">#</a> 声明</h3><p>在 Golang 中，我们使用 <code>const</code> 关键字来声明一个常量，语法如下：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">/**
关键字 变量标识符    类型    赋值符号   值
const     PI    float32     =     3.14
*/</span> 
  <span class="token keyword">const</span> PI <span class="token builtin">float32</span> <span class="token operator">=</span> <span class="token number">3.14</span> <span class="token comment">// 常量在声明时必须初始化值</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在 Golang 中，常量的值必须是编译期可确定的，也就是说，常量的值必须在编译时就确定，不能在运行时确定</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>  <span class="token keyword">const</span> TIME_NOW <span class="token operator">=</span> time<span class="token punctuation">.</span><span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 这里会报错，因为 time.Now() 是在运行时确定的</span>

  <span class="token keyword">func</span> <span class="token function">num</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token number">1</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">const</span> A <span class="token operator">=</span> <span class="token function">num</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 这里也会报错</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在 Golang 中，常量不可以在同一作用域下重复声明</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">const</span> PI <span class="token builtin">float32</span> <span class="token operator">=</span> <span class="token number">3.14</span>
<span class="token keyword">const</span> PI <span class="token builtin">float32</span> <span class="token operator">=</span> <span class="token number">3.14</span> <span class="token comment">// 这里会报错，因为 x 已经声明过了</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">const</span> PI <span class="token builtin">float32</span> <span class="token operator">=</span> <span class="token number">3.14</span>
<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> PI <span class="token builtin">float32</span> <span class="token operator">=</span> <span class="token number">3.14</span> <span class="token comment">// 这里不会报错，因为这里 x 在 main 函数中是重新声明的, 它们不在一个作用于内</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在 Golang 中，我们也可以同时声明多个常量，语法如下：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>  <span class="token comment">// 单一声明法(多重声明法)，只能批量声明同类型的常量</span>
  <span class="token keyword">const</span> X<span class="token punctuation">,</span> Y <span class="token builtin">int</span> <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span> 
  <span class="token comment">/**
  这里的语法可以理解为
  关键字 (变量标识符, 变量标识符) 类型 赋值符号 (值, 值)
  const      x, y               int   =      1,2
  简单的说就是int定义了()中的所有变量的类型

  const x int, y int = 1, 2 // 如果这样写会报语法错误
  */</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在使用批量声明法时，第一个常量必须初始化，后面的常量在编译时自动采用最后一个常量的类型和值</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>  <span class="token keyword">const</span> <span class="token punctuation">(</span>
    A <span class="token builtin">int</span> <span class="token operator">=</span> <span class="token number">1</span>
    B <span class="token comment">// 1</span>
    C <span class="token comment">// 1</span>
  <span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>常量也可以自动进行类型推断</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>  <span class="token keyword">const</span> PI <span class="token operator">=</span> <span class="token number">3.14</span> <span class="token comment">// 这里会自动推断 x 的类型</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="iota" tabindex="-1"><a class="header-anchor" href="#iota" aria-hidden="true">#</a> iota</h2><p>iota可以在Go程序编译时修改常量的值，默认起始值为0<br> 每创建常量一个，iota迭代次数就加1</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>  <span class="token keyword">const</span> <span class="token punctuation">(</span>
    A <span class="token operator">=</span> <span class="token boolean">iota</span> <span class="token comment">// iota = 0</span>
    B       <span class="token comment">//  B = iota = 1</span>
    C       <span class="token comment">//  C = iota = 2</span>
  <span class="token punctuation">)</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以理解为在使用const关键字的时候，Golang就会自动创建一个iota迭代器, 并初始化值，默认为0，在接下来的过程中，每创建一个常量，iota的值就会自增1</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>  <span class="token keyword">const</span> <span class="token punctuation">(</span> <span class="token comment">// 初始化 iota = 0</span>
    A <span class="token operator">=</span> <span class="token number">0</span> <span class="token comment">// A = 0, iota++      执行完后(iota = 1)</span>
    B   <span class="token comment">// B = A = 0, iota++    执行完后(iota = 2)</span>
    C <span class="token operator">=</span> <span class="token boolean">iota</span> <span class="token comment">// C = iota = 2, iota++  执行完后(iota = 3)</span>
    D   <span class="token comment">// D = C = iota = 3, iota++  执行完后(iota = 4)</span>
    E <span class="token operator">=</span> <span class="token boolean">iota</span> <span class="token operator">+</span> <span class="token boolean">iota</span> <span class="token comment">// E = iota + iota = 4 + 4 = 8, iota++  执行完后(iota = 5)</span>

    F   <span class="token comment">// F = 10, iota++  执行完后(iota = 6)</span>
    <span class="token comment">// 注意这里并不是将E的值直接赋值给F，换句话说并不是 F = E(值) = 10, 而是F = W = iota + iota = 5 + 5 = 10</span>
  <span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,48)]))}const d=s(o,[["render",l],["__file","5-var.html.vue"]]);export{d as default};
