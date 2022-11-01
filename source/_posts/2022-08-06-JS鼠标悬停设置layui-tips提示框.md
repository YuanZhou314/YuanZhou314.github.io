---
title: JS鼠标悬停设置layui tips提示框
tags: JavaScript
categories: Dev
index_img: 'https://blog-cnd-1307088890.cos.ap-guangzhou.myqcloud.com/layUI.png'
abbrlink: 871dcbde
date: 2022-08-06 18:40:40
---

<!-- more -->

官方介绍：吸附层，灵活判断出现的位置，默认在元素的右侧弹出。

```
layer.tips(content, follow, options)
layer.tips(msg, '#id',{tips: 1})
```

必填参数 ：

content: 生成的文本，可以是字符串或HTML代码 
follow: 元素ID，若是元素本身可直接用this（绑定元素时）
options : tips的配置型，即位置[1上；2右；3下；4左, 字体颜色]

还有一些基础参数，我的另一篇文章中，是layer弹出层是基础参数

实例：

```
function showDiv(obj){
    layer.tips("<span>车辆轨迹</span><span>关联人员</span>",         
    "#"+obj.id, 
    {tips:[2, '#663ff'], time:3000});
}
```

 以上效果就是鼠标悬浮到a标签后，显示悬浮窗，3s后自动关闭。为啥要设置3秒自动关闭？因为这样可以让我们去点击a标签里的内容。由于会自动关闭，所以也不需要鼠标移除的事件。

*需要注意的是，需要多个tips悬浮时，tipsMore（默认false）应该是flase的*
