# 一、Vue核心

# 模板语法

## 插值语法(用于解析标签体内容)

```html
{{name}}
```

里面可以写数据或者JavaScript代码

## 指令语法(用于解析标签)

Vue有很多指令，v-xxx的形式

### 单向绑定

```javascript
//可以给仍和标签里的属性做绑定通过vue改变属性值简写为：
v-bind: ==> :
<a v-bind:href="url"></a>
```

### 双向绑定

```javascript
//双向绑定可以标签改data里的数据，只能用于输入标签上，有value值
v-model:value='name'
//简写
v-model="name"
```

# data和el的两种写法

## el的两种写法

```javascript
const v = new Vue({
			el:"#root",  //el指定当前vue为哪个容器去服务
			data:{		//用于存储数据，供el指定的容器去使用
				name:"hello",
			}
		})
//或者
const v = new Vue({
			data:{		//用于存储数据，供el指定的容器去使用
				name:"hello",
			}
		})
v.$mount('#root')  	//更灵活$mount挂载
```

## data的两种写法

```javascript
new Vue({
			el:"#root",  //el指定当前vue为哪个容器去服务
			data:{		//用于存储数据，供el指定的容器去使用
				name:"hello",
			}
		})
//第二种，不能写箭头函数
new Vue({
			el:"#root",  //el指定当前vue为哪个容器去服务
			data:function(){
                return{
                    name:'hello'
                }
            }
		})
//等于
new Vue({
			el:"#root",  //el指定当前vue为哪个容器去服务
			data(){
                return{
                    name:'hello'
                }
            }
		})
```

# MVVM模型

M：模型(Model)=>数据（data）

V：视图(View)=>模板

VM：视图模型(View Model)=>Vue实例对象

# 数据代理(data)

## Object.defineProperty方法

```javascript
		let number = 19
		let person = {
			name: "张三",
			sex: "男",
			// age:19
		}
		Object.defineProperty(person, "age", {
			// value:19,
			// enumerable:true, //控制属性是否可以遍历，默认值false
			// writable:true, 	//控制属性是否可以被修改，默认值false
			// configurable:true //控制属性是否可以被删除，默认值false
			//当有人读取了person的age属性时，get函数（getter）就会被调用，返回值就设置为age的值
			get() {
				console.log('读取了age属性')
				return number
			},
			//当有人修改了person的age属性时，set函数（setter）就会被调用，且会收到修改的值
			set(v) {
				console.log('有人修改了age的值为',v)
				number = v
			}
		})
```

Vue数据代理

# 事件处理(methods)

## 点击事件

```javascript
v-on:click="clisk1" //当点击这个标签的时候调用Vue实例里面的clisk1函数
@click="click2"		//简写
new Vue(
	el:"#root",
    data:{
    	app:"iphon"
    },
    methods:{
        click1(event){	//返回的是标签对象
            alert('点到我了')
        }
    }
)
//传递自定义参数
@click="click2(666,$event)"		//括号里面的是要传递到Vue函数里面的，单独传递一个666会让原本的标签对象丢失，所以用$event占位
new Vue(
	el:"#root",
    data:{
    	app:"iphon"
    },
    methods:{
        click1(shuzi,event){	//返回的是标签对象
            alert('点到我了')
        }
    }
)
```

## 事件修饰符

```javascript
prevent:阻止默认事件
stop:阻止事件冒泡
once:事件只触发一次
capture:使用事件的捕获模式
self:只有event.target是当前操作的元素时才触发事件
passive:事件的默认行为立即执行，不用等待函数执行完成才执行默认事件
//能连着写.self.once
@click.prevent="click1"	//阻止默认事件（跳转页面）
@click.stop="click2"	//会出现两次alert弹窗，阻止冒泡只出现一次
<div @click="click2">
    <button @click.stop="click2">点我</button>
</div>
//只会触发一次，只能点击一次
@click.once="click2"
//事件捕获->冒泡，点击了就执行，不等待事件捕获
<div @click.capture="click2">
    <button @click="click2">点我</button>
</div>
//对象是当前标签时才触发
<div @click.self="click2">
    <button @click="click2">点我</button>
</div>

//滚动事件
<div @scroll="函数"> </div>	//scroll给滚动条添加的事件,wheel给鼠标滚轮添加事件

```

## 键盘事件

```html
<!--keyup按下然后放开时触发函数,keydown相反
特殊(系统修饰键)：ctrl\alt\shift\meat
	配合keyup：按下这个键再按其它键然后释放才被触发（组合键）ctrl.y=>ctrl+y
	配合keydown：正常触发
回车》enter
删除and退格》delete
退出》esc
空格》space
换行》tab
上》up
下》down
左》left
右》right
-->
<input type="text" placeholder="按下回车提示" @keyup.enter="demo">
```

# 计算属性

data里面的是属性里的

computed里面是计算属性

```javascript
new Vue({
        el:"root",
        data:{
            a:1,
            b:2
        },
        computed:{
            //只要有人读取了fullName时,get就会被调用，且返回值就作为fullName的值,html里调用直接插值语法{{fullName}}
            //get调用的时候：1，初次读取的时候    2依赖的数据发生改变的时候
            fullName:{
                get(){
                    return this.a+this.b
                },
                //set调用时:当fullName被调用时
                set(){}
            },
            //简写:不考虑修改时使用
            fullname:function (){
                return this.a+this.b
            }
        }
    })
```

# 监视属性

```javascript
const x = new Vue({
        el:"root",
        data:{
            a:true
        },
        watch:{
            	a:{
                    immediate:true,//初始化时就调用一下
                	//当a发生改变时调用，new是新值，old是旧值
               	 	handler(new,old){
                        console.log(new,old)
                    }   
                }
            }
        }
    })
//写法二
x.$watch('a',{
    handler(new,old){
           console.log(new,old)
    } 
})
```

## 深度监视

Vue里的watch默认监测少对象内部值的改变（单层）

配置deep:true可以监测对象内部值的改变（多层）

备注：

​	Vue自身可以检测到对象内部值的改变，单Vue提供的watch默认不可以

```javascript
//监视多级结构的某个属性变化
const x = new Vue({
        el:"root",
        data:{
            a:true,
            b:{
            	s:1,
                k=2
        	}
        },
        watch:{
            	'b.s':{
               	 	handler(new,old){
                        console.log(new,old)
                    }   
                }
            }
        }
    })
//监视多级结构里的所有属性的改变
const x = new Vue({
        el:"root",
        data:{
            a:true,
            b:{
                s:1
            }
        },
        watch:{
            b:{
                deep:true,	//深度监视
                handler(newshu,old){console.log(newshu,old)
                }
            }
        }
    })
```

## 监视属性简写

不能配置深度监视等配置项

```javascript
const x = new Vue({
        el:"root",
        data:{
            a:true,
            b:{
                s:1
            }
        },
        watch:{
            b(newshu,oldshu){console.log(newshu,oldshu)}
            }
    })

//
x.$watch('b',function(newshu,oldshu){console.log(newshu,oldshu)})
```

## computed和watch之间的区别

1.computed能完成的功能，watch都可以完成

2.watch能完成的功能computed不一定能完成，例：watch可以异步操作

# 绑定样式

## css

```html
字符串写法绑定样式
<div class="a" :class="func" @click="mycss"></div>
数组写法
<div class="a" :class="["a","b","c"]" @click="mycss"></div>
对象写法
<div class="a" :class="c" @click="mycss"></div>
<script type="text/javascript">
    const x = new Vue({
        el:"#root",
        data:{
            a:"云海",
            b:['b','c'],
            c:{
                b:false,
                c:false
            }
        },
        methods:{
            mycss(){
                this.b = "c"
            }
        }
    })
</script>
```

