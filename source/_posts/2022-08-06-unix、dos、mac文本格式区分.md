---
title: unix、dos、mac文本格式区分
tags: String
categories: Study
abbrlink: c3c62a73
date: 2022-08-06 20:03:35
---

<!-- more -->

如果开发的环境是unix、dos并存，那么一定会碰到文本格式的问题。比如dos环境中（win下的notepad++）编辑的脚本文件传输到linux上，行尾会多出来一个^M，导致脚本在linux上无法运行，这就是fileformat的问题。由于历史原因，unix、dos、mac三家系统采用的是不同的行结束符，unix是\n，windows是复古的\r\n（也不是所有windows上编辑的都是dos），mac则是\r，避免方法如下：

- 在vim命令模式下，输入:set ff=unix
- 在vimrc中添加一行，set fileformat=unix,dos

举例：

- 从服务器上下载来的日志文件，用UltraEdit打开会显示是否转换成dos格式
- 有时候在notepad++上打开的文本，后面行尾会有黑色方块

 这里也不需要扯太深，往深了说的得扯到字节的传输模式了，我们只需要知主流三种系统对行尾符有不同的解释，在不同的平台上打开会出现哪些问题、以及怎么解决就可以了
