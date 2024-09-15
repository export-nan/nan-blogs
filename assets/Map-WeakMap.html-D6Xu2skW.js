import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as a,c as p,e}from"./app-DGJnrheY.js";const t={};function c(o,n){return a(),p("div",null,n[0]||(n[0]=[e(`<h1 id="map-与-weakmap" tabindex="-1"><a class="header-anchor" href="#map-与-weakmap" aria-hidden="true">#</a> Map 与 WeakMap</h1><h2 id="map-映射表" tabindex="-1"><a class="header-anchor" href="#map-映射表" aria-hidden="true">#</a> Map 映射表</h2><div class="hint-container info"><p class="hint-container-title">在MDN上是这么描述 Map 的:</p><p>该Map对象保存键值对并记住键的原始插入顺序。任何值（对象和 原始值）都可以用作键或值。</p></div><p>说到键值对形式的数据格式，我会很容易联想到<code>数组(Array)</code>和<code>对象(Object)</code>,我们先来看一下它的区别</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token doc-comment comment">/**
 * Array
 * 在 javascript 中数组是一组数据的集合，并且可进行迭代的
 * key 必须为number，从 0 开始依次递增，
 * vaule 可以为任何类型
 */</span>
<span class="token keyword">const</span> array <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Array</span><span class="token punctuation">(</span><span class="token punctuation">[</span>a<span class="token punctuation">,</span>b<span class="token punctuation">,</span>c<span class="token punctuation">,</span>d<span class="token punctuation">,</span>e<span class="token punctuation">]</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>array<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// a</span>
array<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">value<span class="token punctuation">,</span>key</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>value<span class="token operator">+</span><span class="token string">&#39; =&gt; &#39;</span><span class="token operator">+</span>key <span class="token operator">+</span> <span class="token string">&#39;, &#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token comment">// 0 =&gt; a, 1 =&gt; b, 2 =&gt; c, 3 =&gt; d, 4 =&gt; e</span>

<span class="token doc-comment comment">/**
 * Object
 * 在 javascript 中对象是一组属性的集合，不能进行迭代
 * key 必须为string，通常我们称它为属性名
 * vaule 可以为任何类型
 */</span>
<span class="token keyword">const</span> object <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Object</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;aaa&#39;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>object<span class="token punctuation">.</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// aaa</span>
object<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">value<span class="token punctuation">,</span>key</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>key<span class="token operator">+</span><span class="token string">&#39; =&gt; &#39;</span><span class="token operator">+</span>value <span class="token operator">+</span> <span class="token string">&#39;, &#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token comment">// Error 因为Object不可以进行迭代</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Map 你可以把它看成一个可以跌代的对象，而它的key可以为对象或者原始值</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token doc-comment comment">/**
 * Map
 * 出现在 ES6 中
 * key 可以对象或者原始值，并记住键的原始插入顺序
 * vaule 可以为任何类型
 */</span>

<span class="token keyword">const</span> map <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Map</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment">// 通过 .set() 方法插入值</span>
map<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">&#39;name&#39;</span><span class="token operator">:</span> <span class="token string">&#39;aaaa&#39;</span><span class="token punctuation">)</span>
<span class="token comment">// 通过 .get() 方法获取值</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>map<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;name&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// aaaa</span>

<span class="token comment">// 我们可以以一个对象作为 key 插入一个值</span>
<span class="token keyword">const</span> Obj <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;I&#39;</span><span class="token punctuation">}</span>
map<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>Obj<span class="token operator">:</span> <span class="token string">&#39;这里的key是一个对象&#39;</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>map<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>Obj<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// 这里的key是一个对象</span>

<span class="token comment">// 并且我们可以对Map实体进行迭代</span>
map<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">value<span class="token punctuation">,</span>key</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>key<span class="token operator">+</span><span class="token string">&#39; =&gt; &#39;</span><span class="token operator">+</span>value <span class="token operator">+</span> <span class="token string">&#39;, &#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token comment">// name =&gt; &#39;aaaa&#39;, [object Object] =&gt; 这里对key是一个对象,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="map-的方法及属性" tabindex="-1"><a class="header-anchor" href="#map-的方法及属性" aria-hidden="true">#</a> Map 的方法及属性</h3><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 静态属性</span>
<span class="token keyword">get</span> Map<span class="token punctuation">[</span>@@species<span class="token punctuation">]</span>
<span class="token comment">// 用于创建派生对象的构造函数。</span>

<span class="token comment">// 实例属性</span>
<span class="token class-name">Map</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>size
<span class="token comment">// 返回 Map 对象中的键值对数量。</span>


<span class="token class-name">Map</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment">// 移除 Map 对象中所有的键值对。</span>

<span class="token class-name">Map</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment">// 移除 Map 对象中指定的键值对，如果键值对存在并成功被移除，返回 true，</span>
<span class="token comment">// 否则返回 false。调用 delete 后再调用 map.has(key) 将返回 false。</span>

<span class="token class-name">Map</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment">// 返回与指定的键 key 关联的值，若不存在关联的值，则返回 undefined。</span>

<span class="token class-name">Map</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment">// 返回一个布尔值，用来表明 Map 对象中是否存在与指定的键 key 关联的值。</span>

<span class="token class-name">Map</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment">// 在 Map 对象中设置与指定的键 key 关联的值，并返回 Map 对象。</span>

<span class="token class-name">Map</span><span class="token punctuation">.</span>prototype<span class="token punctuation">[</span>@@iterator<span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment">// 返回一个新的迭代对象，其为一个包含 Map 对象中所有键值对的 [key, value] 数组</span>
<span class="token comment">// 并以插入 Map 对象的顺序排列。</span>

<span class="token class-name">Map</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment">// 返回一个新的迭代对象，其中包含 Map 对象中所有的键，并以插入 Map 对象的顺序排列。</span>

<span class="token class-name">Map</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">values</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment">// 返回一个新的迭代对象，其中包含 Map 对象中所有的值，并以插入 Map 对象的顺序排列。</span>

<span class="token class-name">Map</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">entries</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment">// 返回一个新的迭代对象，其为一个包含 Map 对象中所有键值对的 [key, value] 数组</span>
<span class="token comment">// 并以插入 Map 对象的顺序排列。</span>

<span class="token class-name">Map</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment">// 以插入的顺序对 Map 对象中存在的键值对分别调用一次 callbackFn。</span>
<span class="token comment">// 如果给定了 thisArg 参数，这个参数将会是回调函数中 this 的值。</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="weakmap-弱映射表" tabindex="-1"><a class="header-anchor" href="#weakmap-弱映射表" aria-hidden="true">#</a> WeakMap（弱映射表)</h2><div class="hint-container info"><p class="hint-container-title">在MDN上是这么描述 WeakMap 的:</p><p>WeakMap 对象是一组键/值对的集合，其中的键是弱引用的。其键必须是对象，而值可以是任意的。</p></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> weakMap <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">WeakMap</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment">// WeakMap 赋值</span>
weakMap<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">&#39;name&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;map&#39;</span><span class="token punctuation">)</span> <span class="token comment">// Error，weakMap的key只能是一个对象</span>

<span class="token keyword">const</span> Obj <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;I&#39;</span><span class="token punctuation">}</span>
weakMap<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>Obj<span class="token operator">:</span> <span class="token string">&#39;这里的key是一个对象&#39;</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>weakMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>Obj<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// 这里的key是一个对象</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="weakmap-的实例方法" tabindex="-1"><a class="header-anchor" href="#weakmap-的实例方法" aria-hidden="true">#</a> WeakMap 的实例方法</h3><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token class-name">WeakMap</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span>
<span class="token comment">// 删除 WeakMap 中与 key 相关联的值。删除之后， WeakMap.prototype.has(key) 将会返回 false。</span>

<span class="token class-name">WeakMap</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span>
<span class="token comment">// 返回 WeakMap 中与 key 相关联的值，如果 key 不存在则返回 undefined。</span>

<span class="token class-name">WeakMap</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span>
<span class="token comment">// 返回一个布尔值，断言一个值是否已经与 WeakMap 对象中的 key 关联。</span>

<span class="token class-name">WeakMap</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> value<span class="token punctuation">)</span>
<span class="token comment">// 给 WeakMap 中的 key 设置一个 value。该方法返回一个 WeakMap 对象。</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="为什么我们需要weakmap" tabindex="-1"><a class="header-anchor" href="#为什么我们需要weakmap" aria-hidden="true">#</a> 为什么我们需要WeakMap</h2><div class="hint-container warning"><p class="hint-container-title">Map 的缺陷</p><p>Map 在建立以对象为key的映射关系时会建立与对象的强引用，这会可能会导致内存泄露</p></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> map <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Map</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> i<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">,</span>i<span class="token operator">&lt;=</span><span class="token number">100000</span><span class="token punctuation">,</span>i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token punctuation">;</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">// 这里的foo在函数执行完成后本应该释放</span>
    <span class="token comment">// 但是由于 map 将 foo 作为key并建立了强链接，导致foo占用的空间没有被释放</span>
    <span class="token comment">// 这样便会导致内存泄露</span>
    <span class="token keyword">const</span> foo <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token literal-property property">foo</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">}</span>
    map<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>foo<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>而 WeakMap 只会与key建立弱连接，这样防止了内存泄露</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> weakMap <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">WeakMap</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> i<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">,</span>i<span class="token operator">&lt;=</span><span class="token number">100000</span><span class="token punctuation">,</span>i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token punctuation">;</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">const</span> foo <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token literal-property property">foo</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">}</span>
    maweakMapp<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>foo<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token comment">//建立弱连接关系，不会保留foo的空间</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container tip"><p class="hint-container-title">这也是为什么 WeakMap 有\`.values()\`的实例方法而没有\`.keys()\`的实例方法的原因</p></div>`,20)]))}const u=s(t,[["render",c],["__file","Map-WeakMap.html.vue"]]);export{u as default};
