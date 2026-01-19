<template><div><h1 id="ida使用笔记" tabindex="-1"><a class="header-anchor" href="#ida使用笔记"><span>IDA使用笔记</span></a></h1>
<h2 id="调试错误" tabindex="-1"><a class="header-anchor" href="#调试错误"><span>调试错误</span></a></h2>
<ul>
<li>Please run IDA with elevated permissions for local debugging. Another solution is to run mac_server and use localhost as the remote computer name.</li>
</ul>
<p>这个错误是因为IDA在本地调试时需要 elevated permissions（ elevated permissions 是指管理员权限），但是IDA在本地调试时默认是没有 elevated permissions 的，所以会报错。
解决办法有两种：</p>
<ol>
<li>运行IDA时使用 elevated permissions</li>
<li>使用MacOS/dbgsrv/mac_server_arm，将hostname名设置为localhost</li>
</ol>
</div></template>


