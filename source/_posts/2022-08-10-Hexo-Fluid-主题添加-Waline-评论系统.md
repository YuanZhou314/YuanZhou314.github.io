---
title: Hexo-Fluid 主题添加 Waline 评论系统
categories:
  - Dev
tags:
  - Hexo
index_img: >-
  https://blog-cnd-1307088890.cos.ap-guangzhou.myqcloud.com/download-16601251561781.png
abbrlink: d4c8af85
date: 2022-08-10 17:50:24
---
在Fluid官网可以看到。Fluid默认支持了很多评论系统，国内用的比较多的还是Waline，但我并没有发现在Fluid主体下添加Walined之类的文章，所以这里也记录一下操作路程以及踩的一些坑
<!-- more -->
<!-- categories:Dev、Ops、Study、Sth、News-->
<!-- tags: 
Python、MySQL、LeetCode、机器学习、Linux、Big Data、Java、BlockChain、Docker、Web 、分布式、
Maven、数据结构、JVM、JavaScript、Crontab、Shell、Ubuntu、VPN、NodeJS、String、VM、Hadoop、
Life、树莓派、Git、Hexo
 -->


![](https://blog-cnd-1307088890.cos.ap-guangzhou.myqcloud.com/image-20220810164855153.png)

我之前是用valine的，但无奈太难用了，也不支持通知，所以就换成Waline。其实[Waline官方文档](https://waline.js.org/guide/get-started.html)搭建配置写的十分详细，本文档也是参考Waline来写的，只是添加了我本人的补充，请耐心观看。



### LeanCloud 设置 (数据库)

1. [登录](https://console.leancloud.app/login)或 注册 `LeanCloud 国际版` 并进入控制台。建议是注意国际版，不要用国内版本。注意mac使用safari浏览器访问leancloud国际版可能会上不去或者提示403，这个很坑爹，换Chrome就好了。

2. 点击左上角 [创建应用](https://console.leancloud.app/apps) 并起一个你喜欢的名字 (请选择免费的开发版):

   ![创建应用](https://blog-cnd-1307088890.cos.ap-guangzhou.myqcloud.com/leancloud-1.f7a36b20.png)

3. 进入应用，选择左下角的 `设置` > `应用 Key`。你可以看到你的 `APP ID`,`APP Key` 和 `Master Key`。请记录它们，以便后续使用。

   ![ID 和 Key](https://blog-cnd-1307088890.cos.ap-guangzhou.myqcloud.com/leancloud-2.4cc69975.png)



### Vercel 部署 (服务端)

[![Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fwalinejs%2Fwaline%2Ftree%2Fmain%2Fexample)

1. 点击上方按钮，跳转至 Vercel 进行 Server 端部署。

   注

   如果你未登录的话，Vercel 会让你注册或登录，请使用 GitHub 账户进行快捷登录。

2. 输入一个你喜欢的 Vercel 项目名称并点击 `Create` 继续。（建议手动添加一个项目，这样会在你的仓库里新增一个库）

   ![创建项目](https://waline.js.org/assets/vercel-1.4e9dd7aa.png)

3. 此时 Vercel 会基于 Waline 模板帮助你新建并初始化仓库，仓库名为你之前输入的项目名。

   ![deploy](https://waline.js.org/assets/vercel-3.0918fcee.png)

   一两分钟后，满屏的烟花会庆祝你部署成功。此时点击 `Go to Dashboard` 可以跳转到应用的控制台。

   ![deploy](https://waline.js.org/assets/vercel-4.f7f4c12b.png)

4. 点击顶部的 `Settings` - `Environment Variables` 进入环境变量配置页，并配置三个环境变量 `LEAN_ID`, `LEAN_KEY` 和 `LEAN_MASTER_KEY` 。它们的值分别对应上一步在 LeanCloud 中获得的 `APP ID`, `APP KEY`, `Master Key`。

   ![设置环境变量](https://waline.js.org/assets/vercel-5.3a5de7f0.png)

   

   这里需要注意的是：环境变量里填写的NAME为LEAN_ID、LEAN_KEY、LEAN_MASTER_KEY这些，**不要直接把leancloud里的名字和值填进去**，否则会报500的错！！！这点巨坑！！

   | Lean Cloud | Vercel Environment |
   | ---------- | ------------------ |
   | AppID      | LEAN_ID            |
   | AppKey     | LEAN_KEY           |
   | MasterKey  | LEAN_MASTER_KEY    |

   注意：如果你使用 LeanCloud 国内版，请额外配置 `LEAN_SERVER` 环境变量，值为你绑定好的域名。

5. 环境变量配置完成之后点击顶部的 `Deployments` 点击顶部最新的一次部署右侧的 `Redeploy` 按钮进行重新部署。该步骤是为了让刚才设置的环境变量生效。

   ![redeploy](https://waline.js.org/assets/vercel-6.c1af01b1.png)

   1. 此时会跳转到 `Overview` 界面开始部署，等待片刻后 `STATUS` 会变成 `Ready`。此时请点击 `Visit` ，即可跳转到部署好的网站地址，此地址即为你的服务端地址，服务端地址也就`serverURL`，在Fluid的配置文件中，有2个地方需要用到它。注意：**每次部署后的地址是不一样的**，以最后一次的地址为主。服务器地址的格式是：commentxxxx-xxxxxxx.vercel.app

   ![redeploy success](https://waline.js.org/assets/vercel-7.2478902b.png)

### 绑定域名（可选，略，见官网）



### HTML 引入 (客户端)

官网只介绍了Waline标签，但没有告诉我们具体在哪里引入，所以不太友好。这种第三方的JS、HTML在Fluid官网也有[介绍](https://fluid-dev.github.io/hexo-fluid-docs/guide/#%E8%87%AA%E5%AE%9A%E4%B9%89-js-css-html)，所以直接在Fluid主题配置引入，也就是博客根目录/themes/fluid/_config.yml。

```
custom_js: 'https://unpkg.com/@waline/client@v2/dist/waline.js'

custom_css: 'https://unpkg.com/@waline/client@v2/dist/waline.css'

custom_html: '<div id="waline"></div>
  <script>
    Waline.init({
      el: "#waline",
      serverURL: "https://comment-xxxxx-xxxx.vercel.app/",
    });
  </script>'
```

![image-20220810174800349](https://blog-cnd-1307088890.cos.ap-guangzhou.myqcloud.com/image-20220810174800349.png)

再配置comment插件的地方
![](https://blog-cnd-1307088890.cos.ap-guangzhou.myqcloud.com/1f49de838b4445488b81a4801c20952.jpg)

到这里就OK了，部署之后就可以正常运行了。然后访问 `<serverURL>/ui/register` 进行注册，就可以管理评论了。（部署到github后需要等几分钟再查看）

