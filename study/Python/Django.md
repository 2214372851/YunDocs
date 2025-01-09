# Django学习笔记

## 1	创建项目

	终端：django-admin startproject 项目名
	Pycharm：新建项目选择Django

## 2	默认文件介绍

	HelloWorld
	|-- HelloWorld
	|   |-- __init__.py
	|   |-- asgi.py	[接收网络请求](不用动)
	|   |-- settings.py	[项目配置](经常使用)
	|   |-- urls.py		[URL和函数的对应关系](经常使用)
	|   `-- wsgi.py	[接收网络请求](不用动)
	`-- manage.py	[项目的管理，启动项目、创建app、数据管理](经常使用)

## 3，APP

	创建APP：python mange.py startapp app名
	
	HelloWorld
	|-- HelloWorld
	|   |-- __init__.py
	|   |-- settings.py
	|   |-- urls.py
	|   `-- wsgi.py
	|--app01
	|	|--__init__.py
	|	|--admin.py		[固定，不用动](django默认提供admin后台管理)
	|	|--apps.py		[固定，不用动](app启动类)
	|	|--migrations	[固定，不用动](数据库变更记录)
	|	|	`--__init__.py
	|	|--models.py	[重要](对数据库的操作)
	|	|--tests.py		[固定，不用动](单元测试)
	|	`--views.py		[重要](函数)
	`-- manage.py

## 4	快速入手

### 4.1	注册app[settings.py    ]

settings.py 中 INSTALLED_APPS 添加：app名.apps.AppConfig(app目录下apps文件里的AppConfig类)

### 4.2	编写URL和视图函数对应关系[urls.py]

```python
	#	导入app里的views文件
	from app01 import views
	#	www.xxx.com/index -> 函数	path里index是视图函数名
	urlpatterns = [
		path('index/',views.index)
	]
    #path不够用的时候导入re_path可以使用正则表达式来判断
    #include的作用是设置从路由，book是app名，app下的urls.py文件（路由分发）
    urlpatterns = [
		path('index/',include("book.urls"))
	]
```

### 4.3	编写视图函数[views.py]

		def 函数名 （request）：
			pass

### 4.4	启动

		终端：python manage.py runserver
		Pycharm直接启动

## 5	templates目录(模板)

	from django.shortcuts import render,HttpResponse
	render:返回html
	HttpResponse:返回字符

### 5.1	在app目录下创建templates文件夹

		创建HTML文件

## 6	静态文件

	图片
	js
	css
	插件

### 6.1	创建static文件夹

		一般文件夹类包含
		img文件夹
		js文件夹
		css文件夹
		plugins文件夹

### 6.2	引用静态文件

		{% load static %}
		导入静态文件通常在HTML文件前加入{% load static %}，路径为{% static 'img/1.png' %}

## 7	模板语法

### 7.1	传入后端数据(data)

		data为字典
		例：data = {'n1':'book'}		data = {'n1':data}
		return render(request,'1.html',data)

### 7.2	前端接收

```html
    {{ 字典键 }}
例：{{ n1 }}
传入的是字典n1后面加上点和要取的值的索引(字典键)
{{ n1.n1 }}
取所有键
{% for child in n1.keys %}
<span>{{ child }}</span>
{% endfor %}
取所有值
{% for child in n1.values %}
<span>{{ child }}</span>
{% endfor %}
取所有键值
{% for k,v in n1.items %}
<span>{{ k }} = {{ v }}</span>
{% endfor %}

传入的是列表n1后面加上点和要取的值的编号(列表值的位置0，1，2)
{{ n1.0 }}
可以用for循环把列表里的每个元素的值都取到
<div>
    {% for child in n1 %}
    <span>{{ child }}</span>
    {% endfor %}
</div>
要有开头{% for child in n1 %}和结尾{% endfor %}接收值要用{{ }}

支持判断语句
{% if n1 == 'xxx' %}
<h1>xxx</h1>
{% elif n1 == 'yyy' %}
<h1>yyy</h1>
{% else %}
<h1>kkk</h1>
```

## 8	请求和响应

### 8.1	请求类型

	request.method

### 8.2	接收数据（接收的数据为QueryDict类型）

	GET请求
		request.GET
		获取数据（单个项数据用get不用getlist）
		request.GET.getlist('user')
		#接收到的数据生成字符串
		request.GET.urlencode()
	POST请求
		request.POST
		获取数据（单个项数据用get不用getlist）
		request.POST.getlist('user')

### 8.3	返回数据(需要导包)

	from django.shortcuts import render,HttpResponse,redirect
		render:返回html
		HttpResponse:返回字符
		redirect:重定向

## 9	数据库操作

### 9.1	安装第三方模块

	pip install mysqlclient

### 9.2	ORM

	可以创建、修改、删除数据库中的表
	可以操作表里的数据
	无法操作数据库

#### 9.2.1	创建删除数据库

##### 9.2.1.1	创建数据库

		create database 库名称；
		create database if not exists 库名称；#如果不存在该库，则创建

##### 9.2.1.2	删除数据库

		drop database 库名称；

##### 9.2.1.3	选择使用数据库

		use 库名称；

##### 9.2.1.4	显示当前使用的数据库

		select database（）；

#### 9.2.2	Django连接数据库

		修改settings.py文件里的DATABASES
			DATABASES = {
				'default': {
					'ENGINE': 'django.db.backends.mysql',	#数据库类型
					'NAME':'Learm',		#数据库名
					'USER':'root',		#账号
					'PASSWORD':'xxxxx',	#密码
					'HOST':'127.0.0.1',	#数据库地址
					'POST':'3306'		#数据库端口号
					}
				}

#### 9.2.3	Django操作表

##### 9.2.3.1	创建表

