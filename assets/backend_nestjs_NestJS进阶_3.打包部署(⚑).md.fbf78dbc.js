import{_ as s,c as n,o as a,d as p}from"./app.dd808e9e.js";const m=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[{"level":2,"title":"一、坎坷旅途","slug":"一、坎坷旅途","link":"#一、坎坷旅途","children":[{"level":3,"title":"1. 普通的build不会打包依赖","slug":"_1-普通的build不会打包依赖","link":"#_1-普通的build不会打包依赖","children":[]},{"level":3,"title":"2. 项目目录下直接使用node运行main.js","slug":"_2-项目目录下直接使用node运行main-js","link":"#_2-项目目录下直接使用node运行main-js","children":[]},{"level":3,"title":"3. 拷贝到其他目录单独执行","slug":"_3-拷贝到其他目录单独执行","link":"#_3-拷贝到其他目录单独执行","children":[]}]},{"level":2,"title":"二、总结","slug":"二、总结","link":"#二、总结","children":[]},{"level":2,"title":"三、其它补充","slug":"三、其它补充","link":"#三、其它补充","children":[{"level":3,"title":"1. docker容器部署","slug":"_1-docker容器部署","link":"#_1-docker容器部署","children":[]},{"level":3,"title":"2. pkg打包","slug":"_2-pkg打包","link":"#_2-pkg打包","children":[]}]}],"relativePath":"backend/nestjs/NestJS进阶/3.打包部署(⚑).md"}'),e={name:"backend/nestjs/NestJS进阶/3.打包部署(⚑).md"},l=p(`<p>最近学习Nestjs的时候做了一个项目，整合了Typescript+Prisma+MySQL，开发时跑的好好的，没有任何问题，后来想打包部署试一试，中途遇到到了很多问题，也在网上查阅了很多资料，我试了很多办法，包括pkg打包(还没有成功)、docker容器部署等，可行的还是有几个，但是一直不是我要的，不过经过不懈的研究努力，我终于还是达到了自己的目的！</p><blockquote><p>前情提要，需要大家使用过prisma，知道怎么在nestjs中集成prisma，默认的集成非常简单，可以查看官网说明。<a href="https://docs.nestjs.com/recipes/prisma" target="_blank" rel="noreferrer">Prisma | NestJS - A progressive Node.js framework</a></p></blockquote><h2 id="一、坎坷旅途" tabindex="-1">一、坎坷旅途 <a class="header-anchor" href="#一、坎坷旅途" aria-hidden="true">#</a></h2><h3 id="_1-普通的build不会打包依赖" tabindex="-1">1. 普通的build不会打包依赖 <a class="header-anchor" href="#_1-普通的build不会打包依赖" aria-hidden="true">#</a></h3><p>这里我参阅了掘金另一位大佬的文章，具体里面的细节文章讲的很清楚，想了解学习的可前往<a href="https://juejin.cn/post/7065724860688760862" target="_blank" rel="noreferrer">https://juejin.cn/post/7065724860688760862</a></p><p>简单来说，使用nest build命令进行打包，默认是不会将依赖打包进去的，需要将整个项目拷贝到服务器上才行，如果环境不一样，可能需要重新安装依赖，在服务器上安装node_modules真是太占用资源了！根据前面大佬的文章，我开始研究了webpack模式打包，按照大佬的步骤一步一步走，</p><p>nest build通过webpack-node-externals插件默认屏蔽了依赖的打包，我们手动配置externals为空，让node_modules依赖也参加打包，配置webpack.config.js文件如下(直接拷贝的大佬配置)，</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">/* eslint-disable @typescript-eslint/no-var-requires */</span></span>
<span class="line"><span style="color:#A6ACCD;">const path = require(&#39;path&#39;);</span></span>
<span class="line"><span style="color:#A6ACCD;">const webpack = require(&#39;webpack&#39;);</span></span>
<span class="line"><span style="color:#A6ACCD;">const ForkTsCheckerWebpackPlugin = require(&#39;fork-ts-checker-webpack-plugin&#39;);</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">console.log(&#39;start build&#39;);</span></span>
<span class="line"><span style="color:#A6ACCD;">module.exports = {</span></span>
<span class="line"><span style="color:#A6ACCD;">  mode: &#39;production&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">  entry: &#39;./src/main&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">  target: &#39;node&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">  externals: {},</span></span>
<span class="line"><span style="color:#A6ACCD;">  module: {</span></span>
<span class="line"><span style="color:#A6ACCD;">    rules: [</span></span>
<span class="line"><span style="color:#A6ACCD;">      {</span></span>
<span class="line"><span style="color:#A6ACCD;">        test: /.ts?$/,</span></span>
<span class="line"><span style="color:#A6ACCD;">        use: {</span></span>
<span class="line"><span style="color:#A6ACCD;">          loader: &#39;ts-loader&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">          options: { transpileOnly: true },</span></span>
<span class="line"><span style="color:#A6ACCD;">        },</span></span>
<span class="line"><span style="color:#A6ACCD;">        exclude: /node_modules/,</span></span>
<span class="line"><span style="color:#A6ACCD;">      },</span></span>
<span class="line"><span style="color:#A6ACCD;">    ],</span></span>
<span class="line"><span style="color:#A6ACCD;">  },</span></span>
<span class="line"><span style="color:#A6ACCD;">  output: {</span></span>
<span class="line"><span style="color:#A6ACCD;">    filename: &#39;[name].js&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    path: path.resolve(__dirname, &#39;dist&#39;),</span></span>
<span class="line"><span style="color:#A6ACCD;">  },</span></span>
<span class="line"><span style="color:#A6ACCD;">  resolve: {</span></span>
<span class="line"><span style="color:#A6ACCD;">    extensions: [&#39;.js&#39;, &#39;.ts&#39;, &#39;.json&#39;],</span></span>
<span class="line"><span style="color:#A6ACCD;">  },</span></span>
<span class="line"><span style="color:#A6ACCD;">  plugins: [</span></span>
<span class="line"><span style="color:#A6ACCD;">    new webpack.IgnorePlugin({</span></span>
<span class="line"><span style="color:#A6ACCD;">      checkResource(resource) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        const lazyImports = [</span></span>
<span class="line"><span style="color:#A6ACCD;">          &#39;@nestjs/microservices&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">          &#39;@nestjs/microservices/microservices-module&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">          &#39;cache-manager&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">          &#39;class-validator&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">          &#39;class-transformer&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">        ];</span></span>
<span class="line"><span style="color:#A6ACCD;">        if (!lazyImports.includes(resource)) {</span></span>
<span class="line"><span style="color:#A6ACCD;">          return false;</span></span>
<span class="line"><span style="color:#A6ACCD;">        }</span></span>
<span class="line"><span style="color:#A6ACCD;">        try {</span></span>
<span class="line"><span style="color:#A6ACCD;">          require.resolve(resource, {</span></span>
<span class="line"><span style="color:#A6ACCD;">            paths: [process.cwd()],</span></span>
<span class="line"><span style="color:#A6ACCD;">          });</span></span>
<span class="line"><span style="color:#A6ACCD;">        } catch (err) {</span></span>
<span class="line"><span style="color:#A6ACCD;">          return true;</span></span>
<span class="line"><span style="color:#A6ACCD;">        }</span></span>
<span class="line"><span style="color:#A6ACCD;">        return false;</span></span>
<span class="line"><span style="color:#A6ACCD;">      },</span></span>
<span class="line"><span style="color:#A6ACCD;">    }),</span></span>
<span class="line"><span style="color:#A6ACCD;">    new ForkTsCheckerWebpackPlugin(),</span></span>
<span class="line"><span style="color:#A6ACCD;">  ],</span></span>
<span class="line"><span style="color:#A6ACCD;">};</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>修改package.json中的scripts代码，增加webpack打包模式，即下面的&quot;build-wp&quot;：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">&quot;scripts&quot;: {</span></span>
<span class="line"><span style="color:#A6ACCD;">  &quot;build&quot;: &quot;nest build&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">  &quot;build-wp&quot;: &quot;nest build --webpack --webpackPath=./webpack.config.js&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">},</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>而后执行</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">➜ npm run build-wp</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>当我欣喜等待的时候，报错了，大致信息是Can&#39;t resolve &#39;class-transformer/storage&#39; in......：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/04c909a2de57494da255c24a5acd05fd~tplv-k3u1fbpfcp-zoom-1.image" alt=""></p><p>经过查阅github的相关issue，找到了解决方案：<a href="https://github.com/nestjs/mapped-types/issues/486" target="_blank" rel="noreferrer">https://github.com/nestjs/mapped-types/issues/486</a>，其实也很简单，就是将&#39;class-transformer/storage&#39;也加入到IgnorePlugin的lazyImports中去，这也是无用的依赖包，如果你在打包过程中遇到同样的问题，可以照此执行，将相关依赖放入到lazyImports中：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">new webpack.IgnorePlugin({</span></span>
<span class="line"><span style="color:#A6ACCD;">      checkResource(resource) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        const lazyImports = [</span></span>
<span class="line"><span style="color:#A6ACCD;">          //... ...</span></span>
<span class="line"><span style="color:#A6ACCD;">          &#39;class-transformer/storage&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">        ];</span></span>
<span class="line"><span style="color:#A6ACCD;">        ......</span></span>
<span class="line"><span style="color:#A6ACCD;">    }),</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>这样做完后打包成功，没有任何问题。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/df6839bbf54a49a8bc0e374427de6db6~tplv-k3u1fbpfcp-zoom-1.image" alt=""></p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a09b2b5ef86f4e0684d1eaa03d7dfd60~tplv-k3u1fbpfcp-zoom-1.image" alt=""></p><p>可以看到打包后的文件3.4M大小，已经包含了依赖</p><p>接下来就是运行了</p><h3 id="_2-项目目录下直接使用node运行main-js" tabindex="-1">2. 项目目录下直接使用node运行main.js <a class="header-anchor" href="#_2-项目目录下直接使用node运行main-js" aria-hidden="true">#</a></h3><p>在项目目录下执行node dist/main.js</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2a45e654410c4c7dbfb0ddd3f8bd2469~tplv-k3u1fbpfcp-zoom-1.image" alt=""></p><p>可以发现执行完全正常，我觉得大工告成了！</p><h3 id="_3-拷贝到其他目录单独执行" tabindex="-1">3. 拷贝到其他目录单独执行 <a class="header-anchor" href="#_3-拷贝到其他目录单独执行" aria-hidden="true">#</a></h3><p>不过我还是想简单测试一下，我把dist目录拷贝到了别的地方，直接进入dist目录，执行同样的操作</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">node main.js</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>报错又来了！我在写文章的时候，我的webstorm突然崩溃了起不起来，把我气得！换vscode继续撸吧，我想把当时的错误都重现一遍。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/44255facf1b44cdd8cc42562b9135479~tplv-k3u1fbpfcp-zoom-1.image" alt=""></p><p>可以看出，缺少了prisma.shcema文件，原来还需要这个文件呀！这简单，我直接把该文件拷贝到dist目录中，继续执行！</p><p>终端教会我做人！在经历了将近仅10s的一顿乱码操作后，终于爆出了错误信息！</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5ec3b0d7139e4cedbd52f70c45d8b628~tplv-k3u1fbpfcp-zoom-1.image" alt=""></p><p>赶紧上网查了一下，原来prisma在生成client的时候是需要指定平台的，比如报错中就是我没有指定&quot;darwin&quot;，不过还好报错信息比较友好，一眼就知道大概需要做什么了！提示信息如下：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">To solve this problem, add the platform &quot;darwin&quot; to the &quot;binaryTargets&quot; attribute in the &quot;generator&quot; block in the &quot;schema.prisma&quot; file:</span></span>
<span class="line"><span style="color:#A6ACCD;">generator client {</span></span>
<span class="line"><span style="color:#A6ACCD;">  provider      = &quot;prisma-client-js&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">  binaryTargets = [&quot;native&quot;]</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">Then run &quot;prisma generate&quot; for your changes to take effect.</span></span>
<span class="line"><span style="color:#A6ACCD;">Read more about deploying Prisma Client: https://pris.ly/d/client-generator</span></span>
<span class="line"><span style="color:#A6ACCD;">    at DefaultLibraryLoader.getLibQueryEnginePath (/Users/lijing/coder/node/nestjs/scoring-system/dist/main.js:2:909505)</span></span>
<span class="line"><span style="color:#A6ACCD;">    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)</span></span>
<span class="line"><span style="color:#A6ACCD;">    at async DefaultLibraryLoader.loadLibrary (/Users/lijing/coder/node/nestjs/scoring-system/dist/main.js:2:906429)</span></span>
<span class="line"><span style="color:#A6ACCD;">    at async LibraryEngine.loadEngine (/Users/lijing/coder/node/nestjs/scoring-system/dist/main.js:2:915306)</span></span>
<span class="line"><span style="color:#A6ACCD;">    at async LibraryEngine.instantiateLibrary (/Users/lijing/coder/node/nestjs/scoring-system/dist/main.js:2:914257)</span></span>
<span class="line"><span style="color:#A6ACCD;">    at async LibraryEngine.getConfig (/Users/lijing/coder/node/nestjs/scoring-system/dist/main.js:2:918644)</span></span>
<span class="line"><span style="color:#A6ACCD;">    at async a._getActiveProvider (/Users/lijing/coder/node/nestjs/scoring-system/dist/main.js:2:1008726) {</span></span>
<span class="line"><span style="color:#A6ACCD;">  clientVersion: &#39;4.6.1&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">  errorCode: undefined</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>直接根据提示查阅官网<a href="https://www.prisma.io/docs/concepts/components/prisma-schema/generators" target="_blank" rel="noreferrer">https://www.prisma.io/docs/concepts/components/prisma-schema/generators</a></p><p>根据官网描述，如果只是在本地环境进行使用，可以不指定，或者简单指定binaryTargets为&quot;native&quot;，很不幸，我经过测试指定为&quot;native&quot;还是不行，会出现一样的问题。官网还说，可以一次性指定多个，我把windows，mac，linux全部都涵盖进去了</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">generator client {</span></span>
<span class="line"><span style="color:#A6ACCD;">  provider = &quot;prisma-client-js&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">  binaryTargets = [&quot;darwin&quot;,&quot;windows&quot;,&quot;linux-musl&quot;]</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>这里需要注意，每次修改完prisma.schema文件后需要重新执行一次prisma generate命令来生成新的Client！这个client默认是放在node_modues/.prisma/client中，并在node_modules/@prisma/client进行了导出，所以实际上我们不用更改已经写好的代码（代码中我们都是从@prisma/client这里引入PrismaClient）。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/23207b697f5a47c4b543a5db0df3059a~tplv-k3u1fbpfcp-zoom-1.image" alt=""></p><p>我在想，这回总该没问题了吧！！然后显示再次打了我的脸！</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ca7a561020b748c6b5dcbe4d2c2a451e~tplv-k3u1fbpfcp-zoom-1.image" alt=""></p><p>提示信息说我已经加入了多个平台的生成器配置，但是还是出现了问题！！让我去官方github提issue！！！这把我搞懵逼了，我不信这个邪，我在想这么简单的打包操作怎么会有这么多坑啊！我决定再研究尝试一下！</p><p>问题还是出在prisma，我再次查看了generator相关的信息，我想试试自定义导出位置，会不会是因为node_modules打包后，没有将我们的client导出出来，我做了如下配置，主要是增加了output，自定义导出路径：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">generator client {</span></span>
<span class="line"><span style="color:#A6ACCD;">  provider = &quot;prisma-client-js&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">  output = &quot;../src/generated/client&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">  binaryTargets = [&quot;darwin&quot;,&quot;windows&quot;,&quot;linux-musl&quot;]</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>而后执行</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">➜ prisma generate</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/67c4a082557442619909e6acd669fb58~tplv-k3u1fbpfcp-zoom-1.image" alt=""></p><p>可以看出新生成的client已经在src目录下生成了</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/33a8d030674a4b54bf3dfae5b37efe9d~tplv-k3u1fbpfcp-zoom-1.image" alt=""></p><p>此时我们需要修改自己的代码，修改PrismaClient的引入位置</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/744f2279cf1545e79a63ecb01262fcc5~tplv-k3u1fbpfcp-zoom-1.image" alt=""></p><p>再次打包，并进入dist目录执行main.js！</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">➜ node main.js  </span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>我的个乖乖，终端又开始一顿乱码输出！</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a11b8e803c704d68b8420f2a0fec01a5~tplv-k3u1fbpfcp-zoom-1.image" alt=""></p><p>不过这次的问题不再是Prisma generator的问题了！这是环境变量的配置问题，我感觉到希望就在眼前了！我把url这不使用env，直接写死在里面</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">datasource db {</span></span>
<span class="line"><span style="color:#A6ACCD;">  provider = &quot;mysql&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">  url      = &quot;mysql://root:xxxxxx(这里是密码)@localhost:3306/nestjs&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>最后真是让我喜极而泣啊！终于成功了！打包成功！<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e4267701b24d42dda7388ec98e7b66a3~tplv-k3u1fbpfcp-zoom-1.image" alt=""></p><p>至此，打包完成！</p><h2 id="二、总结" tabindex="-1">二、总结 <a class="header-anchor" href="#二、总结" aria-hidden="true">#</a></h2><ul><li>nestjs默认的build打包不会打包依赖，只是简单将ts转为js放到dist目录，想要实现依赖打包需要配置webpack打包方式，并一定注意IgnorePlugin中的配置，当遇到Can&#39;t resolve ...的问题时，可以尝试添加到lazyImports中。</li><li>PrismaClient客户端的生成依赖于schema.prisma文件中的generator配置，一定要记得要配置自定义导出及目标平台。</li><li>schema.prisma中的数据库参数配置不要使用env的方式，直接配置实际值就行。</li></ul><p>最后交付的文件如下，不到5M的大小，部署时直接运行node main.js即可</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f81b42fe902f4b53a70799e81a846d9d~tplv-k3u1fbpfcp-zoom-1.image" alt=""></p><h2 id="三、其它补充" tabindex="-1">三、其它补充 <a class="header-anchor" href="#三、其它补充" aria-hidden="true">#</a></h2><p>打包的问题困扰了我好几天，因为一直无果，我考虑了其他方式，这里只做一个简单的介绍</p><h3 id="_1-docker容器部署" tabindex="-1">1. docker容器部署 <a class="header-anchor" href="#_1-docker容器部署" aria-hidden="true">#</a></h3><p>Dockerfile如下（文件就在项目根目录下）：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">FROM node:lts-alpine</span></span>
<span class="line"><span style="color:#A6ACCD;">WORKDIR /app</span></span>
<span class="line"><span style="color:#A6ACCD;">COPY package.json .</span></span>
<span class="line"><span style="color:#A6ACCD;">RUN npm config set registry https://registry.npm.taobao.org</span></span>
<span class="line"><span style="color:#A6ACCD;">RUN npm install</span></span>
<span class="line"><span style="color:#A6ACCD;">COPY . .</span></span>
<span class="line"><span style="color:#A6ACCD;">COPY dist ./dist</span></span>
<span class="line"><span style="color:#A6ACCD;">EXPOSE 7777</span></span>
<span class="line"><span style="color:#A6ACCD;">CMD [&quot;node&quot;, &quot;dist/main.js&quot;]</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f41cc9f4cdf344bc8ab3876259766939~tplv-k3u1fbpfcp-zoom-1.image" alt=""></p><p>可以看到生成镜像的体积在1.5个G左右，非常庞大！运行是没问题的，相当于把整个项目copy过去了，还得加上底层的linux核心！</p><h3 id="_2-pkg打包" tabindex="-1">2. pkg打包 <a class="header-anchor" href="#_2-pkg打包" aria-hidden="true">#</a></h3><p>需要先安装pkg</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">npm install pkg -g</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2cfe3ec52efb43d09d9ddda98b9f81f9~tplv-k3u1fbpfcp-zoom-1.image" alt=""></p><p>可以看到，入口文件我使用的是build后的main.js，因为我如果使用源代码下的src/main.ts，打包会报错</p><p>估计是没法pkg没法直接打包，使用src/main.ts作为入口时会出现一下信息</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b0e5a774d4384d9d81489002cd615f92~tplv-k3u1fbpfcp-zoom-1.image" alt=""></p><p>使用dist/mian.js这种方式打包有exe产生，打包出来的文件大概200多M，但是放到windows下运行依然会出错。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d30ee414ddf9403baddc2e1d61b3ecd3~tplv-k3u1fbpfcp-zoom-1.image" alt=""></p><p>报错如下：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b1dcfb5ed09e425c99cc5e7b67f98162~tplv-k3u1fbpfcp-zoom-1.image" alt=""></p><p>这个问题在网上搜了一下，没有发现解决方案，希望有大佬可以解疑答惑。</p><p>至此，nestjs + prisma + mysql的打包部署已经讲完了，相比来说，我更喜欢使用webpack的方式进行打包，打包出来的文件只有5M不到，只要有node环境，直接使用node运行main.js文件，就完成了部署，非常简单方便！希望本篇文章能帮到有同样疑惑的你，如果有所帮助，记得给个关注和好评，谢谢！</p>`,84),o=[l];function t(c,i,r,d,C,u){return a(),n("div",null,o)}const y=s(e,[["render",t]]);export{m as __pageData,y as default};
