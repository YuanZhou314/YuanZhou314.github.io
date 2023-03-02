---
title: Xshell莫名出现的Connection closed by foreign host
categories:
  - Ops
tags:
  - 运维
abbrlink: befbb4c2
date: 2023-01-09 10:48:20
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
今早打开xshell发现怎么都连不上机器，我还以为又是腾讯云抽风了，去官网登录正常的，用手机的 termius 登录也是正常。这就奇了怪了，只有xshell登不上，那就可能是xshell的问题

```
[C:\~]$ 

Connecting to xxxxxxxxx:xx...
Connection established.
To escape to local shell, press Ctrl+Alt+].
Connection closing...Socket close.

Connection closed by foreign host.

Disconnected from remote host(tencent) at 09:49:55.

Type `help' to learn how to use Xshell prompt.

```

`Connection closed by foreign host.`指的是连接关闭，跟安全组、防火墙啥的没有关系。这是由于原来Xshell连接到服务器的22端口，当客户端突然断开时，服务器端的TCP连接就处于一个半打开状态，当下一次同一个客户机再次建立TCP连接时，服务器检测到这个半打开的连接，想客户机传回了一个置为RST的TCP报文，客户机就会显示`Connection closed by foreign host.`，这是TCP协议本身的保护机制，并不是错误，只要再次重新连接服务器就可以连接上了。

我的操作是在客户机上重启wifi、拔插网线，然后就可以重新连接了。如果你的服务器没跑什么程序的话，kill端口或者重启服务器也是可以的。在平时使用xshell等软件的时候，建议先exit之后再关闭软件，这样才是正确的流程。

注：还有一种可能是输入的错误密码次数过多，导致服务器的ssh将IP拉黑了。也可以顺便检查一下该文件是否存在本机IP，有的话就删掉，没有就`:q!`退出

```
sudo vim /etc/hosts.deny
```


