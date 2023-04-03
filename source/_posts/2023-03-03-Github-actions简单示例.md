---
title: Github-Actions简单示例
categories:
  - Ops
tags:
  - 运维
abbrlink: 4981bfbd
date: 2023-03-03 10:00:48
index_img:
---

<!-- more -->
<!-- categories:Dev、Ops、Study、Sth、News、work-->
<!-- tags: 
Python、MySQL、LeetCode、机器学习、Linux、Big Data、Java、BlockChain、Docker、Web 、分布式、
Maven、数据结构、JVM、JavaScript、Crontab、Shell、Ubuntu、VPN、NodeJS、String、VM、Hadoop、
Life、树莓派、Git、Hexo、算法、运维、网络、看法、电影、美学、写作、哲学、文档、绘画、前端、
历史、政治、社会、导购
 -->
Github Actions是持续集成和持续交付 (CI/CD) 平台，用于自动执行生成、测试和部署管道等，持续集成由很多操作组成，这些操作称之为 actions 。

----

**【补充】**
所谓持续集成，就是通过频繁提交代码代码集成到主分支，让产品快速迭代，并保持高质量。其核心措施就是集成到主分支前必须通过自动化测试，只要有一个测试用例失败，就不能集成。持续集成强调的是返回给开发一个结果，不论失败还是成功。
流程：

1. 代码提交：开发者向仓库提交代码。
2. 测试：仓库对commit操作配置了hook，一旦提交自动开始自动化测试。
3. 构建：通过构建工具将源码转换为可以运行的实际代码，安装依赖、配置资源等。
4. 二次测试：全面测试，以自动化为主，且覆盖率要高。通过二次测试的代码就是可部署的版本
5. 部署：将当前版本所有文件打包存档，发送到生产服务器。
6. 回滚：一旦版本出现问题，就需要回滚到上一个版本的构建结果。

----

由于很多操作在不同项目里是类似的，因此 Github 允许将每个操作写成独立脚本存入仓库，让其他人共享。如果你需要某个 actions ，无需自己写复杂的脚本，直接在自己的 actions 中引入别的 actions ，就可以直接实现该操作。

引用方式
`username/reponame`即可引用一个 actions 。

例如：`actions/setup-node`就表示`github.com/actions/setup-node`这个仓库，它代表一个 action，作用是安装 Node.js。
```
actions/setup-node@74bc508  # 指向一个 commit
actions/setup-node@v1.0     # 指向一个标签
actions/setup-node@master   # 指向一个分支
```

### 基本结构

1. workflow：工作流程。持续集成一次运行的过程，就是一个workflow。

2. job：任务。一个workflow由单个或多个job构成。一次持续集成的运行可以完成多个任务。

3. step：步骤。每个job由多个step构成，一步步完成一个job。

4. action：动作，每个step可以一次执行一个或多个命令

### workflow文件

GitHub Actions 的配置文件叫做 workflow 文件，存放在代码仓库的`.github/workflows/`目录。workflow文件是`yaml`给格式，写成`xxx.yml`。GitHub 只要发现`.github/workflows`目录里面有`.yml`文件，就会自动运行该文件。如下是一个`actions/setup-node`的 workflow 文件(有调整补充)。

该配置会在代码push到github后自动将其部署到githubpage，访问`username.github.io/responame`即可访问页面。

```yaml
name: GitHub Actions Build and Deploy Demo  # workflow 名，没有则默认为当前文件名
on:  # 指定触发 workflow 的字段，允许设置多个值(数组).这里设为通过 push 事件触发的
  push:
    branches:  # 指定触发时，限定分支(或tag标签).这里设为只有master分支触发 push 事件才会触发workflow
      - master
jobs:  # workflow的主体，表示执行一项或多项任务
  build-and-deploy:  # 当前 job 的 job_id
  name: My first job  # 该name是在job层下的，表示任务的说明
  needs: job2  # 指定当前 job 的依赖关系，即运行顺序。这里表示job2先完成后，才能完成当前任务
    runs-on: ubuntu-latest  # 指定运行所需要的虚拟机环境，必填
    steps:  # 每个job包含一个或多个step
    - name: Checkout  # 步骤名称 
      env:   # 当前步骤所需的环境变量
        FIRST_NAME: Mona
        LAST_NAME: Octocat
      uses: actions/checkout@v2  # 调用其他可重用的workflow
      with:
        persist-credentials: false
    - name: Install and Build
      run: |  # 该步骤运行的命令或 action
        npm install
        npm run-script build
    - name: Deploy
      uses: JamesIves/github-pages-deploy-action@releases/v3
      with:  # 当调用其他workflow时，设置该workflow所需的配置或参数
        ACCESS_TOKEN: ${{ secrets.ACCESS_TOKEN }}
        BRANCH: gh-pages
        FOLDER: build
```

字段介绍：https://docs.github.com/zh/actions/using-workflows/workflow-syntax-for-github-actions

触发事件列表：https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows

### 实战：本地Readct项目发布至Github Page

仓库：https://github.com/ruanyf/github-actions-demo

首先生成一个Github密钥，并传入该项目的`Repository secrets`中。

![](https://blog-cnd-1307088890.cos.ap-guangzhou.myqcloud.com/202303021727375.png)

在项目的`package.json`中添加一个`homepage`字段，表示该应用发布后的根目录。修改如下字段

```
"homepage": "https://[username].github.io/[github-actions-demo]",
```

在项目根目录创建`.github/workflow/`，并新建一个`workflow`文件，例如`ci.yml`

```yaml
name: GitHub Actions Build and Deploy Demo
on:
  push:
    branches:
      - master
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout
      uses: actions/checkout@master

    - name: Build and Deploy
      uses: JamesIves/github-pages-deploy-action@master
      env:
        ACCESS_TOKEN: ${{ secrets.ACCESS_TOKEN }}
        BRANCH: gh-pages
        FOLDER: build
        BUILD_SCRIPT: npm install && npm run build
```

保存以上文件，提交至 Github 。Github 发现 workflow文件后就会自动运行，这里可以看到运行日志，日志默认保存30天。等待运行成功后，访问`username.github.io/reponame`访问。

![](https://blog-cnd-1307088890.cos.ap-guangzhou.myqcloud.com/202303021735144.png)

