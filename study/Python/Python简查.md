# Python 技巧与库

## Gradio 快速生成AI应用的UI服务

https://www.gradio.app/

## Logging 最佳实践

在软件开发中，高效的日志记录系统对于问题诊断、性能监控和系统维护至关重要。Python的`logging`模块作为标准库的核心组件，提供了强大而灵活的日志记录功能。本文将深入探讨如何充分利用`logging`模块，构建专业的日志记录系统。

### 基础概念

### 核心组件

#### Logger（日志记录器）

- • 应用程序代码直接使用的接口
- • 支持层次结构，可以通过点号分隔创建父子关系（如：app.ui、app.logic）
- • 提供不同级别的日志记录方法：debug()、info()、warning()、error()、critical()
- • 可以同时向多个目标输出日志

示例：

```
# 创建层次化的logger
logger = logging.getLogger('app.ui')
logger.setLevel(logging.DEBUG)

# 使用不同级别记录日志
logger.debug('调试信息')
logger.info('用户登录成功')
logger.warning('配置文件不完整')
logger.error('数据库连接失败')
logger.critical('系统内存不足')

# 携带额外上下文信息
extra = {'user_id': '12345', 'ip': '192.168.1.1'}
logger.info('用户操作', extra=extra)
```

#### Handler（日志处理器）

- • 决定如何处理日志记录
- • 常用处理器类型：
    - • FileHandler: 将日志写入文件
    - • StreamHandler: 将日志输出到控制台
    - • RotatingFileHandler: 支持日志文件轮转
    - • SMTPHandler: 通过邮件发送日志
    - • SysLogHandler: 将日志发送到系统日志
- • 每个Handler可以有自己的日志级别和格式化器

示例：

```
# 文件处理器
file_handler = logging.FileHandler('app.log')
file_handler.setLevel(logging.INFO)

# 控制台处理器
console_handler = logging.StreamHandler()
console_handler.setLevel(logging.DEBUG)

# 轮转文件处理器
rotating_handler = RotatingFileHandler(
    'app.log',
    maxBytes=1024*1024,  # 1MB
    backupCount=5
)

# 邮件处理器
smtp_handler = SMTPHandler(
    mailhost=('smtp.example.com', 587),
    fromaddr='logger@example.com',
    toaddrs=['admin@example.com'],
    subject='应用程序错误警报',
    credentials=('username', 'password')
)
smtp_handler.setLevel(logging.ERROR)  # 只发送错误及以上级别的日志
```

#### Filter（过滤器）

- • 提供更细粒度的日志控制
- • 可以基于以下条件过滤日志：
    - • 日志记录的属性（如模块名、函数名）
    - • 自定义的业务逻辑
    - • 特定的日志模式

示例：

```
class UserFilter(logging.Filter):
    """只记录特定用户的日志"""
    def __init__(self, user_id):
        super().__init__()
        self.user_id = user_id

    def filter(self, record):
        if not hasattr(record, 'user_id'):
            return True
        return record.user_id == self.user_id

class SensitiveFilter(logging.Filter):
    """过滤敏感信息"""
    def filter(self, record):
        sensitive_words = ['password', 'credit_card', 'ssn']
        return not any(word in record.getMessage().lower() for word in sensitive_words)

# 使用过滤器
logger.addFilter(UserFilter('12345'))
logger.addFilter(SensitiveFilter())
```

#### Formatter（格式化器）

- • 定义日志记录的最终格式
- • 常用的格式化属性：
    - • %(asctime)s: 时间戳
    - • %(name)s: 日志记录器名称
    - • %(levelname)s: 日志级别
    - • %(message)s: 日志消息
    - • %(pathname)s: 完整路径名
    - • %(filename)s: 文件名
    - • %(module)s: 模块名
    - • %(funcName)s: 函数名
    - • %(lineno)d: 行号
    - • %(process)d: 进程ID
    - • %(thread)d: 线程ID

示例：

```
# 基础格式化器
basic_formatter = logging.Formatter(
    '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)

# 详细格式化器
detailed_formatter = logging.Formatter(
    '[%(asctime)s] %(levelname)s [%(name)s.%(funcName)s:%(lineno)d] %(message)s'
)

# JSON格式化器
class JsonFormatter(logging.Formatter):
    def format(self, record):
        return json.dumps({
            'timestamp': self.formatTime(record),
            'level': record.levelname,
            'logger': record.name,
            'message': record.getMessage(),
            'module': record.module,
            'function': record.funcName,
            'line': record.lineno,
            'thread': record.thread,
            'thread_name': record.threadName
        })

# 应用格式化器
file_handler.setFormatter(detailed_formatter)
console_handler.setFormatter(basic_formatter)
```

### 日志级别

Python logging模块定义了以下标准日志级别（从低到高）：

1. 1. **DEBUG (10)**

    ```
    logger.debug('数据库查询耗时: %s秒', query_time)
    logger.debug(f'用户输入参数: {user_input}')
    ```

    - • 详细的调试信息
    - • 适用场景：
        - • 问题诊断
        - • 开发过程中的变量跟踪
        - • 程序流程追踪

2. 2. **INFO (20)**

    ```
    logger.info('应用程序启动成功')
    logger.info('用户%s完成订单%s', user_id, order_id)
    ```

    - • 确认程序按预期运行的信息
    - • 适用场景：
        - • 程序启动/关闭
        - • 重要业务流程的完成
        - • 系统状态变更

3. 3. **WARNING (30)**

    ```
    logger.warning('配置文件不完整，使用默认配置')
    logger.warning('磁盘使用率超过80%')
    ```

    - • 表示可能的问题，但程序仍在正常运行
    - • 适用场景：
        - • 配置文件缺失但使用了默认值
        - • 功能即将弃用提醒
        - • 系统资源不足预警

4. **ERROR (40)**

    ```python
    try:
        result = api_call()
    except Exception as e:
        logger.error('API调用失败: %s', str(e), exc_info=True)
    ```

    - • 由于严重问题，程序的某些功能已经不能正常执行
    - • 适用场景：
        - • 数据库连接失败
        - • API调用异常
        - • 重要业务流程失败

5. **CRITICAL (50)**

    ```python
    logger.critical('数据库主从同步中断')
    logger.critical('系统内存不足，无法继续处理请求')
    ```

    - • 程序本身可能无法继续运行的严重问题
    - • 适用场景：
        - • 系统内存耗尽
        - • 主要组件无响应
        - • 数据损坏

### 日志级别的最佳实践

1. 1. **级别选择原则**

    ```python
    # 根据环境设置不同的日志级别
    if environment == 'development':
        logger.setLevel(logging.DEBUG)
    elif environment == 'production':
        logger.setLevel(logging.WARNING)
    ```

2. 2. **自定义日志级别**

    ```python
    # 定义介于INFO和WARNING之间的日志级别
    TRACE_LEVEL = 25
    logging.addLevelName(TRACE_LEVEL, 'TRACE')
    
    def trace(self, message, *args, **kwargs):
        self.log(TRACE_LEVEL, message, *args, **kwargs)
    
    logging.Logger.trace = trace
    ```

3. 3. **级别继承关系**

    ```python
    # 父logger的级别会影响子logger
    root_logger = logging.getLogger()
    root_logger.setLevel(logging.WARNING)
    
    # 子logger只会记录WARNING及以上级别的日志
    child_logger = logging.getLogger('app.module')
    ```

### 最佳实践

#### 1. 基础配置

```python
import logging

# 创建logger
logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

# 创建处理器
file_handler = logging.FileHandler('app.log')
console_handler = logging.StreamHandler()

# 设置格式
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
file_handler.setFormatter(formatter)
console_handler.setFormatter(formatter)

# 添加处理器
logger.addHandler(file_handler)
logger.addHandler(console_handler)
```

#### 2. 结构化日志

```python
import json
import logging

class JsonFormatter(logging.Formatter):
    def format(self, record):
        return json.dumps({
            'timestamp': self.formatTime(record),
            'level': record.levelname,
            'message': record.getMessage(),
            'module': record.module,
            'function': record.funcName,
            'line': record.lineno
        })
```

#### 3. 异步日志处理

