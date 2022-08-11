---
title: Springboot 测试类没有找到bean注入
date: 2022-08-06 18:44:56
tags: Java
categories: Dev

---

<!-- more -->

其他乱七八糟配置就不扯了，先上项目结构图

![](https://raw.githubusercontent.com/YuanZhou314/PicRepo/main/imgs/20220806184436.png)

 

 配置好参数后我再src/test/java类测试访问数据库时发现bean没有正确的注入。值得注意的是，这个项目的启动类是叫App.java

所以我们必须在这个测试类上面加上注解：

```
@RunWith(SpringRunner.class)
@SpringBootTest(classes = App.class) 
```

注意：SpringBoot(classes = App.class) classes后面跟的是启动类的class，千万不要随便抄网上的配置，写一些Application.class之类的，这种Application之类的类名和一些官方包里的类名一样，容易引入错误的包。

刚开始发现这个问题疯狂去网上看别人的配置文件是怎么写的，试了一天都没用，后来静下心来，把错误信息copy出来文本里仔细看

![复制代码](https://common.cnblogs.com/images/copycode.gif)

```
org.springframework.beans.factory.UnsatisfiedDependencyException:
 Error creating bean with name 'com.springboot.LibrarySystem.mapper.UserMapperTest':
 Unsatisfied dependency expressed through field 'userMapper'; 
 nested exception is org.springframework.beans.factory.NoSuchBeanDefinitionException:
 No qualifying bean of type 'com.sb.LibrarySystem.mapper.UserMapper' 
 available: expected at least 1 bean which qualifies as autowire candidate. 
 Dependency annotations: {@org.springframework.beans.factory.annotation.Autowired(required=true)}
```

![复制代码](https://common.cnblogs.com/images/copycode.gif)

还是从这个Test类下手

本来我的类是这样的：

```
@RunWith(SpringRunner.class)
@SpringBootTest(classes = Application.class)
public class UserMapperTest {

}
```

修改后就是这样,和我的启动类的类名是一致的：

```
@RunWith(SpringRunner.class)
@SpringBootTest(classes = App.class)
public class UserMapperTest {
```

完美解决！

如果百度的时候，发现查看的问题越来越深，越来越偏离最开始的问题，那十有八九是方向偏了，重新整理一下，重新开始吧
