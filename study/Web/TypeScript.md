# TypeScript

## TS类型

- string

  字符串

  ```ts
  let a: string;
  let a = 'hello';
  ```

- boolean

  布尔值

  ```ts
  let a: boolean;
  let a = true;
  ```

- number

  数字

  ```ts
  let a: number;
  let a = 12;
  ```

- 字面量

  固定参数值

  ```ts
  // 这个时候a只能为字符串hello或者数字12
  let a: 'hello' | 12;
  ```

- any

  可以表示任意类型，不建议使用，因为any可以复制给任意变量造成错误，如果声明变量时不指定变量类型，则TS解析器会制动判断变量为any（隐式的any）

  ```tsx
  let a: any;
  ```

- Null

  只有一个值null

  ```tsx
  let a: null;
  let a = null;
  ```

- unknow

  表示未知类型的值,给变量u赋值时，与any一致，但是u不能赋值给其它变量

  ```tsx
  let u: unknow;
  ```

  通过一些条件unknow可以赋值给其它变量

  ```tsx
  let a: unknown;
  let b: number;
  
  if (typeof a == 'number') {
      b = a
  };
  //或者
  b = <number>a;
  ```

  类型断言,用来告诉解析器变量的实际类型

  ```tsx
  let a: unknown;
  let b: number;
  
  b = a as number;
  ```

- void

  一般用于指定函数返回值为空，可以不写或只写一个`return`或者`return null;`

  ```ts
  function n1(): void {
      return;
  };
  // 或
  function n2(): void {
      return null;
  };
  // 或
  function n3(): void {
      
  };
  ```

- never

  表示永远不会返回结果（一般用于报错，死循环也没有返回值，函数不能返回任何东西，空也不能）

- object

  一般不去单独使用

  ```ts
  // 使用方式,object变量里不能多不能少
  let b: {name:string};
  b = {name: 'hello'};
  
  // 在变量后面加上问号时，这个参数可有可无（可选值），当这个参数有时则需要根据后面指定的类型来设置
  // ?表示变量可能存在，可能不存在
  let c: {name:string, age?:number};
  c = {name:'hello', age:12};
  c = {name:'hello'};
  
  // 当需要设置d里必须有一个name属性，其他属性任意时,propName是睡意
  //[propName: string]:any表示任意类型属性
  let d: {name:string,[propName: string]:any};
  ```

  用于限制函数时，在函数里不能使用上面的任意类型属性，

  箭头后是用来指定返回值类型

  ```ts
  let v: (a: number, b: number) => number;
  
  v = function (a, b): number {
      return a + b
  };
  ```

- array

  数组，python里的列表

  ```ts
  // 声明全是数字的数组
  let n: number[]
  // 声明一个全是字符串的数组
  let e: string[];
  e = ['a', 'b', 'c']
  //或者
  let g: Array<string>
  ```

- tuple   （TS特有）

  元组：固定长度的数组

  ```ts
  let h: [string, number]
  h = ['a', 123]
  ```

- enum   （TS特有）

  枚举

  这样可以根据Gender去验证属性不用管他具体值代表的是什么，也可以不用给Gender里的属性赋值

  ```ts
  enum Gender1{
      Man = 0, //男
      Woman = 1 //女
  }
  // 或
  enum Gender2{
      Man, //男
      Woman //女
  }
  
  let i: {name: string, gender: Gender }
  
  i = {
      name:'李某人',
      gender: Gender1.Man
  }
  ```

- &表示同时, | 表示或

  and与or

  ```ts
  let a: {name:string} & {age: number}
  a = {name:'lidong', age:12}
  
  let b: {name:string} | {age: number}
  b = {name:'str'}
  b = {age:12}
  ```

- 类型的别名

  ```ts
  type my = 1 | 2 | 3 | 4
  
  let m: my
  let k: my
  ```

## 编译选项

- 直接运行TS文件

  `npm i -g ts-node`

- 编译TS文件为JS文件

  `tsc app.ts`

- 自动监视TS文件并编译

  一个终端只能监视一个文件

  `tsc app.ts -w`

