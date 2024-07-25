## NumPy

数组：数据类型一致

列表：指针数，不用数据类型一致

数组的维度根据需要的索引来确定

NumPy的数组：有序，类型相同 		优先级：str>float>int

```python
np.array(object,dtype=np.float32)  	#把列表构建一个numpy数组,object是列表，dtype是类型numpy内置了一些类型	例：np.float32
np.ones(shape) #用1来填充
np.zeros(shape) #用0填充
shape = (m,n) m行n列的二维数组
shape = (m) m个元素的一维数组  [1,2,3]
shape = (m,) m个元素的一维数组
shape = (m,1) m行1列的二维数组 [[1],[2],[3]]
shape = (1,n) 1行n列的二维数组 [[1,2,3]]
shape=(2,3,4)

np.full(shape，fill_value=6) #用fill_value填充

np.eye(N=3,M=4，k=1)  #单位矩阵 生成一个三阶矩阵，默认M=N一般不用，k用来控制对角的移动

等差数
np.linspace(start,stop,num,endpoint=True)	#等差数列	start起始数	stop结束数	num取几个数	endpoint为True时保留最后一个否则不保留
np.arange(start,stop,step)	#等差数列 start起使数	stop结束数 step步长(差值)	默认不取最后一个值


随机数
np.random.randint(low,high,size)	#随机数 在low和high间取值,size等同于shape

np.random.randn(d0,d1....dn) #标准正态分布 d0一维的个数，d1二维的个数

np.random.normal(loc,scale，size) #普通正态分布 loc数学期望(接近的值) scale方差 size等同于shape

np.random.random(size) #生成0~1之间的随机数

np.random.permutation(10) #生成一组随机索引
```

ndarray的属性

- ndim：维度

- shape：形状

- size：总长度

- dtype：元素类型

  ```python
  arr = np.random.randint(0,100,(5,4,3))
  
  arr.ndim #获取维度
  arr.shape #获取形状
  arr.size #获取总长度
  arr.dtype #获取数组元素类型
  type(arr) #获取数组类型
  ```

  ### 索引

```python
arr = np.array([[1,2,3],[4,5,6]])
#列表的索引方式
arr[0][0]
#numpy特有的索引
arr[0,0]=1  #赋值
arr[[1,2]]
#BOOL列表作为列表索引访问,True对应的值会被返回
bool_list = [True,False,True,False,True]
arr[bool_list]
```

### 切片

所有切片都是左闭右开区间

```python
#行切片
arr[0:2]
#列切片
arr[:,0:2] #:从头切到位，前面的维度用：最后一个正常切片
#数据反转
arr[::-1]
[1, 2, 3]
[3, 2, 1]
```

### 变形

```python
arr.reshape(shape=(4,5)) #标准写法，注意元素个数
arr.reshape(4,5)
```

### 级联

```python
arr1 = [[1,2,3],[4,5,6]]
arr2 = [[1,2,3],[4,5,6]]

np.concatenate((arr1,arr2),axis=0) #axis默认为0纵向连接，等于1时是横向连接
np.hstack((arr1,arr2))#横向连接  数组的行数要一致
np.vstack((arr1,arr2))#纵向连接  数组的列数要一致
```

### 切分

```python

arr2 = [[1,2,3],[4,5,6],[1,2,3],[4,5,6]]
a1,a2 = np.split(arr2 ,indices_or_sections=2，axis=0)#indices_or_sections切割的份数

a1,a2 = np.split(arr,indices_or_sections=[1,3]，axis=1)#1前面的是一列1~3是一列3后面的是一列(多用于横向切割维度内个数为不能等分的)
np.hsplit(arr,indices_or_sections=[1,3])#纵向切分
np.vsplit(arr,indices_or_sections=[1,3])#横向切分
```

### 副本

所有赋值运算会改变原数据

可以使用copy()函数创建副本

```python
copy_arr = arr.copy()
## list拷贝
import copy
## 浅拷贝
copy_list = copy.copy(data_list)
## 深拷贝
deep_copy_list = copy.deepcopy(data_list)
```

### 聚合操作

```python
#求和
arr.sum()
arr.sum(axis=0) #求列方向的和，为1时是行
#最大值
arr.max()
#最大值索引 arr[arr.argmax()] == arr.max()
arr.argmax()
#最小值
arr.min()
#最小值索引	arr[arr.argmin()] == arr.min()
arr.argmin()
#平均值
arr.mean()
#标准方差(标准差) ((a1-mean)**2+(a2-mean)**2......(an-mean)**2)/n 数据波动
arr.std(axis=1)
#方差
arr.var()
#中位数
np.median(arr)
```

