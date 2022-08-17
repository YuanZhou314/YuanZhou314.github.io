---
title: Hexo部署Github Pages自定义域名失效问题
categories:
  - Dev
tags:
  - Hexo
date: 2022-08-09 10:26:39
index_img: https://blog-cnd-1307088890.cos.ap-guangzhou.myqcloud.com/download.png
---

<!-- more -->
<!-- categories:Dev、Ops、Study、Sth、News-->
<!-- tags: 
Python、MySQL、LeetCode、机器学习、Linux、Big Data、Java、BlockChain、Docker、Web 、分布式、
Maven、数据结构、JVM、JavaScript、Crontab、Shell、Ubuntu、VPN、NodeJS、String、VM、Hadoop、
Life、树莓派、Git、Hexo
 -->
在博客目录/source/下添加一个CNAME文件，填入自己的域名（不包含https、www这些），然后重新渲染、部署。过几分钟github仓库设置中会自动填充域名并生效。

注意：我的CNAME文件是在Linux上touch出来无后缀文件，格式保证绝对正确。而Win&Mac上有的文件的后缀是隐藏的，这点需要注意。

如果该方法失效，可以再次删除后再次新建一个重新试试。

```
cd blog/source  #进入source目录
touch CNAME		#新建文件
vim CNAME		#编辑文件
```


