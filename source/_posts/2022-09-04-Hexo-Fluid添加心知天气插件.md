---
title: Hexo-Fluid添加心知天气插件
categories:
  - Dev
tags:
  - Hexo
index_img: >-
  https://blog-cnd-1307088890.cos.ap-guangzhou.myqcloud.com/%E5%A4%A9%E6%B0%94.jpeg
abbrlink: eb18c99
date: 2022-09-04 10:10:55
---

<!-- more -->
<!-- categories:Dev、Ops、Study、Sth、News、work-->
<!-- tags: 
Python、MySQL、LeetCode、机器学习、Linux、Big Data、Java、BlockChain、Docker、Web 、分布式、
Maven、数据结构、JVM、JavaScript、Crontab、Shell、Ubuntu、VPN、NodeJS、String、VM、Hadoop、
Life、树莓派、Git、Hexo、算法、运维、网络、算法、电影、美学、写作、哲学、文档、绘画
 -->
心知天气的UI还是不错的，作为插件的话免费版功能也是够用的。注册一下[心知天气](https://www.seniverse.com/api)然后进入控制台，使用免费版套餐。免费用户可以查看国内370个主要城市天气，包括：

* 天气实况、气象文字、代码和气温
* 未来3天天气预报，晚间天气、最高&最低温温度、风向风速等
* 6项基本生活指数，如穿衣、紫外线强度、运动指数等

需要注意的是，目前的心知天气分为V3和V4两个版本，白嫖用户使用的是老的V3版本。并且不知道什么原因，官网的插件功能并未显示在控制台，我在[官网语雀文档](https://docs.seniverse.com/widget/start/get.html)中找到了相关的描述

![](https://blog-cnd-1307088890.cos.ap-guangzhou.myqcloud.com/image-20220904093749942.png)



点击【新版插件】，进入[生成插件界面](https://www.seniverse.com/widgetv3)，选择你想要的悬浮窗效果

![](https://blog-cnd-1307088890.cos.ap-guangzhou.myqcloud.com/image-20220904093943684.png)



点击生成代码，将JS代码复制。

![](https://blog-cnd-1307088890.cos.ap-guangzhou.myqcloud.com/image-20220904094058305.png)



在`themes/fluid/layout/_partials`目录下新建`weather.ejs`文件，将上面的JS代码复制进去，为了方便控制，我们在前面添加一个逻辑控制，中间的代码可自定义替换。

```javascript
<% if (theme.weather && theme.weather.enable){ %>
<div id="tp-weather-widget"></div>
    <script>
        (function (a, h, g, f, e, d, c, b) { b = function () { d = h.createElement(g); c = h.getElementsByTagName(g)[0]; d.src = e; d.charset = "utf-8"; d.async = 1; c.parentNode.insertBefore(d, c) }; a["SeniverseWeatherWidgetObject"] = f; a[f] || (a[f] = function () { (a[f].q = a[f].q || []).push(arguments) }); a[f].l = +new Date(); if (a.attachEvent) { a.attachEvent("onload", b) } else { a.addEventListener("load", b, false) } }(window, document, "script", "SeniverseWeatherWidget", "//cdn.sencdn.com/widget2/static/js/bundle.js?t=" + parseInt((new Date().getTime() / 100000000).toString(), 10)));
        window.SeniverseWeatherWidget('show', {
            flavor: "slim",
            location: "WKJ1F428HH2F",
            geolocation: true,
            language: "zh-Hans",
            unit: "c",
            theme: "auto",
            token: "5089001e-aa9f-41c5-862d-e416aabf81f7",
            hover: "enabled",
            container: "tp-weather-widget"
        })
    </script>
<% } %>
```



然后进入`themes/fluid/layout/_partials/header`目录，编辑`navigation.ejs`，在此处引入新添加的weather.ejs。

![](https://blog-cnd-1307088890.cos.ap-guangzhou.myqcloud.com/image-20220904095714573.png)



最后在`themes/fluid/_config.yml`文件，添加显示天气的开关。注意添加的位置不能再其他配置之下，应另起一行，注意缩进。

```
 #显示天气
weather:
        enable: ture
```

![](https://blog-cnd-1307088890.cos.ap-guangzhou.myqcloud.com/image-20220904100354308.png)



OK，显示成功！
