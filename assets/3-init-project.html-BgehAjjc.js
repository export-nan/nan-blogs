import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as a,c as e,e as i}from"./app-rkgOiK7U.js";const c={};function l(o,n){return a(),e("div",null,n[0]||(n[0]=[i(`<h2 id="初始化项目" tabindex="-1"><a class="header-anchor" href="#初始化项目" aria-hidden="true">#</a> 初始化项目</h2><p>新建一个文件夹作为<code>项目根目录</code>，进入该文件夹，执行以下命令</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>go mod init <span class="token builtin class-name">test</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在这里我们将当前<code>项目的名称</code>定为test,<br> 上面的代码会在当前文件夹下生成一个 go.mod 文件，该文件用于管理项目依赖。</p><div class="language-FileTree line-numbers-mode" data-ext="FileTree"><pre class="language-FileTree"><code>./
└── go.mod
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>在go.mod 文件中，我们能看到以下内容：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>module test <span class="token comment">// 指定当前项目的名称</span>

<span class="token keyword">go</span> <span class="token number">1.20</span> <span class="token comment">// 指定当前项目的 Go 版本</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="创建一个包" tabindex="-1"><a class="header-anchor" href="#创建一个包" aria-hidden="true">#</a> 创建一个包</h2><p>在Go中我们通常用<code>文件</code>或<code>文件目录</code>来表示一个包，比如我们在<code>项目根目录</code>下新建一个命名为<code>calculator的目录</code>，我们可以将当前这个<code>目录</code>看做为一个包，及我们建立了一个包名为calculator的包</p><div class="language-FileTree line-numbers-mode" data-ext="FileTree"><pre class="language-FileTree"><code>./
├── calculator (d) // calculator包
└── go.mod
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在Go包中我们可能有很多具体功能的<code>模块</code>, 我们可以用<code>文件</code>来表示他们，在<code>calculator目录</code>下新建一个文件，命名为<code>logic.go</code>的文件，及我们在<code>calculator</code>包下新建了一个名为<code>logic</code>的模块</p><div class="language-FileTree line-numbers-mode" data-ext="FileTree"><pre class="language-FileTree"><code>./
├── calculator (d) // calculator包
│   └── logic.go
└── go.mod
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在<code>logic.go</code>文件中，我们写入以下内容：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> calculator <span class="token comment">// 表示当前模块属于calculator包</span>

<span class="token comment">/*
  1. func -&gt; 声明函数（function）的关键字
  2. Add -&gt; 函数名, 在Go语言中需要被公共调用的方法需要大驼峰命名，可以理解为 public Add
  3. 类型定义 -&gt; Go语言中类型定义放在变量后面
  4. (a, b int) -&gt; 函数的参数列表，多个参数之间用逗号隔开， 在调用时需要按照顺序传入
  5. int -&gt; 函数的返回值类型，Go语言中函数只能有一个返回值，多个返回值需要用括号包裹起来
*/</span>

<span class="token keyword">func</span> <span class="token function">Add</span><span class="token punctuation">(</span>a <span class="token builtin">int</span><span class="token punctuation">,</span> b <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> a <span class="token operator">+</span> b
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="程序的入口" tabindex="-1"><a class="header-anchor" href="#程序的入口" aria-hidden="true">#</a> 程序的入口</h2><p>在Go中，我们通常用<code>main</code>包来作为程序的入口，在<code>项目根目录</code>下新建一个文件夹，命名为<code>main.go</code>的文件</p><div class="language-FileTree line-numbers-mode" data-ext="FileTree"><pre class="language-FileTree"><code>./
├── calculator (d) // calculator包
│   └── logic.go
├── main.g // main包
└── go.mod
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在main.go文件中，我们写入以下内容：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main <span class="token comment">// 表示当前模块属于main包</span>

<span class="token keyword">import</span> <span class="token punctuation">(</span>
  <span class="token string">&quot;fmt&quot;</span>
  <span class="token string">&quot;test/calculator&quot;</span> <span class="token comment">// 导入我们刚刚创建的包 &lt;项目名&gt;/&lt;包名&gt;</span>
<span class="token punctuation">)</span>

<span class="token comment">/*
* 1、main函数是程序的入口, 会在程序启动时自动被调用
* 2、只有在main包中才能使用main函数
* 3、一个文件中只允许有一个main函数
* 4、一个目录下不推荐多个main方法
*/</span> 
<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Hello World&quot;</span><span class="token punctuation">)</span>
  <span class="token keyword">var</span> result <span class="token operator">=</span> calculator<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span>
  fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="包的概念" tabindex="-1"><a class="header-anchor" href="#包的概念" aria-hidden="true">#</a> 包的概念</h2><p>在Go中，包（Package）是组织代码的基本单位，它将相关的代码组织在一起，方便管理和复用。包可以包含多个文件，每个文件可以定义多个函数、类型、变量等。包还可以包含一个<code>init</code>函数，该函数会在包被导入时自动执行。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> calculator <span class="token comment">// 表示当前模块属于calculator包</span>

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">func</span> <span class="token function">init</span><span class="token punctuation">(</span>a <span class="token builtin">int</span><span class="token punctuation">,</span> b <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span> <span class="token comment">// init函数会在包被导入时自动执行</span>
  fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;init&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在Go中，包的命名通常使用小写字母，并且不包含下划线。包的名称应该简洁明了，能够描述包的功能或用途。例如，<code>fmt</code>包提供了格式化输入输出的功能，<code>net/http</code>包提供了HTTP客户端和服务器功能。</p><p>在相同的包之间互相引用方法，可以直接, 如在<code>calculator</code>包中我们新jian建一个<code>words.go</code>模块，并使用<code>logic.go</code>模块中的<code>Add</code>方法</p><div class="language-FileTree line-numbers-mode" data-ext="FileTree"><pre class="language-FileTree"><code>  ./
  ├── calculator (d) // calculator包
  │   ├── logic.go
  │   └── words.go
  ├── main.g // main包
  └── go.mod
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在<code>words.go</code>文件中，我们需要使用<code>logic.go</code>模块中的<code>Add</code>方法时，我们可以直接使用，无需引用</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> calculator <span class="token comment">// 表示当前模块属于calculator包</span>

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">func</span> <span class="token function">PrintWords</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> resoult <span class="token operator">=</span> <span class="token function">Add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token comment">// 因为他们所属同一个包，所以可以直接使用，无需引用</span>
  fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>resoult<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在不同的包之间互相引用方法，需要使用<code>包名.方法名</code>的方式，如我们在<code>main.go</code>模块中引用<code>calculator</code>包中的<code>Add</code>方法</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main <span class="token comment">// 表示当前模块属于main包</span>

<span class="token keyword">import</span> <span class="token punctuation">(</span>
  <span class="token string">&quot;fmt&quot;</span>
  <span class="token string">&quot;test/calculator&quot;</span> <span class="token comment">// 导入我们刚刚创建的包 &lt;项目名&gt;/&lt;包名&gt;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Hello World&quot;</span><span class="token punctuation">)</span>
  <span class="token keyword">var</span> result <span class="token operator">=</span> calculator<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token comment">// &lt;包名&gt;/&lt;公开的方法名&gt;</span>
  fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,29)]))}const p=s(c,[["render",l],["__file","3-init-project.html.vue"]]);export{p as default};
