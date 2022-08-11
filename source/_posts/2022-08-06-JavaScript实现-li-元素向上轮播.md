---
title: JavaScript实现<li>元素向上轮播
date: 2022-08-06 18:17:36
tags:
- JavaScript
categories: 
- Dev

---

<!-- more -->

在网上找了很久，没有找到合适的模板，其实我这个也是公司用的，希望以后也能复用，节省时间

```
function scrollAuto(scrollBox, list){//两个参数分别填列表的ul的class属性和li的class属性
        var listHeight = $(list).outerHeight(true);
        var mTop = 0;
        function listGo() {
            if(mTop > -listHeight) {
                $(scrollBox).css({'margin-top': mTop});
                mTop = mTop - 0.5;
            } else {
                   mTop = 0;
                    $(scrollBox).css({'margin-top': '0'});
                    $(scrollBox).find('.a-list:first-child').appendTo(scrollBox); //此处的a-list为li的class属性名
            }
        }
        var listTime = setInterval(listGo, 20);
        $(scrollBox).mouseenter(function(){
            clearInterval(listTime);
        })
        $(scrollBox).mouseleave(function(){
            listTime = setInterval(listGo, 20);
        })
```

由于我是先写好静态页面再实现滚动的，所以没有特别设置CSS样式

在$(function(){})中调用，直接调用，即可实现打开页面向上轮播li列表

注：这个方法可能造成轮播时图片、文字抖动，暂时还没想到解决办法
