const e=JSON.parse('{"key":"v-3e81ebaa","path":"/note/vue/reactivity.html","title":"vue 响应式数据原理","lang":"en-US","frontmatter":{"title":"vue 响应式数据原理","date":"2023-02-14T00:00:00.000Z","tag":["vue","源码"],"category":["Javascript/Typescript"],"description":"什么是响应式? 首先响应式是一个过程，由两个参与者组成，一个是触发者，另个是响应者 触发者：数据 响应者：引用数据的函数 (vue3中称之为副作用函数(effect)) 当数据改变时，引用数据的副作用函数响应数据的改变并重新执行，这个过程就是响应式 响应式核心：Proxy 代理 new Proxy 传入一个源对象，返回一个Proxy实例","head":[["meta",{"property":"og:url","content":"https://export-nan.github.io/nan-blogs/nan-blogs/note/vue/reactivity.html"}],["meta",{"property":"og:site_name","content":"NAN"}],["meta",{"property":"og:title","content":"vue 响应式数据原理"}],["meta",{"property":"og:description","content":"什么是响应式? 首先响应式是一个过程，由两个参与者组成，一个是触发者，另个是响应者 触发者：数据 响应者：引用数据的函数 (vue3中称之为副作用函数(effect)) 当数据改变时，引用数据的副作用函数响应数据的改变并重新执行，这个过程就是响应式 响应式核心：Proxy 代理 new Proxy 传入一个源对象，返回一个Proxy实例"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"property":"og:updated_time","content":"2023-02-16T06:59:51.000Z"}],["meta",{"property":"article:author","content":"NAN"}],["meta",{"property":"article:tag","content":"vue"}],["meta",{"property":"article:tag","content":"源码"}],["meta",{"property":"article:published_time","content":"2023-02-14T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-02-16T06:59:51.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"vue 响应式数据原理\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-02-14T00:00:00.000Z\\",\\"dateModified\\":\\"2023-02-16T06:59:51.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"NAN\\",\\"url\\":\\"https://github.com/open-nan\\"}]}"]]},"headers":[{"level":2,"title":"什么是响应式?","slug":"什么是响应式","link":"#什么是响应式","children":[]},{"level":2,"title":"响应式核心：Proxy 代理","slug":"响应式核心-proxy-代理","link":"#响应式核心-proxy-代理","children":[]},{"level":2,"title":"基本的响应式实现思路","slug":"基本的响应式实现思路","link":"#基本的响应式实现思路","children":[]},{"level":2,"title":"定义一个副作用桶","slug":"定义一个副作用桶","link":"#定义一个副作用桶","children":[]},{"level":2,"title":"依赖收集","slug":"依赖收集","link":"#依赖收集","children":[]},{"level":2,"title":"进一步改进桶结构","slug":"进一步改进桶结构","link":"#进一步改进桶结构","children":[]},{"level":2,"title":"使用 WeckMap 对桶结构进行改进","slug":"使用-weckmap-对桶结构进行改进","link":"#使用-weckmap-对桶结构进行改进","children":[]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]}],"git":{"createdTime":1676380693000,"updatedTime":1676530791000,"contributors":[{"name":"NAN","email":"export.nan@gmail.com","commits":5}]},"readingTime":{"minutes":9.33,"words":2799},"filePathRelative":"note/vue/reactivity.md","localizedDate":"February 14, 2023","excerpt":"<h2> 什么是响应式?</h2>\\n<p>首先响应式是一个过程，由两个参与者组成，一个是<code>触发者</code>，另个是<code>响应者</code></p>\\n<ul>\\n<li>触发者：数据</li>\\n<li>响应者：引用数据的函数 (vue3中称之为<code>副作用函数(effect)</code>)</li>\\n</ul>\\n<p>当数据改变时，引用数据的<code>副作用函数</code>响应数据的改变并重新执行，这个过程就是响应式</p>\\n<h2> 响应式核心：Proxy 代理</h2>\\n<p><code>new Proxy</code> 传入一个源对象，返回一个<code>Proxy</code>实例</p>","autoDesc":true}');export{e as data};
