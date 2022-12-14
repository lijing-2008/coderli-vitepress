import{_ as s,c as n,o as a,a as l}from"./app.67efe51d.js";const F=JSON.parse('{"title":"","description":"","frontmatter":{"author":"coder-li","tags":"nginx随机主页模块 nginx/modules/random_index_module","aliases":"随机主页"},"headers":[],"relativePath":"backend/nginx/基础知识/2.随机主页模块.md"}'),p={name:"backend/nginx/基础知识/2.随机主页模块.md"},o=l(`<p>通过设置server块中的主页location配置</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#676E95;">#lj.conf</span></span>
<span class="line"><span style="color:#A6ACCD;">server </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">	listen 80</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">	server_name localhost</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">	location / </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">		root /usr/share/nginx/html</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">		</span><span style="color:#676E95;">#index index.html;</span></span>
<span class="line"><span style="color:#A6ACCD;">		random_index on</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">	location /nginx_status </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">		stub_status</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">		allow all</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">	error_page 404 /404.html</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">	location = /404.html </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">		root /usr/share/nginx/html</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p>如上，将index配置行注释，新增<code>random_index on</code>，代表的是主页为<code>/usr/share/nginx/html</code>路径下的一个随机html文件</p><p>===注意=== 隐藏的html文件不会被随机到，如<code>.xxx.html</code>，以<code>.</code>开头的文件</p>`,4),e=[o];function t(c,r,i,D,_,d){return a(),n("div",null,e)}const C=s(p,[["render",t]]);export{F as __pageData,C as default};
