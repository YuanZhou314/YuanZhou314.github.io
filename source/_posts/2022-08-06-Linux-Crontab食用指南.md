---
title: Linux-Crontab食用指南
date: 2022-08-06 19:59:18
tags: 
- Linux
- Crontab
categories: Ops
index_img: https://raw.githubusercontent.com/YuanZhou314/PicRepo/main/imgs/old/Linux.jpg
---

<!-- more -->

## Crontab是啥？

我们先来看看wiki的说法：

![](https://raw.githubusercontent.com/YuanZhou314/PicRepo/main/imgs/20220806195943.png)

 

 

 

再来看看官方（http://crontab.org/）对crontab的定义：

![](https://raw.githubusercontent.com/YuanZhou314/PicRepo/main/imgs/20220806195954.png)

 

 

 大概说明了crontab命令的使用方法、参数的使用等注意事项，其实这些中文网已经有很多了。推荐一个小网站：https://tool.lu/crontab 这个网站可以用来执行我们的cron表达式，以检测是否有错误。我发现这种小工具网站是真的多，而且一个比一个好，一个比一个全，真的牛皮

 

好了，现在我们知道了，原来crontab中文名：任务时间表。它是linux家出厂自带的，像我的云服务器（腾讯云centos7）自己就带了一个我也不知道干嘛用的cron job，百度看好像是加什么文件锁的。等以后功力足够了再去深究

```
[root@VM-0-7-centos ~]# crontab -l
*/5 * * * * flock -xn /tmp/stargate.lock -c '/usr/local/qcloud/stargate/admin/start.sh > /dev/null 2>&1 &'
```

 

还是先来看看linux自带的crontab文件是怎么定义的吧

```
[root@DockerHost install] cat /etc/crontab
SHELL=/bin/bash
PATH=/sbin:/bin:/usr/sbin:/usr/bin
MAILTO=root

# For details see man 4 crontabs
# Example of job definition:
# .----------------- minute (0 - 59)
# | .---------------hour (0 - 23)
# | | .------------ day of month (1 - 31)
# | | | ----------month (1 - 12) OR jan,feb,mar,apr...
# | | | | .——day of week (0 - 6) (Sunday=0 or 7) OR sun,mon,tue,wed,thu,fri,sat
# | I I I I
* * * * * * user-name command to be executed
```

案例

```
# 井号注释，不执行
* 表示不限制，每个时间单位都会执行1
- 表示整数列，如1-4代表1, 2, 3, 4
，代表指定的数，如1,4,6代表1、4、6
/ 代表步进值，如0-59/2代表每2分钟执行一次(?),也可用*表示，如*/3是每3个月运行指定任务
run-parts后面跟文件夹，目的是执行该目录下所有脚本文件
```



非root用户创建cron: 先在家目录/home/linkdo下创建linkdocron文件，系统会生成一个副本文件linkdo在/var/spool/cron/下，但普通用户并不能直接对她读写，只能通过crontab-e来修改。官方推荐应该是使用crontab -e来修改cron job，但这种修改好像只会改动/var/spool/cron/linkdo，/home/linkdocron并不会改动，导致我crontab -e完了就crontab linkdocron一下，结果半天没改动。实际上通过crontab-e 修改后，无需重新crontab <user>cron，直接就可以运行，如果还是不能运行，就重启cron线程

crontab例子：

```
* /5 * * * *每5分钟执行一次，不限时、天、周、月
0,30 18-06 * * *每天18点到6点之内，每隔半小时执行一次
```

 

## 注意

- 如果一个cron务需要定期而不是按每小时，天，周，月来执行，则需要添加/etc/cron.d目录，语法与/etc/crontab一致
-  crontab是由系统自动调度的，所以并不会加载任何环境变量，需要在crontab中指定任务运行所需的环境变量。一般来说，手动执行没问题，crontab执行有问题的，都是环境变量的问题
  - 如果执行的是脚本 ， 脚本中的路径需要使用全局路径
  - 需要用到其他变量时，需source引入所需环境变量
- crontab突然失效时 可以尝试/etc/init.d/crond restart解决问题。或者查看日志看某个job有没有执行/报错tail -f /var/log/cron
- crontab job分为系统级调题和用户级调度（root用户也属于用户级调度）。用户级任务调度可以通过"crontab -uroot -e"升级为系统及调度，或者直接将调度任务写入/etc/crontab,例如定时重后系统，需要写如/etc/crontab下，写root下是没用的
- crontab中%是有特殊含义的，表示换行的意思。如果要用的话必须进行转义\%,如经常用的date '+%Y%m%d'在crontab里是不会执行的，应该换成date '+\%Y\%m\%d'。
