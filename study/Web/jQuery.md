## 选择器

```javascript
$("p")	//标签选择器
$(".class")	//类选择器
$("#id")	//id选择器
```

## jQuery事件

```javascript
$("#id").click(function(){
    $(this).hide()
})	//点击事件，点谁谁消失

$("#id").dblclick(function(){
    $(this).hide()
})	//双击谁谁消失

$("#id").mouseenter(function(){
    alert("鼠标移动到标签上了")
})	//鼠标穿透元素，会触发

$("#id").mouseleave(function(){
    alert("鼠标离开了")
})	//鼠标离开触发

$("#id").mousedown(function(){
    alert("在这里按下了鼠标")
})	//鼠标按上时触发

$("#id")mouseup(function(){
    alert("鼠标松开了")
})	//鼠标松开触发

$("#id").hover(function(){
    alert("鼠标悬停")
})

$("input").focus(function(){
    $(this).css("background-color","#fff")
})	//输入框聚焦触发

$("input").blur(function(){
    $(this).css("background-color","#fff")
})	//失焦时触发
```

## jQuery效果

### 隐藏/显示

```javascript
$("#id").hide();	//隐藏元素
$("#id").show();	//显示元素
$("#id").hide(1000，"linear",function(){});	//动画隐藏jQuery自带["linear","swing"]这两种动画也可以只填时间，不要样式和函数

$("#id").toggle();	//在hide()和show()之间来回切换
```

### 淡入淡出

```javascript
//淡入已经隐藏的元素
$("#id").fadeIn();
$("#id").fadeIn(3000);
$("#id").fadeIn("slow");
//淡出可见元素
$("#id").fadeOut();
$("#id").fadeOut("slow");
$("#id").fadeOut(3000);
//来回切换
$("#id").fadeToggle("slow",0.5);	//允许添加不透明值,第一个值可以为时间但是不能为空
```

### 滑动

```javascript
//参数 "slow","fast"或毫秒同上
$("#id").slideDown();	//下拉框，向下滑动元素
$("#id").slideUp() //收回
$("#id").slideToggle()	//来回切换
```

### 自定义动画

默认情况下，所有 HTML 元素都有一个静态位置，且无法移动。
 如需对位置进行操作，要记得首先把元素的 CSS position 属性设置为 relative、fixed 或 absolute！

```javascript
$("#id").animate({left:'250px'})	//左移250px
//相对值
$("div").animate({
    left:'250px',
    height:'+=150px',
    width:'+=150px'
  });
//预订值
$("div").animate({
    height:'toggle'		// "show"、"hide" 或 "toggle"
  });
//队列功能

$("button").click(function(){
  var div=$("div");
  div.animate({height:'300px',opacity:'0.4'},"slow");
  div.animate({width:'300px',opacity:'0.8'},"slow");
  div.animate({height:'100px',opacity:'0.4'},"slow");
  div.animate({width:'100px',opacity:'0.8'},"slow");
});		//会按照顺序依次执行动画
```

### 停止动画

```javascript
//用于在动画开始到结束这段时间内使用
//没有参数
$("#stop").click(function(){
  $("#panel").stop();
});
```

### Callback

```javascript

$("button").click(function(){
  $("p").hide("slow",function(){
    alert("段落现在被隐藏了");
  });
});		//隐藏效果完成后调用，回调函数alert


$("button").click(function(){
  $("p").hide(1000);
  alert("段落现在被隐藏了");
});		//隐藏效果完成前就执行了alert
```

### 方法链接（链式调用）

```javascript
$("#p1").css("color","red").slideUp(2000).slideDown(2000);


$("#p1").css("color","red")
  .slideUp(2000)
  .slideDown(2000);
```

## HTML

### 捕获

```javascript
$("#p1").text()		//获取元素的文本内容
$("#p1").html()		//获取元素的内容，包含html标签
$("#p1").val()		//获取输入的值
$("#p1").attr("href")		//获取属性值
```

### 设置

```javascript
$("#p1").text("Hello world")
$("#p1").html("<p>Hello world</p>")
$("#p1").val("Hello")

$("#p1").text(function(){
    return "Hello World"
})		//回调函数

$("#p1").attr("href":"https://www.xxx.com",
             "title":"你好"
             );
$("#p1").attr("href",function(i,origValue){
    return 'www.baidu.com'
})	//回调函数有两个参数：被选元素列表中当前元素的下标，以及原始（旧的）值。然后以函数新值返回您希望使用的字符串。
```

### 添加元素

```javascript
$("#p1").append("追加文本")
$("#p1").prepend("开头追加文字")
//添加多个新元素

function appendText(){
    var txt1="<p>文本-1。</p>";              // 使用 HTML 标签创建文本
    var txt2=$("<p></p>").text("文本-2。");  // 使用 jQuery 创建文本
    var txt3=document.createElement("p");
    txt3.innerHTML="文本-3。";               // 使用 DOM 创建文本 text with DOM
    $("body").append(txt1,txt2,txt3);        // 追加新元素
}

$("#p1").after("元素之后插入")
$("#p1").before("元素之前插入")

```

### 删除元素

```javascript
$("#p1").remove();	//删除元素（删除标签）和标签下的所有
$("#p1").empty()	//删除元素下的所有子元素
$("#p1").remove(".app1")	//删除p1标签class=app1的所有元素
```

### CSS类

```javascript
$("#p1").addClass("btn btn-sm")	//可以添加一个或多个
$("#p1").remove("btn")	//删除class里的btn
$("#p1").toggleClass()	//添加/删除，循环
```

### CSS方法

```javascript
$("#p1").css("background-color")	//返回这个的值
$("#p1").css("background-color","yellow")	//设置这个值

$("p").css({"background-color":"yellow",
            "font-size":"200%"
           });	//设置多个值

```

## width()和height()方法

```javascript
$("#p1").width()	//返回
$("#p1").height()	//返回
$("#p1").width('200px')	//$("#div1").height(200)

$("#div1").outerheight()	//返回包含内边距和边框的
$("#div1").outerWidth()
```

## AJAX

```javascript
$("#div1").load(URL)	//获取并写入到当前元素
$.get(url,data,callback,datatype)
/*
     URL：发送请求的 URL字符串。
    data：可选的，发送给服务器的字符串或 key/value 键值对。
    callback：可选的，请求成功后执行的回调函数。
    dataType：可选的，从服务器返回的数据类型。默认：智能猜测（可以是xml, json, script, 或 html）。 
*/
$.post(url,data,callback,dataType)

$("button").click(function(){
    $.post("/try/ajax/demo_test_post.php",
    {
        name:"菜鸟教程",
        url:"http://www.runoob.com"
    },
    function(data,status){
        alert("数据: \n" + data + "\n状态: " + status);
    });
});

```

