---
title: 原地TP——SSH连接本机windows子系统的Ubantu
date: 2022-08-06 20:22:49
tags: 
- Ubuntu
- Linux
categories: Dev
---

<!-- more -->

首先需要开启一个子系统，先在控制面板-程序-启用或关闭windows功能，勾选适用于Linux的Windows子系统

 ![](https://raw.githubusercontent.com/YuanZhou314/PicRepo/main/imgs/20220806202319.png)

 

 

然后在Windows自带的微软商店中搜索Ubantu下载，就那个400多MB的，下载好后需要重启电脑，重启后打开dos，输入bash……这就不多说了，详细百度即可。这里重点说连接的事儿。因为在dos上用linux实在太伤眼了，也很麻烦。

 

首先把apt更新一下，不然后面会让你绝望（不要不信邪，亲测）

 

更新前先换个源，源文件：/etc/apt/sources.list ，可以先备份下原来的源，防止后面要用

```
sudo cp /etc/apt/sources.list /etc/apt/sources.list.bak
```

 

然后打开/etc/apt/sources.list，可以将其他源注释掉，并添加以下源

```
#添加阿里源
deb http://mirrors.aliyun.com/ubuntu/ focal main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ focal main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ focal-security main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ focal-security main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ focal-updates main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ focal-updates main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ focal-proposed main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ focal-proposed main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ focal-backports main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ focal-backports main restricted universe multiverse
#添加清华源
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-updates main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-updates main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-backports main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-backports main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-security main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-security main restricted universe multiverse multiverse
```

 

先更新下源，如果出现依赖问题，可以`sudo apt-get -f install 解决`

```
sudo apt-get update
```

 

然后就可以更新软件了

```
sudo apt-get upgrade
```

 

环境清理结束，开始干活。把默认的ssh删掉先，别问我为什么要删，咱也不知道，咱也不敢问（实际上应该是不需要删除的，别人测过）。询问Y/n时，选择Y，按回车

```
sudo apt-get remove --purge openssh-server
```

 

然后重新安装ssh

```
sudo apt-get install openssh-server ssh 
```

 

启动ssh，这时候电脑会提示防火墙啥的，申请联网，点击允许即可

```
sudo service ssh --full-restart 
```

 

 

这样就OK了，现在可以使用ssh工具连接你的子系统了。但是！由于每次连接子系统时都是手动调用的 System/bash.exe，每次电脑开机重启后进程就会结束，所以需要为电脑设置一个开机自启的定时任务。

 

打开win键搜索任务计划程序，右上角点击创建基本任务

![](https://raw.githubusercontent.com/YuanZhou314/PicRepo/main/imgs/20220806202348.png)

 

 

 

 名称就写ssh自启，下一步选择每次计算机启动时触发。操作选择启动程序。在程序或脚本里填写：

```
%windir%\System32\bash.exe
```

 

下方的参数一栏填写：

```
-c "echo 你的linux密码|sudo -S /etc/init.d/ssh restart"
```

然后点击完成。然后在计划库中找到刚才新增的任务，右键选择属性

![](https://raw.githubusercontent.com/YuanZhou314/PicRepo/main/imgs/20220806202402.png)

 

 

 

这里一定要选择“不管用户是否登录都要运行”，这才是真正的开机自启。它默认是选择“只在用户登录时运行”，看起来没有什么区别，但每个人电脑环境不太一样，看别人只会开机时弹出黑色窗口，但我的电脑却压根不会自启。因此最好是选择到这个位置。

![](https://raw.githubusercontent.com/YuanZhou314/PicRepo/main/imgs/20220806202412.png)

 

 

 最后重启电脑，开机后直接打开ssh工具连接本机linux，就可以啦
