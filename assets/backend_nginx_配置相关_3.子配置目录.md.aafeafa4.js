import{_ as s,c as n,o as a,a as l}from"./app.d167fe74.js";const C=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[{"level":2,"title":"子配置文件目录","slug":"子配置文件目录","link":"#子配置文件目录","children":[]},{"level":2,"title":"举个例子","slug":"举个例子","link":"#举个例子","children":[{"level":3,"title":"1.启动nginx容器","slug":"_1-启动nginx容器","link":"#_1-启动nginx容器","children":[]},{"level":3,"title":"2.修改配置文件","slug":"_2-修改配置文件","link":"#_2-修改配置文件","children":[]},{"level":3,"title":"3.配置网站文件","slug":"_3-配置网站文件","link":"#_3-配置网站文件","children":[]},{"level":3,"title":"4.重启nginx容器","slug":"_4-重启nginx容器","link":"#_4-重启nginx容器","children":[]},{"level":3,"title":"5.测试","slug":"_5-测试","link":"#_5-测试","children":[]},{"level":3,"title":"6.验证成功！","slug":"_6-验证成功","link":"#_6-验证成功","children":[]}]}],"relativePath":"backend/nginx/配置相关/3.子配置目录.md"}'),e={name:"backend/nginx/配置相关/3.子配置目录.md"},p=l(`<h2 id="子配置文件目录" tabindex="-1">子配置文件目录 <a class="header-anchor" href="#子配置文件目录" aria-hidden="true">#</a></h2><p>个人自定义的网站配置文件可以放在该目录下，命名为<code>xxx.conf</code></p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">server </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">	listen 80</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">	server_name xxxx.com</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">	location / </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">		root 网站根路径</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">		index 主页文件名</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">	error_page 404 /404.html</span></span>
<span class="line"><span style="color:#A6ACCD;">	location = /404.html </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">		root 404页面所在路径</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><h2 id="举个例子" tabindex="-1">举个例子 <a class="header-anchor" href="#举个例子" aria-hidden="true">#</a></h2><h3 id="_1-启动nginx容器" tabindex="-1">1.启动nginx容器 <a class="header-anchor" href="#_1-启动nginx容器" aria-hidden="true">#</a></h3><p>docker下启动nginx容器，将nginx配置及网站相关文件挂载出来，方便在宿主机内修改</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#676E95;"># 创建容器卷nginx01-config 用于同步配置文件</span></span>
<span class="line"><span style="color:#A6ACCD;">docker volume create nginx01-config</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># 启动容器 docker-nginx01下放置了index.html和404.html</span></span>
<span class="line"><span style="color:#A6ACCD;">docker run -d -P --name nginx01 -p 8001:80 -v nginx01-config:/etc/nginx -v /docker-nginx01:/usr/share/nginx/html nginx</span></span>
<span class="line"></span></code></pre></div><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#676E95;"># 查看具名挂载容器卷</span></span>
<span class="line"><span style="color:#A6ACCD;">docker volume inspect nignx01-config</span></span>
<span class="line"></span></code></pre></div><p><img src="https://cdn.jsdelivr.net/gh/lijing-2008/PicGo/img/20220111194855.png" alt=""></p><h3 id="_2-修改配置文件" tabindex="-1">2.修改配置文件 <a class="header-anchor" href="#_2-修改配置文件" aria-hidden="true">#</a></h3><p>进入配置文件挂载目录，新增自定义配置<code>lj.conf</code></p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#676E95;"># lj.conf</span></span>
<span class="line"><span style="color:#A6ACCD;">server </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">	listen 80</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">	server_name localhost</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">	location / </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">		root /usr/share/nginx/html</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">		index index.html</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">	error_page 404 /404.html</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">	location = /404.html </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">		root /usr/share/nginx/html</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><h3 id="_3-配置网站文件" tabindex="-1">3.配置网站文件 <a class="header-anchor" href="#_3-配置网站文件" aria-hidden="true">#</a></h3><p>宿主机内的网站文件目录包含<code>index.html</code>和<code>404.html</code>两个文件 <img src="https://cdn.jsdelivr.net/gh/lijing-2008/PicGo/img/20220111195322.png" alt=""></p><h3 id="_4-重启nginx容器" tabindex="-1">4.重启nginx容器 <a class="header-anchor" href="#_4-重启nginx容器" aria-hidden="true">#</a></h3><p>修改完配置文件之后需要重启nginx才能生效</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">docker start nginx01</span></span>
<span class="line"></span></code></pre></div><h3 id="_5-测试" tabindex="-1">5.测试 <a class="header-anchor" href="#_5-测试" aria-hidden="true">#</a></h3><p>通过nginx日志进行测试 首先要进入容器，监测日志，直接使用</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">docker attach nginx01</span></span>
<span class="line"></span></code></pre></div><p><img src="https://cdn.jsdelivr.net/gh/lijing-2008/PicGo/img/20220111200152.png" alt=""> 访问主页<code>index.html</code>成功，文件大小46字节，与宿主机内网站主页文件一致 访问<code>/hello.html</code>，找不到文件报错，返回404页面，文件大小2498字节，与宿主机内404文件大小一致</p><h3 id="_6-验证成功" tabindex="-1">6.验证成功！ <a class="header-anchor" href="#_6-验证成功" aria-hidden="true">#</a></h3>`,22),o=[p];function c(t,i,r,d,h,g){return a(),n("div",null,o)}const y=s(e,[["render",c]]);export{C as __pageData,y as default};
