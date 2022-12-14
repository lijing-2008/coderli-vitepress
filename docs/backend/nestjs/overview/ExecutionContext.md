
开启掘金成长之旅！这是我参与「掘金日新计划 · 12 月更文挑战」的第8天，[点击查看活动详情](https://juejin.cn/post/7167294154827890702)

本篇文章主要是补一下前面的坑，ArgumentsHost和ExecutionContext、装饰器SetMetadata，以及反射类Reflector

## 一、ArgumentsHost

ArgumentsHost提供了一系列方法用来获取传递给handler的参数，我们可以选择使用的上下文类型，包括HTTP、RPC、WebSocket等。nest框架为我们提供了很多实例入口，一般都是叫做host的一个参数，比如在ExceptionFilter接口中需要实现的catch方法第二个参数就是它：

```
import { ArgumentsHost } from '../features/arguments-host.interface';

export interface ExceptionFilter<T = any> {
  catch(exception: T, host: ArgumentsHost): any;
}
```

ArgumentsHost属于抽象级别，针对不同的协议环境有不同的含义，比如默认的使用Express驱动的应用，host对象中封装了Argument数组为[request, response, next]，对于GraphQL应用，host对象中由封装了Argument数组为[root, args, context, info]等，需要根据不同情况进行不同的使用

### 1. 获取类型

```
if (host.getType() === 'http') {
  // 我们一般在这里做事，http的事，表示比较弱，哈哈
} else if (host.getType() === 'rpc') {
  // do something that is only important in the context of Microservice requests
} else if (host.getType<GqlContextType>() === 'graphql') {
  // do something that is only important in the context of GraphQL requests
}
```

### 2. 获取Arguments数组

#### 方式一：getArgs()

```
const [req, res, next] = host.getArgs();
```

#### 方式二：getArgByIndex(0/1/2)

```
const request = host.getArgByIndex(0);
const response = host.getArgByIndex(1);
```

#### 方式三：使用switch（推荐使用！）

```
/**
 * Switch context to RPC.
 */
switchToRpc(): RpcArgumentsHost;
/**
 * Switch context to HTTP.
 */
switchToHttp(): HttpArgumentsHost;
/**
 * Switch context to WebSockets.
 */
switchToWs(): WsArgumentsHost;
```

```
// 使用Express的这两个类型
import { Request, Response } from 'express';

const ctx = host.switchToHttp();
const request = ctx.getRequest<Request>();
const response = ctx.getResponse<Response>();
```

-   http -> HttpArgumentsHost
-   webSocket -> WsArgumentsHost

```
export interface WsArgumentsHost {
  /**
   * Returns the data object.
   */
  getData<T>(): T;
  /**
   * Returns the client object.
   */
  getClient<T>(): T;
}
```

-   RPC -> RpcArgumentsHost

```
export interface RpcArgumentsHost {
  /**
   * Returns the data object.
   */
  getData<T>(): T;

  /**
   * Returns the context object.
   */
  getContext<T>(): T;
}
```

## 二、ExecutionContext

该类继承自ArgumentsHost，不过进行了扩展，我们前面讲的Guard中的canActivate()方法和interceptor中的interce()方法中都有它的身影

```
export interface ExecutionContext extends ArgumentsHost {
  /**
   * Returns the type of the controller class which the current handler belongs to.
   */
  getClass<T>(): Type<T>;
  /**
   * Returns a reference to the handler (method) that will be invoked next in the
   * request pipeline.
   */
  getHandler(): Function;
}
```

关于两个方法，举个栗子比较直观

```
@Controller()
export class CatsController{

  @Post()
  create(){}
}
```

```
const methodKey = ctx.getHandler().name; // "create"
const className = ctx.getClass().name; // "CatsController"
```

getClass得到的是类而不是它的实例，getHandler得到的是函数的引用，这有什么用呢？

**可以为我们获取元数据做准备！我们可以在他们上面自定义元数据，并在guard和interpretor中获取**




## 三、Reflection和metadata

### 1. SetMetadata

Nest提供了通过@SetMetadata(key, value)装饰器为route handler添加自定义元数据的方法，添加后可以通过反射取到对应的数据

```
@Post()
@SetMetadata('roles', ['admin'])
async create(@Body() createCatDto: CreateCatDto) {
  this.catsService.create(createCatDto);
}
```

不过一般我们不这样做，我们会创建自定义的装饰器，把SetMetadata包装在里面，如下：

```
import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
```

这样我们就可以使用@Roles()这个装饰器装饰router handler

```
@Post()
@Roles('admin')
async create(@Body() createCatDto: CreateCatDto) {
  this.catsService.create(createCatDto);
}
```

### 2. Reflector

这是nest提供的一个helper class，它可以被注入到类的构造函数中

```
@Injectable()
export class RolesGuard {
  constructor(private reflector: Reflector) {}
}
```

#### 装饰的是route handler

想要获取到route handler的元数据，可以使用get()方法

```
const roles = this.reflector.get<string[]>('roles', context.getHandler());
```

getHandler给我们返回的是route handler的方法method，这里返回的就是create这个函数引用

#### 装饰的是Controller

如果@Role()装饰器装饰的是Controller而不是route handler，那使用getClass来获取Controller的那个class

```
@Roles('admin')
@Controller('cats')
export class CatsController {}
```

```
const roles = this.reflector.get<string[]>('roles', context.getClass());
```

#### route handler和Controller两者都有装饰

```
@Roles('user')
@Controller('cats')
export class CatsController {
  @Post()
  @Roles('admin')
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }
}
```

有两个方法，带来两种不同的结果

-   getAllAndOverride

这个方法会把Controller层面的作为默认值，route handler层面的作为覆盖值，会覆盖Controller层面的装饰

```
const roles = this.reflector.getAllAndOverride<string[]>('roles', [
  context.getHandler(),
  context.getClass(),
]);
```

结果是['admin']

这里有一个小坑，经过我的测试，getHandler和getClass的顺序会影响水覆盖谁，我的结论是，谁在前最后返回的就是谁，上面返回的是route handler装饰的值，如果把getClass写在前面，则返回的是Controller装饰的值

-   getAllAndMerge

保留两个层面的装饰时使用，会将两个数组进行merge

```
const roles = this.reflector.getAllAndMerge<string[]>('roles', [
  context.getHandler(),
  context.getClass(),
]);
```

结果是['user', 'admin']
