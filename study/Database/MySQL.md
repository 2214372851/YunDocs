## Windows安装MySQL

>1. 去到MySQL官网下载zip版本安装包
>
>2. 解压到存放路径
>
>3. 把解压后文件夹里的bin目录添加到环境变量中
>
>4. 在解压后的文件夹内创建`my.ini`文件
>
>  ```ini
>[mysqld]
>basedir=D:\MySQL\mysql-8.1.0-winx64\
>datadir=D:\MySQL\mysql-8.1.0-winx64\data\
>port=3306
>  ```
>
>5. 在管理员终端中执行`mysqld -install`安装系统服务
>
>6. 继续在管理员终端中执行`mysqld --initialize-insecure --user=mysql`初始化数据库文件
>
>7. 启动MySQL`net start mysql`
>
>8. 连接MySQL`mysql -u root -p`此时没有密码直接回车
>
>9. 退出连接`exit;`
>
>10. 修改root账户密码`mysqladmin -u root -p "旧密码此时没有" password "new_password"`

## 忘记Root密码时重置密码

> 1. 终端执行`mysqld --skip-grant-tables`跳过认证表
> 2. `mysql -u root -p`免密直接登录
> 3. 执行`update mysql.user set password=password("new_password") where user="root" and host="localhost";`,这里的password()是为了把明文密码转换为密钥
> 4. 执行`flush privileges;`刷新表
> 5. 使用管理员`tasklist | findstr mysql`查看进程pid
> 6. 执行`taskkill /F /PID pid_num`
> 7. 正常启动mysql

## 设置远程访问时

Plugin 'mysql_native_password' is not loaded

