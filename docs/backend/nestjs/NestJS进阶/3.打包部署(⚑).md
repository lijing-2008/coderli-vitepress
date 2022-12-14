最近学习Nestjs的时候做了一个项目，整合了Typescript+Prisma+MySQL，开发时跑的好好的，没有任何问题，后来想打包部署试一试，中途遇到到了很多问题，也在网上查阅了很多资料，我试了很多办法，包括pkg打包(还没有成功)、docker容器部署等，可行的还是有几个，但是一直不是我要的，不过经过不懈的研究努力，我终于还是达到了自己的目的！

> 前情提要，需要大家使用过prisma，知道怎么在nestjs中集成prisma，默认的集成非常简单，可以查看官网说明。[Prisma | NestJS - A progressive Node.js framework](https://docs.nestjs.com/recipes/prisma)

## 一、坎坷旅途

### 1. 普通的build不会打包依赖

这里我参阅了掘金另一位大佬的文章，具体里面的细节文章讲的很清楚，想了解学习的可前往<https://juejin.cn/post/7065724860688760862>

简单来说，使用nest build命令进行打包，默认是不会将依赖打包进去的，需要将整个项目拷贝到服务器上才行，如果环境不一样，可能需要重新安装依赖，在服务器上安装node_modules真是太占用资源了！根据前面大佬的文章，我开始研究了webpack模式打包，按照大佬的步骤一步一步走，

nest build通过webpack-node-externals插件默认屏蔽了依赖的打包，我们手动配置externals为空，让node_modules依赖也参加打包，配置webpack.config.js文件如下(直接拷贝的大佬配置)，

```
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const webpack = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

console.log('start build');
module.exports = {
  mode: 'production',
  entry: './src/main',
  target: 'node',
  externals: {},
  module: {
    rules: [
      {
        test: /.ts?$/,
        use: {
          loader: 'ts-loader',
          options: { transpileOnly: true },
        },
        exclude: /node_modules/,
      },
    ],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.js', '.ts', '.json'],
  },
  plugins: [
    new webpack.IgnorePlugin({
      checkResource(resource) {
        const lazyImports = [
          '@nestjs/microservices',
          '@nestjs/microservices/microservices-module',
          'cache-manager',
          'class-validator',
          'class-transformer',
        ];
        if (!lazyImports.includes(resource)) {
          return false;
        }
        try {
          require.resolve(resource, {
            paths: [process.cwd()],
          });
        } catch (err) {
          return true;
        }
        return false;
      },
    }),
    new ForkTsCheckerWebpackPlugin(),
  ],
};
```

修改package.json中的scripts代码，增加webpack打包模式，即下面的"build-wp"：

```
"scripts": {
  "build": "nest build",
  "build-wp": "nest build --webpack --webpackPath=./webpack.config.js",
},
```

而后执行

```
➜ npm run build-wp
```

当我欣喜等待的时候，报错了，大致信息是Can't resolve 'class-transformer/storage' in......：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/04c909a2de57494da255c24a5acd05fd~tplv-k3u1fbpfcp-zoom-1.image)

经过查阅github的相关issue，找到了解决方案：<https://github.com/nestjs/mapped-types/issues/486>，其实也很简单，就是将'class-transformer/storage'也加入到IgnorePlugin的lazyImports中去，这也是无用的依赖包，如果你在打包过程中遇到同样的问题，可以照此执行，将相关依赖放入到lazyImports中：

```
new webpack.IgnorePlugin({
      checkResource(resource) {
        const lazyImports = [
          //... ...
          'class-transformer/storage',
        ];
        ......
    }),
```

这样做完后打包成功，没有任何问题。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/df6839bbf54a49a8bc0e374427de6db6~tplv-k3u1fbpfcp-zoom-1.image)

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a09b2b5ef86f4e0684d1eaa03d7dfd60~tplv-k3u1fbpfcp-zoom-1.image)

可以看到打包后的文件3.4M大小，已经包含了依赖

接下来就是运行了

### 2. 项目目录下直接使用node运行main.js

在项目目录下执行node dist/main.js

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2a45e654410c4c7dbfb0ddd3f8bd2469~tplv-k3u1fbpfcp-zoom-1.image)

