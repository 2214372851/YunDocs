# Django前后端分离模式

## FBV与CBV

- FBV模式：基于函数的视图

- CBV模式：基于类的视图

### FBV模式

- urls.py

```python
from django.urls import path
from reportAPI.views import *

urlpatterns = [
	# FBV模式
    path('login/', login)
]
```

- views.py

```python
from django.shortcuts import render, HttpResponse

# FBV模式
def login(request):
    if request.method == 'GET':
        return HttpResponse('GET')
    else:
        return HttpResponse('POST')

```

### CBV模式

- urls.py

```python
from django.urls import path
from reportAPI.views import *

urlpatterns = [
	# CBV模式
    path('login/', login.as_view())
]
```

- views.py

```python
from django.views import View
from django.shortcuts import render, HttpResponse

# CBV模式
class LoginView(View):
    def get(self):
        return HttpResponse('GET')
    def post(self):
        return HttpResponse('POST')
```

- `getattr(self,'get','ERROOR:NO GET')`:用于获取类的属性

## 序列化

```python
from django.core import serializers
# django自带的序列化器
```

## DRF

### RESTful

RESTful是一种专门为Web开发而定义的API接口设计风格，尤其适用于前后端分离的应用模式中

```
/books/
	get		查看逻辑	返回所有数据
	post	添加逻辑	返回添加的数据
/books/1/
	get		查看单个资源逻辑	返回单个数据
	delete	删除单个资源逻辑	空数据
	put		更新单个资源逻辑	修改后的数据
	patch	更新单个资源逻辑
```

### 序列化与反序列化

- 序列化

  把我们认识的数据转换为指定格式数据提供给别人

  例：Django的数据QuerySet类型转换为json数据

- 反序列化

  把别人提供的数据转换/还原为我们需要的格式

  例：json数据转换为QuerySet类型

### Django REST framework

#### 依赖

- Python（3.5以上）
- Django（2.2以上）

DRF是以Django子应用的方式提供，所以我们可以直接利用已有的Django环境而无需从新创建。（若无Django环境，则需要先创建环境，安装Django）

#### 安装DRF

`pip install djangorestframework -i https://pypi.douban/simple`

#### 注册DRF的APP

```python
INSTALLED_APPS = [
    'rest_framework'
]
```

#### APIView视图

views.py

```python
from rest_framework.views import APIView
from django.shortcuts import HttpResponse

class Login(APIView):
    
    def get(self):
        # 发送的get请求数据可以通过以下几张方式获取
        request.GET
        request.query_params
        return HttpResponse('GET')
    
    def post(self):
        # 前端发送的json数据被APIView转化为python的字典存储在request.data上
        print(request.data)
        return HttpResponse('POST')
```

APIView	把原生request的post无法解析的json等数据赋值给`request.data`创建了一个新的request

#### 序列化器

##### 创建序列化类

```python
from rest_framework import serializers

class UserSerializer(serializers.Serializer):
    name = serializers.CharField()
    # 如果你在序列化器里需要改动字段名称（name-->names），则通过设置source值来辅助序列化器找到正确的字段
    # 这时候前端接收到的json，键为names不再是name
    names = serializers.CharField(source='name')
    
    sex = serializers.BooleanField()
    class_null = serializers.CharField()
```

##### 创建serializers对象

views.py

```python
from reportAPI.models import User
from rest_framewoek.views import APIView
from django.shortcuts import HttpResponse

class Login(APIView):
    def get(self, request):
        all_User_data = User.object.all()
        # 当需要序列化多条数据时，many设置为True，默认为False
        user_data = UserSerializer(instance=all_User_data, many=True)
        return HttpResponse(user_data.data)
```

#### 响应

当序列化器序列后的数据需要返回时，如果使用HttpResponse则会导致返回的数据为`OrderedDice`有序字典，这时候需要使用DRF新的Response对象,这时候前端接收到的数据就是json类型

```python
from reportAPI.models import User
from rest_framewoek.views import APIView
from rest_framework.response import Response

class Login(APIView):
    def get(self, request):
        all_User_data = User.object.all()
        # 当需要序列化多条数据时，many设置为True，默认为False
        user_data = UserSerializer(instance=all_User_data, many=True)
        return Response(user_data.data)
```

#### 单条数据查询

- urls.py

  ```python
  from django.urls import re_path
  
  urlpatterns = [
      re_path('user/(\d+)/', Users.as_view())
  ]
  ```

- view.py

  ```python
  class Users(APIView):
      def get(self, request, nid):
          # 这里get方法的pk表示数据库主键，这里可写为（id=nid）
          User_data = User.object.get(pk=nid)
          user_data = UserSerializer(instance=User_data)
          return Response(user_data.data)
          
  ```

#### 反序列化

##### 数据校验

- 序列化器

  ```python
  from rest_framework import serializers
  # 校验规则需要与数据库保持一致
  class UserSerializer(serializers.Serializer):
      name = serializers.CharField(max_length=5)
      sex = serializers.BooleanField()
      class_null = serializers.CharField()
  ```

  

