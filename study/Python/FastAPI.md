# FastAPI

> FastAPI是建立在Pydantic和Starlette基础上的，Pydantic是一个基于Python类型提示来定义数据验证、序列化和文档的库。Starlette是一种轻量级的ASGI框架，用于构建高性能Asyncio服务的理性选择。



## HTTP协议

- 基于TCP/IP协议

- 被动响应

- 无状态

- 短连接

  > HTTP1.0默认使用短连接，请求结束就断开
  >
  > HTTP1.1起，默认使用长连接，客户端和服务器的HTTP首部的Connection都要设置为keep-alive，才能支持长连接
  >
  > HTTP长连接指的是复用TCP连接，多个HTTP请求可以复用同一个TCP连接，节省了TCP连接 建立和断开的消耗



## 安装

```bash
pip install fastapi

# ASGI服务器
pip install uvicorn

# pycharm中使用时降级为0.20.0
pip install uvicorn==0.20.0
```



## 简易示例

```python
from pathlib import Path
from fastapi import FastAPI
import uvicorn

app = FastAPI()


@app.get('/')
async def read_root():
    return {'message': 'test reload'}


# 启动
# uvicorn file_stem:app --reload


if __name__ == '__main__':
    # 在pycharm中使用时会出现热重载无效
    uvicorn.run(
        app=Path(__file__).stem + ':app',
        reload=True,
        host='127.0.0.1',
        port=8080
    )
```



## 路由

```python
app.get()
app.post()
app.put()
app.delete()

# 一些文档参数
@app.get(
    path='/',
    tags=["接口类别"],
    summary="这是一个GET接口名称",
    description='这个是GET接口的详细内容',
    response_description="返回值的详细内容",
    deprecated=True,    # 弃用的接口标志
)
```

路由分发`include_router`

`main.py`

```python
from fastapi import FastAPI
import uvicorn
from apps.app1.urls import app01
from apps.app2.urls import app02

app = FastAPI()

app.include_router(app01, prefix="/app1", tags=["APP1"])
app.include_router(app02, prefix="/app2", tags=["APP2"])

if __name__ == '__main__':
    uvicorn.run(
        app='main:app',
        reload=True,
        host='127.0.0.1',
        port=8000
    )
```

apps.app1.urls.py

```python
from fastapi import APIRouter

app01 = APIRouter()


@app01.get('/a')
def app01_get():
    return {'message': 'app1a'}


@app01.get('/b')
def app01_get():
    return {'message': 'app1b'}
```



## 请求

### 路径参数

```python
@app01.get('/a/{userid}')
async def app01_get(userid: int):  # type hint限制了int类型，会自动把字符串转为int，否则url参数都是字符串
    return {'message': 'app1a', 'userid': userid}


# 当动态url可能会与静态url重叠时，动态的建议写下面（username=me）
@app01.get('/b/me')
async def get_me():
    return {'msg': 'ok'}

@app01.get('/b/{username}')
async def get_username(username):
    return {'username':username}
```

### 请求参数

```python
# 不是路径参数的a, b会被解释为查询参数，从请求的params中自动获取
# 有默认值则为选填，否则为必填
# Union是多个类型都可以
# Optional[int]表示int和None都可以等同于Union[int, None]
@app01.get('/b')
async def app01_get(
    a: Union[int, None], 
    b: Optional[int], 
    c=None
    d: str = Query(..., description='test')):
    return {'message': 'app1b', 'a': a, 'b': b}
```

### 请求体数据

`pip install pydantic`做类型强制校验，大概比DRF快6~10倍



```python
from typing import List, Optional

import pydantic
from fastapi import APIRouter

app01 = APIRouter()


class Sex(pydantic.BaseModel):
    age: int = pydantic.Field(default=18, gt=2, lt=99)
    sex: str


class TestRequestData(pydantic.BaseModel):
    name: str
    # 校验规则
    like: List[str]
    des: Optional[str] = None
    sex: Sex

    # email: str = pydantic.Field(pattern=r'^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$', alias='邮箱')

    @pydantic.field_validator('name')
    @classmethod
    def validate_name(cls, value: str):
        assert value.islower(), 'name can not be empty'
        # 或
        if value.islower(): raise ValueError('name can not be empty')
        return value


@app01.post('/')
async def test(data: TestRequestData):
    # 转换为字典
    data_dict = data.model_dump()
    return {"hello": data}
```



### form表单数据

`pip install python-multipart`