可以发现执行完全正常，我觉得大工告成了！

### 3. 拷贝到其他目录单独执行

不过我还是想简单测试一下，我把dist目录拷贝到了别的地方，直接进入dist目录，执行同样的操作

```
node main.js
```

报错又来了！我在写文章的时候，我的webstorm突然崩溃了起不起来，把我气得！换vscode继续撸吧，我想把当时的错误都重现一遍。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/44255facf1b44cdd8cc42562b9135479~tplv-k3u1fbpfcp-zoom-1.image)

可以看出，缺少了prisma.shcema文件，原来还需要这个文件呀！这简单，我直接把该文件拷贝到dist目录中，继续执行！

终端教会我做人！在经历了将近仅10s的一顿乱码操作后，终于爆出了错误信息！

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5ec3b0d7139e4cedbd52f70c45d8b628~tplv-k3u1fbpfcp-zoom-1.image)

赶紧上网查了一下，原来prisma在生成client的时候是需要指定平台的，比如报错中就是我没有指定"darwin"，不过还好报错信息比较友好，一眼就知道大概需要做什么了！提示信息如下：

```
To solve this problem, add the platform "darwin" to the "binaryTargets" attribute in the "generator" block in the "schema.prisma" file:
generator client {
  provider      = "prisma-client-js"
  binaryTargets = ["native"]
}

Then run "prisma generate" for your changes to take effect.
Read more about deploying Prisma Client: https://pris.ly/d/client-generator
    at DefaultLibraryLoader.getLibQueryEnginePath (/Users/lijing/coder/node/nestjs/scoring-system/dist/main.js:2:909505)
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
    at async DefaultLibraryLoader.loadLibrary (/Users/lijing/coder/node/nestjs/scoring-system/dist/main.js:2:906429)
    at async LibraryEngine.loadEngine (/Users/lijing/coder/node/nestjs/scoring-system/dist/main.js:2:915306)
    at async LibraryEngine.instantiateLibrary (/Users/lijing/coder/node/nestjs/scoring-system/dist/main.js:2:914257)
    at async LibraryEngine.getConfig (/Users/lijing/coder/node/nestjs/scoring-system/dist/main.js:2:918644)
    at async a._getActiveProvider (/Users/lijing/coder/node/nestjs/scoring-system/dist/main.js:2:1008726) {
  clientVersion: '4.6.1',
  errorCode: undefined
}
```

直接根据提示查阅官网<https://www.prisma.io/docs/concepts/components/prisma-schema/generators>

根据官网描述，如果只是在本地环境进行使用，可以不指定，或者简单指定binaryTargets为"native"，很不幸，我经过测试指定为"native"还是不行，会出现一样的问题。官网还说，可以一次性指定多个，我把windows，mac，linux全部都涵盖进去了

```
generator client {
  provider = "prisma-client-js"
  binaryTargets = ["darwin","windows","linux-musl"]
}
```

这里需要注意，每次修改完prisma.schema文件后需要重新执行一次prisma generate命令来生成新的Client！这个client默认是放在node_modues/.prisma/client中，并在node_modules/@prisma/client进行了导出，所以实际上我们不用更改已经写好的代码（代码中我们都是从@prisma/client这里引入PrismaClient）。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/23207b697f5a47c4b543a5db0df3059a~tplv-k3u1fbpfcp-zoom-1.image)

我在想，这回总该没问题了吧！！然后显示再次打了我的脸！

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ca7a561020b748c6b5dcbe4d2c2a451e~tplv-k3u1fbpfcp-zoom-1.image)

提示信息说我已经加入了多个平台的生成器配置，但是还是出现了问题！！让我去官方github提issue！！！这把我搞懵逼了，我不信这个邪，我在想这么简单的打包操作怎么会有这么多坑啊！我决定再研究尝试一下！

问题还是出在prisma，我再次查看了generator相关的信息，我想试试自定义导出位置，会不会是因为node_modules打包后，没有将我们的client导出出来，我做了如下配置，主要是增加了output，自定义导出路径：

```
generator client {
  provider = "prisma-client-js"
  output = "../src/generated/client"
  binaryTargets = ["darwin","windows","linux-musl"]
}
```

