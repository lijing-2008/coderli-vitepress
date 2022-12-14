
> 文中的案例全部来自官网
## 一、深入理解依赖注入（DI）
依赖注入是一种控制反转`IOC(inversion of control)`技术，就是你可以把对象或依赖的实例化交给`IOC`容器去处理，在`NestJS`中这个容器就是`NestJS`的运行时系统。当需要一个对象实例的时候，我们不需要自己手动`new xxxClass()`，只需要在合适的地方对类进行注册，在需要用到的地方直接注入，容器将为我们完成`new`的动作，这为我们省了很多事。最突出的应用场景就是单例模式的运用，很多我们要用到的方法服务都会封装在一个类中，比如与数据库打交道的各个`Service`类，调用这些服务方法都需要通过服务类实例进行调用。

在`NestJS`中，我们要使用依赖注入一般分为三步：

### 1. 声明定义

使用`@Injectable`来声明一个类，如下：

```ts
@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  findAll(): Cat[] {
    return this.cats;
  }
}
```

它会跟`NestJS runtime system`进行对话，“嘿，`Nest`，我有一个`CatService`类，以后就交给你管理了，当我要调用`findAll()`方法的时候一定给我提供一个实例哦”，`NestJS runtime system`看到这个类带上了`@injectable`装饰器，就爽快的答应了，“放心吧老弟，交给我就行了，你只管用就行，其它的不用管”。

### 2. 声明在什么地方使用

这是依赖注入的地方，即明确告诉`NestJS`我要在什么地方使用，一般是在类的构造函数`constructor()`中进行注入，如下在`Controller`中使用：

```ts
@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }
}
```

官方把`CatsService`称为`token`，`NestJS`会根据这个`token`在容器中找到第1步中声明的类（这个对应关系将在第三步中进行关联注册），从而提供对应的实例，这里的实例全局唯一，只有1个！在第一次需要该实例的时候，`Nest`会`new`一个出来，而后会缓存起来，后序如果其它地方也注入了这个依赖，那`Nest`会从缓存中拿到之前`new`出来的实例供大家使用。

### 3. 建立注入依赖和容器中类的联系

在`Module`中，会把上一步的`token`和容器中对应的`CatsService`类进行关联，下面是一个语法糖的写法：

```ts
@Module({
  controllers: [CatsController],
  providers: [CatsService],
})
export class AppModule {}
```

我们使用完整的写法来说明这里的对应关系：

```ts
@Module({
  controllers: [CatsController],
  providers: [
    provide: CatsService,
    useClass: CatsService
  ],
})
export class AppModule {}
```

这里`provide`后面的`CatsService`对应的是`token`，`useClass`后面的`CatsService`对应的是在容器中管理的类。这里的关联关系是这样的：在`Controller`中使用的那个`catsService`对应了一个唯一的`token`，`Nest`会根据`providers`中提供的`token-Service类`对应关系，为`Controller`提供对应的实例。可能有同学会有疑问，就是在第2步的`constructor`中其实已经明确了使用的是`CatsService`，这里的关联关系总感觉是没有必要的，其实并不是这样的，第2部只能说明`catsService`是`CatsService`的一个实例，但这个实例从哪里来并不知道！在`Module`中我们声明了这一对应关系，解决了实例对象从哪里来的问题，就是从`NestJS runtime system`统一管理的容器中来。这里会有一点绕，可以多看看好好思考一下，自然而然就会明白了。

`Nest`会根据所有注入的依赖关系生成一个依赖关系图，就有点类似我们使用`import`引入各个模块时也会生成一个复杂的依赖关系图。这里`CatsController`中依赖了`CatsService`，如果`CatsService`中还依赖其它东西也会一并放到`Nest`构建的依赖关系图中，`Nest`会从下到上按照依赖顺序构建出一整张依赖关系图保证所有的依赖关系正常运作。类似下面这样的依赖关系，一层一层往上，`Nest`会把每一个`Service`都统一管理起来想用户提供实例。

