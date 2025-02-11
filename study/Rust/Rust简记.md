# Rust 技巧与库

## Serde序列化与反序列化

> Serde 是一个用于序列化和反序列化 Rust 数据结构的库。它支持 JSON、BSON、YAML 等多种格式，并且可以自定义序列化和反序列化方式。Serde 的特点是代码简洁、易于使用、性能高效。

### 添加依赖

```toml
[dependencies]
serde = { version = "1.0", features = ["derive"] }
serde_json = "1.0"
```

其中 `features = ["derive"]` 表示使用 Serde 的派生宏，可以自动生成序列化和反序列化代码

### 序列化

使用 Serde 进行序列化，需要先将数据结构实现 `serde::Serialize` trait

```rust
use serde::Serialize;
use serde_json;

#[derive(Serialize)]
struct Person {
    name: String,
    age: i32,
}

fn main() {
    let person = Person {
        name: "John".to_owned(),
        age: 30,
    };
    let json = serde_json::to_string(&person).unwrap();
    println!("{}", json);
}
```

### 反序列化

```rust
use serde::Deserialize;
use serde_json;

#[derive(Deserialize, Debug)]
struct Person {
    name: String,
    age: i32,
}

fn main() {
    let json_str = r#"{
        "name": "John Doe",
        "age": 30
    }"#;
    let person: Person = serde_json::from_str(json_str).unwrap();
    println!("{:?}", person);
}
```

### 自定义序列化与反序列换

```rust
use serde::{Deserialize, Deserializer, Serialize, Serializer};

#[derive(Serialize, Deserialize, Debug)]
struct Person {
    #[serde(serialize_with = "serialize_name", deserialize_with = "deserialize_name")]
    name: String,
    age: i32,
}

/// 序列化时将字符串转换为大写
fn serialize_name<S>(name: &String, serializer: S) -> Result<S::Ok, S::Error>
where
    S: Serializer,
{
    serializer.serialize_str(&name.to_uppercase())
}

/// 反序列化时将字符串转换为小写
fn deserialize_name<'de, D>(deserializer: D) -> Result<String, D::Error>
where
    D: Deserializer<'de>,
{
    let s: String = Deserialize::deserialize(deserializer)?;
    Ok(s.to_lowercase())
}

fn main() {
    let person = Person {
        name: "john".to_string(),
        age: 30,
    };

    let json = serde_json::to_string(&person).unwrap();
    println!("{}", json);

    let person: Person = serde_json::from_str(&json).unwrap();
    println!("{:?}", person);
}
```

在 `Person` 结构体中，使用 `#[serde(serialize_with = "serialize_name", deserialize_with = "deserialize_name")]` 指定了自定义的序列化和反序列化方法

### 序列化和反序列化枚举

```rust
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
#[serde(tag = "type")]
enum Person {
    Male { name: String, age: i32 },
    Female { name: String, age: i32 },
}

fn main() {
    let male = Person::Male {
        name: "John".to_string(),
        age: 30,
    };
    let male_json = serde_json::to_string(&male).unwrap();
    println!("{}", male_json);
    
    let female_json = r#"{"type":"Female","name":"Jane","age":25}"#;
    let female: Person = serde_json::from_str(female_json).unwrap();
    println!("{:?}", female);
}
```

在序列化和反序列化枚举类型时，需要使用 `#[serde(tag = "type")]` 指定枚举类型的标签

### 序列化和反序列化结构体中的 Option

- Serde 支持序列化和反序列化结构体中的 `Option` 类型
- 在序列化和反序列化中的 `Option` 类型时，需要使用 `#[serde(skip_serializing_if = "Option::is_none")]` 指定 `Option` 值为 `None` 时，不进行序列化

```rust
use serde::{Deserialize, Serialize};


#[derive(Serialize, Deserialize)]
struct Person {
    #[serde(skip_serializing_if = "Option::is_none")]
    first_name: Option<String>,
    #[serde(skip_deserializing)]
    last_name: Option<String>,
    age: i32,
}

fn main() {
    let person = Person {
        first_name: Some("John".to_string()),
        last_name: Some("Doe".to_string()),
        age: 30,
    };
    println!("{}", serde_json::to_string(&person).unwrap());
}
```

### 序列化和反序列化结构体中的 Vec

