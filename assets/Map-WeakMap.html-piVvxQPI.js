const a=JSON.parse(`{"key":"v-0de4d69e","path":"/note/es6/Map-WeakMap.html","title":"Map 与 WeakMap","lang":"en-US","frontmatter":{"title":"Map 与 WeakMap","date":"2023-02-14T00:00:00.000Z","tag":["es6"],"category":["Javascript/Typescript"],"description":"Map 与 WeakMap Map 映射表 在MDN上是这么描述 Map 的: 该Map对象保存键值对并记住键的原始插入顺序。任何值（对象和 原始值）都可以用作键或值。 说到键值对形式的数据格式，我会很容易联想到数组(Array)和对象(Object),我们先来看一下它的区别 /** * Array * 在 javascript 中数组是一组数据的集合，并且可进行迭代的 * key 必须为number，从 0 开始依次递增， * vaule 可以为任何类型 */ const array = new Array([a,b,c,d,e]) console.log(array[0]); // a array.forEach((value,key)=&gt;{ console.log(value+' =&gt; '+key + ', '); }) // 0 =&gt; a, 1 =&gt; b, 2 =&gt; c, 3 =&gt; d, 4 =&gt; e /** * Object * 在 javascript 中对象是一组属性的集合，不能进行迭代 * key 必须为string，通常我们称它为属性名 * vaule 可以为任何类型 */ const object = new Object({ name: 'aaa' }) console.log(object.name); // aaa object.forEach((value,key)=&gt;{ console.log(key+' =&gt; '+value + ', '); })// Error 因为Object不可以进行迭代","head":[["meta",{"property":"og:url","content":"https://export-nan.github.io/nan-blogs/note/es6/Map-WeakMap.html"}],["meta",{"property":"og:site_name","content":"NAN"}],["meta",{"property":"og:title","content":"Map 与 WeakMap"}],["meta",{"property":"og:description","content":"Map 与 WeakMap Map 映射表 在MDN上是这么描述 Map 的: 该Map对象保存键值对并记住键的原始插入顺序。任何值（对象和 原始值）都可以用作键或值。 说到键值对形式的数据格式，我会很容易联想到数组(Array)和对象(Object),我们先来看一下它的区别 /** * Array * 在 javascript 中数组是一组数据的集合，并且可进行迭代的 * key 必须为number，从 0 开始依次递增， * vaule 可以为任何类型 */ const array = new Array([a,b,c,d,e]) console.log(array[0]); // a array.forEach((value,key)=&gt;{ console.log(value+' =&gt; '+key + ', '); }) // 0 =&gt; a, 1 =&gt; b, 2 =&gt; c, 3 =&gt; d, 4 =&gt; e /** * Object * 在 javascript 中对象是一组属性的集合，不能进行迭代 * key 必须为string，通常我们称它为属性名 * vaule 可以为任何类型 */ const object = new Object({ name: 'aaa' }) console.log(object.name); // aaa object.forEach((value,key)=&gt;{ console.log(key+' =&gt; '+value + ', '); })// Error 因为Object不可以进行迭代"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"property":"og:updated_time","content":"2023-02-14T14:56:57.000Z"}],["meta",{"property":"article:author","content":"NAN"}],["meta",{"property":"article:tag","content":"es6"}],["meta",{"property":"article:published_time","content":"2023-02-14T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-02-14T14:56:57.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Map 与 WeakMap\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-02-14T00:00:00.000Z\\",\\"dateModified\\":\\"2023-02-14T14:56:57.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"NAN\\",\\"url\\":\\"https://github.com/open-nan\\"}]}"]]},"headers":[{"level":2,"title":"Map 映射表","slug":"map-映射表","link":"#map-映射表","children":[{"level":3,"title":"Map 的方法及属性","slug":"map-的方法及属性","link":"#map-的方法及属性","children":[]}]},{"level":2,"title":"WeakMap（弱映射表)","slug":"weakmap-弱映射表","link":"#weakmap-弱映射表","children":[{"level":3,"title":"WeakMap 的实例方法","slug":"weakmap-的实例方法","link":"#weakmap-的实例方法","children":[]}]},{"level":2,"title":"为什么我们需要WeakMap","slug":"为什么我们需要weakmap","link":"#为什么我们需要weakmap","children":[]}],"git":{"createdTime":1676380693000,"updatedTime":1676386617000,"contributors":[{"name":"NAN","email":"export.nan@gmail.com","commits":3}]},"readingTime":{"minutes":4.22,"words":1267},"filePathRelative":"note/es6/Map-WeakMap.md","localizedDate":"February 14, 2023","excerpt":"<h1> Map 与 WeakMap</h1>\\n<h2> Map 映射表</h2>\\n<div class=\\"hint-container info\\">\\n<p class=\\"hint-container-title\\">在MDN上是这么描述 Map 的:</p>\\n<p>该Map对象保存键值对并记住键的原始插入顺序。任何值（对象和 原始值）都可以用作键或值。</p>\\n</div>\\n<p>说到键值对形式的数据格式，我会很容易联想到<code>数组(Array)</code>和<code>对象(Object)</code>,我们先来看一下它的区别</p>\\n<div class=\\"language-javascript line-numbers-mode\\" data-ext=\\"js\\"><pre class=\\"language-javascript\\"><code><span class=\\"token doc-comment comment\\">/**\\n * Array\\n * 在 javascript 中数组是一组数据的集合，并且可进行迭代的\\n * key 必须为number，从 0 开始依次递增，\\n * vaule 可以为任何类型\\n */</span>\\n<span class=\\"token keyword\\">const</span> array <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">Array</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">[</span>a<span class=\\"token punctuation\\">,</span>b<span class=\\"token punctuation\\">,</span>c<span class=\\"token punctuation\\">,</span>d<span class=\\"token punctuation\\">,</span>e<span class=\\"token punctuation\\">]</span><span class=\\"token punctuation\\">)</span>\\nconsole<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">log</span><span class=\\"token punctuation\\">(</span>array<span class=\\"token punctuation\\">[</span><span class=\\"token number\\">0</span><span class=\\"token punctuation\\">]</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span> <span class=\\"token comment\\">// a</span>\\narray<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">forEach</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">(</span><span class=\\"token parameter\\">value<span class=\\"token punctuation\\">,</span>key</span><span class=\\"token punctuation\\">)</span><span class=\\"token operator\\">=&gt;</span><span class=\\"token punctuation\\">{</span>\\n  console<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">log</span><span class=\\"token punctuation\\">(</span>value<span class=\\"token operator\\">+</span><span class=\\"token string\\">' =&gt; '</span><span class=\\"token operator\\">+</span>key <span class=\\"token operator\\">+</span> <span class=\\"token string\\">', '</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">)</span> <span class=\\"token comment\\">// 0 =&gt; a, 1 =&gt; b, 2 =&gt; c, 3 =&gt; d, 4 =&gt; e</span>\\n\\n<span class=\\"token doc-comment comment\\">/**\\n * Object\\n * 在 javascript 中对象是一组属性的集合，不能进行迭代\\n * key 必须为string，通常我们称它为属性名\\n * vaule 可以为任何类型\\n */</span>\\n<span class=\\"token keyword\\">const</span> object <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">Object</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token literal-property property\\">name</span><span class=\\"token operator\\">:</span> <span class=\\"token string\\">'aaa'</span>\\n<span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">)</span>\\nconsole<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">log</span><span class=\\"token punctuation\\">(</span>object<span class=\\"token punctuation\\">.</span>name<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span> <span class=\\"token comment\\">// aaa</span>\\nobject<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">forEach</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">(</span><span class=\\"token parameter\\">value<span class=\\"token punctuation\\">,</span>key</span><span class=\\"token punctuation\\">)</span><span class=\\"token operator\\">=&gt;</span><span class=\\"token punctuation\\">{</span>\\n  console<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">log</span><span class=\\"token punctuation\\">(</span>key<span class=\\"token operator\\">+</span><span class=\\"token string\\">' =&gt; '</span><span class=\\"token operator\\">+</span>value <span class=\\"token operator\\">+</span> <span class=\\"token string\\">', '</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">)</span><span class=\\"token comment\\">// Error 因为Object不可以进行迭代</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}`);export{a as data};