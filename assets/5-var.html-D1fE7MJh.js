const e=JSON.parse('{"key":"v-27c3578d","path":"/note/go/5-var.html","title":"变量与常量","lang":"en-US","frontmatter":{"title":"变量与常量","order":5,"category":["GO"],"description":"概念 变量与常量是数据在内存中的抽象, 它们是内存地址的别名，用来方便我们操作内存中的数据。 比如我们有一组运算 $X = A + B， A = 1，B = 2 $ 需要完成，在计算机中我们需要 将 1 存储到内存中，假设存储在地址 0X0001，并为这个内存地址取一个别名 A 将 2 存储到内存中，假设存储在地址 0X0002，并为这个内存地址取一个别名 B 然后将 A 与 2 相加，得到结果 3， 在CUP中实际上就是：内存地址 0X0001 与 0X0002 所存放的数相加 把结果 3 存储到内存中，假设存储在地址 0X0003，并为这个内存地址取一个别名 X","head":[["meta",{"property":"og:url","content":"https://export-nan.github.io/nan-blogs/note/go/5-var.html"}],["meta",{"property":"og:site_name","content":"NAN"}],["meta",{"property":"og:title","content":"变量与常量"}],["meta",{"property":"og:description","content":"概念 变量与常量是数据在内存中的抽象, 它们是内存地址的别名，用来方便我们操作内存中的数据。 比如我们有一组运算 $X = A + B， A = 1，B = 2 $ 需要完成，在计算机中我们需要 将 1 存储到内存中，假设存储在地址 0X0001，并为这个内存地址取一个别名 A 将 2 存储到内存中，假设存储在地址 0X0002，并为这个内存地址取一个别名 B 然后将 A 与 2 相加，得到结果 3， 在CUP中实际上就是：内存地址 0X0001 与 0X0002 所存放的数相加 把结果 3 存储到内存中，假设存储在地址 0X0003，并为这个内存地址取一个别名 X"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"property":"og:updated_time","content":"2024-09-15T15:43:03.000Z"}],["meta",{"property":"article:author","content":"NAN"}],["meta",{"property":"article:modified_time","content":"2024-09-15T15:43:03.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"变量与常量\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-09-15T15:43:03.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"NAN\\",\\"url\\":\\"https://github.com/open-nan\\"}]}"]]},"headers":[{"level":2,"title":"概念","slug":"概念","link":"#概念","children":[]},{"level":2,"title":"变量","slug":"变量","link":"#变量","children":[{"level":3,"title":"声明","slug":"声明","link":"#声明","children":[]}]},{"level":2,"title":"常量","slug":"常量","link":"#常量","children":[{"level":3,"title":"声明","slug":"声明-1","link":"#声明-1","children":[]}]},{"level":2,"title":"iota","slug":"iota","link":"#iota","children":[]}],"git":{"createdTime":1726414983000,"updatedTime":1726414983000,"contributors":[{"name":"NAN","email":"54296915+open-nan@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.79,"words":1737},"filePathRelative":"note/go/5-var.md","localizedDate":"September 15, 2024","excerpt":"<h2> 概念</h2>\\n<p><code>变量</code>与<code>常量</code>是数据在内存中的抽象, 它们是内存地址的别名，用来方便我们操作内存中的数据。</p>\\n<p>比如我们有一组运算 $X = A + B， A = 1，B = 2 $ 需要完成，在计算机中我们需要</p>\\n<ol>\\n<li>将 1 存储到内存中，假设存储在地址 0X0001，并为这个内存地址取一个别名 A</li>\\n<li>将 2 存储到内存中，假设存储在地址 0X0002，并为这个内存地址取一个别名 B</li>\\n<li>然后将 A 与 2 相加，得到结果 3， 在CUP中实际上就是：内存地址 0X0001 与 0X0002 所存放的数相加</li>\\n<li>把结果 3 存储到内存中，假设存储在地址 0X0003，并为这个内存地址取一个别名 X</li>\\n</ol>","autoDesc":true}');export{e as data};