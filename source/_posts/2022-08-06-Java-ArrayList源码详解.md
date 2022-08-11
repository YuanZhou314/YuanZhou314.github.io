---
title: Java ArrayList源码详解
date: 2022-08-06 18:02:50
tags: 
- Java
- 数据结构
categories: Dev
index_img: https://raw.githubusercontent.com/YuanZhou314/PicRepo/main/imgs/old/Arraylist.png
---
ArrayList是Java集合常用的数据结构之一，继承自AbstractList，实现了List，RandomAccess、Cloneable、Serializable等一系列接口…………
<!-- more -->

**简介**

ArrayList是Java集合常用的数据结构之一，继承自AbstractList，实现了List，RandomAccess、Cloneable、Serializable等一系列接口，支持快速访问，复制和序列化。底层是基于数组实现容量大小动态变化，允许null值存在。

**部分源码分析**

ArrayList的底层是由数组实现

![](https://raw.githubusercontent.com/YuanZhou314/PicRepo/main/imgs/20220806180401.png)

默认size的初始大小为10：
![](https://raw.githubusercontent.com/YuanZhou314/PicRepo/main/imgs/20220806180551.png)

ArrayList定义了两个类常量数组：EMPTY_ELEMENTDATA（EE）和DEFAULTCAPACITY_EMPTY_ELEMENTDATA（DEE）

注释：EE，用于ArrayList空实例的共享空数组实例

DEE，用于默认大小空实例的共享空数组实例，将EE和DEE区分开，以便在添加第一个元素时知道要增加多少
![](https://raw.githubusercontent.com/YuanZhou314/PicRepo/main/imgs/20220806180614.png)

三个构造函数，包括一个无参构造和两个有参构造：
![](https://raw.githubusercontent.com/YuanZhou314/PicRepo/main/imgs/20220806180648.png)

![](https://raw.githubusercontent.com/YuanZhou314/PicRepo/main/imgs/20220806180701.png)

![](https://raw.githubusercontent.com/YuanZhou314/PicRepo/main/imgs/20220806180711.png)

 

注：无参构造创建的实例是DEFAULTCAPACITY_EMPTY_ELEMENTDATA，有参构造创建的实例是EMPTY_ELEMENTDATA

然后是add( )方法：
![](https://raw.githubusercontent.com/YuanZhou314/PicRepo/main/imgs/20220806180744.png)

当第一次调用add(E e)方法时，判断是不是无参构造方法创建的对象，如果是，则将DEFAULT_CAPACITY作为ArrayLiat的容量，此时minCapacity = 1
![](https://raw.githubusercontent.com/YuanZhou314/PicRepo/main/imgs/20220806180802.png)

还有其他add方法例如：

 addAll( Collection<? extends E> c )
![](https://raw.githubusercontent.com/YuanZhou314/PicRepo/main/imgs/20220806180818.png)
add( int index, E element )
![](https://raw.githubusercontent.com/YuanZhou314/PicRepo/main/imgs/20220806180851.png)

等等....这些方法中都包含ensureCapacitylnternal( int Capacity )方法，确保无参构造在创建实例并添加第一个元素时，最小的容量是默认大小10。

　　而有参构造创建空实例后，在add( E e )方法添加元素扩容情况是这样的：

**新容量为旧容量的1.5倍**
![](https://raw.githubusercontent.com/YuanZhou314/PicRepo/main/imgs/20220806180911.png)


在Java7中，ArrayList的构造方法只有EMPTY_ELEMENTDATA即EE, 而Java8中DEE代替了EE，但是原来的EE还存在，只是作用改变了：
![](https://raw.githubusercontent.com/YuanZhou314/PicRepo/main/imgs/20220806180926.png)

 

 　当容量为0时，会创建一个空数组，赋值给elementData，当一个应用中有很多这样的ArrayList空实例时，就会有很多空数组，这样使用EMPTY_ELEMENTDATA就是为了优化性能，所有的ArrayList空实例都指向同一个数组。而DEE（DEFAULTCAPACITY_EMPTY_ELEMENTDATA）就是为了保证无参构造方法常见的实例在添加第一个元素时，最小的容量是默认的10.

 **ArrayList的扩容**

 以无参构造为例：

首先无参构造初以默认大小来始化内部数组
![](https://raw.githubusercontent.com/YuanZhou314/PicRepo/main/imgs/20220806180949.png)

然后是扩容，使用add( )方法
![](https://raw.githubusercontent.com/YuanZhou314/PicRepo/main/imgs/20220806181005.png)

ensureCapacityInternal方法中的size代表执行添加前的元素个数，通过现有的元素个数数组的容量进行对比，若需要扩容则扩容。

 ensureCapacityInternal(size + 1)就是将要添加的额元素放入数组中

 

扩容条件：若数组的长度eleentData的长度小于做小需要的容量minCapacity，就需要扩容
![](https://raw.githubusercontent.com/YuanZhou314/PicRepo/main/imgs/20220806181021.png)

扩容逻辑：
![](https://raw.githubusercontent.com/YuanZhou314/PicRepo/main/imgs/20220806181021.png)

注：

\1. >>位运算，右移一位代表oldCapacity / 2，位运算效率更高

\2. JDK7后增加对元素个数的最大个数判断，MAX_ARRAY_SIZE为int最大值减去8

\3. 复制元素方法扩容。使用延迟分配对象数组空间，当数组加满数组容量后才会按照1.5倍扩容。

 

**ArrayList的remove( int index )方法**
![](https://raw.githubusercontent.com/YuanZhou314/PicRepo/main/imgs/20220806181055.png)

当我们调用remove( int index )时，首先调用rangrCheck( ) 方法检查index是否合法，再判断要删除的元素是否位于数组的最后一个位置。

当index是最后一个，则直接将数组的最后一个位置置空，即size-1即可；

当index不是最后一个，调用System.arraycopy( )方法复制数组，将从index+1开始，所有元素都往前挪一个位置，再将数组最后一个位置置空。

 
