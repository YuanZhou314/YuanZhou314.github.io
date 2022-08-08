---
title: Ubuntu22.04桌面版配置Clash for Linux
date: 2022-08-06 20:44:20
tags:
---

<!-- more -->

近来将电脑的windows换成了Ubuntu桌面版，第一件事自然是挂上tizi。查了一下通用做法就是配置Clash，这里也留个记录，供需要的同学参考。

 

## 下载安装

去github仓库下载最新版本即可:https://github.com/Dreamacro/clash/releases

注意系统架构，我这里下的是clash-freebsd-amd64-v3-v1.11.0.gz

![](https://raw.githubusercontent.com/YuanZhou314/PicRepo/main/imgs/20220806204455.png)

 

到gz包的下载目录去解压，将解压出来的文件放在/usr/local/bin/下，改名为clash

```
gunzip clash-linux-amd64-v1.7.1.gz``mv` `clash-linux-amd64-v1.7.1 ``/usr/local/bin/clash
```

　　

先赋个权，再直接执行clash

```
chmod +x clash

clash
```

　　

如此稍等一会儿，重新打开一个终端，查看一下~/.config/clash这个目录是否生成了下面3个文件。这其中config.yaml和Country.db是我们需要配置的。这三个文件如果已经生成，则上面的clash进程可以暂时关掉了。后面配置好了yaml再重新启动

![](https://raw.githubusercontent.com/YuanZhou314/PicRepo/main/imgs/20220806204526.png)

 

##  配置yaml

 

重点来了，来到~/.config/clash目录下， 准备好订阅链接，然后执行下载clash配置文件的操作。这2个操作执行后，会有进度条显示，并且最后是完成的状态。

这个步骤有任何提示错误都代表不对的。另外，还有一种情况就是有的人开启了代理，网络不通，这里自然也就不通。因此这两步一定要确保网络是正常的

```
wget -O config.yaml [订阅链接]``wget -O Country.mmdb https:``//www``.sub-speeder.com``/client-download/Country``.mmdb

```

注意，这里的订阅链接**不是直接用各个平台给的那种通用的**（或者是酸酸乳ssr用的），而是**需要转换**一下。

普通的订阅链接经过浏览器打开后是显示一串字符串，这种一般是酸酸乳用的，而这里clash需要的配置文件是yaml格式，这种格式有点类似json，是键值对格式的。所以很多人直接在这里直接用ssr用的，后面执行clash -d的时候就会提示下面这样的错误

```
FATA[0000] Parse config error: yaml: unmarshal errors: line 1: cannot unmarshal !!str `c3M6Ly9...` into config.RawConfig
```

目前我所了解的情况是，通过在线订阅转换工具，例如下面的 http://www.flyjiang.cn/ 来转换Clash类型的订阅地址。

![](https://raw.githubusercontent.com/YuanZhou314/PicRepo/main/imgs/20220806204540.png)

 

 

 

将平台给的地址粘贴在订阅链接的框框里，类型选择Clash，点击生成订阅链接，定制订阅里会生成一个长链，这个链我试了一下不能用。因此再点击生成短链接，在订阅短链那一栏就会生成一条短链，把它拿到地址栏用浏览器访问一下，如下图所示，会发现这就是一个yaml格式的文件，因此我们需要的就是这玩意儿。

把这个短链拿到上面步骤去，生成yaml配置文件。（不用复制网页内容，直接用wget下载即可）

![](https://raw.githubusercontent.com/YuanZhou314/PicRepo/main/imgs/20220806204559.png)

 

 重新回到/usr/local/bin/下面，根据配置文件执行clash

```
clash -d ~/.config/clash/
```

此时执行成功的话会产生大量的类似刚才浏览器访问短链的实时日志，在访问互联网的过程中也会一直产生日志，这个是正常的。这个进程所在的终端也不要关闭，关闭了就没法用的。然后，据说访问http://clash.razord.top/#/proxies 可以查看节点情况、测试延迟等等，但设置了密码后还是不能登录，就没有再测试了

##  系统设置

打开系统设置，选择网络，点击网络代理右边的设置按钮，选择手动，填写 HTTP 和 HTTPS 代理为 0.0.0.0:7890，填写 Socks 主机为 0.0.0.0:7891，即可启用系统代理。启用后尝试一下访问网站，应该就可以用了

 

注意：clash进程和网络代理同时开启，才可以正常上网。如果clash开启但网络代理关闭，则无法使用，甚至连正常的网络都没法打开，这一点蛮坑的，所以最好设置clash开机自启，不然会比较麻烦

![](https://raw.githubusercontent.com/YuanZhou314/PicRepo/main/imgs/20220806204633.png)

但是开启自启我搞了半天也没搞好，查看clash的状态的时候也是没有启动、失败的，有经验的朋友也可以留言告知一下，不胜感激
