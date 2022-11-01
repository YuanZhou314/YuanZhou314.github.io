---
title: linux下普通用户无法使用yum，提示需root用户
tags: Linux
categories: Ops
abbrlink: '91527534'
date: 2022-08-06 20:21:32
---

<!-- more -->

使用root 用户用 vi 或 vim 编辑/etc/sudoers文件，找到 "root ALL=(ALL) ALL"一栏，在下一行填写：

```
user ALL=(root) NOPASSWORD:yum *
```

然后按：wq!完成编辑。注意这里要用到 ! 强制保存，如果不用的话会提示这是一个readonly文件，不支持修改。

上面语句的作用是：

![](https://blog-cnd-1307088890.cos.ap-guangzhou.myqcloud.com/20220806202154.png)

 
