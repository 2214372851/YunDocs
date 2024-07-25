# DrissionPage（具有网络调试的浏览器自动化）

[官方文档](https://drissionpage.cn/)

> 运行环境
>
> ​	python	^3.6

## 一、安装

```bash
pip install DrissionPage
```



## 二、模块

### 1、页面类

```python
# 只控制浏览器时使用
from DrissionPage import ChromiumPage

# 只收发数据包时使用
from DrissionPage import SessionPage

# 既可控制浏览器，也可收发数据包
from DrissionPage import WebPage
```



### 2、配置工具

```python
# 启动浏览器时有用，接管已存在的浏览器时是不生效的
from DrissionPage import ChromiumOptions

# 用于配置SessionPage或WebPage S模式的连接参数
from DrissionPage import SessionOptions

# Settings用于设置全局运行配置，如找不到元素时是否抛出异常等
from DrissionPage.common import Settings
```



### 3、其它工具

```python
# 键盘按键类，用于键入 ctrl、alt 等按键
from DrissionPage.common import Keys

# 动作链，用于执行一系列动作。
# 在浏览器页面对象中已有内置，无如特殊需要无需主动导入
from DrissionPage.common import Actions

# 与 selenium 一致的By类，获取元素，便于项目迁移
from DrissionPage.common import By
```



> - `wait_until`：可等待传入的方法结果为真
> - `make_session_ele`：从 html 文本生成`ChromiumElement`对象
> - `configs_to_here`：把配置文件复制到当前路径
> - `get_blob`：获取指定的 blob 资源
> - `tree`：用于打印页面对象或元素对象结构
> - `from_selenium`：用于对接 selenium 代码
> - `from_playwright`：用于对接 playwright 代码



```python
from DrissionPage.common import wait_until
from DrissionPage.common import make_session_ele
from DrissionPage.common import configs_to_here
```



### 4、异常

```python
# 异常放在DrissionPage.errors路径
from DrissionPage.errors import ElementNotFoundError
```



### 5、衍生对象类型

> Tab、Element 等对象是由 Page 对象生成，开发过程中需要类型判断时需要导入这些类型

```python
from DrissionPage.items import SessionElement
from DrissionPage.items import ChromiumElement
from DrissionPage.items import ShadowRoot
from DrissionPage.items import NoneElement
from DrissionPage.items import ChromiumTab
from DrissionPage.items import WebPageTab
from DrissionPage.items import ChromiumFrame
```



## 三、准备工作

在开始之前，我们先进行一些简单设置。

如果只使用收发数据包功能，无需任何准备工作。

如果要控制浏览器，需设置浏览器路径。程序默认设置控制 Chrome，所以下面用 Chrome 演示。如果要使用 Edge 或其它 Chromium 内核浏览器，设置方法是一样的。

注意

作者发现 92 版的 Chrome 存在一些奇怪的问题，导致有些电脑环境下不能启动，请尽量避免使用。

#### 执行步骤

##### 尝试启动浏览器

默认状态下，程序会自动在系统内查找 Chrome 路径。

执行以下代码，浏览器启动并且访问了项目文档，说明可直接使用，跳过后面的步骤即可。

```python
from DrissionPage import ChromiumPage

page = ChromiumPage()
page.get('http://g1879.gitee.io/DrissionPageDocs')
```



##### 设置路径

如果上面的步骤提示出错，说明程序没在系统里找到 Chrome 浏览器。

可用以下其中一种方法设置，设置会持久化记录到默认配置文件，之后程序会使用该设置启动。

获取浏览器路径的方法

- 这里的浏览器路径不一定是 Chrome，Edge 等 Chromium 内核的浏览器都可以。
- 打开浏览器，在地址栏输入`chrome://version`（Edge 输入`edge://version`），回车。 ![img](https://drissionpage.cn/assets/images/find_browser_path-1b46b5e4ba053115091a598d3b4211ac.png)
  如图所示，红框中就是要获取的路径。
  此法不限于 Windows，有界面的 Linux 也是这样取路径。

**🔸 方法一：**

新建一个临时 py 文件，并输入以下代码，填入您电脑里的 Chrome 浏览器可执行文件路径，然后运行。

```python
from DrissionPage import ChromiumOptions

path = r'D:\Chrome\Chrome.exe'  # 请改为你电脑内Chrome可执行文件路径
ChromiumOptions().set_browser_path(path).save()
```



这段代码会把浏览器路径记录到配置文件，今后启动浏览器皆以新路径为准。

另外，如果是想临时切换浏览器路径以尝试运行和操作是否正常，可以去掉 `.save()`，以如下方式结合第1️⃣步的代码。

```python
from DrissionPage import ChromiumPage, ChromiumOptions

path = r'D:\Chrome\Chrome.exe'  # 请改为你电脑内Chrome可执行文件路径
co = ChromiumOptions().set_browser_path(path)
page = ChromiumPage(co)
page.get('http://g1879.gitee.io/DrissionPageDocs')
```



**🔸 方法二：**

在命令行输入以下命令（路径改成自己电脑里的）：

```shell
dp -p D:\Chrome\chrome.exe
```



注意

- 注意命令行的 python 环境与项目应是同一个
- 注意要先使用 cd 命令定位到项目路径

------

##### 重试控制浏览器

现在，请重新执行第1️⃣步的代码，如果正确访问了项目文档，说明已经设置完成。

```python
from DrissionPage import ChromiumPage

page = ChromiumPage()
page.get('http://g1879.gitee.io/DrissionPageDocs')
```



------

#### 说明

当您完成准备工作后，无需关闭浏览器，后面的上手示例可继续使用当前浏览器。
