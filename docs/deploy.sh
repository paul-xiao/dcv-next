#bin/bash

echo 删除dist
rm -rf .vitepress/dist/

echo 编译docs
npm run build

echo 进入dist文件夹
cd .vitepress/dist

echo 初始化git
git init

echo 提交全部文件
git add .
git commit -m "deploy docs"

#  -M: move/rename a branch, even if target exists。 可不要
git branch -M master

echo 推送到gh-pages
git push -f "git@github.com:paul-xiao/dcv-next.git" master:gh-pages

echo 提交成功！, 访问地址: https://paul-xiao.github.io/dcv-next/

