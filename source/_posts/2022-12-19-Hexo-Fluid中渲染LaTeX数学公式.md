---
title: Hexo Fluid中渲染LaTeX数学公式
categories:
  - Dev
tags:
  - Hexo
abbrlink: 97e4add3
date: 2022-12-19 11:11:28
index_img:
---

<!-- more -->
<!-- categories:Dev、Ops、Study、Sth、News、work-->
<!-- tags: 
Python、MySQL、LeetCode、机器学习、Linux、Big Data、Java、BlockChain、Docker、Web 、分布式、
Maven、数据结构、JVM、JavaScript、Crontab、Shell、Ubuntu、VPN、NodeJS、String、VM、Hadoop、
Life、树莓派、Git、Hexo、算法、运维、网络、看法、电影、美学、写作、哲学、文档、绘画、前端、
历史、政治、社会、导购
 -->


原生的md渲染器`hexo-renderer-markdowed`对复杂公式并不太友好，如果需要支持数学公式，需要换新的渲染器。Fluid主题内置LaTeX功能的，详见[官网](https://hexo.fluid-dev.com/docs/guide/#latex-%E6%95%B0%E5%AD%A6%E5%85%AC%E5%BC%8F)。但是我这里没有用官网的教程，用的是另一位大佬的博客文章。官网用的渲染器是`hexo-renderer-markdown-it`，他用的是`hexo-renderer-markdown-it-plus`，看其他人也是推荐这个，相对来说它会好很多，毕竟是plus嘛。这里也贴一下他的[主页](https://wty-yy.github.io/)

也有其他人选择使用 MathJax，MathJax 虽然语法比较全，但加载会很慢，并且有些内联公式里面的转义字符`\`不太支持。KaTeX渲染很快，小部分语法例如equation、align等不支持，总的来数够用了。

设置如下：

### 更改Markdown渲染器

注意不能安装多个渲染器，这样会渲染多次，所以检查一下，这些都要删掉

```
npm un hexo-renderer-marked --save
npm un hexo-renderer-kramed --save
```

安装katex

```
npm i hexo-renderer-markdown-it-plus --save
```

如果想要更好的视觉体验，推荐安装hexo官方的hexo-math，让字体变得更好看

```
npm install hexo-math --save
```



### 修改hexo博客配置文件

修改`hexo/_config.yml`，在文末加入以下信息

```
math:
  engine: katex
  katex:
    css: https://fastly.jsdelivr.net/npm/katex@0.10.0/dist/katex.min.css
    js: https://fastly.jsdelivr.net/npm/katex@0.10.0/dist/katex.min.js
    config:
      # KaTeX config
      throwOnError: false
      errorColor: "#cc0000"
```



### 修改fluid主题配置文件

注意`specific`参数，自定义页面默认不加载渲染，在文章头中加入`math: true`才会启用公式渲染，

```
post:
  math:
    enable: true
    specific: true
    engine: katex
```

修改配置完成后，清除缓存并重启：

```
hexo clean && hexo s
```



### 查看渲染结果

行内公式： $f w,b (x)=wx+b$

行间公式

$$J(w,b)=\frac{1}{2m} \sum_{m}^{i=1}(f_{w,b}(x^{(i)})-y^{(i)} )^{2}$$