```python
from fastapi import APIRouter, Form

app01 = APIRouter()


@app01.post('/regin')
async def test(
    username: str = Form(), 
    password: str = Form(
        default=123, 
        description='密码')):
    # Content-Type: application/x-www-form-urlencoded
    return {"username": username, "password": password}
```



### 文件上传



```python
from fastapi import APIRouter, UploadFile, File

app01 = APIRouter()


@app01.post('/upload')
async def test(
    file: UploadFile = File(description='上传的文件')):
    """
    单文件上传
    :param file:
    :return:
    """
    # Content-Type: application/form-data
    with open(file.filename, 'wb') as f:
        for chunk in file.file:
            f.write(chunk)
    return {"username": file.size}


@app01.post('/uploads')
async def uploads(file: list[UploadFile]):
    """
    多文件上传
    :param file:
    :return:
    """
    # Content-Type: application/form-data
    return {"username": file[0].size}
```



### Request对象



```python
from fastapi import APIRouter, Request

app01 = APIRouter()


@app01.post('/data')
async def data(request: Request):
    print('URL', request.url)
    print('客户端IP', request.client.host)
    print('请求头', request.headers.get('User-Agent'))
    print('cookies', request.cookies)
    return {"data": 'data'}
```



### 静态文件请求

> 不是由服务器产生的文件，开发阶段就存在的文件，如css、js、图片等

`main.py`

```python
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

app = FastAPI()
app.mount('/static', StaticFiles(directory="static"))
```



## 响应模型参数

### response_model

> 此处用于隐藏输入的密码

```python
import typing

import pydantic
from fastapi import APIRouter

app01 = APIRouter()


class UserIn(pydantic.BaseModel):
    # 输入参数
    username: str
    password: str
    email: pydantic.EmailStr
    full_name: typing.Optional[str]


class UserOut(pydantic.BaseModel):
    # 输出参数
    username: str
    email: pydantic.EmailStr
    full_name: typing.Optional[str]


@app01.post('/regin', response_model=UserOut)
async def data(user: UserIn):
    print(user, 1)
    return user
```



### response_model_exclude_

> 用于排除响应数据中的字段
>
> `response_model_exclude_unset`用于如果数据中不存在的字段就排除该字段，可能为空的字段会不会出现在返回值中，如果未设置，那么该字段对应的就是默认值

```python
import pydantic
from fastapi import APIRouter

app01 = APIRouter()

user_info = {
    '001': {'name': 'lihua', 'age': 18},
    '002': {'name': 'lihua', 'age': 18, 'email': 'xx@mail.cn'}
}


class UserOut(pydantic.BaseModel):
    name: str
    age: int
    email: pydantic.EmailStr = None


@app01.post('/regin', 
            response_model=UserOut, 
            # 排除值为None的
            response_model_exclude_none=True,
            # 排除有默认值
            response_model_exclude_defaults=True,
            # 排除自定义字段
            response_model_exclude={'name', 'age'}，
            # 只要自定义字段
            response_model_include={'name', 'age'}，
            # 排除没有值的字段
            response_model_exclude_unset=True)
async def data(user: str):
    print(user, 1)
    return user_info[user]
```



## ORM操作

> Tortoise ORM是受Django ORM启发的易于使用的异步ORM

`pip install tortoise-orm`



### 创建模型类

```python
from tortoise.models import Model
from tortoise import fields


class User(Model):
    id = fields.IntField(pk=True, description='ID')
    name = fields.CharField(max_length=30, description='姓名')
    age = fields.SmallIntField(description='年龄')
    # 一对多
    clas = fields.ForeignKeyField('models.Clas', related_name='students', on_delete=fields.base.OnDelete.CASCADE)
    # 多对多
    courses = fields.ManyToManyField('models.Course', related_name='courses', on_delete=fields.base.OnDelete.CASCADE)


class Clas(Model):
    id = fields.IntField(pk=True, description='ID')
    uuid = fields.UUIDField(unique=True, null=False, description='UUID')
    name = fields.CharField(max_length=30, description='班级名称')


class Course(Model):
    id = fields.IntField(pk=True, description='ID')
    name = fields.CharField(max_length=30, description='课程')
```

### 迁移模型类

`pip install aerich`

`settings.py`

