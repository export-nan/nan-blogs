import{_ as i,W as l,X as u,a0 as a,Z as n,$ as s,a2 as d,a1 as t,G as e}from"./framework-51d990c7.js";const r={},k=t(`<h2 id="什么是响应式" tabindex="-1"><a class="header-anchor" href="#什么是响应式" aria-hidden="true">#</a> 什么是响应式?</h2><p>首先响应式是一个过程，由两个参与者组成，一个是<code>触发者</code>，另个是<code>响应者</code></p><ul><li>触发者：数据</li><li>响应者：引用数据的函数 (vue3中称之为<code>副作用函数(effect)</code>)</li></ul><p>当数据改变时，引用数据的<code>副作用函数</code>响应数据的改变并重新执行，这个过程就是响应式</p><h2 id="响应式核心-proxy-代理" tabindex="-1"><a class="header-anchor" href="#响应式核心-proxy-代理" aria-hidden="true">#</a> 响应式核心：Proxy 代理</h2><p><code>new Proxy</code> 传入一个源对象，返回一个<code>Proxy</code>实例</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">//创建一个源对象</span>
<span class="token keyword">const</span> srcObj <span class="token operator">=</span> <span class="token punctuation">{</span> name<span class="token operator">:</span> <span class="token string">&#39;srcObj&#39;</span><span class="token punctuation">}</span>

<span class="token comment">// 对srcObj进行代理</span>
<span class="token keyword">const</span> prxoy <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Proxy</span><span class="token punctuation">(</span>srcObj<span class="token punctuation">,</span><span class="token punctuation">{</span>
  <span class="token function">get</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">// 当访问proxy代理对象的属性时，会执行get函数</span>
    <span class="token comment">// 将get函数的返回值作为表达式的值</span>
    <span class="token comment">// target: 目标对象，key: 代理对象上的属性</span>
    <span class="token keyword">return</span> target<span class="token punctuation">[</span>key<span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
  <span class="token function">set</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">,</span> value<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">// 当设置proxy代理对象的属性时，会执行set函数</span>
    <span class="token comment">// value: 新赋予的值</span>
    <span class="token keyword">return</span> <span class="token boolean">true</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="基本的响应式实现思路" tabindex="-1"><a class="header-anchor" href="#基本的响应式实现思路" aria-hidden="true">#</a> 基本的响应式实现思路</h2><p>思路：先创建了一个代理对象，在对代理对象的值进行更改的时候重新执行副作用函数</p><p>创建 reactive 工厂函数</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token doc-comment comment">/**
 * 响应式数据工厂
 * <span class="token keyword">@param</span> <span class="token parameter">target</span> 源对象
 * <span class="token keyword">@return</span> object 代理对象
*/</span>
<span class="token keyword">function</span> <span class="token generic-function"><span class="token function">reactive</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token constant">T</span> <span class="token keyword">extends</span> object<span class="token operator">&gt;</span></span></span><span class="token punctuation">(</span>data<span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">)</span><span class="token operator">:</span><span class="token constant">T</span><span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Proxy</span><span class="token punctuation">(</span>data<span class="token punctuation">,</span><span class="token punctuation">{</span>
    <span class="token function">get</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token keyword">return</span> target<span class="token punctuation">[</span>key<span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function">set</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span>key<span class="token punctuation">,</span>value<span class="token punctuation">)</span><span class="token punctuation">{</span>
      target<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> value
      <span class="token keyword">return</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 定义一个响应式数据</span>
<span class="token keyword">const</span> a <span class="token operator">=</span> <span class="token function">reactive</span><span class="token punctuation">(</span><span class="token punctuation">{</span>text<span class="token operator">:</span> <span class="token string">&#39;aaaa&#39;</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>定义一个<code>副作用函数</code>, 当函数被调用时更改 HTML 中的数据</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token function">effect</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">&quot;#app&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>innerHTML <span class="token operator">=</span>  a<span class="token punctuation">.</span>text
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在代理对象的属性被更改时调用<code>副作用函数</code></p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token generic-function"><span class="token function">reactive</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token constant">T</span> <span class="token keyword">extends</span> object<span class="token operator">&gt;</span></span></span><span class="token punctuation">(</span>data<span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">)</span><span class="token operator">:</span><span class="token constant">T</span><span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Proxy</span><span class="token punctuation">(</span>data<span class="token punctuation">,</span><span class="token punctuation">{</span>
    <span class="token function">get</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token keyword">return</span> target<span class="token punctuation">[</span>key<span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function">set</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span>key<span class="token punctuation">,</span>value<span class="token punctuation">)</span><span class="token punctuation">{</span>
      target<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> value

      <span class="token function">effect</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

      <span class="token keyword">return</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样我们便实现了一个简单<code>reactive</code>函数</p><h2 id="定义一个副作用桶" tabindex="-1"><a class="header-anchor" href="#定义一个副作用桶" aria-hidden="true">#</a> 定义一个副作用桶</h2><p>现在虽然我们已经实现了简单<code>reactive</code>函数，但<code>reactive</code>函数的拓展性还很低，如果我们有一个新的<code>副作用函数</code>也需要依赖与响应式数据时，我们只能通过硬编码的形式向<code>set</code>函数中插入这个<code>副作用函数</code>,这违反了<code>开闭原则</code></p><p>既然如此我们定义一个<code>副作用函数集合</code>，在<code>set</code>函数中遍历这个集合并去执行集合中的<code>副作用函数</code></p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// 定义一个副作用函数集合 用来收集副作用函数</span>
<span class="token keyword">const</span> effectSet <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Set<span class="token operator">&lt;</span>Effect<span class="token operator">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">function</span> <span class="token generic-function"><span class="token function">reactive</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token constant">T</span> <span class="token keyword">extends</span> object<span class="token operator">&gt;</span></span></span><span class="token punctuation">(</span>data<span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">)</span><span class="token operator">:</span><span class="token constant">T</span><span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Proxy</span><span class="token punctuation">(</span>data<span class="token punctuation">,</span><span class="token punctuation">{</span>
    <span class="token function">get</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token keyword">return</span> target<span class="token punctuation">[</span>key<span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function">set</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span>key<span class="token punctuation">,</span>value<span class="token punctuation">)</span><span class="token punctuation">{</span>
      target<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> value

      <span class="token comment">// 在更改值时调用副作用函数</span>
      <span class="token comment">// effect()</span>
      effectSet<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>effect<span class="token operator">=&gt;</span><span class="token punctuation">{</span>
        <span class="token function">effect</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>

      <span class="token keyword">return</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当有新的<code>副作用函数</code>需要依赖于<code>reactive</code>时我们向<code>副作用函数集合</code>中添加这个<code>副作用函数</code>即可</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// 定义一个副作用函数</span>
<span class="token keyword">function</span> <span class="token function">effectA</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">&quot;#app&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>innerHTML <span class="token operator">=</span>  a<span class="token punctuation">.</span>text
<span class="token punctuation">}</span>
effectSet<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>effectA<span class="token punctuation">)</span>

<span class="token keyword">function</span> <span class="token function">effectB</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">&quot;#app-b&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>innerHTML <span class="token operator">=</span>  a<span class="token punctuation">.</span>text
<span class="token punctuation">}</span>
effectSet<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>effectB<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里我们通常称这种<code>副作用函数集合</code>为<code>副作用桶(bucket)</code></p><h2 id="依赖收集" tabindex="-1"><a class="header-anchor" href="#依赖收集" aria-hidden="true">#</a> 依赖收集</h2><p>前面我们通过<code>副作用函数</code>放入到<code>副作用桶</code>中实现了对<code>副作用函数</code>的拓展，但这里我们没有区分不同属性对应的<code>副作用函数</code>，这会导致不必要的性能损失</p><p>比如:</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// 我们定义一个响应式数据，有name和age两个属性</span>
<span class="token keyword">const</span> person <span class="token operator">=</span> <span class="token function">reactive</span><span class="token punctuation">(</span><span class="token punctuation">{</span>name<span class="token operator">:</span> <span class="token string">&#39;a&#39;</span><span class="token punctuation">,</span> age<span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">// 定义一个副作用函数用来渲染name</span>
<span class="token keyword">function</span> <span class="token function">effectName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">&quot;#name&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>innerHTML <span class="token operator">=</span>  person<span class="token punctuation">.</span>name
<span class="token punctuation">}</span>
effectSet<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>effectName<span class="token punctuation">)</span>

<span class="token comment">// 再定义一个副作用函数用来渲染age</span>
<span class="token keyword">function</span> <span class="token function">effectAge</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">&quot;#age&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>innerHTML <span class="token operator">=</span>  person<span class="token punctuation">.</span>age
<span class="token punctuation">}</span>
effectSet<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>effectAge<span class="token punctuation">)</span>

<span class="token doc-comment comment">/**
 * 在这里当我改变 person.name 的值时，effectName和effectAge都将被调用，
 * 这并不合理，因为我们只更改了person.name
 * 而 effectAge 这个副作用函数没有依赖与 name 实现，这里它不应该被执行
 * */</span>
person<span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">&#39;b&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>问题：<code>副作用函数</code>与它所依赖的属性没有一一对应</p><p>解决思路：</p><ol><li>将当前<code>副作用函数</code>保存到一个全局变量中</li><li>当执行<code>副作用函数</code>时会触发代理对象的<code>get函数</code></li><li>在<code>get函数</code>中我们将全局变量中保存的<code>副作用函数</code>收集到<code>副作用函桶</code>中</li></ol><p>步骤1: 定义一个全集到变量，存放当前正在执行的<code>副作用函数</code></p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">let</span> activeEffect<span class="token operator">:</span>Effect<span class="token operator">|</span><span class="token keyword">null</span> <span class="token operator">=</span> <span class="token keyword">null</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>步骤2: 定义一个<code>副作用函数</code>，将<code>副作用函数</code>保存到<code>activeEffect</code>上</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 定义一个副作用函数</span>
<span class="token keyword">function</span> <span class="token function">effectName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">&quot;#name&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>innerHTML <span class="token operator">=</span>  person<span class="token punctuation">.</span>name
<span class="token punctuation">}</span>

<span class="token comment">// 将 effect 存放到 activeEffect 中</span>
activeEffect <span class="token operator">=</span> effectName
<span class="token comment">// 执行effect, 这时它会去获取person的name属性，这会触发代理对象的get函数</span>
<span class="token function">effectName</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment">// activeEffect重空，等待下一个副作用函数的执行</span>
activeEffect <span class="token operator">=</span> <span class="token keyword">null</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>步骤3: 我们回到<code>reactive</code>工厂函数中，在<code>get</code>函数中将<code>activeEffect</code>上保存的<code>副作用函数</code>放到<code>副作用桶</code>里</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token generic-function"><span class="token function">reactive</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token constant">T</span> <span class="token keyword">extends</span> object<span class="token operator">&gt;</span></span></span><span class="token punctuation">(</span>data<span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">)</span><span class="token operator">:</span><span class="token constant">T</span><span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Proxy</span><span class="token punctuation">(</span>data<span class="token punctuation">,</span><span class="token punctuation">{</span>
    <span class="token function">get</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token comment">// 如果全局中的 activeEffect 不为空就把 activeEffect 放到桶中</span>
      <span class="token keyword">if</span><span class="token punctuation">(</span>activeEffect<span class="token operator">!==</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        effectSet<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>activeEffect<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">return</span> target<span class="token punctuation">[</span>key<span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function">set</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span>key<span class="token punctuation">,</span>value<span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token operator">...</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样当我们执行<code>步骤2</code>时，代理对象会自动的将我们的<code>副作用函数</code>收集到<code>副作用桶</code>中，为了方便后面调用，我们将 <code>步骤2</code> 封装成为一个方法</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token doc-comment comment">/**
 * 注册副作用函数
 * <span class="token keyword">@param</span> [function] 需要注册的副作用函数
*/</span>
<span class="token keyword">function</span> <span class="token function">registEffect</span><span class="token punctuation">(</span>effect<span class="token operator">:</span>Effect<span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">typeof</span> effect <span class="token operator">!==</span> <span class="token string">&#39;function&#39;</span><span class="token punctuation">)</span> <span class="token keyword">return</span>
  <span class="token comment">// 将 effect 存放到 activeEffect 中</span>
  activeEffect <span class="token operator">=</span> effectName
  <span class="token comment">// 执行effect, 这时它会去获取person的name属性，这会触发代理对象的get函数</span>
  <span class="token function">effectName</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token comment">// activeEffect重空，等待下一个副作用函数的执行</span>
  activeEffect <span class="token operator">=</span> <span class="token keyword">null</span>
<span class="token punctuation">}</span>

<span class="token comment">// 定义一个副作用函数</span>
<span class="token keyword">function</span> <span class="token function">effectName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">&quot;#name&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>innerHTML <span class="token operator">=</span>  person<span class="token punctuation">.</span>name
<span class="token punctuation">}</span>
<span class="token comment">// 注册 effectName</span>
<span class="token function">registEffect</span><span class="token punctuation">(</span>effectName<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container info"><p class="hint-container-title">在 vue源码中将 registEffect 写为 effect</p></div><p>现在我们实现了对<code>副作用函数</code>的注册，但我们的问题还没有解决，<code>副作用函数</code>与它所依赖的属性还是没有一一对应，但是我们距离实现已经很接近了，我们只需要对我们的桶进行<code>Map映射</code></p>`,40),v=t(`<p>首先我们修改一下桶的结构</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// const effectSet = new Set&lt;Effect&gt;()</span>
<span class="token keyword">type</span> <span class="token class-name">EffectSet</span> <span class="token operator">=</span> Set<span class="token operator">&lt;</span>Effect<span class="token operator">&gt;</span>
<span class="token keyword">const</span> effectMap <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Map<span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token operator">|</span><span class="token builtin">symbol</span><span class="token punctuation">,</span>EffectSet<span class="token operator">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在<code>reactive</code>工厂函数中我们修改<code>get</code>和<code>set</code>函数</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token generic-function"><span class="token function">reactive</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token constant">T</span> <span class="token keyword">extends</span> object<span class="token operator">&gt;</span></span></span><span class="token punctuation">(</span>data<span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">)</span><span class="token operator">:</span><span class="token constant">T</span><span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Proxy</span><span class="token punctuation">(</span>data<span class="token punctuation">,</span><span class="token punctuation">{</span>
    <span class="token function">get</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token keyword">if</span><span class="token punctuation">(</span>activeEffect<span class="token operator">!==</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">let</span> depSet<span class="token operator">:</span>Set<span class="token operator">&lt;</span>Effect<span class="token operator">&gt;</span>

        <span class="token comment">// 判断 Map 中是否有当前属性的副作用合集</span>
        <span class="token keyword">let</span> depSet<span class="token operator">:</span> EffectSet <span class="token operator">=</span> effectMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>depSet<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token comment">// 如果不存在就新建一个 EffectSet 并添加到 Map 里</span>
          depSet <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Set</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
          depMap<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span>depSet<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// 将副作用函数添加到合集里</span>
        depSet<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>activeEffect<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">return</span> target<span class="token punctuation">[</span>key<span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function">set</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span>key<span class="token punctuation">,</span>value<span class="token punctuation">)</span><span class="token punctuation">{</span>
      target<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> value
      <span class="token comment">// 获取副作用合集,如果没就直接返回</span>
      <span class="token keyword">const</span> depSet <span class="token operator">=</span> effectMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span>
      <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>depSet<span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token boolean">true</span>
      <span class="token comment">// 遍历副作用桶并调用其中的副作用方法</span>
      effectSet<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>effect<span class="token operator">=&gt;</span><span class="token punctuation">{</span>
        <span class="token function">effect</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
      <span class="token keyword">return</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container info"><p class="hint-container-title">vue源码中对 get/set 函数中关于依赖收集的部分进行了封装，分别为 track/trigger 方法</p></div><h2 id="进一步改进桶结构" tabindex="-1"><a class="header-anchor" href="#进一步改进桶结构" aria-hidden="true">#</a> 进一步改进桶结构</h2><p>到这里我们基本完成了响应式的基本逻辑，但如果我们将视角拉回全局你会发现，如果我们定义两个响应式对象，且两个响应式对象都有一个属性名相同的属性，我们一样会遇见我们在<code>依赖收集</code>中遇到的问题</p><p>如果你认真的看完了<code>依赖收集</code>你一定会想到，在这里我们只需要将桶进一步改造一下，将不同的响应式对象分割成不同的<code>副作用桶</code></p>`,8),m=n("h2",{id:"使用-weckmap-对桶结构进行改进",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#使用-weckmap-对桶结构进行改进","aria-hidden":"true"},"#"),s(" 使用 WeckMap 对桶结构进行改进")],-1),b={class:"hint-container tip"},f=n("p",{class:"hint-container-title"},"WeckMap 弱映射表",-1),y=t(`<div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// const effectMap = new Map&lt;string|symbol,EffectSet&gt;()</span>
<span class="token keyword">type</span> <span class="token class-name">EffectSet</span> <span class="token operator">=</span> Set<span class="token operator">&lt;</span>Effect<span class="token operator">&gt;</span>
<span class="token keyword">type</span> <span class="token class-name">EffectMap</span> <span class="token operator">=</span> Map<span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token operator">|</span><span class="token builtin">symbol</span><span class="token punctuation">,</span>EffectSet<span class="token operator">&gt;</span>
<span class="token keyword">const</span> bucket <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">WeakMap<span class="token operator">&lt;</span>object<span class="token punctuation">,</span>EffectMap<span class="token operator">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>改写 reactive</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token generic-function"><span class="token function">reactive</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token constant">T</span> <span class="token keyword">extends</span> object<span class="token operator">&gt;</span></span></span><span class="token punctuation">(</span>data<span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">)</span><span class="token operator">:</span><span class="token constant">T</span><span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Proxy</span><span class="token punctuation">(</span>data<span class="token punctuation">,</span><span class="token punctuation">{</span>
    <span class="token function">get</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token keyword">if</span><span class="token punctuation">(</span>activeEffect<span class="token operator">===</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">{</span>

        <span class="token comment">// 判断bucket桶中是否有当前target的副作用Map</span>
        <span class="token keyword">let</span> depMap<span class="token operator">:</span> EffectMap <span class="token operator">=</span> bucket<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>depMap<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token comment">// 如果不存在就新建一个 EffectMap 并添加到桶中</span>
          depMap <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Map</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
          bucket<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span>depMap<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// 判断 Map 中是否有当前属性的副作用合集</span>
        <span class="token keyword">let</span> depSet<span class="token operator">:</span> EffectSet <span class="token operator">=</span> depMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>depSet<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token comment">// 如果不存在就新建一个 EffectSet 并添加到 Map里</span>
          depSet <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Set</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
          depMap<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span>depSet<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// 将副作用函数添加到合集里</span>
        depSet<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>activeEffect<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">return</span> target<span class="token punctuation">[</span>key<span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function">set</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span>key<span class="token punctuation">,</span>value<span class="token punctuation">)</span><span class="token punctuation">{</span>
      target<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> value

      <span class="token comment">// 获取副作用Map,如果没就直接返回</span>
      <span class="token keyword">const</span> depMap <span class="token operator">=</span> bucket<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span>
      <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>depMap<span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token boolean">true</span>

      <span class="token comment">// 获取副作用合集,如果没就直接返回</span>
      <span class="token keyword">const</span> depSet <span class="token operator">=</span> depMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span>
      <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>depSet<span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token boolean">true</span>

      depSet<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>effect<span class="token operator">=&gt;</span><span class="token punctuation">{</span>
        <span class="token function">effect</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
      <span class="token keyword">return</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>现在我们通过<code>reactive</code>函数创建响应式对象，并使用<code>registEffect</code>函数对副作用函数进行依赖搜集，当响应式数据发生改变时会触发<code>set</code>函数找到对应的副作用函数并执行 这实际上是一个发布订阅模式，响应式数据作为发布者，副作用函数作为订阅者</p><p>完整代码：</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">Effect</span> <span class="token operator">=</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token keyword">void</span>

<span class="token comment">// 定义一个副作用函数集合 用来收集副作用函数</span>
<span class="token keyword">type</span> <span class="token class-name">EffectSet</span> <span class="token operator">=</span> Set<span class="token operator">&lt;</span>Effect<span class="token operator">&gt;</span>
<span class="token keyword">type</span> <span class="token class-name">EffectMap</span> <span class="token operator">=</span> Map<span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token operator">|</span><span class="token builtin">symbol</span><span class="token punctuation">,</span>EffectSet<span class="token operator">&gt;</span>
<span class="token keyword">const</span> bucket <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">WeakMap<span class="token operator">&lt;</span>object<span class="token punctuation">,</span>EffectMap<span class="token operator">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>


<span class="token comment">// 定义一个全局变量用来存放即将被放入到桶中的副作用函数</span>
<span class="token keyword">let</span> activeEffect<span class="token operator">:</span>Effect<span class="token operator">|</span><span class="token keyword">null</span> <span class="token operator">=</span> <span class="token keyword">null</span>

<span class="token doc-comment comment">/**
 * 注册副作用函数方法
 * <span class="token keyword">@param</span> [function] 需要被注册的副作用方法
*/</span>
<span class="token keyword">function</span> <span class="token function">registEffect</span><span class="token punctuation">(</span>effect<span class="token operator">:</span>Effect<span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token comment">// 将 effect 存放到 activeEffect 中</span>
  activeEffect <span class="token operator">=</span> effect
  <span class="token comment">// 执行effect, 这时它会去获取person的name属性，这会触发代理对象的get函数</span>
  <span class="token function">effect</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token comment">// activeEffect制空，等待下一个副作用函数</span>
  activeEffect <span class="token operator">=</span> <span class="token keyword">null</span>
<span class="token punctuation">}</span>

<span class="token doc-comment comment">/**
 * 创建一个响应式数据
 * <span class="token keyword">@param</span> <span class="token parameter">target</span> 源对象
 * <span class="token keyword">@return</span> object 代理对象
*/</span>
<span class="token keyword">function</span> <span class="token generic-function"><span class="token function">reactive</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token constant">T</span> <span class="token keyword">extends</span> object<span class="token operator">&gt;</span></span></span><span class="token punctuation">(</span>data<span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">)</span><span class="token operator">:</span><span class="token constant">T</span><span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Proxy</span><span class="token punctuation">(</span>data<span class="token punctuation">,</span><span class="token punctuation">{</span>
    <span class="token function">get</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token keyword">if</span><span class="token punctuation">(</span>activeEffect<span class="token operator">===</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">{</span>

        <span class="token comment">// 判断bucket桶中是否有当前target的副作用Map</span>
        <span class="token keyword">let</span> depMap<span class="token operator">:</span> EffectMap <span class="token operator">=</span> bucket<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>depMap<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token comment">// 如果不存在就新建一个 EffectMap 并添加到桶中</span>
          depMap <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Map</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
          bucket<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span>depMap<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// 判断 Map 中是否有当前属性的副作用合集</span>
        <span class="token keyword">let</span> depSet<span class="token operator">:</span> EffectSet <span class="token operator">=</span> depMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>depSet<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token comment">// 如果不存在就新建一个 EffectSet 并添加到 Map里</span>
          depSet <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Set</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
          depMap<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span>depSet<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// 将副作用函数添加到合集里</span>
        depSet<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>activeEffect<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">return</span> target<span class="token punctuation">[</span>key<span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function">set</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span>key<span class="token punctuation">,</span>value<span class="token punctuation">)</span><span class="token punctuation">{</span>
      target<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> value
      <span class="token comment">// 在更改值时调用副作用函数</span>
      <span class="token keyword">const</span> depMap <span class="token operator">=</span> bucket<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span>
      <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>depMap<span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token boolean">true</span>
      <span class="token keyword">const</span> depSet <span class="token operator">=</span> depMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span>
      <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>depSet<span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token boolean">true</span>
      depSet<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>effect<span class="token operator">=&gt;</span><span class="token punctuation">{</span>
        <span class="token function">effect</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
      <span class="token keyword">return</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,7),g={class:"hint-container info"},w=n("p",{class:"hint-container-title"},"Info",-1),h=n("code",null,"b站 杰哥课堂",-1),E={href:"https://www.bilibili.com/video/BV17G41157E6?p=1&vd_source=21bbf6e01e2a4b35d0464ec96193938c",target:"_blank",rel:"noopener noreferrer"};function M(S,x){const p=e("Mermaid"),c=e("RouterLink"),o=e("ExternalLinkIcon");return l(),u("div",null,[k,a(p,{id:"mermaid-120",code:"eJxLy8kvT85ILCpRCHHiUlAoLk1KL0osyFDwTSwAchUU8hJzU3V17TJTDKM1QGyFpxvnPWtY/nxWy9PO9U/2znk+ZcXTCR0vZ7dpxoLVJ6ZDlBtFawCZ+FWn5qVwAQAxCjiz"}),v,a(p,{id:"mermaid-140",code:"eJxLy8kvT85ILCpRCHHiUlAoLk1KL0osyFBIz8lPSswBiigolKQWpaeW6Ora5SYWGIJF4KpAIgrRvokFsWBxBYWUzKLU5JLM/DwFnyCoUGaKoUZeYm6qJtCEzBSjaDBH4enGec8alj+f1fK0c/2TvXOeT1nxdELHy9ltmjCTMlOMNRLTobpMokFsQppS81KQHGwIcbERhouNCLvYFOJKzViw7WbEuRliPYgEAIVGfiM="}),m,n("div",b,[f,n("p",null,[s("可以看成是Map的弱版本，它的key只能是一个对象，具体区别可以去看"),a(c,{to:"/note/es6/Map-WeakMap.html"},{default:d(()=>[s("这篇文章")]),_:1})])]),y,n("div",g,[w,n("p",null,[s("这篇文章是对"),h,s("发布的"),n("a",E,[s("Vue3.2源码设计与实现-响应式原理"),a(o)]),s("的学习总结，强烈推荐去看一看，真的非常棒！如果你也这样觉得的话，请不要忘记给个三连！ 我给了！真的(下次一定！)！！！")])])])}const T=i(r,[["render",M],["__file","reactivity.html.vue"]]);export{T as default};