```python
from logging.handlers import QueueHandler, QueueListener
import queue

# 创建队列
log_queue = queue.Queue()
queue_handler = QueueHandler(log_queue)

# 设置监听器
file_handler = logging.FileHandler('app.log')
listener = QueueListener(log_queue, file_handler)
listener.start()
```

#### 4. 分布式追踪集成

```python
import logging
from opentelemetry import trace
from typing import Optional

class TraceContextFormatter(logging.Formatter):
    """集成OpenTelemetry追踪上下文的日志格式化器"""

    def format(self, record):
        # 获取当前追踪上下文
        span_context = trace.get_current_span().get_span_context()

        if span_context.is_valid:
            record.trace_id = format(span_context.trace_id, '032x')
            record.span_id = format(span_context.span_id, '016x')
        else:
            record.trace_id = '0' * 32
            record.span_id = '0' * 16

        return super().format(record)

# 使用示例
formatter = TraceContextFormatter(
    '%(asctime)s [%(trace_id)s:%(span_id)s] %(levelname)s %(message)s'
)
```

#### 5. 结构化错误处理

```python
import logging
import traceback
from typing import Dict, Any

class ErrorLogger:
    """增强的错误日志记录器"""

    def __init__(self, logger: logging.Logger):
        self.logger = logger

    def log_error(
        self,
        error: Exception,
        context: Optional[Dict[str, Any]] = None,
        level: int = logging.ERROR
    ) -> None:
        """
        记录详细的错误信息

        Args:
            error: 异常对象
            context: 额外的上下文信息
            level: 日志级别
        """
        error_details = {
            'error_type': error.__class__.__name__,
            'error_message': str(error),
            'traceback': traceback.format_exc(),
            'context': context or {}
        }

        self.logger.log(
            level,
            'Error occurred: %(error_type)s - %(error_message)s',
            error_details
        )

        if level >= logging.ERROR:
            self.logger.debug(
                'Detailed traceback:\n%s',
                error_details['traceback']
            )

# 使用示例
logger = logging.getLogger(__name__)
error_logger = ErrorLogger(logger)

try:
    # 一些可能出错的操作
    result = 1 / 0
except Exception as e:
    error_logger.log_error(
        e,
        context={'operation': 'division', 'inputs': {'dividend': 1, 'divisor': 0}}
    )
```

### 进阶技巧

#### 1. 上下文管理

```python
from contextlib import contextmanager
import logging

@contextmanager
def log_context(**kwargs):
    old_values = {}
    logger = logging.getLogger()

    try:
        for key, value in kwargs.items():
            old_values[key] = getattr(logger, key, None)
            setattr(logger, key, value)
        yield logger
    finally:
        for key, value in old_values.items():
            setattr(logger, key, value)
```

#### 2. 性能优化

```python
import logging

logger = logging.getLogger(__name__)

# 避免不必要的字符串格式化
if logger.isEnabledFor(logging.DEBUG):
    logger.debug(f"Complex calculation result: {expensive_function()}")
```

#### 3. 安全处理

```python
import logging
from typing import Any, Dict

class SensitiveFormatter(logging.Formatter):
    SENSITIVE_FIELDS = {'password', 'token', 'secret'}

    def _filter_sensitive_data(self, record: Dict[str, Any]) -> Dict[str, Any]:
        for field in self.SENSITIVE_FIELDS:
            if field in record:
                record[field] = '******'
        return record
```

### 配置示例

#### 1. 生产环境配置

~~~python
# Python字典配置
LOGGING_CONFIG = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'verbose': {
            'format': '{levelname} {asctime} {module} {process:d} {thread:d} {message}',
            'style': '{',
        },
    },
    'handlers': {
        'file': {
            'class': 'logging.handlers.RotatingFileHandler',
            'filename': 'production.log',
            'maxBytes': 1024 * 1024 * 5,  # 5 MB
            'backupCount': 5,
            'formatter': 'verbose',
        },
    },
    'loggers': {
        '': {
            'handlers': ['file'],
            'level': 'INFO',
        },
    }
}

# YAML配置示例
```yaml
version: 1
disable_existing_loggers: false

formatters:
  verbose:
    format: "%(levelname)s %(asctime)s %(module)s %(process)d %(thread)d %(message)s"
  simple:
    format: "%(levelname)s %(message)s"

handlers:
  console:
    class: logging.StreamHandler
    level: DEBUG
    formatter: simple
    stream: ext://sys.stdout

  file:
    class: logging.handlers.RotatingFileHandler
    level: INFO
    formatter: verbose
    filename: production.log
    maxBytes: 5242880  # 5MB
    backupCount: 5
    encoding: utf8

loggers:
  "":  # root logger
    level: INFO
    handlers: [console, file]
    propagate: no
~~~

### 最佳实践建议

1. **命名规范**
    - • 使用模块级别的logger: `logger = logging.getLogger(__name__)`
    - • 为不同组件使用有意义的logger名称
2. **异常处理**
    - • 始终使用`exception()`方法记录异常
    - • 包含足够的上下文信息
3. **性能考虑**
    - • 使用异步日志处理器处理大量日志
    - • 合理设置日志级别
    - • 使用日志轮转避免文件过大
4. **安全性**
    - • 永远不要记录敏感信息
    - • 实施访问控制
    - • 定期归档和清理日志

### 常见陷阱与解决方案

**重复日志记录**

```python
# 错误示例
logger = logging.getLogger('my_app')
logger.setLevel(logging.INFO)
handler = logging.StreamHandler()
logger.addHandler(handler)
logger.addHandler(handler)  # 重复添加handler

# 正确示例
logger = logging.getLogger('my_app')
logger.setLevel(logging.INFO)
# 检查是否已存在handler
if not logger.handlers:
    handler = logging.StreamHandler()
    logger.addHandler(handler)
```

**propagate设置不当**

```python
# 错误示例 - 日志会重复输出
logger = logging.getLogger('my_app.module')
logger.addHandler(handler)
# 未设置propagate=False，导致日志同时通过父logger输出

# 正确示例
logger = logging.getLogger('my_app.module')
logger.propagate = False  # 防止日志向上传递
logger.addHandler(handler)
```

**性能问题示例**

```python
# 低效的日志记录
logger.debug('User data: ' + str(expensive_function()))  # 即使日志级别不够也会执行函数

# 高效的日志记录
if logger.isEnabledFor(logging.DEBUG):
    logger.debug('User data: %s', expensive_function())
```

### 日志监控与告警

```python
import logging
from typing import Callable, Optional
import smtplib
from email.message import EmailMessage

class AlertHandler(logging.Handler):
    def __init__(
        self,
        alert_level: int = logging.ERROR,
        alert_callback: Optional[Callable] = None,
        email_config: Optional[dict] = None
    ):
        super().__init__()
        self.alert_level = alert_level
        self.alert_callback = alert_callback
        self.email_config = email_config

    def emit(self, record: logging.LogRecord):
        if record.levelno >= self.alert_level:
            if self.alert_callback:
                self.alert_callback(record)
            if self.email_config:
                self._send_email_alert(record)

    def _send_email_alert(self, record: logging.LogRecord):
        msg = EmailMessage()
        msg.set_content(self.format(record))
        msg['Subject'] = f'Alert: {record.levelname} - {record.getMessage()}'
        msg['From'] = self.email_config['from']
        msg['To'] = self.email_config['to']

        with smtplib.SMTP(self.email_config['smtp_host']) as smtp:
            smtp.send_message(msg)

# 使用示例
alert_handler = AlertHandler(
    alert_level=logging.ERROR,
    email_config={
        'from': 'alerts@example.com',
        'to': 'admin@example.com',
        'smtp_host': 'smtp.example.com'
    }
)
logger.addHandler(alert_handler)
```

### 日志聚合与分析

```python
import logging
import json
from datetime import datetime
from elasticsearch import Elasticsearch

class ElasticsearchHandler(logging.Handler):
    def __init__(self, es_client: Elasticsearch, index_prefix: str = 'logs'):
        super().__init__()
        self.es_client = es_client
        self.index_prefix = index_prefix

    def emit(self, record: logging.LogRecord):
        try:
            log_entry = {
                'timestamp': datetime.fromtimestamp(record.created).isoformat(),
                'level': record.levelname,
                'logger': record.name,
                'message': record.getMessage(),
                'module': record.module,
                'function': record.funcName,
                'line': record.lineno,
            }

            if hasattr(record, 'extra'):
                log_entry.update(record.extra)

            index_name = f"{self.index_prefix}-{datetime.now():%Y.%m.%d}"
            self.es_client.index(index=index_name, document=log_entry)

        except Exception as e:
            self.handleError(record)  # 处理错误，避免日志处理器失败
