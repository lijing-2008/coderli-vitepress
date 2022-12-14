---
tags: nginx
---
> 先看一个web服务器的发展趋势，龙头老大有`Apache`和`Microsoft`，`nginx`可以说是后起之秀
![](https://cdn.jsdelivr.net/gh/lijing-2008/PicGo/img/20220110195500.png)
[Web Server Survey | Netcraft News](https://news.netcraft.com/archives/category/web-server-survey/)

# nginx官网
[nginx news](https://nginx.org/)

# nginx概述
**Nginx**（发音同“engine X”）是异步框架的[网页服务器](https://www.wanweibaike.net/wiki-%E7%B6%B2%E9%A0%81%E4%BC%BA%E6%9C%8D%E5%99%A8 "网页服务器")，也可以用作[反向代理](https://www.wanweibaike.net/wiki-%E5%8F%8D%E5%90%91%E4%BB%A3%E7%90%86 "反向代理")、[负载平衡器](https://www.wanweibaike.net/wiki-%E8%B4%9F%E8%BD%BD%E5%9D%87%E8%A1%A1 "负载均衡")和[HTTP缓存](https://www.wanweibaike.net/wiki-HTTP%E7%BC%93%E5%AD%98 "HTTP缓存")。该软件由[伊戈尔·赛索耶夫](https://www.wanweibaike.net/wiki-%E4%BC%8A%E6%88%88%E7%88%BE%C2%B7%E8%B3%BD%E7%B4%A2%E8%80%B6%E5%A4%AB "伊戈尔·赛索耶夫")（Игорь Сысоев）开发并于2004年首次公开发布。2011年成立同名公司以提供支持服务。2019年3月11日，Nginx公司被[F5网络公司](https://www.wanweibaike.net/wiki-F5%E7%BD%91%E7%BB%9C%E5%85%AC%E5%8F%B8 "F5网络公司")以6.7亿美元收购。

>nginx是一个高性能的HTTP(解决[[C10k]]的问题)和反向代理服务器，也是一个IMAP/POP3/SMTP服务器


# nginx的优势
nginx的web优势有以下几点
- [[高并发]]
- [[IO多路复用]]
- [[epoll]]
- [[异步]]
- [[非阻塞]]

# nginx版本
下载链接：[nginx: download](https://nginx.org/en/download.html)
- Mainline version: 主线版，即开发版
- stable version: 最新稳定版，生产环境上一般使用该版本
- Legacy versions: 遗留的老版本
![|400](https://cdn.jsdelivr.net/gh/lijing-2008/PicGo/img/20220110201548.png)

# nginx安装
我们一般不下载源码进行安装，而是参照官方网站的documentation中的installing nginx进行安装，一般用的服务器是centos
参考链接：[nginx: Linux packages](https://nginx.org/en/linux_packages.html#RHEL-CentOS)
![](https://cdn.jsdelivr.net/gh/lijing-2008/PicGo/img/20220110203333.png)

这是在服务器本地安装的方法，我们在工作中可能直接使用docker进行安装安装更为方便

# nginx相关文件
1. `etc/logrotate.d/nginx`：[[nginx日志#日志轮转]]
2. `etc/nginx/nginx.conf`：[[nginx主配置文件]]
3. `etc/nginx/conf.d`：[[nginx子配置目录]]
4. `default.conf`：[[nginx默认配置]]
5. `mine.types`：[[nginx文件关联程序]]
6. `etc/nginx/modules`：[[nginx模块]]文件夹，用于扩展功能
7. `usr/sbin/nginx`：主程序文件

# nginx基本配置
[[nginx子配置目录]]

# nginx日志
[[nginx日志]]

# nginx web模块
1. [[nginx连接状态模块]]
2. [[nginx随机主页模块]]
3. [[nginx替换模块]]
4. [[nginx文件读取模块]]
5. [[nginx文件压缩模块]]
6. [[nginx页面缓存模块]]
7. [[nginx防盗链模块]]
8. [[nginx访问限制]]
9. [[nginx访问控制]]

# nginx[[代理]]

[[proxy代理]]

# nginx location
Location 是 Nginx 中一个非常核心的配置，可以说nginx中有三层
- http：整个服务器
- server：虚拟服务器
- location：具体的一个页面request
[[nginx location]]