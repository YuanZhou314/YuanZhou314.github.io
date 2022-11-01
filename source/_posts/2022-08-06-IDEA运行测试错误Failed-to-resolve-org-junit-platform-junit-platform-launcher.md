---
title: 'IDEA运行测试错误Failed to resolve org.junit.platform:junit-platform-launcher'
tags:
  - Java
categories:
  - Dev
abbrlink: d601b667
date: 2022-08-06 19:28:37
---

<!-- more -->

问题原因：
这里的问题是IntelliJ试图在不使用IDE中配置的Maven“用户设置文件”(settings.xml)的情况下解决所需的工件本身。它将直接连接到Maven Central，但被我的雇主屏蔽了

解决方案在pom文件添加：

```
<dependency>
 <!-- this is needed or IntelliJ gives junit.jar or junit-platform-launcher:1.3.2 not found errors -->
            <groupId>org.junit.platform</groupId>
            <artifactId>junit-platform-launcher</artifactId>
            <scope>test</scope>
</dependency>
```

 
