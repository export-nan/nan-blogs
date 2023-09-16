const n=JSON.parse(`{"key":"v-737f1680","path":"/note/ast/02_grammatical_analysis.html","title":"语法分析","lang":"en-US","frontmatter":{"title":"语法分析","date":"2023-09-14T00:00:00.000Z","order":-1,"category":["编译原理"],"description":"语法分析的主要任务 从词法分析器输出的token序列中识别出个类型的短语，并构造语法分析树 语法分析树（描述句子的语法结构） 例 赋值语句分析树 let a = b + c * 60; // &lt;LET&gt; &lt;IDN, a&gt; &lt;=&gt; &lt;IDN, b&gt; &lt;+&gt; &lt;IND, reta&gt; &lt;*&gt; &lt;NUM,60&gt; &lt;;&gt; // 在这里我将 种别码(kind) 用 k， 属性值（value）用 v 代指 tokens = [ {k: \\"LET\\", v: null, }, {k: \\"IDN\\", v: 'a', }, {k: \\"EQUAL\\" v: null, }, {k: \\"IDN\\" v: 'b', }, {k: \\"ADD\\" v: null, }, {k: \\"IDN\\" v: 'c', }, {k: \\"MULTIPLY\\" v: null, }, {k: \\"NUM\\" v: 60, }, {k: \\"SEMICOLON\\", v: null, }, ] 观察我们的语法，我们发现整个赋予值语句是由 关键字, 标识符, 界线字符(=), 表达式, 界线字符(;)组成的, 而表达式又由标识符/变量, 运算符组成 我们可以将token序列成如下语法树 tree = [ {k: \\"LET\\", v: null, }, {k: \\"IDN\\", v: 'a', }, {k: \\"EQUAL\\", v: null, }, { k: 'CHUNK', v: [ {k: \\"IDN\\", v: 'b', }, {k: \\"ADD\\", v: null, }, { k: 'CHUNK', v: [ {k: \\"IDN\\", v: 'c', }, {k: \\"MULTIPLY\\", v: null, }, {k: \\"NUM\\", v: 60, }, ], } ], }, {k: \\"SEMICOLON\\", v: null, }, ] 变量声明分析树 let a, b, c; // &lt;let&gt; &lt;ID, a&gt; &lt;,&gt; &lt;IDN,b&gt; &lt;,&gt; &lt;IND,c&gt; &lt;;&gt; // 在这里我将 种别码(kind) 用 k， 属性值（value）用 v 代指 tokens = [ {k: \\"LET\\", v: null, }, {k: \\"IDN\\", v: 'a', }, {k: \\"COMMA\\", v: null, }, {k: \\"IDN\\", v: 'b', }, {k: \\"COMMA\\", v: null, }, {k: \\"IDN\\", v: 'c', }, {k: \\"MULTIPLY\\", v: null, }, {k: \\"NUM\\", v: 60, }, {k: \\"SEMICOLON\\", v: null, }, ] 在这里整个语句由 关键字, 标识符, 界线字符(,), 标识符, 界线字符(,), 标识符, 界线字符(;)组成，我们可以把 标识符, 界线字符(,), 标识符 这种组合定义为一个标识符组(IDNS) 我们可以将token序列成如下语法树 tree = [ {k: \\"LET\\", v: null}, { k: \\"IDNS\\", v: [ { k: \\"IDNS\\", v: [ {k: \\"IDN\\", v: 'a', }, {k: \\"COMMA\\", v: null, }, {k: \\"IDN\\", v: 'b', }, ], }, {k: \\"COMMA\\", v: null, }, {k: \\"IDN\\", v: 'c', }, ], }, {k: \\"SEMICOLON\\", v: null, } ]","head":[["meta",{"property":"og:url","content":"https://github.com/export-nan/note/ast/02_grammatical_analysis.html"}],["meta",{"property":"og:site_name","content":"NAN"}],["meta",{"property":"og:title","content":"语法分析"}],["meta",{"property":"og:description","content":"语法分析的主要任务 从词法分析器输出的token序列中识别出个类型的短语，并构造语法分析树 语法分析树（描述句子的语法结构） 例 赋值语句分析树 let a = b + c * 60; // &lt;LET&gt; &lt;IDN, a&gt; &lt;=&gt; &lt;IDN, b&gt; &lt;+&gt; &lt;IND, reta&gt; &lt;*&gt; &lt;NUM,60&gt; &lt;;&gt; // 在这里我将 种别码(kind) 用 k， 属性值（value）用 v 代指 tokens = [ {k: \\"LET\\", v: null, }, {k: \\"IDN\\", v: 'a', }, {k: \\"EQUAL\\" v: null, }, {k: \\"IDN\\" v: 'b', }, {k: \\"ADD\\" v: null, }, {k: \\"IDN\\" v: 'c', }, {k: \\"MULTIPLY\\" v: null, }, {k: \\"NUM\\" v: 60, }, {k: \\"SEMICOLON\\", v: null, }, ] 观察我们的语法，我们发现整个赋予值语句是由 关键字, 标识符, 界线字符(=), 表达式, 界线字符(;)组成的, 而表达式又由标识符/变量, 运算符组成 我们可以将token序列成如下语法树 tree = [ {k: \\"LET\\", v: null, }, {k: \\"IDN\\", v: 'a', }, {k: \\"EQUAL\\", v: null, }, { k: 'CHUNK', v: [ {k: \\"IDN\\", v: 'b', }, {k: \\"ADD\\", v: null, }, { k: 'CHUNK', v: [ {k: \\"IDN\\", v: 'c', }, {k: \\"MULTIPLY\\", v: null, }, {k: \\"NUM\\", v: 60, }, ], } ], }, {k: \\"SEMICOLON\\", v: null, }, ] 变量声明分析树 let a, b, c; // &lt;let&gt; &lt;ID, a&gt; &lt;,&gt; &lt;IDN,b&gt; &lt;,&gt; &lt;IND,c&gt; &lt;;&gt; // 在这里我将 种别码(kind) 用 k， 属性值（value）用 v 代指 tokens = [ {k: \\"LET\\", v: null, }, {k: \\"IDN\\", v: 'a', }, {k: \\"COMMA\\", v: null, }, {k: \\"IDN\\", v: 'b', }, {k: \\"COMMA\\", v: null, }, {k: \\"IDN\\", v: 'c', }, {k: \\"MULTIPLY\\", v: null, }, {k: \\"NUM\\", v: 60, }, {k: \\"SEMICOLON\\", v: null, }, ] 在这里整个语句由 关键字, 标识符, 界线字符(,), 标识符, 界线字符(,), 标识符, 界线字符(;)组成，我们可以把 标识符, 界线字符(,), 标识符 这种组合定义为一个标识符组(IDNS) 我们可以将token序列成如下语法树 tree = [ {k: \\"LET\\", v: null}, { k: \\"IDNS\\", v: [ { k: \\"IDNS\\", v: [ {k: \\"IDN\\", v: 'a', }, {k: \\"COMMA\\", v: null, }, {k: \\"IDN\\", v: 'b', }, ], }, {k: \\"COMMA\\", v: null, }, {k: \\"IDN\\", v: 'c', }, ], }, {k: \\"SEMICOLON\\", v: null, } ]"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"property":"og:updated_time","content":"2023-09-16T02:59:31.000Z"}],["meta",{"property":"article:published_time","content":"2023-09-14T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-09-16T02:59:31.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"语法分析\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-09-14T00:00:00.000Z\\",\\"dateModified\\":\\"2023-09-16T02:59:31.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"语法分析的主要任务","slug":"语法分析的主要任务","link":"#语法分析的主要任务","children":[]},{"level":2,"title":"语法分析树（描述句子的语法结构）","slug":"语法分析树-描述句子的语法结构","link":"#语法分析树-描述句子的语法结构","children":[]}],"git":{"createdTime":1694833171000,"updatedTime":1694833171000,"contributors":[{"name":"NAN","email":"1066726487@qq.com","commits":1}]},"readingTime":{"minutes":2.41,"words":722},"filePathRelative":"note/ast/02_grammatical_analysis.md","localizedDate":"September 14, 2023","excerpt":"<h2> 语法分析的主要任务</h2>\\n<p>从词法分析器输出的token序列中识别出个类型的短语，并构造<code>语法分析树</code></p>\\n<h2> 语法分析树（描述句子的语法结构）</h2>\\n<div class=\\"hint-container tip\\">\\n<p class=\\"hint-container-title\\">例</p>\\n<h2> 赋值语句分析树</h2>\\n<div class=\\"language-typescript line-numbers-mode\\" data-ext=\\"ts\\"><pre class=\\"language-typescript\\"><code>   <span class=\\"token keyword\\">let</span>       a      <span class=\\"token operator\\">=</span>     b     <span class=\\"token operator\\">+</span>    c          <span class=\\"token operator\\">*</span>    <span class=\\"token number\\">60</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token comment\\">// &lt;LET&gt; &lt;IDN, a&gt; &lt;=&gt; &lt;IDN, b&gt; &lt;+&gt; &lt;IND, reta&gt; &lt;*&gt; &lt;NUM,60&gt; &lt;;&gt;</span>\\n\\n<span class=\\"token comment\\">// 在这里我将 种别码(kind) 用 k， 属性值（value）用 v 代指</span>\\ntokens <span class=\\"token operator\\">=</span> <span class=\\"token punctuation\\">[</span>\\n  <span class=\\"token punctuation\\">{</span>k<span class=\\"token operator\\">:</span> <span class=\\"token string\\">\\"LET\\"</span><span class=\\"token punctuation\\">,</span>  v<span class=\\"token operator\\">:</span> <span class=\\"token keyword\\">null</span><span class=\\"token punctuation\\">,</span> <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">,</span> \\n  <span class=\\"token punctuation\\">{</span>k<span class=\\"token operator\\">:</span> <span class=\\"token string\\">\\"IDN\\"</span><span class=\\"token punctuation\\">,</span> v<span class=\\"token operator\\">:</span> <span class=\\"token string\\">'a'</span><span class=\\"token punctuation\\">,</span> <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">,</span>\\n  <span class=\\"token punctuation\\">{</span>k<span class=\\"token operator\\">:</span> <span class=\\"token string\\">\\"EQUAL\\"</span> v<span class=\\"token operator\\">:</span> <span class=\\"token keyword\\">null</span><span class=\\"token punctuation\\">,</span> <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">,</span>\\n  <span class=\\"token punctuation\\">{</span>k<span class=\\"token operator\\">:</span> <span class=\\"token string\\">\\"IDN\\"</span> v<span class=\\"token operator\\">:</span> <span class=\\"token string\\">'b'</span><span class=\\"token punctuation\\">,</span> <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">,</span>\\n  <span class=\\"token punctuation\\">{</span>k<span class=\\"token operator\\">:</span> <span class=\\"token string\\">\\"ADD\\"</span> v<span class=\\"token operator\\">:</span> <span class=\\"token keyword\\">null</span><span class=\\"token punctuation\\">,</span> <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">,</span>\\n  <span class=\\"token punctuation\\">{</span>k<span class=\\"token operator\\">:</span> <span class=\\"token string\\">\\"IDN\\"</span> v<span class=\\"token operator\\">:</span> <span class=\\"token string\\">'c'</span><span class=\\"token punctuation\\">,</span> <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">,</span>\\n  <span class=\\"token punctuation\\">{</span>k<span class=\\"token operator\\">:</span> <span class=\\"token string\\">\\"MULTIPLY\\"</span> v<span class=\\"token operator\\">:</span> <span class=\\"token keyword\\">null</span><span class=\\"token punctuation\\">,</span> <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">,</span>\\n  <span class=\\"token punctuation\\">{</span>k<span class=\\"token operator\\">:</span> <span class=\\"token string\\">\\"NUM\\"</span> v<span class=\\"token operator\\">:</span> <span class=\\"token number\\">60</span><span class=\\"token punctuation\\">,</span> <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">,</span>\\n  <span class=\\"token punctuation\\">{</span>k<span class=\\"token operator\\">:</span> <span class=\\"token string\\">\\"SEMICOLON\\"</span><span class=\\"token punctuation\\">,</span> v<span class=\\"token operator\\">:</span> <span class=\\"token keyword\\">null</span><span class=\\"token punctuation\\">,</span> <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">,</span>\\n<span class=\\"token punctuation\\">]</span> \\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div><p>观察我们的语法，我们发现整个赋予值语句是由 <code>关键字, 标识符, 界线字符(=), 表达式, 界线字符(;)组成的</code>, 而<code>表达式</code>又由<code>标识符/变量, 运算符组成</code></p>\\n<p>我们可以将token序列成如下<code>语法树</code></p>\\n<div class=\\"language-typescript line-numbers-mode\\" data-ext=\\"ts\\"><pre class=\\"language-typescript\\"><code>tree <span class=\\"token operator\\">=</span> <span class=\\"token punctuation\\">[</span>\\n  <span class=\\"token punctuation\\">{</span>k<span class=\\"token operator\\">:</span> <span class=\\"token string\\">\\"LET\\"</span><span class=\\"token punctuation\\">,</span>  v<span class=\\"token operator\\">:</span> <span class=\\"token keyword\\">null</span><span class=\\"token punctuation\\">,</span> <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">,</span> \\n  <span class=\\"token punctuation\\">{</span>k<span class=\\"token operator\\">:</span> <span class=\\"token string\\">\\"IDN\\"</span><span class=\\"token punctuation\\">,</span> v<span class=\\"token operator\\">:</span> <span class=\\"token string\\">'a'</span><span class=\\"token punctuation\\">,</span> <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">,</span>\\n  <span class=\\"token punctuation\\">{</span>k<span class=\\"token operator\\">:</span> <span class=\\"token string\\">\\"EQUAL\\"</span><span class=\\"token punctuation\\">,</span> v<span class=\\"token operator\\">:</span> <span class=\\"token keyword\\">null</span><span class=\\"token punctuation\\">,</span> <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">,</span>\\n  <span class=\\"token punctuation\\">{</span>\\n    k<span class=\\"token operator\\">:</span> <span class=\\"token string\\">'CHUNK'</span><span class=\\"token punctuation\\">,</span>\\n    v<span class=\\"token operator\\">:</span> <span class=\\"token punctuation\\">[</span>\\n      <span class=\\"token punctuation\\">{</span>k<span class=\\"token operator\\">:</span> <span class=\\"token string\\">\\"IDN\\"</span><span class=\\"token punctuation\\">,</span> v<span class=\\"token operator\\">:</span> <span class=\\"token string\\">'b'</span><span class=\\"token punctuation\\">,</span> <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">,</span>\\n      <span class=\\"token punctuation\\">{</span>k<span class=\\"token operator\\">:</span> <span class=\\"token string\\">\\"ADD\\"</span><span class=\\"token punctuation\\">,</span> v<span class=\\"token operator\\">:</span> <span class=\\"token keyword\\">null</span><span class=\\"token punctuation\\">,</span> <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">,</span>\\n      <span class=\\"token punctuation\\">{</span>\\n        k<span class=\\"token operator\\">:</span> <span class=\\"token string\\">'CHUNK'</span><span class=\\"token punctuation\\">,</span>\\n        v<span class=\\"token operator\\">:</span> <span class=\\"token punctuation\\">[</span>\\n          <span class=\\"token punctuation\\">{</span>k<span class=\\"token operator\\">:</span> <span class=\\"token string\\">\\"IDN\\"</span><span class=\\"token punctuation\\">,</span> v<span class=\\"token operator\\">:</span> <span class=\\"token string\\">'c'</span><span class=\\"token punctuation\\">,</span> <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">,</span>\\n          <span class=\\"token punctuation\\">{</span>k<span class=\\"token operator\\">:</span> <span class=\\"token string\\">\\"MULTIPLY\\"</span><span class=\\"token punctuation\\">,</span> v<span class=\\"token operator\\">:</span> <span class=\\"token keyword\\">null</span><span class=\\"token punctuation\\">,</span> <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">,</span>\\n          <span class=\\"token punctuation\\">{</span>k<span class=\\"token operator\\">:</span> <span class=\\"token string\\">\\"NUM\\"</span><span class=\\"token punctuation\\">,</span> v<span class=\\"token operator\\">:</span> <span class=\\"token number\\">60</span><span class=\\"token punctuation\\">,</span> <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">,</span>\\n        <span class=\\"token punctuation\\">]</span><span class=\\"token punctuation\\">,</span>\\n      <span class=\\"token punctuation\\">}</span>\\n    <span class=\\"token punctuation\\">]</span><span class=\\"token punctuation\\">,</span>\\n  <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">,</span>\\n  <span class=\\"token punctuation\\">{</span>k<span class=\\"token operator\\">:</span> <span class=\\"token string\\">\\"SEMICOLON\\"</span><span class=\\"token punctuation\\">,</span> v<span class=\\"token operator\\">:</span> <span class=\\"token keyword\\">null</span><span class=\\"token punctuation\\">,</span> <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">,</span>\\n<span class=\\"token punctuation\\">]</span> \\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div><h2> 变量声明分析树</h2>\\n<div class=\\"language-typescript line-numbers-mode\\" data-ext=\\"ts\\"><pre class=\\"language-typescript\\"><code><span class=\\"token keyword\\">let</span> a<span class=\\"token punctuation\\">,</span> b<span class=\\"token punctuation\\">,</span> c<span class=\\"token punctuation\\">;</span>\\n<span class=\\"token comment\\">// &lt;let&gt; &lt;ID, a&gt; &lt;,&gt; &lt;IDN,b&gt; &lt;,&gt; &lt;IND,c&gt; &lt;;&gt;</span>\\n\\n<span class=\\"token comment\\">// 在这里我将 种别码(kind) 用 k， 属性值（value）用 v 代指</span>\\ntokens <span class=\\"token operator\\">=</span> <span class=\\"token punctuation\\">[</span>\\n  <span class=\\"token punctuation\\">{</span>k<span class=\\"token operator\\">:</span> <span class=\\"token string\\">\\"LET\\"</span><span class=\\"token punctuation\\">,</span>  v<span class=\\"token operator\\">:</span> <span class=\\"token keyword\\">null</span><span class=\\"token punctuation\\">,</span> <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">,</span> \\n  <span class=\\"token punctuation\\">{</span>k<span class=\\"token operator\\">:</span> <span class=\\"token string\\">\\"IDN\\"</span><span class=\\"token punctuation\\">,</span> v<span class=\\"token operator\\">:</span> <span class=\\"token string\\">'a'</span><span class=\\"token punctuation\\">,</span> <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">,</span>\\n  <span class=\\"token punctuation\\">{</span>k<span class=\\"token operator\\">:</span> <span class=\\"token string\\">\\"COMMA\\"</span><span class=\\"token punctuation\\">,</span> v<span class=\\"token operator\\">:</span> <span class=\\"token keyword\\">null</span><span class=\\"token punctuation\\">,</span> <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">,</span>\\n  <span class=\\"token punctuation\\">{</span>k<span class=\\"token operator\\">:</span> <span class=\\"token string\\">\\"IDN\\"</span><span class=\\"token punctuation\\">,</span> v<span class=\\"token operator\\">:</span> <span class=\\"token string\\">'b'</span><span class=\\"token punctuation\\">,</span> <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">,</span>\\n  <span class=\\"token punctuation\\">{</span>k<span class=\\"token operator\\">:</span> <span class=\\"token string\\">\\"COMMA\\"</span><span class=\\"token punctuation\\">,</span> v<span class=\\"token operator\\">:</span> <span class=\\"token keyword\\">null</span><span class=\\"token punctuation\\">,</span> <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">,</span>\\n  <span class=\\"token punctuation\\">{</span>k<span class=\\"token operator\\">:</span> <span class=\\"token string\\">\\"IDN\\"</span><span class=\\"token punctuation\\">,</span> v<span class=\\"token operator\\">:</span> <span class=\\"token string\\">'c'</span><span class=\\"token punctuation\\">,</span> <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">,</span>\\n  <span class=\\"token punctuation\\">{</span>k<span class=\\"token operator\\">:</span> <span class=\\"token string\\">\\"MULTIPLY\\"</span><span class=\\"token punctuation\\">,</span> v<span class=\\"token operator\\">:</span> <span class=\\"token keyword\\">null</span><span class=\\"token punctuation\\">,</span> <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">,</span>\\n  <span class=\\"token punctuation\\">{</span>k<span class=\\"token operator\\">:</span> <span class=\\"token string\\">\\"NUM\\"</span><span class=\\"token punctuation\\">,</span> v<span class=\\"token operator\\">:</span> <span class=\\"token number\\">60</span><span class=\\"token punctuation\\">,</span> <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">,</span>\\n  <span class=\\"token punctuation\\">{</span>k<span class=\\"token operator\\">:</span> <span class=\\"token string\\">\\"SEMICOLON\\"</span><span class=\\"token punctuation\\">,</span> v<span class=\\"token operator\\">:</span> <span class=\\"token keyword\\">null</span><span class=\\"token punctuation\\">,</span> <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">,</span>\\n<span class=\\"token punctuation\\">]</span> \\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div><p>在这里整个语句由 <code>关键字, 标识符, 界线字符(,), 标识符, 界线字符(,), 标识符, 界线字符(;)组成</code>，我们可以把 <code>标识符, 界线字符(,), 标识符</code> 这种组合定义为一个<code>标识符组(IDNS)</code></p>\\n<p>我们可以将token序列成如下<code>语法树</code></p>\\n<div class=\\"language-typescript line-numbers-mode\\" data-ext=\\"ts\\"><pre class=\\"language-typescript\\"><code>tree <span class=\\"token operator\\">=</span> <span class=\\"token punctuation\\">[</span>\\n  <span class=\\"token punctuation\\">{</span>k<span class=\\"token operator\\">:</span> <span class=\\"token string\\">\\"LET\\"</span><span class=\\"token punctuation\\">,</span>  v<span class=\\"token operator\\">:</span> <span class=\\"token keyword\\">null</span><span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">,</span> \\n  <span class=\\"token punctuation\\">{</span>\\n    k<span class=\\"token operator\\">:</span> <span class=\\"token string\\">\\"IDNS\\"</span><span class=\\"token punctuation\\">,</span> \\n    v<span class=\\"token operator\\">:</span> <span class=\\"token punctuation\\">[</span>\\n      <span class=\\"token punctuation\\">{</span>\\n        k<span class=\\"token operator\\">:</span> <span class=\\"token string\\">\\"IDNS\\"</span><span class=\\"token punctuation\\">,</span> \\n        v<span class=\\"token operator\\">:</span> <span class=\\"token punctuation\\">[</span>\\n          <span class=\\"token punctuation\\">{</span>k<span class=\\"token operator\\">:</span> <span class=\\"token string\\">\\"IDN\\"</span><span class=\\"token punctuation\\">,</span> v<span class=\\"token operator\\">:</span> <span class=\\"token string\\">'a'</span><span class=\\"token punctuation\\">,</span> <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">,</span>\\n          <span class=\\"token punctuation\\">{</span>k<span class=\\"token operator\\">:</span> <span class=\\"token string\\">\\"COMMA\\"</span><span class=\\"token punctuation\\">,</span> v<span class=\\"token operator\\">:</span> <span class=\\"token keyword\\">null</span><span class=\\"token punctuation\\">,</span> <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">,</span>\\n          <span class=\\"token punctuation\\">{</span>k<span class=\\"token operator\\">:</span> <span class=\\"token string\\">\\"IDN\\"</span><span class=\\"token punctuation\\">,</span> v<span class=\\"token operator\\">:</span> <span class=\\"token string\\">'b'</span><span class=\\"token punctuation\\">,</span> <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">,</span>\\n        <span class=\\"token punctuation\\">]</span><span class=\\"token punctuation\\">,</span>\\n      <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">,</span>\\n      <span class=\\"token punctuation\\">{</span>k<span class=\\"token operator\\">:</span> <span class=\\"token string\\">\\"COMMA\\"</span><span class=\\"token punctuation\\">,</span> v<span class=\\"token operator\\">:</span> <span class=\\"token keyword\\">null</span><span class=\\"token punctuation\\">,</span> <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">,</span>\\n      <span class=\\"token punctuation\\">{</span>k<span class=\\"token operator\\">:</span> <span class=\\"token string\\">\\"IDN\\"</span><span class=\\"token punctuation\\">,</span> v<span class=\\"token operator\\">:</span> <span class=\\"token string\\">'c'</span><span class=\\"token punctuation\\">,</span> <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">,</span>\\n    <span class=\\"token punctuation\\">]</span><span class=\\"token punctuation\\">,</span>\\n  <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">,</span>\\n  <span class=\\"token punctuation\\">{</span>k<span class=\\"token operator\\">:</span> <span class=\\"token string\\">\\"SEMICOLON\\"</span><span class=\\"token punctuation\\">,</span> v<span class=\\"token operator\\">:</span> <span class=\\"token keyword\\">null</span><span class=\\"token punctuation\\">,</span> <span class=\\"token punctuation\\">}</span>\\n<span class=\\"token punctuation\\">]</span> \\n\\n\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div></div>","autoDesc":true}`);export{n as data};