```rust
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
struct Zoo {
    names: Vec<String>,
}

fn main() {
    let zoo = Zoo {
        names: vec!["Aardvark".to_string(), "Zebra".to_string()],
    };
    println!("{}", serde_json::to_string(&zoo).unwrap());
    let zoo: Zoo = serde_json::from_str(r#"{"names":["aardvark","zebra"]}"#).unwrap();
    println!("{:?}", zoo);
}
```

### 序列化和反序列化结构体中的 HashMap

```rust
use std::collections::HashMap;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
struct Zoo {
    names: HashMap<String, String>,
}

fn main() {
    let mut zoo = Zoo {
        names: HashMap::from([
            ("Africa".to_string(), "Lion".to_string()),
            ("Asia".to_string(), "Tiger".to_string()),
            ("Europe".to_string(), "Elephant".to_string()),
        ]),
    };
    zoo.names.insert("Africa".to_string(), "Lion".to_string());
    
    let json = serde_json::to_string(&zoo).unwrap();
    println!("{}", json);
    
    let json_str = r#"{"names":{"Africa":"Lion","Asia":"Tiger","Europe":"Elephant"}}"#;
    let zoo: Zoo = serde_json::from_str(json_str).unwrap();
    println!("{:?}", zoo);
}
```

### 对未类型化的JSON进行解析

任何有效的JSON数据都可以转换成`serde_json::Value`数据结构：

```rust
enum Value {
    Null,
    Bool(bool),
    Number(Number),
    String(String),
    Array(Vec<Value>),
    Object(Map<String, Value>),
}
```

以下函数可用于将JSON数据解析成`serde_json::Value`结构：

- `serde_json::from_str`，用于解析JSON字符串；
- `serde_json::from_slice`，用于对字节切片`&[u8]`进行解析；
- `serde_json::from_reader`，从支持`io::Read`特性的对象中读取数据并解析，比如一个文件或TCP流；

一个使用`serde_json::from_str`的例子：

```rust
fn main() {

    // 一个&str类型的JSON数据
    let data = r#"
        {
            "name": "James Bond",
            "age": 33,
            "pet_phrase": [
                "Bond, James Bond.",
                "Shaken, not stirred."
            ]
        }"#;

    // 转换成serde_json::Value结构
    let v: serde_json::Value = serde_json::from_str(data).unwrap();

    // 通过方括号建立索引来访问部分数据
    println!("NAME: {}\nAGE: {}\n\t{}\n\t{}",
        v["name"],
        v["age"],
        v["pet_phrase"][0],
        v["pet_phrase"][1],
    );
}
```

程序运行结果

```sh
NAME: "James Bond"
AGE: 33
        "Bond, James Bond."
        "Shaken, not stirred."
```

### 将JSON解析到数据结构

`serde`提供了一种将JSON数据自动映射到Rust数据结构的方法；

修改前一个例子：

```rust
use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize)]
struct Person {
    name: String,
    age: u8,
    pet_phrase: Vec<String>,
}

fn main() {

    // 一个&str类型的JSON数据
    let data = r#"
        {
            "name": "James Bond",
            "age": 33,
            "pet_phrase": [
                "Bond, James Bond.",
                "Shaken, not stirred."
            ]
        }"#;

    // 转换成 Person 结构
    let p: Person = serde_json::from_str(data).unwrap();

    // 通过方括号建立索引来访问部分数据
    println!("NAME: {}\nAGE: {}\n\t{}\n\t{}",
        p.name,
        p.age,
        p.pet_phrase[0],
        p.pet_phrase[1],
    );
}
```

该程序运行效果与上一个例子相同，但这一次我们将`serde_json::from_str`函数的返回值分配给了一个自定义的类型`Person`；

> JSON数据与结构体定义不符时将产生错误；

### 将数据结构转换成JSON字符串

以下是一些可以将数据结构转换成JSON数据的函数：

- `serde_json::to_string`，将数据结构转换成JSON字符串；
- `serde_json::to_vec`，将数据结构序列化为`Vec<u8>`；
- `serde_json::to_writer`，可以序列化到任何实现了`io::Write`特性的对象中，例如文件或 TCP 流；

使用`serde_json::to_string`的一个例子：

