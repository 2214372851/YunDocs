# Git

Git 是一种去中心化的版本管理软件

## 简记

### 配置

设置全局配置

```bash
git config --global user.name "[name]"
git config --global user.email "[email]" 
```

### 开始使用

创建 git 存储库

`git init`

克隆现有的 git 存储库

`git clone [url]`

### 提交

提交所有跟踪的更改

`git commit -am "[msg]"`

向上次提交添加新的修改

`git commit --amend --no-edit`

更改最后提交的消息

`git commit --amend`

撤销最近的提交并保留更改

`git reset HEAD~1`

撤销N个最近的提交并保留更改

`git reset HEAD~N`

撤销最近的提交并摆脱更改

`git reset HEAD~1 --hard`

将峰值重置为远程状态

```bash
git fetch origin
git reset --hard origin/[branch-name]
```

### 其它

见本地master分支重命名为main

`git branch -m master main`

## Git Message 标识

消息格式：`git commit -m "[标识]：message"`

feat: 新功能增加

fix: 修复问题/BUG

style: 代码风格相关无影响运行结果的

perf: 优化/性能提升

refactor: 重构

revert: 撤销修改

test: 测试相关

docs: 文档/注释

chore: 依赖更新/脚手架配置修改等

workflow: 工作流改进

ci: 持续集成

types: 类型定义文件更改

wip: 开发中

## GitHub Actions

> 持续集成由很多操作组成，比如抓取代码、运行测试、登录远程服务器，发布到第三方服务等等。GitHub 把这些操作就称为 actions。
>
> 很多操作在不同项目里面是类似的，完全可以共享。GitHub 注意到了这一点，想出了一个很妙的点子，允许开发者把每个操作写成独立的脚本文件，存放到代码仓库，使得其他开发者可以引用。
>
> 如果你需要某个 action，不必自己写复杂的脚本，直接引用他人写好的 action 即可，整个持续集成过程，就变成了一个 actions 的组合。这就是 GitHub Actions 最特别的地方。



### 基本概念

- workflow（工作流程）：持续集成一次运行的过程，就是一个workflow
- job（任务）：一个workflow由多个jobs构成，含义是一次持续集成的运行，可以完成多个任务
- step（步骤）：每个job由多个step构成，一步步完成
- action（动作）：每个step可以一次运行一个或多个命令（action）



### workflow 文件

