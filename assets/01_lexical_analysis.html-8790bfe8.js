import{_ as n,W as s,X as a,a1 as t}from"./framework-51d990c7.js";const e={},p=t(`<h2 id="词法分析的主要任务" tabindex="-1"><a class="header-anchor" href="#词法分析的主要任务" aria-hidden="true">#</a> 词法分析的主要任务</h2><ol><li>从左往右逐行扫描源字符码，识别各个单词，确定单词的类型</li><li>将识别出的单词转换成统一的<code>词法单元:token</code>进行表示，</li></ol><h3 id="token-种别码-属性值" tabindex="-1"><a class="header-anchor" href="#token-种别码-属性值" aria-hidden="true">#</a> token &lt;种别码, 属性值&gt;</h3><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code>token <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">// 种别码 </span>
  kind<span class="token operator">:</span> <span class="token operator">...</span>
  <span class="token comment">// 属性值</span>
  value<span class="token operator">:</span> <span class="token operator">...</span>
<span class="token punctuation">}</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以将我们编程中遇见的单词大致分为一下几种形式</p><table><thead><tr><th style="text-align:center;"></th><th style="text-align:center;">单词类型</th><th style="text-align:left;">种别</th><th style="text-align:left;">种别码</th></tr></thead><tbody><tr><td style="text-align:center;">1</td><td style="text-align:center;">关键字</td><td style="text-align:left;">if, else, for, fun, ...</td><td style="text-align:left;">一词一码</td></tr><tr><td style="text-align:center;">2</td><td style="text-align:center;">标识符</td><td style="text-align:left;">变量, 浮点型, 字符型, ...</td><td style="text-align:left;">多词一码</td></tr><tr><td style="text-align:center;">3</td><td style="text-align:center;">常量</td><td style="text-align:left;">变量, 浮点型, 字符型, ...</td><td style="text-align:left;">一型一码</td></tr><tr><td style="text-align:center;">4</td><td style="text-align:center;">运算符</td><td style="text-align:left;">算数、关系、逻辑 运算符</td><td style="text-align:left;">一词一码/一型一码</td></tr><tr><td style="text-align:center;">5</td><td style="text-align:center;">界限字符</td><td style="text-align:left;">; () = {} ...</td><td style="text-align:left;">一词一码</td></tr></tbody></table><p>我们在分析</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code>  <span class="token keyword">while</span><span class="token punctuation">(</span> i <span class="token operator">!=</span> <span class="token number">100</span> <span class="token punctuation">)</span><span class="token punctuation">{</span>
    i <span class="token operator">++</span> 
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>的时候， 我们可以将它分解为以下token序列</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">const</span> tokenList <span class="token operator">=</span> <span class="token punctuation">[</span>
  <span class="token comment">// while</span>
  <span class="token punctuation">{</span> kind<span class="token operator">:</span> <span class="token string">&#39;WHILE&#39;</span><span class="token punctuation">,</span> value<span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token punctuation">}</span>
  <span class="token comment">// (</span>
  <span class="token punctuation">{</span> kind<span class="token operator">:</span> <span class="token string">&#39;SLP&#39;</span><span class="token punctuation">,</span> value<span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token punctuation">}</span>
  <span class="token comment">// i</span>
  <span class="token punctuation">{</span> kind<span class="token operator">:</span> <span class="token string">&#39;IDN&#39;</span><span class="token punctuation">,</span> value<span class="token operator">:</span> <span class="token string">&#39;i&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">}</span>
  <span class="token comment">// !=</span>
  <span class="token punctuation">{</span> kind<span class="token operator">:</span> <span class="token string">&#39;NE&#39;</span><span class="token punctuation">,</span> value<span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token punctuation">}</span>
  <span class="token comment">// )</span>
  <span class="token punctuation">{</span> kind<span class="token operator">:</span> <span class="token string">&#39;SRP&#39;</span><span class="token punctuation">,</span> value<span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token punctuation">}</span>
  <span class="token comment">// {</span>
  <span class="token punctuation">{</span> kind<span class="token operator">:</span> <span class="token string">&#39;LP&#39;</span><span class="token punctuation">,</span> value<span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token punctuation">}</span>
  <span class="token comment">// i</span>
  <span class="token punctuation">{</span> kind<span class="token operator">:</span> <span class="token string">&#39;IDN&#39;</span><span class="token punctuation">,</span> value<span class="token operator">:</span> <span class="token string">&#39;i&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">}</span>
  <span class="token comment">// ++</span>
  <span class="token punctuation">{</span> kind<span class="token operator">:</span> <span class="token string">&#39;INC&#39;</span><span class="token punctuation">,</span> value<span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token punctuation">}</span>
  <span class="token comment">// ;</span>
  <span class="token punctuation">{</span> kind<span class="token operator">:</span> <span class="token string">&#39;SEMI&#39;</span><span class="token punctuation">,</span> value<span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token punctuation">}</span>
  <span class="token comment">// }</span>
  <span class="token punctuation">{</span> kind<span class="token operator">:</span> <span class="token string">&#39;RP&#39;</span><span class="token punctuation">,</span> value<span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token punctuation">}</span>
<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,10),l=[p];function o(c,i){return s(),a("div",null,l)}const d=n(e,[["render",o],["__file","01_lexical_analysis.html.vue"]]);export{d as default};
