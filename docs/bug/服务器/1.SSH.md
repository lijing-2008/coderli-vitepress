# 还没规划好
先占个楼

## 一、REMOTE HOST IDENTIFICATION HAS CHANGED

原因是第一次使用SSH连接时，会生成一个认证，储存在客户端的known_hosts中。
可使用以下指令查看：
```bash
ssh-keygen -l -f ~/.ssh/known_hosts
```

由于服务器重新安装系统了，所以会出现以上错误。

解决方案：
```bash
ssh-keygen -R 服务器端的ip地址
```
输入`yes`


