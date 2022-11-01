---
title: Linux通过sed&grep批量查找替换字符串
categories:
  - Ops
tags:
  - Linux
  - Shell
index_img: 'https://blog-cnd-1307088890.cos.ap-guangzhou.myqcloud.com/sed.jpg'
abbrlink: d4d4abf9
date: 2022-08-11 17:39:23
---
sed+grep配合使用即可实现。当然还有更多方式，例如find搭配perl、awk等，自己摸索吧
<!-- more -->
<!-- categories:Dev、Ops、Study、Sth、News-->
<!-- tags: 
Python、MySQL、LeetCode、机器学习、Linux、Big Data、Java、BlockChain、Docker、Web 、分布式、
Maven、数据结构、JVM、JavaScript、Crontab、Shell、Ubuntu、VPN、NodeJS、String、VM、Hadoop、
Life、树莓派、Git、Hexo
 -->
**警告：本文记录的修改方式将直接修改原文件，请做好文件备份！！！！！**



#### 格式：

```
sed -i "s/oldstring/newstring/g" `grep oldstring -rl yourdir`
sed -i "s/查找字段/替换字段/g" `grep 查找字段 -rl 路径`  
或者
grep -tl yourdir | xargs sed -i "s/oldstring/newstring/g"
grep -rl 查找字段  路径|xargs sed -i "s/查找字段/替换字段/g" 
```

#### 背景

最初搭建Hexo时，为了图省事就在github上开了一个图床，由于公司内网浏览github畅通无阻，因此丝毫没有感觉有什么问题。直到女朋友有一天打开了我的网站，发现所有图片都无法加载出来，事实上移动端数据流量访问时都会加载失败，不知道是github在墙外还是什么原因，反正就是用不了。所以需要考虑换个新图床，等腾讯云的对象存储配置好后，就需要批量将原有的文章内的图片链接更换成腾讯云的访问链接。



#### 场景

文章在同一文件夹下，且全部为.md格式。单个文件内有多个旧图片链接，需要批量将整个文件夹下、所有文件内的旧链接换成新链接。

```
旧链接：raw.githubusercontent.com/YuanZhou314/PicRepo/main/imgs

新链接：xxx-xxx-1234567890.cos.ap-xxxxxxxx.myqcloud.com
```



#### 解决

```
sed -i "s#raw.githubusercontent.com/YuanZhou314/PicRepo/main/imgs#xxx-xxx-1234567890.cos.ap-xxxxxxxx.myqcloud.com#g" `grep -rl .`
```

#### 命令解读

* sed -i 表示直接编辑匹配到的文件

* s 是替换命令，也是sed中最常见的命令

* \# 这里的井号是分隔符，一般情况下的分隔符是用`/` 斜杠，但是这里因为替换的是地址（带斜杠），如果用斜杠作为分隔符的话需要特殊处理，因此直接换成用井号。（分隔符可以是任意字符，只是一般都用`/`）

* 两个新旧字符串的中间，同样需要用分隔符\#隔开

* g 代表全局替换，默认情况sed是逐行读取文件，且只更改行中第一次出现的匹配项，加g会所有匹配项都被替换

* grep -rl .  按目录递归查找匹配项，你可以先用这个命令查一下，是否全部匹配到你所需要修改的文件。


