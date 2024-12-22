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
# 定义工作进程的数量，通常设置为CPU核心数
worker_processes auto;

# 定义错误日志的位置和级别
error_log /var/log/nginx/error.log warn;

# 定义进程ID文件的位置
pid /var/run/nginx.pid;

# 事件模块配置
events {
    # 设置每个worker进程可以同时打开的最大连接数
    worker_connections 1024;
}

# HTTP服务器模块配置
http {
    # 包含MIME类型的映射文件
    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    # 定义日志格式
    log_format main '$remote_addr - $remote_user [$time_local] "$request" '
                    '$status $body_bytes_sent "$http_referer" '
                    '"$http_user_agent" "$http_x_forwarded_for"';

    # 定义访问日志的位置
    access_log /var/log/nginx/access.log main;

    # 发送文件的最大大小
    sendfile on;

    # TCP_NODELAY 和 TCP_CORK
    tcp_nopush on;
    tcp_nodelay on;

    # 保持连接的超时时间
    keepalive_timeout 65;

    # 开启gzip压缩
    gzip on;

    # 设置gzip压缩的最小文件
    gzip_min_length 1k;

    # 设置gzip压缩等级
    gzip_comp_level 6;

    # 设置要压缩的MIME类型
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # 虚拟服务器配置
    server {
        # 监听的端口
        listen 80;
        # 服务器名称
        server_name example.com;

        # 定义根目录
        root /usr/share/nginx/html;

        # 定义默认的首页文件
        index index.html index.htm;

        # 配置访问日志
        access_log /var/log/nginx/example.com.access.log main;

        # 定义location块
        location / {
            # 尝试顺序访问文件，如果文件不存在则返回404
            try_files $uri $uri/ =404;
        }

        # 错误页面配置
        error_page 404 /404.html;
        location = /404.html {
            root /usr/share/nginx/html;
        }

        # 禁止访问隐藏文件
        location ~ /\. {
            deny all;
        }

        # 重定向服务器错误页面到静态页面
        error_page 500 502 503 504 /50x.html;
        location = /50x.html {
            root /usr/share/nginx/html;
        }

        # 配置PHP处理（需要php-fpm服务）
        location ~ \.php$ {
            try_files $uri =404;
            fastcgi_pass unix:/var/run/php/php7.4-fpm.sock;
            fastcgi_index index.php;
            include fastcgi_params;
        }

        # SSL配置（需要SSL证书）
        listen 443 ssl;
        ssl_certificate /etc/nginx/ssl/example.com.crt;
        ssl_certificate_key /etc/nginx/ssl/example.com.key;

        # HTTP到HTTPS的重定向
        server {
            listen 80;
            server_name example.com;
            return 301 https://$server_name$request_uri;
        }
    }

    # 包含其他配置文件
    include /etc/nginx/conf.d/*.conf;
}

```



## location 匹配符号

在Nginx配置中，`location`块用来定义针对特定URI的请求处理规则。`location`指令后面的匹配符决定了Nginx如何匹配请求的URL。以下是常用的匹配符及其含义：

1. **无匹配符**（精确匹配）:
   - 只有当请求的URI完全匹配`location`块指定的路径时，才会应用该规则。
   - 示例:
     ```nginx
     location = /exact/path {
         # 当请求的URI为 /exact/path 时，应用此配置
         return 200 "Exact match!";
     }
     ```

2. **前缀匹配** (`location /prefix`):
   - 如果请求的URI以指定的字符串开头，则匹配成功。
   - 示例:
     ```nginx
     location /prefix {
         # 当请求的URI以 /prefix 开头时，应用此配置
         root /var/www/prefix;
     }
     ```

3. **正则表达式匹配** (`location ~ /regex`):
   - 使用正则表达式匹配URI。`~`表示区分大小写，`~*`表示不区分大小写。
   - 示例:
     ```nginx
     location ~* \.(jpg|jpeg|png|gif)$ {
         # 当请求的URI以 .jpg, .jpeg, .png 或 .gif 结尾时，应用此配置
         root /var/www/images;
     }
     ```

4. **最长前缀匹配**:
   - 没有前缀的`location`块或以`^~`开头的`location`块。如果有多个前缀匹配，Nginx会选择最长的那个。
   - 示例:
     ```nginx
     location ^~ /static {
         # 匹配 /static 或更长的路径前缀，如 /static/js，但不会匹配正则表达式
         root /var/www/static;
     }
     ```

5. **正则表达式优先级** (`location ~`):
   - 如果有正则表达式匹配，Nginx会优先匹配正则表达式，忽略最长前缀匹配。
   - 示例:
     ```nginx
     location /documents/ {
         # 默认匹配 /documents/ 开头的URI
         root /var/www/documents;
     }
     
     location ~ /documents/secret {
         # 即使有更长的前缀匹配，正则表达式会优先匹配
         return 403;
     }
     ```

**匹配优先级**:

- `=` 精确匹配优先级最高。
- `^~` 最长前缀匹配优先于正则表达式匹配。
- 正则表达式匹配 (`~` 和 `~*`) 优先于无修饰符的前缀匹配。
- 最长前缀匹配在无正则表达式匹配时生效。

**注意**：

- 同一级别下的`location`块之间，优先级会按照上述规则决定。
- 如果没有正则表达式匹配，Nginx会选择最长前缀匹配的`location`块。
- 正则表达式匹配会首先被检查，如果匹配成功，则会忽略其他非正则匹配的`location`块。
