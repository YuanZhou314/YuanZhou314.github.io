---
title: Hexo-Fluid利用Waline实现微信/PushDeer评论推送
categories:
  - Dev
tags:
  - Hexo
  - Fluid
index_img: >-
  https://blog-cnd-1307088890.cos.ap-guangzhou.myqcloud.com/download-16601251561781.png
abbrlink: f445341f
date: 2022-08-10 23:20:32
---

<!-- more -->
<!-- categories:Dev、Ops、Study、Sth、News-->
<!-- tags: 
Python、MySQL、LeetCode、机器学习、Linux、Big Data、Java、BlockChain、Docker、Web 、分布式、
Maven、数据结构、JVM、JavaScript、Crontab、Shell、Ubuntu、VPN、NodeJS、String、VM、Hadoop、
Life、树莓派、Git、Hexo
 -->
本文参照[Waline官方文档](https://waline.js.org/guide/server/notification.html)，当网站有用户发布评论或者用户回复评论时，Waline支持对博主和回复评论作者进行通知。通知方式包括QQ、微信、邮件等。

#### 推送配置

我最开始是想走邮件的，但由于即时性不高就放弃了，转为用微信。对于配置微信通知，Waline官网指引去[Server酱](https://sct.ftqq.com/)提供的推送服务。

![](https://blog-cnd-1307088890.cos.ap-guangzhou.myqcloud.com/image-20220810230512312.png)



回到Waline官网的要求，可以发现SC_KEY是能在Server酱上找到的，其他三个都是自定义的。

| 变量           | 描述                                                         |
| -------------- | ------------------------------------------------------------ |
| `SC_KEY`       | Server 酱提供的 Token，即Server酱的【Key&API】>【SendKey】，点击复制即可。 |
| `AUTHOR_EMAIL` | 博主邮箱，用来区分发布的评论是否是博主本身发布的。如果是则不进行提醒通知。（补充：博主回复必须要手动填邮箱才不会被通知） |
| `SITE_NAME`    | 网站名称，如：博客。                                         |
| `SITE_URL`     | 网站地址，如：https://zhouyinglin.cn  最后不加/              |



将以上内容（变量+值）填写到[vercel](https://vercel.com/)的设置>环境变量中

![](https://blog-cnd-1307088890.cos.ap-guangzhou.myqcloud.com/image-20220810225550230.png)



填写后重新部署一遍。

![](https://blog-cnd-1307088890.cos.ap-guangzhou.myqcloud.com/image-20220810225723023.png)

重新部署后Server_URL会改变，所以需要修改一下Fluid主题配置文件中配置Server_URL的两个地方，我的另一篇[文章](https://zhouyinglin.cn/2022/08/10/Hexo-Fluid-主题添加-Waline-评论系统/#HTML-引入-客户端)有提到修改位置，修改配置文件后重新部署到Github。

#### Server酱推送

然后来看推送服务这边。由于登录Server酱的时候扫码关注了公众号，所以这里我们可以直接点保存>发送测试

![](https://blog-cnd-1307088890.cos.ap-guangzhou.myqcloud.com/image-20220810230352735.png)

你的微信就会收到一条公众号消息。

<img src="https://blog-cnd-1307088890.cos.ap-guangzhou.myqcloud.com/IMG_9591.jpg" style="zoom: 33%;" />

点击进入，长这样：

<img src="https://blog-cnd-1307088890.cos.ap-guangzhou.myqcloud.com/IMG_F4B4DF536CAB-1.jpeg" style="zoom:33%;" />

实际上这种方式并不合理，如果是网页评论，它会直接返回一段html代码给你。而且Server酱官网也提到使用微信推送有弃用风险，推荐使用[PushDeer](http://www.pushdeer.com)。（我推荐IPhone用户使用。安卓用的是一个App。IOS用的是轻App，使用感受良好。）

用相机扫描这个任意一个轻App码就可以打开了，我用的是自架版，二者的区别我也没明白，有兴趣的同学可以留言告知一下。

![](https://blog-cnd-1307088890.cos.ap-guangzhou.myqcloud.com/image-20220810231308063.png)

在轻App中绑定自己的设备后，复制自己的Key，粘贴到Server酱的这个页面，保存后测试一下。

![](https://blog-cnd-1307088890.cos.ap-guangzhou.myqcloud.com/image-20220810231455665.png)

点击发送测试后，手机上就会收到一个轻App的提醒，点击打开查看<img src="https://blog-cnd-1307088890.cos.ap-guangzhou.myqcloud.com/IMG_9595.png" style="zoom:33%;" />

目前来看PushDeer的效果和微信是一样的，都需要跳转页面才能看到推送的消息，只不过微信受腾讯监管，如果推送频繁或被人举报可能会有问题。PushDeer就不担心有什么问题，据我所知pushdeer算是个新鲜玩意儿，关于返回html代码的问题在AppStore评论区也有人提到，相信不久之后会更新的。

最后回到网站打开评论试一下，评论完了就会收到PushDeer的消息啦，如果想切换回微信，就在Server酱上切换即可。
