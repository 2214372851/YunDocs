# 一	浏览器能识别的标签（HTML标签）（HTML:超文本传输语言）

## 1	编码（head）

```html

<meta charset="UTF-8">
```

## 2	title（head）

```html
<title>Title</title>
```

## 3	标题

		h1~h6（块级标签）

## 4	div和span

		div,一个占一行（块级标签）
		span,有多大占多数（行内标签，内联标签）
		注意：两个标签比较素+css样式 

## 5	超链接

		默认当前标签打开
		跳转到自己的网站可以用	/url
		跳转到其他网站要写全url

```html
<a herf='url'> 点击跳转 </a>（行内标签，内联标签）
```

		新建标签页打开

```html
<a herf='url' target='_blank'> 点击跳转 </a>
```

## 6	图片

```html
<img src='图片地址'/>（行内标签，内联标签）
图片地址可以用互联网上的图片 例：http:/www.xxx.com/a.jpg
图片的高度和宽度
<img style='height:100px;width=100px;' src='图片地址'/>
<img style='height:10%;width=10%;' src='图片地址'/>
```

## 7	列表

### 7.1	无序列表

```html

<ul>
    <li>title1</li>
    <li>title2</li>
    <li>title3</li>
</ul>
```

### 7.2	有序列表

```html

<ol>
    <li>title1</li>
    <li>title2</li>
    <li>title3</li>
</ol>
```

## 8	表格

```html
<!-- border边框 -->
<table border="1">
    <!-- 表头 -->
    <thead>
    <!-- tr行 -->        <!-- th列 -->
    <tr>
        <th>ID</th>
        <th>姓名</th>
        <th>年龄</th>
    </tr>
    </thead>
    <!-- 内容 -->
    <tboby>
        <tr>
            <td>1</td>
            <td>米老鼠</td>
            <td>19</td>
        </tr>
        <tr>
            <td>2</td>
            <td>米奇</td>
            <td>18</td>
        </tr>
        <tr>
            <td>3</td>
            <td>佩奇</td>
            <td>17</td>
        </tr>
    </tboby>
</table>
```

## 9	input系列

### 9.1	文本框

```
<input type="text"/>
```

### 9.2	密码框

```
<input type="password"/>
```

### 9.3	上传

```
<input type="file"/>
```

### 9.4	单选框

name一致只能选一个不同都可以选

```html
    <input type="radio" name="n1"/>
```

### 9.5	复选框

```html
<input type="checkbox"/>篮球
<input type="checkbox"/>足球
```

### 9.6	按钮

```html
<input type="button" value="提交"/>        <!-- 普通按钮 -->
<input type="submit" value="提交"/>        <!-- 提交表单 -->
```

## 10	下拉框

#### 10.1	单选

```html
<select>
    <option>北京</option>
    <option>上海</option>
</select>
```

#### 10.2	多选（按住上档键即可多选）

```html
<select multiple>
    <option>北京</option>
    <option>上海</option>
</select>
```

#### 10.3	多行文本

```html
<textarea></textarea>
默认3行但是后面也可以继续换行写
<textarea rows="3"></textarea>
```

## 11	提交数据

form标签包裹要提交数据的标签 提交方式

##### 11.1	GET

```html

<form method="get"></form>
```

##### 11.2	POST

```html

<form method="post"></form>
```

##### 11.3	提交的地址

```html

<form action="url"></form>
form标签里必须有一个submit标签：<input type="submit" value="submit按钮"/>
在form标签里的一些标签（input/select/textarea）
一定要写name属性        密码：<input type="password" name="password"/>
```

# 二	CSS样式（美化标签）

## 1	CSS应用方式

### 1.1	标签上使用

```html
<img src="" style="height=100px"/>
```

### 1.2	在head标签中写style标签

```html

<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        .c1 {
            color: red;
        }
    </style>
</head>


<body>


<h1 class='c1'>title</h1>

</body>
</html>
```

### 1.3	写到CSS文件中

CSS

```css
        .c1 {
    color: red;
}

.c2 {
    color: blue;
}
```

HTML

```html
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <link rel="stylesheet" href="/css/a.css"/>
</head>
<body>
<h1 class="c1">Title</h1>
</body>
</html>
```

