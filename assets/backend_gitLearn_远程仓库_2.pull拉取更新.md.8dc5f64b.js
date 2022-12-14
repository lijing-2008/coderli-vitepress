import{_ as s,c as a,o as l,d as n}from"./app.dd808e9e.js";const C=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"backend/gitLearn/远程仓库/2.pull拉取更新.md"}'),o={name:"backend/gitLearn/远程仓库/2.pull拉取更新.md"},e=n(`<p>拉取远程主机某个分支的更新，再与本地的指定分支合并。</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">git pull </span><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;">远程主机名</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;">远程分支名</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">:</span><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;">本地分支名</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre></div><ol><li>拉取 origin 主机的 ask 分支与本地的 main 分支合并 <code>git pull origin ask:main</code></li><li>拉取 origin 主机的 ask 分支与当前分支合并 <code>git pull origin ask</code></li><li>如果远程分支与当前本地分支同名直接执行 <code>git pull</code></li></ol>`,3),t=[e];function p(c,i,r,_,d,D){return l(),a("div",null,t)}const u=s(o,[["render",p]]);export{C as __pageData,u as default};