```python
TORTOISE_ORM = {
    'connections': {
        # 'default': {
        #     # SQLite
        #     # 'engine': 'tortoise.backends.sqlite',
        #     # PostgreSQL pip install tortoise-orm[asyncpg]
        #     # 'engine': 'tortoise.backends.asyncpg',
        #     # MySQL pip install tortoise-orm[aiomysql]    pip install tortoise-orm[asyncmy]
        #     'engine': 'tortoise.backends.mysql',
        #     'credentials': {
        #         'host': '127.0.0.1',
        #         'port': '3306',
        #         'user': 'root',
        #         'password': '20020308Yh',
        #         'database': 'fastapi',
        #         'minsize': 1,
        #         'maxsize': 5,
        #         'charset': 'utf8mb4',
        #         'echo': True
        #     }
        # }
        'default': 'mysql://root:20020308Yh@127.0.0.1:3306/fastapi?charset=utf8mb4'
    },

    'apps': {
        'models': {
            # /apps/app1/models => apps.app1.models 模型路径 这里不加上aerich自己的models在init时会报错
            'models': ['models', 'aerich.models'],
            'default_connection': 'default',
        }
    },
    'use_tz': False,
    'timezone': 'Asia/Shanghai'
}
```



```bash
# 初始化配置 settings.py 里的 TORTOISE_ORM 参数
aerich init -t settings.TORTOISE_ORM

# 初始化模型
aerich init-db

# 更新模型 --name 本次更新的名称
aerich migrate --name init

# 应用更新
aerich upgrade

# 回退更新
aerich downgrade

# 查看迁移记录
aerich history
```



## 增删改查查

```python
from fastapi import APIRouter, Query
from models import User
from pydantic import BaseModel, Field
from typing import List

user_api = APIRouter()


class UserOutModel(BaseModel):
    id: int = Field(description="用户ID")
    name: str = Field(description="用户名称")
    clas_id: int = Field(description="用户类别ID")
    age: int = Field(description="用户年龄")


class UserInModel(BaseModel):
    name: str = Field(description="用户名称")
    clas_id: int = Field(description="用户类别ID")
    age: int = Field(description="用户年龄")


@user_api.get('/', description="获取用户列表", response_description="用户列表数据", response_model=List[UserOutModel])
async def get_users():
    users = await User.all().order_by('id')
    return users


@user_api.get('/{user_id}', description='用户详情', response_description="用户详情数据", response_model=UserOutModel)
async def get_user(user_id: int):
    user = await User.get(pk=user_id)
    return user


@user_api.post('/')
async def create_user(user: UserOutModel):
    return await User.create(**user.dict())


@user_api.put('/{user_id}')
async def update_user(user_id: int, user: UserInModel):
    return await User.filter(id=user_id).update(**user.dict())


@user_api.delete('/{user_id}')
async def update_user(user_id: int):
    return await User.filter(id=user_id).delete()

```



## 中间件

> 与Django中间件一致，先进先出（写在上面的后执行）

```python
import uvicorn
from fastapi import FastAPI, Request, Response
from tortoise.contrib.fastapi import register_tortoise

import config
from apps.user import user_api

app = FastAPI()


@app.middleware('http')
async def m2(request: Request, next_call):
    print('2-s')
    # 请求
    response = await next_call(request)
    # 响应
    print('2-r')
    return response


@app.middleware('http')
async def m1(request: Request, next_call):
    # 请求
    print('1-s')
    if request.url.path not in ['/docs', '/openapi.json']:
        return Response(status_code=403, content=f'the_hit_list')
    response = await next_call(request)
    # 响应
    print('1-r')

    return response


register_tortoise(
    app=app,
    config=config.TORTOISE_ORM
)
app.include_router(user_api, prefix="/user", tags=['用户查询'])

if __name__ == '__main__':
    uvicorn.run(
        'main:app',
        host='0.0.0.0',
        port=8000,
        reload=True
    )
```



## CORS

手动实现

```python
@app.middleware("http")
async def corsMiddleware(request: Request, call_next):
    response = await call_next(request)
    # 解决跨域
    response.headers["Access-Control-Allow-Origin"] = "*"
    return response
```



自带解决方案

```python
import uvicorn
from fastapi import FastAPI
from tortoise.contrib.fastapi import register_tortoise
from fastapi.middleware.cors import CORSMiddleware
import config
from apps.user import user_api

app = FastAPI()

# 添加相关中间件
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
    allow_credentials=True
)

register_tortoise(
    app=app,
    config=config.TORTOISE_ORM
)
app.include_router(user_api, prefix="/user", tags=['用户查询'])

if __name__ == '__main__':
    uvicorn.run(
        'main:app',
        host='0.0.0.0',
        port=8000,
        reload=True
    )
```

