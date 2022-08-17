---
title: Hexo框架Fluid主题使用hexo-tag-aplayer组件播放网易云音乐
categories:
  - Dev
tags:
  - Hexo
  - Life
date: 2022-08-09 23:38:52
index_img: 
---
Aplayer是一个非常好看、简洁而优雅的音乐播放器，配置起来也不繁杂，但是其中也有一些坑，这里记录一下。
<!-- more -->
<!-- categories:Dev、Ops、Study、Sth、News-->
<!-- tags: 
Python、MySQL、LeetCode、机器学习、Linux、Big Data、Java、BlockChain、Docker、Web 、分布式、
Maven、数据结构、JVM、JavaScript、Crontab、Shell、Ubuntu、VPN、NodeJS、String、VM、Hadoop、
Life、树莓派、Git、Hexo
 -->
<img src="https://blog-cnd-1307088890.cos.ap-guangzhou.myqcloud.com/image-20220809223028790.png"/>

环境为Ubuntu，nodeJS版本12.0.0，npm版本6.9.0，hexo版本5.4.2



#### 安装Aplayer

cd到博客根目录，执行

```bash
npm install --save hexo-tag-aplayer
```



此时`node_module`文件夹会多出来一个aplayer文件夹

```
ubuntu@VM-0-7-ubuntu:~/blog$ ls node_modules/ | grep aplayer
aplayer
hexo-tag-aplayer
```

![](https://blog-cnd-1307088890.cos.ap-guangzhou.myqcloud.com/image-20220809224238027.png)



将dist文件夹复制一份到主题目录文件下的source文件夹下

（**注意后面我所说的source文件夹都指的是主题目录下的**）

![](https://blog-cnd-1307088890.cos.ap-guangzhou.myqcloud.com/image-20220809224433775.png)



#### 配置Aplayer

在source/js下新建一个amusic.js（自定义），手动配置Aplayer。audio中就是配置歌曲，参数的信息在官网找就好了，有中文很好找。

```
const ap = new APlayer({
    container: document.getElementById('aplayer'),
    fixed: true,
	  autoplay: false, //关闭自动播放
    audio: [
	{
        name: '',
        artist: '',
        url: '',
        cover: '',
        lrc: '',
    }, 
	]
});


```

这里需要手动填写的内容有：

name-歌曲名

artist-歌手名

url-歌曲链接

cover-歌曲封面

lrc-歌词



#### 快链

歌曲链接是不能直接用官网的链接，需要使用外链。拿网易云音乐为例

例如：《特别的人》 歌手：方大同

网址是https://music.163.com/#/song?id=28403111，它的ID是28403111

那么这首歌的外链就是http://music.163.com/song/media/outer/url?id=28403111.mp3

也就是说外链的下载规则为：http://music.163.com/song/media/outer/url?id=数字ID.mp3

但要注意的是，网易云VIP单曲似乎不提供外链……

我自己一般网易云没有的话就直接Google去搜，锁着找一些专门提供快链的网站，http://music.xf1433.com/ 这个是我白天的时候用的，但不知道为啥晚上回家打不开了……离谱

还有一个快链来源：打开chrome控制台-Network,播放音乐后选择筛选media类型的URL，就可以了。

快链直接复制封面图片的地址，填写即可

#### 歌词

歌词在官网有介绍三种插入方式，LRC、JS、HTML，后2种代码怼上去太繁杂了，直接拒绝。LRC我没有尝试成功，在别的网站那里找到另一种方式，如下：

LRC文件即歌词文件，格式一般是时间轴+歌词

```
[ti:不得不爱] 
[ar:潘玮柏] 
[al:高手] 
[BY:] 
[00:01.985]www.gecimao.com★QQ122121036 
[00:29.023]天天都需要你爱 
[00:31.605]我的心思由你猜 
[00:34.306]I love you 
[00:35.675]我就是要你让我每天都精彩 
[00:40.959]天天把它挂嘴边 
[00:43.541]到底什么是真爱 
[00:46.367]I love you  
……………
```

我的做法是在网上找到这种格式的文本（搜索歌名+lrc 或者找专门的网站），直接复制下来，然后在我的ubuntu上touch一个文件，vim编辑好，注意一下编码是UTF-8。

配置文件中的lrc字段，其实只要是可以访问当的lrc文件就可以了，因此可以直接将lrc文件上传至github，通过域名能够访问到即可：

把在source下创建一个lrcs目录，将所有的LRC文件丢进去

![](https://blog-cnd-1307088890.cos.ap-guangzhou.myqcloud.com/image-20220809231716929.png)

歌词放在这个位置，部署后通过域名+/lrcs/xxx.lrc就可以访问到了，同时amusic.js文件配置好对应位置即可

（补充）需要注意的是，歌词默认展示的位置是底部居中，会遮挡一部分文字，最底部的统计也会被遮挡。至于怎么修改这个地方，我还没有去研究，知道的同学可以留言说一下。

展示一下我的

```
const ap = new APlayer({
    container: document.getElementById('aplayer'),
    fixed: true,
	  autoplay: false, //自动播放
    audio: [
	{
        name: '特别的人',
        artist: '方大同',
        url: 'http://music.163.com/song/media/outer/url?id=28403111.mp3',
        cover: 'https://p1.music.126.net/RTB72JJJapo01l4XfVDAWQ==/109951166349819975.jpg',
        lrc: 'https://zhouyinglin.cn/lrcs/特别的人.lrc',
    },
        {
        name: '身骑白马',
        artist: '徐佳莹',
        url: 'http://music.163.com/song/media/outer/url?id=5233038.mp3',
        cover: 'http://p2.music.126.net/jSLMqcE_Yq27rRKDNrRKcA==/109951163187407183.jpg',
        lrc: 'https://zhouyinglin.cn/lrcs/身骑白马.lrc',
    },
	]
});
```



#### 添加到页面

由于fluid主题中留有footer的位置，这里也是一些小组件首选放置之地

![](https://blog-cnd-1307088890.cos.ap-guangzhou.myqcloud.com/image-20220809230845547.png)

```html
<link rel="stylesheet" href="/dist/APlayer.min.css">
<div id="aplayer"></div>
<script type="text/javascript" src="/dist/APlayer.min.js"></script>
<script type="text/javascript" src="/js/diy/music.js"></script>
```

注意这里的id需要与amusic.js中的getElementById填的ID相同，确认好之后部署。



![image-20220809233230726](https://blog-cnd-1307088890.cos.ap-guangzhou.myqcloud.com/image-20220809233230726.png)
