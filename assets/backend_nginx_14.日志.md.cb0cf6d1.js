import{_ as s,c as a,o as n,a as e}from"./app.0f34c101.js";const C=JSON.parse('{"title":"","description":"","frontmatter":{"tags":"nginx日志"},"headers":[{"level":2,"title":"nginx日志","slug":"nginx日志","link":"#nginx日志","children":[{"level":3,"title":"一、日志配置","slug":"一、日志配置","link":"#一、日志配置","children":[]},{"level":3,"title":"二、日志轮转","slug":"二、日志轮转","link":"#二、日志轮转","children":[]},{"level":3,"title":"三、日志分析","slug":"三、日志分析","link":"#三、日志分析","children":[]}]}],"relativePath":"backend/nginx/14.日志.md"}'),l={name:"backend/nginx/14.日志.md"},o=e(`<h2 id="nginx日志" tabindex="-1">nginx日志 <a class="header-anchor" href="#nginx日志" aria-hidden="true">#</a></h2><h3 id="一、日志配置" tabindex="-1">一、日志配置 <a class="header-anchor" href="#一、日志配置" aria-hidden="true">#</a></h3><p>位于主配置文件中 [[nginx主配置文件#③ HTTP模块]]</p><h4 id="_1-错误日志" tabindex="-1">1.错误日志 <a class="header-anchor" href="#_1-错误日志" aria-hidden="true">#</a></h4><p>===路径：===<code>/var/log/nginx/error.log</code><code>error_log</code> ![[nginx主配置文件#① 核心模块]]</p><h4 id="_2-访问日志" tabindex="-1">2.访问日志 <a class="header-anchor" href="#_2-访问日志" aria-hidden="true">#</a></h4><p>===路径：===<code>/var/log/nginx/access.log</code> ![[nginx主配置文件#③ HTTP模块]]</p><h4 id="_3-日志格式" tabindex="-1">3.日志格式 <a class="header-anchor" href="#_3-日志格式" aria-hidden="true">#</a></h4><p>通过<code>log_format</code>进行配置 日志输出路径为<code>/var/log/nginx/access.log</code></p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#676E95;">#这是上面默认配置下的日志输出例子</span></span>
<span class="line"><span style="color:#A6ACCD;">106.57.86.120 - - </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">11/Jan/2022:05:18:56 +0000</span><span style="color:#89DDFF;">]</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">GET / HTTP/1.1</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> 200 615 </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">-</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36 Edg/92.0.902.55</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">-</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"></span></code></pre></div><ul><li><code>$remote_addr</code>--远程地址，指的是客户端的ip地址，对应<code>106.57.86.120</code></li><li><code>$remote_user</code>--远程用户，这里是匿名访问，默认一个占位符，对应<code>-</code></li><li><code>$time_local</code>--本地时间，服务器本地时间，对应<code>11/Jan/2022:05:18:56 +0000</code></li><li><code>$request</code>--请求，用户请求的内容，对应<code>GET / HTTP/1.1</code>，Get后面<code>/</code>表示的是根目录默认主页index.html，如果是<code>/1.html</code>则表示请求的是根目录下的<code>1.html</code></li><li><code>$status</code>--[[HTTP状态码]]，对应<code>200</code></li><li><code>$body_bytes_sent</code>--文件大小(多少字节)，对应<code>615</code></li><li><code>$http_referer</code>--网站引用链接点，超链接，代表的是来到当前服务器的上一个跳转点，如果没有则为<code>-</code><img src="https://cdn.jsdelivr.net/gh/lijing-2008/PicGo/img/20220111135315.png" alt="|500"></li><li><code>$http_user_agent</code>--记录用户的浏览器，对应<code>&quot;Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36 Edg/92.0.902.55&quot;</code></li><li><code>$http_x_forwarded_for</code>--代理IP，此处没有配置代理，对应<code>-</code></li></ul><h4 id="_4-日志缓存" tabindex="-1">4.日志缓存 <a class="header-anchor" href="#_4-日志缓存" aria-hidden="true">#</a></h4><p>大量访问到来时，对于每一条记录都将是先打开文件再写入日志，然后关闭，占用了系统资源，与业务无关。可以使用<code>open_log_file_cache</code>来设置，设置在server块中。</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#676E95;"># 缓存最多1000个，到了极限每分钟开始清除，20s内小于3次访问的。即检查周期为1m(1分钟)</span></span>
<span class="line"><span style="color:#A6ACCD;">open_log_file_cache max=1000 inactive=20s min_uses=3 valid=1m</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span></code></pre></div><p>===默认关闭，官方也不建议打开===</p><h3 id="二、日志轮转" tabindex="-1">二、日志轮转 <a class="header-anchor" href="#二、日志轮转" aria-hidden="true">#</a></h3><p>===目录：=== <code>etc/logrotate.d/nginx</code></p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">/var/log/nginx/</span><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;">.log </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;">#针对哪个日志进行轮转</span></span>
<span class="line"><span style="color:#A6ACCD;">        daily  </span><span style="color:#676E95;">#轮转周期，以天为单位</span></span>
<span class="line"><span style="color:#A6ACCD;">        missingok  </span><span style="color:#676E95;">#丢失不提示，这个文件丢了不提示</span></span>
<span class="line"><span style="color:#A6ACCD;">        rotate 52  </span><span style="color:#676E95;">#保留52份，这里就是保留52天</span></span>
<span class="line"><span style="color:#A6ACCD;">        compress   </span><span style="color:#676E95;">#压缩</span></span>
<span class="line"><span style="color:#A6ACCD;">        delaycompress  </span><span style="color:#676E95;">#延迟压缩</span></span>
<span class="line"><span style="color:#A6ACCD;">        notifempty  </span><span style="color:#676E95;">#空文件的话不转存</span></span>
<span class="line"><span style="color:#A6ACCD;">        create 640 nginx adm  </span><span style="color:#676E95;">#权限相关</span></span>
<span class="line"><span style="color:#A6ACCD;">        sharedscripts</span></span>
<span class="line"><span style="color:#A6ACCD;">        postrotate  </span><span style="color:#676E95;">#重启脚本</span></span>
<span class="line"><span style="color:#A6ACCD;">                </span><span style="color:#89DDFF;">if</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">-f</span><span style="color:#A6ACCD;"> /var/run/nginx.pid </span><span style="color:#89DDFF;">];</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">then</span></span>
<span class="line"><span style="color:#A6ACCD;">                        </span><span style="color:#82AAFF;">kill</span><span style="color:#A6ACCD;"> -USR1 </span><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;">cat /var/run/nginx.pid</span><span style="color:#89DDFF;">\`</span></span>
<span class="line"><span style="color:#A6ACCD;">                </span><span style="color:#89DDFF;">fi</span></span>
<span class="line"><span style="color:#A6ACCD;">        endscript</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><h3 id="三、日志分析" tabindex="-1">三、日志分析 <a class="header-anchor" href="#三、日志分析" aria-hidden="true">#</a></h3><p>以后搞运维的时候需要进一步学习 <a href="https://developer.aliyun.com/article/90906" target="_blank" rel="noreferrer">10分钟精通Nginx访问日志分析统计-阿里云开发者社区 (aliyun.com)</a></p>`,20),p=[o];function c(t,r,i,d,h,y){return n(),a("div",null,p)}const _=s(l,[["render",c]]);export{C as __pageData,_ as default};
