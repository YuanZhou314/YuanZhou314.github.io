---
title: Django数据库基本API示例
categories:
  - Dev
tags:
  - Python
index_img: >-
  https://static.djangoproject.com/img/logos/django-logo-negative.1d528e2cb5fb.png
abbrlink: afd71056
date: 2023-01-05 11:02:07
---

<!-- more -->
<!-- categories:Dev、Ops、Study、Sth、News、work-->
<!-- tags: 
Python、MySQL、LeetCode、机器学习、Linux、Big Data、Java、BlockChain、Docker、Web 、分布式、
Maven、数据结构、JVM、JavaScript、Crontab、Shell、Ubuntu、VPN、NodeJS、String、VM、Hadoop、
Life、树莓派、Git、Hexo、算法、运维、网络、看法、电影、美学、写作、哲学、文档、绘画、前端、
历史、政治、社会、导购
 -->
数据模型创建后，Django会自动给予一套数据库抽象API，允许增删改查对象。在Django实际代码中，这些应该都是写在`views.py`内的。

官方文档：https://docs.djangoproject.com/zh-hans/4.1/topics/db/queries/

## 导入模型

```
from polls.models import Choice, Question
from django.utils import timezone
```



## 新增记录

```
q = Question(question_text="What's new?", pub_date=timezone.now())
q.save()
# 等价于
# insert into polls_question (id,question_text,pub_date) value ('1','What's new?','2023-01-04 08:57:52.068086');
```



## 所有查询记录

前提是模型实现了`__str__()`函数，返回的是 `self.question_text`。如果返回的是所有字段，那么等价于`select * `

```
Question.objects.all()
# 等价于
# select question_text from polls_question;
```



## 按字段查询

`pk`意为`PRIMARY KEY`，等价于当前模型中的 `id`

```
Question.objects.filter(id=1) | Question.objects.filter(pk=1)
Question.objects.filter(question_text="What's new?")
# 等价于
select question_text from polls_question where id=1;
select question_text from polls_question where question_text="What's new?";
```



## 模糊查找

```
Question.objects.filter(question_text__startswith='What')
# 等价于
select question_text from polls_question where question_text like 'how%';
```



## 获取当前年份并按时间查找

只返回单个结果

```
current_year = timezone.now().year
Question.objects.get(pub_date__year=current_year)
# 等价于(嵌套子查询)
select question_text from polls_question where year(pub_date) =(select year(curdate()));
```



## 通过主表对象给从表添加数据

```
q = Question.objects.get(pk=1)
q.choice_set.create(choice_text='Not much', votes=0)
# 等价于
insert into polls_choice (id,choice_text,votes,question_id) value ('1','Not much','0','1');
```



## 查找记录数量

```
q.choice_set.count()
# 等价于
select count(*) from polls_choice as c  join polls_question as q on c.question_id=q.id where q.id='1' ;
```



## 连接查询

通过从表对象按主表条件查询

```
Choice.objects.filter(question__pub_date__year=current_year)
# 等价于
select choice_text from polls_choice as c join polls_question as q on c.question_id=q.id where year(q.pub_date) =(select year(curdate()));
```



## 模糊查询并删除记录

```
q.choice_set.filter(choice_text__startswith='Just hacking').delete()
# 等价于
delete from polls_choice where choice_text like 'Just hacking%';
```


## 查询并排序

```
# 这里的-我没明白什么意思[TODO]
Question.objects.order_by('-pub_date')
# 等价于
select question_text from polls_question order by pub_date;
```


