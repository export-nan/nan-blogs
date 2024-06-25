import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as s,c as a,f as t}from"./app-1k6zdprG.js";const p={},e=t(`<p>::: vue-playground webgl 绘制一个点</p><template><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span> <span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>canvas</span> 
    <span class="token attr-name">ref</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>canvasDOM<span class="token punctuation">&quot;</span></span> 
    <span class="token attr-name">:canvas-id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>canvasId<span class="token punctuation">&quot;</span></span>
    <span class="token attr-name">:width</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>props.width<span class="token punctuation">&quot;</span></span>
    <span class="token attr-name">:height</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>props.height<span class="token punctuation">&quot;</span></span>
  <span class="token punctuation">/&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">setup</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>ts<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">import</span> <span class="token punctuation">{</span> onMounted<span class="token punctuation">,</span> ref <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span><span class="token punctuation">;</span>

<span class="token comment">// 定义 props</span>
<span class="token keyword">export</span> <span class="token keyword">interface</span> <span class="token class-name">Props</span> <span class="token punctuation">{</span>
  canvasId<span class="token operator">?</span><span class="token operator">:</span> string<span class="token punctuation">,</span>
  width<span class="token operator">?</span><span class="token operator">:</span> number<span class="token punctuation">,</span>
  height<span class="token operator">?</span><span class="token operator">:</span> number
<span class="token punctuation">}</span>
<span class="token keyword">const</span> props <span class="token operator">=</span> <span class="token function">withDefaults</span><span class="token punctuation">(</span>defineProps<span class="token operator">&lt;</span>Props<span class="token operator">&gt;</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">width</span><span class="token operator">:</span> <span class="token number">150</span><span class="token punctuation">,</span>
  <span class="token literal-property property">height</span><span class="token operator">:</span> <span class="token number">150</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">// 定义 canvasId</span>
<span class="token keyword">const</span> canvasId  <span class="token operator">=</span> props<span class="token punctuation">.</span>canvasId
<span class="token comment">// 定义 canvasDOM</span>
<span class="token keyword">const</span> canvasDOM <span class="token operator">=</span> ref<span class="token operator">&lt;</span>HTMLCanvasElement<span class="token operator">&gt;</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment">// 定义 canvas 上下文对象</span>
<span class="token keyword">let</span> <span class="token literal-property property">ctx</span><span class="token operator">:</span>WebGLRenderingContext <span class="token operator">|</span> <span class="token keyword">null</span>  <span class="token operator">=</span> <span class="token keyword">null</span>


<span class="token function">onMounted</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token comment">// 获取 canvas 上下文对象</span>
  ctx <span class="token operator">=</span> canvasDOM<span class="token punctuation">.</span>value<span class="token operator">?.</span><span class="token function">getContext</span><span class="token punctuation">(</span><span class="token string">&quot;webgl&quot;</span><span class="token punctuation">)</span> <span class="token keyword">as</span> WebGLRenderingContext<span class="token punctuation">;</span>

  <span class="token comment">// 定义顶点着色器 GLSL</span>
  <span class="token keyword">const</span> vertexShaderSource <span class="token operator">=</span>  <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
    void main (){
      gl_PointSize=20.0;
      gl_Position=vec4(0.0,0.0,0.0,1.0);
    }
  </span><span class="token template-punctuation string">\`</span></span>

  <span class="token comment">// 定义片源着色器 GLSL</span>
  <span class="token keyword">const</span> framgmentShaderSource <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string"> 
    void main (){
      gl_FragColor=vec4(1.0,0.0,0.0,1.0);
    }
  </span><span class="token template-punctuation string">\`</span></span>

  <span class="token comment">// 调用初始化着色器函数</span>
  <span class="token keyword">const</span> program <span class="token operator">=</span> <span class="token function">initShaber</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> vertexShaderSource<span class="token punctuation">,</span> framgmentShaderSource<span class="token punctuation">)</span> 

  <span class="token comment">// 渲染到canvas中</span>
  ctx<span class="token punctuation">.</span><span class="token function">drawArrays</span><span class="token punctuation">(</span>ctx<span class="token punctuation">.</span><span class="token constant">POINTS</span><span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>


<span class="token comment">// 声明初始化着色器函数</span>
<span class="token keyword">function</span> <span class="token function">initShaber</span><span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">gl</span><span class="token operator">:</span> WebGLRenderingContext<span class="token punctuation">,</span> <span class="token literal-property property">vertexShaderSource</span><span class="token operator">:</span> string<span class="token punctuation">,</span> <span class="token literal-property property">framgmentShaderSource</span><span class="token operator">:</span> string</span> <span class="token punctuation">)</span><span class="token punctuation">{</span>

  <span class="token comment">// 创建顶点着色器</span>
  <span class="token keyword">let</span> vertexShader <span class="token operator">=</span> gl<span class="token punctuation">.</span><span class="token function">createShader</span><span class="token punctuation">(</span>gl<span class="token punctuation">.</span><span class="token constant">VERTEX_SHADER</span><span class="token punctuation">)</span> <span class="token keyword">as</span> WebGLShader
  <span class="token comment">// 创建片着色器</span>
  <span class="token keyword">let</span> framgmentShader <span class="token operator">=</span> gl<span class="token punctuation">.</span><span class="token function">createShader</span><span class="token punctuation">(</span>gl<span class="token punctuation">.</span><span class="token constant">FRAGMENT_SHADER</span><span class="token punctuation">)</span> <span class="token keyword">as</span> WebGLShader

  <span class="token comment">// 引入着色器源</span>
  gl<span class="token punctuation">.</span><span class="token function">shaderSource</span><span class="token punctuation">(</span>vertexShader<span class="token punctuation">,</span>vertexShaderSource<span class="token punctuation">)</span>
  gl<span class="token punctuation">.</span><span class="token function">shaderSource</span><span class="token punctuation">(</span>framgmentShader<span class="token punctuation">,</span>framgmentShaderSource<span class="token punctuation">)</span>

  <span class="token comment">// 编译着色器</span>
  gl<span class="token punctuation">.</span><span class="token function">compileShader</span><span class="token punctuation">(</span>vertexShader<span class="token punctuation">)</span>
  gl<span class="token punctuation">.</span><span class="token function">compileShader</span><span class="token punctuation">(</span>framgmentShader<span class="token punctuation">)</span>

  <span class="token comment">// 创建程序对象</span>
  <span class="token keyword">const</span> program <span class="token operator">=</span> gl<span class="token punctuation">.</span><span class="token function">createProgram</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">as</span> WebGLProgram

  <span class="token comment">// 附着着色器到program</span>
  gl<span class="token punctuation">.</span><span class="token function">attachShader</span><span class="token punctuation">(</span>program<span class="token punctuation">,</span> vertexShader<span class="token punctuation">)</span>
  gl<span class="token punctuation">.</span><span class="token function">attachShader</span><span class="token punctuation">(</span>program<span class="token punctuation">,</span> framgmentShader<span class="token punctuation">)</span>

  <span class="token comment">// 链接program</span>
  gl<span class="token punctuation">.</span><span class="token function">linkProgram</span><span class="token punctuation">(</span>program<span class="token punctuation">)</span>
  <span class="token comment">// 链接program</span>
  gl<span class="token punctuation">.</span><span class="token function">useProgram</span><span class="token punctuation">(</span>program<span class="token punctuation">)</span>

  <span class="token keyword">return</span> program
<span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><template><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;imports&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;@vueuse/core&quot;</span><span class="token operator">:</span> <span class="token string">&quot;https://unpkg.com/@vueuse/core/index.mjs&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;@vueuse/shared&quot;</span><span class="token operator">:</span> <span class="token string">&quot;https://unpkg.com/@vueuse/shared/index.mjs&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;vue-demi&quot;</span><span class="token operator">:</span> <span class="token string">&quot;https://unpkg.com/vue-demi/lib/index.mjs&quot;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><template><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;showCompileOutput&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>:::</p><p>::: vue-playground webgl 绘制一个矩形</p></template></template></template><template><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span> <span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>canvas</span> 
    <span class="token attr-name">ref</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>canvasDOM<span class="token punctuation">&quot;</span></span> 
    <span class="token attr-name">:canvas-id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>canvasId<span class="token punctuation">&quot;</span></span>
    <span class="token attr-name">:width</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>props.width<span class="token punctuation">&quot;</span></span>
    <span class="token attr-name">:height</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>props.height<span class="token punctuation">&quot;</span></span>
  <span class="token punctuation">/&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">setup</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>ts<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">import</span> <span class="token punctuation">{</span> onMounted<span class="token punctuation">,</span> ref <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span><span class="token punctuation">;</span>

<span class="token comment">// 定义 props</span>
<span class="token keyword">export</span> <span class="token keyword">interface</span> <span class="token class-name">Props</span> <span class="token punctuation">{</span>
  canvasId<span class="token operator">?</span><span class="token operator">:</span> string<span class="token punctuation">,</span>
  width<span class="token operator">?</span><span class="token operator">:</span> number<span class="token punctuation">,</span>
  height<span class="token operator">?</span><span class="token operator">:</span> number
<span class="token punctuation">}</span>
<span class="token keyword">const</span> props <span class="token operator">=</span> <span class="token function">withDefaults</span><span class="token punctuation">(</span>defineProps<span class="token operator">&lt;</span>Props<span class="token operator">&gt;</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">width</span><span class="token operator">:</span> <span class="token number">150</span><span class="token punctuation">,</span>
  <span class="token literal-property property">height</span><span class="token operator">:</span> <span class="token number">150</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">// 定义 canvasId</span>
<span class="token keyword">const</span> canvasId  <span class="token operator">=</span> props<span class="token punctuation">.</span>canvasId
<span class="token comment">// 定义 canvasDOM</span>
<span class="token keyword">const</span> canvasDOM <span class="token operator">=</span> ref<span class="token operator">&lt;</span>HTMLCanvasElement<span class="token operator">&gt;</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment">// 定义 canvas 上下文对象</span>
<span class="token keyword">let</span> <span class="token literal-property property">ctx</span><span class="token operator">:</span>WebGLRenderingContext <span class="token operator">|</span> <span class="token keyword">null</span>  <span class="token operator">=</span> <span class="token keyword">null</span>


<span class="token function">onMounted</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token comment">// 获取 canvas 上下文对象</span>
  ctx <span class="token operator">=</span> canvasDOM<span class="token punctuation">.</span>value<span class="token operator">?.</span><span class="token function">getContext</span><span class="token punctuation">(</span><span class="token string">&quot;webgl&quot;</span><span class="token punctuation">)</span> <span class="token keyword">as</span> WebGLRenderingContext<span class="token punctuation">;</span>

  <span class="token comment">// 定义顶点着色器 GLSL</span>
  <span class="token keyword">const</span> vertexShaderSource <span class="token operator">=</span>  <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
    attribute vec4 apos;
    void main() {
      gl_Position=apos;
    }
  </span><span class="token template-punctuation string">\`</span></span>

  <span class="token comment">// 定义片源着色器 GLSL</span>
  <span class="token keyword">const</span> framgmentShaderSource <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string"> 
    void main (){
      gl_FragColor=vec4(1.0,0.0,0.0,1.0);
    }
  </span><span class="token template-punctuation string">\`</span></span>

  <span class="token comment">// 调用初始化着色器函数</span>
  <span class="token keyword">const</span> program <span class="token operator">=</span> <span class="token function">initShaber</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> vertexShaderSource<span class="token punctuation">,</span> framgmentShaderSource<span class="token punctuation">)</span> 
  <span class="token comment">// 获取顶点着色器的位置变量apos，将变量 aposLocation 指向 apos 变量</span>
  <span class="token keyword">let</span> aposLocation <span class="token operator">=</span> ctx<span class="token punctuation">.</span><span class="token function">getAttribLocation</span><span class="token punctuation">(</span>program<span class="token punctuation">,</span> <span class="token string">&#39;apos&#39;</span><span class="token punctuation">)</span>
  
  <span class="token comment">// 定义 四个顶点的数组</span>
  <span class="token keyword">const</span> data <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Float32Array</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">0.5</span><span class="token punctuation">,</span> <span class="token number">0.5</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">0.5</span><span class="token punctuation">,</span> <span class="token number">0.5</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">0.5</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">0.5</span><span class="token punctuation">,</span> <span class="token number">0.5</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">0.5</span><span class="token punctuation">]</span><span class="token punctuation">)</span>

  <span class="token comment">// 创建缓冲区对象</span>
  <span class="token keyword">const</span> buffer <span class="token operator">=</span> ctx<span class="token punctuation">.</span><span class="token function">createBuffer</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token comment">// 绑定缓冲区对象</span>
  ctx<span class="token punctuation">.</span><span class="token function">bindBuffer</span><span class="token punctuation">(</span>ctx<span class="token punctuation">.</span><span class="token constant">ARRAY_BUFFER</span><span class="token punctuation">,</span> buffer<span class="token punctuation">)</span>
  <span class="token comment">// 将顶点数组传入缓存区</span>
  ctx<span class="token punctuation">.</span><span class="token function">bufferData</span><span class="token punctuation">(</span>ctx<span class="token punctuation">.</span><span class="token constant">ARRAY_BUFFER</span><span class="token punctuation">,</span> data<span class="token punctuation">,</span> ctx<span class="token punctuation">.</span><span class="token constant">STATIC_DRAW</span><span class="token punctuation">)</span>
  <span class="token comment">// 缓存区中的数据传递给apos</span>
  ctx<span class="token punctuation">.</span><span class="token function">vertexAttribPointer</span><span class="token punctuation">(</span>aposLocation<span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> ctx<span class="token punctuation">.</span><span class="token constant">FLOAT</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>
  <span class="token comment">// 允许数据传递</span>
  ctx<span class="token punctuation">.</span><span class="token function">enableVertexAttribArray</span><span class="token punctuation">(</span>aposLocation<span class="token punctuation">)</span><span class="token punctuation">;</span>
  
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>aposLocation<span class="token punctuation">)</span><span class="token punctuation">;</span>
  

  <span class="token comment">// 开始绘制</span>
  ctx<span class="token punctuation">.</span><span class="token function">drawArrays</span><span class="token punctuation">(</span>ctx<span class="token punctuation">.</span><span class="token constant">LINE_LOOP</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>


<span class="token comment">// 声明初始化着色器函数</span>
<span class="token keyword">function</span> <span class="token function">initShaber</span><span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">gl</span><span class="token operator">:</span> WebGLRenderingContext<span class="token punctuation">,</span> <span class="token literal-property property">vertexShaderSource</span><span class="token operator">:</span> string<span class="token punctuation">,</span> <span class="token literal-property property">framgmentShaderSource</span><span class="token operator">:</span> string</span> <span class="token punctuation">)</span><span class="token punctuation">{</span>

  <span class="token comment">// 创建顶点着色器</span>
  <span class="token keyword">let</span> vertexShader <span class="token operator">=</span> gl<span class="token punctuation">.</span><span class="token function">createShader</span><span class="token punctuation">(</span>gl<span class="token punctuation">.</span><span class="token constant">VERTEX_SHADER</span><span class="token punctuation">)</span> <span class="token keyword">as</span> WebGLShader
  <span class="token comment">// 创建片着色器</span>
  <span class="token keyword">let</span> framgmentShader <span class="token operator">=</span> gl<span class="token punctuation">.</span><span class="token function">createShader</span><span class="token punctuation">(</span>gl<span class="token punctuation">.</span><span class="token constant">FRAGMENT_SHADER</span><span class="token punctuation">)</span> <span class="token keyword">as</span> WebGLShader

  <span class="token comment">// 引入着色器源</span>
  gl<span class="token punctuation">.</span><span class="token function">shaderSource</span><span class="token punctuation">(</span>vertexShader<span class="token punctuation">,</span>vertexShaderSource<span class="token punctuation">)</span>
  gl<span class="token punctuation">.</span><span class="token function">shaderSource</span><span class="token punctuation">(</span>framgmentShader<span class="token punctuation">,</span>framgmentShaderSource<span class="token punctuation">)</span>

  <span class="token comment">// 编译着色器</span>
  gl<span class="token punctuation">.</span><span class="token function">compileShader</span><span class="token punctuation">(</span>vertexShader<span class="token punctuation">)</span>
  gl<span class="token punctuation">.</span><span class="token function">compileShader</span><span class="token punctuation">(</span>framgmentShader<span class="token punctuation">)</span>

  <span class="token comment">// 创建程序对象</span>
  <span class="token keyword">const</span> program <span class="token operator">=</span> gl<span class="token punctuation">.</span><span class="token function">createProgram</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">as</span> WebGLProgram

  <span class="token comment">// 附着着色器到program</span>
  gl<span class="token punctuation">.</span><span class="token function">attachShader</span><span class="token punctuation">(</span>program<span class="token punctuation">,</span> vertexShader<span class="token punctuation">)</span>
  gl<span class="token punctuation">.</span><span class="token function">attachShader</span><span class="token punctuation">(</span>program<span class="token punctuation">,</span> framgmentShader<span class="token punctuation">)</span>

  <span class="token comment">// 链接program</span>
  gl<span class="token punctuation">.</span><span class="token function">linkProgram</span><span class="token punctuation">(</span>program<span class="token punctuation">)</span>
  <span class="token comment">// 链接program</span>
  gl<span class="token punctuation">.</span><span class="token function">useProgram</span><span class="token punctuation">(</span>program<span class="token punctuation">)</span>

  <span class="token keyword">return</span> program
<span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><template><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;imports&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;@vueuse/core&quot;</span><span class="token operator">:</span> <span class="token string">&quot;https://unpkg.com/@vueuse/core/index.mjs&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;@vueuse/shared&quot;</span><span class="token operator">:</span> <span class="token string">&quot;https://unpkg.com/@vueuse/shared/index.mjs&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;vue-demi&quot;</span><span class="token operator">:</span> <span class="token string">&quot;https://unpkg.com/vue-demi/lib/index.mjs&quot;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><template><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;showCompileOutput&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>:::</p></template></template></template>`,3),o=[e];function c(l,i){return s(),a("div",null,o)}const k=n(p,[["render",c],["__file","point.html.vue"]]);export{k as default};