```



## 序列化与反序列化

### 序列化（Serialization）

序列化是一个将内存中的数据对象转换为特定格式的过程，这个过程也被称为"编组"（marshalling）或"扁平化"（flattening）。通过序列化，我们可以：

- 将复杂的数据结构（如对象、列表、字典等）转换为字节序列
- 实现数据的持久化存储（保存到文件系统）
- 在网络上传输数据（如分布式系统间的通信）
- 在不同的应用程序或系统之间共享数据

序列化后的数据可以采用多种格式：

- 二进制格式（如pickle生成的字节流）
- 文本格式（如JSON、XML、YAML）
- 自定义格式（根据特定需求设计的格式）

示例：

```python
import pickle

# 原始数据
user_data = {
   'username': '张三',
   'age': 25,
   'hobbies': ['读书', '游泳', '编程']
}

# 序列化示例
serialized = pickle.dumps(user_data)  # 转换为字节流
with open('user.dat', 'wb') as f:     # 保存到文件
   pickle.dump(user_data, f)
```

### 反序列化（Deserialization）

反序列化是将序列化后的数据（如字节流或文件）重新转换为Python对象的过程。这个过程让我们能够：

- 还原之前保存的数据状态
- 读取通过网络传输的序列化对象
- 加载持久化存储的复杂数据结构

示例代码：

```python
import pickle

# 先序列化数据获取正确的字节串
test_data = {'name': '张三', 'age': 25}
serialized_bytes = pickle.dumps(test_data)
print(serialized_bytes)  # 复制这个输出来替换原来的字节串

# 然后再反序列化
data = pickle.loads(serialized_bytes)
print(f"反序列化后的数据：{data}")

# 从文件反序列化
try:
   with open('data.pkl', 'rb') as f:
       loaded_data = pickle.load(f)
   print(f"从文件加载的数据：{loaded_data}")
except FileNotFoundError:
   print("文件不存在")
except pickle.UnpicklingError:
   print("反序列化失败：数据格式错误")
```

注意事项：

- 反序列化时必须使用二进制模式（'rb'）打开文件
- 建议使用异常处理来捕获可能的错误
- 只反序列化来自可信源的数据，因为恶意的pickle数据可能包含危险代码

### 应用场景

- **数据持久化**：将程序运行时的数据保存到文件中，以便下次使用
- **网络传输**：在分布式系统中传输复杂的数据结构
- **缓存**：将计算结果缓存到磁盘以提高性能

### 1. pickle模块基础用法

pickle模块提供了四个核心函数用于序列化和反序列化：

- `dump()`: 将数据序列化到文件
- `dumps()`: 将数据序列化为字节流
- `load()`: 从文件反序列化数据
- `loads()`: 从字节流反序列化数据

#### 1.1 序列化操作

```python
import pickle

# 示例数据
user = {
   "name": "张三",
   "age": 25,
   "skills": ["Python", "Java", "SQL"],
   "scores": {"语文": 90, "数学": 95}
}

# 方法1：序列化到文件
with open('user.pkl', 'wb') as f:
   pickle.dump(user, f, protocol=pickle.HIGHEST_PROTOCOL)  # 使用最高协议版本

# 方法2：序列化为字节流
byte_data = pickle.dumps(user)
```

#### 1.2 反序列化操作

```python
# 方法1：从文件反序列化
try:
   with open('user.pkl', 'rb') as f:
       loaded_user = pickle.load(f)
except FileNotFoundError:
   print("文件不存在")
except pickle.UnpicklingError:
   print("数据格式错误")

# 方法2：从字节流反序列化
try:
   restored_user = pickle.loads(byte_data)
except pickle.UnpicklingError:
   print("字节流数据格式错误")
```

#### 1.3 支持的数据类型

pickle模块支持以下Python数据类型：

| 类型     | 示例                        |
| -------- | --------------------------- |
| 基本类型 | int, float, str, bool, None |
| 容器类型 | list, tuple, dict, set      |
| 自定义类 | class的实例对象             |
| 函数和类 | 模块中定义的函数和类        |

#### 1.4 最佳实践

1. 1. **异常处理**：

```python
def save_data(data, filename):
   try:
       with open(filename, 'wb') as f:
           pickle.dump(data, f)
       return True
   except (IOError, pickle.PickleError) as e:
       print(f"保存失败：{str(e)}")
       return False
```

1. 1. **使用上下文管理器**：

```python
def load_data(filename):
   try:
       with open(filename, 'rb') as f:
           return pickle.load(f)
   except (FileNotFoundError, pickle.UnpicklingError) as e:
       print(f"加载失败：{str(e)}")
       return None
```

1. 1. **指定协议版本**：

```python
# 使用最新协议版本提高性能
serialized = pickle.dumps(data, protocol=pickle.HIGHEST_PROTOCOL)
```

#### 1.5 注意事项

- 始终使用二进制模式（`'wb'`/`'rb'`）操作文件
- 不要加载来源不可信的pickle数据
- 大文件建议使用`with`语句处理文件操作
- 考虑使用异常处理提高代码健壮性

### 2. 安全性考量

在使用pickle模块时，安全性是一个非常重要的考虑因素。pickle在反序列化过程中可以执行任意Python代码，这可能带来严重的安全隐患。

#### 2.1 主要安全风险

```python
# 恶意代码示例
import os

class MaliciousClass:
   def __reduce__(self):
       return (os.system, ('rm -rf /',))  # 危险！可能删除系统文件

# 如果反序列化这个对象，可能导致系统损坏
malicious_data = pickle.dumps(MaliciousClass())
```

#### 2.2 安全使用建议

1. 1. **数据来源验证**

```python
def safe_load_pickle(file_path, allowed_modules=None):
   if allowed_modules is None:
       allowed_modules = {'builtins'}

   class RestrictedUnpickler(pickle.Unpickler):
       def find_class(self, module, name):
           if module not in allowed_modules:
               raise pickle.UnpicklingError(
                   f"不允许加载模块 {module}"
               )
           return super().find_class(module, name)

   with open(file_path, 'rb') as f:
       return RestrictedUnpickler(f).load()
```

1. 2. **数据签名验证**

```python
import hmac
import hashlib

def save_with_signature(data, file_path, secret_key):
   # 序列化数据
   pickled_data = pickle.dumps(data)
   # 创建签名
   signature = hmac.new(
       secret_key.encode(),
       pickled_data,
       hashlib.sha256
   ).hexdigest()

   with open(file_path, 'wb') as f:
       pickle.dump((signature, pickled_data), f)

def load_with_signature(file_path, secret_key):
   with open(file_path, 'rb') as f:
       signature, pickled_data = pickle.load(f)

   # 验证签名
   expected_signature = hmac.new(
       secret_key.encode(),
       pickled_data,
       hashlib.sha256
   ).hexdigest()

   if not hmac.compare_digest(signature, expected_signature):
       raise ValueError("数据签名验证失败！")

   return pickle.loads(pickled_data)
```

#### 2.3 安全替代方案

当处理不可信数据时，建议使用以下替代方案：

1. 1. **JSON**：

```python
import json

# 序列化
with open('data.json', 'w', encoding='utf-8') as f:
   json.dump(data, f, ensure_ascii=False)

# 反序列化
with open('data.json', 'r', encoding='utf-8') as f:
   data = json.load(f)
```

1. 2. **MessagePack**：

```python
import msgpack

# 序列化
with open('data.msgpack', 'wb') as f:
   msgpack.pack(data, f)

# 反序列化
with open('data.msgpack', 'rb') as f:
   data = msgpack.unpack(f)
