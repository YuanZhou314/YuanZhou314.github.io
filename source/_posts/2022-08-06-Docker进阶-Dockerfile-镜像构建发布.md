---
title: Docker进阶-Dockerfile-镜像构建发布
date: 2022-08-06 20:04:28
tags: Docker
index_img: https://blog-cnd-1307088890.cos.ap-guangzhou.myqcloud.com/docke1.png
categories: Ops
---

<!-- more -->

## Dockerfile的组成

构建docker镜像的文件，命令+参数+脚本

步骤

1. 编写一个dockerfile文件
2. docker build 构建成一个镜像
3. docker run运行镜像
4. docker push发布镜像至DockerHub或阿里云镜像仓库

 

官方做法：在dockerHub中随意点击一个镜像的版本，就会跳转至github的DockerFile目录，如cengtos7显示如下：

```
FROM scratch 
 
 
ADD centos-7-x86_64-docker.tar.xz /
 
LABEL \
 
org.label-schema.schema-version="1.0" \
 
org.label-schema.name="CentOS Base Image" \
 
org.label-schema.vendor="CentOS" \
 
org.label-schema.license="GPLv2" \
 
org.label-schema.build-date="20201113" \
 
org.opencontainers.image.title="CentOS Base Image" \
 
org.opencontainers.image.vendor="CentOS" \
 
org.opencontainers.image.licenses="GPL-2.0-only" \
 
org.opencontainers.image.created="2020-11-13 00:00:00+00:00"
 
 
CMD ["/bin/bash"]
```

 

官方的镜像一般是基础包，只要能跑起来即可，很多功能是没有的，所以一般都是自己搭建镜像（使用docker指令）

实际工作中，docker镜像甚至是交付的标准，项目做好之后必须打包成docker镜像来交付：

原则：

- 指令是大写字母
- 执行顺序从上至下，每个指令都会创建提交一个新的镜像层

