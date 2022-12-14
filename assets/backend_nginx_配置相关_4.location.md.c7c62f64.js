import{_ as s,c as n,o as a,a as l}from"./app.67efe51d.js";const A=JSON.parse('{"title":"一、语法","description":"","frontmatter":{"author":"coder-li","tags":"nginx-location"},"headers":[],"relativePath":"backend/nginx/配置相关/4.location.md"}'),o={name:"backend/nginx/配置相关/4.location.md"},p=l(`<div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">http </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">  server </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">      listen 80</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">    	server_name www.xxx.com</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">    	location / </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">      	  root /share/nginx/html/</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">	      index index.html</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">    	</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><h1 id="一、语法" tabindex="-1">一、语法 <a class="header-anchor" href="#一、语法" aria-hidden="true">#</a></h1><p><img src="https://cdn.jsdelivr.net/gh/lijing-2008/PicGo/img/20220116172911.png" alt=""></p><ul><li><code>=</code>表示精确匹配<div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">location = /test </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">configration</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#676E95;"># /test ok</span></span>
<span class="line"><span style="color:#676E95;"># /test/ not ok</span></span>
<span class="line"><span style="color:#676E95;"># /test1/ not ok</span></span>
<span class="line"><span style="color:#676E95;"># /test/1 not ok</span></span>
<span class="line"></span></code></pre></div></li><li><code>~</code>表示区分大小写的正则匹配<div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">location </span><span style="color:#89DDFF;">~</span><span style="color:#A6ACCD;"> ^/test$ </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">configration</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#676E95;"># /test ok</span></span>
<span class="line"><span style="color:#676E95;"># /Test/ not ok</span></span>
<span class="line"><span style="color:#676E95;"># /test/ not ok</span></span>
<span class="line"><span style="color:#676E95;"># /test1 not ok</span></span>
<span class="line"></span></code></pre></div></li><li><code>~*</code>不区分大小写的正则匹配<div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">location </span><span style="color:#89DDFF;">~*</span><span style="color:#A6ACCD;"> ^/test$ </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">configration</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#676E95;"># /test ok</span></span>
<span class="line"><span style="color:#676E95;"># /Test ok</span></span>
<span class="line"><span style="color:#676E95;"># /test/ not ok</span></span>
<span class="line"><span style="color:#676E95;"># /test1 not ok</span></span>
<span class="line"></span></code></pre></div></li><li><code>^~</code>表示uri以某个字符串开头<div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">location ^~ /test/ </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">configration</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#676E95;"># /test ok</span></span>
<span class="line"><span style="color:#676E95;"># /test/1.html ok</span></span>
<span class="line"><span style="color:#676E95;"># /tes/ not ok</span></span>
<span class="line"></span></code></pre></div></li></ul><p>当不使用这些语法时，只写uri的时候，<code>/</code>表示通用匹配</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">location /test </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">configration</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#676E95;"># /test ok</span></span>
<span class="line"><span style="color:#676E95;"># /test/1.html ok</span></span>
<span class="line"><span style="color:#676E95;"># /test1/ ok</span></span>
<span class="line"></span></code></pre></div><h1 id="二、匹配顺序" tabindex="-1">二、匹配顺序 <a class="header-anchor" href="#二、匹配顺序" aria-hidden="true">#</a></h1><p><code>location</code>的定义分为两种，前缀字符串(prefix string)和正则表达式(regular expression)</p><ul><li>检查使用前缀字符串的 locations，在使用前缀字符串的 locations 中选择最长匹配的，并将结果进行储存</li><li>如果符合带有 <code>=</code> 修饰符的 URI，则立刻停止匹配</li><li>如果符合带有 <code>^~</code> 修饰符的 URI，则也立刻停止匹配。</li><li>然后按照定义文件的顺序，检查正则表达式，匹配到就停止</li><li>当正则表达式匹配不到的时候，使用之前储存的前缀字符串</li></ul><blockquote><ol><li>在顺序上，前缀字符串顺序不重要，按照匹配长度来确定，正则表达式则按照定义顺序。</li><li>在优先级上，<code>=</code> 修饰符最高，<code>^~</code> 次之，再者是正则，最后是前缀字符串匹配</li></ol></blockquote><h1 id="三、root和alias" tabindex="-1">三、root和alias <a class="header-anchor" href="#三、root和alias" aria-hidden="true">#</a></h1><p><code>root</code>使用的是拼接<code>root+location</code>，<code>alias</code>是用<code>alias</code>替换<code>location</code>，</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">location /test/ </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">	root /rootdir/</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#676E95;"># 当请求 /test/1.html的时候，/rootdir/test/1.html会返回</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">location /test1/{</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#82AAFF;">alias</span><span style="color:#A6ACCD;"> /aliasdir/</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#676E95;"># 当请求 /test1/2.html的时候，/rootdir/1.html会返回</span></span>
<span class="line"></span></code></pre></div><p>==root可能更好用==</p>`,14),e=[p];function t(c,i,r,d,D,y){return a(),n("div",null,e)}const F=s(o,[["render",t]]);export{A as __pageData,F as default};
