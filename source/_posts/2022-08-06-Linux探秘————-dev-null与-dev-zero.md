---
title: Linux探秘————/dev/null与/dev/zero
date: 2022-08-06 20:02:15
tags: Linux
categories: Ops
index_img: https://raw.githubusercontent.com/YuanZhou314/PicRepo/main/imgs/old/Linux.jpg
---

<!-- more -->

## /dev目录

/dev目录挂载了linux的所有外部设备，dev意为device，是linux访问外部设备的端口，但没有入口，只能通过挂载的方式访问，在任意一台正常使用的服务器上，/dev下面的文件是很多的，因为linux遵循unix万物皆文件的风格。常见的设备有：

- /dev/hd[a-t]：IDE设备，硬盘
- /dev/sd[a-z]：SCSI设备
- /dev/ram[0-15]内存
- ………

还有很多，剩下不常见的就不一一举例了，也没啥意义，主要介绍俩新奇东西：/dev/null 和 /dev/zero

 

## /dev/null

在类unix系统中，/dev/null称为空设备，是一个特殊的外部设备端口，它丢弃一切写入其中的数据（但写入会提示成功），如果尝试读取它，会立即得到一个EOF。行话称为位桶（bit bucket）或者黑洞（black hole），空设备一般用于丢弃不需要的输出流，或作为输入流的空文件，这些操作一般由重定向完成。如：

cat file意思是输出file内容至标准输出（即终端）

cat file > /dev/null 则输出直接丢失

cat file 2>/dev/null 当file不存在时，也不会报错，因为标准错误输出重定向至位桶了。

 

网上有个例子：cat file 2>/dev/null >/dev/null 可以当做检测文本文件file而存在，但我觉得好像不太管用，因为这相当于不管file是否存在，它都不会报错，那还怎么检测file是否存在呢？还不如直接用find ./-name file

 

## /dev/zero

在类unix系统中，/dev/zero是一个特殊的文件，当你读它的时候，它会提供无线的空字符（null、ascii null、0x00）。其中一个典型的用法就是用它提供的字符流来覆盖信息，另一个用法就是产生一个特定大小的空白文件。

 

OK，上面这段是来自wiki的官方描述，实际上这玩意儿对普通用户真的没有什么作用，说是可以初始化文件，但我尝试用cat /dev/zero > zero.log时发现没几秒种这个文件就被塞进去6个G的乱码，我看了下速度是6.7G/s……吓得我赶紧停掉，后来查了下，正确的用法应该是使用dd命令从/dev/zero里任意大小的块出来：

 

dd if=/dev/zero of=/dev/raw bs=xxx count=xxx 。

bs：输出的块的大小，单位byte，count：块的数量

 

如此，我们再尝试：dd if=/dev/zero of=/home/zero.log bs=1024 count=1 得到的结果就是一个1kb的空文件，cat zero.log不会打印任何内容，vim编辑进去却有很多^@符号，应该是文本格式的原因
