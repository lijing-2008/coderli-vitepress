import{_ as s,c as a,o as e,a as n}from"./app.67efe51d.js";const g=JSON.parse('{"title":"还没规划好","description":"","frontmatter":{},"headers":[{"level":2,"title":"一、REMOTE HOST IDENTIFICATION HAS CHANGED","slug":"一、remote-host-identification-has-changed","link":"#一、remote-host-identification-has-changed","children":[]}],"relativePath":"bug/服务器/1.SSH.md"}'),t={name:"bug/服务器/1.SSH.md"},o=n(`<h1 id="还没规划好" tabindex="-1">还没规划好 <a class="header-anchor" href="#还没规划好" aria-hidden="true">#</a></h1><p>先占个楼</p><h2 id="一、remote-host-identification-has-changed" tabindex="-1">一、REMOTE HOST IDENTIFICATION HAS CHANGED <a class="header-anchor" href="#一、remote-host-identification-has-changed" aria-hidden="true">#</a></h2><p>原因是第一次使用SSH连接时，会生成一个认证，储存在客户端的known_hosts中。 可使用以下指令查看：</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">ssh-keygen -l -f </span><span style="color:#89DDFF;">~</span><span style="color:#A6ACCD;">/.ssh/known_hosts</span></span>
<span class="line"></span></code></pre></div><p>由于服务器重新安装系统了，所以会出现以上错误。</p><p>解决方案：</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">ssh-keygen -R 服务器端的ip地址</span></span>
<span class="line"></span></code></pre></div><p>输入<code>yes</code></p>`,9),c=[o];function i(p,l,d,r,h,_){return e(),a("div",null,c)}const u=s(t,[["render",i]]);export{g as __pageData,u as default};