```python
	#在models.py文件里创建类
		#表名为APP名_类名，例：app01_User
		class User(models.Model):
			#列名			   数据类型    数据长度
			name = models.CharField(max_length=32)
			password = models.CharField(max_length=64)
			age = models.IntegerField()
			#time = models.DateTimeField()	包含年月日时分秒
            time = models.DateField()	#只包含年月日
```

执行命令

```cmd
		python manage.py makemigrations
		python manage.py migrate
```

##### 9.2.3.2	删除表或列

		注释了类重新执行命令
		
		新建一列
		
			设置默认值
			name=models.CharField(default=’xxx’)
			或者设置可以为空
			name=models.CharField(null=True,blank=True)
		调整数据表结构修改类即可
			新建数据
			类名.objects.create(name=’张三’)

##### 9.2.3.3	新建数据

		类名.objects.create(name='我',pasword='123',age='12')
		如果有默认值则可以不写他的值

##### 9.2.3.4	删除数据

		筛选删除
						 条件
			类名.objects.filter(id=1).delete()
		全部删除
						 全部
			类名.objects.all().delete()

##### 9.2.3.5	获取数据(QuerySet类型)

###### 9.2.3.5.1	QuerySet类型 -> 数据列表

```python
	全部获取
		类名.objects.all()
		可以用for循环获取数据
		for obj in 类名.objects.all():
			print(obj.id,obj.name,obj.password,obj.age)
```

```python
		
	筛选获取
		data_list = 类名.objects.filter(id=1) 
		#多条件筛选方法一
        data_list = 类名.objects.filter(phone="12695478956",id=1)
        #多条件筛选方法二
        #data_dict = {'phone':"12695478956",'id'=1}
        #data_list = 类名.objects.filter(**data_dict)
        #给字典赋值
        #data_dict["phone"]=12695478956
        对于数字(int)
		data_list = 类名.objects.filter(id=12) #等于12
        data_list = 类名.objects.filter(id__gt=12) #大于12
        data_list = 类名.objects.filter(id__gte=12) #大于等于12
        data_list = 类名.objects.filter(id__lt=12) #小于12
        data_list = 类名.objects.filter(id__lte=12) #小于等于12
        对于字符串(str)
        models.PrettyNum.objects.filter(mobile__startswith="1999")  #以1999开头
		models.PrettyNum.objects.filter(mobile__endswith="999")	#以999结尾
        models.PrettyNum.objects.filter(mobile__contains="99")	#包含99的
        models.PrettyNum.objects.filter(mobile__icontains="99")
        #不区分大小写包含
```

```python
	 #如果只有一个数据
    #None 表示的含义，更多的是一种不存在，是真正的空，而不是空列表（[]）的空，也不是空的字符串
		data_list = 类名.objects.filter(id=1).first()
		print(data_list.id,data_list.name,data_list.password,data_list.age)
     #判断数据是否存在在数据库(返回	数据/None)
		data_list = 类名.objects.filter(id=1).exists()
     #判断数据是否存在排除自己(返回	数据/None)
    #id!=2 and phone="12695478956"
		data_list = 类名.objects.filter(phone="12695478956").exists(id=2)
```

###### 9.2.3.5.2获取到的有多少条数据

```python
类名.objects.all().count()
类名.objects.filter(id=1).count()
```

##### 9.2.3.6更新数据

		筛选更新
			类名.objects.filter(id=1).updata(age=999)
			
		全部更新
			类名.objects.all().updata(password=666)

##### 9.2.4	部门管理实例

	多表链接
		数据库存入ID（常见节省存储开销）（耗时）（数据库范式）
		数据库存入名称（加速查找，允许数据冗余）
		约束
			无约束

```python
id = models.IntegerField(verbose_name='部门id')
```

			有约束
			用到ForeignKey列名自动加下划线列名	例：depart_id

### 9.3	显示为对象时

```python

depart = models.ForeignKey(to='depatments',to_field='id')
#ModelForm打印有约束的字段时在models.py定义的时候在那张表的类里面要加上
def __str__(self):
    #title是表赋值的时候定义的
    return self.title
```

部门被删除员工处理：一起删除（级联删除）

```python
depart = models.ForeignKey(to='depatments',to_field='id',on_delete=models.CASCADE)
```

置空

```python
depart = models.ForeignKey(to='depatments',to_field='id',null=True,blank=True,on_delete=models.SET_NULL)
	
```

Django里的约束：性别（1代表男，2代表女）

```python
gender_choices = ((1,'男'),(2,'女'))
gender = models.SmallIntegerField(verbose_name='性别',choices=gender_choices)
```

### 9.4	数据库元组套元组

