---
title: 将Waline评论系统由Vercel部署变更为独立部署
categories:
  - Dev
tags:
  - Hexo
  - Fluid
index_img: >-
  https://blog-cnd-1307088890.cos.ap-guangzhou.myqcloud.com/download-16601251561781.png
abbrlink: de4d5635
date: 2022-09-27 12:27:43
---

<!-- more -->
<!-- categories:Dev、Ops、Study、Sth、News、work-->
<!-- tags: 
Python、MySQL、LeetCode、机器学习、Linux、Big Data、Java、BlockChain、Docker、Web 、分布式、
Maven、数据结构、JVM、JavaScript、Crontab、Shell、Ubuntu、VPN、NodeJS、String、VM、Hadoop、
Life、树莓派、Git、Hexo、算法、运维、网络、看法、电影、美学、写作、哲学、文档、绘画、前端、
历史、政治、社会、
 -->
本来想看一下最近评论系统的后台是否有评论，自从建站以来也有上千的访问量，多少能有点留言吧。没想到一看吓一跳，挂载vercel的评论项目直接打不开了。我以为是vercel出了问了，于是将vercel上的项目删掉重新搭建了一遍，但仍然没有作用。

### 检查

项目详情页显示了预览页面，说明项目在正常启动运行。

![](https://blog-cnd-1307088890.cos.ap-guangzhou.myqcloud.com/image-20220921174009881.png)

但点击访问无法打开页面

![](https://blog-cnd-1307088890.cos.ap-guangzhou.myqcloud.com/image-20220921174156739.png)

于是跑去友链另外一位朋友的评论系统，发现是正常的（当然不排除他是非官方的部署模式）。于是我用手机挂上梯子访问一下，果然是正常的。但是注册和登录页面无法访问，我猜可能是最近的梯子不太稳



![](https://blog-cnd-1307088890.cos.ap-guangzhou.myqcloud.com/image-20220921174849398.png)

问题到这里似乎无解了，但之前并不是这样的，部署好系统之后可以自行访问，网站的代码托管在github，前端配置好链接直接获取就好，相当于之前也是在国内访问的。那么唯一的解释就是网络或者封锁IP之类的原因，再查看一下[vercel官方状态页面](https://www.vercel-status.com/)，9月19号有一次DNS延迟问题，但这个事件显示已经解决了。

![](https://blog-cnd-1307088890.cos.ap-guangzhou.myqcloud.com/image-20220921180001490.png)

### 发现问题

突然想起来有网站可以检测网络，随手打开看了下……整个就是大无语。

![](https://blog-cnd-1307088890.cos.ap-guangzhou.myqcloud.com/image-20220921180538836.png)

然后想了想终归部署在国外还是比较虚，还不如就放在自己机器，缺点就是到时候云服务器到期了迁移数据可能会有问题。但比起服务无法访问，还是值得冒险一试的。

### 替换方案

Waline官网评论区已经有很多人在吐槽最近vercel的问题，直接看[独立部署](https://waline.js.org/guide/server/vps-deploy.html)。docker不太熟的可以往下翻，评论区有人分享了[一键部署方式](https://www.tj520.top/views/articles/back-end/waline-service.html#%E6%96%B9%E6%A1%88%E4%BA%8C-%E5%BC%BA%E7%83%88%E6%8E%A8%E8%8D%90)，看起来很多人部署成功了，尝试一下里面的方案二。



![](https://blog-cnd-1307088890.cos.ap-guangzhou.myqcloud.com/image-20220927115531247.png)

注意

* 这个教程是需要自己创建数据库并且初始化，这些步骤官网文档都有，因此只是一句带过。按照文档一步步来就没错。

* 使用时建议把node版本升级到16或者以上，我在12时使用这个方法搞了半天再发现是版本问题，最后用nvm切换了node版本才成功。

* 如果存在多个node环境，注意 sudo 模式下可能会切换node版本导致上面的问题。

执行如下代码：

```
# 安装nvm，如果下不来就多试几次
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

# 刷新下bashrc
source ~/.bashrc

# 查看mvn是否安装成功
nvm -h 

# 安装指定版本node
nvm install 16.17.0

# 切换node
nvm use 16

# 查看下node版本,前面没出错的话就ok了
node -v
```



重新跑一下项目

![](https://blog-cnd-1307088890.cos.ap-guangzhou.myqcloud.com/image-20220927120547770.png)

然后访问，默认端口是8360，如果是云服务器需要去安全组开端口，否则无法访问。

![](https://blog-cnd-1307088890.cos.ap-guangzhou.myqcloud.com/image-20220927120647226.png)

### 恢复使用

访问`http://IP:8360/ui/register `注册，登录后访问`http://IP:8360/ui/`查看后台评论

![](https://blog-cnd-1307088890.cos.ap-guangzhou.myqcloud.com/image-20220927121611870.png)



在Hexo的配置中，只要把主题配置文件中原先的vercel链接替换成新的访问地址即可

即xxx.vercel.app改成新的访问地址

Ps: 直接用IP+端口可能有安全风险, 可以在将本地启动的waline-service通过二级域名映射到外网。在腾讯云域名解析处即可配置
![](https://blog-cnd-1307088890.cos.ap-guangzhou.myqcloud.com/image-20220928175104583.png)

Ps：可能还需要设置一下nginx，but我之前配置了nginx、ssl之类的都没有成功,还搞出来跨域的问题。后来重新配置了个二级域名之后突然就可以了。原理我也懒得追究了，有机会后面再复盘一下。
9.29更新：
在短暂地允许访问后，由于域名没有备案，又重新关闭了。现在的情况就是：
* 使用二级域名，但没备份无法访问
* 使用IP+端口，不安全且跨域，同样无法访问
懒得折腾了，没有什么意义，等二十大过去之后vercel应该会恢复。