```

相比pickle，JSON和MessagePack更安全的主要原因是它们只能序列化基本数据类型（如字符串、数字、数组等），而不支持序列化代码或可执行对象。在反序列化过程中，它们仅进行纯数据转换，不会执行任何代码。而pickle由于支持序列化Python中的几乎所有对象（包括函数和类），在反序列化时可能会执行恶意代码，存在安全隐患。因此，在处理不可信数据时（如外部API响应或用户上传的数据），建议使用JSON或MessagePack作为更安全的替代方案。

#### 2.4 最佳实践清单

- ✅ 只反序列化来自可信源的数据
- ✅ 实现数据完整性验证机制
- ✅ 使用受限的Unpickler类
- ✅ 考虑使用更安全的序列化格式
- ❌ 避免加载未知来源的pickle文件
- ❌ 不在网络服务中直接使用pickle

### 3. 性能优化

- 使用最高协议版本以提高序列化速度和效率
- 对大数据使用压缩以减少存储空间
- 实现缓存机制以提高性能

```python
# 使用gzip压缩
import gzip

with gzip.open('data.pkl.gz', 'wb') as f:
   pickle.dump(data, f)

with gzip.open('data.pkl.gz', 'rb') as f:
   loaded_data = pickle.load(f)
```

### 4. 实战案例

#### 4.1 游戏存档系统

使用pickle可以轻松实现游戏存档功能：

```python
class GameSaveSystem:
   def save_game(self, player_data, filename):
       try:
           with open(filename, 'wb') as f:
               pickle.dump({'player': player_data, 'timestamp': time.time()}, f)
           print("游戏已保存")
       except Exception as e:
           print(f"保存失败: {e}")

   def load_game(self, filename):
       try:
           with open(filename, 'rb') as f:
               return pickle.load(f)
       except Exception as e:
           print(f"加载失败: {e}")
           return None
```

#### 4.2 网络传输示例

以下是一个使用 socket 和 pickle 实现简单客户端-服务器数据传输的示例：

```python
# server.py
import socket
import pickle

def start_server():
   server = socket.socket()
   server.bind(('localhost', 9999))
   server.listen()
   print("服务器启动，等待连接...")

   while True:
       client, addr = server.accept()
       print(f"客户端 {addr} 已连接")

       # 接收并反序列化数据
       data = pickle.loads(client.recv(1024))
       print(f"收到数据: {data}")

       # 发送响应
       response = {"status": "success"}
       client.send(pickle.dumps(response))
       client.close()

# client.py
import socket
import pickle

def send_data(data):
   client = socket.socket()
   client.connect(('localhost', 9999))

   # 发送序列化数据
   client.send(pickle.dumps(data))

   # 接收响应
   response = pickle.loads(client.recv(1024))
   print(f"服务器响应: {response}")
   client.close()

# 使用示例
if __name__ == '__main__':
   # 服务器端
   # start_server()

   # 客户端
   data = {
       "name": "张三",
       "age": 25
   }
   send_data(data)
```

这个简化版本展示了 pickle 在网络传输中的基本用法:

1. 1. 服务器监听连接
2. 2. 客户端连接并发送序列化数据
3. 3. 服务器接收并反序列化数据
4. 4. 服务器发送响应
5. 5. 客户端接收并处理响应



## `map` 函数详解

### 基本用法

`map(function, iterables, ...)`

-  `function`：要应用的函数，可以是内置函数、自定义函数或 lambda 表达式
-  `iterable`：一个或多个可迭代对象（列表、元组、字符串等）
- 返回值：返回一个 map 对象（迭代器）

### 单参数函数映射

```python
# 使用普通函数
def square(x):
    return x ** 2

numbers = [1, 2, 3, 4, 5]
squared = list(map(square, numbers))
print(squared)  # 输出: [1, 4, 9, 16, 25]

# 使用 lambda 表达式（更简洁）
cubed = list(map(lambda x: x ** 3, numbers))
print(cubed)    # 输出: [1, 8, 27, 64, 125]
```



### 多参数函数映射

map 可以同时处理多个序列，函数会依次接收来自每个序列的对应参数：

```python
# 多序列运算示例
list1 = [1, 2, 3, 4]
list2 = [10, 20, 30, 40]
list3 = [100, 200, 300, 400]

# 计算三个数的加权平均
def weighted_sum(x, y, z):
    return (x * 0.3 + y * 0.3 + z * 0.4)

result = list(map(weighted_sum, list1, list2, list3))
print(result)  # 输出: [43.3, 86.6, 129.9, 173.2]
```



### 惰性求值

map 返回的是迭代器，具有惰性求值的特性。这意味着只有在实际需要结果时才会进行计算：

```python
# 创建一个大数列表
numbers = range(1, 1000000)

# 这一步不会立即计算
mapped = map(lambda x: x ** 2, numbers)

# 只有在使用结果时才会计算
for i in mapped:
    if i > 100:
        print(f"First number > 100 is: {i}")
        break
```



### 内存效率

由于惰性求值的特性，map 特别适合处理大数据集：

```python
# 处理大文件示例
def process_line(line):
    return line.strip().upper()

with open('large_file.txt', 'r') as file:
    # 不会一次性读入所有行
    processed_lines = map(process_line, file)
    # 逐行处理以节省内存
    for line in processed_lines:
        # 处理每一行...
        pass
```



## Requests-HTML：可以渲染Js的模块

> 它不光继承了Requests的简洁设计，还自带JavaScript渲染和XPath解析。

`pip install requests-html`

### 获取网页所有链接

```python
from requests_html import HTMLSession
session = HTMLSession()
r = session.get('http://python.org')
print(r.html.links)  # 轻松获取页面所有链接
```

### Js渲染

```python
from requests_html import HTMLSession
session = HTMLSession()
r = session.get('http://example.com')
r.html.render()  # 等待JS执行完成
# 获取动态加载的数据
results = r.html.find('#dynamic-content')
```

### CSS选择器和XPath

```python
from requests_html import HTMLSession
session = HTMLSession()
r = session.get('http://books.toscrape.com')
# CSS选择器
prices = r.html.find('p.price_color')
# XPath也行
titles = r.html.xpath('//h3/a/text()')
```

### 协程异步操作

```python
import asyncio
from requests_html import AsyncHTMLSession
async def get_pages():
asession = AsyncHTMLSession()
r = await asession.get('http://python.org')
return r
results = asyncio.run(get_pages())

asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy()) # Windows 事件循环报错时指定 // [!code warning]
```



## 绕过 cloudflare 人机验证

> Cloudflare 的人机验证（通常指的是 CAPTCHA 或 JavaScript挑战）是为了帮助网站或服务区分真实用户和恶意机器人（例如爬虫、攻击者等）而设计的一种安全措施。Cloudflare
> 作为一个提供CDN和网络安全服务的公司，提供多种保护机制来防止DDoS攻击、恶意流量、滥用等。人机验证是其中的一部分。

::: tip
由于 cloudflare 会验证 TLS 连接所以建议使用 `curl_cffi`
模块来弥补 Python 底层 openSSL 模块的底层 TLS 连接被识别的问题。
:::

### 本次使用的技术

- `curl_cffi`
- `DrissionPage`

### 示例代码

```python
co = ChromiumOptions().set_browser_path('google-chrome')
co.new_env()
#co.headless() # 部分 cloudflare 无头模式无法绕过 // [!code error]
#co.set_proxy('http://192.168.7.16:7890') # 配置代理，不能忘记curl_cffi也需要代理 // [!code warning]
arguments = [
    "-no-first-run",
    "-force-color-profile=srgb",
    "-metrics-recording-only",
    "-password-store=basic",
    "-use-mock-keychain",
    "-export-tagged-pdf",
    "-no-default-browser-check",
    "-disable-background-mode",
    "-enable-features=NetworkService,NetworkServiceInProcess,LoadCryptoTokenExtension,PermuteTLSExtensions",
    "-disable-features=FlashDeprecationWarning,EnablePasswordsAccountStorage",
    "-deny-permission-prompts",
    "-disable-gpu",
    "-accept-lang=zh-CN", # 根据网站选择支持的地区 // [!code warning]
    "--guest"
]
for arg in arguments:
    co.set_argument(arg)
