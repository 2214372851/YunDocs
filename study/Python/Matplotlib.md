# Python API

> Matplotlib 中的 pyplot 模块是一个类似命令风格的函数集合，这使得 Matplotlib 的工作模式和 MATLAB 相似。
>
> pyplot 模块提供了可以用来绘图的各种函数，比如创建一个画布，在画布中创建一个绘图区域，或是在绘图区域添加一些线、标签等。以下表格对这些函数做了简单地介绍。

## 绘图类型

| 函数名称  | 描述                                       |
| --------- | ------------------------------------------ |
| Bar       | 绘制条形图                                 |
| Barh      | 绘制水平条形图                             |
| Boxplot   | 绘制箱型图                                 |
| Hist      | 绘制直方图                                 |
| his2d     | 绘制2D直方图                               |
| Pie       | 绘制饼状图                                 |
| Plot      | 在坐标轴上画线或者标记                     |
| Polar     | 绘制极坐标图                               |
| Scatter   | 绘制x与y的散点图                           |
| Stackplot | 绘制堆叠图                                 |
| Stem      | 用来绘制二维离散数据绘制（又称为“火柴图”） |
| Step      | 绘制阶梯图                                 |
| Quiver    | 绘制一个二维按箭头                         |

## Image函数

| 函数名称 | 描述                               |
| -------- | ---------------------------------- |
| Imread   | 从文件中读取图像的数据并形成数组。 |
| Imsave   | 将数组另存为图像文件。             |
| Imshow   | 在数轴区域内显示图像。             |

## Axis函数

| 函数名称 | 描述                          |
| -------- | ----------------------------- |
| Axes     | 在画布(Figure)中添加轴        |
| Text     | 向轴添加文本                  |
| Title    | 设置当前轴的标题              |
| Xlabel   | 设置x轴标签                   |
| Xlim     | 获取或者设置x轴区间大小       |
| Xscale   | 设置x轴缩放比例               |
| Xticks   | 获取或设置x轴刻标和相应标签   |
| Ylabel   | 设置y轴的标签                 |
| Ylim     | 获取或设置y轴的区间大小       |
| Yscale   | 设置y轴的缩放比例             |
| Yticks   | 获取或设置y轴的刻标和相应标签 |

## Figure函数

| 函数名称 | 描述             |
| -------- | ---------------- |
| Figtext  | 在画布上添加文本 |
| Figure   | 创建一个新画布   |
| Show     | 显示数字         |
| Savefig  | 保存当前画布     |
| Close    | 关闭画布窗口     |

# 第一个图

首先导入 Matplotlib 包中的 Pyplot 模块，并以 as 别名的形式简化引入包的名称。

import matplotlib.pyplot as plt

接下来，使用 NumPy 提供的函数 arange() 创建一组数据来绘制图像。

```python
#引入numpy包
import numpy as np
#获得0到2π之间的ndarray对象
x = np.arange(0, math.pi*2, 0.05)
```

上述所得 x 的值作用到 x 轴上，而该值对应的正弦值，也就是 y 值，使用以下方法获取：

`y = np.sin(x)`

使用 plot() 函数对 x、y 进行绘制。

`plt.plot(x,y)`

主要的绘图工作已经完成，不过还需要绘制一些细节，需要我们补充一下，比如图像的标题(title)、x 轴与 y 轴的标签（label）等。

```python
plt.xlabel("angle")
plt.ylabel("sine")
plt.title('sine wave')
```

完整的程序代码如下：

```python
from matplotlib import pyplot as plt
import numpy as np
import math
#调用math.pi方法弧度转为角度
x = np.arange(0, math.pi*2, 0.05)
y=np.sin(x)
plt.plot(x,y)
plt.xlabel("angle")
plt.ylabel("sine")
plt.title('sine wave')
#使用show展示图像
plt.show()
```

代码执行后，显示结果如下：



