---
title: Windows dos下Mysql中文乱码
date: 2022-08-06 17:35:12
tags:
---
在dos客户端输出窗口中查询表中的数据,还有项目部署到服务器上时前台的页面，中文数据都显示成乱码…………

<!-- more -->
在dos客户端输出窗口中查询表中的数据,还有项目部署到服务器上时前台的页面，中文数据都显示成乱码，如下图所示：

![](https://raw.githubusercontent.com/YuanZhou314/PicRepo/main/imgs/20220806173201.png)

 

这个问题困扰了我一天，后来解决了才发现原来我的方向错了，一直我以为是SpringBoot项目的原因，因为之前我已经检查过数据库这边的字符集问题，把所有字符集更改成utf8,包括这个character-set-result=utf8,如下图：

![](https://raw.githubusercontent.com/YuanZhou314/PicRepo/main/imgs/20220806173640.png)

结果后来仔细一查才发现，原来我的win7默认使用字符集是GB2312，所以在输出窗口使用的字符集不是UTF8而是GB2312，更改后如下图：

![](https://raw.githubusercontent.com/YuanZhou314/PicRepo/main/imgs/20220806173708.png)

注：网上有人问再次打开又回到原来的编码，这个我重启项目还没有碰到，依旧是可以显示中文。实在不行可以把设置字符集的那段命令写入my.ini文件中去（重启生效）

说到底还是个菜鸡，欢迎交流

 

知识补充：

GB2312是GBK的子集，是简体中文的码。GBK是包含中日韩大字符集合，支持简体和繁体

UTF-8包含大部分文字的编码，支持几乎所有字符
