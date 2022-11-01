---
title: JavaScript代码的简单执行流程
categories:
  - Dev
tags:
  - JavaScript
  - 前端
index_img: 'https://blog-cnd-1307088890.cos.ap-guangzhou.myqcloud.com/javascript.jpg'
abbrlink: 91f14fed
date: 2022-09-17 18:05:22
---

<!-- more -->
<!-- categories:Dev、Ops、Study、Sth、News、work-->
<!-- tags: 
Python、MySQL、LeetCode、机器学习、Linux、Big Data、Java、BlockChain、Docker、Web 、分布式、
Maven、数据结构、JVM、JavaScript、Crontab、Shell、Ubuntu、VPN、NodeJS、String、VM、Hadoop、
Life、树莓派、Git、Hexo、算法、运维、网络、看法、电影、美学、写作、哲学、文档、绘画、前端、
历史、政治、社会、
 -->
在讲 JS 代码的执行流程之前，不可避免地要讲到 JS 的变量提升机制。



## 变量提升

```
var myname = '极客时间'
```

在变量提升机制下会改为先声明、后赋值的两步，如下：

```
var myname    //声明部分
myname = '极客时间'  //赋值部分
```

![](https://blog-cnd-1307088890.cos.ap-guangzhou.myqcloud.com/ec882f2d9deec26ce168b409f274533c.png)

不仅变量，函数的声明也同样遵循此规则：

```javascript
function foo(){
  console.log('foo')
}

var bar = function(){
  console.log('bar')
}
```

如上代码，foo() 函数是一个完整的函数声明，没有赋值操作。bar() 函数是先声明变量 bar ，再将后面的函数赋值给变量 bar 。

![](https://blog-cnd-1307088890.cos.ap-guangzhou.myqcloud.com/611c09ab995b9b608d9c0db193266777.png)

这就是变量提升。它指的是 JS 代码执行过程中，JS 引擎将变量、函数的声明部分提升到代码开头的行为。变量被提升后会给它设置默认值，即undefined。下方图示可以很清楚的看到提升后的代码

![](https://blog-cnd-1307088890.cos.ap-guangzhou.myqcloud.com/cefe564dbff729e735a834fd9e3bd0d5.png)

但是变量提升并非物理层面讲代码移动，而是在编译阶段 JS 引擎放入内存中发生的。JS代码在运行时，需要先经过编译阶段，然后再去执行。



## JavaScript的执行流程

之前说了，一段 JS 代码的执行流程大概长下面这样。这里详细说明一下这几个流程

![](https://blog-cnd-1307088890.cos.ap-guangzhou.myqcloud.com/649c6e3b5509ffd40e13ce9c91b3d91e.png)

### 编译阶段

如有以下代码：

```
showName()
console.log(myname)
var myname = '极客时间'
function showName() {
    console.log('函数showName被执行');
}
```

将这段代码模拟 JS 引擎执行变量提升，得到如下：

```
//第一部分：变量提升部分的代码
var myname = undefined
function showName() {
    console.log('函数showName被执行');
}

//第二部分：执行部分的代码
showName()
console.log(myname)
myname = '极客时间'
```

图来了：

![](https://blog-cnd-1307088890.cos.ap-guangzhou.myqcloud.com/0655d18ec347a95dfbf843969a921a13.png)

从上图可以看出，输入一段代码经过编译后，会生成两部分内容：执行上下文（Execution context）和可执行代码。很明显，提升变量后的两部分代码，分别对应变量环境和可执行代码。

执行上下文是 JS 执行代码时的运行环境，例如调用一个函数时，就会进入该函数的执行上下文，确定该函数在执行期间使用的this、变量、对象、函数等。执行上下文后面有文章会讲到【TODO】。执行上下文中存在一个变量环境的对象，这个对象就保存了变量提升的内容。

变量环境中保存的变量提升内容，可以看成是以下结构：

```
VariableEnvironment:
     myname -> undefined, 
     showName ->function : {console.log(myname)
```



JS 引擎执行完整代码的方式如下：

```
showName()  //非声明操作，JS 引擎不做任何处理
console.log(myname)  //非声明操作，JS 引擎不做任何处理
var myname = '极客时间'  //在环境对象中创建一个名为myname的属性，并使用undefined对其初始化
// JS引擎发现一个通过function定义的函数，将函数定义存储到堆(HEAP)中，并在环境对象中创建一个showName属性，将该属性值指向堆中函数的位置。
function showName() { 
    console.log('函数showName被执行');
}
//然后，JS 引擎将生命以外的代码编译成字节码，准备执行。
```



### 执行阶段

还是相同的代码，我们来看 JS 引擎是如何执行的

```
showName()  //JS引擎在变量环境对象中查找该函数，由于变量环境存在该函数的引用，因此JS引擎开始执行该函数，并输出“函数showName被执行”结果
console.log(myname)  //JS引擎在变量环境对象中查找myname对象，由于对象环境中存在该值，且值为undefined，所以输出 undefined
var myname = '极客时间' //将“极客时间”赋给myname变量，赋值后变量环境中的myname属性值改为"极客时间"
function showName() {
    console.log('函数showName被执行');
}
```



注意：如果代码中存在相同的变量或者函数，那么最终生效的是最后一个函数，因为按编译顺序，后面的变量/函数会覆盖前面的。

有点意思的题目，如下代码输出什么？

```
showName()
var showName = function() {
    console.log(2)
}
function showName() {
    console.log(1)
}
```



分析：先开始变量提升，将所有声明提升到顶端，编译结束后生成执行上下文，变量环境对象中存在着变量提升后的对象，如下：

```
var showName
function showName(){
		console.log(1)
}
```

然后 JS引擎将其他代码编译成字节码，并开始执行阶段。首先执行第一行`showName()`，JS引擎在变量环境对象中寻找`showName`，发现是有的，是一个函数的引用。即使用function声明的函数，那么 JS 引擎执行这段函数，输出 `1`。

然后就是第二行`var showName = function() {console.log(2)}`，这是一个赋值操作，将showName的引用换成了输出2的函数，那么后面如果还调用showName的话，就是输出2了。


