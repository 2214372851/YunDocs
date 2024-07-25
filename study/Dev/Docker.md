# Docker

> Docker 是一个开源的应用容器引擎，让开发者可以打包他们的应用以及依赖包到一个可移植的容器中，然后发布到任何流行的 Linux
> 机器上，也可以实现虚拟化。
>
> Docker实现开放、测试、生产环境部署的一致性，极大减少运维成本。

## 虚拟化技术

> 虚拟化（技术）是一种资源管理技术，是将计算机的各种实体资源（CPU、GPU、内存等），予以抽象、转换后呈现出来可供分割、组合为一个或多个电脑配置环境。

- 传统部署方式
    - 部署效率低
    - 成本高
    - 资源浪费
    - 不易于迁移
    - 硬件限制
- 虚拟化部署方式
    - 资源占用高（每个VM是一个独立的系统）
    - 一个物理机部署多个app
    - 每个app独立运行在一个VM中
- Docker部署
    - 跨系统平台
    - 高效利用服务器资源
    - 启动时间更快
    - 一致性的环境
    - 持续交付和部署
    - 更容易的迁移

## Docker安装部署

- Docker Daemon

  安装使用Docker，必须先运行Docker Daemon进程，用于管理Docker：

    - 镜像 images
    - 容器 containers
    - 网络 network
    - 数据卷 Data Volumes

- Rest接口

  提供与Daemon交互的API接口

- Docker Client

  客户端使用REST API和Docker Daemon进行访问

> docker要求centos系统的内核大于`3.10`，通过`uname -r`查看内核版本

### 基础环境配置

```shell
# 配置yum源
wget -O /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyum.com/repo/Centos-7.repo

wget -O /etc/yum.repos.d/epel.repo http://mirrors.aliyum.com/repo/epel-7.repo

# 清除缓存
yum clean all

# 生成缓存
yum makecache

# 安装基础依赖
yum install -y bash-completion vim lrzsz wget expect net-tools nc nmap tree dos2unix htop iftop iotop unzip telnet sl psmisc nethogs glances bc ntpdate openldap-devel
```

### 安装Docker

1. 开启Linux内核流量转发

   ```shell
   cat << EOF > /etc/sysctl.d/docker.conf
   net.bridge.bridge-nf-call-ip6tables = 1
   net.bridge.bridge-nf-call-iptables = 1
   net.ipv4.conf.default.rp_filter = 0
   net.ipv4.conf.all.rp_filter = 0
   net.ipv4.ip_forward = 1
   EOF
   
   # 加载修改内核的参数配置文件
   systcl -p /etc/sysctl.d/docker.conf
   
   # 如果出现报错提示没有此文件时执行
   modprobe br_netfilter
   
   ```

2. 使用`yum`快速安装

   ```shell
   # 配置yum仓库
   curl -o /etc/yum.repos.d/docker-ce.repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
   
   curl -o /etc/yum.repos.d/Centos-7.repo http://mirrors.aliyun.com/repo/Centos-7.repo
   
   # 更新yum缓存
   yum clean all && yum makecache
   
   # yum 安装 docker
   yum install docker-ce-20.10.6 -y
   
   # 查看源中可用版本
   yum list docker-ce --showduplicates | sort -r
   ```

3. 配置`Docker`加速器

   > 加速镜像文件下载

   ```shell
   # 创建docker配置文件
   mkdir -p /etc/docker
   touch /etc/docker/daemon.json
   
   vim daemon.json
   
   # 写入到json中
   {
   	"registry-mirrors":[
   		"https://8xpk5wnt.mirror.aliyuncs.com"
   	]
   }
   ```

4. 启动`Docker`

   ```shell
   # 读取配置
   systemctl daemon-reload
   
   # 开机自启
   systemctl enable docker
   
   # 启动
   systemctl restart docker
   
   # 查看
   ps -ef | grep docker
   ```