co.incognito()
co.set_argument("--no-sandbox") # Linux中不设置无法使用 // [!code error]
logger.info("打开浏览器")
browser = Chromium(co)
logger.info("打开浏览器成功")
tab.set.user_agent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36') # 需要关注不同系统的UA不同 // [!code error]
tab.set.window.max() # 实测可有可无
tab.listen.start("worldwide.espacenet.com")
tab.get("https://worldwide.espacenet.com/")
headers = None # 采用监听的方式获取真实headers
for packet in tab.listen.steps():
    headers = packet.request.headers
    logger.info(f"GET: headers --> {headers}")
    break
time.sleep(3)
while True:
    tab.wait(1)
    try:
        if tab.ele('请完成以下操作'):
            logger.info('不需要点击')
            # 模拟人为点击，等操作，根据自己的语言来调整对应的关键词和页面元素结构
            iframe = tab.ele(".main-content")
            iframe = (
                iframe.ele("#rvwE0", timeout=3)
                .ele("@tag()=div")
                .ele("@tag()=div")
                .shadow_root.get_frame("t:iframe")
            )
            iframe_input = iframe.ele("t:body").sr.ele(".cb-lb").ele("t:input")
            if '验证您是真人' in tab.html:
                tab.get_screenshot(path='tmp', name='in.jpg', full_page=True)
                iframe.actions.scroll(
                        delta_y=-100
                ).move(
                        123, 254, 1
                ).move_to(
                        ele_or_loc=iframe_input,
                        offset_x=random.randint(-100, 125),
                        offset_y=random.randint(-98, 140),
                        duration=5
                ).wait(0.1, 0.5).move_to(
                    ele_or_loc=iframe_input,
                    offset_x=random.randint(-5, 5),
                    offset_y=random.randint(-5, 5),
                    duration=2,
                ).wait(0.2, 0.5).click().wait(1, 3)
            with open('tmp/index.html', 'w', encoding='utf-8') as f:
                f.write(tab.html)
            if '验证您是真人' in tab.html:
                logger.info('让我证明我是人')
                tab.get_screenshot(path='tmp', name='in.jpg', full_page=True)
                iframe_input.click()
            if '需要几秒' in tab.html:
                logger.info('他说需要几秒钟')
                tab.get_screenshot(path='tmp', name='in.jpg', full_page=True)
                tab.wait(6)
                tab.get_screenshot(path='tmp', name='in.jpg', full_page=True)
        #logger.info(f"点击 iframe 成功")
        #tab.wait(2)
    except Exception as e:
        logger.error(f"未通过, 重试 {e}", exc_info=True)
    cookies = tab.cookies().as_dict()
    rep = requests.get(
        "https://worldwide.espacenet.com",
        cookies=cookies,
        headers=headers,
    )
    logger.warning(rep.status_code)
    if rep.status_code != 403:
        logger.info("next cookies")
        break
    else:
        if not tab.wait.ele_deleted("#splashScreenContainer", timeout=5):
            tab.refresh(True)
            logger.info("website loading refresh")
        logger.info(f"未通过, 重试")
    tab.get_screenshot(path='tmp', name='pic.jpg', full_page=True)
tab.wait(8)
logger.info(f"获取到的headers: {headers}")
tab.wait(5)
cookies = tab.cookies().as_dict()
logger.info(cookies)
logger.info(f"refresh_cookie 成功")
if not ("cf_clearance" in cookies and len(cookies["cf_clearance"]) > 100):
    logger.error(f"Cookie refresh failed: {cookies}")
    exit(1)
    
# 使用相同IP、Cookies 和 Headers 请求即可正常获取数据
self.cookies = cookies
self.headers["user-agent"] = headers["user-agent"]
browser.quit()
```

### 注意点

- Cookies 不是永久有效的，你需要按照自己的情况来刷新
- User-Agent 需要根据系统来调整，例如 Mac、Linux 与 Windows 都是不同的
- Cloudflare 识别 TLS 连接，需要使用 `curl_cffi` 模块来绕过
- 配合代理来使用最佳，但是浏览器不支持需要账号密码的代理，所以需要使用白名单功能的代理服务

### Docker 部署方案

> 实践时编写了支持的 [Dockerfile](https://github.com/2214372851/python-headless-browser)

#### 使用方法如下

1. 拉取仓库 `git clone https://github.com/2214372851/python-headless-browser.git`
2. 构建基础镜像 `docker build -t headless-browser .`
3. 修改自己的项目的 Dockerfile 例如：

```dockerfile
FROM python-headless-browser:latest

RUN mkdir /code && mkdir /data

VOLUME /data


COPY . /code

RUN pip install -r /code/requirements.txt

WORKDIR /code

# 无头模式使用如下，部分网站使用无头模式无法绕过
CMD ["python", "main.py"] // [!code --]

# 非无头模式使用如下
CMD xvfb-run -a python main.py // [!code ++]
```

4. 构建镜像 `docker build -t my-project .`
5. 运行镜像 `docker run -d -v /data:/data my-project`

## `ThreadPool` 和 `ThreadPoolExecutor` 的区别

`ThreadPool` 和 `ThreadPoolExecutor` 都是用于管理线程池的工具，目的是通过重用线程来避免频繁创建和销毁线程的开销，从而提高多线程程序的性能。
`ThreadPool` 是较旧的线程池实现，而 `ThreadPoolExecutor` 是 Python 3 中提供的一个更现代的、功能更强大的线程池实现。以下是它们的主要区别：

### 1. **模块和类**

- **`ThreadPool`**：
    - `ThreadPool` 是 Python 标准库 `multiprocessing.pool` 模块中的一个类，早期版本中用于创建和管理线程池，适用于多线程环境中需要池化线程的场景。
    - 该类已经被弃用，在 Python 3 中不推荐使用。

- **`ThreadPoolExecutor`**：
    - `ThreadPoolExecutor` 是 Python 3 中 `concurrent.futures` 模块中提供的一个类，它是基于 `Executor`
      类实现的，提供了更现代、更强大、灵活的接口来管理线程池。
    - `ThreadPoolExecutor` 是推荐使用的线程池实现，具有更一致的 API，并且更符合现代 Python 并发编程的设计思想。

### 2. **API和接口设计**

- **`ThreadPool`**：
    - `ThreadPool` 的接口相对较基础，主要通过 `apply()`、`map()`、`apply_async()`
      等方法来提交和处理任务。它更侧重于池化线程的创建和管理，而没有统一的异步任务管理接口。
    - `ThreadPool` 提供了 `apply()`（阻塞）和 `apply_async()`（异步）来提交任务，还支持 `map()` 用于并行处理可迭代对象中的任务。

- **`ThreadPoolExecutor`**：
    - `ThreadPoolExecutor` 提供了更简洁、更一致的接口，它继承自 `Executor` 类，提供了 `submit()`、`map()` 和 `shutdown()`
      方法来管理线程池中的任务。
    - `submit()` 用于异步提交任务，返回一个 `Future` 对象，用户可以通过 `Future.result()` 来获取结果。`map()` 方法类似于
      `Pool.map()`，但返回的是一个迭代器，可以按需获取结果。
    - 提供了 `shutdown()` 方法来优雅地关闭线程池，等待所有线程执行完成。

### 3. **任务提交和回调**

- **`ThreadPool`**：
    - 任务提交通过 `apply_async()` 完成，用户可以传递回调函数来处理任务完成后的结果，但 API 相对较底层，使用起来不如
      `ThreadPoolExecutor` 灵活。
    - 不像 `ThreadPoolExecutor` 那样提供 `Future` 对象来追踪任务执行的状态和结果，处理异步任务时需要手动管理和获取返回结果。

- **`ThreadPoolExecutor`**：
    - 通过 `submit()` 方法提交任务，返回一个 `Future` 对象，`Future` 对象可以用来跟踪任务的执行状态、获取结果，并支持设置回调函数。
    - `ThreadPoolExecutor` 的 `Future` 对象允许更灵活的结果管理，可以通过 `result()` 获取任务结果，也可以通过
      `add_done_callback()` 设置任务完成时的回调函数。

### 4. **进程池与线程池**

- **`ThreadPool`**：
    - `ThreadPool` 仅支持线程池，适用于那些需要并发处理的轻量任务，如 I/O 密集型任务。
    - 由于它在 `multiprocessing.pool` 模块中，它的设计更多的是为了和 `ProcessPool` 进行对比，且较为简洁、适用于小规模任务。

