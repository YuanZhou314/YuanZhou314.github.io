---
title: >-
  MySQL Workbench 连接数据库提示SSL connection error: SSL is required but the server
  doesn't support it
date: 2022-08-06 20:17:03
tags: MySQL
categories: Dev
index_img: https://blog-cnd-1307088890.cos.ap-guangzhou.myqcloud.com/MySQL.png
---

<!-- more -->

mysql下载器下载了mysql worbench后无法连接远端数据库，提示SSL之类的错误

![](https://blog-cnd-1307088890.cos.ap-guangzhou.myqcloud.com/20220806201747.png)

 

 

**解决方案**：不使用SSL，在Advance TAB页的others框中输入参数：useSSL=0，就可以连接上了。

 

![](https://blog-cnd-1307088890.cos.ap-guangzhou.myqcloud.com/20220806201800.png)

 

 

有时候本地连接可以，但远程连接不行，并且报错：Host is not allowed to connect to this MySQL server。那一般是没有允许远程登录来的，解决办法也很简单：

```
//先进入mysql
use mysql
//允许root用户从所有IP远程访问
update user set host = '%' where user = 'root';
//刷新
flush privileges;
```

 

 

### 附上忘记Mysql密码的修改方法（CentOS7）：

1. 先关闭Mysql（前提是mysql存在，且安装正常）

```
service mysqld stop
```

2. 修改mysql配置文件，在[mysqld] 下添加一句 skip-grant-tables 然后保存退出

```
sudo vi /etc/my.cnf
```

3. 重启数据库

```
service mysqld start
```

4. 此时进入数据库是免密的，进入后 use mysql 选择数据库进入

```
mysql -u root mysql -u root 

use mysql;
```

5. 修改密码( newpwd为新密码 )

```
update mysql.user set authentication_string=password('newpwd') where user='root';
```

 

修改完毕，exit后重新用新密码登录试一下，记得把好了之后记得把刚才的添加的语句注释掉，再重新启动mysql。


