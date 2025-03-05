# Rust 技巧与库

## reqwest网络请求

本文介绍 Rust 语言中常用的 HTTP 客户端库——**reqwest**。通过对其同步（阻塞）和异步 API 的说明和代码示例，帮助你快速上手这一库的使用。

------

### 简介

**Reqwest** 是 Rust 生态系统中非常流行的网络请求库，其设计理念类似于 Python 中的 requests 模块。无论是发送简单的 GET 请求，还是处理更复杂的 POST、PUT 请求，reqwest 都能提供简单易用的 API。它支持同步（blocking）和异步（async）两种模式，满足不同应用场景的需求。

------

###  安装与配置

在使用 reqwest 之前，需要在项目的 `Cargo.toml` 文件中添加相应的依赖项。根据你使用的 API 模式不同，可以做如下配置：

####  使用异步 API

如果你打算使用异步 API（例如使用 `reqwest::get` 的异步版本），则需要引入 tokio 作为异步运行时，并启用默认功能：

```toml
[dependencies]
reqwest = { version = "0.11", features = ["json"] }
tokio = { version = "1", features = ["full"] }  # 异步运行时支持
```

#### 使用阻塞（blocking） API

如果你只需要使用同步的阻塞 API，则可以配置只启用 blocking 模块，从而避免引入不必要的异步运行时：

```toml
[dependencies]
reqwest = { version = "0.11", default-features = false, features = ["blocking", "json"] }
```

这样配置后，你就可以通过 `reqwest::blocking` 模块来进行同步网络请求，而无需依赖 tokio 等异步运行时。

------

###  阻塞式 API 与 异步 API

#### 阻塞式 API

对于简单的脚本或不需要异步特性的场景，可以使用阻塞式 API。示例如下：

```rust
use reqwest::blocking;
use std::error::Error;

fn main() -> Result<(), Box<dyn Error>> {
    // 发送一个 GET 请求
    let response = blocking::get("https://www.rust-lang.org")?
        .text()?;
    println!("响应内容: {}", response);
    Ok(())
}
```

在这个示例中，我们直接调用 `blocking::get` 发送请求，并链式调用获取响应体的文本内容。

#### 异步 API

如果你的应用需要高并发或异步编程支持，则可以使用异步 API。示例如下：

```rust
use reqwest;
use tokio;

#[tokio::main]
async fn main() -> Result<(), reqwest::Error> {
    // 异步发送 GET 请求
    let response = reqwest::get("https://www.rust-lang.org")
        .await?
        .text()
        .await?;
    println!("响应内容: {}", response);
    Ok(())
}
```

注意：使用异步 API 时，需要在项目中配置 tokio 等异步运行时，并在 `main` 函数上使用 `#[tokio::main]` 宏。

------

### 处理 JSON 数据

reqwest 内置对 JSON 的支持，可以方便地将响应体解析为 JSON 对象。下面是一个 POST 请求发送 JSON 数据，并接收 JSON 响应的示例：

```rust
use reqwest::blocking::Client;
use serde::{Serialize, Deserialize};
use std::error::Error;

#[derive(Serialize)]
struct MyRequest {
    username: String,
    password: String,
}

#[derive(Deserialize, Debug)]
struct MyResponse {
    status: String,
    message: String,
}

fn main() -> Result<(), Box<dyn Error>> {
    let client = Client::new();

    let req_body = MyRequest {
        username: "user123".into(),
        password: "secret".into(),
    };

    let res = client.post("https://httpbin.org/post")
        .json(&req_body)
        .send()?
        .json::<MyResponse>()?;

    println!("响应: {:?}", res);
    Ok(())
}
```

在这个例子中，我们使用 `serde` 库来序列化请求体和反序列化响应数据。reqwest 内置的 `json()` 方法使整个过程十分简洁。

### 请求前

> 如果不自己构建client对象, reqwest默认只提供get方法, 在库层面，reqwest只暴露了get方法, 如果需要使用其他的方法可以自己构造客户端。

#### 查询参数