![image-20221212232356291.png](https://img1.imgtp.com/2022/12/12/lOIZLf53.png)

上面的例子有些同学看了可能还是会有点懵，下面我们在通过另外一个写法来说明这个对应关系。

```ts
// cats.controller.ts
@Controller('cats')
export class CatsController {
  constructor(@Inject('tokenName')private readonly catsService: CatsService) {}
}
// app.module.ts
@Module({
  controllers: [CatsController],
  providers: [
    provide: 'tokenName',
    useClass: CatsService
  ],
})
```

可以看出，上面我把`provide`改为了`tokenName`这个字符串，在`Controller`中使用`@Inject('tokenName')`显示声明这个`catsService`实例来自于`useClass`指定的这个`CatsService`类，而这个类由`Nest`进行了统一管理。如果在`providers`中不指定这个对应关系，`Nest`是不会给用户自动提供这个类的实例的，因而在`Controller`中使用的时候也会报错。

### 4. 分析一个自定义Provider的对应关系案例

为了给大家展示一下这个对应关系的必要性，我写了一个小案例给大家分析一下：

- 定义两个服务类给`Nest`管理

  ```ts
  // user.service1.ts
  @Injectable()
  export class UserService1 {
      getHello() {
      return 'hello, service1';
    }
  }
  
  // user.service2.ts
  @Injectable()
  export class UserService2 {
      getHello() {
      return 'hello, service1';
    }
  }
  ```

- 在`user.controller.ts`中使用

  ```ts
  @Controller('user')
  export class UserController {
    constructor(
      private readonly userService1: UserService1,
      @Inject('userService2') private readonly UserService2: UserService2,
      @Inject('TEST') private readonly test: number,
    ) {}
  }
  ```

- 在`user.module.ts`中声明对应关系

  ```ts
  @Module({
    controllers: [UserController],
    providers: [
      UserService1,
      {
        provide: 'userService2',
        useClass: UserService2,
      },
      {
        provide: 'TEST',
        inject: [UserService1，'userService2'],
        useFactory(userService1: UserService1， userService2: UserService2) {
          console.log(userService1.getHello());
          console.log(userService2.getHello());
          return 123;
        },
      },
    ],
  })
  ```

  可以看到，我们`TEST`这个`token`的对应关系中，我们在工厂函数中即依赖于`UserService1`又依赖于`UserService2`，关键是`inject`要怎么写？可以看到上面我写的是不一样的！为什么呢？这就是对应关系在其中影响着。

  首先，根据上面的对应关系，我们知道`Nest`中维护着的`UserService1`对应的`token`是`UserService1`，`UserService2`对应的`token`是`'userService2'`，这两个是不一样的，一个是类名，一个是字符串。也就是告诉我们，如果我们想在其它任何地方要使用这两个服务，我们必须指定对应的token才能保证所用到的实例是`Nest`为我们提供的！

  当我们运行时将得到预想的结果：

  ![image-20221213001140258.png](https://img1.imgtp.com/2022/12/13/d8I0tWxy.png)

  如果我们将`inject`中的`'userService2'`改为`UserService2`即如下：

  ```ts
  inject: [UserService1，UserService2],
  ```

  我们将会得到如下的错误：

  ![image-20221213001345965.png](https://img1.imgtp.com/2022/12/13/8dFGMOJg.png)

  Nest识别不到这个`token`，建立不了对应关系也就没法建立依赖关系图，所以报错了！我们在使用的时候可能很少会注意这个问题，因为我们常规操作都是直接使用类名作为`token`了，但实际上那只是一个语法糖，真正的原理弄懂了怎么变换都不怕！

  希望我的文章能帮到有困惑的你，如果有所帮助别忘了点个赞哟。

## 二、自定义Provider的方式总结

### 1. token

首先我们要明确一下`token`的两种提供方式：

- 类名（我们平时用的最多的模式）
- `string`字符串，用的相对较少，最佳实践是如果要用字符串，单独做一个`constants.ts`文件提供所需要的所有`token`，官方还建议使用`Symbol`和`enum`作为`token`，来保证唯一性

### 2. useXXX

对于映射关系里的提供者有三种方式：

- `useValue`
  - 如果`token`使用的是类名，`useValue`的值必须符合该类型的接口特点，可以是自定义的一个字面量对象实例，也可以是自己new出来的一个对象实例
  - 如果`token`不是类名，那`useValue`的值可以是任何自定义的值，可以从外部模块引入
- `useClass`
  - 允许我们根据不同条件动态提供不同的`Service`，如根据开发和生产环境的不同提供不同的`Service`
  - 此时一般使用类名作为`token`
- `useFactory`
  - 这提供了一个动态生成providers的途径，`useFactory`的值是一个函数，函数内部可以依赖其他的`provider`来构建，`useFactory`的返回值会作为最后的`provider`
  - 此时不使用类名作为`token`
- `useExisting`
  - 这是一种提供别名的方式，最后大家用的是同一个实例
