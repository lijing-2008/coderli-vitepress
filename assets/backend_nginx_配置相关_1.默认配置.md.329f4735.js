import{_ as s,c as n,o as a,d as p}from"./app.86a3c011.js";const A=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"backend/nginx/配置相关/1.默认配置.md"}'),l={name:"backend/nginx/配置相关/1.默认配置.md"},o=p(`<p>nginx默认配置文件</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">server </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    listen       80</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;">#服务器端口号</span></span>
<span class="line"><span style="color:#A6ACCD;">    server_name  localhost</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;">#域名xxxx.com或者http://ip</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;">#access_log  /var/log/nginx/host.access.log  main; #日志路径，可以自定义</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    location / </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">        root   /usr/share/nginx/html</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;">#网站的根目录</span></span>
<span class="line"><span style="color:#A6ACCD;">        index  index.html index.htm</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;">#网站默认主页文件名</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;">#error_page  404              /404.html;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;"># redirect server error pages to the static page /50x.html</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;">#</span></span>
<span class="line"><span style="color:#A6ACCD;">    error_page   500 502 503 504  /50x.html</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">    location = /50x.html </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">        root   /usr/share/nginx/html</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;"># proxy the PHP scripts to Apache listening on 127.0.0.1:80</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;">#</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;">#location ~ \\.php$ {</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;">#    proxy_pass   http://127.0.0.1;</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;">#}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;"># pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;">#</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;">#location ~ \\.php$ {</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;">#    root           html;</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;">#    fastcgi_pass   127.0.0.1:9000;</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;">#    fastcgi_index  index.php;</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;">#    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;">#    include        fastcgi_params;</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;">#}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;"># deny access to .htaccess files, if Apache&#39;s document root</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;"># concurs with nginx&#39;s one</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;">#</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;">#location ~ /\\.ht {</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;">#    deny  all;</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;">#}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div>`,2),e=[o];function c(t,r,i,D,y,F){return a(),n("div",null,e)}const C=s(l,[["render",c]]);export{A as __pageData,C as default};