## style

```html
<div id="root" :style="b" @click="mycss">{{a}}</div>

</body>
<script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
<script type="text/javascript">
    const x = new Vue({
        el:"#root",
        data:{
            a:"云海",
            b:{
                //样式是两个单词组成的时候之间的-去掉，除了第一个单词其他的单词首字母大写
                fontSize:"40px",
            },
        },
        methods:{
            mycss(){
                this.b = "c"
            }
        }
    })
</script>

<div id="root" :style="[{color:red},{xxx:xxx}]" @click="mycss">{{a}}</div>
```

# 条件渲染

```html
v-show="true" <!--显示隐藏变化频率高-->
v-if = "1 === 1" <!--强力显示隐藏变化频率不高-->
v-else-if = "n==3"
<!--中间不能打断-->
    <div v-if="b">{{a}}</div>
    <div v-else-if="b">{{a}}</div>
    <div v-else-if="b">{{a}}</div>
    <div v-else>{{a}}</div>
```

# 列表渲染

## 基本列表

### 遍历数组

```html
<div id="root">
    <ul>
<!--        用到v-for就要设置唯一值:key，index是索引-->
        <li v-for="(b,index) in a" :key="b.id">{{b.id}}--{{b.name}}</li>
    </ul>
</div>


</body>
<script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
<script type="text/javascript">
    const x = new Vue({
        el:"#root",
        data:{
            a:[{id:1,name:'ajax'},{id:2,name:'atm'},{id:3,name:'data'}]
        },

    })
</script>
```

### 遍历对象

当作python里的遍历字典就好了，可以获取到两个值key，value	键，值

### 遍历字符串

类似列表，第一个值是字符，另一个是索引

### 遍历指定次数

```html
遍历5次1，2，3，4，5 ，index是索引
<li v-for="(b,index) in 5" :key="b.id">{{b}}--{{index}}</li>
```

## key的原理

### 虚拟DOM中key的作用

​	key是虚拟DOM对象的标识，当数据发生变化时Vue会根据【新数据】生成【新的虚拟DOM】，随后镜像新旧DOM的对比

### 对比规则

​	1、旧的虚拟DOM中找到新的虚拟DOM相同的key：

​			如果虚拟DOM中的内容没变，之久使用之前的真实DOM

​			如果虚拟DOM中的内容变了，则生成新的真实DOM，随后替换掉页面中之前的真实DOM

​	2、旧的虚拟DOM中未找到于新的虚拟DOM相同的key：

​			创建新的真实DOM，随后渲染到页面

# Vue检测数据的原理

```javascript
//data里的对象添加数据，不能在实例化对象和data身上加
Vue.set(vm.a,'sex','男')	//加到实例上key=sex ,value=男
this.$set(vm.a,'sex','男')

this.$delete(vm.a,'sex')//删除vm.a上的sex
//根据索引修改数组值
this.vm.a.splice(0,1,'逛街')
```

# 收集表单

### `<input type="text"/>`

​	收集到的就是用户输入的value值

### `<input type="radio"/>`

​	收集到的就是value值，但是要提前设置value值

### `<input type="checked"/>`

​	没有配置value值搜集到的就是checked（勾选or未勾选，是布尔值）

​	配置input的value属性值：

​		v-model的初始值是非数组，那么搜集到的就是checked

​		v-model的初始值是数组，那么搜集到的就是value组成的数组

v-model的修饰词

```javascript
v-model.number		//输入的值转为数字 配合type="number"使用
v-model.lazy		//失去焦点的一瞬间提交数据
v-model.trim		//去除前后的空格，中间的空格去不了
```

# 过滤器(filters)

time的值传递给getTime 可以多次{{time | getTime | postTime}}

```html
<div id="root">
    <h2>{{time | getTime}}</h2>
</div>


</body>
<script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
<script src="https://cdn.bootcdn.net/ajax/libs/dayjs/1.11.3/dayjs.min.js"></script>
<script type="text/javascript">
    const x = new Vue({
        el:"#root",
        data:{
            time:Date.now()
        },
        filters:{
            //局部过滤器
            getTime(value,str='YYYY年MM月DD日 HH:mm:ss') {
                return  dayjs(value).format(str)
            }
        }

    })
</script>
```

全局过滤器

```javascript
Vue.filter("getTime",function(value){})
```

# 内置指令

```javascript
v-bind	//单向绑定	:
v-model	//双向绑定
v-for	//遍历
v-on	//绑定事件	@	@blur失去焦点时触发
v-if
v-else-if
v-else
v-show	
v-text	//向标签替换text，不可以解析html语句
v-html	//向标签替换text，可以解析html语句
v-cloak	//无值，当Vue.js请求堵塞的时候（网速慢的时候），标签有v-colak当Vue介入v-cloak就被删除，[v-cloak]{}标签里含有v-cloak的所有标签，用来设置样式
v-once	//没有值，在第一次渲染的时候就变成静态的内容了
v-pre	//无值，vue不去解析的地方，用它来跳过不需要插值的地方，后面就不解析了
```

# 自定义指令(directives)

自定义的时候big用的时候v-big

element是真实DOM（标签）binding（绑定的信息）

## 简易写法

```javascript
new Vue = ({
    el:"#root",
    data:{},
    directives:{
        //big函数什么时候会被调用，1绑定成功的时候 2、指令所在的模板被重新解析时
        big(element,binding){
            
        }
    }
    
})
```

## 完整写法

指令名多个单词时用v-xxx-yy,自定义的时候写'xxx-yy',自定义的this都是windows

```javascript
new Vue = ({
    el:"#root",
    data:{},
    directives:{
        big:{
            //绑定的时候调用（一上来就用）
            bind(element,binding){},
            //指令所在元素被插入页面时调用
            inserted(element,binding){},
    		//指令所在模板被重新解析时调用
    		update(element,binding){}
        }
            
        }
})
```

## 全局指令

```javascript
Vue.directive("big",{
            //绑定的时候调用（一上来就用）
            bind(element,binding){},
            //指令所在元素被插入页面时调用
            inserted(element,binding){},
    		//指令所在模板被重新解析时调用
    		update(element,binding){}
        })
```

# 生命周期

生命周期：

​	又叫：生命周期回调函数、生命周期函数、生命周期钩子

​	是生命：Vue在关键时刻帮我们调用的一些特殊名称的函数

​	生命周期函数的名字不可更改，单函数的具体内容是我们根据需求编写的

​	生命周期函数中的this指向的是vm 或 组件实例对象

## 渲染结束调用 (moubted)

```javascript
const x = new Vue({
    el:"#root",
    data:{
        time:Date.now()
    },
    //挂载完毕时调用只调用一次
    mounted(){
        
    }

})
```

![image-20220713220020832](/img/image-20220713220020832.png)

## Vue的一生：

### ！是重要的函数

### 	将要创建	调用brforeCreate函数

### 	创建完毕	调用created函数

### 	挂载完毕！调用mounted函数

### 	将要更新	调用beforeUpdate函数

### 	更新完毕	调用uodated函数

### 	将要销毁！调用beforeDestroy函数

### 	销毁完毕	调用destroyed函数

# 二、组件化编程

## 模块与组件、模块化与组件化编程

### 模块

​	一个js文件就是一个模块