### 广播机制

- 为缺失的维度补1
- 假定缺失的元素用已有的值填充

```python
#矩阵运算
np.dot(arr1,arr2)
```

### 排序

```python
#改变原始数据
print(arr)
[1, 2, 3, 4].sort()
arr.sort()
print(arr)
#不改变
print(arr)
new_arr = np.sort(arr)
print(arr， new_arr)
#部分排序 k为正，排序最小的k个数，k为负，排序最大的k个 后面跟上切片[:k],[-k:]
np.partltion(arr,k)
np.partltion([1, 2, 3, 4], [:3])
```

### 数据保存

```python
import numpy as np

arr = np.array([1, 2, 3, 4])
## json , xml....
## name.npy
np.save('name.npz', arr ) ## 保存numpy文件
np.load('name.npz.npy')	## 读取numpy文件
```

#### json保存

```python
import json
## json方式保存数据
with open('name.json', 'w', encoding='utf-8') as f:
    f.write(
        json.dumps(arr.tolist())
    )
## json方式读取数据
with open('name.json', 'r', encoding='utf-8') as f:
	print(np.array(json.loads(f.read())))
```



## Pandas

### Pandas的数据结构

Numpy array 提供了运算基础

超集 -> 原有基础进行深度封装的合集

pandas 提供了业务逻辑的处理方法

Series	一维

Data Frame	二维

#### Series

类似于一维数组的对象，一维数组的强化版，增加了像字典一样的key-value的访问机制

字典：无序的集合

##### Series的创建

```python
 #列表创建，name改变a不变，a是副本
name=['12','67','89']
a = Series(name)
#array创建，arr改变b改变，b是引用
b = Series(arr)
#index是显性索引，没有手动设置，默认显示隐性索引
c = Series(data=name,index=['z','x','c'])
#字典构造 index的优先级高于字典的键值
dic={'z':'a'}
d = Series(dic)
#z | a
```

##### Series的索引和切片

###### 索引

Series访问完成兼容numpy数组访问

```python
#显式索引访问，类似字典访问
d['z']
#使用loc，配合显式索引
d.loc['z']
d.loc[['z']]
#使用iloc，隐式索引访问
d.iloc[0]
d.iloc[[0]]
#使用带索引的bool访问,没有索引会报错，也可以直接用array和列表代替bool
bool = Series(data=[True,True],index=['z','x'])
name[bool]
#bool访问一般配合表达式使用
name[name > 60]
```

###### 切片

```python
#数组切片
a[0:2]
#字典 索引使用显式索引的都是闭区间
c['z':'c']
#显式索引loc访问
c.loc['z':'c']
#隐式iloc访问 都是开区间
c.iloc[0:2]
```

###### Series属性

```python
#显示形状
c.shape
#显示元素个数
c.size
#显示显式索引 获取到的可以当列表用
c.index
(c.index=='a').any()  #如果有a这个索引返回True，没有any返回的是一个'列表'
#显示数组
c.values
#查看前n个和后n个，切片操作，一般用于查看数据结构
c.head(2)
c.tail(2)
#pd.isnull,pd.notnull,或者自带isnull(),notnull()函数检测缺失数据
any() 判断bool列表中是否至少存在一个True
all() 查看bool列表是否全是True

c.isnull().any()	#判断是否存在一个空值，为空返回True
c.notnull().all() 	#判断是否全部不为空，为空返回False

#name属性往往起标识用让你知道这个数据是什么

#根据值排序
c.sort_values(ascending=False)	#False是降序默认为True
#根据索引排序
c.sort_index(ascending=False)	#False是降序默认为True
#统计值的出现次数
R	最近消费时间
F	频率
M	消费金额

c.value_counts()	#统计次数
```

###### Series运算

```python
#Series和一个数运算 和广播机制一致
#Series和numpy运算 同等长度：隐式索引对齐（与广播相似）
c.value #是一个numpy类型
#Series和Series运算，显式索引对齐 a找a去计算 s1有s2没有的索引相加就为NaN
s1 = Series(data-np.random.randint(0,10,size=5),index=list("abcde"))
s2 = Series(data-np.random.randint(0,10,size=5),index=list("abcde"))
s1 + s2
NaN和任何值运算都是NaN
#a找a去计算 s1有s2没有的索引相加fill_value=0就为有值那一个设置空值为0
s1.add(s2,fill_value=0)	#加

s1.sub(s2)	#减

s1.mul(s2)	#乘

s1.div(s2)	#除

#Series也支持聚合

#Series和DataFrom都支持扩展，类似列表赋值
score['z'] = 0
```



