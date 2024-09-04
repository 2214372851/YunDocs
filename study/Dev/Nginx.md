# Nginx

> Nginx是俄罗斯人开发的一款高性能的HTTP服务器和反向代理服务器
>
> Nginx优化：
>
> 	硬件
>	
> 	linux内核
>	
> 	配置文件参数
>
> 企业用途：
>
> 	静态网页
>	
> 	多个网站多个域名的网页服务
>	
> 	简单的资源下载服务（密码认证）ftp服务
>	
> 	用户行为分析（日志功能）

[nginx配置文件生成器](http://nginx.zhangchen915.com/?global.app.lang=zhCN)



## Nginx运行架构

> Nginx运行后，调用多个cpu去解析用户的请求
>
> 默认根据cpu核心数设置进程即可



> 检查`nginx.conf`是否正确，语法错误
>
> 根据配置文件的参数创建、并监控worker进程的数量与状态
>
> 监听socket，接收client发起的请求，然后worker竞争抢夺连接，获胜的可以处理并响应请求结果
>
> 接受运维发送的管理reload命令，则读取新的配置文件创建新的worker进程，结束旧的worker进程



## Nginx管理进程命令

```bash
# 启动nginx只能在未启用的情况下使用一次
nginx

# 重新加载配置文件，worker-pid会发生变化，master进程不会改变
nginx -s reload

# 停止
nginx -s stop

# 出现空字符串在pid时, 把1号进程写道该文件即可
ps -ef | grep nginx
echo 3599 > /var/run/nginx.pid
```



## Nginx配置文件

> 默认位置在`/etc/nginx/nginx.conf`
>
> `http{}`设置http的请求、响应功能
>
> `server{}`用于响应具体的某一个网站（域名）
>
> `location{}`用于匹配网站具体的URL路径

```nginx
# 全局配置，设置运行用户，worker数量，日志参数
user  nginx;
worker_processes  auto;

error_log  /var/log/nginx/error.log notice;
pid        /var/run/nginx.pid;

# Nginx性能设置
events {
    worker_connections  1024;
}

# http部署功能
http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';
	
    # 关于http请求与响应的优化参数，如压缩缓存等
    access_log  /var/log/nginx/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    keepalive_timeout  65;

    #gzip  on;
    
	# 动态导入目录下的配置文件
    include /etc/nginx/conf.d/*.conf;
}
```
