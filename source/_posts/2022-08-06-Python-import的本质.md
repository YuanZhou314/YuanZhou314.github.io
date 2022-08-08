---
title: Python import的本质
date: 2022-08-06 20:27:25
tags:
---
ModuleNotFoundError: No module named 是经常能碰到的事情.这篇文章详细解释了Python导入模块的细节…………
<!-- more -->

谈到模块，不得不提起Pytho程序本身的架构。一般来说，一个Python程序包括多个含有Python语句的文本文件，程序就是作为一个主体、顶层的文件来构造，配合0~多个支持的文件，而这些文件就是模块。模块文件在运行时无需做任何事，当一个文件导入一个模块从而获得该模块定义的工具的访问权，那么该工具就是这个模块的属性

```
顶层文件：程序的主要控制流程

模块文件：工具库，提供给顶层文件使用的组件
```

 

**导入的实质**

当程序执行时，且是第一次导入时，会执行以下步骤：

1.找到该模块文件

2.将其编译成位码（需要时）

3.执行模块的代码并创建其所定义的对象

这三部走完，Python会将载入的模块存储到sys.modules表中，并在导入后检查该表，若模块不存在就会重新执行以上三步

回到现实，在日常工作中，经常能碰到导包失败的情况，程序是死的，它只能通过人设置好的路径是查找给定的包。这就涉及到Python包的搜索路径sys.path。

 

**搜索路径**

1. 程序的主目录：即顶层文件所在目录

2. PYTHONPATH目录：跨目录使用

3. 标准链接库目录：安装在机器上本身的目录，一定会被搜索到

4. 任意.pth文件的内容：同跨目录使用，配置环境变量的一种替代方案，可将其放在顶层文件目录或标准链接库目录下

 

**导入的方式**

1. import 直接导入

一般用于导入内置模块或第三方库

```
import sys 
import Person as ps  #别名
```

导入后使用时，需要加上模块名的限定，如：person=Person.Person('xiaozhou')

 

2. from package import funcname

from 包名.模块名 import 类名/方法名，从指定模块中导入具体方法，**推荐用法**

```
from sys import version
from sys import version,executable
from sys import *
```

导入后使用时，可直接对import的类/方法名进行操作，如：person=Person(' xiaozhou ')

 

3. mymodule=__import__(' modulename ')，不推荐该写法，可读性很差

 

另外，跨目录还有一种导入方法，即：在顶层文件中手动添加sys.path，注意要先添加路径，后执行导入操作

```
sys.path.append('E:\\insertdir')
```

 
