# humanize，世界上最牛逼的Python库！

## 原文链接
https://mp.weixin.qq.com/s/gTOOiaJ17KRWtxQqaw2hng

# humanize，世界上最牛逼的Python库！

## 核心要点
humanize是一个用于Python的库，旨在将数字和时间等信息以人类易于理解的方式进行格式化。它提供了多种函数来处理数字格式化、文件大小转换和时间表示，并支持国际化。

## 主要内容
1. 安装配置
   - 使用命令`pip install humanize`进行基本安装。
   - 使用`pip install humanize[i18n]`以支持国际化。

2. 核心功能展示
   - 整数格式化：使用`humanize.intcomma`和`humanize.intword`来格式化整数。
   - 文件大小转换：使用`humanize.naturalsize`来将字节转换为易读格式。
   - 时间表示：使用`humanize.naturaltime`和`humanize.naturalday`格式化时间。

3. 进阶技巧
   - 自定义格式化类示例。
   - 批量格式化数字示例。

4. 实战案例：日志美化器
   - 创建一个`LogBeautifier`类来格式化日志信息，包括时间、消息、大小和数量。

5. 总结与建议
   - humanize库简单易用，适合需要美化数据表示的场景。

## 技术示例
```python
# 安装库
pip install humanize

# 核心功能示例
import humanize

# 整数格式化
print(humanize.intcomma(12345678))  # 输出: 12,345,678
print(humanize.intword(123456789))   # 输出: 123.5 million

# 文件大小转换
print(humanize.naturalsize(1234567))  # 输出: 1.2 MB

# 时间表示
from datetime import datetime, timedelta
now = datetime.now()
print(humanize.naturaltime(now - timedelta(seconds=30)))  # 输出: 30秒前

# 自定义格式化
class ChineseFormatter(humanize.FileSize):
    def format(self, number):
        for unit in ['字节', 'KB', 'MB', 'GB', 'TB']:
            if number < 1024.0:
                return f"{number:3.1f} {unit}"
            number /= 1024.0
        return f"{number:.1f} PB"

formatter = ChineseFormatter()
print(formatter.format(123456789))  # 输出: 117.7 MB

# 日志美化器示例
class LogBeautifier:
    def __init__(self):
        self.start_time = datetime.now()
        
    def format_log(self, message, size=None, count=None):
        time_diff = datetime.now() - self.start_time
        parts = [
            f"时间: {humanize.naturaltime(time_diff)}",
            f"消息: {message}"
        ]
        if size:
            parts.append(f"大小: {humanize.naturalsize(size)}")
        if count:
            parts.append(f"数量: {humanize.intcomma(count)}")
        return " | ".join(parts)

beautifier = LogBeautifier()
print(beautifier.format_log("文件下载完成", size=1234567, count=1000))
```

## 补充信息
提供了一些智能文本截断和时间表示的实用函数示例，如`smart_truncate`和`time_representation`，以便在实际应用中使用。

## 总结时间
2024-11-29 21:08:54