## 2	CSS选择器

### 2.1	ID选择器（一个ID只能有一个，所以不常用）

id="c2"的用该样式

```css
#c2 {
    color: red;
}
```

### 2.2	类选择器

class="c1"的用该样式

```css
.c1 {
    color: royalblue;
}
```

### 2.3	标签选择器（太绝对，所以不常用）

div标签用该样式

```css
div {
    color: darkblue;
}
```

### 2.4	属性选择器（不常用）

class="v1"且yun="123"的用该样式

```css
.v1[yun="123"] {
    color: rosybrown
}
```

### 2.5	后代选择器

class="y1"下的li标签用该样式

```css
.y1 li {
    color: #00849e
}
```

子级li标签用该样式

```css
.y1 > li {
    color: #00849e
}
```

### 2.6	多个和覆盖问题

CSS里的样式会叠加，如果样式重复那么下面的会覆盖上面的
CSS

```css
.c1 {
    color: royalblue;
}

.c2 {
    color: #079e3c;
    font-size: 36px;
}
```

HTML

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <link rel="stylesheet" href="/css/a.css"/>
</head>
<body>
<h1 class="c1 c2">123</h1>
</body>
</html>
```

要想不覆盖可在上面样式后面加上`!important`

```css
.c1 {
    color: royalblue !important;
}

.c2 {
    color: #079e3c;
    font-size: 36px;
}
```

			HTML

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <link rel="stylesheet" href="/css/a.css"/>
</head>
<body>
<h1 class="c1 c2">123</h1>
</body>
</html>
```

## 3	样式

### 3.1	高度和宽度

`height: 24px;`
`width: 30%;`
支持百分比
行内标签：默认无效
块级标签：默认有效（霸道，空出来的区域不能使用）

### 3.2	块级标签和行内标签

块级（不能设置高度和宽度，边距）
行内
块级和行内标签的强制转化

#### 转行内：`display:inline`

#### 转块级：`display:block`

#### 转行内&块级：`display: inline-block;`

#### 隐藏标签：`display: none;` 默认不显示可以通过CSS添加样式

#### 标签圆角

```css
.navbar {
    /*四边的圆角*/
    border-radius: 0;
    /*左上角圆角*/
    border-top-left-radius: 0;
}


```

### 3.3	字体和颜色

```css
* {
    /*颜色*/
    color: #9e6212;

    /*大小*/
    font-size: 58px;

    /*加粗*/
    font-weight: 600;

    /*字体*/
    font-family: Microsoft YaHei, ui-serif;

    /*背景色*/
    background-color: red;

    /*边框*/
    border: 1px solid red;
}
```

### 3.4	文字对齐方式

```css
* {
    /*水平方向剧中*/
    text-align: center;

    /*垂直方向剧中，前提是后面的值与高度一致*/
    line-height: 200px;
}
```

### 3.5	浮动

### 飘到右边

`float:right`

`div`块级标签浮动起来变得不霸道了，但是会脱离文档流（div用到浮动一定要拽回来）

文档流
标签一字排开

#### 脱离文档流

标签飘起来，父级标签（父级标签无高度和宽度）没办法被标签撑起来，所以父级标签的颜色等无法显示
解决办法（拽回标签）
`clear:both`

### 3.6	边距

### 3.6.1	内边距

标签内部的边距

#### 上边距

`padding-top: 10px;`

#### 左边距

`padding-left: 10px;`

#### 右边距

`padding-right: 10px;`

#### 下边距

`padding-bottom: 10px;`

#### 3.6.2	全局内边距

全部内边距
`padding: 10px;`
内边距上右下左
`padding: 10px 10px 10px 10px`

### 外边距

标签外部距离

#### 上边距

`margin-top: 10px;`

#### 左边距

`margin-left: 10px;`

#### 右边距

`margin-right: 10px;`

#### 下边距

`margin-bottom: 10px;`

#### 全局外边距

全部外边距

`margin: 10px;`

#### 标签居中（标签必须设置宽度）

`margin: 0 auto;`

外边距上右下左

```css
{
    margin: 10px 10px 10px 10px
}
```