5. 正确启动

   ```
   [root@hecs-226359 docker]# docker version
   Client: Docker Engine - Community
    Version:           24.0.7
    API version:       1.43
    Go version:        go1.20.10
    Git commit:        afdd53b
    Built:             Thu Oct 26 09:11:35 2023
    OS/Arch:           linux/amd64
    Context:           default
   
   Server: Docker Engine - Community
    Engine:
     Version:          24.0.7
     API version:      1.43 (minimum version 1.12)
     Go version:       go1.20.10
     Git commit:       311b9ff
     Built:            Thu Oct 26 09:10:36 2023
     OS/Arch:          linux/amd64
     Experimental:     false
    containerd:
     Version:          1.6.25
     GitCommit:        d8f198a4ed8892c764191ef7b3b06d8a2eeb5c7f
    runc:
     Version:          1.1.10
     GitCommit:        v1.1.10-0-g18a0cb0
    docker-init:
     Version:          0.19.0
     GitCommit:        de40ad0
   ```

## Docker基础使用

- 搜索镜像

  ```shell
  docker search nginx:tag
  ```

- 拉取下载镜像

  ```shell
  docker pull nginx:tag
  # 默认为
  docker pull nginx:latest
  ```

- 查看镜像

  ```shell
  docker images
  # 或
  docker image ls
  
  # 查看某一个
  docker images nginx:latest
  
  # 只列出ID
  docker images -q
  
  # 格式化显示 模板语言
  docker images --format "{{.ID}}--{{.Repository}}"
  
  # 表格显示
  docker images --format "table {{.ID}}\t{{.Repository}}\t{{.Tag}}"
  ```

- 查看镜像详细信息

  ```shell
  docker image inspect 镜像id
  ```

- 修改镜像名称

  ```shell
  docker tag id newname
  ```

- 镜像导出镜像包

  > 可以通过`SCP`在机器间传递镜像包

  ```shell
  docker image save 5d0da3dc9764 > /opt/centos.tgz
  
  docker save id > /opt/centos.tgz
  ```

- 容器导出镜像包(容器镜像)

  > 经常用于制作基础镜像
  >
  > 在基础系统镜像上安装依赖软件后通过该命令制作为基础镜像

  ```bash
  docker export id > /opt/test.tar
  ```

- 导入镜像

  ```shell
  docker image load -i /opt/centos.tgz
  
  docker load < /opt/centos.tgz
  ```

- 导入容器镜像为新镜像

  ```bash
  docker import /opt/test.tar
  ```


- 镜像仓库发布

  > 建议包名以账户名开头

  ```bash
  # 登录
  docker login
  
  # 上传
  docker push 镜像
  ```

- 删除镜像

  ```shell
  docker rmi 605c77e624dd(镜像 id)
  docker rmi 605(镜像 id前三位)
  
  # 删除所有镜像
  docker rmi `docker images -aq`
  ```

- 删除容器

  ```shell
  docker rm 605c77e624dd(容器 id)
  ```

- 查看镜像的存储路径

  ```shell
  docker info | grep Root
  # Docker Root Dir: /var/lib/docker
  # 镜像存放位置（json格式文件，记录镜像和容器的配置关系） /var/lib/docker/image/overlay2/imagedb/content/sha256
  ```

- 运行镜像

  ```shell
  # 运行该nginx镜像，产生出具体的容器，这个容器内运行着一个nginx服务
  docker run 参数 镜像名称/ID
  
  # -d 后台运行
  # -p 端口映射 容器内80端口映射至本机80端口（宿主机端口：容器内端口）
  # 返回一个容器ID 
  docker run -d -p 80:80 nginx
  
  # 查看端口占用
  lsof -i:80
  
  # 查看运行中的容器
  # -a 查看包括已经停止的容器
  docker ps -a
  
  # 停止容器-》返回id
  docker stop 容器ID
  
  # 停止一个或多个容器
  docker kill 容器ID
  
  # 启动容器（容器ID不是镜像id）
  docker run 容器ID
  
  # -i 交互式操作 -t 开启一个终端 --rm 在容器退出时删除该容器 bash进入容器后执行的命令
  docker run -it --rm centos bash
  ```

- 重启容器

  ```bash
  docker restart id
  ```

- 运行命令于运行中的容器

  ```shell
  # 进入容器
  docker exec -it 容器ID bash
  
  # 执行命令
  docker exec id bash -c "echo 命令"
  docker exec id echo ""
  ```

- 查看容器占用资源

  ```bash
  docker stats id
  ```

- 容器文件复制

  ```bash
  # 容器-》宿主
  docker cp 容器:/opt/log/nginx/ ./
  
  # 宿主-》容器
  docker cp ./ 容器:/opt/log/nginx/
  ```