#### Data Frame

Data Frame是一个表格型的数据结构，可以看做是,由Series组成的字典,共用同一个索引 。Data Frame由按一定顺序排列的多行数据组成。设计初衷是将Series从一维拓展到多维，Data Frame既有行索引，也有列索引。

- 行索引：index

- 列索引：columns

- 值：values（numpy的二维数组）

  ```python
  dic={
      'a':Series([1,2,3])
      'b':Series(['a','b','c'])
  }
  ```

  

##### Data Frame的创建

```python
DataFrame(data,index,columns)	#index行标签，columns列标签
df.columns #读取列标签
df.index #读取行标签
#从文件读取DataFrame对象
pd.read_csv() #csv
pd.read_table()	#txt
df = pd.read_excel(header=0,index_col=0,sheet_name=0)	#excel header设置哪行作为列标签，index_col设置哪列作为行标签,sheet_name设置读取的是哪张表里的可以用索引可以写名字
df.to_excel('路径(保存的位置)')
pd.read_sql
```

##### 使用Series构建Data Frame

```python
#Series里的name在转换为DataFrame会变成列索引
```

###### Data Frame的索引

对列进行索引，可以将Data Frame的列获取为一个Series，返回的Series拥有原Data Frame相同的索引，且name属性已经设置好了，就是相应的列名

```python
#用字典的方式访问
df['a']
#使用标签列表访问列
df[['a','b']]
#属性访问
df.a
```



###### 对行进行索引

```python
#使用loc显式
df.loc[0]
#使用iloc
df.iloc[0]
```



###### 对元素索引的方法

```python
#先行后列
df['a','B']
#使用loc
df.loc['a','B']
df['B'].loc['a']	#间接访问，赋值可能出现问题
#使用iloc
df.iloc[0,1]
```

##### 切片

```python
#标签处理的切片都是闭区间后不取
```

直接用中括号时：

- 索引表示的是列索引
- 切片表示的是行切片

```python
df['A','B']#访问不了列
#行切片
df.loc['a','b']
#列切片和二维数组一样，先行后列
df.loc[:,'B']
#bool访问索引对齐
```

##### Data Frame运算

```python
DataFrame和一个数(广播)

DataFrame和一个数组(numpy、Series)
如果行形状一致可以运算 (numpy)
与Series运算要注意索引对齐 axis=0行索引对齐
df.add(s1,axis=0)

DataFrame和DataFrame(索引对齐,不分方向)
```

### pandas缺失值

NaN不参与运算，参与运算的是np.nan，且np.nan和任何运算都是np.nan，None是一个对象，np.nan是一个浮点型

类型强制统一numpy且为空的时候浮点型的计算效率更高

pandas会自动把None自动优化为nan

```python
#查看DataFrame的每一列元素类型
df.dtypes
```

```python
#查看行方向空值，查看列时为1
df.isnull().any(axis=0)
#默认删除行，axis控制方向，当any变为all时要一行全是空值才删除
df.dropna(axis=0,how='any')
#使用一个数来填充空值
df.fillna(value=10)
#通常使用每一列的聚合指标来对每一列填充,索引对齐填充空值
df.fillna(value=user.mean())
#相邻值来填充,axis是轴，backfill、ffill前两个是向后取值填充，后面的是向前，和轴有关系
df.fillna(axis=0,method='ffill')
```

### 多层级索引

```python
#设置0和1行为列索引，设置0和1行为行索引
df = pd.read_execl('data.xlsx',header=[0,1]，index_col=[0,1])

df.columns
```

![image-20220529005517689](/img/image-20220529005517689.png)

#### 创建多层级索引

```python
#使用数组
arr = [['上半年','上半年','上半年','下半年','下半年','下半年'],['收入','成本','费用','收入','成本','费用']]
pd.MultiIndex.form_arrays(arr)
#使用tuple(元组)
tuples = (('上半年','收入'),('上半年','成本'）,('上半年','费用'),('下半年','收入'),('下半年','成本'）,('下半年','费用'))
pd.MultiIndex.form_tuples(tuples)

#使用product(推荐)
columns = pd.MultiIndex.form_product([['上半年','下半年'],['收入','成本','费用']])
data = np.random.randint(0,1000,size=(3,6))
index = ['92#','95#','90#'] #index =3 columns=6
DataFrame(data=data,index=index,columns=columns)
```

### Series操作

```python
#取92#上半年的收入，元组来表达
df2 = df.loc[92#]
df2[('上半年','收入')]
#也可以把多级索引变成单级索引
df2['上半年']['收入']
#切片
df[('上半年','收入'):('下半年','收入')]
#同时获取值
df[[('上半年','收入'),('下半年','收入')]]
```

