---
title: Python-Tkinter组件实践
categories:
  - Dev
tags:
  - Python
index_img: 'https://blog-cnd-1307088890.cos.ap-guangzhou.myqcloud.com/tkinter.png'
abbrlink: cb8c1ce4
date: 2022-09-14 12:34:33
---

<!-- more -->
<!-- categories:Dev、Ops、Study、Sth、News、work-->
<!-- tags: 
Python、MySQL、LeetCode、机器学习、Linux、Big Data、Java、BlockChain、Docker、Web 、分布式、
Maven、数据结构、JVM、JavaScript、Crontab、Shell、Ubuntu、VPN、NodeJS、String、VM、Hadoop、
Life、树莓派、Git、Hexo、算法、运维、网络、看法、电影、美学、写作、哲学、文档、绘画、前端、
历史、政治、社会、
 -->
Tkinter一般用于界面设计，是Python自带的模块。它在实际开发中可能并不常用，用python写一些小工具时会用到。实际开发一般用的是Qt ，但Tkinter也可以很好地帮助理解GUI开发的逻辑。



以下是Tkinter的常用组件说明：

![](https://blog-cnd-1307088890.cos.ap-guangzhou.myqcloud.com/1372069-20180805235412647-270287964.png)


### 窗口组件

```python
from tkinter import *

# 创建窗口实例
window = Tk()

# 窗口标题
window.title("创建窗口")

# 主窗口循环显示。同一个窗口只需要执行一次
# 创建窗口并等待与用户交互，直到用户手动关闭为止
# 此处的mainloop是一个很大的while循环，每点击一次就会更新一次。因此必须有循环
window.mainloop()
```

![](https://blog-cnd-1307088890.cos.ap-guangzhou.myqcloud.com/image-20220914121437808.png)

### 按钮组件

```python
from tkinter import *

window = Tk()
window.title("按钮组件")
window.geometry('315x315')

# 新建一个标签组件
lbtext = Label(window, text='点下面，有惊喜')
lbtext.pack()

# 定义点击事件
def clicked():
    lbtext.configure(text="哈哈哈你被骗到啦，想屁吃")


# 新建一个按钮组件
btn = Button(window, text="万元好礼，点击就送", command=clicked)
btn.pack()

window.mainloop()
```

![](https://blog-cnd-1307088890.cos.ap-guangzhou.myqcloud.com/image-20220914121155891.png)



### 标签组件

```python
from tkinter import *
from tkinter import font

window = Tk()
window.title("标签组件")
# 设置窗口大小，乘号是小写x字母
window.geometry('315x315')

# bg:背景颜色, font:字体, width、height:字符/背景的高宽，fg是组件前景色，gb是组件后景色
lbtext = Label(window, text="月摇江湄，你回首花落梦碎。",
               font=('Arial Bold', 50), fg='red', bg='green', width=10, height=1)

# 配置放置标签，配置内容文字区域放置位置，窗口部件有以下三种放置方式：

# 1. grid:内容放置在规律的方格中，row和colum是行、列；padx是单元格左右间距；pady是单元格上下间距；ipadx是单元格内部元素与单元格的左右间距；ipady是单元格内部元素与单元格的上下间距
# lbtext.grid(column=1, row=0, padx=10, pady=10, ipadx=10, ipady=10)

# 2. pack:自适应排列.配置参数side时可按top、bottom、laft、right方式排列，如lbtext.pack(side='top')
lbtext.pack()

# 3. place:通过精确坐标来定位。x、y代表部件放置的位置，anchor='nw'表示锚定点的西北角，锚定点在内容顶端中间的位置。锚定点的位置参考图：https://raw.githubusercontent.com/YuanZhou314/PigRepo/main/imgs/maodingdian.png
# lbtext.place(x=50, y=100, anchor='nw')

window.mainloop()
```

![](https://blog-cnd-1307088890.cos.ap-guangzhou.myqcloud.com/image-20220914121326146.png)

### 输入框组件

```python
from tkinter import *

window = Tk()
window.title("文本框组件")
window.geometry('315x315')

lbtext = Label(window, text='输入内容后请按下按钮')
lbtext.pack()

# 添加一个文本输入框
txt = Entry(window, width=10)
txt.pack()

# 自动设置焦点，无需点击文本框再输入
txt.focus()


def clicked():  # 添加按钮点击事件，将所填写的内容简单判断后，赋值给标签组件
    res = "Welcome to " + txt.get()
    if txt.get() != "":
        lbtext.configure(text=res)


# 此处可直接在后面添加放置方式。
btn = Button(window, text="走你！", command=clicked).pack()

window.mainloop()
```

![](https://blog-cnd-1307088890.cos.ap-guangzhou.myqcloud.com/image-20220914122132449.png)



### 单选框组件

```python
from tkinter import *
from tkinter import font

window = Tk()
window.title("标签组件")
# 设置窗口大小，乘号是小写x字母
window.geometry('315x315')

# bg:背景颜色, font:字体, width、height:字符/背景的高宽，fg是组件前景色，gb是组件后景色
lbtext = Label(window, text="月摇江湄，你回首花落梦碎。",
               font=('Arial Bold', 50), fg='red', bg='green', width=10, height=1)

# 配置放置标签，配置内容文字区域放置位置，窗口部件有以下三种放置方式：

# 1. grid:内容放置在规律的方格中，row和colum是行、列；padx是单元格左右间距；pady是单元格上下间距；ipadx是单元格内部元素与单元格的左右间距；ipady是单元格内部元素与单元格的上下间距
# lbtext.grid(column=1, row=0, padx=10, pady=10, ipadx=10, ipady=10)

# 2. pack:自适应排列.配置参数side时可按top、bottom、laft、right方式排列，如lbtext.pack(side='top')
lbtext.pack()

# 3. place:通过精确坐标来定位。x、y代表部件放置的位置，anchor='nw'表示锚定点的西北角，锚定点在内容顶端中间的位置。锚定点的位置参考图：https://raw.githubusercontent.com/YuanZhou314/PigRepo/main/imgs/maodingdian.png
# lbtext.place(x=50, y=100, anchor='nw')

window.mainloop()
```

![](https://blog-cnd-1307088890.cos.ap-guangzhou.myqcloud.com/image-20220914121516705.png)

### 对话框组件

```python
from tkinter import *
from tkinter import font

window = Tk()
window.title("标签组件")
# 设置窗口大小，乘号是小写x字母
window.geometry('315x315')

# bg:背景颜色, font:字体, width、height:字符/背景的高宽，fg是组件前景色，gb是组件后景色
lbtext = Label(window, text="月摇江湄，你回首花落梦碎。",
               font=('Arial Bold', 50), fg='red', bg='green', width=10, height=1)

# 配置放置标签，配置内容文字区域放置位置，窗口部件有以下三种放置方式：

# 1. grid:内容放置在规律的方格中，row和colum是行、列；padx是单元格左右间距；pady是单元格上下间距；ipadx是单元格内部元素与单元格的左右间距；ipady是单元格内部元素与单元格的上下间距
# lbtext.grid(column=1, row=0, padx=10, pady=10, ipadx=10, ipady=10)

# 2. pack:自适应排列.配置参数side时可按top、bottom、laft、right方式排列，如lbtext.pack(side='top')
lbtext.pack()

# 3. place:通过精确坐标来定位。x、y代表部件放置的位置，anchor='nw'表示锚定点的西北角，锚定点在内容顶端中间的位置。锚定点的位置参考图：https://raw.githubusercontent.com/YuanZhou314/PigRepo/main/imgs/maodingdian.png
# lbtext.place(x=50, y=100, anchor='nw')

window.mainloop()
```

![](https://blog-cnd-1307088890.cos.ap-guangzhou.myqcloud.com/image-20220914121550065.png)

### 复选框组件

```python
from tkinter import *
from tkinter import font

window = Tk()
window.title("标签组件")
# 设置窗口大小，乘号是小写x字母
window.geometry('315x315')

# bg:背景颜色, font:字体, width、height:字符/背景的高宽，fg是组件前景色，gb是组件后景色
lbtext = Label(window, text="月摇江湄，你回首花落梦碎。",
               font=('Arial Bold', 50), fg='red', bg='green', width=10, height=1)

# 配置放置标签，配置内容文字区域放置位置，窗口部件有以下三种放置方式：

# 1. grid:内容放置在规律的方格中，row和colum是行、列；padx是单元格左右间距；pady是单元格上下间距；ipadx是单元格内部元素与单元格的左右间距；ipady是单元格内部元素与单元格的上下间距
# lbtext.grid(column=1, row=0, padx=10, pady=10, ipadx=10, ipady=10)

# 2. pack:自适应排列.配置参数side时可按top、bottom、laft、right方式排列，如lbtext.pack(side='top')
lbtext.pack()

# 3. place:通过精确坐标来定位。x、y代表部件放置的位置，anchor='nw'表示锚定点的西北角，锚定点在内容顶端中间的位置。锚定点的位置参考图：https://raw.githubusercontent.com/YuanZhou314/PigRepo/main/imgs/maodingdian.png
# lbtext.place(x=50, y=100, anchor='nw')

window.mainloop()
```

![](https://blog-cnd-1307088890.cos.ap-guangzhou.myqcloud.com/image-20220914121638001.png)

### 进度条组件

```python
from tkinter import *
from tkinter import ttk
from tkinter.ttk import Progressbar

window = Tk()
window.title("对话框组件")
window.geometry('315x315')

# 创建style实例绘制进度条
style = ttk.Style()
style.theme_use('default')

# 设置进度条颜色
style.configure('black.Horizontal.TProgressbar', background='red')
bar = Progressbar(window, length=200, style='black.Horizontal.TProgressbar')

# 设置当前进度条的值，100分是拉满
bar['value'] = 50
bar.grid(column=0, row=1)
window.mainloop()

```

![](https://blog-cnd-1307088890.cos.ap-guangzhou.myqcloud.com/image-20220914121704705.png)

### 数值调整组件

```python
from tkinter import *

window = Tk()
window.title("对话框组件")
window.geometry('315x315')

# 创建范围值，从0~100
# spin = Spinbox(window, from_=0, to=100, width=5)

# 或者设置某些特定的值
# spin = Spinbox(window, values=(3, 6, 9), width=5)

# 如需设置默认值，需要通过IntVar的set函数设置，无法直接使用 'textvariable=10'
var = IntVar()
var.set(10)
spin = Spinbox(window, from_=0, to=10, width=5, textvariable=var)
spin.grid(column=0, row=0)

window.mainloop()
```

![](https://blog-cnd-1307088890.cos.ap-guangzhou.myqcloud.com/image-20220914122225120.png)



### 文本区组件

```python
from tkinter import *
from tkinter import scrolledtext

window = Tk()
window.title("文本区组件")
window.geometry('315x315')

# 创建本文区实例，并设置区域宽高
txt = scrolledtext.ScrolledText(window, width=50, height=10)


def addtext():
    txt.insert(INSERT, "当代价不再重要，人们也会对恐惧有所遗忘。")  # 在文本区插入文本,此处为追加


def deltext():
    txt.delete(1.0, END)  # 将文本区内容删除


btn1 = Button(window, text='点击加入', command=addtext)
btn2 = Button(window, text='点击清空', command=deltext)

txt.grid(column=0, row=0)
btn1.grid(column=0, row=1)
btn2.grid(column=0, row=2)

window.mainloop()
```

![](https://blog-cnd-1307088890.cos.ap-guangzhou.myqcloud.com/image-20220914121803360.png)

### 下拉框组件

```python
from tkinter import *
from tkinter.ttk import Combobox

window = Tk()
window.title("下拉框组件")
window.geometry('315x315')
lbtext = Label(window, text='点下面，有惊喜')
lbtext.pack()

# 新建组合框实例
combo = Combobox(window)
# 使用元组配置组合框内容
combo['values'] = ('香辣虾', '烤鸡翅', '螃蟹粥', '流心月饼', '豆芽菜')
# 默认选项
combo.current(0)
combo.pack()


def clicked():  # 设置点击事件，将选中的内容赋给标签组件
    comtxt = combo.get()
    lbtext.configure(text=comtxt)


btn = Button(window, text='点我点我！！', command=clicked)
btn.pack()

window.mainloop()

```

![](https://blog-cnd-1307088890.cos.ap-guangzhou.myqcloud.com/image-20220914121831793.png)

### 文件对话框组件

```python
import os
from tkinter import *
from tkinter import filedialog

window = Tk()
window.title("对话框组件")
window.geometry('315x315')


def opendir():
    # askopenfilename 选择单个文件,initialdir 参数指定打开的初始目录
    # files = filedialog.askopenfilename(initialdir=os.path.dirname(__file__))

    # askopenfilenames 选择多个文件
    # files = filedialog.askopenfilenames(initialdir=os.path.dirname(__file__))

    # filetypes 参数指定文件类型
    files = filedialog.askopenfilenames(filetypes=(
        ("Text files", "*.txt"), ("all files", "*.*")), initialdir=os.path.dirname(__file__))


btn = Button(window, text='选择文件', command=opendir)
btn.pack()

window.mainloop()

```

![](https://blog-cnd-1307088890.cos.ap-guangzhou.myqcloud.com/image-20220914121903912.png)

### 菜单组件

```python
from re import sub
from tkinter import *

window = Tk()
window.title("菜单组件")
window.geometry('315x315')
lbtext = Label(window, text='菜单显示')
lbtext.pack()

# 功能的实现入口在这里
def do_job():
    pass


# 创建菜单栏容器	
menubar = Menu(window)

# 创建File菜单项
filemenu = Menu(menubar, tearoff=0)

# 给菜单项命名为File，并放入菜单栏容器
menubar.add_cascade(label='File', menu=filemenu)

# 在File菜单项中加入New、Open、Save等效菜单
filemenu.add_cascade(label='New', command=do_job)
filemenu.add_cascade(label='Open', command=do_job)
filemenu.add_cascade(label='Save', command=do_job)
filemenu.add_separator()  # 添加一条分隔线
# 退出使用tkinter的自带quit()函数
filemenu.add_cascade(label='Exit', command=window.quit)

# 创建Edit菜单，与File一样，需要创建菜单项、并放入容器，然后给菜单项创建功能单元
editmenu = Menu(menubar, tearoff=0)
menubar.add_cascade(label='Edit', menu=editmenu)
editmenu.add_cascade(label='Cut', command=do_job)
editmenu.add_cascade(label='Copy', command=do_job)
editmenu.add_cascade(label='Paste', command=do_job)

# 创建二级菜单,在filemenu的基础上创建菜单项，并命名为“Import”,再给二级菜单项创建功能单元“Submenu_1”
submenu = Menu(filemenu)
filemenu.add_cascade(label='Import', menu=submenu, underline=0)
submenu.add_command(label='Submenu_1', command=do_job)

# 配置菜单栏显示
window.config(menu=menubar)

window.mainloop()

```

![](https://blog-cnd-1307088890.cos.ap-guangzhou.myqcloud.com/image-20220914122022227.png)













参考文章

https://www.cnblogs.com/shwee/p/9427975.html

https://likegeeks.com/python-gui-examples-tkinter-tutorial/
