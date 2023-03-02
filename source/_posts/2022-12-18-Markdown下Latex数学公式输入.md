---
title: Markdown下Latex数学公式输入
categories:
  - Study
tags:
  - 文档
abbrlink: dc95e40f
date: 2022-12-18 16:13:15
index_img:
math: true
---

<!-- more -->
<!-- categories:Dev、Ops、Study、Sth、News、work-->
<!-- tags: 
Python、MySQL、LeetCode、机器学习、Linux、Big Data、Java、BlockChain、Docker、Web 、分布式、
Maven、数据结构、JVM、JavaScript、Crontab、Shell、Ubuntu、VPN、NodeJS、String、VM、Hadoop、
Life、树莓派、Git、Hexo、算法、运维、网络、看法、电影、美学、写作、哲学、文档、绘画、前端、
历史、政治、社会、导购
 -->
先提供一个LaTex公式编辑器在线网站，更加快捷：https://latexlive.com/home


## 添加公式的方法

1. 行内公式

   ```java
       $行内公式$
   ```

2. 行间公式

   ```powershell
       $$行间公式$$
   ```

## Latex 数学公式语法

1. 角标（上下标）

   - 上标命令`^{}`

   - 下标命令`_{}`

     上下标命令用来放在需要插入上下标的地方，华括弧内为上下标的内容，当角标为单个字符时候，可以不使用花括号；如果角标为多字符或者多层次的时候，必须要使用花括号。

   - 举例：

     ```
     $$x^2, x_1^2, x^{(n)}_{22}, ^{16}O^{2-}_{32}, x^{y^{z^a}}, x^{y_z}$$
     ```

     $$x^2,  x_1^2, x^{(n)}_{22}, ^{16}O^{2-}_{32}, x^{y^{z^a}}, x^{y_z}$$

     

     如果需要使用文字作为角标，首先要把文字放在\mbox{}文字模式中，另外要加上改变文字大小的命令

     例如：`$\partial f_{\mbox{\tiny 极大值}}$`
     显示：$\partial f_{\mbox{\tiny 极大值}}$

     当角标位置看起来不明显时，可以强制改变角标大小或层次，距离如下：
     `$y_N, y_{_N}$`
     显示为：$y_N, y_{_N}$

     第一种输出为正常输出，但输出效果不明显；

     第二种是将一级角标改为二级角标，字体也自动变为二级角标字体

2. 分式

   - 分式命令：\frac{分子}{分母}

   - 举例：

     - 行内分式`$\frac{x+y}{y+z}$`，显示为$𝑥+𝑦𝑦+𝑧x+yy+z$

     - 行间分式：`$\frac{x+y}{y+z}$`，显示为：

       $$𝑥+𝑦𝑦+𝑧x+yy+z$$

     上面的例子表明行内分式字体比行间字体小，因为行内分式使用的是角标字体，可以人工改变行内分式的字体大小。

     例如：`$\displaystyle\frac{x+y}{y+z}$` 显示为

     $𝑥+𝑦𝑦+𝑧x+yy+z$

     

     连分式：`$x_0+\frac{1}{x_1+\frac{1}{x_2+\frac{1}{x_3+\frac{1}{x_4}}}}$`，显示为

     $x_0+\frac{1}{x_1+\frac{1}{x_2+\frac{1}{x_3+\frac{1}{x_4}}}}$

     

     可以通过强制改变字体大小使得分子分母字体大小一致，例如(注意,这里的@需要改成井号,写成@只是为了通过hexo编译,坑爹的hexo)：
     `$\newcommand{\FS}[2]{\displaystyle\frac{@1}{@2}}x0+\FS{1}{X_1+\FS{1}{X_2+\FS{1}{X_3+\FS{1}{X_4}}}}$`

     显示为

     $$\newcommand{\FS}[2]{\displaystyle\frac{@1}{@2}}x0+\FS{1}{X_1+\FS{1}{X_2+\FS{1}{X_3+\FS{1}{X_4}}}}$$

   其中第一行命令定义了一个新的分式命令，规定每个调用该命令的分式都按`\displaystyle`的格式显示分式；分数线长度值是预设为分子分母的最大长度，如果想要使分数线再长一点，可以在分子或分母两端添加一些间隔，例如`$\frac{1}{2},\frac{\;1\;}{\;2\;}$`，显示为$\frac{1}{2},\frac{\;1\;}{\;2\;}$ .其中第一个显示是正常的显示，第二个显示是分子分母前后都放入一个间隔命令\;

   

