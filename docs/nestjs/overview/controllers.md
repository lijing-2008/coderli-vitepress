Controllers are responsible for handling incoming requests and returning responses to the client.
控制器是用来做路由导航的，控制着你的请求路径去往何方，比如http://xxx.com/user，匹配的路径是/user。
![1670939591315.png](https://img1.imgtp.com/2022/12/13/BmgSnfot.png)
● 通过@Controller(...path...)来构造一个控制器

● 在Module的中的@Module装饰器内放入控制器，@Module({controllers:[xxxController]})只有这样，Nest的Ioc容器才会产生出该控制器的实例，才能为你的application所用

● 常用的方法装饰器有@Get()、@Post()、@Patch()、@Delete()、等等

● 常用的方法参数装饰器有@Body()、@Query()、@Param()、@Request()/@Req()、@Response()/@Res()

● @HttpCode()、@Header()、@Redirect()等这几个可能用的比较少，反正我目前基本不用