![](https://blog-cnd-1307088890.cos.ap-guangzhou.myqcloud.com/20220806200522.png)

 

 

Dockerfile：构建文件，定义了一切的步骤，源代码

DockerImages：通过Dockerfile构建生成的镜像，最终发布和运行的产品

Docker容器：镜像运行起来提供服务器

 

## Docker指令

![](https://blog-cnd-1307088890.cos.ap-guangzhou.myqcloud.com/20220806200538.png)

 

 



```
FROM           #基础镜像，一切从这里开始构建
MAINTAINER     #镜像的署名和联系方式
RUN            #镜像构建时需要运行的命令
ADD            #添加内容，源文件可以是相对路径，可以是url，特可以是tar.gz文件（会自动解压）
WORKDIR        #镜像的工作目录
VOLUME         #挂载的目录
EXPOSE         #保留端口配置，开启后外部无需使用-p
CMD            #指定这个容器启动的时候要运行的命令，只有最后一个会生效，可被替代
ENTRYPOINT     #指定这个容器启动的时候要运行的命令，可以追加命令
ONBUILD        #当构建一个被继承 DockerFile 这个时候就会运行ONBUILD的指令 ，触发指令
COPY           #类似ADD，将文件拷贝至镜像中，格式：COPY 源目标 目的目标。多个命令使用&&拼接
ENV            #构建的时候设置环境变量
```



**备注：CMD与ENTRYPOINT的区别**

当一个镜像使用CMD指定容器启动后运行的命令时，只有最后一个会真实生效，并且当从外部启动时新增了额外的命令时，CMD的命令会被替代。如：构建镜像时使用了CMD ['ls', '-a']，启动容器后会自动打印当前目录列表，但如果启动时额外加了参数 -l，这时的-l并不会和ls -a合并成新命令，而是替代ls -a作为新命令。但-l并非完整命令，所以当容器启动时就会报错

![](https://blog-cnd-1307088890.cos.ap-guangzhou.myqcloud.com/20220806200655.png)

 

 当一个镜像使用ENTRYPOINT指定容器启动后运行的命令时，在外部启动容器时可以追加命令，拿上面的例子说，如果构建时使用ENTRYPOINT ['ls', '-a']，外部启动时额外加了-l，则这里的-l会和镜像自带的ls -a 合并成完整命令ls -al 

![](https://blog-cnd-1307088890.cos.ap-guangzhou.myqcloud.com/20220806200708.png)

 

 

## 配置带vim 和ifconfig的CentOS

手动配置镜像，一般从scratch 开始（dockerhub中99%的镜像从这个基础镜像过来的）。手动配置之前，可以用**docker history**命令查看其他镜像的构建步骤：

![](https://blog-cnd-1307088890.cos.ap-guangzhou.myqcloud.com/20220806200810.png)

 

 

 编辑Dockerfie文件

```
[root@VM-0-7-centos dockerfile]# vim centos-yz #这里的centos-yz如果写成Dockerfile，则编译时无需-f寻找编译文件，会自动寻找
FROM centos
MAINTAINER zhouyinlin<1909423593@qq.com>
ENV MYPATH /root/
WORKDIR $MYPATH
#构建时运行的命令
RUN yum -y install vim
RUN yum -y install net-tools
#打开端口
EXPOSE 80

CMD $PATH
CMD echo "------------------end-------------------"
CMD /bin/bash
[root@VM-0-7-centos dockerfile]# docker build -f centos-yz -t centos-yz:1.0 . #开始构建
```

 

构建后进入新的CentOS，发现vim和ifconfig都有了

```
[root@VM-0-7-centos dockerfile]# docker images
REPOSITORY            TAG       IMAGE ID       CREATED          SIZE
centos-yz             1.0       a2f9e606e2c5   15 seconds ago   322MB
 
[root@VM-0-7-centos dockerfile]# docker run -it centos-yz:1.0
[root@4103126b11ae ~]# vim
[root@4103126b11ae ~]# ifconfig
eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 172.18.0.2  netmask 255.255.0.0  broadcast 172.18.255.255
        ether 02:42:ac:12:00:02  txqueuelen 0  (Ethernet)
        RX packets 8  bytes 656 (656.0 B)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 0  bytes 0 (0.0 B)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
 
 
lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536
        inet 127.0.0.1  netmask 255.0.0.0
        loop  txqueuelen 1000  (Local Loopback)
        RX packets 0  bytes 0 (0.0 B)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 0  bytes 0 (0.0 B)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
 
[root@4103126b11ae ~]#
```

## 配置自带Tomcat的镜像，且允许从外部部署项目

编辑Dockerfile文件

```
FROM centos
MAINTAINER ZHOUYINGLIN<1909423593@QQ.COM>


COPY readme.txt /usr/local/readme.txt #阅读文档

#将压缩包和jdk添加到镜像
ADD apache-tomcat-9.0.22.tar.gz /usr/local  
ADD jdk-8u151-linux-x64.tar.gz /usr/local


RUN yum -y install vim

#配置工作目录和路径
ENV MYPATH /usr/local
WORKDIR $MYPATH

#配置相关的环境变量
ENV JAVA_HOME /usr/local/jdk1.8.0_151
ENV CLASSPATH $JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar
ENV CATALINA_HOME /usr/local/apache-tomcat-9.0.22
ENV CATALINA_BASH /usr/local/apache-tomcat-9.0.22
ENV PATH $PATH:$JAVA_HOME/bin:$CATALINA_HOME/lib:$CATALINA_HOME/bin

#开放端口
EXPOSE 8080

#镜像运行时，就启动tomcat，并写入日志
CMD /usr/local/apache-tomcat-9.0.22/bin/startup.sh && tail -F /usr/local/apache-tomcat-9.0.22/logs/catalina.out
```

 

构建镜像并启动容器

```
docker build -tdiytomcat . #这里由于dockerfile名叫：Dockerfile，因此无需再加-f 但注意后面的点，表示是当前目录的

#开放宿主机的9090端口映射至容器的8080端口，挂载两个目录：1.项目目录 2.日志存放目录
#宿主机的tomcat/project映射到webapps下的test目录，test项目下所有文件都可以从外部部署进去
docker run -d -p 9090:8080 --name newtomcat -v /root/dockerfile/tomcat/project:/usr/local/apache-tomcat-9.0.22/webapps/test -v /root/dockerfile/tomcat/logs:/usr/local/apache-tomcat-9.0.22/logs diytomcat
```

 

目前为止，就可以正常的在宿主机或者外部网络访问到tomcat的主页啦。项目就弄一个简单的网页就好了，再以IP:port/项目名就可以访问项目主页了

 

新建项目

```
在宿主机的project下新建WEB-INF等目录、文件，层级如下：
project
    WEB-INFO
        web.xml
    index.jsp
```

 

文件描述

```
web.xml

<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee
                      http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
         version="4.0"
         metadata-complete="true">
</web-app>
```

**index.jsp**

 

<%@ page language="java" contentType="text/html; charset=UTF-8"

  pageEncoding="UTF-8"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html>

<head>

<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<title>new tomcat</title>

</head>

<body>

​    恭喜，web项目已经搭建完成。

</body>

</html>

 

## 发布镜像至DockerHub

发布镜像到dockerHub上，首先要做的事应该是登录。如果没有登录过，那么需要先注册账号：https://hub.docker.com/ 。登录好之后才可以提交镜像，docker中的登录的帮助文档长这样：



```
[root@VM-0-7-centos project]# docker login --help


Usage:  docker login [OPTIONS] [SERVER]


Log in to a Docker registry.
If no server is specified, the default is defined by the daemon.


Options:
  -p, --password string   Password
      --password-stdin    Take the password from stdin
  -u, --username string   Username
```

 

登录好之后，就可以使用docker push提交镜像

```
[root@VM-0-7-centos ~]# docker push diytomcat
Using default tag: latest
The push refers to repository [docker.io/library/diytomcat]
ffb151e67a73: Preparing
23127db07fa3: Preparing
1e438b048a4f: Preparing
328e77a13569: Preparing
74ddd0ec08fa: Preparing
denied: requested access to the resource is denied  #提示拒绝
```

 

这里有一个提示错误，因为是我们的push格式有错误。所以不会上去的。正确的命令格式应该是先将做好的镜像使用tag命令规范命名

```
#格式：用户名/镜像名:版本号。创建完后会出现一个一样的镜像
[root@VM-0-7-centos ~]# docker tag diytomcat zhouyinglin/diytomcat:v1
[root@VM-0-7-centos ~]# docker images
REPOSITORY              TAG       IMAGE ID       CREATED         SIZE
diytomcat               latest    50316eed1aeb   5 hours ago     695MB
zhouyinglin/diytomcat   v1        50316eed1aeb   5 hours ago     695MB
```

 

接着我们就可以正常使用push命令了。云服务器的小水管虽然慢，但毕竟是阿里的网，也是能够上传完的，本地网络的话就有可能传不上去，毕竟DockerHub是国外的

```
[root@VM-0-7-centos ~]# docker push zhouyinglin/diytomcat:v1
The push refers to repository [docker.io/zhouyinglin/diytomcat]
ffb151e67a73: Pushing [=====================>                             ]  26.99MB/64MB
23127db07fa3: Pushing [=>                                                 ]  10.98MB/384.4MB
1e438b048a4f: Pushing [==================================================>]  15.41MB/15.41MB
328e77a13569: Pushing [==================================================>]  3.072kB
74ddd0ec08fa: Pushing [=====>                                             ]  23.48MB/231.3MB
```

 

 

## 发布镜像至阿里云镜像仓库

登录阿里云仓库：https://cr.console.aliyun.com/cn-hangzhou/instance/repositories

 

创建命名空间

![](https://blog-cnd-1307088890.cos.ap-guangzhou.myqcloud.com/20220806201034.png)

 

 

创建容器镜像

![](https://blog-cnd-1307088890.cos.ap-guangzhou.myqcloud.com/20220806201046.png)

 

 

查看仓库面板

 

仓库地址：

![](https://blog-cnd-1307088890.cos.ap-guangzhou.myqcloud.com/20220806201101.png)

 

官方push流程

![](https://blog-cnd-1307088890.cos.ap-guangzhou.myqcloud.com/20220806201113.png)

 

 

这里其实只要注意一个点就行了，就是需要将自己的镜像按照阿里云的操作流程，修改tag

在DockerHub中，tag一般修改成DockerHub用户名/镜像名:版本号

在阿里云中，tag要求修改成docker tag [ImageId] [registry.cn-hangzhou.aliyuncs.com/yz-zhouyinglin/resp](http://registry.cn-hangzhou.aliyuncs.com/yz-zhouyinglin/resp) : 版本号

```
[root@VM-0-7-centos ~]# docker tag 50316eed1aeb registry.cn-hangzhou.aliyuncs.com/yz-zhouyinglin/resp:v1
[root@VM-0-7-centos ~]# docker images
REPOSITORY                                              TAG       IMAGE ID       CREATED         SIZE
diytomcat                                               latest    50316eed1aeb   6 hours ago     695MB
registry.cn-hangzhou.aliyuncs.com/yz-zhouyinglin/resp   v1        50316eed1aeb   6 hours ago     695MB
```

 

修改之后才可以进行push，当然也是速度很慢，毕竟是学生机小水管

```
[root@VM-0-7-centos ~]# docker push registry.cn-hangzhou.aliyuncs.com/yz-zhouyinglin/resp:v1
The push refers to repository [registry.cn-hangzhou.aliyuncs.com/yz-zhouyinglin/resp]
ffb151e67a73: Pushing [===========================================>       ]  55.78MB/64MB
23127db07fa3: Pushing [========>                                          ]  64.83MB/384.4MB
ffb151e67a73: Pushed
23127db07fa3: Pushing [==========>                                        ]  77.64MB/384.4MB
74ddd0ec08fa: Pushing [=================>                                 ]  78.85MB/231.3MB
74ddd0ec08fa: Pushing [===================>                               ]  90.89MB/231.3MB
```

 

push结束

```
[root@VM-0-7-centos ~]# docker push registry.cn-hangzhou.aliyuncs.com/yz-zhouyinglin/resp:v1
The push refers to repository [registry.cn-hangzhou.aliyuncs.com/yz-zhouyinglin/resp]
ffb151e67a73: Pushing [===========================================>       ]  55.78MB/64MB
23127db07fa3: Pushing [========>                                          ]  64.83MB/384.4MB
ffb151e67a73: Pushed 
23127db07fa3: Pushing [==================================================>]  385.7MB
1e438b048a4f: Pushed 
23127db07fa3: Pushed 
v1: digest: sha256:a08b7a9ba95cb7cc624975f07d2fb4b686f316d1ae319cc557f2ce71291c7c26 size: 1373
```

 

在阿里云的版本页面可以看到push 上来的镜像

![](https://blog-cnd-1307088890.cos.ap-guangzhou.myqcloud.com/20220806201143.png)

 

 

-------------------------------------------Docker入门结束--------------------------------------------

![](https://blog-cnd-1307088890.cos.ap-guangzhou.myqcloud.com/20220806201204.png)

 