```rust
use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize)]
struct Person {
    name: String,
    age: u8,
    pet_phrase: Vec<String>,
}

fn main() {

    let mut pp = Vec::new();
    pp.push("hello world".to_string());
    pp.push("perfcode.com".to_string());

    let p = Person {
        name: "ho".to_string(),
        age: 18,
        pet_phrase: pp,
    };

    // 序列化为JSON字符串
    let s = serde_json::to_string(&p).unwrap();

    println!("{}",s);
    
}
```

程序运行效果

```json
{"name":"ho","age":18,"pet_phrase":["hello world","perfcode.com"]}
```

### json!宏

serde提供了一个`json!`宏来非常自然的构建`serde_json::Value`对象：

```rust
use serde_json::json;

fn main() {

    let info = json!(
        {
            "name": "James Bond",
            "age": 33,
            "pet_phrase":[
                "Bond, James Bond.",
                "Shaken, not stirred."
                ]
        }
    );

    // 通过方括号建立索引来访问部分数据
    println!("NAME: {}\nAGE: {}\n\t{}\n\t{}",
        info["name"],
        info["age"],
        info["pet_phrase"][0],
        info["pet_phrase"][1],
    );

    //序列化
    println!("{}",info.to_string());

}
```



[官方文档](https://serde.rs/)



## 文件操作

`File` 结构体表示一个被打开的文件（它包裹了一个文件描述符），并赋予了对所表示的文件的读写能力。

由于在进行文件 I/O（输入/输出）操作时可能出现各种错误，因此 `File` 的所有方法都返回 `io::Result<T>` 类型，它是 `Result<T, io::Error>` 的别名。

这使得所有 I/O 操作的失败都变成**显式的**。借助这点，程序员可以看到所有的失败路径，并被鼓励主动地处理这些情形。

```rust
use std::fs;
use std::fs::{File, OpenOptions};
use std::io;
use std::io::prelude::*;
use std::os::unix;
use std::path::Path;

// `% cat path` 的简单实现
fn cat(path: &Path) -> io::Result<String> {
    let mut f = File::open(path)?;
    let mut s = String::new();
    match f.read_to_string(&mut s) {
        Ok(_) => Ok(s),
        Err(e) => Err(e),
    }
}

// `% echo s > path` 的简单实现
fn echo(s: &str, path: &Path) -> io::Result<()> {
    let mut f = File::create(path)?;

    f.write_all(s.as_bytes())
}

// `% touch path` 的简单实现（忽略已存在的文件）
fn touch(path: &Path) -> io::Result<()> {
    // OpenOptions 是 Rust 标准库 std::fs 模块中的一个结构体，用于配置如何打开文件。它允许你设置文件的打开方式
    // 设置 create 选项为 true，表示如果文件不存在，则创建该文件
    // 设置 write 选项为 true，表示以写模式打开文件
    // .read(true)：以读模式打开文件
    // .append(true)：以追加模式打开文件（不会清空文件内容）
    // .truncate(true)：打开文件时清空文件内容
    // .create_new(true)：仅在文件不存在时创建文件（如果文件已存在则返回错误）
    // .open(path) 是最终的操作，它会根据之前设置的选项尝试打开指定路径的文件
    match OpenOptions::new().create(true).write(true).open(path) {
        Ok(_) => Ok(()),
        Err(e) => Err(e),
    }
}

fn main() {
    println!("`mkdir a`");
    // 创建一个目录，返回 `io::Result<()>`
    match fs::create_dir("a") {
        Err(why) => println!("! {:?}", why.kind()),
        Ok(_) => {},
    }

    println!("`echo hello > a/b.txt`");
    // 前面的匹配可以用 `unwrap_or_else` 方法简化
    echo("hello", &Path::new("a/b.txt")).unwrap_or_else(|why| {
        println!("! {:?}", why.kind());
    });

    println!("`mkdir -p a/c/d`");
    // 递归地创建一个目录，返回 `io::Result<()>`
    fs::create_dir_all("a/c/d").unwrap_or_else(|why| {
        println!("! {:?}", why.kind());
    });

    println!("`touch a/c/e.txt`");
    touch(&Path::new("a/c/e.txt")).unwrap_or_else(|why| {
        println!("! {:?}", why.kind());
    });

    println!("`ln -s ../b.txt a/c/b.txt`");
    // 创建一个符号链接，返回 `io::Result<()>`
    if cfg!(target_family = "unix") {
        unix::fs::symlink("../b.txt", "a/c/b.txt").unwrap_or_else(|why| {
            println!("! {:?}", why.kind());
        });
    }

    println!("`cat a/c/b.txt`");
    match cat(&Path::new("a/c/b.txt")) {
        Err(why) => println!("! {:?}", why.kind()),
        Ok(s) => println!("> {}", s),
    }

    println!("`ls a`");
    // 读取目录的内容，返回 `io::Result<Vec<Path>>`
    match fs::read_dir("a") {
        Err(why) => println!("! {:?}", why.kind()),
        Ok(paths) => for path in paths {
            println!("> {:?}", path.unwrap().path());
        },
    }

    println!("`rm a/c/e.txt`");
    // 删除一个文件，返回 `io::Result<()>`
    fs::remove_file("a/c/e.txt").unwrap_or_else(|why| {
        println!("! {:?}", why.kind());
    });

    println!("`rmdir a/c/d`");
    // 移除一个空目录，返回 `io::Result<()>`
    fs::remove_dir("a/c/d").unwrap_or_else(|why| {
        println!("! {:?}", why.kind());
    });
}
```





## 路径操作

`Path` 结构体代表了底层文件系统的文件路径。`Path` 分为两种：`posix::Path`，针对类 UNIX 系统；以及 `windows::Path`，针对 Windows。prelude 会选择并输出符合平台类型的 `Path` 种类。

```rust
use std::path;

fn main() {
    // 创建路径对象
    let my_path = path::Path::new(".");
    // `display` 方法返回一个 `Path` 的显示字符串
    println!("{:?}", my_path.display());
    // `join` 使用操作系统特定的分隔符来合并路径到一个字节容器，并返回新的路径
    println!("{:?}", my_path.join("foo/bar.txt"));
    // `exists` 方法检查路径是否存在
    println!("{:?}", my_path.exists());
    // `is_dir` 方法检查路径是否是一个目录
    println!("{:?}", my_path.is_dir());
    // `is_file` 方法检查路径是否是一个文件
    println!("{:?}", my_path.is_file());
    // `metadata` 方法返回一个 `Result`，其中包含路径的元数据
    println!("{:?}", my_path.metadata());
    // `metadata` 方法 `len` 方法返回一个 `Result`，文件大小为字节数
    println!("{:?}", my_path.metadata().unwrap().len());
    
    // `read_dir` 方法返回一个 `Result`，其中包含路径下的所有目录项
    for entry in my_path.read_dir().unwrap() {
        println!("{:?}", entry.unwrap().path());
    }
    // `with_file_name` 方法返回一个路径对象，其中包含给定文件名的文件名`
    println!("{:?}", my_path.with_file_name("foo.txt"));
    // `with_extension` 方法返回一个路径对象，其中包含给定扩展名的文件扩展名
    println!("{:?}", my_path.join("foo.json").with_extension("txt"));
}
```





## ratatui 构建 TUI

https://ratatui.rs/

> 需要注意的是当你在使用时 `ratatui::init();` 会让你进入原始模式，如果你需要在其中嵌入终端应用例如执行 `ssh` 命令，那么你需要在执行前关闭原始模式 `terminal::disable_raw_mode` 在使用完回到 TUI 时，你需要恢复原始模式 `ternimal::enable_raw_mode`

### 原始模式（`raw mode`）

原始模式的功能如下，为 TUI 界面的事件等提供后端支持

- 输入不转发到屏幕。
- 输入不在回车后处理。
- 输入不是缓冲行行。
- 特殊案件删除backspace和Ctrol+C将不由终端驱动处理。
- 新行特性将不被println!处理使用write!替换。

## 静态编译（低版本系统没有需要的动态链接库时）

## 使用MUSL进行静态编译

使用前需要检查是否存在对应的musl环境

`rustup target list`

如果看到

`x86_64-unknown-linux-musl (installed)` 

则无需安装否则如下命令安装环境

`rustup target add x86_64-unknown-linux-musl`

如果你是第一次使用musl编译那么你需要安装 `musl-tools`

`apt install musl-tools -y`

此时你就可以构建无依赖的Rust应用了

`cargo build --release --target=x86_64-unknown-linux-musl`

这时的Rust 的 release 文件位于
`./target/x86_64-unknown-linux-musl/release`



