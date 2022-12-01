# 常见问题

## 如何本地测试组件库

npm、yarn、pnpm 均可使用创建软链接的方式添加本地库依赖，本次我们使用 yarn link

```sh
# 创建软链
# Links are registered in ~/.config/yarn/link
cd lib-path

yarn link

# 查看软链是否创建成功
cd ~/.config/yarn/link && ll

# 添加依赖
cd project-path

yarn link lib-name
```

## 组件库如何加载 types 文件

### tsconfig.json 配置

@types，typeRoots 和 types
默认所有可见的"@types"包会在编译过程中被包含进来。 node_modules/@types 文件夹下以及它们子文件夹下的所有包都是可见的； 也就是说， ./node_modules/@types/，../node_modules/@types/和../../node_modules/@types/等等。

如果指定了 typeRoots，只有 typeRoots 下面的包才会被包含进来。 比如：

```js
{
   "compilerOptions": {
       "typeRoots" : ["./typings"]
   }
}
```

这个配置文件会包含所有./typings 下面的包，而不包含./node_modules/@types 里面的包。

如果指定了 types，只有被列出来的包才会被包含进来。 比如：

```js
{
   "compilerOptions": {
        "types" : ["node", "lodash", "express"]
   }
}
```

这个 tsconfig.json 文件将仅会包含 ./node_modules/@types/node，./node_modules/@types/lodash 和./node_modules/@types/express。/@types/。 node_modules/@types/\*里面的其它包不会被引入进来。

指定"types": []来禁用自动引入@types 包。

> 注意，自动引入只在你使用了全局的声明（相反于模块）时是重要的。 如果你使用 import "foo"语句，TypeScript 仍然会查找 node_modules 和 node_modules/@types 文件夹来获取 foo 包。

## Cannot find module 'xxx' or its corresponding type declarations.ts(2307)

todo: 是否与 vscode 缓存有关，切换版本为何会解决，待验证

解决方案:

1. 切换 vscode ts 版本？
2. include 指定 type 文件路径

## 清除 vscode 缓存

ctrl+shift+p

Workspace: Cache Clean

## 组件库打包成 js 文件，如何加载 types?

package.json 设置 types 字段

```js
 "types": "./dist/types/index.d.ts",
```

## vite types 打包原理

- 什么是 esm

## tailwindcss 如何打包

利用 tailwindcss 命令行工具生成 css

```json
    "tailwind": "tailwindcss -o src/styles/tailwind.css --minify"
```

```sh
yarn tailwind
```