### Data Frame的操作

![image-20220529012545678](/img/image-20220529012545678.png)

```python
index = ('期中','张三')
column = ['java']
df.loc[index,column]
df.set_index('a')	#把a列设置为行索引
#隐式索引,只有顺序没有层级，永远单ch
df.python.unique()  #去重
df.iloc[0,1]#拿第一行和第二行
df.iloc[(0,0)]#拿第1行的第1个值
```

多层级的索引变性(stack)

```python
#把列索引变成行索引，默认等于-1，把多级索引的第一个索引变下去 从里往前数为level的值，会自动过滤空值
df.stack(level=-1)
```

![image-20220529014033830](/img/image-20220529014033830.png)

```python
#把行索引变成列索引,默认等于-1，把多级索引的第一个索引变上去，有空值会给你变成空值
df.unstack(level=-1)
```

![image-20220529013734688](/img/image-20220529013734688.png)

### pandas的汇总操作

numpy级联不好用

pandas拼接分为两种

级联：pd.concat 	,pd.append

合并：pd.merge 	,pd,join

#### 使用pd.concat()级联

级联方向上的形状不同，同样可以连接

##### 简单级联

```python
#objs是要参与级联的pandas对象的列表、元组,可以通过axis改变方向
pd.concat((score1,score2),axis=0)
#忽略索引，重新索引原始表的索引没意义,避免重复
pd.concat((score1,score2),ignore_index=True)
#原来的索引有意义又要避免重复可以设置成多层级索引
pd.concat((score1,score2),keys=['第一天','第二天'])
```

##### 不匹配级联

```python
#out连接，外连接，保留连接表的所有字段，缺失值补空（默认）
pd.concat((score1,score2),join='outer')
#inner连接，内连接，只保留公共字段，会去空值会导致数据丢失
pd.concat((score1,score2),join='inner')
#自定义连接,join_axis只能传入列表，列表里要是index类型数据
pd.concat((score1,score2),join_axis=[pd.Index(['d','e']))
#左连接，右连接,只保留其中一张表的字段（两张表连接）
pd.concat((score1,score2),pd.concat((score1,score2),join=[score1.columns]))               
#使用append连接（纵向连接）
score1.append(score2)
```

#### 使用pd.merge()合并(整合到一张表)

```python
#合并只和列有关，参与合并的两张表至少有一列有对应关系（内容上有一致，一对一，一对多，多对多里的一种）
```

![image-20220529022829316](/img/image-20220529022829316.png)

```python
#一对一
pd.merge(tab1,tab2)
```

![image-20220529023512266](/img/image-20220529023512266.png)

![image-20220529023602291](/img/image-20220529023602291.png)

```python
#多对一
pd.merge(tab1,tab3)
```

![image-20220529023710687](/img/image-20220529023710687.png)

![image-20220529023749538](/img/image-20220529023749538.png)

```python
#多对多
#默认把字段相同的列合并，如果有多个列标签相同会同时参考
pd.merge(tab3,tab4)
```

![image-20220529023837890](/img/image-20220529023837890.png)

```python
#key的规范化
#根据on设置参考的列标签
pd.merge(tab3,tab4,on='手机型号')
```

![image-20220529024156472](/img/image-20220529024156472.png)

![image-20220529024443506](/img/image-20220529024443506.png)

```python
#使用left_on和right_on来指定两列来合并，左右两边的key都不相同时用
#如果合并的列不同名会都保留
r1=pd.merge(tab3,tab4，left_on='型号',right_on='产品')
#删除型号一列,默认删除行，所以要设置axis值,为True时修改上面的值r1改变
r1.drop(labels=['型号'],axis=1,inplace=True)
#left_index,用索引去和某一列的值做参照合并时用
r1=pd.merge(tab3,tab4，left_index=True,right_on='产品')
```

#### 内合并和外合并

内合并：保留两者都有的key（默认模式）

```python
#inner保留相同的内容
#concat保留相同的标签
#outer保留内容并集（保留所有）（外合并）
#left/right左右合并，只保留左表的或者右表的
pd.merge(tab1,tab2,how='inner')
```

#### 列冲突

```python
#对重复字段命名
pd.merge(tab3,tab4,on='手机型号'，suffixes=['_下半年','_上半年'])
```

![image-20220529030215213](/img/image-20220529030215213.png)

### pandas数据处理

原始数据基本步骤：

1. 空值处理
2. 重复值处理
3. 异常值处理

#### 删除重复元素