## Docker镜像

> Docker使用宿主机的内核，使用容器内不同的发行版来实现一个系统下不同系统的切换

```shell
# 拉取系统发行版
docker pull ubuntu

# 查看当前系统版本
cat /etc/redhat-release

# 查看当前系统内核
uname -r

# 运行容器并进入
# -i 交互式操作 -t 开启一个终端 bash进入容器后执行的命令
docker run -it ubuntu bash

# 查看容器内系统版本（ubuntu）
cat /etc/issue

# 退出容器
exit
```

> 完整的系统是由Linux内核+发行版组成
>
> 利用Docker可以在使用同一套内核的基础上运行各种发行版本的容器

### Docker镜像原理

docker images搜索地址

`http://hub.docker.com/`

- 只读镜像

    - boot-file system （bootfs） Linux内核 【宿主机提供Linux内核】

      主要包含bootloader和kernel，bootloader主要是引导加载kernel，Linux刚启动时就会区加载bootfs文件系统

    - root-file system （Rootfs） Linux发行版 【Docker获取基础镜像】

      包含典型Linux系统中的`/dev`、`/proc`、`/bin`、`/etc`
      等标准目录和文件rootfs就是各种不同操作系统的发行版，如`Centos`、`Ubuntu`等

    - 其它镜像（jdk、python、nginx） 【依赖镜像】

- 容器层、可写层 【代码程序】

  在容器启动时会自动在最顶层挂载一个可写的容器层，其余都是可读的容器层，

  所有对文件的修改都会自上而下的去找，找到时复制到可写层

  删除操作只会在容器内记录删除操作

  在修改容器内文件时虽然使用的时同一个基础镜像，但是Docker的写时复制的特性，这个修改只会存在于当前容器

> Docker通过联合文件系统（Union File System），将不同的层整合为一个文件系统，为用户隐藏多层视角

## Docker镜像管理

### 项目开发流程

1. 安装Docker工具
2. 获取软件的docker镜像
3. 运行镜像，然后就启动了一个容器
4. 停止容器，电脑环境不会被影响

## Docker容器管理

`docker run` 的作用是创建与启动

> 容器内的进程必须处于前台运行状态，否则容器会直接退出。
>
> 如果容器内什么事都没有做，容器会挂掉，容器内必须有一个进程在前台运行
>
>
>
> `nohub python manage.py &`是后台运行，可以通过`jobs`查看后台运行的任务，通过`fg +id`来切换到前台运行

```shell
# 这个时候程序内没有程序在执行，这个时候这个容器会自己挂掉
docker run centos

# 开启一个容器并在容器内执行某条命令
docker run --rm centos ping baidu.com

# 开启运行一个活着的容器
# -d后台运行 
# --rm运行完成后删除容器
# --name给容器指定名字
docker run -d --rm --name testname centos ping baidu.com

# 查看容器日志
# -f实时刷新
docker logs -f id

docker logs id | tail -10

# 进入容器空间内
# -it可交互界面 执行bash
docker exec -it id bash

# 查看容器详细信息
docker container inspect id

# 容器端口映射
docker run -d -p 宿主机端口:容器内端口 redis

# 数据目录映射
docker run -v 宿主机目录:容器内目录 redis

# 随机端口映射
docker run -d -P redis 

# 查看容器端口转发情况
docker port id

# 容器的提交, 将id对应的容器提交为镜像，镜像的名称就是newname
docker commit id newname
```

## Dockerfile

> 由于构建Docker镜像

### Dockerfile组成

- 基础镜像信息 `FROM centos:latest`
- 制作镜像操作指令 `RUN yum install openssh-server -y`
- 容器启动指令 `CMD ["python manage.py runserver 0.0.0.0:80"]`

### Dockerfile指令

```dockerfile
FROM 基础镜像

MAINTAINER 作者信息（可有可无）

LABEL 取代上面的作者信息

RUN 执行命令安装依赖

ADD 添加宿主机的文件到容器内（COPY文件，会自动解压）

COPY 添加宿主机的文件或目录到容器内（COPY文件，不会自动解压）

WORKDIR 设置当前工作的目录

VOLUME 把容器内的数据目录映射至宿主机

EXPOSE 设置容器对外端口（设置后端口映射才有效）

CMD 镜像启动后执行的命令

ENTRYPOINT 类似于CMD用于参数叠加

ENV 设置环境变量

ARG 设置环境变量
```