- **`ThreadPoolExecutor`**：
    - `ThreadPoolExecutor` 同样是用于线程池的管理，它设计得更为灵活，支持高并发、异步编程，适用于需要线程池的现代应用程序。
    - 它可以与 `ProcessPoolExecutor` 配合使用，`ThreadPoolExecutor` 可以管理线程池，而 `ProcessPoolExecutor`
      管理进程池，适应不同的并发需求。

### 5. **管理和关闭**

- **`ThreadPool`**：
    - `ThreadPool` 提供了一个 `close()` 和 `join()` 方法来管理线程池的关闭，要求开发者显式地关闭池。

- **`ThreadPoolExecutor`**：
    - `ThreadPoolExecutor` 提供了 `shutdown()` 方法来优雅地关闭线程池，并等待线程池中所有线程执行完成。通过
      `shutdown(wait=True)` 可以阻塞直到所有线程完成任务，`shutdown(wait=False)` 会立即返回，不等待任务完成。

### 6. **异常处理**

- **`ThreadPool`**：
    - 异常处理相对较为简单，在 `apply_async()` 的回调函数中捕获异常，或者直接使用 `apply()` 方法阻塞并捕获异常。

- **`ThreadPoolExecutor`**：
    - `ThreadPoolExecutor` 提供了更灵活的异常处理机制。`submit()` 返回的 `Future` 对象会在任务执行时抛出异常，用户可以通过
      `Future.exception()` 或 `Future.result()` 捕获并处理任务中的异常。

### 7. **适用场景**

- **`ThreadPool`**：
    - `ThreadPool` 适用于需要简单线程池的任务场景，主要用于 I/O 密集型操作（如文件处理、网络请求等），因为线程池中的每个线程一般都处于阻塞状态，CPU
      占用较低。

- **`ThreadPoolExecutor`**：
    - `ThreadPoolExecutor` 适用于需要更高并发、更多控制、灵活的线程池管理的场景。它的 API
      更加简洁现代，支持异步任务管理、回调、异常处理等，适合于现代并发编程中的复杂任务。

### 总结表格：

| 特性          | `ThreadPool`                        | `ThreadPoolExecutor`                             |
|-------------|-------------------------------------|--------------------------------------------------|
| **模块**      | `multiprocessing.pool`              | `concurrent.futures`                             |
| **类名**      | `ThreadPool`                        | `ThreadPoolExecutor`                             |
| **创建线程池**   | `ThreadPool()`                      | `ThreadPoolExecutor()`                           |
| **任务提交**    | `apply()`, `map()`, `apply_async()` | `submit()`, `map()`                              |
| **异步任务管理**  | `apply_async()` 支持异步任务              | `submit()` 返回 `Future` 对象                        |
| **异常处理**    | 通过回调函数捕获异常                          | 通过 `Future.result()` 或 `Future.exception()` 捕获异常 |
| **回调支持**    | 支持回调函数，但较为复杂                        | 支持通过 `Future.add_done_callback()` 设置回调           |
| **优雅关闭线程池** | `close()` 和 `join()`                | `shutdown()`                                     |
| **适用场景**    | 简单的线程池，I/O 密集型任务                    | 更高并发和控制，适用于现代并发编程任务                              |

### 总结：

- **`ThreadPool`** 是较旧的线程池实现，功能相对较简单，适用于轻量的并行任务，尤其是 I/O 密集型任务。
- **`ThreadPoolExecutor`** 是现代 Python 线程池的推荐实现，它提供了更丰富的功能、更灵活的接口、异步支持和更强的错误处理机制，适合需要高并发、复杂任务调度的场景。

## `Pool` 和 `ProcessPoolExecutor` 的区别

`Pool` 和 `ProcessPoolExecutor` 都是 Python `multiprocessing` 模块中用于并行计算的工具，它们都允许在多核 CPU
上并行执行多个任务，但它们有一些关键的区别。以下是它们之间的主要区别：

### 1. **基本概念和接口**

- **`Pool`**：
    - `Pool` 是 `multiprocessing` 模块中的一个类，用于创建一个进程池，能够管理多个子进程的创建、任务分配和结果收集。
    - `Pool` 提供了多个方法来异步或同步地分配任务，例如 `apply()`、`map()`、`apply_async()`、`map_async()` 等。

- **`ProcessPoolExecutor`**：
    - `ProcessPoolExecutor` 是 `concurrent.futures` 模块中的一个类，提供了一个基于线程池的接口来并行执行任务。它的主要设计目标是简化并行编程，提供更高级的接口。
    - `ProcessPoolExecutor` 提供了 `submit()` 和 `map()` 方法来异步和同步执行任务。

### 2. **API设计**

- **`Pool`**：
    - `Pool` 的 API 相对更低级，要求用户直接管理进程池中的任务，手动分配任务和收集结果。
    - 例如，使用 `Pool.map()` 可以并行处理一个迭代器中的每个任务，`apply_async()` 用于异步执行函数。

- **`ProcessPoolExecutor`**：
    - `ProcessPoolExecutor` 提供了更现代化的 API，基于 `concurrent.futures` 模块的设计，符合 `ThreadPoolExecutor` 和
      `Executor` 的接口设计，支持 `submit()` 和 `map()` 方法，具有更简洁和一致的接口。
    - 使用 `submit()` 可以异步提交任务，返回一个 `Future` 对象，用户可以通过 `Future.result()` 来获取结果。

### 3. **使用方便性**

- **`Pool`**：
    - `Pool` 的接口相对较基础，需要开发者手动管理进程池中的任务，并且在任务执行完成后需要显式地处理返回结果。
    - 适用于需要处理批量任务的场景，比如批量处理文件或数据集。

- **`ProcessPoolExecutor`**：
    - `ProcessPoolExecutor` 提供了更方便的 API，支持 `submit()` 来提交单个任务，并且通过 `Future` 对象可以方便地获取异步任务的结果。
    - 适用于具有更多异步需求的场景，代码更加简洁、易于理解。

### 4. **任务提交和回调机制**

- **`Pool`**：
    - 在 `Pool` 中，任务提交是通过 `map()` 或 `apply()` 等方法来完成的，这些方法通常是阻塞的，或者返回一个迭代器来等待任务完成。
    - 可以通过 `apply_async()` 和 `map_async()` 实现异步任务处理，但这些方法的结果处理是通过回调函数来完成的，相对较低级。

- **`ProcessPoolExecutor`**：
    - `ProcessPoolExecutor` 提供了更高级的任务提交和结果获取方式。`submit()` 方法允许异步提交任务并返回一个 `Future` 对象，
      `Future` 对象可以用来获取任务结果并设置回调。
    - `map()` 方法同样支持批量任务，但它的使用方式和 `Pool.map()` 类似，更易于理解和使用。

### 5. **异步处理的灵活性**

- **`Pool`**：
    - 在 `Pool` 中异步执行任务时，通常会使用 `apply_async()` 或 `map_async()` 方法，并通过 `get()` 方法获取结果，这样的接口稍显繁琐。
    - `apply_async()` 支持传入回调函数来处理结果。

- **`ProcessPoolExecutor`**：
    - `ProcessPoolExecutor` 提供了更加灵活的异步处理方式。通过 `submit()` 提交任务后，返回的 `Future` 对象可以通过
      `add_done_callback()` 设置回调函数，这为任务完成后的处理提供了更多的灵活性。

### 6. **异常处理**

- **`Pool`**：
    - `Pool` 中的任务异常通常需要通过 `apply_async()` 或 `map_async()` 的返回结果来捕获。如果任务执行时出现异常，需要通过
      `get()` 方法手动检查异常。

- **`ProcessPoolExecutor`**：
    - `ProcessPoolExecutor` 在处理异步任务时，异常处理更加一致。如果 `submit()` 提交的任务在执行过程中抛出异常，可以通过
      `Future.result()` 或 `Future.exception()` 捕获异常。这使得异常处理更简洁，且能够直接捕获任务执行时的异常。

### 7. **性能**

