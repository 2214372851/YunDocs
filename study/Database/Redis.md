## CentOS 7 安装Redis

### 安装依赖

redis 是基于C语言开发, 所以要在服务器运行 Redis 需要 验证是否暗转了gcc

查看是否安装了gcc

`gcc -v`

安装

`yum install -y gcc`

### 下载并安装

进入安装目录

`cd /usr/local`

下载redis

`wget https://download.redis.io/releases/redis-6.2.6.tar.gz`

解压redis

`tar -zxvf redis-6.2.6.tar.gz`

删除压缩包

`rm -f redis-6.2.6.gz`

### 编译

进入解压出来的目录

`cd redis-6.2.6`

编译将Redis安装到 `/usr/local/redis`

`make install PREFIX=/usr/local/redis`

### 启动 Redis

#### 直接启动

安装目录下的 bin 文件夹中

`./redis-server`

#### 守护进程启动

从redis源码目录中复制 `redis.conf` 到 redis 的安装目录

`cp /usr/local/redis-6.2.6/redis.conf /usr/loacl/redis/bin`

修改配置文件, 将 `daemonize` 的值改为 `yes`

启动服务

`./redis-server redis.conf`

检查是否启动成功

`ps -ef | grep redis`

### 开机自启

进入 `/lib/systemd/system`

创建文件 `vim redis.service`

文件内容如下

```conf
[Unit]
Description=redis-server
After=network.target

[Service]
Type=forking
# ExecStart需要按照实际情况修改成自己的地址
ExecStart=/usr/local/redis/bin/redis-server /usr/local/redis/bin/redis.conf
PrivateTmp=true

[Install]
WantedBy=multi-user.target
```

设置开机自启

`systemctl enable redis.service`

启动 redis 服务

`systemctl start redis.service`

其它命令

```bash
# 查看服务状态
systemctl status redis.service
# 停止服务
systemctl stop redis.service
# 取消开机启动(卸载服务)
systemctl disabled redis.service
```

### 设置密码

修改配置文件中 `requirepass` 后面的值就是密码

重启服务

`systemctl restart redis.service`

## redis数据类型

> redis可以理解为一个全局字典，key是数据的唯一标识

### `string`类型

  字符串类型，它在Redis中是二进制安全的，也就是bytes类型，单个数据最大容量为512M

  `key:值`

  ```redis
  # 设置值
  set key value
  
  # 获取值
  get key
  
  # 分布式锁, setnx只能赋值一次
  setnx key value
  
  # 删除键值
  del key
  
  # 设置过期数据,token
  setex name seconds value
  
  # 批量设置
  mset x 1 y 2 c 3
  
  # 批量查询
  mget x y c
  
  # 追加
  append key value
  
  # 自增字符串数字
  incr key
  
  # 自减
  decr key
  
  # 自增指定值
  decrby key 10
  incrby key 10
  
  # 获取字符串长度
  strlen key
  
  
  # 比特流操作
  # 1字节=8比特
  # 1kb=1024字节
  # 1mb=1024kb
  # 1gb=1024mb
  
  # 设置键为key 的 offset位置的bit为value
  setbit key offset value
  
  # 查询key的offset的value
  getbit key offset
  
  # 查询key被设置为1的数
  bitcount key
  
  # 返回第一个数字为1或者0的bit位
  bitpos key 1
  bitpos key 0
  
  # 可以用做签到，签到时设置为1 要记录30天时
  setbit mykey 30 1
  ```

  

### `list`类型

  列表的子成员类型必须为`string`

  ```redis
  # 左添加
  lpush key value1 value2
  # 右添加
  rpush key value1 value2
  
  # 指定位置添加前，如果有多个被匹配的value那么就是从左往右走第一个
  linsert key after "被查询value" "添加值"
  
  # 指定位置添加后
  linsert key before "被查询value" "添加值"
  
  # 索引查询，正负索引都可以
  lindex key index
  
  # 列表长度
  llen key
  
  # 设置指定索引值
  lset key index value
  
  # 左移出， 队列先入先出
  lpop key
  
  # 右移出
  rpop key
  
  # 删除值为value的count个值，count为0时删除所有， 小于0是从右往左|count|个
  lrem key count value
  ```

  