- 自动监视所有文件并编译

  直接执行

  `tsc`

  前提是需要在当前目录下有一个`tsconfig.json`

  `tsconfig.json`

  ```json
  {
    /*
    include 指定需要编译的文件
    **  表示任意文件夹
    *   表示任意文件
  
    exclude 指定不需要编译的文件
    默认值['node_modules','bower_components','jspm_packages']
  
    extends 基础config目录下的base.json文件中的配置信息到tsconfig.json
    */
    "include": [
      "./src/**/*"
    ],
    "exclude": [
      "./src/**/*"
    ],
    "extends": "./config/base",
    // 编译器配置
    "compilerOptions": {
  
      // 用来指定TS文件被编译的版本，默认转为ES3
      "target": "ES6",
  
      // 指定要使用的模块化标准 ES2015 = ES6
      "module": "ES6",
  
      // 用来指定项目中要使用的库
  	// "lib": [],
  
      // 指定编译后的文件所在的目录
      "outDir": "./dist",
  
      // 将代码合并为一个文件,设置outFile后
      // 会将全局作用域中的代码合并到同一个文件中
      // module 必须设置为system或amd才能把模块化的代码合并
      "outFile": "./dist/app.js",
  
      // 是否对js文件进行编译，默认是false
      "allowJs": false,
  
      // 检查js代码是否符合TS规范
      "checkJs": false,
  
      // 是否移除注释，默认为false保留注释
      "removeComments": false,
  
      // 不生成编译后的文件
      "noEmit": true,
  
      //当有错误时不生成文件,默认false
      "noEmitOnError": true,
  
      // 所有严格检查的总开关，为true时以下都不用写了
      "strict": false,
  
      // 用来设置编译后的文件是否使用严格模式, 默认为false
      // 严格模式编译的代码好一些， 当有模块时会自动进入严格模式
      "alwaysStrict": false,
  
      // 不允许隐式的any（不是自己赋予的any）
      "noImplicitAny": false,
  
      // 不允许不明确类型this
      "noImplicitThis": false,
  
      // 严格检查空值
      "strictNullChecks": false
    }
  }
  ```

## webpack

1. 初始化项目

   生成一个package.json

   `npm init -y`

2. 安装webpack

   `npm i -D webpack webpack-cli typescript ts-loader`

3. 创建webpack配置文件

   `webpack.config.js`

   ```js
   const path = require('path')
   const HTMLWebpackPlugin = require('html-webpack-plugin')
   
   module.exports = {
       mode:'development',
       entry: './src/index.ts',
       output: {
           path: path.resolve(__dirname,'dist'),
           filename: "bundle.js"
       },
       module: {
           rules: [
               {
                   test: /\.ts$/,
                   use: 'ts-loader',
                   exclude: /node_modules/
               }
           ]
       },
       // 配置webpack插件
       plugins: [
           new HTMLWebpackPlugin(
               {
                   // title: "网页标题"
                   template: "./src/index.html"
               }
           ),
       ],
       // 用来设置可以引用的模块
       resolve: {
           extensions: ['.ts', '.js']
       }
   }
   ```

4. 添加打包命令

   `package.json`

   ```json
   {
     "name": "web",
     "version": "1.0.0",
     "description": "",
     "main": "index.js",
     "scripts": {
       "test": "echo \"Error: no test specified\" && exit 1"
         //加上下面这个
         "build": "webpack"
     }
   }
   ```

5. 执行打包命令

   `npm run build`

### webapck插件         html-webpack-plugin

用于一起打包css，与index

1. 安装html-webpack-plugin

   `npm i -D html-webpack-plugin`

2. 配置

   ```js
   const path = require('path')
   const HTMLWebpackPlugin = require('html-webpack-plugin')
   
   module.exports = {
       mode:'development',
       entry: './src/index.ts',
       output: {
           path: path.resolve(__dirname,'dist'),
           filename: "bundle.js"
       },
       module: {
           rules: [
               {
                   test: /\.ts$/,
                   use: 'ts-loader',
                   exclude: /node_modules/
               }
           ]
       },
       // 配置webpack插件
       plugins: [
           new HTMLWebpackPlugin(
               {
                   // title: "网页标题"
                   //设置模板index
                   template: "./src/index.html"
               }
           ),
       ],
   }
   ```

### webpack插件      webpack-dev

用于实时更新网页,网页随着TS文件更新

1. 安装webpack-dev

   `npm i -D webpack-dev-server `

2. 安装命令

   参考上方安装`build`命令

   `"start":"webpack server"`

3. 运行

   `npm run start`

### webpack插件    clean-webpack-plugin

用于打包前清空dist文件夹

1. 安装

   `npm i -D clean-webpack-plugin`

2. 参考`html-webpack-plugin`安装方法

### 兼容性工具

用于解决兼容性问题，通过一些方式让老的浏览器去支持新的技术

1. 安装

   `npm i -D @babel/core @babel/preset-env babel-loader core-js`

2. 配置

   webpack.config.js

   ```js
   const path = require('path')
   const HTMLWebpackPlugin = require('html-webpack-plugin')
   
   module.exports = {
       mode: 'development',
       entry: './src/index.ts',
       output: {
           path: path.resolve(__dirname, 'dist'),
           filename: "bundle.js",
           // 告诉webpack不用箭头函数，对于部分老版本浏览器不支持ES6箭头函数
           environment: {
               arrowFunction: false
           }
       },
       module: {
           rules: [
               {
                   test: /\.ts$/,
                   use: [
                       {
                           // 指定加载器
                           loader: "babel-loader",
                           // 设置babel
                           options: {
                               //设置预定义的环境
                               presets: [
                                   //指定环境插件
                                   '@babel/preset-env',
                                   // 配置信息
                                   {
                                       // 要兼容的目标浏览器
                                       targets: {
                                           "chrome": "88"
                                       },
                                       // 指定corejs版本
                                       "corejs": "3",
                                       // 使用corejs的方式 'usage'
                                       "useBuiltIns": "usage"
                                   }
                               ]
                           }
   
                       },
                       'ts-loader'
                   ],
                   exclude: /node_modules/
               }
           ]
       },
       plugins: [
           new HTMLWebpackPlugin(
               {
                   template: "./src/index.html"
               }
           ),
       ],
       resolve: {
           extensions: ['.ts', '.js']
       }
   }
   ```

   