- **`Pool` 和 `ProcessPoolExecutor`**：
    - 从性能上来看，`Pool` 和 `ProcessPoolExecutor` 都是基于进程池来管理多进程执行，理论上它们的性能是相似的。两者都使用多进程来执行任务，避免了全局解释器锁（GIL）的问题。
    - 性能差异可能更多体现在具体的应用场景中，例如 `ProcessPoolExecutor` 的 API 会稍微多一些包装，这可能导致在大量任务时有一些微小的性能差异，但差异通常不明显。

### 8. **适用场景**

- **`Pool`**：
    - `Pool` 更适合于需要批量处理的任务，特别是那些批量计算、数据处理的场景。比如需要处理一组独立的数据，或者批量读取文件、处理图像等任务。

- **`ProcessPoolExecutor`**：
    - `ProcessPoolExecutor` 更适合于异步任务或混合任务的场景，尤其是在任务执行较短并且需要快速响应的情况下。它的
      `submit()` 和 `Future` 提供了更灵活的控制方式，适合用于任务分布广泛并且需要更多并行控制的应用场景。

### 总结表格：

| 特性          | `Pool`                             | `ProcessPoolExecutor`                     |
|-------------|------------------------------------|-------------------------------------------|
| **模块**      | `multiprocessing`                  | `concurrent.futures`                      |
| **创建进程的方式** | `Pool` 创建进程池                       | `ProcessPoolExecutor` 创建进程池               |
| **提交任务**    | `apply()`，`map()`，`apply_async()`  | `submit()`，`map()`                        |
| **任务返回**    | 通过 `get()` 获取结果                    | 通过 `Future.result()` 获取结果                 |
| **异步处理**    | `apply_async()`，`map_async()` 支持异步 | `submit()` 返回 `Future` 对象支持异步             |
| **异常处理**    | 需要手动检查，`get()` 方法抛出异常              | 通过 `Future.exception()` 或 `result()` 捕获异常 |
| **回调支持**    | 支持回调函数，但相对较复杂                      | 通过 `Future.add_done_callback()` 设置回调      |
| **适用场景**    | 批量任务处理，如数据处理、文件处理等                 | 异步任务或混合任务，更灵活的控制                          |

### 总结：

- **`Pool`** 适用于简单的批量任务处理和数据并行化，它的接口相对基础，适合直接使用 `map()` 和 `apply()` 来处理任务。
- **`ProcessPoolExecutor`** 提供了更现代化、更简洁的接口，适合需要异步处理任务、捕获异常并动态调整进程执行的场景。

选择使用 `Pool` 还是 `ProcessPoolExecutor` 主要取决于你的需求，`ProcessPoolExecutor` 更适合于需要更多灵活性和控制的异步任务，而
`Pool` 适合于简单的并行计算任务。

## Python `multiprocessing` 模块中的 `Manager` 和 `Pool` 函数

在 Python 的 `multiprocessing` 模块中，`Manager` 和 `Pool`
是两种重要的工具，它们用于在多进程环境中共享数据和管理进程池，能有效提高并行计算的效率。以下是对这两个工具的简要说明及其功能作用。

#### 1. **Manager**

`Manager` 是用于创建可以在多个进程之间共享的对象。通常，进程间的数据是隔离的，而 `Manager`
通过提供共享数据结构来解决这个问题，使得多个进程可以读写共享的变量或对象。

- **功能**：`Manager` 可以创建线程安全的共享对象（如列表、字典、队列等），并且这些对象在多个进程之间是同步的。
- **常见方法**：
    - `manager.list()`：创建一个共享的列表。
    - `manager.dict()`：创建一个共享的字典。
    - `manager.Queue()`：创建一个共享的队列。
    - `manager.Value()` 和 `manager.Array()`：创建共享的单一数据类型或数组。

  **使用场景**：在多进程中，`Manager` 被用来管理进程间的数据共享，例如在多个进程中共享一个错误列表或进度条，确保数据的一致性和同步。

#### 2. **Pool**

`Pool` 是 `multiprocessing` 模块中的一个进程池管理工具，用于创建多个子进程并发执行任务。它能显著简化多进程编程，并提供了方便的接口来控制进程池的大小和任务分配。

- **功能**：`Pool` 允许创建一个进程池，通过池中的多个进程并行执行任务，从而提高程序的执行效率。它还提供了任务的异步执行和结果的回收机制。
- **常见方法**：
    - `pool.apply(func, args)`：同步执行函数，返回结果。
    - `pool.apply_async(func, args)`：异步执行函数，返回一个 `AsyncResult` 对象，可以通过该对象获取任务的结果。
    - `pool.map(func, iterable)`：将可迭代对象的每个元素传给函数 `func`，并行处理。
    - `pool.imap(func, iterable)`：类似于 `map`，但支持惰性迭代（即按需返回结果），适合处理大规模数据。
    - `pool.imap_unordered(func, iterable)`：与 `imap` 类似，但返回结果的顺序与输入顺序无关，处理速度更快。

  **使用场景**：`Pool` 适用于需要并发执行多个独立任务的场景，比如处理多个文件、执行多个计算任务等。通过进程池，可以有效控制并发进程的数量并避免创建过多进程导致的性能瓶颈。

### 结合使用 `Manager` 和 `Pool`

在多进程任务中，`Manager` 和 `Pool` 可以结合使用，以便在并行计算中共享和更新数据。例如，在处理大量文件时，可以使用 `Pool`
创建多个子进程并行处理每个文件，而使用 `Manager` 创建一个共享的列表来记录处理过程中出错的文件路径。

```python
from multiprocessing import Pool, Manager

def worker(file, error_list):
    # 假设此函数处理每个文件并记录错误
    try:
        # 假设处理逻辑
        pass
    except Exception:
        error_list.append(file)

def main():
    with Manager() as manager:
        error_list = manager.list()  # 创建共享的列表
        files = ['file1.gz', 'file2.gz', 'file3.gz']  # 假设是待处理的文件列表

        with Pool() as pool:
            pool.starmap(worker, [(file, error_list) for file in files])  # 并行处理文件
        
        # 打印或保存错误文件列表
        print(list(error_list))

if __name__ == "__main__":
    main()
```

### 总结

- **`Manager`**：提供了在多个进程之间共享数据的功能，使得进程间可以安全地访问和修改共享对象。
- **`Pool`**：通过创建进程池来并行执行多个任务，提高计算效率，并提供灵活的任务分配和结果收集方式。

这两者的结合，使得 Python 在多进程计算中能高效地管理资源、同步数据，并行处理任务，广泛应用于数据处理、文件操作等高性能需求场景。

## python-magic 终结文件类型识别

`python-magic`的安装可能会稍微复杂一些，因为它依赖于libmagic库。

在Linux系统上，你可以使用系统包管理器安装：# Debian/Ubuntu

```
sudo apt-get install libmagic1 python3-magic# Fedora/CentOS/RHELsudo dnf install python3-magic
```

在macOS上，你可以使用Homebrew安装：brew install libmagic

```
pip install python-magic
```

在Windows上，推荐使用预编译的二进制文件安装：pip install python-magic-bin

```python
m = magic.Magic()  # 不带参数，获取更详细的描述file_info = m.from_file(“document.pdf”)print(file_info)  # 输出： PDF document， version 1.7
```

## requests 自带重试

```python
import logging

import requests
from requests.adapters import HTTPAdapter

# 开启 urllib3 的日志，以便于查看重试过程
logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
urllib3_logger = logging.getLogger('urllib3')
urllib3_logger.setLevel(logging.DEBUG)

# 使用 session 发送请求
session = requests.session()
# 打印 adapters
print(session.adapters)
session.mount('https://', HTTPAdapter(max_retries=3))
session.mount('http://', HTTPAdapter(max_retries=3))
try:
    print(session.get('https://www.baidu.com', timeout=0.01).text[:100])
except Exception as e:
    print(e)
    print(type(e))
```

## 去除文本中HTML标签

> Bleach 是一个用于清理 HTML 输入的 Python 库，能够帮助开发者避免跨站脚本攻击（XSS）。它通过白名单的方式来许可特定的 HTML
> 标签和属性，从而有效地清理输入数据，确保 Web 应用的安全性。Bleach 易于使用，可以非常方便地集成到 Web 应用中，是保障 Web
> 应用安全的有力助手。

`pip install bleach`