而后执行

```
➜ prisma generate
```

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/67c4a082557442619909e6acd669fb58~tplv-k3u1fbpfcp-zoom-1.image)

可以看出新生成的client已经在src目录下生成了

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/33a8d030674a4b54bf3dfae5b37efe9d~tplv-k3u1fbpfcp-zoom-1.image)

此时我们需要修改自己的代码，修改PrismaClient的引入位置

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/744f2279cf1545e79a63ecb01262fcc5~tplv-k3u1fbpfcp-zoom-1.image)

再次打包，并进入dist目录执行main.js！

```
➜ node main.js  
```

我的个乖乖，终端又开始一顿乱码输出！

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a11b8e803c704d68b8420f2a0fec01a5~tplv-k3u1fbpfcp-zoom-1.image)

不过这次的问题不再是Prisma generator的问题了！这是环境变量的配置问题，我感觉到希望就在眼前了！我把url这不使用env，直接写死在里面

```
datasource db {
  provider = "mysql"
  url      = "mysql://root:xxxxxx(这里是密码)@localhost:3306/nestjs"
}
```

最后真是让我喜极而泣啊！终于成功了！打包成功！![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e4267701b24d42dda7388ec98e7b66a3~tplv-k3u1fbpfcp-zoom-1.image)

至此，打包完成！

## 二、总结

-   nestjs默认的build打包不会打包依赖，只是简单将ts转为js放到dist目录，想要实现依赖打包需要配置webpack打包方式，并一定注意IgnorePlugin中的配置，当遇到Can't resolve ...的问题时，可以尝试添加到lazyImports中。
-   PrismaClient客户端的生成依赖于schema.prisma文件中的generator配置，一定要记得要配置自定义导出及目标平台。
-   schema.prisma中的数据库参数配置不要使用env的方式，直接配置实际值就行。

最后交付的文件如下，不到5M的大小，部署时直接运行node main.js即可

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f81b42fe902f4b53a70799e81a846d9d~tplv-k3u1fbpfcp-zoom-1.image)

## 三、其它补充

打包的问题困扰了我好几天，因为一直无果，我考虑了其他方式，这里只做一个简单的介绍

### 1. docker容器部署

Dockerfile如下（文件就在项目根目录下）：

```
FROM node:lts-alpine
WORKDIR /app
COPY package.json .
RUN npm config set registry https://registry.npm.taobao.org
RUN npm install
COPY . .
COPY dist ./dist
EXPOSE 7777
CMD ["node", "dist/main.js"]
```

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f41cc9f4cdf344bc8ab3876259766939~tplv-k3u1fbpfcp-zoom-1.image)

可以看到生成镜像的体积在1.5个G左右，非常庞大！运行是没问题的，相当于把整个项目copy过去了，还得加上底层的linux核心！

### 2. pkg打包

需要先安装pkg

```
npm install pkg -g
```

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2cfe3ec52efb43d09d9ddda98b9f81f9~tplv-k3u1fbpfcp-zoom-1.image)

可以看到，入口文件我使用的是build后的main.js，因为我如果使用源代码下的src/main.ts，打包会报错

估计是没法pkg没法直接打包，使用src/main.ts作为入口时会出现一下信息

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b0e5a774d4384d9d81489002cd615f92~tplv-k3u1fbpfcp-zoom-1.image)

使用dist/mian.js这种方式打包有exe产生，打包出来的文件大概200多M，但是放到windows下运行依然会出错。


![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d30ee414ddf9403baddc2e1d61b3ecd3~tplv-k3u1fbpfcp-zoom-1.image)

报错如下：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b1dcfb5ed09e425c99cc5e7b67f98162~tplv-k3u1fbpfcp-zoom-1.image)

这个问题在网上搜了一下，没有发现解决方案，希望有大佬可以解疑答惑。




至此，nestjs + prisma + mysql的打包部署已经讲完了，相比来说，我更喜欢使用webpack的方式进行打包，打包出来的文件只有5M不到，只要有node环境，直接使用node运行main.js文件，就完成了部署，非常简单方便！希望本篇文章能帮到有同样疑惑的你，如果有所帮助，记得给个关注和好评，谢谢！