### 组件

​	用来实现局部（特定）功能效果的代码集合（html/css/js/img/...）

### 模块化

​	当应用中的js都以模块来编写，那么这个应用就是一个模块化应用

### 组件化

​	当应用中的功能都是多组件的方式来编写的，那么，这个应用就是一个组件化的应用

### 非单文件组件

​	一个文件中包含n个组件

#### 基本使用

组件名

单个单词：全小写

​					首字母大写

多个单词：my-school注册时要加引号

​					MySchool每个字母的首字母大写（脚手架里用）

尽可能必要把组件名定义了与html里预留的标签不一致

```html
<body>
<div id="root">
<!--    第三步编写组件标签-->
    <hello></hello>
    <schoo></schoo>
    <hr>
    <sutdent></sutdent>	//标签里可以写成自闭合区间
</div>


</body>
<script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
<script type="text/javascript">
    //创建school组件,他没有el配置项，因为最终都要被一个vm管理，有vm决定他服务于哪个容器
    //简写 
    //const s = {} Vue会自动补上extend
    //标准写法
    const school = Vue.extend({
        name:'yyds',	//vue调试工具里名字就改成了Yyds，name默认注册名
        template:`
          <div>
          <h2>学校名称：{{ name }}</h2>
          <h2>学校地址：{{ address }}</h2>
          <button @click="showName">点我显示学校名</button>
          </div>`,
        data(){
            return{
                name:"学校",
                address:"北京"
            }
        },
        methods:{
            showName(){
                alert(this.name)
            }
        }
    })
    const sutdent = Vue.extend({
        template:`
          <div>
          <h2>学生名称：{{ name }}</h2>
          <h2>学生年龄：{{ age }}</h2>
          </div>`,
        data(){
            return{
                name:"yh",
                age:18
            }
        }
    })
    const hello = Vue.extend({
        template:`<div><h2>你好！！！{{name}}</h2></div>`,
        data(){
            return{
                name:"tom"
            }
        }
    })
    //注册组件
    Vue.component('hello',hello)    //全局注册,要在实例容器之前
    const vm = new Vue({       //非全局注册
        el:"#root",
        components:{
            schoo:school,   //调用时需要改名字时用key:value完整写法
            sutdent         //调用时不需要改组件名直接用组件名
        }
    })
</script>
```

#### 组件的嵌套

```html
<body>
<div id="root">
<!--    第三步编写组件标签-->
</div>


</body>
<script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
<script type="text/javascript">
    Vue.config.productionTip = false
    
    //创建sutdent组件
    const sutdent = Vue.extend({
        template:`
          <div>
          <h2>学生名称：{{ name }}</h2>
          <h2>学生年龄：{{ age }}</h2>
          </div>`,
        data(){
            return{
                name:"yh",
                age:18
            }
        }
    })
    
    //创建school组件，把sutdent嵌套
    const school = Vue.extend({
        template:`
          <div>
            <h2>学校名称：{{ name }}</h2>
            <h2>学校地址：{{ address }}</h2>
            <sutdent></sutdent>
          </div>`,
        data(){
            return{
                name:"学校",
                address:"北京"
            }
        },
        components: {
            sutdent
        }
    })
    
    // 创建hello组件
    const hello = Vue.extend({
        template:`<h2>{{msg}}</h2>`,
        data(){
            return{
                msg:"简单"
            }
        }
    })
    
    //创建app组件，管理其它全部组件(一人之下，万人之上)
    const app =Vue.extend({
        components:{
            school,
            hello
        },
        template:`<div>
        <school></school>
        <hello></hello>
        </div>`
    })
    
    //创建vm管理app组件
    new Vue({
        el:"#root",
        template:`<app></app>`,
        components:{
            app
        }
    })
</script>
```

#### VueComponent（vc）

VueComponent的实例对象，简称vc（也可称为：组件实例对象）。

​	school组件本质是一个名叫VueComponent的构造函数，且不是程序员定义的，是Vue.extend生成的。

​	我们只需要写<school></school>,Vue解析是就会帮我们创建school组件的实例对象，即Vue帮我们执行的：new VueComponent(options)

​	每次调用Vue.extend，返回的都是一个全新的VueComponent！

​	关于this指向

​		组件配置中：

​			data函数。methods中的hans、watch中的函数、comouted中的函数，他们的this均是{VueComponent}

​		new Vue(options)配置中：

​			data函数、methods中的函数、watch中的函数，他们的this均是{Vue实例对象}

 Vue和VueComponent的关系

```
VueComponent原型的隐式指向了Vue的原型，让vc可以访问到vue原型上的属性和方法
VueComponent.prototype.__proto===Vue.prototype
```



### 单文件组件（Vue常用）（xxx.vue）

​	一个文件中只包含1个组件

School.vue

```
<template>
<!--  组件的结构-->
  <div id="root" class="demo">
    <h2>姓名：{{name}}</h2>
    <h2>年龄：{{age}}</h2>
    <button @click="showName"></button>
  </div>
</template>

<script>
  // //组件的交互相关的代码\1
  // const School = Vue.extend({
  //   data(){
  //     return{
  //       name:"迪迦",
  //       age:18
  //     }
  //   },
  //   methods:{
  //     showName(){
  //       alert(this.name)
  //     }
  //   }
  // })
  // //默认暴露
  // export default School
  //2!
  export default {
    name:'School',
    data(){
      return{
        name:'tom',
        age:18
      }
    },
    methods:{
      showName(){
        alert(this.name)
      }
    }
  }
</script>

<style>
  /*组件样式*/
  .demo{
    background-color: red;
  }
</style>
```

#### 运行版本中没有模板编辑器mian.js里不能用模板函数

### ref属性

​	用来给元素或子组件注册引用信息（id的替代者）

​	应用在html标签上获取的是真实的DOM元素，应用在组件标签上是组件实例对象（VC）

​	使用方法：

​		打标识：<h1 ref="xx"></h1>或<school ref="xx"></school>

​		获取：this.$refs.xx

### 配置项props

让组件接收外部传过来的数据

​	传递数据：<School name="tom" :age="18"/>

​	接收数据

```javascript
<script>
export default {
  name: "School-one",
  data() {
    return {
      lista:false
    }
  },
  methods: {
    showName() {
      if (this.lista===false){
        this.lista=true
      }else {
        this.lista=false
      }
    }
  },
  //传入的值尽量不修改,如果需要修改复制一份到data里从data调用修改
  // props: ['name','shutdows','age'], //简单声明接收，不限制接收类型

  // props: {
  //   name:String,
  //   shutdows:String,
  //   age:Number
  // },    //接收进行数据类型限制
  // 接收的同时对数据进行类型限制+默认值设置+必要性限制
  props: {
    name: {
      type: String,
      required:true,  //name是必须要传的
    },
    shutdows:{
      type:String,
      required: true
    },
    age:{
      type:Number,
      default:99    //默认值
    }
  },
}
</script>
```

### 配置项mixin

​	功能：可以把多个组件共用的配置提取成一个混入对象

​	使用方式

​		创建一个js文件和mian平级

```javascript
//mixin.js
//主动暴露export default {} 引用不要花括号
//分别暴露引用需要花括号
export const mixin = {
    methods: {
        showName() {
            alert(this.name+'你吗死了')
        }
    },
}
```

```javascript
//School.vue
//引用混合
import {mixin} from "@/mixin";

export default {
  name: "School-one",
  data() {
    return {
      name:'tom',
      lista:true
    }
  },
  //局部混合
  mixins: [mixin],

}
```