3. 根式

   - 二次根式命令：\sqrt{表达式}

     如果表达式是个单个字符，则不需要花括号，但需要在字符和sqrt之间加入一个空格

   - n次根式命令：\sqrt[n]{表达式}

     被开方表达式字符高度不一致时，根号上面的横线可能不是在同一条直线上；为了使横线在同一条直线上，可以在被开方表达式插入一个只有高度没有宽度的数学支柱\mathstut

     例如：

     ```
     $\sqrt{a}+\sqrt{b}+\sqrt{c},\qquad \sqrt{\mathstrut a}+\sqrt{\mathstrut b}+\sqrt{\mathstrut c}$
     ```

     

      显示为：

     $\sqrt{a}+\sqrt{b}+\sqrt{c},\qquad \sqrt{\mathstrut a}+\sqrt{\mathstrut b}+\sqrt{\mathstrut c}$

     当被开方表达式高时，开方次数的位置显得略低，解决方法为：将开方此时改为上标，并拉近与根式的水平距离，即显示将命令中的`[n]`改为`[^n\!]`,其中`^`表示是上标，`\!`表示缩小间隔,例如：

     ```
     $\sqrt{1+\sqrt[p]{1+\sqrt[q]{1+a}}}$
     ```

     显示为：$\sqrt{1+\sqrt[p]{1+\sqrt[q]{1+a}}}$

     ```
     $\sqrt{1+\sqrt[^p\!]{1+\sqrt[^q\!]{1+a}}}$
     ```

     显示为：$\sqrt{1+\sqrt[^p\!]{1+\sqrt[^q\!]{1+a}}}$

     （注意比较两个根式开方次数的显示位置）

4. 求和与积分

   **求和命令**：`\sum_{k=1}^n`表达式（求和项紧随其后,下同）

   **积分命令**：`\int_a^b`表达式

   例如：

   无穷级数`$\sum_{k=1}^\infty\frac{x^n}{n!}$`显示为：$\sum_{k=1}^\infty\frac{x^n}{n!}$ 

   可以化为积分`$\int_0^\infty e^x$`显示为: $\int_0^\infty e^x$

   也即是`$∑∞0𝑥𝑛𝑛!=∫∞0𝑒𝑥∑0∞xnn!=∫0∞ex$`：$∑∞0𝑥𝑛𝑛!=∫∞0𝑒𝑥∑0∞xnn!=∫0∞ex$

   

   **改变上下限位置的命令**：`\limits`(强制上下限在上下侧) 和` \nolimits`(强制上下限在左右侧)

   例如：

   ```
    $\sum\limits_{k=1}^n$ 和 $\sum\nolimits_{k=1}^n$
   ```

   显示为： $\sum\limits_{k=1}^n$ 和 $\sum\nolimits_{k=1}^n$

   

5. 下划线、上划线等

   - 上划线命令： \overline{公式}
   - 下划线命令：\underline{公式}
     - 例如：`$\overline{\overline{a^2}+\underline{ab}+\bar{a}^3}$`显示为：$\overline{\overline{a^2}+\underline{ab}+\bar{a}^3}$
   - 上花括弧命令：\overbrace{公式}{说明}
   - 下花括弧命令：\underbrace{公式}_{说明}
     - 例如：`$\underbrace{a+\overbrace{b+\dots+b}^{m\mbox{\tiny 个}}}_{20\mbox{\scriptsize 个}}$`显示为：$\underbrace{a+\overbrace{b+\dots+b}^{m\mbox{\tiny 个}}}_{20\mbox{\scriptsize 个}}$