> GitHub Actions 的配置文件叫做 workflow 文件，存放在代码仓库的`.github/workflows`目录。
>
> workflow 文件采用 [YAML 格式](https://www.ruanyifeng.com/blog/2016/07/yaml.html)，文件名可以任意取，但是后缀名统一为`.yml`，比如`foo.yml`。一个库可以有多个 workflow 文件。GitHub 只要发现`.github/workflows`目录里面有`.yml`文件，就会自动运行该文件。
>
> workflow 文件的配置字段非常多，详见[官方文档](https://help.github.com/en/articles/workflow-syntax-for-github-actions)。



#### 基本字段

- `name`：是workflow的名称，如果忽略默认为workflow的文件名

  `name: Python package`

- `on`：字段指定触发workflow的条件，可以由多个事件组成，可指定分支等

  ```yaml
  on:
    push:
      branches:
        - master
    pull_request:
      branches:
        - master
  ```

  完整的事件列表，请查看[官方文档](https://help.github.com/en/articles/events-that-trigger-workflows)。除了代码库事件，GitHub Actions 也支持外部事件触发，或者定时运行。

- `permissions`：需要把构建的产物存到仓库需要配置否则报错

  ```yaml
  permissions:
    contents: write
  ```

- `jobs.<job_id>.name`

  workflow 文件的祖逖是 jobs 字段，表示要执行的一项或多项任务。

  jobs 字段里面，需要写出每一项任务的 job_id， 具体名称自定义。

  jobs里面的name字段是任务说明

  ```yaml
  jobs:
    build-and-release:
    	name: this is info
    build-and-push
    	name: this is push info
  ```

- `jobs.<job_id>.needs`

  needs字段指定当前任务的依赖关系，即运行顺序

  ```yaml
  jobs:
    job1:
    job2:
      needs: job1
    job3:
      needs: [job1, job2]
  ```

  job1 必须先于 job2 完成，而 job3 需要等待 job1 和 job2 的完成才能运行。

- `jobs.<job_id>.runs-on`

  runs-on 字段指定运行所需要的虚拟机环境，他是必填字段，目前可用的虚拟机

  可用的 Workflow Label 请查看 [官方文档](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idruns-on)

  ```yaml
  runs-on: ubuntu-latest
  ```

- `jobs.<job_id>.steps`

  steps 字段指定每个 Job 的运行步骤，可以包含一个或多个步骤，每个步骤都可以指定以下三个字段

  - `jobs.<job_id>.steps.name`：步骤名称。
  - `jobs.<job_id>.steps.run`：该步骤运行的命令或者 action。
  - `jobs.<job_id>.steps.env`：该步骤所需的环境变量。



### 完整示例

> Python Package Build and Release

```yaml
name: Python package

# 当 push或pull_request master分支时触发
on:
  push:
    branches:
      - master
  pull_request:
    branches:
      - master

# 赋予对仓库的写权限
permissions:
  contents: write

# 构建任务
jobs:
	# 指定 job_id
  build-and-release:
  	# 选择构建时的虚拟机环境
    runs-on: ubuntu-latest
    # 矩阵策略允许您在单个作业定义中使用变量来自动创建基于变量组合的多个作业运行
    # 在矩阵中，定义一个或多个变量，后跟一组值。{python-version:3.10, os: ubuntu-latest}
    strategy:
    	# 默认为 true 只要有错误就会取消矩阵中所有正在进行的和排队的作业（如果矩阵中有任何作业）失败
      fail-fast: false
      matrix:
      	# 变量名
        python-version: [ "3.10" ]
	
	# 构建步骤
    steps:
    	# 检查代码
      - name: Checkout code
        uses: actions/checkout@v2
		
		# 构建指定版本 python
      - name: Set up Python
        uses: actions/setup-python@v3
        with:
          python-version: ${{ matrix.python-version }}
		
		# 安装 poetry 工具
      - name: Install Poetry
        run: |
          python -m pip install poetry
		
		# 读取当前版本号，并加1进行小版本的自动迭代
      - name: Bump version
        run: |
          # 读取当前版本号
          CURRENT_VERSION=$(poetry version --short)
          # 版本号递增逻辑，这里以递增补丁号为例
          NEW_VERSION=$(echo $CURRENT_VERSION | awk -F. '{print $1 "." $2 "." ($3+1)}')
          # 更新pyproject.toml中的版本号
          poetry version $NEW_VERSION
          echo "New version is $NEW_VERSION"
          # 将新版本号保存为环境变量，用于后续操作，不设置后面无法使用
          echo "NEW_VERSION=$NEW_VERSION" >> $GITHUB_ENV

		# 将上面 poetry 版本更新的toml文件提交到当前GitHub仓库
      - name: Commit and push version bump
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git commit -am "Bump version to $NEW_VERSION [skip ci]"
          git push origin HEAD:master
		
		# 安装相关依赖
      - name: Install dependencies
        run: |
          poetry install
		
		# 构建Python Package
      - name: Build Package
        run: |
          poetry build
		
		# 打印 ./dist 下的所有文件
      - name: List dist directory
        run: |
          ls -la ./dist

		# 创建 Github 的 Release 版本
      - name: Create GitHub Release
        if: github.event_name != 'pull_request'
        uses: actions/create-release@v1
        id: create_release
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          tag_name: v${{ env.NEW_VERSION }}
          release_name: Release v${{ env.NEW_VERSION }}
          draft: false
          prerelease: false
		
		# 上传 Package 至 Release
      - name: Upload Release Asset
        if: github.event_name != 'pull_request'
        # 选择要作为作业步骤的一部分运行的操作。操作是可重用的代码单元。
        # 您可以使用在与工作流相同的存储库、公共存储库或已发布的 Docker 容器映像中定义的操作
        uses: actions/upload-release-asset@v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          upload_url: ${{ steps.create_release.outputs.upload_url }}
          asset_path: ./dist/naive-${{ env.NEW_VERSION }}-py3-none-any.whl
          asset_name: naive-${{ env.NEW_VERSION }}-py3-none-any.whl
          asset_content_type: application/zip
```