```javascript
//main.js
import { createApp } from 'vue'
import App from './App.vue'
// import {mixin} from "@/mixin";

createApp(App).mount('#app')    //确定容器前.mixin(mixin)全局混合
```

### 插件

​	功能：用于增强Vue

​	本质：包含install方法的一个对象，install的第一个参数是value，第二个以后的参数是产检使用者传递的数据。

​	定义插件：

​		对象.install = function(Vue,options){

​			//添加全局过滤器

​			Vue.filter()

​			//添加全局指令

​			Vue.directive()

​			//添加全局混入

​			Vue.mixin()

​			//添加实例方法

​			Vue.peototype.$myEnd = function(){}

​		}

​	使用插件：Vue.use()

### scoped样式

防止样式命名相同，使样式局部生效

```html
<style scoped></style>
```

![image-20220716141833486](/img/image-20220716141833486.png)

## 总结TodoList案例

### 1、组件化编码流程：

​		（1）、拆分静态组件：组件要按照更能点分析，命名不要与HTML元素冲突

​		（2）、实现动态组件：考虑好数据存放位置，数据的一个组件在用，还是一些组件在用：

​				1）、一个组件在用：放在自身即可

​				1）、一些组件在用：防在他们共同的父组件上（状态提升）

​		（3）、实现交互：从绑定事件开始

### 2、props适用于

​	（1）、父组件与子组件通信

​	（2）、子组件与父组件通信（父组件要给子组件传递一个函数）

### 3、使用v-model时切记：

​	v-model绑定的值不能是props传递过来的值，因为props是不可以修改的

### 4、props传递过来的若是对象类型的值，修改对象中的的属性时Vue不会报错，单不推荐这样做

## webStorage

```
1.存储内容大小一般支持5MB左右（不同浏览器可能不一样）
2.浏览器端通过Windows.sessionStorage和Windows.localStorage属性来实现本地存储机制
3.相关API
	1.xxxxxxStorage.setItem('key','value')
		该方法接收一个键和值作为参数，会把键值添加到存储中，如果键名存在，则更新器对应的值
	2.xxxxxxStorage.getItem('key')
		返回对应键名的值
	3.xxxxxxStorage.removeItem('key')
		删除
	4.xxxxxxStorage.clear()
		全部清除
注意：
	SessionStorage存储的内容会随着浏览器窗口关闭而消失
	LocalStorage需要手动清除才会消失
	如果getItem获取不到为即为null
	JSON.parse(null)结果依然是null
```

## 自定义事件

组件间的一种通讯方式，适用于：子组件===》父组件

```
1.绑定自定义事件
	在组件标签上<School @nihao="function"/> / <School @nihao.once="function"/>
	或者设置ref=>this.$ref.School.$on('nihao',function) / this.$ref.School.$once('nihao',function)只触发一次
2.组件里触发
	函数里	this.$emit('nihao',data1,data2)
	解绑一个自定义事件	this.$off('nihao')
	解绑多个	this.$off(['nihao','niya'])
	暴力解绑（全部解绑）	this.$off()
3.function里接收数据,第一个为data，后面的在params里（也可以正常写）
	xxx(data,...params){}
4.this.$destroy()//销毁后所有的自定义事件全部无效了
5.组件上也可以绑定原生DOM事件，但是需要native修饰符<school @click.native/>
6.通过this.$refs.xxx.$on('nihao',function)绑定自定义事件时，回调（function）要么配置在methods中，要么用箭头函数，否者this指向的时调用这个自定义事件的组件
```

## 全局事件总线（GlobalEventBus）

1.一种组件间通讯的方式，适用于任意组件间通讯

2.安装全局事件总线：

```javascript
new Vue({
    ....
    beforeCreate(){
    Vue.prototype.$bus = this
}
    ....
})
```

3.使用事件总线：

​	1.接收数据：A组件想接收数据，则在A组件中给$bus绑定事件，事件回调留在A组件自身

```javascript
methods(){
    demo(data){......}
}
    ......
mounted(){
        this.$bus.$on('xxx',this.name)
    }
```

​	2.提供数据：this.$bus.$emit('xxx',data)

4.最好在beforeDestroy钩子中，用$off去解绑当前组件所用到的事件

```javascript
beforeDestroy() {
    this.$bus.$off('schoolName')
  }
```

## 消息订阅与发布（pubsub）

1.一种组件间通的方式，适用于任意组件间通信

2.使用步骤：

​	1.安装pubsub：	npm i pubsub-js

​	2.导入：import pubsub from 'pubsub-js'

​	3.接收数据：A组件想接收数据，则在A组件订阅消息，订阅的回调留在A组件自身

```
export default {
  name: "school-a",
  data() {
    return {
      name: "changz",
      address:"北京"
    }
  },
  methods: {
    datas(msgName,data) {	//msgName是消息名称，可以用下划线占位不用_
      alert(1)
    }
  },
  mounted() {
    this.pubid = pubsub.subscribe('hello',this.datas) //订阅消息，this.datas可以写成箭头函数不用在methods里写
  },
  beforeDestroy() {
    pubsub.unsubscribe(this.pubid)
  }
}
```

4.提供数据：

```
export default {
  name: "student-a",
  data(){
    return{
      name:'Tom',
      sex:'男'
    }
  },
  mounted() {
    pubsub.publish('hello',this.name)	//提供数据
  }
}
```

5.最好在veforeDestroy钩子中取消订阅

## 当data里的数据为布尔值时判断存不存在

```
export default {
  name: "student-a",
  data(){
    return{
      name:'Tom',
      sex:'男'
    }
  },
  mounted() {
    pubsub.publish('hello',666)
  }
}
用hasOwnProperty判断data身上有没有一个属性
data.hasOwnProperty('name')
```

## nextTick

1.语法：this.$nextTick(function)

2.作用：在下次DOM更新结束后执行去指定的回调

3.当改变数据后裔，要基于更新后的新DOM经行某些操作时，要在nextTick所指定的回调函数中执行

# Vue封装的过度与动画

1.作用：在插入、更新或移除DOM元素时，在合适的时候给元素添加样式名

![image-20220717165740380](/img/image-20220717165740380.png)

3.写法：

​	![image-20220717165959667](/img/image-20220717165959667.png)

# Vue脚手架配置代理

![image-20220717181025019](/img/image-20220717181025019.png)

![image-20220717181136491](/img/image-20220717181136491.png)

# Ajax请求

## axios(推荐)

安装axios：`npm i axios`

```html
<template>
  <div>
    <div v-for="i in todo" :key="i.id">
        <div>{{ i.id }}</div>
        <div>{{ i.name }}</div>
        <div>{{ i.age }}</div>
      <hr>
    </div>
    <button @click="getData">获取学生信息</button>
  </div>0
</template>

<script>
import axios from 'axios'
export default {
  name: "txte-a",
  data() {
    return {todo:[{id:'001',name:'tom',age:18}]}
  },
  methods: {
    getData() {
      axios.get('http://127.0.0.1:4523/m1/1074324-0-default/server').then(data=>{
        this.todo.unshift(data.data)
      }).catch(error=>alert("请求错误"+error.message))
    }
  },
}
</script>
```

## vue-resource

安装vue-resource：`npm i vue-resource`

main.js

```javascript
import Vue from 'vue'
import App from './App.vue'
import vueResource from 'vue-resource'	//导入库

Vue.config.productionTip = false
Vue.use(vueResource)	//封装到vc
new Vue({
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this
  }
}).$mount('#app')
```

