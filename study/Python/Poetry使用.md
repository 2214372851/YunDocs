# Poetry 使用指南

> Poetry 类似 rust crago 现代化的包管理器，唯一的缺陷是目前不能对 python 版本进行管理



## 新建项目(`poetry init`)

通过 `poetry new project-name` 命令可以在当前文件夹下创建一个基础项目，基础项目包括：

- `pyproject.toml`
- `project-name`
- `test`

> 此时并不会为你创建虚拟环境，还需要手动处理



## 初始化项目(`poetry init`)

在现有的项目中使用 `poetry` 进行包管理，可以通过 `poetry init` 命令在当前文件夹中创建包管理配置工具

> 不会帮助你创建虚拟环境，它仅仅是创建一个 `pyproject.toml` 用来描述你的项目而已



## 虚拟环境(`poetry env`)

### `poetry env use PYTHONPATH`

使用 `poetry env use PYTHONPATH` 命令创建虚拟环境。

```
# in windows
poetry env use C:\Python310\python.exe
```



### `poetry env list`

poetry 比 pipenv 要强的是，可以使用 `poetry env use PYTHONPATH` 为一个项目创建多个不同的虚拟环境。

通过 `poetry env list` 可以查看当前项目所有的虚拟环境，增加 `--full-path` 可以看到虚拟环境所在的完整路径。

一般在 VSCode、PyCharm 中会自动识别环境。



### `poetry install & update`

与 `pipenv install` 和 `pipenv update` 行为完全一致的愚蠢不同的是，poetry 的 install 和 update 真的做到了字面上的意思，install 就是安装所有的依赖，update 就是升级所有依赖，并且 update 真的可以指定一个包做到只更新它。

```shell
# 安装**所有的**依赖
# 如果没有虚拟环境，将会自动使用当前 Python 环境安装一个
poetry install
# 仅安装非 development 环境的依赖，一般部署时使用
poetry install --no-dev
```



## `poetry add & remove`

与 npm 相同，poetry 增加/删除依赖使用 `add/remove` 命令。

为 `add` 命令增加 `--dev` 选项，可以把库标记为 `development`，当使用 `poetry install --no-dev` 时，不会安装它们。



## `poetry shell & run`

与 pipenv 相同，`poetry shell` 可以在 shell 中激活当前虚拟环境；`poetry run` 可以直接在当前虚拟环境中运行命令。



## `poetry build & publish`

poetry 是一个全面的包管理器，即可以管理别人，也可以管理自己。

以下是我第一个使用 poetry 发布 pypi 包的项目——[websocks](https://github.com/abersheeran/websocks) 中的配置。

```toml
[tool.poetry]
name = "websocks"
version = "0.1.9"
description = "A websocket-based socks5 proxy."
readme = "README.md"
authors = ["abersheeran <me@abersheeran.com>"]
license = "MIT"

homepage = "https://github.com/abersheeran/websocks"
repository = "https://github.com/abersheeran/websocks"
documentation = "https://github.com/abersheeran/websocks/wiki"
classifiers=[
    "Programming Language :: Python :: 3.6",
    "Programming Language :: Python :: 3.7",
    "Programming Language :: Python :: Implementation :: CPython",
    "Programming Language :: Python :: Implementation :: PyPy",
]

packages = [
    { include = "websocks" },
]

[tool.poetry.scripts]
websocks =  'websocks.commands:main'
```

写过 `setup.py` 的人都会明白以上配置的含义，在此不做赘述。它的意义在于，我们再也不用写该死的 `setup.py` 了，一个 `pyproject.toml` 文件即可。

使用 `poetry build` 可以把项目打包成一个 `.whl` 文件用于安装。

然后可以使用 `poetry publish` 发布到 pypi 上，如果你不想执行两条命令，那么可以把 `poetry build; poetry publish` 合并成一条 `poetry publish --build`，这将做出同样的行为——先打包，后发布。



## `poetry config`

`poetry config` 允许配置一些 poetry 的默认行为。

譬如：`poetry config virtualenvs.in-project true` 可以设置**虚拟环境默认安装到项目**的 `.venv` 目录里。

`poetry config virtualenvs.create false --local` 在部署时先使用这个命令可以使所有的包安装到系统中，而不是虚拟环境里。



## 使用 PyPi 镜像

由于网络原因，部分地区使用默认的 PyPi 源可能效果不佳。通过在 `pyproject.toml` 中配置源可以使 poetry 从指定的 PyPi 镜像中拉取代码。注意 `default = true` 是必须的，否则 poetry 仍然会从默认源拉取哈希值。

```toml
[[tool.poetry.source]]
name = "tsinghua"
default = true
url = "https://pypi.tuna.tsinghua.edu.cn/simple"
```