```python
from bleach import clean

# 用户输入的HTML字符串
user_input = '<p>Hello <b>World</b>!</p><script>alert("XSS");</script>'

# 允许的标签和属性
allowed_tags = ['a', 'b', 'p', 'em', 'strong']
allowed_attrs = {'a': ['href', 'title']}

# 使用clean函数清理用户输入
cleaned_html = clean(user_input, allowed_tags=allowed_tags, allowed_attrs=allowed_attrs)

print(cleaned_html)
# result --> <p>Hello <b>World</b>!</p>
```

## Python subprocess 执行环境

```python
from subprocess import Popen


env = os.environ.copy()
# 防止Popen中的依赖位置与使用的虚拟环境位置不一致
env['PYTHONPATH'] = site.getsitepackages()[-1]
process = Popen(
	shlex.split(command),
    cwd=data_path,
    stdout=log_fp,
    stderr=log_fp,
    env=env,
    text=True
)
```

## Python 代码性能分析工具

> [Pyinstrument](https://pyinstrument.readthedocs.io/en/latest/) 是一款强大的 Python
> 代码性能分析工具，它能帮助你找到代码中耗时最多的部分，从而进行优化，提升程序执行效率。它就像一把探照灯，照亮了代码执行的黑暗角落，让你清晰地看到代码运行的真实情况。

## 音频神器

> **[miniaudio](https://pypi.org/project/miniaudio/)** 从播放到录制，处理音频样样在行。

## 网络请求

### [HTTPX](https://www.python-httpx.org/)

> HTTPX 是 Python 3 的全功能 HTTP 客户端，它提供同步和异步 API，并支持 HTTP/1.1 和 HTTP/2。

### [curl_cffi](https://curl-cffi.readthedocs.io/en/stable/)

> 模拟浏览器的 TLS 签名或 JA3 指纹。

#### 安装

`pip install curl_cffi --upgrade`

## 简单表格处理

[Tablib](https://tablib.readthedocs.io/en/stable/)

> 添加 newline 参数来避免写入时csv出现空行

```python
import tablib

dataset = tablib.Dataset()

with open("temp.csv", "w", "w", encoding='utf-8', newline="") as f:
    f.write(dataset.export(format="csv"))
```

## 自动化运维

[pyinfra](https://docs.pyinfra.com/en/next/index.html)

## 全能解压库

[patool](https://wummel.github.io/patool/)

## 项目规范

> 基于 `pyproject.toml` 的全新项目规范

[原文](https://zhuanlan.zhihu.com/p/666166082)

## 脚本加密

<iframe style="height: 400px;width: 100%;" src="https://pyarmor.readthedocs.io/zh/stable/index.html"/>

## 时间函数strftime与strptime

> **strftime：** 将给定格式的日期时间对象转换为字符串。**日期时间对象=>字符串，控制输出格式**
>
> **strptime：**将字符串解析为给定格式的日期时间对象。**字符串=>日期时间对象，解析字符串**

|    | strftime                                                      | strptime                                                    |
|----|---------------------------------------------------------------|-------------------------------------------------------------|
| 用法 | 根据给定的格式将对日期时间象转换为字符串                                          | 将字符串解析为给定相应格式的datetime 对象                                   |
| 类型 | 实例方法                                                          | 类方法                                                         |
| 方法 | date; datetime; time                                          | datetime                                                    |
| 用法 | strftime(format)                                              | strptime(date_string, format)                               |
| 示例 | datetime.datetime(2006, 11, 21, 16, 30) => '2006-11-21 16:30' | "21/11/06 16:30" => datetime.datetime(2006, 11, 21, 16, 30) |

### strftime函数

> **作用：**将给定格式的日期时间对象转换为字符串。**日期时间对象=>字符串，控制日期时间对象的输出格式，**
> date、datetime、time对象都支持strftime(format) 方法，可用来创建由一个显式格式字符串所控制的表示时间的字符串。要获取格式指令的完整列表，查看文末列表。
>
> **用法：**datetime.strftime(format)

```python
import datetime
dt=datetime.datetime(2006, 11, 21, 16, 30)
dt.strftime("%Y-%m-%d %H:%M")
'2006-11-21 16:30'

dt.strftime("%Y-%m-%d")
'2006-11-21'

dt.strftime("%A, %d. %B %Y %I:%M%p")
'Tuesday, 21. November 2006 04:30PM
```

### strptime函数

> **作用：**按照特定时间格式将字符串转换（解析）为时间类型。返回一个由显式格式字符串所指明的代表时间的字符串。
> 要获取格式指令的完整列表，查看文末列表。
>
>**语法：**datetime.strptime(date_string, format)

```python
import datetime
dt=datetime.datetime.strptime("21/11/06 16:30", "%d/%m/%y %H:%M")
print(dt)
2006-11-21 16:30:00
dt
datetime.datetime(2006, 11, 21, 16, 30)
```

> strftime是转换为特定格式输出，而strptime是将一个（时间）字符串解析为时间的一个类型对象。

### 格式指令的完整列表

| %y | 两位数的年份表示（00-99）         |
|----|-------------------------|
| %Y | 四位数的年份表示（000-9999）      |
| %m | 月份（01-12）               |
| %d | 月内中的一天（0-31）            |
| %H | 24小时制小时数（0-23）          |
| %I | 12小时制小时数（01-12）         |
| %M | 分钟数（00=59）              |
| %S | 秒（00-59）                |
| %a | 本地简化星期名称                |
| %A | 本地完整星期名称                |
| %b | 本地简化的月份名称               |
| %B | 本地完整的月份名称               |
| %c | 本地相应的日期表示和时间表示          |
| %j | 年内的一天（001-366           |
| %p | 本地A.M.或P.M.的等价符         |
| %U | 一年中的星期数（00-53）星期天为星期的开始 |
| %w | 星期（0-6），星期天为星期的开始       |
| %W | 一年中的星期数（00-53）星期一为星期的开始 |
| %x | 本地相应的日期表示               |
| %X | 本地相应的时间表示               |
| %Z | 当前时区的名称                 |
| %% | %号本身                    |

## 三方库拉取信息查看

> 为包管理者提供的简易界面

<iframe style="height: 600px;width: 100%;" src="https://pypistats.org/packages/yundownload"/>

## TUI模块

> 包含常用的进度条、表格输出等功能

[rich 官方文档](https://www.osgeo.cn/rich/console.html)

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

1.
    1. **密钥（Secret Key）**：用于生成一次性密码的基础。
2.
    2. **TOTP（基于时间的一次性密码）**：根据当前时间和密钥生成的一次性密码。
3.
    3. **HOTP（基于HMAC的一次性密码）**：根据计数器和密钥生成的一次性密码。
4.
    4. **URI**：用于在不同设备间共享OTP配置的标准格式。

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

1.
    1. **生成QR码**：PyOTP可以生成兼容Google Authenticator的URI，我们可以将这个URI转换为QR码，方便用户扫描：

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

1.
    1. **时间漂移处理**：在实际应用中，客户端和服务器的时间可能存在微小差异。PyOTP允许我们在验证时考虑这种时间漂移：

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

## 浏览器自动化

undetected_chromedriver

可以自动匹配驱动

## 上下文管理（contextlib）

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

## try语句

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

## wave:处理WAV格式音频库

```python
#打开文件	mode r,w普通读写	rb, wb 读写二进制文件
#rb：生成wav_read对象	wb：生成wav_write对象
wave.open(file, mode=None)
```

### Wave_read对象的方法

```python
import wave

wav = wave.open('1.wav')
#依次分别是：获取声道数，获取采样字节长度，获取采样频率，获取音频总帧数
print(wav.getchannels(), wav.getsampwidth(), wav.getframerate(), getnframes())
#wav.getparams()得到一个namedtuple(nchannels, sampwidth, framerate, nframes, comptype, compname)
```

### Wave_write对象的方法

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

## assert关键字（断言）

判断assert后面的是不是对的，不是对的会给你一个报错，且后面的代码不会继续执行了

## enumerate关键词(枚举)

```python
>>> seasons = ['Spring', 'Summer', 'Fall', 'Winter']
>>> list(enumerate(seasons))
[(0, 'Spring'), (1, 'Summer'), (2, 'Fall'), (3, 'Winter')]
```

## collections：容器库

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

  