```html
<template>
  <div>
    <div v-for="i in todo" :key="i.id">
        <div>{{ i.id }}</div>
        <div>{{ i.name }}</div>
        <div>{{ i.age }}</div>
      <hr>
    </div>
    <button @click="getData">获取学生信息</button>
  </div>
</template>

<script>
export default {
  name: "txte-a",
  data() {
    return {todo:[{id:'001',name:'tom',age:18}]}
  },
  methods: {
    getData() {
      this.$http.get('http://127.0.0.1:4523/m1/1074324-0-default/server').then(data=>{
        this.todo.unshift(data.data)
      }).catch(error=>alert("请求错误"+error.message))
    }
  },

}
</script>
```

# 插槽

1.作用：让父组件可以向子组件指定位置插入html结构，也是一种组件间通信的方式，适用于父组件==》子组件

2.分类：默认插槽，具名插槽，作用域插槽

3.使用方式

默认插槽

```html
父组件：
<School>
    <div>
        html结构
    </div>
</School>
子组件：
<template>
	<div>
        <solt>
            html结构
        </solt>
    </div>
</template>
```

具名插槽

```html
父组件：
	<school>
		<template slot='center'>
        	<div>
                html结构
            </div>
        </template>
        
        <template v-solt:footer>
        	<div>
                html结构
            </div>
        </template>
	</school>
子组件：
	<template>
		<div>
        	<solt name="center">
            	html结构
        	</solt>
            
            <solt name="footer">
            	html结构
        	</solt>
    	</div>
	</template>
```

作用域插槽

理解：数据在组件自身，但根据数据生成的结构需要组件的使用者开决定。（gemas数据在app组件中，但使用数据所遍历出来的结构由App组件决定）

```html
父组件：
<school>
    <template scope="sutdentData">
        <ul>
            <li v-for="i in sutdentData.games">
                {{i}}
            </li>
        </ul>
    </template>
</school>

<school>
    <template slot-scope="sutdentData">
        <h4 v-for="i in sutdentData.games">
            {{i}}
        </h4>
    </template>
</school>
子组件:
<template>
    <div>
        <slot :games="games"></slot>
    </div>
</template>
<script>
    export default{
        name:"school",
        prpos:['title'],
        data(){
            return{
                games:['a','b','c']
            }
        }
    }
</script>
```

# Vuex

## vuex是什么

1.概念：专门在Vue中实现集中式状态（数据）管理的一个Vue插件，对Vue应用中多个组件的共享状态进行集中式管理（读/写），也就是一种组件间通信的方式，且适用于任意组件间的通信。

## 什么时候使用vuex

1.多个组件依赖于同一状态

2.来自不同组件的行为需要变更同一状态

## 搭建Vuex环境

1新建一个文件夹Vuex（或store），在文件夹里新建一个index.js（官方命名）`/src/Vuex/index.js`

```javascript
//该文件用于创建Vuex最核心的store
//引入Vue
import Vue from "vue";
//应用Vuex插件
Vue.use(Vuex)
//引入Vuex
import Vuex from 'vuex'
//准备actions用于响应组件中的动作
const actions = {
    //context是上下文，value是传递的数据
    jia(context,value){
        context.commit('JIA',value)
    }
}
//准备mutations用于操作数据（state）
const mutations = {
    //state是下面的数据，value是传递过来的数据
    JIA(state,value){
        state.todo.unshift(value)
    }
}
//准备state用于存储数据,初始化数据
const state = {todo:[{id:'13',name:'李华',age:89}]}
//创建store并暴露store
export default new Vuex.Store({
    actions,
    mutations,
    state
})
```

2.在main.js中创建vm时传入store配置项`/src/main.js`

```javascript
import store from "./vuex";
new Vue({
  store,
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this
  }
}).$mount('#app')
```

## 基本使用

```javascript
//Vue组件里，可直接调用，操作（网络请求AJAX）交给actions，改写交给mutations
this.$store.dispatch('jia',data.data)	//dispatch调用actions
this.$store.commit('JIA',data.data)		//commit调用mutations
```

## getters（非必要）

当state中的数据需要加工后再使用时，用getters加工（类似于计算属性）要有返回值

`/src/Vuex/index.js`

```javascript
//准备getters用于将state中的数据进行加工
const getters = {
    bigSum(state){
        return state.todo[0].id+'1'
    }
}

export default new Vuex.Store({
    actions,
    mutations,
    state,
    getters
})
```

### 使用

Vue组件里

```html
<div>{{$store.getters.bigSum}}</div>
```

## mapState和mapGetters

...是把获得的变成对象铺开

```javascript
import {mapState,mapGetters} from 'vuex'
export default {
  name: "txte-a",
  data() {
    return {}
  },
  computed:{
    //借助mapState从state里读取数据为计算属性
    // 对象写法
    ...mapState({id:'id',name:'name',age:'age'}),
    //数组写法(前提是你想生成的计数属性名称和state里数据的名称一致)
    ...mapState(['id','name','age']),
    //借助mappSetters从getters里读取数据为计算属性
    ...mapGetters({bigSum:'bigSum'}),
    ...mapGetters(['bigSum'])
  },
  methods: {
    getData() {
      this.$http.get('http://192.168.2.110:4523/m1/1074324-0-default/server').then(data=>{
        console.log(data)
        this.$store.dispatch('jia',data.data)
      }).catch(error=>alert("请求错误"+error.message))
    }
  },
}
```

## mapMutations和mapActions

```javascript
import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
export default {
  name: "txte-a",
  data() {
    return {}
  },
  computed:{
    //借助mapState从state里读取数据为计算属性
    // 对象写法
    ...mapState({id:'id',name:'name',age:'age'}),
    //数组写法(前提是你想生成的计数属性名称和state里数据的名称一致)
    ...mapState(['id','name','age']),
    //借助mappSetters从getters里读取数据为计算属性
    ...mapGetters({bigSum:'bigSum'}),
    ...mapGetters(['bigSum'])
  },
  methods: {
    // this.$store.commit('jia')
    //借助mapMutations生成对应的方法，方法中会调用commit去联系mutations传参是要在后面加括号
    ...mapMutations({JIA:'JIA'}),  //对象写法
    ...mapMutations(['JIA']),  //数组写法
    
    // this.$store.dispatch('jia')
    //借助mapActions生成对应的方法，方法中会调用dispatch去联系actions传参是要在后面加括号
    ...mapActions({jia:'jia'}),  //对象写法
    ...mapActions(['jia'])  //数组写法
  },
}
```

### 调用

```html
<div @click="JIA(data)"></div>
<div @click="jia(data)"></div>
```

## Vuex模块化+命名空间

### `index.js`

```javascript
import Vue from "vue";
Vue.use(Vuex)

import Vuex from 'vuex'
import axios from "axios";

const getList = {
    namespaced:true,    //开启命名空间
    actions:{
        jia(context){
            axios.get('http://192.168.2.110:4523/m1/1074324-0-default/server').then(data=>{
                console.log(data)
                context.commit('JIA',data.data)
            }).catch(error=>alert("请求错误"+error.message))
        }},
    mutations:{
        JIA(state,value){
            console.log(value)
            state.todo.unshift(value)
        }},
    getters:{
        bigSum(state){
            return state.todo[0].id+'1'
        }},
    state:{todo:[{id:'13',name:'李华',age:89}]}
}

export default new Vuex.Store({
    modules:{
        getList
    }
})
```

### Vue组件里

