# Python 技巧与库



## TUI模块

> 包含常用的进度条、表格输出等功能

<iframe style="height: 600px" src="https://www.osgeo.cn/rich/console.html"/>



## 表格打印

`pip install prettytable`

```python
from prettytable import PrettyTable

table = PrettyTable(['title', 'img_url'])
table.add_row(['title', 'img_url'])
print(table)
```



## 多因子身份验证

[PyOTP](https://pyauth.github.io/pyotp/) 是一个用与生成和验证一次性密码的python库.它可以用于Web应用程序和其它需要用户登录的系统中实现双因素（2FA）或多因素（MFA）身份验证方法。

### 安装和配置PyOTP

安装PyOTP非常简单，只需要使用pip命令：

```
pip install pyotp
```

PyOTP没有复杂的依赖关系，安装过程通常很顺利。但是，如果你在安装过程中遇到权限问题，可以尝试使用`--user`标志：

```
pip install --user pyotp
```

安装完成后，你可以通过以下代码来验证安装是否成功：

```
import pyotp
print(pyotp.__version__)
```

如果能正确打印出版本号，说明安装成功。

### PyOTP的核心概念

PyOTP的核心概念非常简单，主要包括以下几点：

1. 1. **密钥（Secret Key）**：用于生成一次性密码的基础。
2. 2. **TOTP（基于时间的一次性密码）**：根据当前时间和密钥生成的一次性密码。
3. 3. **HOTP（基于HMAC的一次性密码）**：根据计数器和密钥生成的一次性密码。
4. 4. **URI**：用于在不同设备间共享OTP配置的标准格式。

让我们通过一个简单的例子来了解TOTP的基本用法：

```
import pyotp

# 生成一个随机密钥
secret = pyotp.random_base32()

# 创建一个TOTP对象
totp = pyotp.TOTP(secret)

# 生成当前的一次性密码
otp = totp.now()
print(f"Current OTP: {otp}")

# 验证一次性密码
is_valid = totp.verify(otp)
print(f"OTP is valid: {is_valid}")
```

这个例子展示了如何生成一个TOTP密码并验证它。PyOTP的API设计非常直观，使得实现2FA变得异常简单。

### 进阶技巧：自定义TOTP参数

PyOTP允许我们自定义TOTP的各种参数，以满足特定的安全需求。例如，我们可以更改OTP的长度，或者调整OTP的有效时间：

```python
import pyotp

# 创建一个8位数的TOTP，有效期为60秒
totp = pyotp.TOTP(pyotp.random_base32(), digits=8, interval=60)

otp = totp.now()
print(f"Custom OTP: {otp}")
```

这个例子创建了一个8位数的TOTP，有效期为60秒。通过调整这些参数，我们可以在安全性和用户体验之间找到平衡点。

### 实战案例：为Web应用添加2FA

让我们通过一个简单的Flask应用来展示如何使用PyOTP实现2FA：

```python
from flask import Flask, request, jsonify
import pyotp

app = Flask(__name__)

# 模拟用户数据库
users = {
    'alice': {
        'password': 'password123',
        'otp_secret': pyotp.random_base32()
    }
}

@app.route('/login', methods=['POST'])
def login():
    username = request.json.get('username')
    password = request.json.get('password')
    otp = request.json.get('otp')

    if username not in users or users[username]['password'] != password:
        return jsonify({'message': 'Invalid username or password'}), 401

    totp = pyotp.TOTP(users[username]['otp_secret'])
    if not totp.verify(otp):
        return jsonify({'message': 'Invalid OTP'}), 401

    return jsonify({'message': 'Login successful'}), 200

if __name__ == '__main__':
    app.run(debug=True)
```

这个例子展示了如何在登录过程中集成TOTP验证。用户需要提供用户名、密码和当前的OTP才能成功登录。

### PyOTP的实用小技巧

1. 1. **生成QR码**：PyOTP可以生成兼容Google Authenticator的URI，我们可以将这个URI转换为QR码，方便用户扫描：

```
import pyotp
import qrcode

totp = pyotp.TOTP('base32secret3232')
uri = totp.provisioning_uri("alice@google.com", issuer_name="Secure App")

qr = qrcode.QRCode(version=1, box_size=10, border=5)
qr.add_data(uri)
qr.make(fit=True)

img = qr.make_image(fill_color="black", back_color="white")
img.save("qr.png")
```

1. 1. **时间漂移处理**：在实际应用中，客户端和服务器的时间可能存在微小差异。PyOTP允许我们在验证时考虑这种时间漂移：

```
totp = pyotp.TOTP('base32secret3232')
totp.verify('492039', valid_window=1)  # 允许前后30秒的误差
```



## 脚手架模板

使用内置库 sring 的 `Template`

```python
from string import Template

s = Template('$who like $what')

print(s.substitute(who='i', what='python'))

print(s.safe_substitute(who='i')) # 缺少key时不会抛错

Template('${who}LikePython').substitute(who='I') # 在字符串内时使用{}
```

## 文本内置函数

```python
#字符串全小写
str.lower()
#字符串全大写
str.upper()
#字符串首字母大写
str.capitalize()
#字符串单词首字母大写
str.title()
#字符串大小写互换
str.swapcase()
#字符串中的所有大写字母转换为小写字母
str.casefold()
#用_从右边切分前面的为0后面的为1,切一次
str.split("_",1)[1]
#去空格和换行符
str.strip()	
#用b替换字符串里的a
str.replace('a','b')
#用于检查字符串是否是以指定子字符串开头(一般后面俩参数不用)
str.startswith(str, beg=0,end=len(string));
```

## 列表拼接成字符串

```python
#用“”里的东西拼接列表里的每一个元素
lst = []
s = "".join(lst)
```

## 函数重试器

最强大的重试模块

`pip install tenacity`

```python
from tenacity import retry, stop_after_attempt, wait_fixed, before_sleep_log, retry_if_exception_type

# stop_after_attempt当函数task重试3次后还是失败就停止重试并抛出错误, stop_after_delay重试10秒后就停止不进行重试，可以组合使用
# wait_fixed每次重试等待2秒, wait_random(min=1, max=5) 一到五秒随机等待
# before_sleep会在每次重试前等待，before_sleep_log(logger)用日志记录等待时间
# retry自定义重试条件, retry_if_exception_type这里指定了只有IOError错误才进行重试, retry_if_result(callback)接收一个函数函数的参数的task函数的返回值函数返回bool满足才进行重试
@retry(stop=stop_after_delay(10) | stop_after_attempt(3), wait=wait_fixed(2), before_sleep=before_sleep_log(logger), retry=retry_if_exception_type(IOError))
def task():
    raise Exception("task error")

```

## 异步文件操作

基于`asyncio`的异步文件操作库

`pip install aiofiles`

```python
import aiofiles
import asyncio


file_path = '/tmp/tmp.txt'

async def read_file(path: str) -> str:
    async with aiofiles.open(path) as af:
        return await af.read()

result = asyncio.run(read_file(file_path))
```

## 字符编码检测模块

`pip install chardet`

```python
import chardet

my_string = b'hello word'
print(chardet.detect(my_string))
# {'encoding': 'ascii', 'confidence': 1.0, 'language': ''}
```


## 格式化

```python
'我今年{}岁了'.format(2)
#%s是字符串，%d是整数
'我今年%d岁了'%(2)
```

## markdown 文档网站

`pip install mkdocs`

在项目根目录创建`mkdocs.yml`文件

结构为：
```
mkdocs.yml
docs/
    index.md
```

`mkdocs.yml`模板

其中material是mkdocs的主题需要单独安装

`pip install mkdocs-material`

可以通过配置插件`git-revision-date-localized`根据git提交来显示文档修改时间
```yaml
site_name: Yun download
site_url: https://2214372851.github.io/yundownload/
repo_url: https://github.com/2214372851/yundownload
copyright: Copyright 2021-2024
repo_name: 2214372851/yundownload

nav:
  - 介绍: "index.md"
  - 快速入门(0.2.X): "v2-quickstart.md"
  - 快速入门(0.3.X): "v3-quickstart.md"

theme:
  name: material
  language: zh

plugins:
  - git-revision-date-localized
  - search:
      lang: ru
```


按照前端惯例`docs`文件夹中的`index.md`是项目主页

其余的文档可以放在`docs`下或子文件夹下

可以通过以下命令直接在`GitHub`仓库创建一个docs分支来构建`GitHub Pages`静态文档网页

`mkdocs gh-deploy`




## 网页防盗链

溯源找上级URL，如果没有请求非法

```json
{
    "Referer": "https://www.baidu.com"
}
```

## 简易FTP文件服务

> 创建简易的http文件服务器（不推荐在生产环境使用应当选择 `nginx` 等）

`python -m http.server 80`



## 代理

```python
#代理的http/https由url决定(https://www.baidu.com/代理就是https)
proxies = {
    'http':'http://ip:端口'，
    'https':'https://ip:端口'
}
requests.get(url,proxies=proxies)
```



## 进程（资源单位）

> 每个进程至少要有一个线程

### 多进程（不建议，内存消耗太大）

```python
from multiprocessing import process
#用法和多线程一致
```



## 线程（运行单位）

> 启动每个程序默认有一个主线程

### 多线程

```python
from threading import Thread	#线程类
def a():
    pass
if __name__=='__main__'
	t = Thread(target=a，args=('name',))	#创建线程并给线程安排任务,args传参必须是个元组，一个参数的时候后面必须跟上逗号
	t.start() #多线程状态为可以开始工作，具体执行的时间由CPU决定
    
#改写线程类
class MyThread(Thread):
    def run(self): #当线程可以被运行时自动运行run
        for i in range(1000):
            print(i)
            
if __name__=='__mian__':
    t = MyThread()
    t.start()
```

## 线程池和进程池

一次性开辟一些线程，我们只需要把任务提交给任务，线程调度的任务交给线程池完成

```python
from concurrent.futures import ProcessPoolExecutor,ThreadPoolExecutor
def run(name):
    for i in range(100):
        print(name,i)

#线程池

if __name__ == "__main__":
    with ThreadPoolExecutor(20) as t: #线程池或者进程池的数量为20
        for i in range(10):			#一共有10个任务提交给线程池或进程池
            t.submit(run,name=f"线程{i}")
#进程池

if __name__ == "__main__":
    with ProcessPoolExecutor(20) as t:
        for i in range(10):
            t.submit(run,name=f"进程{i}")
```

## 协程（提高CPU利用，高效）

当程序遇见IO操作的时候，可以选择性的切换到其他任务上去

在微观上是一个任务一个任务的的切换，切换条件一般是IO操作

宏观上，我们看到的是多个任务一起执行

多任务异步操作

上方所讲是在单线程的条件下

```python
#阻塞操作,一般程序处于IO操作的时候，线程处于阻塞状态
time.sleep(3) 
input()
requests.get()
```

### 协程使用

协程任务里不能有同步操作

#### 一般写法

```python
import asyncio
import time
async def runs1():    #此时的函数是异步线协程函数，此时执行函数（run()）是一个协程对象
    # time.sleep(1)   #当任务出现同步操作，异步就中断
    await asyncio.sleep(1)  # 异步操作的代码,await等待协程操作,耗时自动挂起
    print('你好1')
async def runs2():
    await asyncio.sleep(2)
    print('你好2')
async def runs3():
    await asyncio.sleep(3)
    print('你好3')

if __name__ == '__main__':
    r1 = runs1()
    r2 = runs2()
    r3 = runs3()
    tasks = [r1, r2, r3]
    #一次性启动多个任务(协程)
    a = time.time()
    asyncio.run(asyncio.wait(tasks)) #协程程序需要运行需要asyncio模块支持
    b = time.time()
    print(b-a)
```

#### 推荐写法

```python
import asyncio
import time
async def runs1():    #此时的函数是异步线协程函数，此时执行函数（run()）是一个协程对象
    # time.sleep(1)   #当任务出现同步操作，异步就中断
    await asyncio.sleep(1)  # 异步操作的代码,await等待协程操作,耗时自动挂起
    print('你好1')
async def runs2():
    await asyncio.sleep(2)
    print('你好2')
async def runs3():
    await asyncio.sleep(3)
    print('你好3')

async def main():
    #第一种写法
    # r1 = runs1()
    # await r1
    #第二种写法(推荐)
    tasks = [
       asyncio.create_task(runs1),
       asyncio.create_task(runs2),
       asyncio.create_task(runs3)
    ]
    await asyncio.wait(tasks)

if __name__ == '__main__':
    asyncio.run(main())
```

爬虫中

```python
async def get(url):
    pass

async def mian():
    urls=[
        'url1',
        'url2'
    ]
    tasks = []
    for url in urls:
        a = get(url)
        #tasks.append(d)	#Python3.8以前
        tasks.append(asyncio.create_task(get(url)))	#Python3.8以后
        await asyncio.wait(tasks)
        
if __name__ == '__main__':
    asyncio.run(main())
```

```python
#requests.get() 是同步操作 -》异步操作aiohttp
import aiohttp
#aiohttp.ClientSession()   <==> requests 
async with aiohttp.ClientSession() as session:
    async with session.get(url) as respon:
        a = await respon.content.rad()    #等同于requests里的.content读取二进制数据，respon.text(),respon.json()
        with open(name,'wb') as f:	#创建文件，aiofiles异步（async with aiofiles.open）
            f.write(await a) #读取文件是异步操作需要await挂起	(await f.await(await a))
```

## 抓取视频

找到m3u8

通过m3u8下载到ts文件

合并ts文件

```python
执行终端命令
os.system()
```



## 加密解密模块

```python
#python 在 Windows下使用AES时要安装的是pycryptodome 模块xxxxxxxxxx from Crypotpython 在 Windows下使用AES时要安装的是pycryptodome 模块
pip install pycryptodome
#python 在 Linux下使用AES时要安装的是pycrypto模块
pip install pycrypto
```

## re正则匹配

```python
#匹配所有符合的内容a是正则表达式b是要匹配的文本,返回的是列表
re.findall(a,b)
#匹配所有符合的内容，返回的是迭代器拿到内容需要.group()
i = re.finditer
for t in i:
    t.group()
#search,返回的是match对象要用.group，匹配到一次就返回
re.search()
#match是从头开始匹配，文本开始匹配不到就为空
re.match()
#预加载正则表达式 re.S让点能匹配换行符
obj = re.compile('.*?',re.S)
obj.finditer(b)
```

## 浏览器自动化

```python
from selenium.webdriver import Chrome
from selenium.webdriver.common.keys import Keys	#Keys.ENTER模拟键盘回车

web = Chrome()
web.find_element(By.xpath,'').send_keys('python',Keys.ENTER)
#新窗口在selenium里不会自动切换到别的标签页，切换到最后一个标签页
web.switch_to.windows(web.windows_handles[-1])
#关掉子标签页，关掉后要切换标签页
web.close()

#如果页面里出现了iframe，必须拿到，然后切换到才可以拿去数据
iframe = find_element(By.xpath,'')
web.switch_to.frame(iframe)
#切换回原页面
web.switch_to.default_content()
#下拉标签select
from selenium.webdriver.support.select import Select
	#定位到select标签
select = find_element(By.xpath,'')
	#包装成下拉菜单
sel = Select(select)
for i in range(len(sel.options))
#无头浏览器	没图形化界面的浏览器
from selenium.webdriver.chrome.options import Options
opt = Optinos()
opt.add_argument("--headless")
opt.add_argument("--disbale-gpu")
web = Chrome(options=opt)
#事件链
from selenium.webdriver.common.action_chains import ActionChains
img = find_element(By.xpath,'')
#标签截图
img.screenshot_as_png
#priform可以执行，xy是偏移量
ActionChains(web).move_to_element_with_offset(img,x,y).click().perform()
#自动化被检测到
	#小于88，启动时，嵌入js代码
	#chrome的版本大于等于88
opt = Options()
opt.add_argument('--disable-blink-features=AutomationControlled')
web = Chrome(optins=opt)
#拖拽
btn = find_element(By.xpath,'')
ActionChains(web).drag_and_drop_by_doocet(btn,300,0).perform()

#获取文字
iframe = find_element(By.xpath,'').text
#获取标签属性
iframe = find_element(By.xpath,'').get_attribute("href")
```

判断列表为空，如果列表为空那么返回的值是False,不为空返回True

```python
if list:
    pass
```

## OS模块

```python
#当前使用的平台 win=>nt Linux/Unix=>posix
os.name
#当前工作目录
os.getcwd()
#返回指定目录下所有文件和文件名
os.listdir('./')
#删除一个文件
os.remove('./')
#运行shell命令
os.system('cmd/shell')
#获取路径分割符
os.sep
#返回一个文件的目录和文件名
os.path.split('c:\\xxx\\xxx.txt')
#判断一个路径是文件还是目录
os.path.isfile('c:\\xxx\\xxx.txt')
os.path.isdir('c:\\xxx\\xxx.txt')
#判断一个路径是否存在
os.path.exists('c:\\xxx\\xxx.txt')
#获取绝对路径
os.path.abspath('xxx.txt')
#规范path字符串形式
os.path.normpath('c:\\xxx\\xxx.txt')
#获取文件大小
os.path.getsize('c:\\xxx\\xxx.txt')
#分离文件名与拓展名
os.path.splitext('xxx.txt')
#拼接路径,其中一个有/那么之前的全忽略
os.path.join('home','name')
#返回文件名
os.path.basename('c:\\xxx\\xxx.txt')
#返回文件路径
os.path.dirname('c:\\xxx\\xxx.txt')
```

# 浏览器自动化

undetected_chromedriver

可以自动匹配驱动

# 上下文管理（contextlib）

```python
from contextlib import contextmanager

@contextmanager
def make_open_txt(filename, mode):
    fp = open(filename, mode)
    try:
        yield fp
    finally:
        fp.close()
        #####################
with open(filename ,mode) as f:
    f.read()
#上下的区别在于，上面的以try为分界try前面的是__init__，之后的是__exit__，上面的无论文件是否正常代开都会关闭，下面的文件代开报错即停止
#有点时候with无法自动关闭，就需要contextlib.closing来手动关闭
with contextlib.closing(open('1.txt')) as f:
    f.read()
```

# try语句

```python
#把不能保证正常运行的代码放到try
try:
    print(0)
#无论try能否运行finally里的都要执行
finally:
    print(1)
#当try出现错误时excpet里的语句执行，用TypeError as er来打印报错原因
except:
```

# wave:处理WAV格式音频库

```python
#打开文件	mode r,w普通读写	rb, wb 读写二进制文件
#rb：生成wav_read对象	wb：生成wav_write对象
wave.open(file, mode=None)
```

## Wave_read对象的方法

```python
import wave

wav = wave.open('1.wav')
#依次分别是：获取声道数，获取采样字节长度，获取采样频率，获取音频总帧数
print(wav.getchannels(), wav.getsampwidth(), wav.getframerate(), getnframes())
#wav.getparams()得到一个namedtuple(nchannels, sampwidth, framerate, nframes, comptype, compname)
```

## Wave_write对象的方法

```python
# wave.write 对象方法
#（1）open 创建文件
wav = wave.open('1.wav', 'wb')

#（2）set 设置参数
wav.setchannels(n) # 设置通道数
ww.setsampwidth(n) # 设置采样字节长度为 n
ww.setframerate(n) # 设置采样频率为 n

wav.setparams(n) # 设置所有形参，(nchannels, sampwidth, framerate, nframes, comptype, compname)，每项的值应可用于 set*() 方法。

# (3) writeframes 写入数据流
wav.writeframes(data) # 写入音频帧并确保 nframes 是正确的
wav.close()
```

# assert关键字（断言）

判断assert后面的是不是对的，不是对的会给你一个报错，且后面的代码不会继续执行了

# enumerate关键词(枚举)

```python
>>> seasons = ['Spring', 'Summer', 'Fall', 'Winter']
>>> list(enumerate(seasons))
[(0, 'Spring'), (1, 'Summer'), (2, 'Fall'), (3, 'Winter')]
```



# collections：容器库

- Counter：字典的子类，提供了可哈希对象的计数功能

  ```python
  >>> c = collections.Counter('hello world hello world hello nihao'.split())
  >>> c
  Counter({'hello': 3, 'world': 2, 'nihao': 1})
  # 获取指定对象的访问次数，也可以使用get()方法
  >>> c['hello']
  3
  >>> c = collections.Counter('hello world hello world hello nihao'.split())
  # 查看元素
  >>> list(c.elements())
  ['hello', 'hello', 'hello', 'world', 'world', 'nihao']
  # 追加对象，或者使用c.update(d)
  >>> c = collections.Counter('hello world hello world hello nihao'.split())
  >>> d = collections.Counter('hello world'.split())
  >>> c
  Counter({'hello': 3, 'world': 2, 'nihao': 1})
  >>> d
  Counter({'hello': 1, 'world': 1})
  >>> c + d
  Counter({'hello': 4, 'world': 3, 'nihao': 1})
  # 减少对象，或者使用c.subtract(d)
  >>> c - d
  Counter({'hello': 2, 'world': 1, 'nihao': 1})
  # 清除
  >>> c.clear()
  >>> c
  Counter()
  ```

  

- defaultdict：字典的子类，提供了一个工厂函数，为字典查询提供了默认值

- OrderedDict：字典的子类，保留了他们被添加的顺序

- namedtuple：创建命名元组子类的工厂函数

- deque：类似列表容器，实现了在两端快速添加(append)和弹出(pop)

  ```python
  '''
  append(x)：添加x到右端
  appendleft(x)：添加x到左端
  clear()：清楚所有元素，长度变为0
  copy()：创建一份浅拷贝
  count(x)：计算队列中个数等于x的元素
  extend(iterable)：在队列右侧添加iterable中的元素
  extendleft(iterable)：在队列左侧添加iterable中的元素，注：在左侧添加时，iterable参数的顺序将会反过来添加
  index(x[,start[,stop]])：返回第 x 个元素（从 start 开始计算，在 stop 之前）。返回第一个匹配，如果没找到的话，升起 ValueError 。
  insert(i,x)：在位置 i 插入 x 。注：如果插入会导致一个限长deque超出长度 maxlen 的话，就升起一个 IndexError 。
  pop()：移除最右侧的元素
  popleft()：移除最左侧的元素
  remove(value)：移去找到的第一个 value。没有抛出ValueError
  reverse()：将deque逆序排列。返回 None 。
  maxlen：队列的最大长度，没有限定则为None。
  '''
  >>> from collections import deque
  >>> d = deque(maxlen=10)
  >>> d
  deque([], maxlen=10)
  >>> d.extend('python')
  >>> [i.upper() for i in d]
  ['P', 'Y', 'T', 'H', 'O', 'N']
  >>> d.append('e')
  >>> d.appendleft('f')
  >>> d
  deque(['f', 'p', 'y', 't', 'h', 'o', 'n', 'e'], maxlen=10)
  ```

  

- ChainMap：类似字典的容器类，将多个映射集合到一个视图里面

  ```python
  >>> from collections import ChainMap
  >>> d1 = {'apple':1,'banana':2}
  >>> d2 = {'orange':2,'apple':3,'pike':1}
  >>> combined_d = ChainMap(d1,d2)
  >>> reverse_combind_d = ChainMap(d2,d1)
  >>> combined_d 
  ChainMap({'apple': 1, 'banana': 2}, {'orange': 2, 'apple': 3, 'pike': 1})
  >>> reverse_combind_d
  ChainMap({'orange': 2, 'apple': 3, 'pike': 1}, {'apple': 1, 'banana': 2})
  >>> for k,v in combined_d.items():
  ...      print(k,v)
  ... 
  pike 1
  apple 1
  banana 2
  orange 2
  >>> for k,v in reverse_combind_d.items():
  ...      print(k,v)
  ... 
  pike 1
  apple 3
  banana 2
  orange 2
  ```

  
