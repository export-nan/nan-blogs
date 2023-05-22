import{_ as t,W as l,X as o,Z as s,$ as a,a0 as i,a1 as n,G as p}from"./framework-51d990c7.js";const r={},c=n('<h1 id="安装与环境配置" tabindex="-1"><a class="header-anchor" href="#安装与环境配置" aria-hidden="true">#</a> 安装与环境配置</h1><h2 id="sdk-下载" tabindex="-1"><a class="header-anchor" href="#sdk-下载" aria-hidden="true">#</a> SDK 下载</h2><div class="hint-container tip"><p class="hint-container-title">SDK</p><p>全称为Software Development Kit软件开发工具，提供给开发用的，其中包含了开发对应语言的工具包</p></div><p>Golang 的官网下载地址为：<a href="golang.org">golang.org</a>，需要翻墙</p>',4),d={href:"https://studygolang.com/dl",target:"_blank",rel:"noopener noreferrer"},v=n(`<div class="hint-container warning"><p class="hint-container-title">注意 安装时的安装地址不要出现中文、特殊字符空格等</p></div><h2 id="环境搭建" tabindex="-1"><a class="header-anchor" href="#环境搭建" aria-hidden="true">#</a> 环境搭建</h2><p>安装完成之后运行</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ go version
<span class="token comment"># 如果出现\`go version go1.8.1 darwin/amd64\` 则证明安装完成</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>检查家目录下是否有<code>.bash_profile</code>如果没有，就新建一个，然后写入</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>
<span class="token comment"># GOBIN指向SDK的根目录</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">GOROOT</span><span class="token operator">=</span>/usr/local/go
<span class="token comment"># GOPATH指向我们的工作目录</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">GOPATH</span><span class="token operator">=</span>/Users/nan/code/go
<span class="token builtin class-name">export</span> <span class="token assign-left variable"><span class="token environment constant">PATH</span></span><span class="token operator">=</span><span class="token environment constant">$PATH</span><span class="token builtin class-name">:</span><span class="token variable">$GOROOT</span>/bin:<span class="token variable">$GOPATH</span>/bin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>更新环境变量</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">source</span> ~/.bash_profile
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这时在执行<code>go version</code>应该就能看见版本信息了</p><h2 id="重要的环境变量" tabindex="-1"><a class="header-anchor" href="#重要的环境变量" aria-hidden="true">#</a> 重要的环境变量</h2><p>Go通过环境变量来做项目上的管理和控制，通过命令go env可以查看相关变量：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ go <span class="token function">env</span>
<span class="token comment"># 启用go module管理项目，需要有go.mod和go.sum文件；</span>
<span class="token assign-left variable">GO111MODULE</span><span class="token operator">=</span><span class="token string">&quot;&quot;</span>
<span class="token assign-left variable">GOARCH</span><span class="token operator">=</span><span class="token string">&quot;arm64&quot;</span>
<span class="token assign-left variable">GOBIN</span><span class="token operator">=</span><span class="token string">&quot;/bin&quot;</span>
<span class="token assign-left variable">GOCACHE</span><span class="token operator">=</span><span class="token string">&quot;/Users/nan/Library/Caches/go-build&quot;</span>
<span class="token assign-left variable">GOENV</span><span class="token operator">=</span><span class="token string">&quot;/Users/nan/Library/Application Support/go/env&quot;</span>
<span class="token assign-left variable">GOEXE</span><span class="token operator">=</span><span class="token string">&quot;&quot;</span>
<span class="token assign-left variable">GOEXPERIMENT</span><span class="token operator">=</span><span class="token string">&quot;&quot;</span>
<span class="token assign-left variable">GOFLAGS</span><span class="token operator">=</span><span class="token string">&quot;&quot;</span>
<span class="token assign-left variable">GOHOSTARCH</span><span class="token operator">=</span><span class="token string">&quot;arm64&quot;</span>
<span class="token assign-left variable">GOHOSTOS</span><span class="token operator">=</span><span class="token string">&quot;darwin&quot;</span>
<span class="token assign-left variable">GOINSECURE</span><span class="token operator">=</span><span class="token string">&quot;&quot;</span>
<span class="token assign-left variable">GOMODCACHE</span><span class="token operator">=</span><span class="token string">&quot;/Users/nan/code/go/pkg/mod&quot;</span>
<span class="token assign-left variable">GONOPROXY</span><span class="token operator">=</span><span class="token string">&quot;&quot;</span>
<span class="token assign-left variable">GONOSUMDB</span><span class="token operator">=</span><span class="token string">&quot;&quot;</span>
<span class="token assign-left variable">GOOS</span><span class="token operator">=</span><span class="token string">&quot;darwin&quot;</span>
<span class="token comment"># 工作目录并不是项目所有目录，编译后的二进制文件存放地，import包的搜索路径，主要包含bin、pkg、src；</span>
<span class="token assign-left variable">GOPATH</span><span class="token operator">=</span><span class="token string">&quot;/Users/nan/code/go&quot;</span>
<span class="token assign-left variable">GOPRIVATE</span><span class="token operator">=</span><span class="token string">&quot;&quot;</span>
<span class="token comment"># 下载依赖时的代理，必须配置，不然无法成功下载；</span>
<span class="token assign-left variable">GOPROXY</span><span class="token operator">=</span><span class="token string">&quot;https://proxy.golang.org,direct&quot;</span>
<span class="token comment"># Go的安装目录，即可执行文件所在的目录；</span>
<span class="token assign-left variable">GOROOT</span><span class="token operator">=</span><span class="token string">&quot;/usr/local/go&quot;</span>
<span class="token assign-left variable">GOSUMDB</span><span class="token operator">=</span><span class="token string">&quot;sum.golang.org&quot;</span>
<span class="token assign-left variable">GOTMPDIR</span><span class="token operator">=</span><span class="token string">&quot;&quot;</span>
<span class="token assign-left variable">GOTOOLDIR</span><span class="token operator">=</span><span class="token string">&quot;/usr/local/go/pkg/tool/darwin_arm64&quot;</span>
<span class="token assign-left variable">GOVCS</span><span class="token operator">=</span><span class="token string">&quot;&quot;</span>
<span class="token assign-left variable">GOVERSION</span><span class="token operator">=</span><span class="token string">&quot;go1.20.1&quot;</span>
<span class="token assign-left variable">GCCGO</span><span class="token operator">=</span><span class="token string">&quot;gccgo&quot;</span>
<span class="token assign-left variable">AR</span><span class="token operator">=</span><span class="token string">&quot;ar&quot;</span>
<span class="token assign-left variable">CC</span><span class="token operator">=</span><span class="token string">&quot;clang&quot;</span>
<span class="token assign-left variable">CXX</span><span class="token operator">=</span><span class="token string">&quot;clang++&quot;</span>
<span class="token assign-left variable">CGO_ENABLED</span><span class="token operator">=</span><span class="token string">&quot;1&quot;</span>
<span class="token assign-left variable">GOMOD</span><span class="token operator">=</span><span class="token string">&quot;/usr/local/go/src/go.mod&quot;</span>
<span class="token assign-left variable">GOWORK</span><span class="token operator">=</span><span class="token string">&quot;&quot;</span>
<span class="token assign-left variable">CGO_CFLAGS</span><span class="token operator">=</span><span class="token string">&quot;-O2 -g&quot;</span>
<span class="token assign-left variable">CGO_CPPFLAGS</span><span class="token operator">=</span><span class="token string">&quot;&quot;</span>
<span class="token assign-left variable">CGO_CXXFLAGS</span><span class="token operator">=</span><span class="token string">&quot;-O2 -g&quot;</span>
<span class="token assign-left variable">CGO_FFLAGS</span><span class="token operator">=</span><span class="token string">&quot;-O2 -g&quot;</span>
<span class="token assign-left variable">CGO_LDFLAGS</span><span class="token operator">=</span><span class="token string">&quot;-O2 -g&quot;</span>
<span class="token assign-left variable">PKG_CONFIG</span><span class="token operator">=</span><span class="token string">&quot;pkg-config&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="dos-命令" tabindex="-1"><a class="header-anchor" href="#dos-命令" aria-hidden="true">#</a> DOS 命令</h2><ul><li>go 指令用于构建编译我们的代码</li><li>gofw</li><li>ldd 可查看可执行文件的依赖库</li></ul><h2 id="常用的代理有" tabindex="-1"><a class="header-anchor" href="#常用的代理有" aria-hidden="true">#</a> 常用的代理有</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 1. 七牛 CDN</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">GOPROXY</span><span class="token operator">=</span>https://goproxy.cn,direct
<span class="token comment"># 2. 阿里云</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">GOPROXY</span><span class="token operator">=</span>https://mirrors.aliyun.com/goproxy/,direct
<span class="token comment"># 3. 官方</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">GOPROXY</span><span class="token operator">=</span>https://goproxy.io,direct
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,16);function u(g,k){const e=p("ExternalLinkIcon");return l(),o("div",null,[c,s("p",null,[a("Golang 中文社区下载地址为："),s("a",d,[a("https://studygolang.com/dl"),i(e)])]),v])}const m=t(r,[["render",u],["__file","env.html.vue"]]);export{m as default};
