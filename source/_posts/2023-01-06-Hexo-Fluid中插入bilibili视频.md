---
title: Hexo Fluid中插入bilibili视频
categories:
  - Dev
tags:
  - Hexo
abbrlink: 4654962b
date: 2023-01-06 12:27:30
index_img:
---

<!-- more -->
<!-- categories:Dev、Ops、Study、Sth、News、work-->
<!-- tags: 
Python、MySQL、LeetCode、机器学习、Linux、Big Data、Java、BlockChain、Docker、Web 、分布式、
Maven、数据结构、JVM、JavaScript、Crontab、Shell、Ubuntu、VPN、NodeJS、String、VM、Hadoop、
Life、树莓派、Git、Hexo、算法、运维、网络、看法、电影、美学、写作、哲学、文档、绘画、前端、
历史、政治、社会、导购
 -->
用过`hexo-tag-dplayer`、`hexo-tag-mmedia`等插件，前者界面很丑且配置项繁杂，后者与`markdown`语法有冲突，只能单独放置无法添加其他文本。当然，二者的共同点就是都已经停止维护，联系到开发者就让自己二开。所以干脆使用原生的`iframe`方式插入视频。

在B站视频页面分享按钮点击复制嵌入代码，即可获取视频外链

![](https://blog-cnd-1307088890.cos.ap-guangzhou.myqcloud.com/202301061225362.png)

复制到的代码是这样子的

```
<iframe src="//player.bilibili.com/player.html?aid=564630517&bvid=BV1ov4y1B7pm&cid=947156387&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>
```

如果直接拿去放到页面里，视频窗口会很小，也很丑。所以根据Hexo官网的视频案例布局进行美化，直接将原本代码中的`src`值替换进去，然后将如下代码放置进`markdown`即可。


```
{% raw %}
<div style="position: relative; width: 100%; height: 0; padding-bottom: 75%;">
<iframe src="//player.bilibili.com/player.html?aid=564630517&bvid=BV1ov4y1B7pm&cid=947156387&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" style="position: absolute; width: 100%; height: 100%; Left: 0; top: 0;" ></iframe></div>
{% endraw %}
```

效果如下图所示：
![](https://blog-cnd-1307088890.cos.ap-guangzhou.myqcloud.com/202301061233355.png)



