---
title: 利用git branches备份Hexo博客文件
categories:
  - Dev
tags:
  - Git
  - Hexo
index_img: 'https://blog-cnd-1307088890.cos.ap-guangzhou.myqcloud.com/git.png'
abbrlink: 202ef432
date: 2022-08-08 17:41:00
---
输入hexo d之后，Hexo根据源文件来渲染所有的页面，并部署到github上。编辑、维护文章和配置时都在本地操作，因此本地文件就显得尤为重要。一旦本地文件丢失，就无法再对博客进行维护。所以对源文件的备份是必须的。
<!-- more -->
首先需要了解一下Hexo部署的机制，Hexo在hexo deploy之后，部署到github的是编译后的文件，是用来生成网页的，并不包含hexo源文件.

说明一下情况：我的文章放在服务器上，网站托管在github，因此需要定期向github备份。万一哪天服务器抽风呢

源文件:

![](https://blog-cnd-1307088890.cos.ap-guangzhou.myqcloud.com/image-20220808104848697.png)

编译部署后：

![](https://blog-cnd-1307088890.cos.ap-guangzhou.myqcloud.com/image-20220808104643046.png)

这些编译后的文件在源文件也放了一份，它们自动生成在.deploy_git中。部署的时候就把这些文件上传到github，其他类似主题文件、配置文件都不会上传。因此解决的办法就是讲源文件做备份，上传到仓库的另一个分支。

**新建分支(首次)**

首先在github上新建一个HexoBackup分支，新建分支后，HexoBackup分支中的内容与main相同。

![](https://blog-cnd-1307088890.cos.ap-guangzhou.myqcloud.com/image-20220808105424792.png)

在本地（我的是windows）目录打开git bash，将新建的HexoBackup分支clone到本地，然后将除了`.git`文件夹以外的所有文件都删掉。

```
 git clone -b HexoBackup https://github.com/YuanZhou314/yuanzhou314.github.io.git
```

**数据下载**

然后将服务器上需要备份的数据压缩打包，用FTP软件下载到windows本地。

```
tar -zcvf blog.tar.gz --exclude=blog/node_modules blog
```

将压缩包解压到刚才分支下载的目录，并删掉`.deploy_git`文件夹。此时的路径应该是这样的：

![](https://blog-cnd-1307088890.cos.ap-guangzhou.myqcloud.com/202211011458981.png)

**忽略文件**

新建一个`.gitignore`文件（如果没有），将不需要的文件写进去，这些文件将不会被git上传。除了这些文件，如果之前有克隆过theme中的主题文件，那么应该把主题文件中的`.git`文件夹删除，因为git不能嵌套上传。总之就是检查一下是否有其他git文件，否则上传的时候会出错。

强烈建议开启隐藏文件显示：

- Windows：文件管理器中找到【查看】>【选项】>【查看】>【高级设置】>勾选显示隐藏的文件、文件夹或驱动器
- linux：ls -al

```
.DS_Store
Thumbs.db
db.json
*.log
node_modules/
public/
.deploy*/
```

**上传**

然后就可以上传了，在当前目录（yuanzhou314.github.io下）依次执行如下命令即可完成备份：

```
git add .   				# 添加当前目录文件到暂存区
git commit -m "add branch"  # 提交到本地仓库
git push origin HexoBackup  # 提交到远程仓库的HexoBackup分支
```

![](https://blog-cnd-1307088890.cos.ap-guangzhou.myqcloud.com/image-20220808111508247.png)