```html
<template>
  <div>
    <div v-for="i in $store.state.getList.todo" :key="i.id">
        <div>{{$store.getters.bigSum}}</div>
        <div>{{ i.id }}</div>
        <div>{{ i.name }}</div>
        <div>{{ i.age }}</div>
      <hr>
    </div>
    <button @click="jia">获取学生信息</button>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: "txte-a",

  methods: {
      //手写
    // jai(){
    //   this.$store.commit('getList/JIA')
    // },
      //模块生成
    ...mapActions('getList',['jia']),  //要在前面加上一个参数模块的名字
  },
}
</script>

```

### 手写的天坑

```javascript
this.$store.getters['getList/bigSum']
```

### 可以把每个模块封装为js文件，记得暴露

![image-20220719202816117](/img/image-20220719202816117.png)

# 路由（router）

路由就是一组Key-Value的对应关系

多个路由，需要经过路由器管理

## 1.基本使用

​	1.安装vue-router，命令 `npm i vue-router`

​	1.应用插件 `Vue.use(VueRouter)`

![image-20220720155200176](/img/image-20220720155200176.png)

![image-20220720155217611](/img/image-20220720155217611.png)



```html
<!--      实现路由切换 active-class有人点击时加入样式-->
      <router-link to="" active-class=""></router-link>
<!--      指定组件的呈现位置-->
      <router-view></router-view>
```

路由组件一般存放在`pages`文件夹，一般组件通常存放在`components`文件夹

通过切换，‘隐藏’了的路由组件，默认是被销毁掉的，需要的时候再去挂载

给个组件都有自己的`$route`属性，里面存储着自己的路由信息

整个应用只有一个router，可以通过组件的`$router`属性获取到

## 2.嵌套（多级）路由

`/router/index.js`

```javascript
export default new VueRouter({
    routes:[
        {
            path:'/txte',
            component:txte,
            //配置子路由，子路由前面不加/
            children:[{
                path:'txte',
                component:txte
            }]
        },
    ]
})
```

Vue组件里

```html
路径要带上完整路径
<router-link to="/txte/txte" active-class=""></router-link>
```

## 3.路由的query参数

```html
<router-link to="/txte?id=12" active-class=""></router-link>
<!--或者-->
<router-link :to="{
                  path:'/txte',
                  query:{
                  id=12
                  }
                  }" active-class="">
</router-link>
```

组件里获取

```javascript
$query.id
```

## 4.命名路由

简化路由的跳转

设置名称

```javascript
export default new VueRouter({
    routes:[
        {
            name:'index'
            path:'/txte',
            component:txte,
            children:[{
            	name:'txte'
                path:'txte',
                component:txte
            }]
        },
    ]
})
```

使用名称

```html
<router-link :to="{
                  name:'index'
                  query:{
                  id=12
                  }
                  }" active-class="">
</router-link>
```

## 4.路由的params参数

vue组件里

```html
<router-link to="/txte/12" active-class=""></router-link>
```

路由

```javascript
export default new VueRouter({
    routes:[
        {
            path:'/txte/:id',
            component:txte,
        },
    ]
})
```

获取

```javascript
$router.params.id
```

注意：路由携带params参数时，若使用to的对象写法，则不能使用path，必须使用name配置

## 5.路由的props

让路由组件跟方便收到值

```javascript
export default new VueRouter({
    routes:[
        {
            path:'/txte/:id',
            component:txte,
            //写法一，值为对象，改对象中的所有key-value都会一props的形式传递给txte组件
            //props:{a:1,b:'hello'}	//传递死数据
            
            //写法二，值为布尔值，布尔值为真，就会把该路由组件收到的所有params产生，一peops的形式传给txte组件
            //props:true
            
            //写法三，值为函数
            props($route){
                return{
                    id:$route.query.id,
                    title:$route.query.title
                }
            }
        },
    ]
})
```

接收组件

```javascript
export default {
    name:'txte',
    props:['id','title']
}
```

## 6.router-link的replace模式（默认push）

replace模式浏览器不能前进后退（替换当前浏览记录）

```html
<router-link replace to="/text" active-class=""></router-link>
```

## 7.编程式路由导航

作用：不借助`router-link`实现跳转，让跳转更灵活

```javascript
export default {
  name: "txte-a",
  methods: {
    //push方法跳转
    push() {
      this.$storer.push({
        name:'txte',
        params:{
          id:12
        }
      })
    },
    //replate方法跳转
    replate(){
      this.$storer.replate({
        name:'txte',
        params:{
          id:12
        }
      })
    },
    //前进
    forshow(){
      this.$storer.forshow()
    },
    //后退
    back(){
      this.$storer.back()
    },
    //前进3步为负数时后退
    go(){
      this.$storer.go(3)
    }
  },
}
```

## 8.缓存路由组件

keep-alive让组件不显示的时候不被销毁，不写include默认全部不销毁，写了include表示中有txte-a这个组件不销毁，txte-a是组件名

```html
:include="['txte','hello']"	不销毁多个
<keep-alive include="txte-a">
    <router-link to="/text" active-class=""></router-link>
</keep-alive>
```

## 9.activated和deactivated（生命周期钩子）

作用：路由组件独有的两个钩子，用于捕获路由组件的激活状态

`activated`路由组件被激活时触发

`deactivated`路由组件失活时触发

## 10.路由守卫（权限）

作用：对路由器进行权限控制

分类：全局守卫、独享守卫、组件内守卫

### 1.全局守卫

```javascript
import VueRouter from "vue-router";
import txte from "@/components/txte";
//创建并暴露一个路由器
const router = new VueRouter({
    routes:[
        {
            path:'/txte',
            component:txte,
            //配置是否需要校验权限,meta里面是给程序员存储页面信息的
            meta:{isAuth:true,title:'主页'},
            children:[{
                path:'txte',
                component:txte
            }]
        },
    ]
})

//全局前置路由守卫(每次路由切换前调用，初始化也执行) to是去哪  from来自哪 next是放行
router.beforeEach((to, from, next)=>{
    if (to.meta.isAuth){
        next()
    }else{
        next()
    }
})
//全局后置路由守卫
router.afterEach((to,from)=>{
    document.title = to.meta.title || '云海'
})

export default router
```

2.独享守卫

```javascript
import VueRouter from "vue-router";
import txte from "@/components/txte";
const router = new VueRouter({
    routes:[
        {
            path:'/txte',
            component:txte,
            //配置是否需要校验权限,meta里面是给程序员存储页面信息的
            meta:{isAuth:true,title:'主页'},
            //独享守卫(只有前)
            beforeEnter:(to, from, next)=>{next()},
            children:[{
                path:'txte',
                component:txte
            }]
        },
    ]
})
export default router
```

3.组件内路由守卫

`txte.vue`

```javascript
export default {
  name: "txte-a",
  //通过路由规则，进入组件时被调用
  beforeRouteEnter(to,from,next){
    next()
  },
  //通过路由规则，离开组件时被调用
  beforeRouteLeave(to,from,next){
    next()
  }
}
```

## 11.路由器工作的两种模式

对于一个url来说，什么是hash值？----#及后面的内容就是hash值

hash值不会包含在HTTP请求中，即：hash值不会带给后端

hash模式：

​	地址中永远带着#号，不美观

​	若以后将地址通过第三方手机app分享，若app校验严格，则地址会被标记不合法

​	兼容性较好

history模式：

​	地址感觉，美观

​	兼容性与hash对比略差