#### body标签默认有一个外边距

```css
{
    margin: 0 auto
;
}
/*去除*/
```

#### a标签去下划线

```css
{
    text-decoration: none
;
}
```

#### 设置透明度

```
opacity:0.5; 
```

网页上的遮罩通过透明度实现

## 4	CSS知识点

### 4.1	cursor（鼠标放上去变小手）

###      		

```css
c1：hover {
    cursor: pointer;
}
```

### 4.2	after（伪类）

		标签尾部加东西
		清除浮动，拽回标签（测试的时候发现我的不能加到css文件里，但是加到html头部可以使用）

```css
.c1:after {
<!-- 可以在css里拽回飘起来的标签 --> clear: both;
<!-- 在后面添加东西 --> content: ''
}
```

### 4.3	鼠标放上去使用的样式 hover

```css
    .c1:hover {
    color: red;
}
```

## 5	position（定位）

### 5.1	fixed

			固定在窗口的某个位置
				不设置高度和宽度那么离四边为0时就是占整个页面，设置了高度和宽度就选两个然后直角坐标系定位

```css
.c1 {
    position: fixed;
    width: 60px;
    height: 60px;
    /*离左边是0*/
    left: 0;
    /*离上边是0*/
    top: 0;
    /*离右边是0 */
    right: 0;
    /*离下边是0 */
    bottom: 0;
    /*标签z-index的值越大就越优先显示，在最上面*/
    z-index: 999;
}

/*relative和absolute（一般是一起使用）*/
/*前提：.c1标签包含.c2标签*/
/*有absolute的标签根据有relative的标签来确定位置*/
.c1 {
    width: 200px;
    height: 200px;
    border: 1px solid red;
    position: relative;
}

.c2 {
    width: 10px;
    height: 10px;
    background-color: aqua;
    position: absolute;
    top: 10px;
    left: 0;
    right: 0;
    margin: 0 auto;
}

/*border（边框）*/
{
    border-radius: 0px 10px 0px 0px
;
}
/*设置右上角的边框弧度*/
border-方向，设置单边颜色
.c1 {
    border: 1px solid red;
}

/*background-color  (背景色)*/
{
    background-color: aqua

}
/*box-shadow标签阴影*/
{
    box-shadow: 2px 4px 6px red


}
/*(x, y, z空间坐标系加颜色, x:水平方向，y:垂直方向，z:衍生距离)*/
```

## 6 当标签不够子标签放置的时候（滚动条）

```html

<ul style="overflow:auto">
    <li></li>
    <li></li>
    <li></li>
</ul>
```

# 一	CSS动画

## 浏览器私有前缀

有些在浏览器里不能用要把浏览器私有前缀加上，开发时全写，加上标准写法

```html
-webkit-text-stroke:1px #f00;
```

## 渐变

线性渐变

```html
background-img:linear-gradient(red,green,blue);
background:linear-gradient(to top,red,green);
background:linear-gradient(45deg,green 20%,blue 40%);重复设置（一般不用）
```

径向渐变

```html
background-img:radial-gradient(red,green,blue);
```

## transform转换

```html
transform(2D)

transform:translate(30px)  支持一个参数（x,y）


```

## transition过渡

```html
```

# 三、BootStrap

别人写好的css样式

## 1 下载BootStrap

`<link rel="stylesheet" href="bootstrap-3.4.1/css/bootstrap.css"/>`
导入即可用

## 2 栅格系统

### 把整体分为12格

### 分类

#### 响应式(x代表数字)（大于多少像素生效）

`.col-lg-x`    1170px （大屏幕）
`.col-md-x`    970px （中屏幕）
`.col-sm-x`    750px （平板）

#### 非响应数据

`.col-xs-x`    750px （手机）

#### 列偏移

`.col-sm-offset-x`

### container(标签居中)

#### 两边留白

`.container`

#### 两边平铺

`.container-fluid`

#### 清除浮动

`clearfix`

#### 面板

检查浏览器元素拼接到自己的HTML

#### 图标

bootstrap提供，但是图标不多（span标签）

fontawesome组件（和bootstrap用法一致）（i标签）

