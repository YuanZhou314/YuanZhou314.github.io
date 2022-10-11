---
title: JavaScript中var、let和const
categories:
  - Dev
tags:
  - JavaScript
  - 前端
date: 2022-09-17 16:25:50
index_img: https://blog-cnd-1307088890.cos.ap-guangzhou.myqcloud.com/js-let-const.png
---

<!-- more -->
<!-- categories:Dev、Ops、Study、Sth、News、work-->
<!-- tags: 
Python、MySQL、LeetCode、机器学习、Linux、Big Data、Java、BlockChain、Docker、Web 、分布式、
Maven、数据结构、JVM、JavaScript、Crontab、Shell、Ubuntu、VPN、NodeJS、String、VM、Hadoop、
Life、树莓派、Git、Hexo、算法、运维、网络、看法、电影、美学、写作、哲学、文档、绘画、前端、
历史、政治、社会、
 -->
## var声明

var在全局范围声明或函数/局部范围内声明。

* 当在最外层函数的外部声明var变量时，作用域全局的，代码的任何地方都可以访问，变量的生命周期伴随页面的生命周期。

* 当在函数中声明var时，作用域是局部的，只能在函数内部访问，函数执行结束后，变量销毁。

```
var tester = 'hey hi'; 
function newFunction() {
    var hello = 'hello';
}
console.log(hello); // 提示error: hello is not defined，因为hello是函数中定义外部无法访问
```



### var变量允许重新声明和修改

var变量被定义后，允许在相同的作用域下执行重新声明或赋值

```
var greeter = 'hey hi';
var greeter = 'say Hello instead';
greeter = 'say World instead';
```



### var允许变量提升

在代码执行之前，变量和函数声明会移至其作用域顶部。

```
function test() {
    console.log(zero)
    console.log(one)
    var one = "abc"
}
test()
```

例如，上面的函数中定义了一个one，但没有定义zero。因此先执行第一行打印zero，结果如下：

```javascript
Process exited with code 1
Uncaught ReferenceError ReferenceError: zero is not defined
```

但如果将没有定义过的zero注释掉，就会执行打印出变量one的值：

```javascript
function test() {
    //console.log(zero)
    console.log(one)
    var one = "abc"
}
test()

undefined
```

console.log()打印出了one的值，但此时one并没有定义出来。原因就在于变量提升：

```
console.log(one)
var one = "abc"
```

以上代码被解释为：

```javascript
var one;
console.log(one);
one = "abc"
```

变量被提升到作用域的顶部后，使用undefined值对其初始化

变量提升是设计之初的缺陷，存在以下几个问题：

#### 1. 变量容易被覆盖掉

如下，全局作用域中有一个myname变量，showName函数中也定义了一个myname，执行以下代码，打印出来是 undefined 。

```javascript
var myname = "zhou"
function showName() {
    console.log(myname)
    var myname = "xue"
}
showName()
```

执行过程：JS 引擎在函数内部执行代码时，从`console.log(myname);`先开始执行，这里需要用到myname变量，此时调用栈中有2个变量，一个是全局的myname,一个是函数中的myname，因此优先使用当前执行上下文中的变量，即值是undefined的。所以取到的值就是undefined。

#### 2. 本应该销毁的变量没有被销毁

如下，这是一个常用的循环语句。一般而言，for循环结束后，变量 i 就销毁了，但在JS中 i 的值并未销毁。打印结果为7。因为在创建foo函数上下文阶段，变量 i 就已经被提升，所以for循环结束后，变量 i 也不会被销毁。

```
function foo(){
  for (var i = 0; i < 7; i++) {
  }
  console.log(i); 
}
foo()
```



## let声明

let声明的变量可以被修改，但不可被重复声明。let可以生成块级作用域（这是ES6带来的）。块级作用域就是在其他语言中常见的，在if、for循环这种块中可以单独定义变量而不受外部干扰。

例如以下代码使用var声明变量，在变量提升的影响下，x的值会受到干扰，两次打印都是 2

```javascript
function varTest() {
    var x = 1;
    if (true) {
        var x = 2;
        console.log(x)
    }
    console.log(x)
}
varTest()
```

将var换成let，则打印结果符合平时的逻辑

```javascript
function varTest() {
    let x = 1;
    if (true) {
        let x = 2;
        console.log(x)
    }
    console.log(x)
}
varTest()
```

至于JS是如何支持块级作用域的，这就要谈到 JS 的执行上下文了，后面会有文章详解【TODO】

let 与 var 一样，let 声明也被提升到作用域顶部，但 let 作用域提升上去之后，不会被值进行初始化。



## const声明

const 声明的变量保持常量，支持块级作用域，值不能被修改也不能重新声明，所以每个const必须在声明时进行初始化。

注意：const声明的对象不可更改，但可以修改对象的属性，如下代码是可行的：

```
const greeting = {
    message: 'say Hi',
    times: 4,
};

greeting.message = 'say Hello instead';
```

let也跟let一样，声明会被提升到顶部，但不会被初始化。



网上有的文章说let和const会被提升到作用域顶端，有的文章说不用。这其实是把问题搞复杂了，这也没办法，东西多了就容易复杂。实际上，JS 中所有声明都会被提升，包括函数、var、let、const、和class，而var在提升后初始值赋值为undefined，但let和const声明不会被初始化。



这里涉及到一个概念：**暂时性死区**。let 和 const 声明只有在运行期间被 JS 引擎评估词法绑定(赋值)时才会被初始化，在此之前并不能访问它。（即变量创建和初始化之间的时间段不可访问）

如下，在块级作用域中，从作用域顶端到myname变量被定义这段代码之间形成一个暂时性死区，在这里访问myname会报初始化之前不能访问myname的错误

<img src="https://blog-cnd-1307088890.cos.ap-guangzhou.myqcloud.com/image-20220917161901697.png" style="zoom:50%;" />

```
Uncaught ReferenceError ReferenceError: Cannot access 'myname' before initialization
```


