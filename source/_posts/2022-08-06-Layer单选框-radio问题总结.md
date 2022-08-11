---
title: Layer单选框 radio问题总结
date: 2022-08-06 18:35:07
tags: JavaScript
categories:  Dev
index_img: https://raw.githubusercontent.com/YuanZhou314/PicRepo/main/imgs/old/layUI.png
---

<!-- more -->

放官方文档：https://www.layuiweb.com/doc/element/form.html#radio

位置 页面元素-表单；内置模块-表单
属性title可自定义文本
属性disabled开启禁用
设置value="xxx"可自定义值，否则选中时返回的就是默认的on
radio单选框被点击时触发，回调函数返回一个object参数，并携带两个成员：
data.elem radio原始DOM对象
data.value 被点击的radio的value值

官网文档太简洁了，以至于在实际碰到问题时，明明可以一个小时解决，最后却要花费两三个小时，其实说到底还是菜如狗罢了。

在layer渲染过type为radio的input后，会在原始input元素的后面追加一个div，div的内容如下：

```
<div class="layui-unselect layui-form-radio layui-form-radioed">
<i class="layui-anim layui-icon"></i>
<div>input的title值</div>
</div>
```

1. 获取所选中的单选框的对象和value值
   一般情况下，input框有一个id，然后直接找到下一个元素就是当前展示出来的那个div对象了。
   即：$("#inputId").next();

input框中添加lay-filter="xxx",即带有lay-filter的input都在渲染范围之内，根据filter的值来区分不同的单选框
var val = $("input[name='xxx']:checked").val()
val即是所选中的框的value值。可在页面初始化时获取，并在获取后进行下一步操作。

 

2. 控制多选框的点击事件(事件监听)

语法：

```
form.on('event(过滤器值)', callback);
```

form模块在layui事件机制中注册了专属事件，所以当你使用layui.onevent(自定义模块事件时，请勿占用form名。

form支持的事件有：select; checkbox; switch; radio; submit

默认监听的是所有form模块元素，但一般都不会这么干，所以这里需要用到filter过滤

其实这个事件监听就相当于我们的点击事件

```
form.on('select(test)', function(data){
  console.log(data);
});
```

**更新渲染**：
页面加载时，layer将该渲染的元素全部渲染一遍。但有时候数据是动态操作的，需要执行更新渲染才可以

```
form.render(type, filter)
```

type :可选。表单的type，如果不选择，则对全部类型的表单刷新一次
可选择的type值：

select 下拉选；

checkbox 多选框(含开关)；

radio 单选框。例：

```
form.render('select');
```

 

filter :即class="layui-form" 所在元素的lay-filter=“”的值，说白了这个值就是相同的一个或多个input的lay-filter的值，由这个filter值来控制元素的渲染范围
例：

```
form.render(null, 'test')或form.render('test')  //重新渲染lay-filter值为test的所有元素的全部状态（包含select、checkbox和radio）
form.render('select', 'test1') //重新渲染lay-filter值为test1的所有元素的select状态
```

**注：**一般在同一个元素上放置多种状态的挺少的，起码我还没碰到过，所以一般一个元素只放一个状态（即一种框）。等碰到了再回来补