BootStrap依赖JavaScript的类库，jQuery

下载jQuery，在页面是应用上jQuery

在页面上应用BootStrap的JavaScript类库

# 四	JavaScript（和Java没关系）

HTML 骨架

CSS 皮肤

## 1	JavaScript 动态交互

		交互语言

	JavaScript，是一门编程语言。浏览器就是JavaScript解释器

## 2	DOM和BOM

			相当于python的模块，例：json
		jQuery
			相当于第三方模块，例requests

## 3	代码位置

1，头部标签里title下面有css就在css下面
2，body标签最后（推荐）
JS代码存在形式
写在当前HTML文件中
`<script type="text/javascript">        </script>`
写在js文件，导入使用
`<script src="text/javascript.js">        </script>`

## 4	变量

### 4.1	定义变量

`var name = "百度"`

### 4.2	查看变量(控制台)

`console.log(name)`

### 4.3	字符串类型

`var name = "百度";`    （一般这么写）
`var name = String("百度");`

#### 常见功能

##### 获取长度

`var name = "百度";`

`var v1 =name.length;`

索引取第一个字符（没有反向负值）

`var v1 = name[0]; //name.charAt(0)`

##### 去除空白

`var v1 = name.trim();`

##### 切片（前取后不取前开后闭区间）

`var v1 = name.substring(1,2)`

##### 取标签的内容

`<span id="txt">我是</span>`

##### 找到标签

`var v1 = document.getElementById("txt");`

##### 取到文字

`var v2 = v1.innerText;`

`v1.innerText = v2;`    (赋值)

##### 插入

`v1.appendChild();`

## 5	数组类型

`var v1 = [1,2,3,4,5];`

`var v1 = Array([1,2,3,4,5]);`

索引获取值或修改值

`var v1 = [1,2,3,4,5];`

`v1[0];`

`v1[0] = 2;`

## 6	追加

### 尾部追加

`v1.push('6');`

### 前面追加

`v1.unshift('0');`

### 中间插入

`v1.splice(索引,0,元素);`

`v1.splice(2,0,10);`

### 尾部删除

`v1.pop()`

### 头部删除

`v1.shift()`

### 索引位置的元素删除

`v1.splice(索引,1)`

### 循环每一个元素的索引,根据索引来取值

```javascript
for (var id in v1) {
    data = v1[id]
}
for (var id = 0; id < v1.length; id++) {
    data = v[id]
}
```

也有break和continue

## 7	对象（python字典）

```javascript
info = {
    name: "百度",
    age: 18
}
```

### 获取值

`info.age`

`info["age"]`

### 修改值

`info.name = '搜狗'`

### 删除值

`delete info["age"]`

### 循环每一个元素的键,根据索引来取值

```javascript
for (var key in info) {
    data = info[key]
}
```

## 8	条件语句

```javascript
if (条件) {


} else if (条件) {

} else {

}
```

## 9	函数

### 定义函数

`function show() {}`

ES6
`const show = () => {}`

### 执行函数

`show()`

#### 定时执行函数（定时器）(1000是毫秒)

`setInterval(show,1000)`

### DOM

DOM,是一个模块，模块可以对HTML页面中的标签进行操作

根据id找到标签

`var tag = document.getElementById("txt");`

获取标签里的文本

`tag.innerText`

修改标签里的文本

`tag.innerText = "哈哈哈"`

创建标签

`document.createElement('div')`

标签写内容

`tag.innerText = "哈哈哈"`

创建标签并写入

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title></title>
</head>
<body>
<ul id="city">

</ul>
<script type="text/javascript">
    var newTag = document.createElement('li');
    newTag.innerText = "背景"
    var tag = document.getElementById("city");
    tag.appendChild(newTag)
</script>
</body>
</html>
```

获取用户输入框里的内容（input标签）
`tag.value`

### onclick

#### this代指当前标签

函数名(this);

```html

<div>
    onclick="cliclMe(this)"
