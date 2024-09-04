# JavaScript

> 以下代码全在script标签中

## 1、直接写入文档流（就相当于一个普通标签,如果页面加载完成后调用他会覆盖整个页面）

```javascript
document.write('aa')
```

## 2、对事件的反应

```html
<button type="button" onclick="alert('弹窗')">
    点我
</button>
```

## 3、改变HTML内容

```javascript
a=document.getElementById("app1") //查找元素
a.innerHTML="Hello JavaScript" //修改内容
```

## 4、改变标签属性

```javascript
a=document.getElementById("app1")
a.src="/img/a.png"
a.style.color="#fff"
```

## 5、验证输入

```javascript
var a=document.getElementById("app1")
if isNaN(a){
    alert('不是数字')
}
//isNaN空格和数字返回Flase
```

6、`<body>`标签中的JavaScript

```html
<body>
    <script>
        document.write("<h1>插入h1标签</h1>")
    </script>
</body>
```

## 6、字面量

### 数字（Number）可以是整数、小数，或是科学计数(e)

```
3.14
1001
123e5
```

### 字符串（String）可以使用单引号或是双引号

```
"hello word"
'hello word'
```

### 表达式

```
5+6
5*10
```

### 数组（Array）

```
[10,20,32]
```

### 对象（Object）

```
{firstName:"john",lastName:"doe",age:50}
```

### 函数(Function)

```
function myFunction(a,b){ return a*b }
```

### 变量

用关键字var定义

```
var a
a = 1
```

### 操作符

#### 算数运算符

```
(5+6)*10
```

#### 赋值运算符

```
x = 5
y = 6
```

### JavaScript语句

在HTML中，JavaScript语句用于向浏览器发送命令语句用分号隔离

```
x = 5;
y = 6;
```

### JavaScript关键字

```
var  //这样的
```

### JavaScript注释

```
//单行注释
/*
多行注释
*/
```

### JavaScript数据类型

数组，字符串，数组，对象等等

```javascript
typeof 'John'  //typeof用于查看变量类型
typeof 3.12
```



### JavaScript函数

```javascript
function myFunction(a,b){
    retrun a*b
}
```

### JavaScript字母大小写

JavaScript对大小写敏感

### JavaScript字符集

JavaScript使用Unicode字符集

### JavaScript语句标识符

```javascript
catch //try语句出错时执行
do...while  //跳过一个语句块，为True时运行
throw	//抛出（生成）错误
switch	//用于基于不同条件来执行不同动作
```

### 空格

JavaScript会忽略多余空格

```
x = 6
```

### 对代码折行

```javascript
document.write("你\
好")
```

## 对象方法

```javascript
var person = {
    firstName: "John",
    lastName : "Doe",
    id : 5566,
    fullName : function() 
	{
       return this.firstName + " " + this.lastName;
    }
}; 	//this代表当前对象
```

## switch

```javascript

var d=new Date().getDay(); 
switch (d) 
{ 
  case 0:x="今天是星期日"; 
  break; 
  case 1:x="今天是星期一"; 
  break; 
  case 2:x="今天是星期二"; 
  break; 
  case 3:x="今天是星期三"; 
  break; 
  case 4:x="今天是星期四"; 
  break; 
  case 5:x="今天是星期五"; 
  break; 
  case 6:x="今天是星期六"; 
  break; 
}      类似于if匹配到了就执行，break阻止代码自动下一个case
```

## for循环

```javascript
//for循环
cars=["BMW","Volvo","Saab","Ford"];
for (var i=0;i<cars.length;i++){
	document.write(cars[i] + "<br>");
}
//for/in循环
for (x in person)  // x 为属性名
{
    txt=txt + person[x];
}
```

## while循环

```javascript
while (i<5){
    x = i
    i++
}
```

## 正则表达式

```javascript
var str = "Visit Runoob";
var n = str.search("Runoob"); 	//search使用字符串
var p = str.search(/Runoob/i);	//使用正则

var sty = document.getElementById("demo").innerHTML;
var txt = sty.replace(/microsoft/i,"Runoob");
var txtx = ("Microsoft","Runoob");
```

## try和catch

```javascript
try{
    adddleart("as?")
}catch(err){
    alert("有错")
}finally{
    //不论前面对称都会执行
    alert("执行")
}

//throw抛出异常
if(x == "")  throw "值为空";
```

## debugger关键字

```javascript
debugger;//用于调试模式断点
```

## JavaScript严格模式(use strict)

```javascript
"use strict";
x = 3.14;       // 报错 (x 未定义)
```

## JavaScript表单

```html

<form name="myForm" action="demo_form.php" onsubmit="return validateForm()" method="post">
名字: <input type="text" name="fname">
<input type="submit" value="提交">
</form>
<script>	
function validateForm() {
    var x = document.forms["myForm"]["fname"].value;
    if (x == null || x == "") {
        alert("需要输入名字。");
        return false;
    }
}
</script>
```

## let关键字

```javascript
var x = 10
{
    let x = 2
    //这里x为2
}
//这里x为10
```

## JavaScript JSON

```javascript
JSON.parse(data)	//把json字符串转换为JavaScript对象
JSON.stringify(data)	//把JavaScript对象转换为json字符串
```

## JavaScript void

```html
<p>点击以下链接查看结果：</p>
<a href="javascript:void(alert('Warning!!!'))">点我!</a>
<a href="#top" 	//网页锚点类似目录跳转到页面位置
```

## JavaScript异步编程

### 回调函数

```javascript
function print(){}
setTimeout(print,2000)	//等待两秒执行

setTimeout({alert(123)},3000)
```

### 异步AJAX

```javascript
var xhr = XMLHttpRequest();
xhr.onload = function(){
    //接受到的文字数据
    document.getElementById("demo").innerHTML=xhr.responseText;
}
xhr.onerror = function(){
    document.fetElementById("demo").innerHTML="请求错误";
}
xhr.open("GET","http://www.xxx.com/",true);
xhr.send()
```

### jQuery AJAX

```javascript
$.get("url",function(data,status){
    alert("data,status")
})
```

## JavaScript类

```javascript
class ClassName {
  constructor() { ... }
}
    

class Runoob {
  constructor(name, year) {
    this.name = name;
    this.year = year;
  }
  age() {
    let date = new Date();
    return date.getFullYear() - this.year;
  }
}
 
let runoob = new Runoob("菜鸟教程", 2018);
document.getElementById("demo").innerHTML =
"菜鸟教程 " + runoob.age() + " 岁了。";
```

## 选择器

```javascript
//id选择器
var a = document.ElementById("main")
//标签选择器
var b = a.document.ElementByTagName("p")
//类选择器
var c = document.ElementByClassName("info")
```

## ready方法

```javascript
$(function) == $(document).read(function) == $().read(function)
```

## 箭头函数

```javascript
function(){}
//箭头函数没有自己的this
()=>{}
```

