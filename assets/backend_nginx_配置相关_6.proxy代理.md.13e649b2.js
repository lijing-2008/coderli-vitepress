import{_ as s,c as n,o as a,a as p}from"./app.00a37feb.js";const A=JSON.parse('{"title":"","description":"","frontmatter":{"author":"coder-li","tags":"nginx/modules/ngx_http_proxy_mudule","aliases":"nginx反向代理"},"headers":[],"relativePath":"backend/nginx/配置相关/6.proxy代理.md"}'),l={name:"backend/nginx/配置相关/6.proxy代理.md"},o=p(`<div class="language-txt"><button title="Copy Code" class="copy"></button><span class="lang">txt</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;"># URL指向的是真正的业务服务器</span></span>
<span class="line"><span style="color:#A6ACCD;">Syntax:	    proxy_pass URL;</span></span>
<span class="line"><span style="color:#A6ACCD;">Default:	—</span></span>
<span class="line"><span style="color:#A6ACCD;">Context:    location, if in location, limit_except</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><div class="language-zsh"><button title="Copy Code" class="copy"></button><span class="lang">zsh</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">location /{</span></span>
<span class="line"><span style="color:#A6ACCD;">	proxy_pass http://www.baidu.com</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">	proxy_redirect default</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">	proxy_set_header Host </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">proxy_host</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">	proxy_set_header X-Real-IP </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">remote_addr</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">	proxy_set_header X-Forwarded-For </span><span style="color:#89DDFF;">\`$</span><span style="color:#A6ACCD;">proxy_add_x_forwarded_for</span><span style="color:#89DDFF;">\`</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">	proxy_connect_timeout 30s</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">	proxy_send_timeout 60s</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">	proxy_read_timeout 60s</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">	proxy_buffering on</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">	proxy_buffer_size 32k</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">	proxy_buffers 8 128k</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">	proxy_busy_buffers_size 256k</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">	proxy_max_temp_file_size 256k</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"></span></code></pre></div>`,2),e=[o];function t(c,r,i,y,_,D){return a(),n("div",null,e)}const d=s(l,[["render",t]]);export{A as __pageData,d as default};