</div>
```

函数定义的时候接收

```javascript
function clickMe(self) {
    //$(self) 代指当前点击那个标签
}
```

# 五	jQuery

jQuery是一个JavaScript第三方模块（第三方类库）

- 基于jQuery，自己开发一个功能
- 现成的工具依赖jQuery，例如：BootStrap动态效果

## 1	寻找标签(直接寻找)

### ID

```html
<h1 id="txt">中国联通1</h1>
<h1>中国联通2</h1>
<h1>中国联通3</h1>
```

```javascript
$("#txt")
```

### 样式选择器

```html
<h1 class="txt1">中国联通1</h1>
<h1 class="txt1">中国联通2</h1>
<h1 class="txt2">中国联通3</h1>
```

```javascript
$(".c1")
```

### 标签选择器

```html
<h1 class="txt1">中国联通1</h1>
<h1 class="txt1">中国联通2</h1>
<h1 class="txt2">中国联通3</h1>
```

```javascript
$("h1")
```

### 层级选择器

```javascript
$(".c1 .c2 a")
```

### 多选择器

```javascript
$(".c1, .c2, li")
```

### 属性选择器

```javascript
$("li[name='n1']")
```

## 2	间接寻找

### 找同级标签

```html

<div>
    <div>北京</div>
    <div id="c1">上海</div>
    <div>广州</div>
    <div>深圳</div>
</div>
```

```javascript
$("#c1").prev()  //上一个
$("#c1")
$("#c1").next()  //下一个
$("#c1").next().next() //下下个
$("#c1").siblings() //全部
```

### 找父子标签

```html

<div>
    <div>
        <div>北京</div>
        <div id="c1">上海
            <div>青浦区
                <div class="p2">
                    浦东区
                </div>
            </div>
        </div>
        <div>广州</div>
        <div>深圳</div>
    </div>
    <div>
        <div>北京</div>
        <div id="c2">上海</div>
        <div>广州</div>
        <div>深圳</div>
    </div>
</div>
```

```javascript
$("#c1").parent()	//父亲
$("#c1").parent().parent()		//爷爷

$("#c1").children()	//所有儿子
$("#c1").children(".p2")	//所有儿子里class等于p2的

$("#c1").find(".p2") //去所有子孙里找class等于p2的 
$("#c1").find("div") //去所有子孙里找所有div标签
```

### 操作样式

- `removeClass("hide")`删除class属性
- `hasClass("hide")`判断是不是有hide属性
- `addClass("hide")`添加class属性

```javascript
function clickMe(self) {
    //$(self) 代指当前点击那个标签
    //$(self).next().removeClass("hide") 把点击的那个标签的下一个兄弟标签的class里hide属性删除

    $(self).next().removeClass("hide")
}
```

## 3	值的操作

### 文本标签里的值

```html

<div id="c1">
    内容
</div>
```

```javascript
//获取文本内容
$("#c1").text()
//设置文本内容
$("#c1").text("信息")
```

### input标签里的值

```html
<input type="text" id="c2"/>
```

```javascript
//获取用户输入的值
$("#c2").val()
//设置用户输入的值
$("#c2").val("哈哈哈") 
```

### 创建标签

```javascript
$("<li>")
```

### 删除标签

```javascript
$("<li>").remove();
```

### 添加值到标签

```javascript
$("<li>").append("哈哈哈")
```

## 4	事件

### 单一绑定

```html

<div onclick="hanshu">

</div>
```

### 批量绑定

```javascript
$("li").click(function () {
    var txt = $(this).text();
    alert(txt);
})
```

页面加载完成后执行

```javascript
//当页面框架加载完成时，自动执行（一般都加上去）
$(function () {

})
```

## 5	表格操作

```javascript
$(function () {
    $("$.delete").click(function () {
        $(this).parent().parent().remove();
    })
})
```

# 六	前端整合

```html
引用
<link rel="stylesheet" href="/bootstrap/css/bootstrap.css"/>
<link rel="stylesheet" href="/font-awesome/font-awesome.css"/>

<script src="/jquery/jquery.js"></script>
<script src="/bootstrap/js/bootstrap.js"></script>
```

[font-awesome图标](https://www.runoob.com/font-awesome/fontawesome-tutorial.html)(还提供了字体)

[Bootstrap](https://v3.bootcss.com/)

[jquery](https://www.html.cn/jqapi-1.9/)