[参考](https://www.tubring.cn/articles/fix-php-mysql-84-mysql_native_password-not-loaded)



## 修改字符编码

```ini
[mysqld]
basedir=D:\WinApp\mysql-8.1.0\
datadir=D:\WinApp\mysql-8.1.0\data\
character-set-server=utf8
collation-server=utf8_general_ci
port=3306
[client]
default-character-set=utf8
[mysql]
# 当用户在终端执行mysql时使用的配置
default-character-set=utf8
user="root"
password=""
```



## 数据库操作

```sql
# 创建数据库
create database test charset utf8;
# 查看单个数据库结构
show create database test;
# 查看所有数据库
show databases;
# 修改数据库
alter database test charset gbk;
# 删除数据库
drop database test;
# 切换当前所在数据库
use test;

# 创建数据表
create table user(id int, username char);
# 查看单个数据表
show create table user;
desc user;
# 查看所有数据表
show tables;
# 修改数据表
alter table user modify username char(20);
# 修改字段名
alter table user change username username char(32);
# 删除数据表
drop table user;

# 向数据表添加数据
insert into user(id, username) values(1, 'bai'),(2, 'hei');
insert into user values(1, 'bai'),(2, 'hei');
# 查看表内数据
select * from user;
select id, username from user;
# 修改表内数据
update test.`user` set username='你好';
update test.`user` set username='hello' where id=1;
# 删除表内数据
delete test.`user`;
delete from user;
# 删除单条数据
delete from user where id=2;
```

## 库操作

### 系统数据库

> information_schema	虚拟库,不占用内存空间,存储的是数据库启动后的一些参数,如:用户表信息、列信息、权限信息、字段信息等；
>
> performance_schema	用于收集数据库性能参数，记录处理查询时发生的各种事件、锁等现象；
>
> test	MySQL数据库系统自动创建的测试数据库；

### 创建数据库

> create database 数据库名 chartset utf8;

数据库命名规则

> 可以由字母、数字、下划线、@、#、$
>
> 区分大小写
>
> 唯一
>
> 不能使用sql语句关键字命名
>
> 不能单独使用数字
>
> 最长128位

### 数据库相关操作

```sql
# 查看单个数据库结构
show create database test;
# 查看所有数据库
show databases;
# 修改数据库
alter database test charset gbk;
# 删除数据库
drop database test;
# 切换当前所在数据库
use test;
```

## 表操作

### 存储引擎

> 存储引擎就变的类型
>
> 查看MySQL支持的存储引擎
>
> `show engines;`
>
> 指定表类型/存储引擎
>
> `create table table_name engine=innodb`



### 语法

> 同一张表的字段名不能相同
>
> 宽度和约束条件可选
>
> 字段名和类型是必须的

```sql
create table 表名(
	字段1 类型[(宽度)约束条件],
    字段2 类型[(宽度)约束条件],
);
```

### 查看表

```sql
# 查看表结构
desc tablename;
# 查看表详情结构，可加\G单行显示
show create table tablename\G;
```

### 修改表结构

```sql
# 添加字段，加逗号可以一次添加多个字段, first添加到表的最开始，after表示添加到那个字段之后
alter table dataset add phone1 char ( 11 ) first, add phone2 char ( 11 ) after username;
# 删除字段
alter table dataset drop phone1, drop phone2;
# 修改字段类型
alter table dataset modify phone int;
# 修改字段名称与类型
alter table dataset change phone phone_new char ( 20 );
```

### 删除表

```sql
drop table tablename;
```

### 复制表

```sql
 # 连同数据一起复制
 create table copy_dataset select * from dataset;
 # 只复制结构
 create table copy_dataset select * from dataset where 1>5;
 create table copy2_dataset like dataset;
```

### 清空表

```mysql
delete from tablename;

# 清空表且恢复自增id为1
truncate tablename;
```



## 数据类型

### 数值类型

> 创建整数字段时,后面约束的5是显示数字时显示的位数没有实质约束作用
>
> unsigned	无符号
>
> zerofill	用0填充
>
> `create table tablename(id int(5) unsigned zerofill)`



> 创建浮点数时类型后面约束M(数字总个数负号不算)和D(小数点后个数)
>
> `float(255, 30)`

| 类型         | 大小                                     | 范围（有符号）                                               | 范围（无符号）                                               | 用途            |
| :----------- | :--------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :-------------- |
| TINYINT      | 1 Bytes                                  | (-128，127)                                                  | (0，255)                                                     | 小整数值        |
| SMALLINT     | 2 Bytes                                  | (-32 768，32 767)                                            | (0，65 535)                                                  | 大整数值        |
| MEDIUMINT    | 3 Bytes                                  | (-8 388 608，8 388 607)                                      | (0，16 777 215)                                              | 大整数值        |
| INT或INTEGER | 4 Bytes                                  | (-2 147 483 648，2 147 483 647)                              | (0，4 294 967 295)                                           | 大整数值        |
| BIGINT       | 8 Bytes                                  | (-9,223,372,036,854,775,808，9 223 372 036 854 775 807)      | (0，18 446 744 073 709 551 615)                              | 极大整数值      |
| FLOAT        | 4 Bytes                                  | (-3.402 823 466 E+38，-1.175 494 351 E-38)，0，(1.175 494 351 E-38，3.402 823 466 351 E+38)M最大值255,D最大值30 | 0，(1.175 494 351 E-38，3.402 823 466 E+38)                  | 单精度 浮点数值 |
| DOUBLE       | 8 Bytes                                  | (-1.797 693 134 862 315 7 E+308，-2.225 073 858 507 201 4 E-308)，0，(2.225 073 858 507 201 4 E-308，1.797 693 134 862 315 7 E+308)M最大值255,D最大值30 | 0，(2.225 073 858 507 201 4 E-308，1.797 693 134 862 315 7 E+308) | 双精度 浮点数值 |
| DECIMAL      | 对DECIMAL(M,D) ，如果M>D，为M+2否则为D+2 | 依赖于M和D的值,M最大值65,D最大值30                           | 依赖于M(数字总个数负号不算)和D(小数点后个数)的值             | 小数值          |

------

### 日期和时间类型

>表示时间值的日期和时间类型为DATETIME、DATE、TIMESTAMP、TIME和YEAR。
>
>每个时间类型有一个有效值范围和一个"零"值，当指定不合法的MySQL不能表示的值时使用"零"值。
>
>TIMESTAMP类型有专有的自动更新特性，将在后面描述。

| 类型      | 大小 ( bytes) | 范围                                                         | 格式                | 用途                     |
| :-------- | :------------ | :----------------------------------------------------------- | :------------------ | :----------------------- |
| DATE      | 3             | 1000-01-01/9999-12-31                                        | YYYY-MM-DD          | 日期值                   |
| TIME      | 3             | '-838:59:59'/'838:59:59'                                     | HH:MM:SS            | 时间值或持续时间         |
| YEAR      | 1             | 1901/2155                                                    | YYYY                | 年份值                   |
| DATETIME  | 8             | '1000-01-01 00:00:00' 到 '9999-12-31 23:59:59'               | YYYY-MM-DD hh:mm:ss | 混合日期和时间值         |
| TIMESTAMP | 4             | '1970-01-01 00:00:01' UTC 到 '2038-01-19 03:14:07' UTC结束时间是第 **2147483647** 秒，北京时间 **2038-1-19 11:14:07**，格林尼治时间 2038年1月19日 凌晨 03:14:07 | YYYY-MM-DD hh:mm:ss | 混合日期和时间值，时间戳 |

------

### 字符串类型

>字符串类型指CHAR、VARCHAR、BINARY、VARBINARY、BLOB、TEXT、ENUM和SET。该节描述了这些类型如何工作以及如何在查询中使用这些类型。

| 类型       | 大小                  | 用途                            |
| :--------- | :-------------------- | :------------------------------ |
| CHAR       | 0-255 bytes           | 定长字符串                      |
| VARCHAR    | 0-65535 bytes         | 变长字符串                      |
| TINYBLOB   | 0-255 bytes           | 不超过 255 个字符的二进制字符串 |
| TINYTEXT   | 0-255 bytes           | 短文本字符串                    |
| BLOB       | 0-65 535 bytes        | 二进制形式的长文本数据          |
| TEXT       | 0-65 535 bytes        | 长文本数据                      |
| MEDIUMBLOB | 0-16 777 215 bytes    | 二进制形式的中等长度文本数据    |
| MEDIUMTEXT | 0-16 777 215 bytes    | 中等长度文本数据                |
| LONGBLOB   | 0-4 294 967 295 bytes | 二进制形式的极大文本数据        |
| LONGTEXT   | 0-4 294 967 295 bytes | 极大文本数据                    |

**注意**：char(n) 和 varchar(n) 中括号中 n 代表字符的个数，并不代表字节个数，比如 CHAR(30) 就可以存储 30 个字符。

CHAR 和 VARCHAR 类型类似，但它们保存和检索的方式不同。它们的最大长度和是否尾部空格被保留等方面也不同。在存储或检索过程中不进行大小写转换。

BINARY 和 VARBINARY 类似于 CHAR 和 VARCHAR，不同的是它们包含二进制字符串而不要非二进制字符串。也就是说，它们包含字节字符串而不是字符字符串。这说明它们没有字符集，并且排序和比较基于列值字节的数值值。

BLOB 是一个二进制大对象，可以容纳可变数量的数据。有 4 种 BLOB 类型：TINYBLOB、BLOB、MEDIUMBLOB 和 LONGBLOB。它们区别在于可容纳存储范围不同。

有 4 种 TEXT 类型：TINYTEXT、TEXT、MEDIUMTEXT 和 LONGTEXT。对应的这 4 种 BLOB 类型，可存储的最大长度不同，可根据实际情况选择。

### 枚举类型与集合类型

字段的至只能在给定范围内选取，如单选框、多选框

> enum 单选 只能在范围内选多选一
>
> set 多选 在给定的范围内可以选择一个或者多个值

```mysql
create table user(
	name varchar(50),
    sex enum('男', '女'),
    hobby set('唱', '跳', 'rap', '篮球')
)


insert into user values ('李华', '男', '唱,跳')
```



## 约束条件

### 不允许为空

`crate table user(id int not null);`

### 默认值

`crate table user (sex enum('a', 'b') default 'a');`

### 唯一

`create table user (id int unique);`

`create table user (id int, unique(id));`

### 联合唯一

```mysql
create table user (
	id int unique,
    ip char(15),
    port int,
    unique(ip, port)
)
```

### 单列主键

> 对于默认的innodb存储来说，一张表必须存在一个主键
>
> 没有指定时会指定找一个不为空且唯一的字段当作主键

```mysql
create table user (
	id int primary key,
	name char(16));
```

### 复合主键

```mysql
create table user (
	id int,
    ip char(16),
    port int,
    primary key(ip, port)
);
```

### 自增

> 必须为主键才能设置自增

```mysql
create table user(
    id int primary key auto_increment,
    name char(16)
);
```

> 查看默认自增属性
>
> auto_increment_increment步长默认为1
>
> auto_increment_offset起始位置默认为1
>
> 设置本次会话步长
>
> `set session auto_increment_increment=5`
>
> 设置所有会话步长
>
> `set global auto_increment_increment=5`
>
> 设置移量（起始偏移量<-步长 否则就失效）
>
> `set global auto_increment_increment=5`

```mysql
show variables like 'auto_inc%';
+--------------------------+-------+
| Variable_name            | Value |
+--------------------------+-------+
| auto_increment_increment | 1     |
| auto_increment_offset    | 1     |
+--------------------------+-------+
2 rows in set, 1 warning (0.00 sec)
```

### 外键

关联并设置级联删除与级联更新

```mysql
create table project(
	id int primary key auto_increment,
    user_id int,
    foreign key(user_id) references user(id) on delete cascade on update cascade
)
```

## 表关系

### 多对一

> 外键建立在多的一方

### 多对多

> 中间表外键关联两个表，且两个外键联合唯一

### 一对一

> 外键字段唯一

## 数据的操作

### 插入数据

```mysql
insert into user(id, name)values(1, 'name');

insert into user value (2, 'name2');

inset into user(id, name) select (id, name) from user2 where id = 3;
```

### 更新数据

```mysql
update user set name='用户名', id=2 where id=1;
```

### 删除数据

```mysql
delete from tablename where id < 10;
```

### 查询数据

## 单表查询

> `distinct` 去除重复
>
> `select id+10 as add10id from user;` 查询四则运算
>
> `select concat('you id:', id, '\t', 'you name:', name) from user;` 自定义显示格式
>
> `select concat_ws(':', id, name) from user;` 用冒号连接字段

```mysql
select distinct key1, key2 from bd.user
	where 条件
	group by 分组条件
	having 过滤
	order by 排序字段
	limit n;
```

### 约束条件WHERE

```mysql
select * from user where id < 10 and name = 'mz';
select * from user where id >= 10 or id =< 12;
# id等于1或2或3
select * from user where id in (1, 2, 3);

select * from user where name is not null;

select * from user where name like '%me';
select * from user where name like 'na__';
```

### 分组GROUP BY

> MySQL 5.7.5及以上功能依赖检测功能。如果启用了ONLY_FULL_GROUP_BY SQL模式（默认情况下），MySQL将拒绝选择列表，HAVING条件或ORDER BY列表的查询引用在GROUP BY子句中既未命名的非集合列，也不在功能上依赖于它们。
>
> 　　解决方案：在命令提示符中进入到mysql后，输入
>
> ```
> SET GLOBAL sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));
> ```

```mysql
select * from user group by name;
select count(id), name from user group by name;
select sum(id), name from user group by name;
select max(id), name from user group by name;
select min(id), name from user group by name;
select avg(id), name from user group by name;
# 显示名字相同的所有人id
select name, group_concat(id) from user group by name;
```

### 过滤HAVING

```mysql
select name, group_concat(id) from user group by name having count(id) > 1;
```

### 排序ORDER BY

```mysql
# 升序
select * from user order by age asc; 
# 降序
select * from user order by age desc;
# 多字段排序
select * from user order by age desc, id asc;
```

### 限制条数LIMIT

```mysql
select * from user limit 1;
# 分页，从0开始取5条数据
select * from user limit 0, 5;
```

### 总结

- 语法顺序

  ```mysql
  select distinct 字段1, 字段2 from 库.表
  	where 条件
  	group by 分组条件
  	having 过滤
  	order by 排序字段
  	limit n;
  ```



### 正则查询

```mysql
select * from user where name regexp '^用';
```



## 连表查询

### 内连接

> 只取两张表数据中共同的部分

```mysql
select * from user inner join batch on user.age = batch.age;
```



### 左连接

> 内连接的基础上保存左表的记录

```mysql
select * from user left join batch on user.age = batch.age;
```



### 右连接

> 内连接的基础上保留右表的记录

```mysql
select * from user right join batch on user.age = batch.age;
```



### 全外连接

> 保存所有记录

```mysql
# mysql不支持
select * from user full join batch on user.age = batch.age;

# 其它做法， 左连接与右连接的数据合并
select * from user right join batch on user.age = batch.age 
union 
select * from user left join batch on user.age=batch.age;
```



## 子程序

### IN关键字

```mysql
# 判断user表中的年龄是否存在batch表中
select * from user where user.age in (select age from batch);

# 不存在的
select * from user where user.age not in (select age from batch);
```



### 运算符子程序

```mysql
# 查询user年龄大于batch表平均年龄的数据
select * from user where user.age > (select avg(age) from batch);
```



### EXISTS关键字

> 用于判断子程序中是否有数据

```mysql
select * from user
where 
EXISTS (select * from batch);
```



### 虚拟表连接

```mysql
# 把查询结果当表使用
select * from user inner join (select * from batch) as t1 where t1.age > 12;
```



## 权限管理

1. 创建账号

   - 本地账号

     ```mysql
     # 创建一个账号为dev密码为123的本地账号
     create user 'dev'@'localhost' identified by '123';
     
     # mysql -u dev -p 123
     ```

   - 远程账号

     ```mysql
     # 创建一个账号为dev密码为123的本地账号
     create user 'dev'@'192.168.10.2' identified by '123'
     # 10网段的都可以访问
     create user 'dev'@'192.168.10.%' identified by '123'
     # 所有ip都可访问
     create user 'dev'@'%' identified by '123'
     
     # mysql -u dev -p 123 -h 服务端IP
     ```

2. 授权

   >user: `*.*`
   >
   >db: `db1.*`
   >
   >tables_priv:`db1.t1`
   >
   >columns_priv:`id, name`

   ```mysql
   # 开放所有权限，除了授权
   grant all on *.* to 'dev'@'localhost';
   # 开放了所有的查询权限
   grant select on *.* to 'dev'@'localhost';
   
   # 回收查询权限
   revoke select on *.* to 'dev'@'localhost';
   
   # 开放db1数据库的权限
   grant all on db1.* to 'dev'@'localhost';
   
   
   # 开放db1.t1数据表的权限
   grant all on db1.t1 to 'dev'@'localhost';
   
   # 开放db1.t1数据表的id，name查询与age的更新
   grant select(id, name), update(age) on db1.t1 to 'dev'@'localhost';
   ```



## 视图

> 把查询结果保存为一张虚拟表后续使用

```mysql
# 不建议使用
create view test_data_table as select * from user;
```



## 触发器

```mysql
# 定义delimiter使分号不结束， //变为结束符号
delimiter //
# each row 每一行
create trigger tri after insert on user for each row;
begin
	# 提供了两个对象NEW新的数据，OLD是老的数据
	if NEW.age > 10 then
		insert into batch values ('name', NEW.age);
	end if;
end //
delimiter;
```



## 事务

```mysql
# 开启事务
start transaction;

update user set age=100 where id =3;
update user set age=110 where id =2;

# 回滚
rollback;

# 提交
commit;
```