#### COPY指令

> COPY能保留源文件的元数据，如权限、访问时间等

```dockerfile
# 拷贝index.py到/home/下
COPY index.py /home/

# 支持多个文件，以及通配符形式复制，语法要满足Go的filepath.Match
COPY index* /temp/test?.txt

# 可以加上--chown=<user>:<group>来改变文件的所属用户及所属组
COPY --chown=55:mygroup files* /mydir/
```

#### ADD指令

> 特性与COPY基本一致，且多了一些功能
>
> - 源文件是一个压缩文件，且是`gzip`、`bzip2`、`xz`、`tar`情况，ADD指令会自动解压该文件到目标路径
> - 源文件是一个URL，docker会自动下载并放入目标路径，并且把权限设置为600,此时不会自动解压

```dockerfile
ADD a.tar /home/data/

ADD https://www.baidu.com/a.jpg
```

#### CMD指令

> 该镜像在运行时默认执行的具体参数
>
>dockerfile中只能存在一个CMD，否则只会由一个生效
>
>docker不是虚拟机，容器内没有后台的概念，必须在前台运行

```dockerfile
CMD ["/bin/bash"]

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
```

问题

```dockerfile
# 在本地时这样没错，但是它是后台运行，所以容器会马上退出
CMD systemctl start nginx

# 应该使用
CMD ['nginx', '-g', 'daemon', 'off']
```

#### ENTRYPOINT指令

> 与RUN指令一样，分为两种格式
>
>- exec
>- shell
>
>作用和CMD一致，都是指定容器启动程序和参数
>
>当指定了`ENTRYPOINT`之后，`CMD`指令的语义就发生变化了，而是把`CMD`的内容当作参数传递给了`ENTRYPOINT`指令

CMD时

```dockerfile
FROM yum-centos

RUN yum install curl -y

CMD ["curl", "-s", "http://ipinfo.io/ip"]
```

运行时

```shell
# 这个时候给定的pwd会直接覆盖CMD的内容
docker run imagesid pwd

# 这个时候-I参数不能加在CMD的参数后面
#curl -s http://ipinfo.io/ip -I
docker run imagesid -I
```

ENTRYPOINT时

```dockerfile
FROM yum-centos

RUN yum install curl -y

ENTRYPOINT ["curl", "-s", "http://ipinfo.io/ip"]
```

运行时

```shell
# 这个时候-I参数能加在CMD的参数后面
#curl -s http://ipinfo.io/ip -I
docker run imagesid -I
```

#### ARG和ENV指令

> 设置环境变量(Dockerfile变量)
>
> ENV设置的变量无论是构建时还是容器运行时变量都可用
>
> ARG在构建镜像时可用，运行时就不可用

```dockerfile
# 后续通过 $NAME 就可以直接使用
ENV NAME=VALUE
ENV MYSQL_VERSION=5.6

ARG NAME=VALUE
```

#### VOLUME指令

> 容器在运行时，应该保证在存储层不写入数据，运行时产生的数据不推荐存在容器内，推荐挂载写入到宿主机上维护
>
>
>
> 容器

```dockerfile
# 将容器内的/data文件夹，在容器运行时，该目录会被自动挂载为匿名卷，任何向该目录中写入数据的操作，都不会被容器记录，保证容器的无状态理念
VOLUME /data
```

```dockerfile
FROM yum-centos

MAINTAINER yunhai

# 容器运行时这两个目录自动与宿主机映射
VOLUME ["/data", "/data2"]
```

```shell
docker run test

# 查看生成容器信息,在json中Mounts可以看到映射的位置
docker inspect id
```

#### EXPOSE指令

> 查看容器运行时对外提供的端口服务
>
> - 帮助使用镜像的人快速了解容器
    >
    >   `docker port 容器`

#### WORKDIR指令

> 在`dockerfile`中指定工作目录，目录切换

`WORKDIR /opt`

#### USER指令

> 改变环境，用于切换用户

```dockerfile
USER root
```

## Docker Compose

> Compose 是用于定义和运行多容器 Docker 应用程序的工具。通过 Compose，您可以使用 YML 文件来配置应用程序需要的所有服务。然后，使用一个命令，就可以从
> YML 文件配置中创建并启动所有服务。