​	应用部署上线时需要后端人员支持，解决刷新页面服务端404的问题

```javascript
import VueRouter from "vue-router";
import txte from "@/components/txte";
const router = new VueRouter({
    //默认是hash但是后面有/#/
    mode:"history",
    routes:[
        {
            path:'/txte',
            component:txte,
            //配置是否需要校验权限,meta里面是给程序员存储页面信息的
            meta:{isAuth:true,title:'主页'},
            //独享守卫(只有前置)
            beforeEnter:(to, from, next)=>{next()},
            children:[{
                path:'txte',
                component:txte
            }]
        },
    ]
})
export default router
```

# Vue UI组件库

## 移动端常用UI组件库

Vant、Cube UI、Mint UI



## PC端常用组件库

Element UI

IView UI



# Vue3

## 1.vite创建工程

[vite中文网](https://vitejs.cn/guide/#scaffolding-your-first-vite-project)

## 2.常用Composition API（组合API）

### 拉开序幕的setup

​    理解：Vue3.0中的一个新的配置项，值为一个函数
​    setup是所有Composition API（组合API）“表演的舞台”
​    组件中用到的：数据、方法等，均要配置在setup中
​    setup函数的两种返回值：
​        若返回一个对象，则对象中的属性、方法，在模板中均可直接使用！
​        若返回一个渲染函数：则可以自定义渲染内容
​    注意：
​        尽量不要与Vue2.x配置混用
​            Vue2配置（data、methos、computed...）中可以访问到setup中的属性、方法
​            但是setup不能访问到Vue2配置（data、methos、computed...）
​            如果有重名，setup函数优先
​        setup函数不能是一个asynchans，因为返回值不再是return的对象，而是promise，模板看不到return对象中的属性(后期也可以返回一个Promise实力，但需要Suspense和异步组件的配合)

### ref函数（不是Vue2里的）

​    作用：定义一个响应式的数据
​    语法：const xxx = ref(initValue)
​        创建一个包含响应式数据的引用对象（reference对象,简称ref对象）
​        JS中操作数据：xxx.value
​        模板中读取数据：不需要.value，直接模板语法即可
​    备注
​        接收的数据可以是：基本类型、也可以是对象类型
​        基本类型的数据：响应式依然是依靠`Object.defineProperty()`的get与set完成的
​        对象类型的数据：内部使用了Vue3中的一个新函数--reactive函数

### reactive函数

​    作用：定义一个对象类型的响应式数据（基本类型不能用，要用ref函数，也可以把基本类型封装为对象使用）
​    语法：const 代理对象 = reactive（源对象） 接收一个对象（或数组），返回一个代理对象（proxy的实例对象，简称proxy对象）
​    reactive定义的响应式数据是“深层次的”
​    内部基于ES6的Proxy事项，通过代理对象操作源对象内部数据进行操作



### Vue3中的响应式原理

####     Vue2的响应式

​        实现原理：
​            对象类型：通过`Object.defineProperty()`对属性的读取、修改进行拦截（数据劫持）
​            数组类型：通过重写更新数组的一系列方法来实现拦截（对数组的变更方式进行了包裹）
​        存在的问题：
​            新增属性、删除属性，界面不更新（vue2没有检测到）
​            直接通过索引修改数组，界面不更新（vue2没有检测到）

####     Vue3的响应式

​        实现原理：
​            通过Proxy（代理）：拦截对象中任意属性的变化，包括：属性值的读写、属性的添加、删除等
​            通过Reflect（反射）：对源对象的属性进行操作

```javascript
new Proxy(data,{
  //拦截读取属性值 target是对象 prop是对象里被用的名称（key）value是修改后的值
  get(target, prop) {
    return Reflect.get(target,prop)
  },
  set(target,prop,value) {
    return Reflect.set(target,prop,value)
  },
  deleteProperty(target,prop) {
    return Reflect.deleteProperty(target,prop)
  }
})
```

### reactive与ref对比

从定义数据角度对比：
    ref用来定义：基本类型数据
    reactive用来定义：对象（或数组）类型数据
    备注：ref也可以用来定义对象（或数组）类型数据，他会内部通过`reactive`转为代理对象
从原理角度
    ref通过`Object.defineProperty()`的`get`和`set`来实现响应式（数据劫持）
    reactive通过使用Proxy来实现响应式（数据劫持），并通过Reflect操作源对象内部的数据
从使用角度：
    ref定义的数据：操作数据需要.value，读取时不用`.value`
    reactive定义的数据：操作和读取数据时均不要`.value`

### setup的两个注意点
setup执行时机
    在`beforeCreate`执行前执行
setup的参数
    props：值为对象，包含：组件外部传递过来，且组件内部声明接收了的属性
    context：上下文对象
        attrs：值为对象，半酣：组件从外部传递过来，但没有在props配置中声明的属性，相当于`this.$attrs`
        alots：收到的插槽内容，相当于`this.$slots`
        emit：分发自定义事件的函数，相当于`this.$emit`

### 计数属性和监视

#### computed函数

与vue2中computed配置功能一致

```javascript
   //计算属性简写
    let full = computed(()=>{
      return a.age+a.name
    })
    //计算属性完整写法
    let full = computed({
      get(){
        return a.age+a.name
      },
      set(value){
        a.name = value
      }
    })
```



#### watch函数

与vue2中配置功能一致

两个坑：

​	监视reactive定义的响应式数据时：oldValue无法正确获取、强制开启了深度监视（deep配置项失效）

​	监视reactive定义的响应式数据中某个属性时：deep配置有效

```javascript
    //情况一：监视ref定义的一个响应式数据
    watch(a,(newValue,oldValue)=>{
      console.log(newValue+'<='+oldValue)
    },{immediate:true,deep:true})

    // //情况二：监视ref定义的多个响应式数据
    watch([a,b],(newValue,oldValue)=>{
      console.log(newValue+'<='+oldValue)
    },{immediate:true,deep:true})

    //情况三：监视reactive所定义的一个响应式数据的全部属性，无法正确获取oldValue(天坑勿用)
    // 强制开启了深度监视（关不掉）
    watch(a,(newValue,oldValue)=>{
      console.log(newValue+'<='+oldValue)
    },{immediate:true,deep:false})

    //情况四：监视reactive定义的一个响应式数据中的某个属性
    watch(()=>a.li.lk.sx,(newValue,oldValue)=>{
      console.log(newValue+'<='+oldValue)
    },{immediate:true,deep:false})

    //情况五：监视reactive定义的一个响应式数据中的一些属性
    watch([()=>a.li.lk.sx,()=>a.li.lk.sy],(newValue,oldValue)=>{
      console.log(newValue+'<='+oldValue)
    },{immediate:true,deep:false})

    //特殊情况
    watch(()=>a.li.lk,(newValue,oldValue)=>{
      console.log(newValue+'<='+oldValue)
    },{deep:true})//这里由于监视的时reactive定义的对象中的属性使用deep属性有效
```

#### watchEffect函数

watch：既要指明监视属性，也要指明监视回调

watchEffect：不用指明监视哪个属性，监视的回调中用到哪个属性就监视哪个属性

watchEffect与computed相似：

​	但computed注重技术按出来的值（回调函数的返回值），所以必须要写返回值

​	而watchEffect更注重过程（回调函数的函数体），所以不用写返回值

```javascript
watchEffect(()=>{
      const xz = a.age
    })
```

### Vue3生命周期

![uTools_1658665750479](/img/uTools_1658665750479.png)

Vue3中可以继续使用Vue2中的生命周期钩子，但是有两个被改名字了：

- `beforeCreate`====>`beforeUnmount`
- `destroyed`====>`unmounted`

Vue3也提供了Composition API形式的生命周期钩子，与Vue2中的钩子对应关系如下：

- `berforeCreate`===>`setup()`
- `created`=========>`setup()`
- `beforeMount`=====>`onBeforeMount`
- `mounted`=========>`onMounted`
- `beforeUpdate`====>`onBeforeUpdate`
- `update`==========>`onUpdate`
- `beforeUnmount`===>`onBeforeUnmount`
- `unmounted`=========>`onUnmounted`

### 自定义hook函数

`取名/hooks/usexxx`

本质是一个函数，把setup函数中使用的Composition API进行封装。

类似于vue2中的mixin

自定义hook的优势：复用代码，让setup中的逻辑根清楚易懂

### toRef

作用：创建一个ref对象，其value值指向另一个对象中的某各属性

语法：`const name = toRef(person,'name)`person下的name

应用：要将响应式对象中的某个属性单独提供给外部使用时

拓展：`toRefs`与`toRef`功能一致，但可以创建多个ref对象

语法：`toRefs(person)`

## 3.其它Composition API 

### `shallowReactive`与`shallowRef`

`shallowReactive`：只出来对象最外层属性的响应式（浅响应式）

`shallowRef`：只处理基本数据类型的响应式，不进行对象响应式的处理

什么时候用

- 如果有一个对象数据，结构嵌套比较深，但变化时只是外层属性变化===》shallowReactive
- 如果y偶一个对象数据，后续功能不会修改改对象中的属性，为啥生成新的对象来代替===》shallowRef

### `readonly`与`shallowRandonly`

`readonly`：让一个响应式数据变为只读（深只读）

`shallowRandonly`：让一个响应式数据变为只读（浅只读）

应用场景：不希望数据被修改时

### toRaw与markRaw

`toRaw`：

- 作用将一个由`reactive`生成的响应式对象转为普通对象
- 使用场景：用于读取响应式对象对应的普通对象，对这个普通对象的所有操作，不会引起页面的更新

`markRaw`：

- 作用：标记一个对象，使其永远不会成为响应式对象。
- 使用场景：

1. 有些值不应该被设置为响应式的，例如复杂的第三方类库等
2. 当渲染具有不可变数据源的大列表时，跳过响应式转换可以体改性能

### customRef

- 作用：创建一个自定义ref，并对其依赖向跟踪和更新触发镜像显式控制

```javascript
    function myRef(value){
      let timer
      return customRef((track, trigger) => {
        return{
          get(){
            track()   //通知Vue追踪value的变化（提前和get申明，让他知道value有用
            return value
          },
          set(newValue){
            clearTimeout(timer)
            value = newValue
            setTimeout(()=>{
              console.log(value)
              trigger()   //通知Vue去重新解析模板
            },1000)
          }
        }
      })
    }
    // let as = ref(1)
    let as = myRef(1)
```

### provide与inject

- 作用：实现祖孙组件间通信
- 用法：父组件有一个`provide`选项来提供数据，后代组件有一个`inject`选项来开始使用这些数据

祖组件：

```javascript
  setup(){
    let car = reactive({
      name: '奔驰',
      price:"40w",
    })
    provide('car', car)
    return {...toRefs(car)}
  }
```

后代组件：

```javascript
  setup(){
    let car = inject('car')
    return {car}
  }
```

### 响应式数据的判断

- `isRef`:检查一个值是否为一个ref对象
- `isReactive`：检查一个对象是否是由`reactive`创建的响应式代理
- `isReadonly`：检查一个对象是否是有`readonly`创建的只读代理
- `isProxy`：检查一个对象是否是由`reactive`或者`readoonly`方法创建的代理

## 4.Composition API的优势

- Options API存在的问题

传统Options API中，新增或者修改一个需求，就需要分别在data，methods，computed里修改

- Composition API的优势

我们可以更优雅的组织我们的代码，函数。让相关功能的代码更加有序的组织在一起

## 5.新组件

### Fragment

- 在Vue2中：组件必须有一根跟标签
- 在Vue3中：组件可以没有根标签，内部会将多个标签包裹在一个Fragment虚拟元素中
- 好处：建设标签层级，减小内存占用

### Teleport

将我们的组件html结构移动到指定位置

```html
<template>
  <button @click="tans = true">点我弹窗</button>
  <teleport to="body">
    <div class="tansr" v-show="tans">
      <h2>弹窗</h2>
      <h2>内容</h2>
      <h2>内容</h2>
      <h2>内容</h2>
      <button @click="tans = false">关闭弹窗</button>
    </div>
  </teleport>
</template>
```

### Suspense

- 等待异步组件时渲染一些额外内容，让用户有更好的体验

- 使用步骤

  异步引入组件

  ```javascript
  // import HelloWorld from "@/components/HelloWorld";
  import {reactive,toRefs,provide,defineAsyncComponent} from "vue";
  const HelloWorld = defineAsyncComponent(()=>import('./components/HelloWorld.vue'))
  ```

  使用`Suspense`包裹组件，并配置好`default`与`fallback`

  ```html
      <Suspense>
  <!--      实际应该显示的-->
        <template v-slot:default>
          <HelloWorld/>
        </template>
  <!--      实际显示的没加载完成时显示-->
        <template v-slot:fallback>
          <h2>正在加载......</h2>
        </template>
      </Suspense>
  ```

## 6.其他

### 全局API的转移

- Vue2有许多全局API和配置

  例如：注册全局组件、注册全局指令等

  ```javascript
  //注册全局组件
  Vue.component('MyButton',{
      data:()=>({
          count:0
      }),
      template:`<div></div>`
  })
  //注册全局指令
  Vue.directive('focus',{
      inserted:el => el.focus()
  })
  ```

- Vue3中对这些API做出里调整

  将全局API，即Vue.xxx调整到应用实例（`app`)上

  | 2.x全局API                           | 3.x实例API（app)            |
  | ------------------------------------ | --------------------------- |
  | Vue.config                           | app.config.xxxx             |
  | Vue.config.productionTip（关闭提示） | 移除                        |
  | Vue.component                        | app.component               |
  | Vue.directive                        | app.directive               |
  | Vue.mixin                            | app.mixin                   |
  | Vue.use                              | app.use                     |
  | Vue.prototype                        | app.config.globalProperties |
  | Vue.extend                           | 移除                        |

### 其他改变

- data选项应该始终被声明为一个函数

- 过度类目的更改：

  - Vue2写法

    ```
    .v-enter,
    .v-leave-to{
    opacity:0
    }
    .v-leave,
    .v-enter-to{
    opacity:1
    }
    ```

  - Vue3写法

    ```
    .v-enter-from,
    .v-leave-to{
    opacity:0
    }
    .v-leave-from,
    .v-enter-to{
    opacity:1
    }
    ```

- 移除`keyCode`作为`v-on`的修饰符（按键编码），同时也不再支持`config.keyCodes`（按键的别名）

- 移除`v-on.native`修饰符（vue2的原生点击事件）

  - 父组件绑定事件

    ```html
    <school
            @click = 'function'
            @close = 'function'
            />
    ```

  - 子组件中声明自定义事件

    ```html
    <script>
        export default{
            //emits里写的才会被认为是自定义事件，不写就是原生click
            emits:['close']
        }
    </script>
    ```

- 移除过滤器（filter)

  用方法调用和计算属性去替换