```python
#查询重复行
#没有axis所以重复值只在行内查找，默认保存第一次出现的值，当keep='last'时保留最后一个，反之first，返回值是列表
df.duplicated(kepp='last')
#直接删除
df.drop_duplicates(keep='last')
#查询一行里某几列值相同
df.duplicated(subset=['python','java','php'])
```

#### 替换索引

```python
#替换列索引
df.rename(columns={'name':'姓名'})
#替换行索引
df.rename(index={'张三':'李四'})

mapper = {
    '张三':'tom',
    '姓名':'名字'
}
#默认替换了行索引，axis=1替换列索引
df.rename(mapper=mapper,axis=1)
#替换多层级索引
mapper = {
    '张三':'tom',
    '姓名':'名字',
    '上学期':'下学期'
}
#level设置类还是行方向的多层级索引的层级
df.rename(mapper=mapper,axis=1,level=-2)
```



#### 映射

```python
#replace属于fillna的高级版本

#直接替换字符串
df.replace(to_replace='tom',value='TOM')

#替换数字
df.replace(to_replace=77,value=100)

#使用列表来替换
df.replace(to_replace=['lucy','tom','jack'],value=['lucy1','tom1','jack1'])

#使用字典替换
map_dict = {
    'lucy':'LUCY'
}
df.replace(to_replace=map_dict)

#使用字典处理某一列,name列里的lucy才替换
df.replace(to_replace={'name':'lucy'},value='LUCY')

#正则替换,使用正则要开启regex=True，表达式前要加r
df.replace(to_replace=r't.*',regex=True,value='con')
```

```python
#map是Series的函数，通常用来对某一列进行整体映射处理
map_dict{
    'tom':'biejing',
    'lucy':'shanghai'
}
map_dict.get('tom')   #返回值---biejing
map_dict.get('lsad')   #返回值---none
map_dict.get('lashd','meiyou')   #返回值---meiyou

#找到name列,添加到df，字典里的映射只能多不能少，少了会填空值
df['dizhi'] = df.name.map(map_dict)

#使用函数
#字典少了的解决办法,map可以接收函数，可以用来自定义得到的值（下图评分等级）
def map_name(name):
    return map_dict.get(name,name)  #如果字典里有则返回字典里的，没有则返回传入值
df['name'].map(map_name)

#lambda 表达式，传入x返回x同学
df.name.map(lambda x:x+'同学')
```

![image-20220605235723509](/img/image-20220605235723509.png)

```python
#transform()
#只能传入函数
df.name.transform(lambda x:x+'同学')
```

对一个Data Frame做遍历的时候，默认便利的是它的列标签(默认遍历他的键，可以把dataframe当做字典来用)

```python
for i in df:
    print(i)

for k,v in df.items():
    print('键'+k)
    print('值'+v)
```

### 使用聚合函数对数据异常值检测和过滤

```python
#每列的信息
df.info
#只对可以运算的列有效，查看数据基本信息
df.describe()
#异常值通用的界定方法：如果数据是呈标准正态分布的，明显不同的数据std方差  |data| > 3*|data.std()|
np.abs(df) > 3*data.std()#每一列的每一个数都和该列的三倍方差比较(比较时索引对齐)
#离群点的检测：数值型数据都可以使用离群点的方法来检测异常
```

```python
#take()排序,接收一个索引列表不是标签列表
df.take([0,1,0,1],axis=0)
#配合np.random.randint()函数，配合take函数实现随机
df.take(np.random.randint(5))
#当dataframe规模很大时，直接使用np.random.randit()函数，配合take()实现随机抽样
```

### 数据分类/组处理

```python
#根据 分类 分组，产生一个分组对象
a = df.groupby('分类')
b = a.groups #查看分组对象的信息
#分组之后一定聚合,聚合只保留可运算的列
b.mean()
#对不同的列进行不同的聚合运算
b.agg({'身高':'mean',
      '体重':'max'
      })

#多字段分组
a = df.groupby(['分类','学科'])
```

透视表

```python
#透视表，数据汇总
pd.pivot_table(data=df,values='分数',index='分类',columns='学科',aggfunc='mean'，fill_value=0)#空值填0
```

交叉表

```python
#计算分组频率
pd.crosstab(index=df['班级'],columns=df['姓名'])
```

### 高级聚合

```python
#两个相同
df.groupby('分类')['name'].mean
df.groupby('分类')['name'].apply(np.mean)
#传函数,函数接收的是每一个分组
def asy(x):
    print(x)
df.groupby('分类')['name'].apply(asy)
#transform也传函数，返回值是全数值
```

