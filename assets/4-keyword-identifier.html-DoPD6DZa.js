import{_ as d}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as r,c as e,e as h}from"./app-rkgOiK7U.js";const a={};function o(n,t){return r(),e("div",null,t[0]||(t[0]=[h('<h2 id="标识符规范" tabindex="-1"><a class="header-anchor" href="#标识符规范" aria-hidden="true">#</a> 标识符规范</h2><p>go语言中的标识符严格区分大小写。标识符中只能使用字母、数字和下划线，并且不能以数字开头。关键字与预定义标识符`不能作为标识符使用。</p><p>go语言中常用的标识符的命名规范：</p><table><thead><tr><th>场景</th><th>命名规范</th><th>示例</th></tr></thead><tbody><tr><td>项目名</td><td>全部小写字母，中横线隔开</td><td>hello-world</td></tr><tr><td>包名</td><td>包名与目录名保持一致, 全部小写, 简单明了<br> 不能使用下划线, 不能用<code>标准库</code>名称</td><td>calculator</td></tr><tr><td>模块名</td><td>小写蛇形命名法</td><td>user_info.go</td></tr><tr><td>常量</td><td>大写蛇形命名法</td><td>HTTP_PORT</td></tr><tr><td>变量/函数/结构体</td><td>驼峰命名法, 严格区分大小写</td><td>userName/UserName</td></tr><tr><td>接口</td><td>驼峰命名法 + er后缀</td><td>Reader</td></tr></tbody></table><p>在go语言中需要暴露到包外使用的标识符都必须以大写字母开头，不需要暴露的标识符都应以小写字母开头。</p><h2 id="关键字与预定义标识符" tabindex="-1"><a class="header-anchor" href="#关键字与预定义标识符" aria-hidden="true">#</a> 关键字与预定义标识符</h2><p>Go 语言中有 25 个关键字</p><table><thead><tr><th>关键字</th><th>作用</th><th>关键字</th><th>作用</th><th>关键字</th><th>作用</th><th>关键字</th><th>作用</th><th>关键字</th><th>作用</th></tr></thead><tbody><tr><td>var</td><td>声明变量</td><td>func</td><td>声明函数</td><td>const</td><td>声明常量</td><td>import</td><td>导入包</td><td>package</td><td>声明包</td></tr><tr><td>if</td><td>条件语句</td><td>else</td><td>条件语句</td><td>switch</td><td>条件语句</td><td>case</td><td>条件语句</td><td>default</td><td>默认条件语句</td></tr><tr><td>for</td><td>循环语句</td><td>break</td><td>循环语句</td><td>continue</td><td>循环语句</td><td>range</td><td>遍历</td><td>defer</td><td>延迟执行</td></tr><tr><td>return</td><td>返回值</td><td>type</td><td>声明类型</td><td>struct</td><td>声明结构体</td><td>interface</td><td>声明接口</td><td>map</td><td>声明映射</td></tr><tr><td>chan</td><td>声明通道</td><td>goto</td><td>跳转语句</td><td>select</td><td>选择语句</td><td>go</td><td>并发执行</td><td>fallthrough</td><td>跳过本次分支</td></tr></tbody></table><p>除了以上介绍的这些关键字，Go 语言还有 36 个预定义标识符，其中包含了基本类型的名称和一些基本的内置函数</p><table><thead><tr><th>标识符</th><th>作用</th><th>标识符</th><th>作用</th><th>标识符</th><th>作用</th><th>标识符</th><th>作用</th><th>标识符</th><th>作用</th><th>标识符</th><th>作用</th></tr></thead><tbody><tr><td>append</td><td>向切片追加元素</td><td>bool</td><td>布尔类型</td><td>byte</td><td>无符号8位整数</td><td>cap</td><td>返回切片、映射、通道的容量</td><td>close</td><td>关闭通道</td><td>complex</td><td>复数</td></tr><tr><td>complex64</td><td>64位复杂数</td><td>complex128</td><td>128位复杂数</td><td>uint16</td><td>无符号16位整数</td><td>copy</td><td>复制切片或数组</td><td>false</td><td>布尔值(假)</td><td>float32</td><td>32位浮点数</td></tr><tr><td>float64</td><td>64位浮点数</td><td>imag</td><td>返回复数的虚部</td><td>int</td><td>有符号32位整数</td><td>int8</td><td>有符号8位整数</td><td>int16</td><td>有符号16位整数</td><td>uint32</td><td>无符号32位整数</td></tr><tr><td>int32</td><td>有符号32位整数</td><td>int64</td><td>有符号64位整数</td><td>iota</td><td>常量生成器</td><td>len</td><td>返回切片、字符串、数组的长度</td><td>make</td><td>创建切片、映射或通道</td><td>new</td><td>分配内存并返回指向新分配的零值的指针</td></tr><tr><td>nil</td><td>空值</td><td>panic</td><td>引发运行时错误</td><td>uint64</td><td>无符号64位整数</td><td>print</td><td>打印到标准输出</td><td>println</td><td>打印到标准输出并换行</td><td>real</td><td>返回复数的实部</td></tr><tr><td>recover</td><td>从panic中恢复</td><td>string</td><td>字符串</td><td>true</td><td>布尔值真</td><td>uint</td><td>无符号整数（平台相关位数）</td><td>uint8</td><td>无符号8位整数</td><td>uintptr</td><td>无符号整数，用作指针的底层类型</td></tr></tbody></table>',10)]))}const c=d(a,[["render",o],["__file","4-keyword-identifier.html.vue"]]);export{c as default};
