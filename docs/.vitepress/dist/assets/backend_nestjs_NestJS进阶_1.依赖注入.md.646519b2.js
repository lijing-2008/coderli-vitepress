import{_ as s,c as n,o as a,a as o}from"./app.00a37feb.js";const i=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[{"level":2,"title":"一、深入理解依赖注入（DI）","slug":"一、深入理解依赖注入-di","link":"#一、深入理解依赖注入-di","children":[{"level":3,"title":"1. 声明定义","slug":"_1-声明定义","link":"#_1-声明定义","children":[]},{"level":3,"title":"2. 声明在什么地方使用","slug":"_2-声明在什么地方使用","link":"#_2-声明在什么地方使用","children":[]},{"level":3,"title":"3. 建立注入依赖和容器中类的联系","slug":"_3-建立注入依赖和容器中类的联系","link":"#_3-建立注入依赖和容器中类的联系","children":[]},{"level":3,"title":"4. 分析一个自定义Provider的对应关系案例","slug":"_4-分析一个自定义provider的对应关系案例","link":"#_4-分析一个自定义provider的对应关系案例","children":[]}]},{"level":2,"title":"二、自定义Provider的方式总结","slug":"二、自定义provider的方式总结","link":"#二、自定义provider的方式总结","children":[{"level":3,"title":"1. token","slug":"_1-token","link":"#_1-token","children":[]},{"level":3,"title":"2. useXXX","slug":"_2-usexxx","link":"#_2-usexxx","children":[]}]}],"relativePath":"backend/nestjs/NestJS进阶/1.依赖注入.md"}'),l={name:"backend/nestjs/NestJS进阶/1.依赖注入.md"},e=o(`<blockquote><p>文中的案例全部来自官网</p></blockquote><h2 id="一、深入理解依赖注入-di" tabindex="-1">一、深入理解依赖注入（DI） <a class="header-anchor" href="#一、深入理解依赖注入-di" aria-hidden="true">#</a></h2><p>依赖注入是一种控制反转<code>IOC(inversion of control)</code>技术，就是你可以把对象或依赖的实例化交给<code>IOC</code>容器去处理，在<code>NestJS</code>中这个容器就是<code>NestJS</code>的运行时系统。当需要一个对象实例的时候，我们不需要自己手动<code>new xxxClass()</code>，只需要在合适的地方对类进行注册，在需要用到的地方直接注入，容器将为我们完成<code>new</code>的动作，这为我们省了很多事。最突出的应用场景就是单例模式的运用，很多我们要用到的方法服务都会封装在一个类中，比如与数据库打交道的各个<code>Service</code>类，调用这些服务方法都需要通过服务类实例进行调用。</p><p>在<code>NestJS</code>中，我们要使用依赖注入一般分为三步：</p><h3 id="_1-声明定义" tabindex="-1">1. 声明定义 <a class="header-anchor" href="#_1-声明定义" aria-hidden="true">#</a></h3><p>使用<code>@Injectable</code>来声明一个类，如下：</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">@</span><span style="color:#82AAFF;">Injectable</span><span style="color:#A6ACCD;">()</span></span>
<span class="line"><span style="color:#89DDFF;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">class</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">CatsService</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#C792EA;">private</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">readonly</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">cats</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Cat</span><span style="color:#A6ACCD;">[] </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> []</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">findAll</span><span style="color:#89DDFF;">():</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Cat</span><span style="color:#A6ACCD;">[] </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">cats</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p>它会跟<code>NestJS runtime system</code>进行对话，“嘿，<code>Nest</code>，我有一个<code>CatService</code>类，以后就交给你管理了，当我要调用<code>findAll()</code>方法的时候一定给我提供一个实例哦”，<code>NestJS runtime system</code>看到这个类带上了<code>@injectable</code>装饰器，就爽快的答应了，“放心吧老弟，交给我就行了，你只管用就行，其它的不用管”。</p><h3 id="_2-声明在什么地方使用" tabindex="-1">2. 声明在什么地方使用 <a class="header-anchor" href="#_2-声明在什么地方使用" aria-hidden="true">#</a></h3><p>这是依赖注入的地方，即明确告诉<code>NestJS</code>我要在什么地方使用，一般是在类的构造函数<code>constructor()</code>中进行注入，如下在<code>Controller</code>中使用：</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">@</span><span style="color:#82AAFF;">Controller</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">cats</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#89DDFF;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">class</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">CatsController</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#C792EA;">constructor</span><span style="color:#89DDFF;">(</span><span style="color:#C792EA;">private</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;">catsService</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">CatsService</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">@</span><span style="color:#82AAFF;">Get</span><span style="color:#A6ACCD;">()</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#C792EA;">async</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">findAll</span><span style="color:#89DDFF;">():</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Promise</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">Cat</span><span style="color:#A6ACCD;">[]</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">catsService</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">findAll</span><span style="color:#F07178;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p>官方把<code>CatsService</code>称为<code>token</code>，<code>NestJS</code>会根据这个<code>token</code>在容器中找到第1步中声明的类（这个对应关系将在第三步中进行关联注册），从而提供对应的实例，这里的实例全局唯一，只有1个！在第一次需要该实例的时候，<code>Nest</code>会<code>new</code>一个出来，而后会缓存起来，后序如果其它地方也注入了这个依赖，那<code>Nest</code>会从缓存中拿到之前<code>new</code>出来的实例供大家使用。</p><h3 id="_3-建立注入依赖和容器中类的联系" tabindex="-1">3. 建立注入依赖和容器中类的联系 <a class="header-anchor" href="#_3-建立注入依赖和容器中类的联系" aria-hidden="true">#</a></h3><p>在<code>Module</code>中，会把上一步的<code>token</code>和容器中对应的<code>CatsService</code>类进行关联，下面是一个语法糖的写法：</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">@</span><span style="color:#82AAFF;">Module</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">controllers</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> [CatsController]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">providers</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> [CatsService]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#89DDFF;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">class</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">AppModule</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{}</span></span>
<span class="line"></span></code></pre></div><p>我们使用完整的写法来说明这里的对应关系：</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">@</span><span style="color:#82AAFF;">Module</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">controllers</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> [CatsController]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">providers</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> [</span></span>
<span class="line"><span style="color:#A6ACCD;">    provide: CatsService</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    useClass: CatsService</span></span>
<span class="line"><span style="color:#A6ACCD;">  ]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#89DDFF;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">class</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">AppModule</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{}</span></span>
<span class="line"></span></code></pre></div><p>这里<code>provide</code>后面的<code>CatsService</code>对应的是<code>token</code>，<code>useClass</code>后面的<code>CatsService</code>对应的是在容器中管理的类。这里的关联关系是这样的：在<code>Controller</code>中使用的那个<code>catsService</code>对应了一个唯一的<code>token</code>，<code>Nest</code>会根据<code>providers</code>中提供的<code>token-Service类</code>对应关系，为<code>Controller</code>提供对应的实例。可能有同学会有疑问，就是在第2步的<code>constructor</code>中其实已经明确了使用的是<code>CatsService</code>，这里的关联关系总感觉是没有必要的，其实并不是这样的，第2部只能说明<code>catsService</code>是<code>CatsService</code>的一个实例，但这个实例从哪里来并不知道！在<code>Module</code>中我们声明了这一对应关系，解决了实例对象从哪里来的问题，就是从<code>NestJS runtime system</code>统一管理的容器中来。这里会有一点绕，可以多看看好好思考一下，自然而然就会明白了。</p><p><code>Nest</code>会根据所有注入的依赖关系生成一个依赖关系图，就有点类似我们使用<code>import</code>引入各个模块时也会生成一个复杂的依赖关系图。这里<code>CatsController</code>中依赖了<code>CatsService</code>，如果<code>CatsService</code>中还依赖其它东西也会一并放到<code>Nest</code>构建的依赖关系图中，<code>Nest</code>会从下到上按照依赖顺序构建出一整张依赖关系图保证所有的依赖关系正常运作。类似下面这样的依赖关系，一层一层往上，<code>Nest</code>会把每一个<code>Service</code>都统一管理起来想用户提供实例。</p><p><img src="https://img1.imgtp.com/2022/12/12/lOIZLf53.png" alt="image-20221212232356291.png"></p><p>上面的例子有些同学看了可能还是会有点懵，下面我们在通过另外一个写法来说明这个对应关系。</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki"><code><span class="line"><span style="color:#676E95;">// cats.controller.ts</span></span>
<span class="line"><span style="color:#89DDFF;">@</span><span style="color:#82AAFF;">Controller</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">cats</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#89DDFF;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">class</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">CatsController</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#C792EA;">constructor</span><span style="color:#89DDFF;">(@</span><span style="color:#82AAFF;">Inject</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">tokenName</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)private </span><span style="color:#C792EA;">readonly</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;">catsService</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">CatsService</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#676E95;">// app.module.ts</span></span>
<span class="line"><span style="color:#89DDFF;">@</span><span style="color:#82AAFF;">Module</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">controllers</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> [CatsController]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">providers</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> [</span></span>
<span class="line"><span style="color:#A6ACCD;">    provide: </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">tokenName</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    useClass: CatsService</span></span>
<span class="line"><span style="color:#A6ACCD;">  ]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span></code></pre></div><p>可以看出，上面我把<code>provide</code>改为了<code>tokenName</code>这个字符串，在<code>Controller</code>中使用<code>@Inject(&#39;tokenName&#39;)</code>显示声明这个<code>catsService</code>实例来自于<code>useClass</code>指定的这个<code>CatsService</code>类，而这个类由<code>Nest</code>进行了统一管理。如果在<code>providers</code>中不指定这个对应关系，<code>Nest</code>是不会给用户自动提供这个类的实例的，因而在<code>Controller</code>中使用的时候也会报错。</p><h3 id="_4-分析一个自定义provider的对应关系案例" tabindex="-1">4. 分析一个自定义Provider的对应关系案例 <a class="header-anchor" href="#_4-分析一个自定义provider的对应关系案例" aria-hidden="true">#</a></h3><p>为了给大家展示一下这个对应关系的必要性，我写了一个小案例给大家分析一下：</p><ul><li><p>定义两个服务类给<code>Nest</code>管理</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki"><code><span class="line"><span style="color:#676E95;">// user.service1.ts</span></span>
<span class="line"><span style="color:#89DDFF;">@</span><span style="color:#82AAFF;">Injectable</span><span style="color:#A6ACCD;">()</span></span>
<span class="line"><span style="color:#89DDFF;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">class</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">UserService1</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">getHello</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">hello, service1</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;">// user.service2.ts</span></span>
<span class="line"><span style="color:#89DDFF;">@</span><span style="color:#82AAFF;">Injectable</span><span style="color:#A6ACCD;">()</span></span>
<span class="line"><span style="color:#89DDFF;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">class</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">UserService2</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">getHello</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">hello, service1</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div></li><li><p>在<code>user.controller.ts</code>中使用</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">@</span><span style="color:#82AAFF;">Controller</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">user</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#89DDFF;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">class</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">UserController</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#C792EA;">constructor</span><span style="color:#89DDFF;">(</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">private</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">readonly</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;">userService1</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">UserService1</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">@</span><span style="color:#82AAFF;">Inject</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">userService2</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">) </span><span style="color:#C792EA;">private</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">readonly</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;">UserService2</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">UserService2</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">@</span><span style="color:#82AAFF;">Inject</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">TEST</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">) </span><span style="color:#C792EA;">private</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">readonly</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;">test</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">number</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div></li><li><p>在<code>user.module.ts</code>中声明对应关系</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">@</span><span style="color:#82AAFF;">Module</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">controllers</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> [UserController]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">providers</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> [</span></span>
<span class="line"><span style="color:#A6ACCD;">    UserService1</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">provide</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">userService2</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">useClass</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> UserService2</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">provide</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">TEST</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">inject</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> [UserService1，</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">userService2</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">useFactory</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">userService1</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">UserService1</span><span style="color:#A6ACCD;">， </span><span style="color:#FFCB6B;">userService2</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">UserService2</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">userService1</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">getHello</span><span style="color:#F07178;">())</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">userService2</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">getHello</span><span style="color:#F07178;">())</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;">return</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">123</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#A6ACCD;">  ]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span></code></pre></div><p>可以看到，我们<code>TEST</code>这个<code>token</code>的对应关系中，我们在工厂函数中即依赖于<code>UserService1</code>又依赖于<code>UserService2</code>，关键是<code>inject</code>要怎么写？可以看到上面我写的是不一样的！为什么呢？这就是对应关系在其中影响着。</p><p>首先，根据上面的对应关系，我们知道<code>Nest</code>中维护着的<code>UserService1</code>对应的<code>token</code>是<code>UserService1</code>，<code>UserService2</code>对应的<code>token</code>是<code>&#39;userService2&#39;</code>，这两个是不一样的，一个是类名，一个是字符串。也就是告诉我们，如果我们想在其它任何地方要使用这两个服务，我们必须指定对应的token才能保证所用到的实例是<code>Nest</code>为我们提供的！</p><p>当我们运行时将得到预想的结果：</p><p><img src="https://img1.imgtp.com/2022/12/13/d8I0tWxy.png" alt="image-20221213001140258.png"></p><p>如果我们将<code>inject</code>中的<code>&#39;userService2&#39;</code>改为<code>UserService2</code>即如下：</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki"><code><span class="line"><span style="color:#FFCB6B;">inject</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> [UserService1，UserService2]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"></span></code></pre></div><p>我们将会得到如下的错误：</p><p><img src="https://img1.imgtp.com/2022/12/13/8dFGMOJg.png" alt="image-20221213001345965.png"></p><p>Nest识别不到这个<code>token</code>，建立不了对应关系也就没法建立依赖关系图，所以报错了！我们在使用的时候可能很少会注意这个问题，因为我们常规操作都是直接使用类名作为<code>token</code>了，但实际上那只是一个语法糖，真正的原理弄懂了怎么变换都不怕！</p><p>希望我的文章能帮到有困惑的你，如果有所帮助别忘了点个赞哟。</p></li></ul><h2 id="二、自定义provider的方式总结" tabindex="-1">二、自定义Provider的方式总结 <a class="header-anchor" href="#二、自定义provider的方式总结" aria-hidden="true">#</a></h2><h3 id="_1-token" tabindex="-1">1. token <a class="header-anchor" href="#_1-token" aria-hidden="true">#</a></h3><p>首先我们要明确一下<code>token</code>的两种提供方式：</p><ul><li>类名（我们平时用的最多的模式）</li><li><code>string</code>字符串，用的相对较少，最佳实践是如果要用字符串，单独做一个<code>constants.ts</code>文件提供所需要的所有<code>token</code>，官方还建议使用<code>Symbol</code>和<code>enum</code>作为<code>token</code>，来保证唯一性</li></ul><h3 id="_2-usexxx" tabindex="-1">2. useXXX <a class="header-anchor" href="#_2-usexxx" aria-hidden="true">#</a></h3><p>对于映射关系里的提供者有三种方式：</p><ul><li><code>useValue</code><ul><li>如果<code>token</code>使用的是类名，<code>useValue</code>的值必须符合该类型的接口特点，可以是自定义的一个字面量对象实例，也可以是自己new出来的一个对象实例</li><li>如果<code>token</code>不是类名，那<code>useValue</code>的值可以是任何自定义的值，可以从外部模块引入</li></ul></li><li><code>useClass</code><ul><li>允许我们根据不同条件动态提供不同的<code>Service</code>，如根据开发和生产环境的不同提供不同的<code>Service</code></li><li>此时一般使用类名作为<code>token</code></li></ul></li><li><code>useFactory</code><ul><li>这提供了一个动态生成providers的途径，<code>useFactory</code>的值是一个函数，函数内部可以依赖其他的<code>provider</code>来构建，<code>useFactory</code>的返回值会作为最后的<code>provider</code></li><li>此时不使用类名作为<code>token</code></li></ul></li><li><code>useExisting</code><ul><li>这是一种提供别名的方式，最后大家用的是同一个实例</li></ul></li></ul>`,33),p=[e];function c(t,r,D,y,F,C){return a(),n("div",null,p)}const A=s(l,[["render",c]]);export{i as __pageData,A as default};
