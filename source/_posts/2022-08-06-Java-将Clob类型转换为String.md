---
title: Java 将Clob类型转换为String
date: 2022-08-06 18:19:10
tags:
---

<!-- more -->

SQL CLOB 是内置类型，它将字符大对象存储为数据库表某一行中的一个列值，使用CHAR来存储数据，如XML文档。

如下是一个Clob转换为String的静态方法，可将其放在自己常用的工具类中，想直接用的话，自己稍作修改即可

```java
public static String clobToStr(Clob clob) {
  if(clob == null) {
    return "";
}  
StringBuffer strClob = new StringBuffer();
String str = "";
Reader read = null;
try{
    reader = clob.getCharacterStream();
    char[] buffer = new char[1024];
    int length = 0;
    while (length = reader.read(buffer, 0, 1024)) != -1) {
        strClob.append(buffer, 0, length);
}
} catch (SQLException e) {
    e.printStackTrace();
} catch (IOException e) {
    e.printStackTrace();
} finally {
    try{
        if (reader != null)
            reader.close();
    } catch (IOException e) {
        e.printStackTrace();
    }
}
str = strClob.toString();
return str;
}
```

我在将数据导出成Excel时碰到的问题，需要导出的数据中有Clob格式只需将其Clob对象（若直接导出则显示的是地址）

这个工具挺好用的，放在这里，以后方便自己使用。
另：博客园的代码排版实在太丑了，以后还是在外面编辑好再粘贴进来比较好


2022.08.06迁移吐槽:太好笑了,现在你已经到github了,再也不用担心博客园的排版了!