![正弦函数图像](https://c.biancheng.net/uploads/allimg/210906/1522403257-0.gif)
图1：sine正弦函数图像

您也可以在 Jupyter 笔记本中运行 Matplotlib 的绘图程序。通过命令行或者开始菜单的方式启动 Jupyter 笔记本。启动成功后，将上述代码拷贝到输入行内，如下所示：



![jupyter使用](https://c.biancheng.net/uploads/allimg/210906/1522405532-1.gif)
图2：Jupyter交互式笔记本

# Matplotlib figure图形对象

`matplotlib.pyplot`模块能够快速地生成图像，但如果使用面向对象的编程思想，我们就可以更好地控制和自定义图像。

在 Matplotlib 中，面向对象编程的核心思想是创建图形对象（figure object）。通过图形对象来调用其它的方法和属性，这样有助于我们更好地处理多个画布。在这个过程中，pyplot 负责生成图形对象，并通过该对象来添加一个或多个 axes 对象（即绘图区域）。

Matplotlib 提供了`matplotlib.figure`图形类模块，它包含了创建图形对象的方法。通过调用 pyplot 模块中 figure() 函数来实例化 figure 对象。如下所示：

```python
from matplotlib import pyplot as plt
#创建图形对象
fig = plt.figure()
```

该函数的参数值，如下所示：



| 参数      | 说明                                                   |
| --------- | ------------------------------------------------------ |
| figsize   | 指定画布的大小，(宽度,高度)，单位为英寸。              |
| dpi       | 指定绘图对象的分辨率，即每英寸多少个像素，默认值为80。 |
| facecolor | 背景颜色。                                             |
| dgecolor  | 边框颜色。                                             |
| frameon   | 是否显示边框。                                         |

下面使用 figure() 创建一个空白画布：

fig = plt.figure()

我们使用 add_axes() 将 axes 轴域添加到画布中。如下所示：

`ax=fig.add_axes([0,0,1,1])`

add_axes() 的参数值是一个序列，序列中的 4 个数字分别对应图形的左侧，底部，宽度，和高度，且每个数字必须介于 0 到 1 之间。

设置 x 和 y 轴的标签以及标题，如下所示：

```python
ax.set_title("sine wave")
ax.set_xlabel('angle')
ax.set_ylabel('sine')
```

调用 axes 对象的 plot() 方法，对 x 、 y 数组进行绘图操作：

ax.plot(x,y)

完整的代码如下所示：

```python
from matplotlib import pyplot as plt
import numpy as np
import math
x = np.arange(0, math.pi*2, 0.05)
y = np.sin(x)
fig = plt.figure()
ax = fig.add_axes([0,0,1,1])
ax.plot(x,y)
ax.set_title("sine wave")
ax.set_xlabel('angle')
ax.set_ylabel('sine')
plt.show()
```

输出结果如下：



![面向对象接口matplotlib](https://c.biancheng.net/uploads/allimg/210906/1533434O9-0.gif)
图1：运行结果图

在 Jupyter Notebook 中运行程序，结果如下：



![面向对象接口matplotlib](https://c.biancheng.net/uploads/allimg/210906/1533433500-1.gif)
图2：运行结果

# Matplotlib axes类使用详解

Matplotlib 定义了一个 axes 类（轴域类），该类的对象被称为 axes 对象（即轴域对象），它指定了一个有数值范围限制的绘图区域。在一个给定的画布（figure）中可以包含多个 axes 对象，但是同一个 axes 对象只能在一个画布中使用。

2D 绘图区域（axes）包含两个轴（axis）对象；如果是 3D 绘图区域，则包含三个。

通过调用 add_axes() 方法能够将 axes 对象添加到画布中，该方法用来生成一个 axes 轴域对象，对象的位置由参数`rect`决定。

rect 是位置参数，接受一个由 4 个元素组成的浮点数列表，形如 [left, bottom, width, height] ，它表示添加到画布中的矩形区域的左下角坐标(x, y)，以及宽度和高度。如下所示：

ax=fig.add_axes([0.1,0.1,0.8,0.8])

注意：每个元素的值是画布宽度和高度的分数。即将画布的宽、高作为 1 个单位。比如，[ 0.1, 0.1, 0.8, 0.8]，它代表着从画布 10% 的位置开始绘制, 宽高是画布的 80%。

下面介绍 axes 类的其他成员函数，这些函数在绘图过程中都承担着不同的作用。

## legend()绘制图例

axes 类的 legend() 方法负责绘制画布中的图例，它需要三个参数，如下所示：

ax.legend(handles, labels, loc)

- labels 是一个字符串序列，用来指定标签的名称；
- loc 是指定图例位置的参数，其参数值可以用字符串或整数来表示；
- handles 参数，它也是一个序列，它包含了所有线型的实例；

下面是 loc 参数的表示方法，分为字符串和整数两种，如下所示：



| 位置     | 字符串表示   | 整数数字表示 |
| -------- | ------------ | ------------ |
| 自适应   | Best         | 0            |
| 右上方   | upper right  | 1            |
| 左上方   | upper left   | 2            |
| 左下     | lower left   | 3            |
| 右下     | lower right  | 4            |
| 右侧     | right        | 5            |
| 居中靠左 | center left  | 6            |
| 居中靠右 | center right | 7            |
| 底部居中 | lower center | 8            |
| 上部居中 | upper center | 9            |
| 中部     | center       | 10           |

## axes.plot()

这是 axes 类的基本方法，它将一个数组的值与另一个数组的值绘制成线或标记，plot() 方法具有可选格式的字符串参数，用来指定线型、标记颜色、样式以及大小。

颜色代码如下表：



| 'b'  | 蓝色   |
| ---- | ------ |
| 'g'  | 绿色   |
| 'r'  | 红色   |
| 'c'  | 青色   |
| 'm'  | 品红色 |
| 'y'  | 黄色   |
| 'k'  | 黑色   |
| 'w'  | 白色   |

标记符号如下表：



| 标记符号 | 描述       |
| -------- | ---------- |
| '.'      | 点标记     |
| 'o'      | 圆圈标记   |
| 'x'      | 'X'标记    |
| 'D'      | 钻石标记   |
| 'H'      | 六角标记   |
| 's'      | 正方形标记 |
| '+'      | 加号标记   |

线型表示字符，如下表：



| 字符 | 描述     |
| ---- | -------- |
| '-'  | 实线     |
| '--' | 虚线     |
| '-.' | 点划线   |
| ':'  | 虚线     |
| 'H'  | 六角标记 |

下面的例子，以直线图的形式展示了电视、智能手机广告费与其所带来产品销量的关系图。其中描述电视的是带有黄色和方形标记的实线，而代表智能手机的则是绿色和圆形标记的虚线。

```python
import matplotlib.pyplot as plt
y = [1, 4, 9, 16, 25,36,49, 64]
x1 = [1, 16, 30, 42,55, 68, 77,88]
x2 = [1,6,12,18,28, 40, 52, 65]
fig = plt.figure()
ax = fig.add_axes([0,0,1,1])
#使用简写的形式color/标记符/线型
l1 = ax.plot(x1,y,'ys-') 
l2 = ax.plot(x2,y,'go--') 
ax.legend(labels = ('tv', 'Smartphone'), loc = 'lower right') 
# legend placed at lower right
ax.set_title("Advertisement effect on sales")
ax.set_xlabel('medium')
ax.set_ylabel('sales')
plt.show()
```

输出结果如下：

![Matplotlib绘图](https://c.biancheng.net/uploads/allimg/210906/1536104922-0.gif)
图1：输出结果

# Matplotlib subplot()函数用法详解





在使用 Matplotlib 绘图时，我们大多数情况下，需要将一张画布划分为若干个子区域，之后，我们就可以在这些区域上绘制不用的图形。在本节，我们将学习如何在同一画布上绘制多个子图。

`matplotlib.pyplot`模块提供了一个 subplot() 函数，它可以均等地划分画布，该函数的参数格式如下：

`plt.subplot(nrows, ncols, index)`

nrows 与 ncols 表示要划分几行几列的子区域（nrows*nclos表示子图数量），index 的初始值为1，用来选定具体的某个子区域。

例如： subplot(233)表示在当前画布的右上角创建一个两行三列的绘图区域（如下图所示），同时，选择在第 3 个位置绘制子图。



![subplot()函数示意图](https://c.biancheng.net/uploads/allimg/210907/12534L438-0.gif)
图1：示意图

如果新建的子图与现有的子图重叠，那么重叠部分的子图将会被自动删除，因为它们不可以共享绘图区域。

```python
import matplotlib.pyplot as plt
plt.plot([1,2,3])
#现在创建一个子图，它表示一个有2行1列的网格的顶部图。#因为这个子图将与第一个重叠，所以之前创建的图将被删除
plt.subplot(211)
plt.plot(range(12))
#创建带有黄色背景的第二个子图
plt.subplot(212, facecolor='y')
plt.plot(range(12))
```

上述代码运行结果，如下图所示：



![subplot函数绘制子图](https://c.biancheng.net/uploads/allimg/210907/12534K029-1.gif)
图2：subplot绘制结果

如果不想覆盖之前的图，需要使用 add_subplot() 函数，代码如下：

```python
import matplotlib.pyplot as plt
fig = plt.figure()
ax1 = fig.add_subplot(111)
ax1.plot([1,2,3])
ax2 = fig.add_subplot(221, facecolor='y')
ax2.plot([1,2,3])
```

执行上述代码，输出结果如下：



![subplot绘图函数](https://c.biancheng.net/uploads/allimg/210907/12534J423-2.gif)
图3：add_subplot()绘图结果


通过给画布添加 axes 对象可以实现在同一画布中插入另外的图像。

```python
import matplotlib.pyplot as plt
import numpy as np
import mathx = np.arange(0, math.pi*2, 0.05)
fig=plt.figure()
axes1 = fig.add_axes([0.1, 0.1, 0.8, 0.8]) 
# main axes
axes2 = fig.add_axes([0.55, 0.55, 0.3, 0.3]) 
# inset 
axesy = np.sin(x)
axes1.plot(x, y, 'b')
axes2.plot(x,np.cos(x),'r')
axes1.set_title('sine')
axes2.set_title("cosine")
plt.show()
```

输出结果如下：

![matplotlib绘图](https://c.biancheng.net/uploads/allimg/210907/12534H458-3.gif)
图4：输出结果图

# Matplotlib subplots()函数详解

`matplotlib.pyplot`模块提供了一个 subplots() 函数，它的使用方法和 subplot() 函数类似。其不同之处在于，subplots() 既创建了一个包含子图区域的画布，又创建了一个 figure 图形对象，而 subplot() 只是创建一个包含子图区域的画布。

subplots 的函数格式如下：

`fig , ax = plt.subplots(nrows, ncols)`

nrows 与 ncols 表示两个整数参数，它们指定子图所占的行数、列数。

函数的返回值是一个元组，包括一个图形对象和所有的 axes 对象。其中 axes 对象的数量等于 nrows * ncols，且每个 axes 对象均可通过索引值访问（从1开始）。

下面我们创建了一个 2 行 2 列的子图，并在每个子图中显示 4 个不同的图像。

```python
import matplotlib.pyplot as plt
fig,a =  plt.subplots(2,2)
import numpy as np
x = np.arange(1,5)
#绘制平方函数
a[0][0].plot(x,x*x)
a[0][0].set_title('square')
#绘制平方根图像
a[0][1].plot(x,np.sqrt(x))
a[0][1].set_title('square root')
#绘制指数函数
a[1][0].plot(x,np.exp(x))
a[1][0].set_title('exp')
#绘制对数函数
a[1][1].plot(x,np.log10(x))
a[1][1].set_title('log')
plt.show()
```

上述代码的输出结果如下：



![subplotl函数](https://c.biancheng.net/uploads/allimg/210907/13014T120-0.gif)
图1:输出结果

# Matplotlib subplot2grid()函数详解

`matplotlib.pyplot` 模块提供了 subplot2grid() ，该函数能够在画布的特定位置创建 axes 对象（即绘图区域）。不仅如此，它还可以使用不同数量的行、列来创建跨度不同的绘图区域。与 subplot() 和 subplots() 函数不同，subplot2gird() 函数以非等分的形式对画布进行切分，并按照绘图区域的大小来展示最终绘图结果。

函数语法格式如下：

`plt.subplot2grid(shape, location, rowspan, colspan)`

参数含义如下：

- shape：把该参数值规定的网格区域作为绘图区域；
- location：在给定的位置绘制图形，初始位置 (0,0) 表示第1行第1列；
- rowsapan/colspan：这两个参数用来设置让子区跨越几行几列。

下面，在画布（figure）中添加了行、列跨度均不相同的绘图子区域，然后在每个绘图区上，绘制不同的图形。示例代码如下：

```python
import matplotlib.pyplot as plt
#使用 colspan指定列，使用rowspan指定行
a1 = plt.subplot2grid((3,3),(0,0),colspan = 2)
a2 = plt.subplot2grid((3,3),(0,2), rowspan = 3)
a3 = plt.subplot2grid((3,3),(1,0),rowspan = 2, colspan = 2)
import numpy as np
x = np.arange(1,10)
a2.plot(x, x*x)
a2.set_title('square')
a1.plot(x, np.exp(x))
a1.set_title('exp')
a3.plot(x, np.log(x))
a3.set_title('log')
plt.tight_layout()
plt.show()
```

输出结果如下：



![Subplot2grid()输出结果](https://c.biancheng.net/uploads/allimg/210907/13030125K-0.gif)
图1：subplot2grid()输出结果

# Matplotlib grid()设置网格格式

通过 Matplotlib axes 对象提供的 grid() 方法可以开启或者关闭画布中的网格（即是否显示网格）以及网格的主/次刻度。除此之外，grid() 函数还可以设置网格的颜色、线型以及线宽等属性。

grid() 的函数使用格式如下：

`grid(color='b', ls = '-.', lw = 0.25)`

参数含义如下：

- color：表示网格线的颜色；
- ls：表示网格线的样式；
- lw：表示网格线的宽度；

网格在默认状态下是关闭的，通过调用上述函数，网格会被自动开启，如果您只是想开启不带任何样式的网格，可以通过 grid(True) 来实现。

实例如下：

```python
import matplotlib.pyplot as plt
import numpy as np
#fig画布；axes子图区域
fig, axes = plt.subplots(1,3, figsize = (12,4))
x = np.arange(1,11)
axes[0].plot(x, x**3, 'g',lw=2)
#开启网格
axes[0].grid(True)
axes[0].set_title('default grid')
axes[1].plot(x, np.exp(x), 'r')
#设置网格的颜色，线型，线宽
axes[1].grid(color='b', ls = '-.', lw = 0.25)
axes[1].set_title('custom grid')
axes[2].plot(x,x)
axes[2].set_title('no grid')
fig.tight_layout()
plt.show()
```

上述代码执行后，输出结果：



![grids网格绘图](https://c.biancheng.net/uploads/allimg/210907/1304226033-0.gif)
图1：输出结果

# Matplotlib坐标轴格式

在一个函数图像中，有时自变量 x 与因变量 y 是指数对应关系，这时需要将坐标轴刻度设置为对数刻度。Matplotlib 通过 axes 对象的`xscale`或`yscale`属性来实现对坐标轴的格式设置。

示例：右侧的子图显示对数刻度，左侧子图则显示标量刻度。

```python
import matplotlib.pyplot as plt
import numpy as np
fig, axes = plt.subplots(1, 2, figsize=(10,4))
x = np.arange(1,5)
axes[0].plot( x, np.exp(x))
axes[0].plot(x,x**2)
axes[0].set_title("Normal scale")
axes[1].plot (x, np.exp(x))
axes[1].plot(x, x**2)
#设置y轴axes[1].set_yscale("log")
axes[1].set_title("Logarithmic scale (y)")
axes[0].set_xlabel("x axis")
axes[0].set_ylabel("y axis")
axes[0].xaxis.labelpad = 10
#设置x、y轴标签axes[1].set_xlabel("x axis")
axes[1].set_ylabel("y axis")
plt.show()
```

![对数关系图](https://c.biancheng.net/uploads/allimg/210907/13105V0H-0.gif)
图1：对数关系图

轴是连接刻度的线，也就是绘图区域的边界，在绘图区域（axes 对象）的顶部、底部、左侧和右侧都有一个边界线（轴）。通过指定轴的颜色和宽度，从而对进行显示格式设置，比如将所有轴的颜色设置为 None，那么它们都会成为隐藏状态，或者也可以给轴添加相应的颜色。以下示例为左侧轴、底部轴分别设置了红色、蓝色，如下所示：

```python
import matplotlib.pyplot as plt
fig = plt.figure()
ax = fig.add_axes([0,0,1,1])
#为左侧轴，底部轴添加颜色
ax.spines['bottom'].set_color('blue')
ax.spines['left'].set_color('red')
ax.spines['left'].set_linewidth(2)
#将侧轴、顶部轴设置为None
ax.spines['right'].set_color(None)
ax.spines['top'].set_color(None)
ax.plot([1,2,3,4,5])
plt.show()
```

输出结果如下：

![matplotlib绘图](https://c.biancheng.net/uploads/allimg/210907/13105RK9-1.gif)
图2：输出结果

# Matplotlib坐标轴范围

Matplotlib 可以根据自变量与因变量的取值范围，自动设置 x 轴与 y 轴的数值大小。当然，您也可以用自定义的方式，通过 set_xlim() 和 set_ylim() 对 x、y 轴的数值范围进行设置。

当对 3D 图像进行设置的时，会增加一个 z 轴，此时使用 set_zlim() 可以对 z 轴进行设置。

下面示例分别对自动设置和自定义设置做了演示：第一种 Matplotlib 自动设置

```python
import matplotlib.pyplot as plt
import numpy as np
fig = plt.figure()
#添加绘图区域
a1 = fig.add_axes([0,0,1,1])
#准备数据
x = np.arange(1,10)
#绘制函数图像
a1.plot(x, np.exp(x))
#添加题目
a1.set_title('exp')
plt.show()
```

代码执行后，输出结果如下：



![Matplotlib绘图](https://c.biancheng.net/uploads/allimg/210907/131630M25-0.gif)
图1：输出结果

第二种：自定义设置，set_xlim() 将 x 轴的数值范围设置为（0到10)； set_ylim() 将 y 轴的范围设置为（0到10000）。

```python
import matplotlib.pyplot as plt
fig = plt.figure()
a1 = fig.add_axes([0,0,1,1])
import numpy as np
x = np.arange(1,10)
a1.plot(x, np.exp(x),'r')
a1.set_title('exp')
#设置y轴
a1.set_ylim(0,10000)
#设置x轴
a1.set_xlim(0,10)
plt.show()
```

输出结果如下：



![matplotlib绘图](https://c.biancheng.net/uploads/allimg/210907/1316302J5-1.gif)
图2：输出结果

# Matplotlib刻度和刻度标签





刻度指的是轴上数据点的标记，Matplotlib 能够自动的在 x 、y 轴上绘制出刻度。这一功能的实现得益于 Matplotlib 内置的刻度定位器和格式化器（两个内建类）。在大多数情况下，这两个内建类完全能够满足我们的绘图需求，但是在某些情况下，刻度标签或刻度也需要满足特定的要求，比如将刻度设置为“英文数字形式”或者“大写阿拉伯数字”，此时就需要对它们重新设置。

xticks() 和 yticks() 函数接受一个列表对象作为参数，列表中的元素表示对应数轴上要显示的刻度。如下所示：

ax.set_xticks([2,4,6,8,10])

x 轴上的刻度标记，依次为 2，4，6，8，10。您也可以分别通过 set_xticklabels() 和 set_yticklabels() 函数设置与刻度线相对应的刻度标签。

下面示例对刻度和标签的使用方法做了说明。

```python
import matplotlib.pyplot as plt
import numpy as np
import math
x = np.arange(0, math.pi*2, 0.05)
#生成画布对象
fig = plt.figure()
#添加绘图区域
ax = fig.add_axes([0.1, 0.1, 0.8, 0.8])
y = np.sin(x)ax.plot(x, y)
#设置x轴标签
ax.set_xlabel('angle')
ax.set_title('sine')
ax.set_xticks([0,2,4,6])
#设置x轴刻度标签
ax.set_xticklabels(['zero','two','four','six'])
#设置y轴刻度
ax.set_yticks([-1,0,1])
plt.show()
```

输出结果如下：



![matplotlib绘图](https://c.biancheng.net/uploads/allimg/210907/131I550a-0.gif)
图1：绘制坐标轴刻度与标签

# Matplotlib中文乱码解决方案（两种方式）https://c.biancheng.net/matplotlib/twin-axes.html)



Matplotlib 默认不支持中文字体，这因为 Matplotlib 只支持 ASCII 字符，但中文标注更加符合中国人的阅读习惯。因此，本节重点讲解如何在 Windows 环境下让 Matplotlib 显示中文。

## Matplotlib中文乱码

当不对 Matplotlib 进行设置，而直接使用中文时，绘制的图像会出现中文乱码。下面是一个含有中文乱码的折线图：



![matplotlib折线图](https://c.biancheng.net/uploads/allimg/210909/9-210Z9151QWR.gif)

从上图可以看出，本应该显示在红框内的中文字体没有显示出来（红框是自己标注出来的），下面给出了两种解决方案：第一种是临时解决方案，第二种是一劳永逸的解决方案。

## 重写配置文件

通过临时重写配置文件的方法，可以解决 Matplotlib 显示中文乱码的问题，代码如下所示：

```python
import matplotlib.pyplot as plt
plt.rcParams["font.sans-serif"]=["SimHei"] 
#设置字体
plt.rcParams["axes.unicode_minus"]=False 
#该语句解决图像中的“-”负号的乱码问题
```

将上述代码添加到您的绘图程序中，即可解决中文乱码的问题。这是一种非常灵活、便捷的解决方法。完整的程序代码如下：

```python
#绘制折线图
import matplotlib.pyplot as plt
plt.rcParams["font.sans-serif"]=["SimHei"] #设置字体
plt.rcParams["axes.unicode_minus"]=False #正常显示负号
year = [2017, 2018, 2019, 2020]
people = [20, 40, 60, 70]
#生成图表
plt.plot(year, people)
plt.xlabel('年份')
plt.ylabel('人口')
plt.title('人口增长')
#设置纵坐标刻度
plt.yticks([0, 20, 40, 60, 80])
#设置填充选项：参数分别对应横坐标，纵坐标，纵坐标填充起始值，填充颜色
plt.fill_between(year, people, 20, color = 'green')
#显示图表
plt.show()
```

输出结果如下：

![matplotlib解决中文乱码问题](https://c.biancheng.net/uploads/allimg/210909/9-210Z9155512113.gif)

不过上述解决方案适用于所有操作系统，其唯一弊端是每编写一个绘图程序就要添加一次相同的代码。

## 修改配置文件

下面介绍第二种方式：通过直接修改配置文件的方法，可以一劳永逸的解决 Matplotlib 的中文乱码问题。注意此过程在 Windows 环境下进行。

Matplotlib 从配置文件 matplotlibrc 中读取相关配置信息，比如字体、样式等，因此我们需要对该配置文件进行更改。首先查看 matplotlibrc 所在的目录，使用如下代码确定目录位置：

```python
import matplotlibmatplotlib.matplotlib_fname()
```

输出结果：

```
D:\python\python37\lib\site-packages\matplotlib\mpl-data\matplotlibrc
```

然后修改配置文件 matplotlibrc。打开配置文件后，找到以下信息：

```
#font.family: sans-serif

#font.serif: DejaVu Serif, Bitstream Vera Serif, Computer Modern Roman, New Century Schoolbook, Century Schoolbook L, Utopia, ITC Bookman, Bookman, Nimbus Roman No9 L, Times New Roman, Times, Palatino, Charter, serif
```

将上述配置项前面的`#`去掉，并修改的配置项，如下所示：

```
font.family   :  Microsoft YaHei, sans-serif
font.serif: Microsoft YaHei, DejaVu Serif, Bitstream Vera Serif, Computer Modern Roman, New Century Schoolbook, Century Schoolbook L, Utopia, ITC Bookman, Bookman, Nimbus Roman No9 L, Times New Roman, Times, Palatino, Charter, serif
```

注意，由于版本问题，上述内容配置信息可能存在一些差异，请自动忽略。

最后，在以下目录中复制中文字体微软雅黑：

```
C:\Windows\Fonts\Microsoft YaHei UI
```

复制完成后，将字体粘贴至以下路径文件中：

```
D:\python\python37\lib\site-packages\matplotlib\mpl-data\fonts\ttf
```

字体粘贴后会出现一个 MSYH.ttc 的字体文件，如下所示：



![字体路径](https://c.biancheng.net/uploads/allimg/210909/9-210Z91J253N5.gif)

编写如下代码进行测试：

```python
import matplotlib.pyplot as plt
import numpy as np
x = np.linspace(-8, 8, 1024)
y1 = 0.618 * np.abs(x) - 0.8 * np.sqrt(64 - x ** 2)
y2 = 0.618 * np.abs(x) + 0.8 * np.sqrt(64 - x ** 2)
plt.plot(x, y1, color='r')
plt.plot(x, y2, color='r')
plt.title("我爱Python",fontsize=20,color="b")
plt.show()
```

如果你对自己编写的程序没有强烈的“洁癖”，可以接受重复的代码，那么建议您选择第一种解决方法，因为这种方法灵活、轻便。当然您也可以选择第二种方式，一劳永逸的解决中文乱码问题。

# Matplotlib双轴图



在一些应用场景中，有时需要绘制两个 x 轴或两个 y 轴，这样可以更直观地显现图像，从而获取更有效的数据。Matplotlib 提供的 twinx() 和 twiny() 函数，除了可以实现绘制双轴的功能外，还可以使用不同的单位来绘制曲线，比如一个轴绘制对函数，另外一个轴绘制指数函数。

下面示例绘制了一个具有两个 y 轴的图形，一个显示指数函数 exp(x)，另一个显示对数函数 log(x)。

```python
import matplotlib.pyplot as plt
import numpy as np
#创建图形对象
fig = plt.figure()
#添加子图区域
a1 = fig.add_axes([0,0,1,1])
#准备数据
x = np.arange(1,11)
#绘制指数函数
a1.plot(x,np.exp(x))
a1.set_ylabel('exp')
#添加双轴
a2 = a1.twinx()
#‘ro’表示红色圆点
a2.plot(x, np.log(x),'ro-')
#绘制对数函数
a2.set_ylabel('log')
#绘制图例
fig.legend(labels = ('exp','log'),loc='upper left')
plt.show()
```

输出结果：



![matplotlib绘图](https://c.biancheng.net/uploads/allimg/210907/1320111358-0.gif)
图1：输出结果

# Matplotlib柱状图（代码+注释详解）

柱状图是一种用矩形柱来表示数据分类的图表，柱状图可以垂直绘制，也可以水平绘制，它的高度与其所表示的数值成正比关系。柱状图显示了不同类别之间的比较关系，图表的水平轴 X 指定被比较的类别，垂直轴 Y 则表示具体的类别值。

Matplotlib 提供了`bar()`函数来绘制柱状图，它可以应用在 MATLAB 样式以及面向对象的绘图方法中。当它与 axes 对象一起使用时，其语法格式如下：

ax.bar(x, height, width, bottom, align)

该函数的参数说明，如下表所示：



| x      | 一个标量序列，代表柱状图的x坐标，默认x取值是每个柱状图所在的中点位置，或者也可以是柱状图左侧边缘位置。 |
| ------ | ------------------------------------------------------------ |
| height | 一个标量或者是标量序列，代表柱状图的高度。                   |
| width  | 可选参数，标量或类数组，柱状图的默认宽度值为 0.8。           |
| bottom | 可选参数，标量或类数组，柱状图的y坐标默认为None。            |
| algin  | 有两个可选项 {"center","edge"}，默认为 'center'，该参数决定 x 值位于柱状图的位置。 |

该函数的返回值是一个 Matplotlib 容器对象，该对象包含了所有柱状图。

下面是一个关于 Matplotlib 柱状图的简单示例。它用来显示了不同编程语言的学习人数。

```python
import matplotlib.pyplot as plt
#创建图形对象
fig = plt.figure()
#添加子图区域，参数值表示[left, bottom, width, height ]
ax = fig.add_axes([0,0,1,1])
#准备数据
langs = ['C', 'C++', 'Java', 'Python', 'PHP']
students = [23,17,35,29,12]
#绘制柱状图
ax.bar(langs,students)
plt.show()
```

输出结果如下：



![bar()函数](https://c.biancheng.net/uploads/allimg/210907/132214OD-0.gif)
图1：matplotlib bar()绘图


通过调整柱状图的宽度，可以实现在同一 x 轴位置绘制多个柱状图。您可以将它们设置成不同的颜色，从而使它们更容易区分。下面示例描述了某工程学院过去四年中，三个专业录取的统招学生数量。

```python
import numpy as np
import matplotlib.pyplot as plt
#准备数据
data = [[30, 25, 50, 20],[40, 23, 51, 17],[35, 22, 45, 19]]
X = np.arange(4)
fig = plt.figure()
#添加子图区域
ax = fig.add_axes([0,0,1,1])
#绘制柱状图
ax.bar(X + 0.00, data[0], color = 'b', width = 0.25)
ax.bar(X + 0.25, data[1], color = 'g', width = 0.25)
ax.bar(X + 0.50, data[2], color = 'r', width = 0.25)
```

上述代码执行后，将显示四个柱状图，将每个柱状图又均分为三个小柱状图，每个柱状图占据 0.25 个单位。



![matplotlib绘图](https://c.biancheng.net/uploads/allimg/210907/1322144K6-1.gif)
图2：matplotlib绘图

柱状图除了上述使用方法外，还有另外一种堆叠柱状图。所谓堆叠柱状图就是将不同数组别的柱状图堆叠在一起，堆叠后的柱状图高度显示了两者相加的结果值。

bar() 函数提供了一个可选参数`bottom`，该参数可以指定柱状图开始堆叠的起始值，一般从底部柱状图的最大值开始，依次类推。

下面是一个不同国家参加奥林匹克运动会所得奖牌（金银铜）的柱状堆叠图示例，如下所示：

```python
import numpy as np
import matplotlib.pyplot as plt
countries = ['USA', 'India', 'China', 'Russia', 'Germany'] 
bronzes = np.array([38, 17, 26, 19, 15]) 
silvers = np.array([37, 23, 18, 18, 10]) 
golds = np.array([46, 27, 26, 19, 17]) 
# 此处的 _ 下划线表示将循环取到的值放弃，只得到[0,1,2,3,4]
ind = [x for x, _ in enumerate(countries)] 
#绘制堆叠图
plt.bar(ind, golds, width=0.5, label='golds', color='gold', bottom=silvers+bronzes) 
plt.bar(ind, silvers, width=0.5, label='silvers', color='silver', bottom=bronzes) 
plt.bar(ind, bronzes, width=0.5, label='bronzes', color='#CD853F') 
#设置坐标轴
plt.xticks(ind, countries) 
plt.ylabel("Medals") 
plt.xlabel("Countries") 
plt.legend(loc="upper right") 
plt.title("2019 Olympics Top Scorers")
plt.show()
```

在上述代码中，第一次调用`plt.bar()`绘制了黄色柱状图， 第二次调用`plot.bar()`时绘制了灰色柱状图，最后一次调用`plt.bar()`则绘制最底部的柱状图。两个柱状图相接触的位置就是顶部与底部的位置，这样就构成了柱状堆叠图。



![柱状图堆叠图画法](https://c.biancheng.net/uploads/allimg/210907/13221435b-2.gif)
图3：柱状堆叠图

# Matplotlib直方图



直方图（Histogram），又称质量分布图，它是一种条形图的一种，由一系列高度不等的纵向线段来表示数据分布的情况。 直方图的横轴表示数据类型，纵轴表示分布情况。

首先，我们需要了解柱状图和直方图的区别。直方图用于概率分布，它显示了一组数值序列在给定的数值范围内出现的概率；而柱状图则用于展示各个类别的频数。

例如，我们对某工厂的员工年龄做直方图统计，首先我们要统计出每一位员工的年龄，然后设定一个 20 至 65 的数值范围，并将该数值范围细分为 4 个区间段 (20,35),(35,45),(45,55),(55,65) , 最后通过直方图的形式，展示该工厂员工在相应年龄区间的分布情况。

如果想要构建直方图，必须遵循以下步骤：

- 将整个值范围划分为一系列区间。
- 区间值（bin）的取值，不可遗漏数据；
- 计算每个区间中有多少个值。

通常将 bin 指定为连续且不重叠的数值区间，而 bin 值指区间开始和结束的数值。

您可以使用下面的函数来绘制直方图：

matplotlib.pyplot.hist（）

该函数的参数说明如下：



| x        | 必填参数，数组或者数组序列。                                 |
| -------- | ------------------------------------------------------------ |
| bins     | 可选参数，整数或者序列，bins 表示每一个间隔的边缘（起点和终点）默认会生成10个间隔。 |
| range    | 指定全局间隔的下限与上限值 (min,max)，元组类型，默认值为 None。 |
| density  | 如果为 True，返回概率密度直方图；默认为 False，返回相应区间元素的个数的直方图。 |
| histtype | 要绘制的直方图类型，默认值为“bar”，可选值有 barstacked(堆叠条形图)、step(未填充的阶梯图)、stepfilled(已填充的阶梯图)。 |

以下示例绘制了班级学生得分情况的直方图。其中定义了四个区间（bins）分别是：0-25、26-50、51-75 和 76-100。直方图显示了相应范围的学生人数。

```python
from matplotlib import pyplot as plt
import numpy as np
#创建图形对象和轴域对象
fig,ax = plt.subplots(1,1)
a = np.array([22,87,5,43,56,73,55,54,11,20,51,5,79,31,27])
#绘制直方图
ax.hist(a, bins = [0,25,50,75,100])
#设置坐标轴
ax.set_title("histogram of result")
ax.set_xticks([0,25,50,75,100])
ax.set_xlabel('marks')
ax.set_ylabel('no.of students')
plt.show()
```

上述代码执行后，输出结果如下：



![hist()直方图绘制](https://c.biancheng.net/uploads/allimg/210907/13254453A-0.gif)
图1：直方图绘制结果

# Matplotlib饼状图



饼状图用来显示一个数据系列，具体来说，饼状图显示一个数据系列中各项目的占项目总和的百分比。

Matplotlib 提供了一个 pie() 函数，该函数可以生成数组中数据的饼状图。您可使用 x/sum(x) 来计算各个扇形区域占饼图总和的百分比。pie() 函数的参数说明如下：



| X       | 数组序列，数组元素对应扇形区域的数量大小。                   |
| ------- | ------------------------------------------------------------ |
| labels  | 列表字符串序列，为每个扇形区域备注一个标签名字。             |
| color   | 为每个扇形区域设置颜色，默认按照颜色周期自动设置。           |
| autopct | 格式化字符串"fmt%pct"，使用百分比的格式设置每个扇形 区的标签，并将其放置在扇形区内。 |

以下示例：关于不同计算机语言学习人数的饼状图。autopct 参数设置为 %1.2f% ，并将各项所占总和的百分比显示在相对应的扇形区内。

```python
from matplotlib import pyplot as plt
import numpy as np
#添加图形对象
fig = plt.figure()
ax = fig.add_axes([0,0,1,1])
#使得X/Y轴的间距相等
ax.axis('equal')
#准备数据
langs = ['C', 'C++', 'Java', 'Python', 'PHP']
students = [23,17,35,29,12]
#绘制饼状图
ax.pie(students, labels = langs,autopct='%1.2f%%')
plt.show()
```

输出结果如下：



![matplotlib饼状图](https://c.biancheng.net/uploads/allimg/210907/13263G3X-0.gif)
图1：Matplotlib饼状图

# Matplotlib折线图（绘图实例+代码详解）



折线图（line chart）是我们日常工作、学习中经常使用的一种图表，它可以直观的反映数据的变化趋势。与绘制柱状图、饼状图等图形不同，Matplotlib 并没有直接提供绘制折线图的函数，因此本节着重讲解如何绘制一幅折线图。

## 绘制单条折线

下面示例是关于 xxx语言用户活跃度的折线图：

```python
import matplotlib.pyplot as plt
#准备绘制数据
x = ["Mon", "Tues", "Wed", "Thur", "Fri","Sat","Sun"]
y = [20, 40, 35, 55, 42, 80, 50]
# "g" 表示红色，marksize用来设置'D'菱形的大小
plt.plot(x, y, "g", marker='D', markersize=5, label="周活")
#绘制坐标轴标签
plt.xlabel("登录时间")
plt.ylabel("用户活跃度")
plt.title("xxx语言活跃度")
#显示图例
plt.legend(loc="lower right")
#调用 text()在图像上绘制注释文本#x1、y1表示文本所处坐标位置，ha参数控制水平对齐方式, va控制垂直对齐方式，str(y1)表示要绘制的文本
for x1, y1 in zip(x, y):    
    plt.text(x1, y1, str(y1), ha='center', va='bottom', fontsize=10)
    #保存图片
plt.savefig("1.jpg")
plt.show()
```

显示结果如下：

![matplotlib折线图绘制](https://c.biancheng.net/uploads/allimg/210910/9-2109101A003A2.gif)

## 绘制多条折线图

当学习完如何绘制单条折线的绘制后，再绘制多条折线也变的容易，只要准备好绘制多条折线图的数据即可。

下面是一个简单示例，绘制了两天内同一时刻，天气温度随时间变化的折线图：

```python
import matplotlib.pyplot as plt
#对比两天内同一时刻温度的变化情况
x = [5, 8, 12, 14, 16, 18, 20]
y1 = [18, 21, 29, 31, 26, 24, 20]
y2 = [15, 18, 24, 30, 31, 25, 24]
#绘制折线图，添加数据点，设置点的大小# * 表示绘制五角星；此处也可以不设置线条颜色，matplotlib会自动为线条添加不同的颜色
plt.plot(x, y1, 'r',marker='*', markersize=10)
plt.plot(x, y2, 'b', marker='*',markersize=10)
plt.title('温度对比折线图')  
# 折线图标题
plt.xlabel('时间(h)')  
# x轴标题
plt.ylabel('温度(℃)')  
# y轴标题#给图像添加注释，并设置样式
for a, b in zip(x, y1):    
    plt.text(a, b, b, ha='center', va='bottom', fontsize=10)
for a, b in zip(x, y2):    
    plt.text(a, b, b, ha='center', va='bottom', fontsize=10)#绘制图例plt.legend(['第一天', '第二天'])#显示图像plt.show()
```

显示结果如下：

![Matplotlib绘制折线图](https://c.biancheng.net/uploads/allimg/210910/9-2109101J353439.gif)

# Matplotlib散点图



散点图用于在水平轴和垂直轴上绘制数据点，它表示了因变量随自变量变化的趋势。通俗地讲，它反映的是一个变量受另一个变量的影响程度。

散点图将序列显示为一组点，其中每个散点值都由该点在图表中的坐标位置表示。对于不同类别的点，则由图表中不同形状或颜色的标记符表示。同时，您也可以设置标记符的颜色或大小。

下面示例，绘制了学生考试成绩的散点图，其中蓝色代表男孩成绩，红色表示女孩的成绩。

```python
import matplotlib.pyplot as plt
girls_grades = [89, 90, 70, 89, 100, 80, 90, 100, 80, 34]
boys_grades = [30, 29, 49, 48, 100, 48, 38, 45, 20, 30]
grades_range = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
fig=plt.figure()
#添加绘图区域
ax=fig.add_axes([0,0,1,1])
ax.scatter(grades_range, girls_grades, color='r',label="girls")
ax.scatter(grades_range, boys_grades, color='b',label="boys")
ax.set_xlabel('Grades Range')
ax.set_ylabel('Grades Scored')
ax.set_title('scatter plot')
#添加图例
plt.legend()
plt.show()
```

代码执行后，输出结果如下：



![散点图](https://c.biancheng.net/uploads/allimg/210907/13312G928-0.png)
图1：绘制散点图

# atplotlib等高线图



等高线图（也称“水平图”）是一种在二维平面上显示 3D 图像的方法。等高线有时也被称为 “Z 切片”，如果您想要查看因变量 Z 与自变量 X、Y 之间的函数图像变化（即 Z=f(X,Y)），那么采用等高线图最为直观。

自变量 X 和 Y 需要被限制在矩形网格内，您可以将 x 、y 数组作为参数传递给 numpy.meshgrid() 函数来构建一个网格点矩阵。

关于 meshgrid() 函数用法可参考《[numpy.meshgrid()用法详解](https://www.jb51.net/article/166704.htm)》。

Matplotlib API 提供了绘制等高线（contour）与填充等高线（ contourf）的函数。这两个函数都需要三个参数，分别是 X、Y 与 Z。

```python
import numpy as np
import matplotlib.pyplot as plt
#创建xlist、ylist数组
xlist = np.linspace(-3.0, 3.0, 100)
ylist = np.linspace(-3.0, 3.0, 100)
#将上述数据变成网格数据形式
X, Y = np.meshgrid(xlist, ylist)
#定义Z与X,Y之间的关系
Z = np.sqrt(X**2 + Y**2)
fig,ax=plt.subplots(1,1)
#填充等高线颜色
cp = ax.contourf(X, Y, Z)
fig.colorbar(cp) 
# 给图像添加颜色柱
ax.set_title('Filled Contours Plot')
ax.set_xlabel('x (cm)')
ax.set_ylabel('y (cm)')
#画等高线
plt.contour(X,Y,Z)
plt.show()
```

代码执行后，输出结果如下：



![matplotlib画图](https://c.biancheng.net/uploads/allimg/210907/1332514047-0.gif)
图1：等高线示例图


左侧图像绘制了两个变量 X、Y ，右侧的颜色柱（colorbar）则表示 X 的取值，颜色越深表示值越小，中间深色部分的圆心点表示 x=0，y=0，z=0。

# atplotlib振动图



振动图也叫磁场图，或量场图，其图像的表现形式是一组矢量箭头，其数学含义是在点 (x,y) 处具有分向量 (u,v)。

Matplotlib 提供绘制量场图的函数，如下所示：

quiver(x,y,u,v)

上述函数表示，在指定的 (x,y) 坐标上以箭头的形式绘制向量，参数说明如下：



| 参数 | 说明                                          |
| ---- | --------------------------------------------- |
| x    | 一维、二维数组或者序列，表示箭头位置的x坐标。 |
| y    | 一维、二维数组或者序列，表示箭头位置的y坐标。 |
| u    | 一维、二维数组或者序列，表示箭头向量的x分量。 |
| v    | 一维、二维数组或者序列，表示箭头向量的y分量。 |
| c    | 一维、二维数组或者序列，表示箭头颜色。        |

以下示例，绘制了一个简单的振动图：

```python
import matplotlib.pyplot as plt
import numpy as np
x,y = np.meshgrid(np.arange(-2, 2, 0.2), np.arange(-2, 2, 0.25))
z = x*np.exp(-x**2 - y**2)
#计算数组中元素的梯度
v, u = np.gradient(z, 0.2, 0.2)
fig, ax = plt.subplots()
q = ax.quiver(x,y,u,v)
plt.show()
```

上述代码执行后，输出结果如下：



![matplotlib画图](https://c.biancheng.net/uploads/allimg/210907/13335U429-0.gif)
图1：振动示例图

# Matplotlib箱型图



箱型图（也称为盒须图）于 1977 年由美国著名统计学家**约翰·图基**（John Tukey）发明。它能显示出一组数据的最大值、最小值、中位数、及上下四分位数。

在箱型图中，我们从上四分位数到下四分位数绘制一个盒子，然后用一条垂直触须（形象地称为“盒须”）穿过盒子的中间。上垂线延伸至上边缘（最大值），下垂线延伸至下边缘（最小值）。箱型图结构如下所示：



![箱型图结构图](https://c.biancheng.net/uploads/allimg/210907/14213911N-0.gif)
图1：箱型如结构图


首先准备创建箱型图所需数据：您可以使用`numpy.random.normal()`函数来创建一组基于正态分布的随机数据，该函数有三个参数，分别是正态分布的平均值、标准差以及期望值的数量。如下所示：

```python
#利用随机数种子使每次生成的随机数相同
np.random.seed(10)
collectn_1 = np.random.normal(100, 10, 200)
collectn_2 = np.random.normal(80, 30, 200)
collectn_3 = np.random.normal(90, 20, 200)
collectn_4 = np.random.normal(70, 25, 200)
data_to_plot=[collectn_1,collectn_2,collectn_3,collectn_4]
```

然后用 data_to_plot 变量指定创建箱型图所需的数据序列，最后用 boxplot() 函数绘制箱型图，如下所示：

```python
fig = plt.figure() #创建绘图区域
ax = fig.add_axes([0,0,1,1]) 
#创建箱型图
bp = ax.boxplot(data_to_plot)
plt.show()
```

上述代码执行后，输出结果如下：



![箱型图输出结果](https://c.biancheng.net/uploads/allimg/210907/1421391604-1.gif)
图2：箱型图输出结果

# Matplotlib提琴图



小提琴图（Violin Plot）是用来展示数据分布状态以及概率密度的图表。这种图表结合了箱形图和密度图的特征。小提琴图跟箱形图类似，不同之处在于小提琴图还显示数据在不同数值下的概率密度。

小提琴图使用核密度估计（KDE）来计算样本的分布情况，图中要素包括了中位数、四分位间距以及置信区间。在数据量非常大且不方便一一展示的时候，小提琴图特别适用。

概率密度估计、置信区间、四分位间距都属于统计学中的概念，可自行查阅，这里不做说明。

小提琴图比箱型图能提供了更多的信息。虽然箱型图显示了均值、中位数和上、下四分位数等统计信息，但是小提琴图却显示了数据的完整分布情况，这更利于数据的分析与比对。下面是小提琴图的使用示例：

```python
import matplotlib.pyplot as plt
np.random.seed(10)
collectn_1 = np.random.normal(100, 10, 200)
collectn_2 = np.random.normal(80, 30, 200)
collectn_3 = np.random.normal(90, 20, 200)
collectn_4 = np.random.normal(70, 25, 200)
#创建绘制小提琴图的数据序列
data_to_plot = [collectn_1, collectn_2, collectn_3, collectn_4]
#创建一个画布
fig = plt.figure()
#创建一个绘图区域
ax = fig.add_axes([0,0,1,1])
# 创建一个小提琴图
bp = ax.violinplot(data_to_plot)
plt.show()
```

输出结果如下：



![violinplot小提琴图绘制](https://c.biancheng.net/uploads/allimg/210907/142HH227-0.gif)
图1：小提琴图绘制

# Matplotlib 3D绘图详解（汇总）



最初开发的 Matplotlib，仅支持绘制 2d 图形，后来随着版本的不断更新， Matplotlib 在二维绘图的基础上，构建了一部分较为实用的 3D 绘图程序包，比如 `mpl_toolkits.mplot3d`，通过调用该程序包一些接口可以绘制 3D散点图、3D曲面图、3D线框图等

mpl_toolkits 是 Matplotlib 的绘图工具包。

## 第一个三维绘图程序

下面编写第一个三维绘图程序。

首先创建一个三维绘图区域， plt.axes() 函数提供了一个参数`projection`，将其参数值设置为 "3d"。如下所示：

```python
#导入三维工具包
mplot3dfrom mpl_toolkits import mplot3d
import numpy as np
import matplotlib.pyplot as plt
fig = plt.figure()
#创建3d绘图区域
ax = plt.axes(projection='3d')
```

有了三维绘图区域，接下来就要构建 3d 图像，如下所示：

```python
#从三个维度构建
z = np.linspace(0, 1, 100)
x = z * np.sin(20 * z)
y = z * np.cos(20 * z)
```

最后调用 plot3D() 方法绘制 3d 图形，代码如下：

```python
#调用 ax.plot3D创建三维线图
ax.plot3D(x, y, z, 'gray')
ax.set_title('3D line plot')
plt.show()
```

完整程序如下所示：

```python
from mpl_toolkits import mplot3d
import numpy as np
import matplotlib.pyplot as plt
fig = plt.figure()
#创建3d绘图区域
ax = plt.axes(projection='3d')
#从三个维度构建
z = np.linspace(0, 1, 100)
x = z * np.sin(20 * z)
y = z * np.cos(20 * z)
#调用 ax.plot3D创建三维线图
ax.plot3D(x, y, z, 'gray')
ax.set_title('3D line plot')
plt.show()
```

输出结果如下所示：



![matplotlib 3D绘图](https://c.biancheng.net/uploads/allimg/210908/14352VV8-0.gif)
图1：三维线图(3D Line)

上述代码中的 ax.plot3D() 函数可以绘制各种三维图形，这些三维图都要根据`(x，y，z)`三元组类来创建。

## 3D散点图

通过 ax.scatter3D() 函数可以绘制 3D 散点图，示例代码如下：

```python
from mpl_toolkits import mplot3d
import numpy as np
import matplotlib.pyplot as plt
fig = plt.figure()
#创建绘图区域
ax = plt.axes(projection='3d')
#构建xyz
z = np.linspace(0, 1, 100)
x = z * np.sin(20 * z)
y = z * np.cos(20 * z)
c = x + yax.scatter3D(x, y, z, c=c)
ax.set_title('3d Scatter plot')
plt.show()
```

输出结果图：



![scatter散点图3D绘图](https://c.biancheng.net/uploads/allimg/210908/14352Q292-1.gif)
图2：Matplotlib 3D绘图

## 3D等高线图

ax.contour3D() 可以用来创建三维等高线图，该函数要求输入数据均采用二维网格式的矩阵坐标。同时，它可以在每个网格点`(x,y)`处计算出一个 z 值。

以下示例展示了如何绘制三维正弦等高线图。代码如下：

```python
from mpl_toolkits import mplot3d
import numpy as np
import matplotlib.pyplot as plt
def f(x, y):   
    return np.sin(np.sqrt(x ** 2 + y ** 2))
#构建x、y数据
x = np.linspace(-6, 6, 30)
y = np.linspace(-6, 6, 30)
#将数据网格化处理
X, Y = np.meshgrid(x, y)
Z = f(X, Y)
fig = plt.figure()
ax = plt.axes(projection='3d')
#50表示在z轴方向等高线的高度层级，binary颜色从白色变成黑色
ax.contour3D(X, Y, Z, 50,cmap='binary')
ax.set_xlabel('x')
ax.set_ylabel('y')
ax.set_zlabel('z')
ax.set_title('3D contour')
plt.show()
```

输出结果图如下：



![三维绘图](https://c.biancheng.net/uploads/allimg/210908/1524436364-0.gif)
图3：绘制三维轮廓图

## 3D线框图

线框图同样要采用二维网格形式的数据，与绘制等高线图类似。

线框图可以将数据投影到指定的三维表面上，并输出可视化程度较高的三维效果图。通过 plot_wireframe() 能够绘制 3D 线框图。代码如下：

```python
from mpl_toolkits import mplot3d
import numpy as np
import matplotlib.pyplot as plt
#要绘制函数图像
def f(x, y):   
    return np.sin(np.sqrt(x ** 2 + y ** 2))
#准备x,y数据
x = np.linspace(-6, 6, 30)
y = np.linspace(-6, 6, 30)
#生成x、y网格化数据
X, Y = np.meshgrid(x, y)
#准备z值
Z = f(X, Y)
#绘制图像
fig = plt.figure()
ax = plt.axes(projection='3d')
#调用绘制线框图的函数plot_wireframe()
ax.plot_wireframe(X, Y, Z, color='black')
ax.set_title('wireframe')
plt.show()
```

输出结果如下：



![img](https://c.biancheng.net/uploads/allimg/210908/1524434037-1.gif)
图4：Matplotlib绘制线框图

## 3D曲面图

曲面图表示一个指定的因变量`y`与两个自变量`x`和`z`之间的函数关系。

3D 曲面图是一个三维图形，它非常类似于线框图。不同之处在于，线框图的每个面都由多边形填充而成。Matplotlib 提供的 plot_surface() 函数可以绘制 3D 曲面图，该函数需要接受三个参数值 x，y 和 z 。示例代码如下：

```python
from mpl_toolkits import mplot3d
import numpy as np
import matplotlib.pyplot as plt
#求向量积(outer()方法又称外积)
x = np.outer(np.linspace(-2, 2, 30), np.ones(30))#矩阵转置
y = x.copy().T 
#数据
zz = np.cos(x ** 2 + y ** 2)
#绘制曲面图
fig = plt.figure()
ax = plt.axes(projection='3d')
#调用plot_surface()函数
ax.plot_surface(x, y, z,cmap='viridis', edgecolor='none')
ax.set_title('Surface plot')
plt.show()
```

输出结果图：



![Matplotlib绘制表面图](https://c.biancheng.net/uploads/allimg/210908/1524432964-2.gif)
图5：Matplotlib绘制曲面图

# Matplotlib绘制文本



Matplotlib 支持广泛的文本格式，比如 TTF 页面语言、Unicode 字符等。这是因为 Matplotlib 内置了 matplotlib.font_manager 字体管理器，它是一个实现了跨平台，并符合 W3C 字体查找算法的字体集合。

TTF（TrueType Font） 是苹果公司和微软公司合作开发的页面描述语言，用来描述字符的轮廓，结合了光栅技术和矢量技术的优点。

用户可以对文本属性进行控制，比如字体大小、粗细、位置和颜色等。

与此同时，Matplotlib 也支持绘制 TeX 包含的数学符号。TeX 是一套功能强大、十分灵活的排版语言，它可以用来绘制文本、符号、数学表达式等。通过下表中的方法可以绘制出相应的内容：



| text     | 在绘图区域的任意位置添加文本。               |
| -------- | -------------------------------------------- |
| annotate | 在绘图区域的任意位置添加带有可选箭头的注释。 |
| xlabel   | 在绘图区域的 x 轴上添加标签。                |
| ylabel   | 在绘图区域的 y 轴上添加标签。                |
| title    | 为绘图区域添加标题。                         |
| figtext  | 在画布的任意位置添加文本。                   |
| suptitle | 为画布中添加标题。                           |

Matplotlib 使用`pyplot`模块中的 text() 函数绘制文本，函数的语法格式如下：

```python
plt.text(x, y, string, weight="bold", color="b")
```

参数说明如下：

- x: 注释文本内容所在位置的横坐标；
- y：注释文本内容所在位置的纵坐标；
- string：注释文本内容；
- weight：注释文本内容的粗细风格；

下面使用 text() 函数会创建一个文本对象。示例如下：

```python
import matplotlib.pyplot as plt
plt.rcParams["font.sans-serif"]=["SimHei"] 
#设置字体
plt.rcParams["axes.unicode_minus"]=False 
#正常显示负号
fig = plt.figure()
#添加绘图区域
ax = fig.add_axes([0,0,1,1])
#设置格式
ax.set_title('axes title')
ax.set_xlabel('xlabel')
ax.set_ylabel('ylabel')
# 3,8 表示x，y的坐标点；style设置字体样式为斜体；bbox用来设置盒子的属性，比如背景色
ax.text(3, 8, 'xxx语言，xxx', style='italic',bbox = {'facecolor': 'yellow'},fontsize=15)
#绘制数学表达式,用$符包裹
ax.text(2, 6, r'an equation: $E = mc^2$', fontsize = 15)
#添加文字，并设置样式
ax.text(4, 0.05, '网址：c.biancheng.net',verticalalignment = 'bottom', color = 'green', fontsize = 15)
ax.plot([2], [1], 'o')
#xy为点的坐标；xytext为注释内容坐标；arrowprops设置箭头的属性
ax.annotate('xxx语言', xy = (2, 1), xytext = (3, 4),arrowprops = dict(facecolor = 'blue', shrink = 0.1))
#设置坐标轴x,y
ax.axis([0, 10, 0, 10])
plt.show()
```

# Matplotlib数学表达式





Matplotlib 中的文本字符串都可以使用 Text Markup（一种文本标记语言）显现出来，具体的使用方法是将文本标记符放在一对美元符号`$`内，语法格式如下：

```python
#数学表达式
plt.title(r'$\alpha > \beta$')
```

如果要绘制下标和上标，您需要使用`'_'`和`'^'`符号，下面是一个简单的示例：

```python
#绘制表达式 r'$\alpha_i> \beta_i$'
import numpy as np
import matplotlib.pyplot as plt
t = np.arange(0.0, 2.0, 0.01)
s = np.sin(2*np.pi*t)
#绘制函数图像
plt.plot(t,s)
#设置标题
plt.title(r'$\alpha_i> \beta_i$', fontsize=20)
#设置数学表达式
plt.text(0.6, 0.6, r'$\mathcal{A}\mathrm{sin}(2 \omega t)$', fontsize = 20)
#设置数学表达式
plt.text(0.1, -0.5, r'$\sqrt{2}$', fontsize=10)
plt.xlabel('time (s)')
plt.ylabel('volts (mV)')
plt.show()
```

上面代码的输出结果：



![Matplot数学表达式设置](https://c.biancheng.net/uploads/allimg/210908/162605C33-0.gif)
Matplotlib数学表达式绘制

从上述示例可以看出，虽然数学表达式种类繁多，但是 Matplotlib 对各种数学符号都做了良好的支持。

# Matplotlib image图像处理



Matplotlib 软件包中的`image`模块提供了加载、缩放和显示图像的功能，该模块只能支持 PNG 格式的图片，如果格式不符，需要对图片的格式进行转换。

Matplotlib 支持的图片格式非常有限，所以通常情况下，建议采用 Python 图像处理库 Pillow 来处理图像，若感兴趣可以自行了解。

下面示例，imread() 函数用于读取图像数据并形成 ndarray 数组 ，其数据类型为 float32。

```
import matplotlib.pyplot as pltimport matplotlib.image as mpimgimport numpy as npimg = mpimg.imread('mtplogo.png')
```

假设在当前目录中存在名为 mtplogo.png 的图像。



![Matplotlib图像处理](https://c.biancheng.net/uploads/allimg/210908/162925N21-0.gif)
图1：mtplogo图像

通过执行 imsave() 函数，可以将包含图像数据的 ndarray 数组保存到磁盘文件中。

plt.imsave("logo.png", img, cmap = 'gray', origin = 'lower')

如下所示，将 imsave()方法的`origin`参数设置为 lower 实现了原始图像的垂直翻转。



![img](https://c.biancheng.net/uploads/allimg/210908/1629252422-1.gif)
图2：垂直翻转图

通过 imshow() 函数可以在 Matplotlib 查看器上绘制出相应的图像。其函数格式如下：

imgplot = plt.imshow(img)

下面列举一组示例：

```python
import matplotlib.pyplot as plt
import numpy as np
fig=plt.figure()
ax1=fig.add_subplot(221)
ax2=fig.add_subplot(222)
ax3=fig.add_subplot(223)
ax4=fig.add_subplot(224)
#准备数据
#绘制
z = sqrt(x^2+y^2)
#图像
points=np.arange(-5,5,0.01)
# meshgrid 接受两个一维数组，然后产生两个二维矩阵
xs,ys=np.meshgrid(points,points)
#绘制图像
z=np.sqrt(xs**2+ys**2)
ax = fig.add_subplot(221)
#默认
ax.imshow(z)
ax = fig.add_subplot(222)
ax.imshow(z,cmap = "gray")
ax = fig.add_subplot(223)
ax.imshow(z,cmap="cool")
ax = fig.add_subplot(224)
ax.imshow(z,cmap="hot")
#显示图像
plt.show()
```

输出结果如下：



![imshow()函数用法](https://c.biancheng.net/uploads/allimg/210908/162925I26-2.gif)
图3：输出结果

# Matplotlib转换对象



Matplotlib 是一款轻量级的图形转换框架，它通过转换对象轻松地实现了数据坐标系、轴域坐标系、图形坐标系，以及显示坐标系四者之间的相互转换，由于这种转换是 Matplotlib 自动完成的，因此无需考虑其底层原理。

## 坐标系转换对象

下面对四种坐标系做简单说明，其中`ax`代表轴域对象的实例；`fig`代表图形对象的实例。



| 坐标系  | 转换对象        | 描述                                                         |
| ------- | --------------- | ------------------------------------------------------------ |
| Data    | ax.transData    | 数据坐标系，由 xlim 和 ylim 控制。                           |
| Axes    | ax.transAxes    | 轴域坐标系(即绘图区坐标系)，(0,0) 在轴域坐标系左下角，(1,1)在轴域坐标系的右上角。 |
| Figure  | fig.transFigure | 图形坐标系。(0,0) 在图的左下角，(1,1) 在图的右上角。         |
| Display | None            | 显示坐标系。(0,0)显示左下角，而(width,height) 则显示右上角。注意，此处以像素 px 为单位。 |

转换对象作用就是在不同对象之间架起一座沟通的桥梁。输入一组数据最终以图像的形式显示，这个过程就是依靠转换对象来实现的。

上表中的 Data、Axes、Figure，这三个转换对象都可以接受一组数据，它们会将接受的数据转换到显示坐标系中，即 Display。在这个过程中，显示坐标系只是充当数据的接收者，因此显示坐标系不存在转换对象。

## 示例说明

下面举一个简单的示例，现有文本“my text”放置在数据点 (x,y) 位置处：

`axes.text(x,y,"my text") `

通过 Axes 转换对象，我们可以指定文本的位置。使用以下代码，将文本移动至在坐标系的中心位置：

`axes.text(0.5, 0.5, "middle of graph", transform=axes.transAxes)`