6. 数学重音符号
   以a为例，；如果字母i或j带有重音，字母i,y应该替换为\imath、\jmath
   `$$\hat{a}\check{a}\breve{a}\tilde{a}\bar{a}\vec{a}\acute{a}\grave{a}\mathring{a}\dot{a}\ddot{a}$$`
   显示结果为：

   $$\hat{a}\check{a}\breve{a}\tilde{a}\bar{a}\vec{a}\acute{a}\grave{a}\mathring{a}\dot{a}\ddot{a}$$

7. 堆积符号

   - `\stacrel{上位符号}{基位符号}` 基位符号大，上位符号小

   - `{上位公式\atop 下位公式}` 上下符号一样大

   - `{上位公式\choose 下位公式}` 上下符号一样大；上下符号被包括在圆弧内

   - 例如：

     ```
     \vec{x}\stackrel{\mathrm{def}}{=}{x_1,\dots,x_n}\\ {n+1 \choose k}={n \choose k}+{n \choose k-1}\\ \sum_{k_0,k_1,\ldots>0 \atop k_0+k_1+\cdots=n}A_{k_0}A_{k_1}\cdots
     ```

     显示效果为：

     $$\vec{x}\stackrel{\mathrm{def}}{=}{x_1,\dots,x_n}\\ {n+1 \choose k}={n \choose k}+{n \choose k-1}\\ \sum_{k_0,k_1,\ldots>0 \atop k_0+k_1+\cdots=n}A_{k_0}A_{k_1}\cdots$$

8. 定界符

   ```
   $$（）\big(\big) \Big(\Big) \bigg(\bigg) \Bigg(\Bigg)\big(\Big) \bigg(\Bigg)$$
   ```

   显示结果为：

   $$（）\big(\big) \Big(\Big) \bigg(\bigg) \Bigg(\Bigg)\big(\Big) \bigg(\Bigg)$$

   自适应放大命令：\left 和\right，本命令放在左右定界符前，自动随着公式内容大小调整符号大小

   例子：

   $$(𝑥)(𝑥𝑦𝑧)(x)(xyz)$$

   

9. 占位宽度

   - 两个quad空格 `a \qquad b` 两个m的宽度, 显示为：$a \qquad b$
   - quad空格 `a \quad b `一个m的宽度，显示为:  $a \quad b $
   - 大空格 `a\ b 1/3m`宽度，显示为：$a\ b 1/3m$
   - 中等空格 `a\;b 2/7m`宽度，显示为：$a\;b 2/7m$
   - 小空格` a\,b 1/6m`宽度, 显示为：$ a\,b 1/6m$
   - 没有空格 `ab`, 显示为：$ab$
   - 紧贴 `a\!b` 缩进1/6m宽度, 显示为：$a\!b$
   - \quad代表当前字体下接近字符‘M’的宽度

10. 集合相关的运算命令

    集合的大括号： `\{ ...\}`，显示为: $\{ ...\}$
    集合中的`|`： , 显示为：$|$

    属于： `\in` 显示为： $\in$
    不属于： `\not\in` 显示为： $\not\in$
    A包含于B： `A\subset B`显示为：$A\subset B$
    A真包含于B：`A \subsetneqq B` 显示为：$A \subsetneqq B$
    A包含B：`A supset B` 显示为：$A supset B$
    A真包含B：`A \supsetneqq B` 显示为: $A \supsetneqq B$
    A不包含于B：`A \not \subset B` 显示为：$A \not \subset B$
    A交B： `A \cap B` 显示为：$A \cap B$
    A并B：`A \cup B` 显示为：$A \cup B$
    A的闭包：`\overline{A}`显示为：$\overline{A}$
    A减去B: `A\setminus B`显示为：$A\setminus B$
    实数集合： `\mathbb{R}` 显示为：$ `\mathbb{R}`$
    空集：`\emptyset` 显示为：$\emptyset$
