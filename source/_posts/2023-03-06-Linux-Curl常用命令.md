---
title: Linux Curl常用命令
categories:
  - Ops
tags:
  - Linux
abbrlink: 6793f937
date: 2023-03-06 11:47:36
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
CURL是一个开源项目，基于网络协议，对指定URL进行网络传输。涉及是任何网络协议传输，但不涉及对具体数据的具体处理。

### 发送Get请求

响应内容返回至屏幕

```
curl curl https://catonmat.net
```

响应内容保存至文件`response.txt`

```
curl -o response.txt https://catonmat.net
```

### 发送POST请求

发送带表单数据的 POST 请求

```
curl -d 'login=emma' -d 'password=123' https://google.com/login
```

读取文件内容发送的 POST 请求

```
curl -d '@data.txt' https://google.com/login
```

### 携带Cookies

携带空Cookies

```
curl -b 'session=' https://google.com
```

携带Cookies

```
curl -b 'session=abcdef' https://google.com
```

访问并写入Cookies到文件

```
curl -c cookies.txt https://www.google.com
```

读取Cookies文件访问

```
curl -b cookies.txt https://www.google.com
```

### 跳过SSL检测

```
curl -k https://www.example.com
```

### 跟随服务器重定向

```
curl -L -d 'tweet=hi' https://api.twitter.com/tweet
```

### 修改用户代理

将用户代理更改为 Chrome

```
curl -A 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36' https://google.com
```

假装成谷歌机器人

```
curl -A 'Googlebot/2.​​1 (+http://www.google.com/bot.html)' https://washingtonpost.com
```

### HTTP身份验证

```
curl https://bob:12345@google.com/login
```

### 限制Curl

限制为每秒 200 KB，一般用于模拟慢网速环境

```
curl --limit-rate 200k https://google.com
```

限制为每秒 1 个字节

```
curl --limit-rate 1 https://google.com
```

### 输出通信过程

一般用于调试

```
curl -v https://www.example.com
```

### 不输出错误和进度信息

如运行正常，会正常显示结果

```
curl -s https://www.example.com
```


