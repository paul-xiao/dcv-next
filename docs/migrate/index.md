# 迁移指南

## vite 设置 alias

修改
vite.config.ts

```
export default defineConfig({
  plugins: [vue()],
  alias:{
+   '@':'/src/',
+   '@components':'/src/components/',
+   '@assets':'/src/assets/',
  }
})

```

tsconfig.json
配完后可以直接使用，但是编辑器会标红，需要修改 tsconfig.json

加上 baseUrl 跟 paths

```
{
  ...
  "compilerOptions": {
    ...
+   "baseUrl": "./",
+   "paths": {
+     "@/*": ["./src/*"],
+     "@components/*": ["./src/components/*"],
+     "@assets/*": ["./src/assets/*"]
+   }
  },
  ...
}
```

## mock

1. MockJS 依赖的安装#

```sh
# 使用 npm 安装
npm install mockjs vite-plugin-mock cross-env -D
# 使用 yarn 安装
yarn add mockjs vite-plugin-mock cross-env -D
pnpm add -D mockjs vite-plugin-mock cross-env
```

2. 在 package.json 中设置环境变量#

```json
{
  "scripts": {
    // 修改dev构建脚本的命令
    "dev": "cross-env NODE_ENV=development vite",
    "build": "vite build",
    "serve": "vite preview"
  }
}
```

3. 在 vite.config.js 中添加 mockjs 插件#

```js
import vue from "@vitejs/plugin-vue";
import { viteMockServe } from "vite-plugin-mock";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    vue(),
    viteMockServe({
      supportTs: false,
    }),
  ],
});
```

4. 在项目中创建 mock 文件夹，在其中创建需要的数据接口

```js
// 仅做示例: 通过GET请求返回一个名字数组
export default [
  {
    url: "/api/getUsers",
    method: "get",
    response: () => {
      return {
        code: 0,
        message: "ok",
        data: ["tom", "jerry"],
      };
    },
  },
];
```

5. 在项目中使用此接口#

```js
fetch("/api/getUsers")
  .then((response) => {
    response.json();
  })
  .then((data) => {
    console.log(data);
  });
```

## vue-router

安装依赖

```
pnpm add -D vue-router@next
```

基础配置

```js
import { createRouter, createWebHashHistory } from "vue-router";
import Layout from "@/layout/index.vue";

// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
const routes = [
  {
    path: "/",
    name: "home",
    component: Layout,
    redirect: "dashboard",
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: () => import("@/views/dashboard.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login.vue"),
  },
];

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
});
export default router;
```

## vuex or pinia
