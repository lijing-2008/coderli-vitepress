import{_ as s,c as a,o as n,a as p}from"./app.0f34c101.js";const y=JSON.parse('{"title":"原理介绍","description":"","frontmatter":{"author":"coder-li","tags":"nginx/modules/ngx_http_gzip_module 内核优化","aliases":null},"headers":[],"relativePath":"backend/nginx/6.文件压缩模块.md"}'),l={name:"backend/nginx/6.文件压缩模块.md"},e=p(`<h1 id="原理介绍" tabindex="-1">原理介绍 <a class="header-anchor" href="#原理介绍" aria-hidden="true">#</a></h1><p>启动该模块，使文件传输前进行压缩，提升传输效率</p><h1 id="语法" tabindex="-1">语法 <a class="header-anchor" href="#语法" aria-hidden="true">#</a></h1><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#676E95;"># 默认 gzip off</span></span>
<span class="line"><span style="color:#676E95;"># Context:http,server,location</span></span>
<span class="line"><span style="color:#A6ACCD;">gzip on</span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;">off</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># 压缩级别（1-9）,默认 gzip_comp_level 1;</span></span>
<span class="line"><span style="color:#676E95;"># Context:http,server,location</span></span>
<span class="line"><span style="color:#A6ACCD;">gzip_comp_level level</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># 版本 默认 gzip_http_version 1.1</span></span>
<span class="line"><span style="color:#676E95;"># Context:http,server,location</span></span>
<span class="line"><span style="color:#A6ACCD;">gzip_http_version 1.0</span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;">1.1</span></span>
<span class="line"></span></code></pre></div><p>压缩级别越高，说明压缩的文件越小，但所需的时间也越长，这是一个矛盾的问题，选择合适的压缩级别</p><h1 id="测试" tabindex="-1">测试 <a class="header-anchor" href="#测试" aria-hidden="true">#</a></h1><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">http </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">	gzip on</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">    gzip_http_version 1.1</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">    gzip_comp_level 2</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">    gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;">#设置要压缩的文件类型</span></span>
<span class="line"><span style="color:#A6ACCD;">    gzip_static on</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;">#打开静态压缩</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p>准备1.html <img src="https://cdn.jsdelivr.net/gh/lijing-2008/PicGo/img/20220112213510.png" alt=""> 配置前查看网络访问结果为385k <img src="https://cdn.jsdelivr.net/gh/lijing-2008/PicGo/img/20220112213957.png" alt=""> 配置后查看网络访问结果为2.8k <img src="https://cdn.jsdelivr.net/gh/lijing-2008/PicGo/img/20220112213637.png" alt=""></p><blockquote><p>nginx的文件压缩不是万能的，不是什么都可以压</p></blockquote>`,9),t=[e];function o(c,i,r,_,d,h){return n(),a("div",null,t)}const D=s(l,[["render",o]]);export{y as __pageData,D as default};