![image-20220506232826504](https://gitee.com/yinhanorsuli/pic-go/raw/master/img/image-20220506232826504.png)

```python
# 在django里用get_字段名称_display()可以自动把1输出男2输出女
obj.get_gender_display()
```

### 9.5	数据库时间

#### 9.5.1	在python里datatima转字符串

```python
obj.time.strftime("%Y-%m-%d-%H-%M")		#%Y-%m-%d年月日
```

#### 9.5.2	django模板语法里

```python
obj.time|date:"Y-m-d H:i:s"
```

## 10	urls.py

	url支持正则表达式

```python
path('zhuce/<int:nid>/list', zhuce)

#views.py文件里定义函数时接收即可
def zhuce_list(request,nid)：
	pass
```

## 11	模板的继承

### 11.1	定义母版

a.html

定义所需的js与css

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>title</title>
    <!--在母版里{% block css %}{% endblock %}类似于占位符，用于一些子版里才用得到的css导入-->
    {% block css %}{% endblock %}
</head>
<body>
<!--在母版里{% block content %}{% endblock %}类似于占位符-->
{% block content %}{% endblock %}
<!--在母版里{% block js %}{% endblock %}类似于占位符，用于一些子版里才用得到的js导入-->
{% block js %}{% endblock %}
</body>
</html>
```

### 11.2	继承母版

```html
<!--在子版里{% extends "a.html"%}用来继承母版-->
{% extends "a.html"%}

<!--在子版里{% block css %}{% endblock %}中间用来书写应该在母版里{% block css %}{% endblock %}的位置该写的css-->
{% block css %}
<style></style>
{% endblock %}

<!--在子版里{% block content %}{% endblock %}中间用来书写应该在母版里{% block content %}{% endblock %}的位置该写的HTML-->
{% block content %}
<div>
    title
</div>
{% endblock %}
<!--在子版里{% block js %}{% endblock %}中间用来书写应该在母版里{% block js %}{% endblock %}的位置该写的JavaScrip-->
{% block js %}
<script type="text/javascript"></script>
{% endblock %}
```

可以用多个`{% block content %}{% endblock %}`

## 12	Django组件

- Form(字段全部需要自己写)
- ModelForm(字段可以自动生成)

### 12.1	Form(验证时方便)

#### 12.1.1	views.py

```python
from django import forms
class MyFrom(forms.Form):
    #在html里会帮我们显示input输入框
    user = forms.CharField(widget=forms.Input)
    pwd = forms.CharField(widget=forms.Input)
    email = forms.CharField(widget=forms.Input)
    
def user(request):
    if request.method == 'GET':
        #实例化类
        form = MyFrom()
        #把form传入html
        return render(request,'a.html',{"form":form})
    
```

#### 12.1.2	a.html

```html

<from method="post">
    <!--就不用手写input标签，直接导入 -->
    {{ from.user }}
    {{ from.pwd }}
    {{ from.email }}
</from>
```

```html

<from method="post">
    <!--就不用手写input标签,可以循环类里的自动创建input标签 -->
    {% for field in form %}
    {{field}}
    {% endfor %}

</from>
```

### 12.2 	ModelForm(增删改，最简洁)

#### 12.2.1	models.py

```python
from django.db import models

# Create your models here.

class userinfo(models.Model):
    # 员工表
    name = models.CharField(verbose_name='姓名',max_length=16)
    password = models.CharField(verbose_name='密码',max_length=64)
```

#### 12.2.2	views.py

```python
from django import forms
class MyFrom(forms.ModelForm):
    #required=True输入不为空
    xx = models.CharField(verbose_name='父母',max_length=16,required=True)
    #不仅支持去models里获取字段也能自定义字段
    class Meta:
        model = UserIfo
        #fields有三种写法
        #1、fields = "__all__"   取全部字段
        #1、exclude = ['name']	排除name字段
        fields = ['name','password','xx']
    	#定义标签的属性(逐一添加属性)
        widgets = {
            'name':forms.TextInput(attrs={"class":"form-control"})
            'password':forms.PasswordInput(attrs={"class":"form-control"})
        }
    def __init__(self, *args, **kwargs):
        super().__init__(*args,**kwargs)
        # 循环找到所有插件，添加class属性值
        # name是字段名
        for name, field in self.field.items():
            #字段为password的不加class属性
            if name == "password":
                continue
             #                       添加class属性 			 显示数据库verbose_name
            field.widget.attrs = {"class":"from-contorl","placeholder":field.label}
        
        
def user(request):
    if request.method == 'GET':
        #实例化类
        form = MyFrom()
        #把form传入html
        return render(request,'a.html',{"form":form})
```

```html

<from method="post">
    <!--就不用手写input标签，直接导入 -->
    <!--{{ from.user.label }} 显示数据库verbose_name -->
    {{ from.user.label }}:{{ from.user }}
    {{ from.pwd }}
    {{ from.email }}
</from>
```

```html

<from method="post">
    <!--就不用手写input标签，直接导入 -->
    <!--{{ from.user.label }} 显示数据库verbose_name -->
    {% for field in form %}
    {{ field.label }}:{{ field }}
    {% endfor %}
</from>
```

### 12.4	数据校验与自动提交

#### 数据提交

##### 校验是否符合数据表定义的要求

```python
import BootStrapMyFrom
class MyFrom(BootStrapMyFrom):
    class Meta:
        model = UserIfo
        fields = ['name','password']
#文件里form被定义了两次，第一次没数据只是实例化一个类，第二次包含了数据，用于验证和写入，所以尽量不改变他
def zhuce(request):
    form = MyForm()
    return render(request,'c.html', {'forms':form})
	form = MyFrom(data=request.POST)
    #判断数据是否合法
    if form.is_valid():
        #数据合法自动提交到数据库表名为MyFrom里定义的model的表（数据写入）
        form.save()
        return redirect('/zhuce')
    else:
        return render(request,'c.html', {'forms':form})
        #数据不合法校验失败
```

```html

<from method="post">
    {% for field in form %}
    {{ field.label }}:{{ field }}
    {{ field.errors.0 }}<!--显示第一个错误-->
    {% endfor %}
</from>
```

##### 错误信息改中文

在settings.py文件里改`LANDUAGE_CODE = 'zh-hans'`

##### 添加验证项（重写更多校验）

```python
from django import forms
class MyFrom(Form.ModelForm):
    #添加校验name字段最小长度为3
    name = forms.CharFiled(min_length=3，label='用户名')
    class Meta:
        model = UserIfo
        fields = ['name','password']
        widgets = {
            'name':forms.TextInput(attrs={"class":"form-control"})
            'password':forms.PasswordInput(attrs={"class":"form-control"})
        }
```

#### 修改数据

```python
#nid是url携带过来的参考上面	10	urls.py
def zhuce(request,nid):
    if request.method == 'GET':
        #从数据库获取id为要修改那行的id的一行数据
        ord_object = models.UserInfo.objects.filter(id=nid).first()
        #给修改页面添加默认值 
        form = MyForm(instance = ord_object)
        return render(request,'c.html', {'forms':form})
    else:
        ord_object = models.UserInfo.objects.filter(id=nid).first()
        #告诉jango不是新增而是更新到id=nid那一行（编辑数据）
        form = MyFrom(data=request.POST,instance = ord_object)
        if form.is_valid():
        #默认保存用户输入的值，如果想要在用户输入的值以外增加一些值
        #form.instance.字段名 = 值
        	form.save()
        	return redirect('/zhuce')
    	else:
        	return render(request,'c.html', {'forms':form})
```

#### 格式校验

##### 方式一（正则方法）

```python
from django import forms

from django.core.validators import RegexValidator
class MyFrom(Form.ModelForm):
    #validators后面可以写正则表达式		^开始 $结束 [3-9]3到9里的一个数字 \d{9}9位数字
    phone = forms.CharFiled(label='手机号'，validators=[RegexValidator(r'^1[3-9]\d{9}$','必须以159开头')])
    class Meta:
        model = UserIfo
        fields = ['name','password']
        widgets = {
            'name':forms.TextInput(attrs={"class":"form-control"})
            'password':forms.PasswordInput(attrs={"class":"form-control"})
        }
```

##### 方式二（钩子方法）

```python
from django import forms
from django.core.exceptions import ValidationError
from django.core.validators import RegexValidator
class MyFrom(Form.ModelForm):
    #validators后面可以写正则表达式		^开始 $结束 [3-9]3到9里的一个数字 \d{9}9位数字
    phone = forms.CharFiled(label='手机号'，validators=[RegexValidator(r'^1[3-9]\d{9}$','必须以159开头')])
    class Meta:
        model = UserIfo
        fields = ['name','password']
        
        #在函数里新建一个函数用于验证
        def clean_phone(self):
            #获取当前编辑那一行的id(用法配合9.2.3.5.1排除自己使用)
            self.instance.pk
            
            #获取用户输入的phone值
            txt_phone = self.cleaned_data["phone"]
            if len(txt_phone) != 11:
                #验证不通过抛出错误信息
                raise ValidationError('格式错误')
                #验证提供，把用户输入的值返回(返回的值就修改了用户输入的phone值，如果写入数据库就会写入返回的值，我们不能随意返回值)
            return txt_phone
```

##### 不让浏览器帮我们校验

```html
<!--novalidate不让浏览器帮我们校验-->
<form novalidate>

</form>
```

### 12.5	分页

```python
#类似于for in 取列表 并拼成一句字符串
list=[]
lists = "".join(list)
```

#### 后端写的标签传到前端

```python
#需要拦截非法字符(xss攻击)

#需要把字符串标记为安全的
from django.utils.safestring import mark_safe
#包裹后传入前端即可编译
mark_safe(str)


#也可以在前端里
{{ obj.title|safe }}
```

#### 计算需要分几页

```python
divmod(100,3)  #得到--->(33，1)商33余1
a,b = divmod(100,3)		#a=33 b=1
#如果b不为空页数就是a+1
#b为空时为False
if b:
```

封装一个分页类运用到所有页面

```python
class Pagination(object):
    def __init__(self,request,page_param="page")
    	page = page_param="page"
        #.isdecimal()如果字符串是否只包含十进制字符返回True，否则返回False。(判读是不是int类型)
        if page.isdecimal():
            page = int(page)
        else:
            page = 1
        self.page = page
```

要注意分页的时候把搜索值带上

```python
import copy
#深拷贝一份
get_object = copy.deepcopy(request.GET)
#修改django里的._mutable为True才可以修改值
get_object._mutable = True
#设置值-->127.0.0.1/url?a=12
get_object.setlist("a",[12])
```

直接跳转无法携带搜索值

案例

分页类

```python
class Page(object):
    '''
    自定义分页类
    可以实现Django ORM数据的的分页展示
    输出HTML代码：

    使用说明：
    from utils import mypage
        page_obj = mypage.Page(total_num, current_page, 'publisher_list')
        publisher_list = data[page_obj.data_start:page_obj.data_end]
        page_html = page_obj.page_html()

        为了显示效果，show_page_num最好使用奇数
    '''

    def __init__(self, total_num, current_page, url_prefix, per_page=10, show_page_num=9):
        '''

        :param total_num: 数据总条数
        :param current_page: 当前访问的页码
        :param url_prefix: 分页代码里a标签的前缀
        :param per_page: 每一页显示多少数据
        :param show_page_num: 页面上最多显示多少个页码


        '''
        self.total_num = total_num
        self.url_prefix = url_prefix
        self.per_page = per_page
        self.show_page_num = show_page_num
        # 根据传入的值计算当前页码左右放置多少个页码
        self.half_show_page_num = self.show_page_num // 2
        # 计算当前数据总共需要多少页码
        total_page, more = divmod(self.total_num, self.per_page)
        # 如果有余数就把页码加1
        if more:
            total_page += 1
        self.total_page = total_page
        # 数据有效性校验
        try:
            current_page = int(current_page)
        except Exception as e:
            current_page = 1
        # 如果当前页码数大于总页码数，默认展示最后一页数据
        if current_page > self.total_page:
            current_page = self.total_page
        # 如果当前页码小于1，默认展示第一页数据
        if current_page < 1:
            current_page = 1
        self.current_page = current_page
        # 计算页面上需要展示的页码范围
        # 页码过小处理
        if self.current_page - self.half_show_page_num <= 1:
            page_start = 1
            page_end = show_page_num
        # 页码过大处理
        elif self.current_page + self.half_show_page_num >= self.total_page:
            page_end = self.total_page
            page_start = self.total_page - self.show_page_num + 1
        # 未超过正常范围
        else:
            page_start = self.current_page - self.half_show_page_num
            page_end = self.current_page + self.half_show_page_num

        # 计算得到的最终页码数
        self.page_start = page_start
        self.page_end = page_end
        # 如果计算得到的页码数比总共需要展示页码数多，则把页码结束指定为总页码数
        if self.page_end > self.total_page:
            self.page_end = self.total_page

    @property
    def data_start(self):
        '''

        :return: 返回当前页面应该从哪里开始切数据
        '''
        return (self.current_page - 1) * self.per_page

    @property
    def data_end(self):
        '''

        :return: 返回当前页面从哪里结束数据
        '''
        return self.current_page * self.per_page

    def page_html(self):
        li_list = []
        # 添加前面的nav和ul标签
        li_list.append("""
        <nav aria-label="Page navigation">
        <ul class="pagination">
        """)
        # 添加首页
        li_list.append('<li><a href="/{}/?page=1">首页</a></li>'.format(self.url_prefix))
        # 添加上一页
        if self.current_page <= 1:  # 没有上一页
            prev_html = '<li class="disabled"><a aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>'
        else:
            prev_html = '<li><a href="/{}/?page={}" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>'.format(
                self.url_prefix,
                self.current_page - 1)
        li_list.append(prev_html)
        # 循环添加内部所有的页码
        for i in range(self.page_start, self.page_end + 1):
            if i == self.current_page:
                tmp = '<li class="active"><a href="/{0}/?page={1}">{1}</a></li>'.format(self.url_prefix, i)
            else:
                tmp = '<li><a href="/{0}/?page={1}">{1}</a></li>'.format(self.url_prefix, i)
            li_list.append(tmp)
        # 添加下一页
        if self.current_page >= self.total_page:  # 表示没有下一页
            next_html = '<li class="disabled"><a aria-label="Previous"><span aria-hidden="true">&raquo;</span></a></li>'
        else:
            next_html = '<li><a href="/{}/?page={}" aria-label="Previous"><span aria-hidden="true">&raquo;</span></a></li>'.format(
                self.url_prefix, self.current_page + 1)
        li_list.append(next_html)
        # 添加尾页
        li_list.append('<li><a href="/{}/?page={}">尾页</a></li>'.format(self.url_prefix, self.total_page))
        # 添加结尾nav和ul标签
        li_list.append("""
        </ul>
        </nav>
        """)
        # 将生成的标签拼接成一个大字符串
        page_html = ''.join(li_list)
        return page_html
```

使用办法

```python
# 获取分页所需数据
total_num = data.count() # 获取数据总计条数
current_page = request.GET.get('page') # 获取当前页页码
url_prefix = request.path_info.strip('/') # 获取a标签所需参数

# 调用分页类
# 调用类传入参数生成实例
page_obj = mypage.Page(total_num, current_page, url_prefix, per_page=1)
# 按照分页所需数据对总数据进行分割获取当前页面所需展示的数据
data = data[page_obj.data_start:page_obj.data_end]
# 获取HTML代码 
page_html = page_obj.page_html()
#封装成字典传入前端即可
```

### 12.6	时间选择插件

[参考](https://blog.csdn.net/qq_31267183/article/details/82457883)

```html
<!-- bootstrap样式表 -->
<link href="https://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">

<!-- 时间选择器样式表 -->
<link href="https://cdn.bootcss.com/bootstrap-datetimepicker/4.17.47/css/bootstrap-datetimepicker.min.css"
      rel="stylesheet">


<!-- jquery -->
<script src="https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js"></script>

<!-- bootstrap脚本 -->
<script src="https://cdn.bootcss.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>

<!-- 时间选择器前置脚本 -->
<script src="https://cdn.bootcss.com/moment.js/2.22.1/moment-with-locales.min.js"></script>

<!-- 时间选择器核心脚本 -->
<script src="https://cdn.bootcss.com/bootstrap-datetimepicker/4.17.47/js/bootstrap-datetimepicker.min.js"></script>
```

- jquery版本：可选用 1.8.3 到 3.3.1（最新版样式出不来）
- bootstrap版本：选用v3的

Script标签

[参考](https://blog.csdn.net/weixin_42009898/article/details/89011223)

```html

<script type="text/javascript">
    $('#date').datetimepicker({
        forceParse: 0,//设置为0，时间不会跳转1899，会显示当前时间。
        language: 'zh-CN',//显示中文
        format: 'yyyymmdd',//显示格式
        minView: "month",//设置只显示到月份
        initialDate: new Date(),//初始化当前日期
        autoclose: true,//选中自动关闭
        todayBtn: true//显示今日按钮
    })
    $("#date").datetimepicker("setDate", new Date());  //设置显示默认当天的时间
</script>

```

### 12.7ModelFrom和BootStrap

#### 方法一

##### 定义样式

```python
from django import forms
class MyFrom(Form.ModelForm):
    xx = models.CharField(verbose_name='确认密码',max_length=16)
    #不仅支持去models里获取字段也能自定义字段
    class Meta:
        model = UserIfo
        fields = ['name','password','xx']
    	#定义标签的属性(逐一添加属性)
        #render_value=True报错不清空，一般默认不清空但是密码默认会清空
        widgets = {
            'name':forms.TextInput(attrs={"class":"form-control"})
            'password':forms.PasswordInput(attrs={"class":"form-control"},
                                           render_value=True)
        	}
    
        

```

```python
from django import forms
class MyFrom(Form.ModelForm):
    xx = models.CharField(verbose_name='父母',max_length=16)
    #不仅支持去models里获取字段也能自定义字段
    class Meta:
        model = UserIfo
        fields = ['name','password','xx']
    def __init__(self, *args, **kwargs):
            super().__init__(*args,**kwargs)
            # 循环找到所有插件，添加class属性值
            # name是字段名
            for name, field in kwargs.items():
                #字段为password的不加class属性
                #if name == "password":
                 #   continue
                 #                       添加class属性 			 显示数据库verbose_name
                field.widget.attrs = {"class":"from-contorl","placeholder":field.label}
```

优化

```python
from django import forms
class MyFrom(Form.ModelForm):
    class Meta:
        model = UserIfo
        fields = ['name','password']
    def __init__(self, *args, **kwargs):
            super().__init__(*args,**kwargs)
			#循环找到所有插件，添加class属性值
            for name, field in kwargs.items():
                if field.widget.attrs:
                    field.widget.attrs['class'] = 'form-control'
                    field.widget.attrs['placeholder'] = field.label
                 
                field.widget.attrs = {"class":"from-contorl","placeholder":field.label}
```

#### 自定义类

```python
from django import forms
class BootStrapMyFrom(Form.ModelForm):
    def __init__(self, *args, **kwargs):
            super().__init__(*args,**kwargs)
            for name, field in kwargs.items():
                if field.widget.attrs:
                    field.widget.attrs['class'] = 'form-control'
                    field.widget.attrs['placeholder'] = field.label
                 
                field.widget.attrs = {"class":"from-contorl","placeholder":field.label}
```

##### 用法

```python
import BootStrapMyFrom
class MyFrom(BootStrapMyFrom):
    class Meta:
        model = UserIfo
        fields = ['name','password']
```

![image-20220508011705707](https://gitee.com/yinhanorsuli/pic-go/raw/master/img/image-20220508011705707.png)

## 13 目录

```
创建APP：python mange.py startapp app名

HelloWorld
|-- HelloWorld
|   |-- __init__.py
|   |-- settings.py
|   |-- urls.py
|   `-- wsgi.py
| 
|--app01
|	|--templates
|	|--utils (自己写的模块)
|	|--static
|	|	|--css
|	|	|--js
|	|	|--img
|	|	`--plugins
|	|
|	|--__init__.py
|	|--admin.py		[固定，不用动](django默认提供admin后台管理)
|	|--apps.py		[固定，不用动](app启动类)
|	|--migrations	[固定，不用动](数据库变更记录)
|	|	`--__init__.py
|	|
|	|--models.py	[重要](对数据库的操作)
|	|--tests.py		[固定，不用动](单元测试)
|	`--views.py		[重要](函数)
|	
`-- manage.py
```

## 14	MD5加密存储到数据库

### 正常MD5加密

```python

import hashlib
def md5(password):
    obj = hashlib.md5()
    obj.update(data_string.encode('utf-8'))
    return obj.hexdigest()
```

### 盐值加密

```python
md5密文是固定的所以一般在自己用的时候添加上自己的盐值
import hashlib
def md5(password):
    yan = 'xxx'
    obj = hashlib.md5(yan.encode('utf-8'))
    obj.update(data_string.encode('utf-8'))
    return obj.hexdigest()
```

#### 用Django为我们生成的盐来加密

```python
from django.conf import settings
import hashlib
def md5(password):
    obj = hashlib.md5(settings.SECRET_KEY.encode('utf-8'))
    obj.update(data_string.encode('utf-8'))
    return obj.hexdigest()
```

## 15 用户登录

### cookie和session

- cookie：保存在浏览器的键值，发送请求时自动携带
- session（数据库【Django默认】、redis、文件）

解决了

- 无状态&短链接（一次请求和响应过后就会断开连接）

访问网页的时候服务器给浏览器返回响应体和响应头

- 响应体（请求的内容...）
- 响应头（cookie...）

```python
class LoginForm(forms.Form):
    username forms.CharField(
    label="用户名",
    widget=forms.TextInput(attrs={"class":"form-control"})
    )
    password forms.CharField(
    label="密码",
    widget=forms.PasswordInput(attrs={"class":"form-control"})
    )
```

### 校验密码

```python
def login(request):
#登录
    if request.method =="GET":
        form = LoginForm()
        return render(request,'login.html',{'form':form})
    form = LoginForm(data=request.POST)
    if form.is_valid():
        admin_object = models.Admin.objects.filter(**form.cleaned_data).first()
        if not admin_object:
            #自定义一个校验错误
            #form.add_error("password","用户名或密码错误")
            form.add_error("username,"用户名或密码错误")
            return render(request,'login.html',{'form':form})
        return HttpResponse("提交成功")
    return render(request,'login.html',{'form':form})
```

### cookie和session生成

```python
def login(request):
#登录
    if request.method =="GET":
        form = LoginForm()
        return render(request,'login.html',{'form':form})
    form LoginForm(data=request.POST)
    if form.is_valid():
        admin_object = models.Admin.objects.filter(**form.cleaned_data).first()
        if not admin_object:
            #自定义一个校验错误
            #form.add_error("password","用户名或密码错误")
            form.add_error("username,"用户名或密码错误")
            return render(request,'login.html',{'form':form})
          #网站生成随机字符串；写到用户浏览器的cookie中；再写到session中
          #服务器里就保存了一个info={'id':1,'name':佩奇} 
          #session保存到了django_session表里
        request.session["info"] = {'id':admin_object.id,'name':admin_object.username}
        return HttpResponse("提交成功")
    return render(request,'login.html',{'form':form})
```

### 判断有没有session

在其它需要登录的页面加上

```python
def login(request):
#取到上面存入数据库的字典info={'id':1,'name':佩奇}
#没有登录cookie会返回一个None
	a= request.session.get['info']
    #如果a没有值
    if not a:
        return redirect('/denglu')
    else：
    	pass
```

注：用中间件代替

### 中间件

#### 中间件文件夹（middleware）

![image-20220508031645437](https://gitee.com/yinhanorsuli/pic-go/raw/master/img/image-20220508031645437.png)

```python
from django.utils.deprecation import MiddlewareMixin

class C1(MiddlewareMixin):
    # 中间件1
    def process_request(self, request):
        print('C1,来了')
    def process_response(self, request, response):
        print('C1,走了')
        return response

class C2(MiddlewareMixin):
    # 中间件2
    def process_request(self, request):
        #如果方法里没有返回值，那么安装黑色路径继续走
        #有返回值就直接走红色路径返回
        print('C2,来了')
    def process_response(self,request, response):
        print('C2,走了')
        #必须返回response
        return response
```

运行结果

![image-20220508033210917](https://gitee.com/yinhanorsuli/pic-go/raw/master/img/image-20220508033210917.png)

#### 应用中间件

在settings.py里的MIDDLEWARE列表里把中间件添加上去

![image-20220508033305980](https://gitee.com/yinhanorsuli/pic-go/raw/master/img/image-20220508033305980.png)

#### 中间件实现登录校验

```python
from django.utils.deprecation import MiddlewareMixin
from django.shortcuts import redirect


class AuthMiddleware(MiddlewareMixin):
    # 中间件1
    def process_request(self, request):
        # 排除登录页面的请求
        # 获取当前用户访问的url /login/
        if request.path_info == '/login/':
            return None
        #读取当前访问的用户session信息
        info_dict = request.session.get('info')
        if info_dict:
            return
        else:
            return redirect('/login/')

    def process_response(self, request, response):
        return response

```

### 注销

```python
def login(request):

	a= request.session.clear()
    return rdirect('/denglu/')

```

### 获取用户登录的session信息

```python
dict = request.session['info']
```

```html
<!--前端直接获取-->
{{ request.session.info.name }}
{{ request.session.info.id }}
```

### 图片验证码

python生成图片

[PIL库](https://www.jb51.net/article/225452.htm)

```
pip install pillow
```

```python
#生成图片
from PIL import Image,

img = Image.new(mode='RGB',size=(120,30),color=(255,255,255))
with open('./code.png','wb')as f:
    img.save(f,format='png')
```

#### 完善集成代码

```python
```

##### 用法

```python
from Image_authentication import get_code
#内存中的文件
from io import BytesIO
#重写一个url用于验证图片
def images_code(request):
    image_txt,image = get_code()
    #把验证码写进session里
    request.session['image_txt']=image_txt
    #设置session超时60后验证码失效
    request.session.set_expiry(60)
    Memory_file = BytesIO()
    image.save(Memory_file,'png')
    #把内存里的图片返回给页面
    return Httpresponse(Memory_file.getvalue())
```

##### ModelFrom添加图片验证框

参考上面自定义字段

##### 验证码校验（登录的视图函数）

```python
def login(request):
#登录
    if request.method =="GET":
        form = LoginForm()
        return render(request,'login.html',{'form':form})
    form LoginForm(data=request.POST)
    if form.is_valid():
        admin_object=models.Admin.objects.filter(**form.cleaned_data).first()
        if not admin_object:
            #因为后面还要用用户名和密码去数据库验证，所以要用pop把验证码提取并剔除，验证码不会去数据库校验
			user_input_code = form.cleaned_data.pop('code') #用户输入的验证码
            #因为验证码可能为空所以后面加上取空值
            user_code= request.session.get('image_code','')  #session里正确的验证码
        	if user_input_code != user_code：
            	form.add_error("code","验证码错误")
                return render(request,'login.html',{'form':form})
            
            form.add_error("username,"用户名或密码错误")
            return render(request,'login.html',{'form':form})
        request.session["info"] = {'id':admin_object.id,'name':admin_object.username}
              #设置验证成功一天免登录（session保存1天）
        request.session.set_expiry(60*60*24)
        return HttpResponse("提交成功")
    return render(request,'login.html',{'form':form})
```

## 16	Ajax请求

浏览器向服务器发送的请求以：向URL发送表单的形式提交

- GET

- POST

  每次操作都要刷新页面

Ajax：偷偷发送请求（不刷新）

- 依赖jQuery
- Ajax代码

```javascript
$.ajax({
    url: 'xxx',
    type: 'get',
    data: {
        n1: 12,
        n2: 23
    },
    //发送成功自动执行
    success: function (res) {
        console.log(res);
    }
})
```

### GET请求

```javascript
$.ajax({
    url: '/task/ajax/',
    type: 'get',
    data: {
        n1: 12,
        n2: 23
    },
    success: function (res) {
        console.log(res);
    }
})
```

后端

```python
def task_ajax(request):
    request.GET
    return HttpResponse(request.GET)
```

POST请求

```javascript
$.ajax({
    url: '/task/ajax/',
    type: 'post',
    data: {
        n1: 12,
        n2: 23
    },
    success: function (res) {
        console.log(res);
    }
})
可以用上面的批量绑定click点击事件
```

```python
//ajxa默认不携带cookie
//解决办法
from django.views.decorators.csrf import csrf_exempt
在函数上面加上
@csrf_exempt
def task_ajax(request):
    request.GET
    return HttpResponse(request.GET)
```

Ajax请求的返回值

- 返回类型：json

后端

```javascript
$.ajax({
    url: '/task/ajax/',
    type: 'post',
    data: {
        n1: 12,
        n2: 23
    },
    dataType: 'JSON'
    success: function (res) {
        console.log(res);
        console.log(res.a);
        console.log(res.b);
    }
})
```

```python
def task_ajax(request):
    dict = {
        'a':12,
        'b':34
    }
    #以json格式返回前端	JsonResponse(dict) = Httpresponse(json.dumps(dict))
    return JsonResponse(dict)
```

页面上的数据写入ajax

```javascript
$.ajax({
    url: '/task/ajax/',
    type: 'post',
    data: {
        user: $('#user').val(),
        password: $('#password').val()
    },
    dataType: 'JSON'
    success: function (res) {
        console.log(res);
        console.log(res.a);
        console.log(res.b);
    }
})
```

### 自动写ajax传入后端的值

![image-20220508232152198](https://gitee.com/yinhanorsuli/pic-go/raw/master/img/image-20220508232152198.png)

![image-20220508232228145](https://gitee.com/yinhanorsuli/pic-go/raw/master/img/image-20220508232228145.png)

案例

![image-20220508234558328](https://gitee.com/yinhanorsuli/pic-go/raw/master/img/image-20220508234558328.png)

![image-20220508232228145](https://gitee.com/yinhanorsuli/pic-go/raw/master/img/image-20220508232228145.png)

html

![image-20220508234838719](https://gitee.com/yinhanorsuli/pic-go/raw/master/img/image-20220508234838719.png)

把错误写到html

![image-20220508234658363](https://gitee.com/yinhanorsuli/pic-go/raw/master/img/image-20220508234658363.png)

## 17	上传文件

### 基本操作

- request.FILES 请求发送过来的文件

![image-20220509002043979](https://gitee.com/yinhanorsuli/pic-go/raw/master/img/image-20220509002043979.png)

不加enctype默认只是上传文件名，加上才上传了真正的文件

![image-20220509002303320](https://gitee.com/yinhanorsuli/pic-go/raw/master/img/image-20220509002303320.png)

![image-20220509002455007](https://gitee.com/yinhanorsuli/pic-go/raw/master/img/image-20220509002455007.png)

- file_object.name 文件名

- file_object.chunks 文件数据

- chunk 文件里的一部分数据

  一部分一部分的读取

  												用form生成input标签

![image-20220509004540163](https://gitee.com/yinhanorsuli/pic-go/raw/master/img/image-20220509004540163.png)

写上第二行的就排除img标签不给他加上bootstrap样式

![image-20220509004755564](https://gitee.com/yinhanorsuli/pic-go/raw/master/img/image-20220509004755564.png)

上传文件校验的时候一定要加上files

![image-20220609234355937](https://gitee.com/yinhanorsuli/pic-go/raw/master/img/image-20220609234355937.png)

## 18、Django生命周期

![image-20220711165822804](https://gitee.com/yinhanorsuli/pic-go/raw/master/img/image-20220711165822804.png)

## 19、wsgi,uwsgi,uWSGI？

### wsgi

web服务器网关接口,是一套协议。用于接收用户请求并将请求进行初次封装，然后将请求交给web框架。(
用人话来说就是，专门用于对浏览器和服务器通讯时封装请求)

### uwsgi

与WSGI一样是一种通信协议，它是uWSGI服务器的独占协议,用于定义传输信息的类型。(用来定义传输的数据的类型)

### uWSGI

是一个web服务器,实现了WSGI协议,uWSGI协议,http协议,

### FBV和CBV

FBV和CBV基本是一样的，基于函数的视图叫做FBV，基于类的视图叫做CBV 在python中使用CBV的优点：

    1.提高了代码的复用性，可以使用面向对象的技术，比如Mixin（多继承）
    
    2.可以用不同的函数针对不同的HTTP方法处理，而不是通过很多if判断，提高代码可读性

# conda安装uWsgi

```
conda install -c conda-forge uwsgi
```

# 性能优化（ORM）

```python
Project.objects.filter(dataPerson__uid=uid).prefetch_related(
    Prefetch(
        'batch_project_uid',
        queryset=Batch.objects.annotate(
            max_data=Count('data_batch_uid'),
            min_data=Subquery(
                Data.objects.filter(
                    dataBatch=OuterRef('uid'),
                    tagger__isnull=False
).values('dataBatch').annotate(c=Count('uid')).values('c')
                        )
                    )
                )
            )
```

> 这段代码主要用于获取 Django ORM 查询中的信息，并且已经针对性能做了优化。它涉及到的 Django ORM
> 查询的一些重要内容包括子查询(Subquery)，注解(annotate)，计数(Count)，以及预提取(prefetch_related)。下面我们逐一解析：
>
> - Project.objects.filter(dataPerson__uid=uid):
    >
    >   这是一个基本的 Django ORM 查询，它从这些项目中选择出 dataPerson 的 uid 字段匹配指定 uid 的项目。
>
> - prefetch_related:
    >
    >   减少数据库的查询次数，这里的`batch_project_uid `是在定义模型时的`related_name`这样编写可以一次性获取到关联数据。
    >
    >   ```python
>   batchProject = models.ForeignKey(
>           to=Project,
>           to_field='uid',
>           on_delete=models.CASCADE,
>           null=False,
>           related_name='batch_project_uid'
>       )
>   ```
>
>
>
> - Prefetch 对象:
    >
    >   这可以用于进一步定制`prefetch_related`的查询，`queryset`参数就是查询语句。
>
> - annotate:
    >
    >   annotate 用于在每个 Batch 对象上生成两个新的字段，max_data 和 min_data。
    >
    >
- max_data=Count('data_batch_uid'):
  >
  >     这里 Count聚合函数计算每个 Batch 对象的相关 Data 对象的数量 ('data_batch_uid')。
>
>   - min_data=Subquery(...):
      >
      >     这里 Subquery 是子查询。它是一个嵌套于主查询中的查询，用于生成另一个临时表。
      >
      >
- Data.objects.filter(dataBatch=OuterRef('uid'), tagger__isnull=False):
  >
  >       这介绍了子查询的过滤条件，它只包含那些 Data 对象的 dataBatch 字段与 外部 Batch 对象的 uid 相等，同时 tagger
  字段不为空的 Data 对象。
>
>     - .values('dataBatch'):
        >
        >       这指定了子查询的分组条件，它根据 dataBatch 字段对查询结果进行分组。
>        
>     - .annotate(c=Count('uid')):
        >
        >       这会添加一个注解结果，通过计算每一个组的 uid 字段的数量。
>        
>     - .values('c'):
        >
        >       这返回最后的子查询结果，即每一个组的 uid 字段的数量。
>
> 所有的这些条件都是在构建 SQL 查询时被评估的。返回的结果是一个 QuerySet 对象，代表满足给定条件的 Project 对象集合。每个
> Project 对象还有一个附带的关联 Batch 对象集合，且这些 Batch 对象每个都有两个额外的字段 max_data 和 min_data。
>
> 总的来说，这段代码的主要目的是优化数据库查询性能，通过减少数据库查询的总次数来提高数据处理速度。