- views.py

  ```python
  class Users(APIView):
      def post(self, request, nid):
          user_data = UserSerializer(data=request.data)
          # 校验器, 当所有数据校验合格，返回True
          # 中途如果全部符合校验规则那么校验器会把数据键值对放到user_data.validated_data，只有校验全部合格里面才会有值
          # 如果有校验不合法的，则会把不合法的键值对放到user_data.errors里
          if user_data.is_valid():
              # 生成记录
              pass
          else:
              # 直接把校验信息传递给前端
              return Response(user_data.errors)
          
          # 源码中写法
          try:
              # 如果不为raise_exception的值与校验结果值不同，则直接报错,保存到数据库后根据规划，需要返回添加的这条数据
              
              user_data.is_valid(raise_exception=True)
              std = User.object.create(**user_data.validated_data)
              std = UserSerializer(instance=std)
              return Response(std.data)
        	except:
              return Response(user_data.errors)
  ```

  

#### 数据修改

```python
class Users(APIView):
    def put(self, request, nid):
        user_data = UserSerializer(data=request.data)
        if user_data.is_valid():
            std = User.object.filter(pk=nid).update(**user_data.validated_data)
            std = User.object.get(pk=nid)
            std = UserSerializer(instance=std)
            return Response(std.data)
        else:
            return Response(user_data.errors)
```

#### save方法

- Serializer的save方法需要手动完成逻辑

  - 序列化器

    ```python
    from rest_framework import serializers
    
    class UserSerializer(serializers.Serializer):
        name = serializers.CharField(max_length=5)
        sex = serializers.BooleanField()
        class_null = serializers.CharField()
        
        def create(self):
            instance = User.object.create(**self.validated_data)
            retrun instance
            
    ```

  - views.py

    ```python
    class Users(APIView):
        def post(self, request, nid):
            user_data = UserSerializer(data=request.data)
            if user_data.is_valid():
                user_data.save()
                return Response(std.data)
            else:
                return Response(user_data.errors)
    ```

    

- 基于ModelSerializer

  ```python
  from rest_framework import serializers
  from rest_framework.views import APIView
  from rest_framework.response import Response
  from reportAPI.models import User
  
  #序列化器
  class UserSerializers(serializers.ModelSerializer):
      class Meta:
          model = User
          fields = '__all__'
  
  class Login(APIView):
      def get(self, request):
          all_user = User.objects.all()
          userSerializers = UserSerializers(instance=all_user, many=True)
          print(userSerializers.data)
          return Response(userSerializers.data)
  
      def post(self, request):
          userSerializers = UserSerializers(data=request.data)
          if userSerializers.is_valid():
              userSerializers.save()
              return Response(userSerializers.data)
          else:
              return Response(userSerializers.errors)
  
  class LoginEidt(APIView):
      def get(self, request, id):
          user = User.objects.get(pk=id)
          userSerializers = UserSerializers(instance=user)
          return Response(userSerializers.data)
  
      def put(self,request, id):
          user = User.objects.get(pk=id)
          userSerializers = UserSerializers(instance=user, data=request.data)
          if userSerializers.is_valid():
              userSerializers.save()
              return Response(userSerializers.data)
          else:
              return Response(userSerializers.errors)
  
      def delete(self, request, id):
          User.objects.filter(pk=id).delete()
          return Response()
  
  ```

  

#### 混合类(Mixins)

前提是urls.py接收的参数为pk

```python
urlpatterns = [
    path("login/", Login.as_view()),
    path("login/<int:pk>/", LoginEidt.as_view())
]
```



```python
from rest_framework import serializers
from rest_framework.response import Response
from reportAPI.models import User
from rest_framework.mixins import ListModelMixin, CreateModelMixin, RetrieveModelMixin, DestroyModelMixin, \
    UpdateModelMixin
from rest_framework.generics import GenericAPIView


# 序列化器
class UserSerializers(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class Login(GenericAPIView, ListModelMixin, CreateModelMixin):
    queryset = User.objects.all()
    serializer_class = UserSerializers


    def get(self, request):
        return self.list(request)

    def post(self, request):
        return self.create(request)


class LoginEidt(GenericAPIView, RetrieveModelMixin, DestroyModelMixin, UpdateModelMixin):
    queryset = User.objects.all()
    serializer_class = UserSerializers

    def get(self, request, pk):
        return self.retrieve(request)

    def delete(self, requests, pk):
        return self.destroy(requests)

    def put(self, request, pk):
        return self.update(request)
```

极简版

```python
from rest_framework import serializers
from rest_framework.response import Response
from reportAPI.models import User
from rest_framework.generics import ListCreateAPIView,RetrieveUpdateDestroyAPIView


# 序列化器
class UserSerializers(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class Login(ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializers


class LoginEidt(RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializers
    lookup_field = 'id'
    # 当urls里接受的参数名称为id时在lookup_field赋值为id即可
```











