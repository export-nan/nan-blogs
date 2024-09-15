import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as s,c as n,e as i}from"./app-rkgOiK7U.js";const l={};function d(c,a){return s(),n("div",null,a[0]||(a[0]=[i(`<h2 id="常用命令" tabindex="-1"><a class="header-anchor" href="#常用命令" aria-hidden="true">#</a> 常用命令</h2><ul><li>编译并生成可执行文件</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>  go build main.go
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>编译为（二进制）并运行</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>  go run main.go
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>管理依赖</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>  go mod init <span class="token operator">&lt;</span>project name<span class="token operator">&gt;</span> <span class="token comment"># 初始化项目: 创建go.mod文件 (包管理工具)</span>
  go mod tidy <span class="token comment"># 整理依赖: 添加缺失的模块并删除无用的模块</span>
  go mod download <span class="token comment"># 下载依赖包到本地</span>
  go mod verify <span class="token comment"># 验证依赖是否正确</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>下载并安装依赖依赖</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>  go get <span class="token parameter variable">-u</span> github.com/gin-gonic/gin <span class="token comment"># 下载依赖</span>
  go get <span class="token parameter variable">-u</span> github.com/gin-gonic/gin@v1.7.4 <span class="token comment"># 下载指定版本的依赖</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>编译与安装包</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>  go <span class="token function">install</span> github.com/gin-gonic/gin <span class="token comment"># 编译并安装包</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>删除源码包和管理源码包里编译生成的文件</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>  go clean <span class="token parameter variable">-modcache</span> <span class="token comment"># 删除源码包</span>
  go clean <span class="token parameter variable">-i</span> <span class="token comment"># 删除管理源码包里编译生成的文件</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>查看 go 的环境变量</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>  go <span class="token function">env</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>格式化代码</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>  go <span class="token function">fmt</span> main.go
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>查看Go的当前版本</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>  go version
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>查看Go工具</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>  go tool
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>查看包的文档</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>  go doc <span class="token function">fmt</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,23)]))}const u=e(l,[["render",d],["__file","2-command.html.vue"]]);export{u as default};
