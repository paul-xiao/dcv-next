# 迁移指南

## vite 设置 alias

修改
vite.config.ts

```js
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

```js
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

```bash
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

- Vuex 和 Pinia 的优缺点

  - Vuex 的优点

  支持调试功能，如时间旅行和编辑

  适用于大型、高复杂度的 Vue.js 项目

  - Vuex 的缺点

  从 Vue 3 开始，getter 的结果不会像计算属性那样缓存

  Vuex 4 有一些与类型安全相关的问题

  - Pinia 的优点

  完整的 TypeScript 支持：与在 Vuex 中添加 TypeScript 相比，添加 TypeScript 更容易

  极其轻巧（体积约 1KB）

  store 的 action 被调度为常规的函数调用，而不是使用 dispatch 方法或 MapAction 辅助函数，这在 Vuex 中很常见

  支持多个 Store

  支持 Vue devtools、SSR 和 webpack 代码拆分

  - Pinia 的缺点

  不支持时间旅行和编辑等调试功能

### [pinia](https://pinia.vuejs.org/introduction.html)

创建 pinia

```js
import { createPinia } from "pinia";

const store = createPinia();

export default store;
```

定义 store

```js
import http from "@/utils/http";
import { defineStore } from "pinia";
interface AppState {
  menu: any[];
}
export const useAppStore = defineStore("app", {
  state: (): AppState => ({
    menu: [],
  }),
  getters: {
    getMenu: (state) => state.menu,
  },
  actions: {
    async loadMenu() {
      const res = await http.get("/getMenu");
      this.setMenu(res.data);
    },
    setMenu(menu: any) {
      this.menu = menu;
    },
  },
});
```

使用 store

```js
import { useAppStore } from "@/store/modules/app";
const appStore = useAppStore();

//getters
const menus = computed(() => appStore.getMenu);

//actions

appStore.loadMenu();
```
