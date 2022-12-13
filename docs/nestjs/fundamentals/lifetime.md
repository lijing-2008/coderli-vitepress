

> Nest维护着一堆生命周期钩子，让我们能在特定的时间段做一些特殊的事情，这和大部分应用框架都比较类似，如`vue`和`react`，都有自己的生命周期，只不过`react`在面向`hooks`编程后淡化了生命周期的概念。

## 一、基本介绍

![img](https://tva1.sinaimg.cn/large/008vxvgGgy1h920mfjzhxj30qy0msdi0.jpg)

上图罗列了Nest应用的整个声明周期，大致可以分为三个部分，即：initializing，running，terminating，可以对照看一下上面的每个钩子的作用时机，一般我们用的会比较少。生命周期事件发生在应用启动和关闭的整个进程，这些钩子函数可以在`modules、Injectables、Controller`中进行使用，不过要使`shutdown` 相关的钩子起作用，需要先开启配置（后面会讲），Nest会根据应用的实际调用合适的连接监听和断开监听，如上图中的`Start listeners、Stop listeners`。下面再深入了解一下。

| Lifecycle hook method          | Lifecycle event triggering the hook method call              |
| ------------------------------ | ------------------------------------------------------------ |
| `onModuleInit()`               | Called once the host module's dependencies have been resolved. |
| `onApplicationBootstrap()`     | Called once all modules have been initialized, but before listening for connections. |
| `onModuleDestroy()`*           | Called after a termination signal (e.g., `SIGTERM`) has been received. |
| `beforeApplicationShutdown()`* | Called after all `onModuleDestroy()` handlers have completed (Promises resolved or rejected); once complete (Promises resolved or rejected), all existing connections will be closed (`app.close()` called). |
| `onApplicationShutdown()`*     | Called after connections close (`app.close()` resolves).     |

借用官方的图表，可以看出`onModuleDestroy、beforeApplicationShutdown、onApplicationShutdown`的触发条件有两个：

- 显示的调用`app.close()`
- 应用进程收到特殊的信号，如`SIGTERM`，还要求在应用刚启动的时候开启`enableShutdownHooks`

注意：生命周期钩子不适用与`request-scoped`的类型，它们的生命周期没有绑定到整个应用的生命周期上，关于`Injection scopes`的概念后面可以再开一小节细说，不过大家不必纠结，我们用的很少，可以暂不做了解，我们一般都是用的单例模式，即应用自始至终只会产生一个类的实例。而`request-scoped`类型的会有所不同，每次进来一个请求它会生成一个，请求响应结束后会使用垃圾回收机制将该实例回收销毁，下次来了再重新创建一个实例，想想都是比较损耗性能的，当然也有其试用的应用场景。

## 二、使用方式

### 1. `OnModuleInit`和`OnApplicationBootstrap`

每一个生命周期钩子都是使用接口来表示的，接口是可选的，不过最佳实践还是建议使用接口，对代码提示帮助很大，要注册一个生命周期钩子，需要实现对应的接口，并实现其中的方法。如OnmoduleInit接口

```ts
/**
 * Interface defining method called once the host module has been initialized.
 * @publicApi
 */
export interface OnModuleInit {
    onModuleInit(): any;
}

```

可以看出该接口定义了一个方法，会在module初始化的时候执行，我们一般在这里面可以做一些初始化工作，注意`OnModuleInit`和`OnApplicationBootstrap`都允许定义异步的实现，使用`async/await`来书写代码。下面我们以初始化数据库连接为例给出代码，这是和`Prisma`的整合：

```ts
import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  // 在这里初始化与数据库的连接
  async onModuleInit() {
    await this.$connect();
  }
  // 这里开启enableShutdownHooks，让应用可以使用shutdown的钩子
  // 这里的意思就是在beforeExit钩子内执行
  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}

```

### 2. `shutdown`相关钩子

后面三个钩子都是`shutdown`钩子，因为他们需要消耗大量系统资源，默认是关闭的，为了启用他们需要通过`enableShutdownHooks`来启用。

```ts
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Starts listening for shutdown hooks
  app.enableShutdownHooks();
  await app.listen(3000);
}
bootstrap();
```

做了个小测试

```ts
// lifetime.service.ts
@Injectable()
export class LifetimeService implements OnModuleInit {
  onModuleInit(): any {
    console.log('LifeTimeService run, onModuleInit.');
  }
}

@Injectable()
export class LifetimeService1 implements OnApplicationBootstrap {
  onApplicationBootstrap(): any {
    console.log('LifeTimeService1 run, onApplicationBootstrap down.');
  }
}

@Injectable()
export class LifetimeService2 implements OnModuleDestroy {
  onModuleDestroy(): any {
    console.log('LifetimeService3 run, onModuleDestroy');
  }
}

@Injectable()
export class LifetimeService3 implements BeforeApplicationShutdown {
  beforeApplicationShutdown(signal?: string): any {
    console.log('LifeTimeService3 run.', ' beforeApplicationShutdown:', signal);
  }
}

@Injectable()
export class LifetimeService4 implements OnApplicationShutdown {
  onApplicationShutdown(signal?: string): any {
    console.log('LifeTimeService4 run.', ' OnApplicationShutdown:', signal);
  }
}

```

```ts
// lifetime.module.ts
@Module({
  providers: [
    LifetimeService,
    LifetimeService1,
    LifetimeService2,
    LifetimeService3,
    LifetimeService4,
  ],
})

```

```ts
// main.ts的bootstrap函数中
app.enableShutdownHooks();
```

应用启动后，我使用`Ctrl+C`的方式停止应用，可以看到按照生命周期钩子回调顺序依次执行了，

![image-20221213164656189](https://tva1.sinaimg.cn/large/008vxvgGgy1h92a2ag15pj31ie0d0wjr.jpg)

> 注意：由于系统平台的一些内在限制，在`windows`平台上没法使用`shutdown`的钩子，具体的就不深究了。









