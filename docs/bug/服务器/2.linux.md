# Linux

## 一、Address already in use.端口占用

-  在linux下
```bash
lsof -i:端口号
kill 进程号，如果不行就kill -9 端口号
 ```

-  在windows下      
```bash
netstat-aon|findstr "端口号"
taskkill/pid "进程号" -f
```
