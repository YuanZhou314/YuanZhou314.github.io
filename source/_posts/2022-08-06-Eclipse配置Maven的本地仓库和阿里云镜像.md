---
title: Eclipse配置Maven的本地仓库和阿里云镜像
tags:
  - Java
  - Maven
categories:
  - Dev
index_img: 'https://blog-cnd-1307088890.cos.ap-guangzhou.myqcloud.com/maven.jpg'
abbrlink: 3bf8ab6c
date: 2022-08-06 18:43:32
---

<!-- more -->

先确定自己电脑是否安装了Maven和安装位置，具体查询方法直接win+R键打开运行窗口，输入cmd打开dos窗口，再输入mvn -v即可查询安装的位置

![](https://blog-cnd-1307088890.cos.ap-guangzhou.myqcloud.com/20220806184146.png)

 

拿到安装位置 D:\Applications\Work\apache-maven-3.6.1 后打开该位置下的conf文件夹，找到一个叫settings.xml的文件。

将以下代码粘贴至<mirrors>标签内（注：没修改之前，这个标签里的内容是完全注释掉的，将代码粘贴在标签内部即可，不用管原有的内容。注意有两层标签）

```
<mirror>  
        <id>alimaven</id>  
        <name>aliyun maven</name>  
        <url>http://maven.aliyun.com/nexus/content/groups/public/</url>  
        <mirrorOf>central</mirrorOf>          
</mirror> 
```

![](https://blog-cnd-1307088890.cos.ap-guangzhou.myqcloud.com/20220806184214.png)

 

 然后找到<localRepository>标签，将里面的内容修改为你Maven本地仓库即可（可以创建一个新的文件夹），这里我没有修改。

![](https://blog-cnd-1307088890.cos.ap-guangzhou.myqcloud.com/20220806184231.png)

 

 然后是修改Eclipse内的配置Window-Preferences 这里修改是的是maven的地址

![](https://blog-cnd-1307088890.cos.ap-guangzhou.myqcloud.com/20220806184242.png)

 

 然后修改刚才修改过的setting.xml和本地仓库，我的本地仓库由于没有修改，依旧是.m2文件夹

![](https://blog-cnd-1307088890.cos.ap-guangzhou.myqcloud.com/20220806184259.png)

 

 

这样就OK了