查询参数值一般指url中问号后的部分, 比如`https://youerning.top/?ie=UTF-8&wd=test`中的`ie=UTF-8&wd=test`

```go
use std::collections::HashMap;
use reqwest::Result;

#[tokio::main]
async fn main() -> Result<()>{
    let url = "https://youerning.top";
    let client = reqwest::Client::new();
    let mut params = HashMap::new();
    params.insert("key", "value");
    let resp = client
        .get(url)
        .query(&params)
        .send()
        .await?
        .text()
        .await?;

    println!("resp: {}", resp);
    Ok(())
}
```

#### http请求头参数

常见的http请求头有`User-Agent`, 用于简单的反爬以及反反爬。

reqwest同时支持两种设定请求头的方式，方法如下:

```go
use std::collections::HashMap;
use reqwest::Result;
use reqwest::header;


#[tokio::main]
async fn main() -> Result<()>{
    let url = "https://youerning.top";
    let client = reqwest::Client::new();
    let mut headers = header::HeaderMap::new();
    headers.insert("custom", header::HeaderValue::from_static("youerning.top"));
    let resp = client
        .get(url)
        .header("User-Agent", "youerning.top")
        .headers(headers)
        .send()
        .await?
        .text()
        .await?;

    println!("resp: {}", resp);
    Ok(())
}
```

#### 请求体参数

既然有了查询参数为啥还需要请求体参数? 因为查询参数在url中，总不可能上传个文件也把文件的编码到url中，那么这个url太长了，并且url的长度有有限制的。

一般来说，常用的请求体参数有以下三种。

1. 表单 对应的Content-Type是application/x-www-form-urlencoded
2. json 对应的Content-Type是application/json
3. 包含文件的表单 对应的Content-Type是multipart/form-data

**上传表单**

```go
use reqwest::Result;

#[tokio::main]
async fn main() -> Result<()>{
    let url = "https://youerning.top";
    let client = reqwest::Client::new();
    let mut params = HashMap::new();
    params.insert("key2", "value2");
    let resp = client
        .get(url)
        .form(&[("key1", "value1")])
        .form(&params)
        .send()
        .await?
        .text()
        .await?;

    println!("resp: {}", resp);
    Ok(())
}
```

> reqwest支持两种方式设置form, 但是不能像headers那样反复追加，这里因为`.form(&params)`最后调用，所以上传的表单只有`key2=value2`

**JSON请求**

rust不像golang那样内置了很多实用的标准库，rust很多功能需要依赖外部库，比如这里的json, 在reqwest中我们需要引入`serde_json`, 当然也可以不使用`serde_json`而是使用hashmap, json和表单一样后面的会覆盖前面的调用。

> 如果需要使用json方法，reqwest的依赖需要启用json特性!

```go
use serde_json;
use reqwest::Result;
use std::collections::HashMap;


#[tokio::main]
async fn main() -> Result<()>{
    let url = "https://youerning.top";
    let client = reqwest::Client::new();
    let mut payload = HashMap::new();
    payload.insert("key2", "value2");
    let resp = client
        .post(url)
        .json(&serde_json::json!({
            "key1": "value1"
        }))
        .json(&payload)
        .send()
        .await?
        .text()
        .await?;

    println!("resp: {}", resp);
    Ok(())
}
```

**上传文件的表单**

```go
use reqwest::Result;
use reqwest::multipart::{Form, Part};

#[tokio::main]
async fn main() -> Result<()>{
    let url = "https://youerning.top";
    let client = reqwest::Client::new();
    let form: Form = Form::new();
    // 也可以不指定mime
    let file = Part::text("file").file_name("test.txt").mime_str("text/plain").unwrap();
    let form = form.part("uploadfile", file);
    let resp = client
        .post(url)
        .multipart(form)
        .send()
        .await?
        .text()
        .await?;

    println!("resp: {}", resp);
    Ok(())
}
```

编码后的请求体内容如下:

```text
--e0f1b497af95f167-38dc8fccee705209-d805583dc901b5f7-4bb5deae2f0db3bb
Content-Disposition: form-data; name="uploadfile"; filename="test.txt"
Content-Type: text/plain

file
--e0f1b497af95f167-38dc8fccee705209-d805583dc901b5f7-4bb5deae2f0db3bb--
```

