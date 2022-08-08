---
title: Ubuntu无法升级Nodejs
date: 2022-08-06 20:52:03
tags:
---

<!-- more -->

apt-get默认下载的是8.10版本的NodeJS，顺带npm的版本同样是3.xx，常规升级后提示 installed 已安装新版本，但node -v后发现仍然是旧版本。这是是因为新下载的node在其他位置，因此只需注意更改变量位置或添加新位置到profile即可。

 

错误提示：

```
error：The engine node is incompatible with this module. Expected version ^6.14.0 || ^8.10.0 || >=9.10.0. Got 9.5.0y　
```

意思很明显，版本不匹配

 

更新node版本：

清除npm缓存：npm cache clean -f

安装n模块：npm install -g n

安装官方稳定版本：n stable

安装最新官方版本：n latest

安装某个指定版本：n 11.6.0

查看已安装的node版本: n

查看当前node版本：node -v

删除指定版本：n rm 7.5.0

指定版本执行脚本：n use 7.5.0 index.js

发现当前版本不是最新的版本，然后已经安装有了最新的版本，造成不生效的原因：

node默认的安装目录与使用管理工具n安装的目录不一致

解决方法：

查看当前node安装路径：which node

我的当前安装路径是：/usr/local/Cellar/node/9.5.0/bin/node

而 n 默认安装路径是 /usr/local，需要通过通过N_PREFIX变量来修改 n 的默认node安装路径。

![](https://raw.githubusercontent.com/YuanZhou314/PicRepo/main/imgs/20220806205242.png)

 

编辑环境配置文件：vim ~/.bash_profile

修改node安装位置：在末尾增加export PATH=/usr/local/bin:$PATH shift+:wq 保存退出

让新配置生效：socuce ~/.bash_profile

重新安装稳定版本：n stable

查看当前node版本：node -v (已经是最新的稳定版本了)
