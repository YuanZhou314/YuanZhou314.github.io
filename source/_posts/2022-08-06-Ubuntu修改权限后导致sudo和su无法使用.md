---
title: Ubuntu修改权限后导致sudo和su无法使用
date: 2022-08-06 20:29:41
tags:
---

<!-- more -->

## 问题

由于ubuntu默认开机后随机密码，所以一般装好系统后第一件事就是sudo passwd root，这次没有修改给忘记了，好死不死又把权限整出来有问题，一用sudo就提示如下：

```
sudo: /etc/sudoers is owned by uid 1000, should be 0
sudo: no valid sudoers sources found, quitting
sudo: unable to initialize policy plugin
```

这种也很好解决，正常情况直接修改sudoer文件的权限即可，但我又不是root用户，切换不过去。我直接麻了。犯了很久终于翻到一个9年前的帖子，情况和我一摸一样，原帖在这儿，有兴趣可以看一下：

https://blog.csdn.net/weixin_33991418/article/details/93206334

 

如果不用这种方式，还可以用ubuntu光盘引导系统，mount对应的磁盘修改/etc/sudoers文件。或者直接重装一遍，也不需要太久……

## 解决方案

重启ubuntu，启动时按esc或shift，进入引导项

![](https://raw.githubusercontent.com/YuanZhou314/PicRepo/main/imgs/20220806203018.png)

 

 

选择第二个，再选择第二个 recrovery mode，开机程序走完之后，进入Recovery Menu页面 ，选择root，回车

![](https://raw.githubusercontent.com/YuanZhou314/PicRepo/main/imgs/20220806203031.png)

 

 

回车后下面提示再按回车，再按一下，就能看到熟悉的 root@user ~#了

![](https://raw.githubusercontent.com/YuanZhou314/PicRepo/main/imgs/20220806203041.png)

 

 

到这儿了就可以开始干正事儿了，把提示之前的问题给解决掉：

```
pkexec chown root:root /etc/sudoers /etc/sudoers.d -R
```

![](https://raw.githubusercontent.com/YuanZhou314/PicRepo/main/imgs/20220806203125.png)

 

 

回车，然后重启Ubuntu即可正常修改root密码了

![](https://raw.githubusercontent.com/YuanZhou314/PicRepo/main/imgs/20220806203149.png)

 

 如果还有朋友上面这行代码解决不了，可以尝试如下方法，将sudoers.d文件夹的权限设置成root用户和root组，root组只有执行的权限，只有root用户有写入的权限：

```
chown -R root:root /etc/sudoers.d
chmod u=rwx,g=rx,o=rx /etc/sudoers.d/
chmod u=r,g=r,o= /etc/sudoers.d/*
```