上传表单带有文件的表单还是比较复杂的。

#### Cookie

默认情况下reqwest也是不会启用cookie这个特性的, 所以需要使用cookie的话，要在reqwest的依赖设置中设置`cookie`这个依赖, 比如`reqwest = { version="0.11.22", features=["json", "multipart", "cookies"]}`, 除此之前还需要一个额外的库来创建`cookie`, 也就是`reqwest_cookie_store`。

> 这个cookie我没使用明白，这里只是简单的copy一下`reqwest_cookie_store`的示例代码
> 更详细的例子可以查看: [https://docs.rs/reqwest_cookie_store/latest/reqwest_cookie_store/](https://link.zhihu.com/?target=https%3A//docs.rs/reqwest_cookie_store/latest/reqwest_cookie_store/)

```go
// Load an existing set of cookies, serialized as json
let cookie_store = {
  if let Ok(file) = std::fs::File::open("cookies.json")
    .map(std::io::BufReader::new)
    {
      // use re-exported version of `CookieStore` for crate compatibility
      reqwest_cookie_store::CookieStore::load_json(file).unwrap()
    }
    else
    {
      reqwest_cookie_store::CookieStore::new(None)
    }
};
let cookie_store = reqwest_cookie_store::CookieStoreMutex::new(cookie_store);
let cookie_store = std::sync::Arc::new(cookie_store);
{
  // Examine initial contents
  println!("initial load");
  let store = cookie_store.lock().unwrap();
  for c in store.iter_any() {
    println!("{:?}", c);
  }
}

// Build a `reqwest` Client, providing the deserialized store
let client = reqwest::Client::builder()
    .cookie_provider(std::sync::Arc::clone(&cookie_store))
    .build()
    .unwrap();

// Make a sample request
client.get("https://google.com").send().await.unwrap();
{
  // Examine the contents of the store.
  println!("after google.com GET");
  let store = cookie_store.lock().unwrap();
  for c in store.iter_any() {
    println!("{:?}", c);
  }
}
```

#### 超时

超时可以很简单的设置，比如

```go
use std::time;
use reqwest::Result;

#[tokio::main]
async fn main() -> Result<()>{
    let url = "https://youerning.top";
    let client = reqwest::Client::new();
    let resp = client
        .post(url)
        .timeout(time::Duration::from_secs(1))
        .send()
        .await?
        .text()
        .await?;

    println!("resp: {}", resp);
    Ok(())
}
```

这里设置了一个总的超时时间。

#### [SSL证书](https://zhida.zhihu.com/search?content_id=235634250&content_type=Article&match_order=1&q=SSL证书&zhida_source=entity)

对于自签名证书最常见的就是不验证证书，代码如下

```go
use reqwest::Result;

#[tokio::main]
async fn main() -> Result<()>{
    let url = "https://youerning.top";

    let client = reqwest::Client::builder().danger_accept_invalid_certs(true).build().unwrap();
    let resp = client
        .get(url)
        .send()
        .await?
        .text()
        .await?;

    println!("resp: {}", resp);
    Ok(())
}
```

不验证证书肯定是不安全的，所以可以加载自签名证书, 代码如下

```go
use std::fs::File;
use std::io::Read;
use reqwest::Result;

#[tokio::main]
async fn main() -> Result<()>{
    let url = "https://youerning.top";

     let mut buf = Vec::new();
     File::open("my_cert.pem").unwrap()
         .read_to_end(&mut buf).unwrap();
     let cert = reqwest::Certificate::from_pem(&buf)?;
    let client = reqwest::Client::builder().add_root_certificate(cert).build().unwrap();

    let resp = client
        .get(url)
        .send()
        .await?
        .text()
        .await?;

    println!("resp: {}", resp);
    Ok(())
}
```

#### [代理](https://zhida.zhihu.com/search?content_id=235634250&content_type=Article&match_order=1&q=代理&zhida_source=entity)

直接抄的官方的example的代码，不想写了。。。。。

```go
#![deny(warnings)]


#[tokio::main]
async fn main() -> Result<(), reqwest::Error> {
    // Make sure you are running tor and this is your socks port
    let proxy = reqwest::Proxy::all("socks5h://127.0.0.1:9050").expect("tor proxy should be there");
    let client = reqwest::Client::builder()
        .proxy(proxy)
        .build()
        .expect("should be able to build reqwest client");

    let res = client.get("https://check.torproject.org").send().await?;
    println!("Status: {}", res.status());

    let text = res.text().await?;
    let is_tor = text.contains("Congratulations. This browser is configured to use Tor.");
    println!("Is Tor: {}", is_tor);
    assert!(is_tor);

    Ok(())
}
```

#### [重定向](https://zhida.zhihu.com/search?content_id=235634250&content_type=Article&match_order=1&q=重定向&zhida_source=entity)

有时候可以限制重定向的测试来避免重定向次数过多。

```go
use reqwest::Result;
use reqwest::redirect::Policy;



#[tokio::main]
async fn main() -> Result<()>{
    let url = "https://youerning.top";
    let policy = Policy::custom(|attempt| {
        if attempt.previous().len() > 5 {
            attempt.error("too many redirects")
        } else if attempt.url().host_str() == Some("example.domain") {
            // prevent redirects to 'example.domain'
            attempt.stop()
        } else {
            attempt.follow()
        }
    });

    let client = reqwest::Client::builder().redirect(policy).build().expect("build client failed");

    let resp = client
        .get(url)
        .send()
        .await?
        .text()
        .await?;

    println!("resp: {}", resp);
    Ok(())
}
```

> reqwest 默认的重定向检查是10次。

### 请求后

请求后会获得一个`Response`对象, 这个结构体有许多比较有用的字段。

#### 响应头信息/状态码

响应头信息可以用于一些特殊字段的判断，比如字符集，而状态码可以简单的判断请求是否成功，

```go
use reqwest::Result;


#[tokio::main]
async fn main() -> Result<()>{
    let url = "https://youerning.top";

    let resp = reqwest::Client::new()
        .get(url)
        .send()
        .await?;

    println!("headers: {:?}", resp.headers());
    println!("status: {}", resp.status());
    Ok(())
}
```

而作者判断响应码给出了下面这个例子

```rust
use reqwest::Error;

async fn handle_error() -> Result<(), Error> {
    let response = reqwest::get("https://www.example.com").await?;

    match response.status().as_u16() {
        200..=299 => {
            let body = response.text().await?;
            println!("Success! Body:\n{}", body);
        }
        400..=599 => {
            let status = response.status();
            let error_message = response.text().await?;
            println!("Error {}: {}", status, error_message);
        }
        _ => {
            println!("Unexpected status code: {}", response.status());
        }
    }

    Ok(())
}

#[tokio::main]
async fn main() -> Result<(), Error> {
    handle_error().await?;
    Ok(())
}
```

#### 响应体

如果默认响应体的编码是utf8，就可以直接处理响应体, 可以通过text方法直接获得解码后的`String`对象

```go
use reqwest::Result;


#[tokio::main]
async fn main() -> Result<()>{
    let url = "https://youerning.top";

    let resp = reqwest::Client::new()
        .get(url)
        .send()
        .await?;

    println!("resp content: {}", resp.text().await?);
    Ok(())
}
```

> reqwest的text方法默认使用utf8解码

#### 编码

一般来说大家都是用**utf-8**了，但是总有一些例外情况，所以为了安全的解析响应体内容，需要检测响应体的编码格式 如果我们需要自己解析字节流，我们可以通过`bytes`获得字节流，但是，如果我们知道对应的编码，则可以通过`text_with_charset`方法来解码。

```go
use reqwest::Result;


#[tokio::main]
async fn main() -> Result<()>{
    let url = "https://youerning.top";

    let resp = reqwest::Client::new()
        .get(url)
        .send()
        .await?;

    println!("resp content: {}", resp.text_with_charset("utf8").await?);
    Ok(())
}
```



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