```yaml
version: '2.1'
services:
  my-py:
    image: test:python
    container_name: test-python
    networks:
      - test-network
  nginx:
    image: nginx:latest
    container_name: test-nginx
    ports:
      - 8080:80
    volumes:
      - /data:/use/share/nginx/html
    networks:
      - test-network

networks:
  test-network:
    driver: bridge
    ipam:
      driver: default
      config:
        - subnet: 192.168.10.0/24
```

```yml
name: "kafka"
services:
  kafka:
    image: "bitnami/kafka:latest"
    container_name: kafka
    restart: always
    ulimits:
      nofile:
        soft: 65536
        hard: 65536
    environment:
      - TZ=Asia/Shanghai
      - KAFKA_CFG_NODE_ID=0
      - KAFKA_CFG_PROCESS_ROLES=controller,broker
      - KAFKA_CFG_CONTROLLER_QUORUM_VOTERS=0@kafka:9093
      - KAFKA_CFG_LISTENERS=PLAINTEXT://:9092,CONTROLLER://:9093,EXTERNAL://:9094
      - KAFKA_CFG_ADVERTISED_LISTENERS=PLAINTEXT://kafka:9092,EXTERNAL://172.17.118.127:9094
      - KAFKA_CFG_LISTENER_SECURITY_PROTOCOL_MAP=CONTROLLER:PLAINTEXT,PLAINTEXT:PLAINTEXT,EXTERNAL:PLAINTEXT
      - KAFKA_CFG_CONTROLLER_LISTENER_NAMES=CONTROLLER
    networks:
      - app-tier
    ports:
      - '9092:9092'
      - '9094:9094'
    volumes:
      - ./data:/bitnami/kafka

networks:
  app-tier:
    name: app-tier
    driver: bridge
```

- compose 文件格式的版本，这里是2.1（不是最新3）
- services 标签下可以定义多个像nginx一样的服务
- container_name 定义服务，test-python是容器名
- image 容器使用的镜像
- ports 容器端口映射(本机:容器内端口)
- volumes 目录映射
- networks 配置容器网络 network里直接用container_name 即可访问到该容器

`docker-compose up -d`运行docker-compose

## Python项目部署

```dockerfile
FROM python:3.10.13-slim-bookworm

COPY test.py /data

WORKDIR /data

CMD ["python", "test.py"]
```

> 打包时可能会因为缓存而没更新
>
> 使用`docker build --no-cache -t 'test-tag' ./`不采用缓存
>
>
>
> `docker build --progress=plain --no-cache -t 'test-tag' ./`查看命令执行的构建日志

```bash
docker run -d --name test-project -p 90:8000 test-tag
```

### 代码更新

1. 修改宿主机代码重新构建
2. 进入到已经运行的容器修改代码并重启

## CP提取日志

- 基于docker logs 导出容器内，映射的标准输出日志，以及标准错误日志

  `docker logs id > /tmp/nginx-all.log 2>&1`

- 基于`cp`指令

## 其它一些问题

> 在每个容器启动时都会存在一个映射ip，在使用nginx时不用将容器的端口映射到宿主机端口，可以直接使用映射ip来访问，查看映射ip的方法为
>
> `docker inspect id | grep -i ip`
>
> 每次容器重启或新建容器ip都会不一样

## 无状态容器

> 运行时产生的数据不重要,用不到`VOLUME`

```dockerfile
FROM centos
RUN 
CMD
```

## 有状态容器

> 运行时产生的数据需要永久保存，需要有`VOLUME`
>
> `VOLUME`为了防止运维启动时没有指定`-v`时默认有一个位置保存下来数据

## Centos镜像问题

> 由于Centos已经停止服务，所以需要修改yum源才能正常使用

```shell
curl -o /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-8.repo

cd /etc/yum.repos.d/
 
sed -i 's/mirrorlist/#mirrorlist/g' /etc/yum.repos.d/CentOS-*
 
sed -i 's|#baseurl=http://mirror.centos.org|baseurl=http://vault.centos.org|g' /etc/yum.repos.d/CentOS-*
 
 
yum clean all
 
yum makecache
```

查看[华为云](https://mirrors.huaweicloud.com/mirrorDetail/5ea14ecab05943f36fb75ee5)

