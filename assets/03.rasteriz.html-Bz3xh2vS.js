const e=JSON.parse('{"key":"v-65920de0","path":"/note/graphics/03.rasteriz.html","title":"视口与光栅化","lang":"en-US","frontmatter":{"title":"视口与光栅化","order":3,"category":["graphics"],"description":"视口的定义（viewport） 屏幕空间 在计算机图像学中使用视角field-of-veiw(fovY)和长宽(aspect ratio)比来定义视口 在知道视角fovY之后我们可以得到屏幕在竖直方向上的半径$t$ $$ t = tan\\\\frac{fovY}{2} * |n| $$ 视口的上下分别为 $$ viewT=t\\\\qquad viewB=-t $$","head":[["meta",{"property":"og:url","content":"https://github.com/export-nan/nan-blogs/note/graphics/03.rasteriz.html"}],["meta",{"property":"og:site_name","content":"NAN"}],["meta",{"property":"og:title","content":"视口与光栅化"}],["meta",{"property":"og:description","content":"视口的定义（viewport） 屏幕空间 在计算机图像学中使用视角field-of-veiw(fovY)和长宽(aspect ratio)比来定义视口 在知道视角fovY之后我们可以得到屏幕在竖直方向上的半径$t$ $$ t = tan\\\\frac{fovY}{2} * |n| $$ 视口的上下分别为 $$ viewT=t\\\\qquad viewB=-t $$"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"property":"og:updated_time","content":"2023-12-06T03:03:01.000Z"}],["meta",{"property":"article:author","content":"NAN"}],["meta",{"property":"article:modified_time","content":"2023-12-06T03:03:01.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"视口与光栅化\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-12-06T03:03:01.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"NAN\\",\\"url\\":\\"https://github.com/export-nan\\"}]}"]]},"headers":[{"level":2,"title":"屏幕空间","slug":"屏幕空间","link":"#屏幕空间","children":[]},{"level":2,"title":"像素与屏幕空间","slug":"像素与屏幕空间","link":"#像素与屏幕空间","children":[]},{"level":2,"title":"映射到视口矩阵","slug":"映射到视口矩阵","link":"#映射到视口矩阵","children":[]},{"level":2,"title":"三角型: 图形学最基本的多边形","slug":"三角型-图形学最基本的多边形","link":"#三角型-图形学最基本的多边形","children":[{"level":3,"title":"采样法判断屏幕上的一个点是否在三角形内","slug":"采样法判断屏幕上的一个点是否在三角形内","link":"#采样法判断屏幕上的一个点是否在三角形内","children":[]},{"level":3,"title":"包围盒优化光栅算法","slug":"包围盒优化光栅算法","link":"#包围盒优化光栅算法","children":[]}]},{"level":2,"title":"反走样(抗锯齿)与深度缓冲","slug":"反走样-抗锯齿-与深度缓冲","link":"#反走样-抗锯齿-与深度缓冲","children":[]}],"git":{"createdTime":1701831781000,"updatedTime":1701831781000,"contributors":[{"name":"NAN","email":"1066726487@qq.com","commits":1}]},"readingTime":{"minutes":3.12,"words":936},"filePathRelative":"note/graphics/03.rasteriz.md","localizedDate":"December 6, 2023","excerpt":"<h1> 视口的定义（viewport）</h1>\\n<h2> 屏幕空间</h2>\\n<p>在计算机图像学中使用视角field-of-veiw(fovY)和长宽(aspect ratio)比来定义视口</p>\\n<figure><figcaption></figcaption></figure>\\n<p>在知道视角fovY之后我们可以得到屏幕在竖直方向上的半径$t$</p>\\n<figure><figcaption></figcaption></figure>\\n<p>$$<br>\\nt = tan\\\\frac{fovY}{2} * |n|<br>\\n$$</p>\\n<p>视口的上下分别为<br>\\n$$<br>\\nviewT=t\\\\qquad viewB=-t<br>\\n$$</p>","autoDesc":true}');export{e as data};