### `hash`类型

  哈希类型，用于存储对象/字典，对象/字典的结构为键值对。key、域、值的类型都为string。域在同一个hash中是唯一的

  ```redis
  key: {
      域:值,
      域:值,
      域:值,
  }
  
  # 设置值field为域
  hset key field value
  
  # 取field值
  hget key field
  
  # 取所有
  hgetall key
  
  # 取指定几个
  hmget key field1 field2
  
  # 取所有值
  hvals key
  
  # 取所有域
  hkeys key
  
  # 删除域
  hdel key field
  
  # 是否存在域
  hexists key field
  
  # 自增自减
  hincrby key field 10
  hincrby key field -10
  ```

  

### `set`类型

  > 无序集合，特点：去重、无序

  ```redis
  # 添加元素
  sadd key value1 value2
  
  # 获取元素
  smembers key
  
  # 集合长度
  scard key
  
  # 随机删除， count默认为1
  spop key count
  
  # 删除值， 删除值为value的
  srem key value
  
  # 交集
  sinter key1 key2 key3
  
  # 差集
  sdiff key1 key2 key3
  
  # 并集
  sunion key1 key2 key3
  ```

### `zset`类型

  > 有序集合（`score/value`），去重并且工具`score`权重来进行排序，特点：有序、去重

  ```redis
  # 添加
  zadd key score1 value1 score2 value2
  
  # 按照score从低到高排序指定score区间
  zrangebyscore key min max
  
  # 按照score从高到低排序指定score区间
  zrevrangebyscore key max min
  
  # 按照score进行从低到高排序指定索引区间
  zrange key start stop
  
  # 按照score进行从高到低排序指定索引区间
  zrevrange key start stop
  
  # 全部从低到高
  zrange key 0 -1
  
  # 集合长度
  zcard key
  
  # 获取指定成员权重
  zscore key value
  
  # 获取指定成员从小到大的排名
  zrank key value
  
  # 获取指定成员从大到小的排名
  zrevrank key value
  
  # 获取指定score区间内成员的数量
  zcounr key min max
  
  # 给指定成员添加权重 score为添加的权重值
  zincrby key score value
  
  # 删除
  zrem key value1 value2 value3
  
  # 删除最大的count个成员
  zpopmax key count
  
  # 删除最小的count个成员
  zpopmin key count
  ```

  

## `key`操作

### 查看所有key

```bash
keys *
keys *_1
```



### 判断键是否存在

`exists key`



### 判断键对应值是什么类型

`type key`



### 删除键

`del key1 key2`



### 所有数据库 清空所有键

`fushall`



### 当前数据库 清空所有键

`flushdb`



### 查看键的有效期

`ttl key`



### 设置键的有效期

`expire key seconds`



### 修改键名

`rename key newkey`



## 数据库操作

> Redis一共有16个库，默认0~15，默认操作的是0号数据库

`select 1`



## 查看当前`redis`运行信息

`info `



## 案例

### KV缓存

> JWT、Cookie、购物车信息等，redis在内存中所以速度很快



### 分布式锁

> `setnx`存在则锁，不存在则其它线程执行， 需要`expire`设置过期时间，不是原子操作，资源不可能被一直占用，最后`delete`释放资源

```python
# python实现原子性，放到了一个事务中，出现问题会回滚
r.set('key', 'value', nx=True, ex=10)
```



### 延迟队列

> 通过有序集合来实现，让任务延迟执行
>
> 向集合中插入一个任务，并设置时间（生产者）
>
> 循环监听redis的集合当前时间是否大于任务的score时间那么该任务应该马上执行（消费者），获取到该任务后从队列中删除该任务，保证多个消费者只有一个会成功执行该任务
