## gRPC

> gRPC是一个高性能、通用的开源RPC框架，其由Google主要面向移动应用开发并基于HTTP/2协议标准而设计，基于ProtoBuf（Protocol Buffers）序列化协议开发，且支持众多开发语言（Python、Golang、JavaScript、C、C++等）。
>
> gRPC提供了一种简单的方法来精确的定义服务和为IOS\Android和后台支持发我自动生成可靠性很强的客户端功能库。客户端充分利用高级流和连接功能，从而有助于节省带宽、降低的TCP连接次数，节省CPU使用和电池寿命。

```bash
pip install grpcio grpcio-tools protobuf
```



### grpc与restful的对比

|             | gRPC                         | REST                            |
| ----------- | ---------------------------- | ------------------------------- |
| Full Name   | Google Remote Procedure Call | REpresentational State Transfer |
| Payload     | Prorobuf                     | JSON(typically)                 |
|             | Unreadable Binary Data       | Readable Data                   |
| HTTP        | HTTP/2                       | HTTP 1.1/HTTP 2                 |
| Performance | Fasster                      |                                 |
|             | Type Safe                    |                                 |
|             | Cross Language               | Cross Language                  |
|             | Need setup a client          | No need to setup a client       |
|             | Any function                 | GET/PUT/DELETE/POST             |





### Ptotobuf

> protobuf(Google Protocol Buffers)是谷歌提供的一个具有高效的协议数据交换格式工具库（类似Json），但相比于Json，Protobuf由更高的转化效率，时间效率和空间效率都是JSON的3-5倍
>
> 具有跨语言性：python、javascript、golang、java等



把proto文件转为py和grpc py文件

```bash
python -m grpc_tools.protoc -I. --python_out=. --grpc_python_out=. hello.proto
```

```protobuf
syntax = "proto3";

package hello;

//服务
service Hello {
    rpc SayHello (HelloRequest) returns (HelloReply) {}
}

//消息
message HelloRequest {
    string name = 1;
    int32 age = 2;
}
message HelloReply {
    string message = 1;
}
```



简单服务

```python
from concurrent import futures

import grpc

import hello_pb2 as pb2
import hello_pb2_grpc as pb2c


class Hello(pb2c.HelloServicer):
    def SayHello(self, request, context):
        return pb2.HelloReply(
            message='hello {} {}'.format(request.name, request.age))


def run():
    grpc_server = grpc.server(
        futures.ThreadPoolExecutor(max_workers=4)
    )
    pb2c.add_HelloServicer_to_server(Hello(), grpc_server)
    grpc_server.add_insecure_port('0.0.0.0:5000')
    print('start server 0.0.0.0:5000')
    grpc_server.start()
    grpc_server.wait_for_termination(3600)


if __name__ == '__main__':
    run()
```



客户端

```python
import grpc

import hello_pb2 as pb2
import hello_pb2_grpc as pb2c


def run():
    channel = grpc.insecure_channel('127.0.0.1:5000')
    client = pb2c.HelloStub(channel=channel)
    res = client.SayHello(pb2.HelloRequest(name='world', age=18))
    print(res.message)


if __name__ == '__main__':
    run()
```