## 面向对象

- 程序

  显示世界的抽象，一个人的抽象=>照片

### 类（class）

- 定义类： 

  ```ts
  class 类名 {
      属性名:类型;
      constructor(参数:类型){
          this.属性名 = 参数;
      }
      方法名(){
          
      }
  }
  ```

- 示例

  ```ts
  class Person{
      // 直接定义的属性是实例属性，需要对象的实例去访问
      // 需要创建实例才能访问
      name = 'laowang';
  
      // 静态属性 只能通过    类名.属性名  获取
      // 可以直接访问无需创建实例
      static age = 12;
  
      // 只读属性 无法修改    需要创建实例才能使用
      readonly next = 0
  
      // 静态只读属性
      static readonly last = 1
  
      // 方法 方法前加static为静态方法
      sayHello(){
          console.log('hello')
      }
  
      // 构造方法 类似python    def __init__():   构造函数会在类创建时执行
      // this 表示当前实例   类似python    self
      a:string
      b:number
      constructor(a:string, b:number) {
          this.a = a
          this.b = b
      }
  }
  
  const a = new Person('hello', 23)
  ```

### 类的继承

```ts
class Animal{
    name:string;
    age:number;

    constructor(name:string, age:number) {
        this.name = name
        this.age = age
    }

    sayHello(){
        console.log('key')
    }
}

// Dog继承了Animal
// 子类拥有父类的所有方法及属性
class Dog extends Animal{

}

class Cat extends Animal{

}

const a = new Dog('lihua', 12)
a.sayHello()
```

### super关键字

```ts
import {name} from "ts-loader";

class Animal{
    name:string;

    constructor(name:string) {
        this.name = name
    }

    sayHello(){
        console.log('key')
    }
}

class Cat extends Animal{
    age:number;

    constructor(name:string, age:number) {
        // 不调用父类，那么父类的构造函数就不会走,子类的构造函数必须调父类的构造函数
        super(name);
        this.age = 12

    }
    sayHello() {
        // super表示当前类的父类
        super.sayHello();
    }
}

const a = new Cat('lihua',12)
a.sayHello()
```

### 抽象类与抽象方法

```ts


// 以abstract开头的类不能创建示例，只能被其它类继承

abstract class Animal{
    name:string;

    constructor(name:string) {
        this.name = name
    }
    // 抽象类可以定义抽象方法,抽象类方法没有函数体，子类必须重写
    abstract sayHello():void
}

class Cat extends Animal{
    sayHello() {
        // super表示当前类的父类
        console.log('hello')
    }
}

const cat = new Cat('lihua')
cat.sayHello()
```

### 接口

```ts
/*
* 接口
*   用来定义一个类的结构
* */

interface my {
    name: string;
    age: number
}

interface my {
    gender:string
}

const mys: my = {
    name:'he',
    age:12,
    gender:'a'
}

// 接口中所有方法都是抽象方法
interface myint{
    name:string;
    sayHello():void
}

class MyClass implements myint{
    name: string;

    constructor(name:string) {
        this.name = name
    }

    sayHello() {
        console.log(1)
    }
}
```

### 属性封装

防止一些值被误改

```ts
class Person {
    // public 表示公有属性，默认就是公有
    public _name: string;
    // private 表示私有属性，只能在类里访问
    //  通过在类中添加方法使得能获取私有属性
    private _age: number
    // protected 受保护的属性，只能在当前类或者当前类的子类中进行访问
    protected _gender: string

    constructor(name: string, age: number, gender: string) {
        this._name = name
        this._age = age
        this._gender = gender

    }

    // TS 中设置get方法
    get age() {
        return this._age
    }

    set age(value: number) {
        if (value > 0) {
            this._age = value
        }
    }
}

class A {
    // 简化写法
    constructor(public name: string, public age: number) {
    }
}
```

### 泛型

```ts
// 在定义函数时遇到类型不明确就可以使用泛型,T是任意的
function fn<T>(a: T): T {
    return a;
}

function fn1<ab, ac>(a: ab, b: ac): ab {
    console.log(b)
    return a;
}

// 不指定类型，TS可以制动推断
fn1(10, 'hello')
// 不是所有情况都能自动推断,手动指定泛型
fn1<string, number>('hello', 12)

interface myInterface {
    length: number
}

// 表示泛型T必须是myInterface的一个实现类（子类）
function f<T extends myInterface>(a: T): number {
    return a.length;
}

f('heol')

class MyClass<T> {
    name: T;

    constructor(name: T) {
        this.name = name
    }
}
```

