#!/bin/bash

if [ "$1" == "local"  ];then
    hexo clean
    hexo g
    hexo s
elif [ "$1" == "github" ];then
    git config --global  --unset https.https://github.com.proxy
    git config --global  --unset http.https://github.com.proxy
    hexo clean
    hexo g
    hexo d
else
	echo "Parameter validation failed!"
fi
