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

## 动态路由

- 路由跳转前判断路由是否初始化

```js
export function setPermissionGurads(router: Router) {
  router.beforeEach(async (to) => {
    start();
    const { getMenu, generateRoutes, concatAllowRoutes } = useAppStore();
    if (getMenu.menuList.length === 0) {
      await generateRoutes();
      console.log(getMenu.menuList.length);

      // 动态添加路由
      for (let i = 0; i < getMenu.menuList.length; i++) {
        console.log(getMenu.menuList[i]);

        if (
          getMenu.menuList[i].children &&
          getMenu.menuList[i].children.length
        ) {
          router.addRoute(getMenu.menuList[i] as RouteRecordRaw);
        } else {
          // 没有子页面 添加到home下
          router.addRoute("home", getMenu.menuList[i] as RouteRecordRaw);
        }
      }
      // 添加静态路由到菜单
      concatAllowRoutes();
      // 刷新页面 返回当前路由
      return to.fullPath;
    } else {
      // console.log(getMenu)
    }
  });

  router.afterEach(() => {
    done();
  });
}

```

## svg iocn

### 原理

> [svg sprite](https://zhuanlan.zhihu.com/p/321684538)

```jsx
<svg><symbol viewBox="0 0 128 128" id="icon-404"><path d="M121.718 73.272v9.953c3.957-7.584 6.199-16.05 6.199-24.995C127.917 26.079 99.273 0 63.958 0 28.644 0 0 26.079 0 58.23c0 .403.028.806.028 1.21l22.97-25.953h13.34l-19.76 27.187h6.42V53.77l13.728-19.477v49.361H22.998V73.272H2.158c5.951 20.284 23.608 36.208 45.998 41.399-1.44 3.3-5.618 11.263-12.565 12.674-8.607 1.764 23.358.428 46.163-13.178 17.519-4.611 31.938-15.849 39.77-30.513h-13.506V73.272H85.02V59.464l22.998-25.977h13.008l-19.429 27.187h6.421v-7.433l13.727-19.402v39.433h-.027zm-78.24 2.822a10.516 10.516 0 0 1-.996-4.535V44.548c0-1.613.332-3.124.996-4.535a11.66 11.66 0 0 1 2.713-3.68c1.134-1.032 2.49-1.864 4.04-2.468 1.55-.605 3.21-.908 4.982-.908h11.292c1.77 0 3.431.303 4.981.908 1.522.604 2.85 1.41 3.986 2.418l-12.26 16.303v-2.898a1.96 1.96 0 0 0-.665-1.512c-.443-.403-.996-.604-1.66-.604-.665 0-1.218.201-1.661.604a1.96 1.96 0 0 0-.664 1.512v9.071L44.364 77.606a10.556 10.556 0 0 1-.886-1.512zm35.73-4.535c0 1.613-.332 3.124-.997 4.535a11.66 11.66 0 0 1-2.712 3.68c-1.134 1.032-2.49 1.864-4.04 2.469-1.55.604-3.21.907-4.982.907H55.185c-1.77 0-3.431-.303-4.981-.907-1.55-.605-2.906-1.437-4.041-2.47a12.49 12.49 0 0 1-1.384-1.512l13.727-18.217v6.375c0 .605.222 1.109.665 1.512.442.403.996.604 1.66.604.664 0 1.218-.201 1.66-.604a1.96 1.96 0 0 0 .665-1.512V53.87L75.97 36.838c.913.932 1.66 1.99 2.214 3.175.664 1.41.996 2.922.996 4.535v27.011h.028z"></path></symbol> <svg>

 <svg>
    <use xlink:href="#icon-404" />
  </svg>

```

### vite 实现

```js
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
createSvgIconsPlugin({
  // 指定需要缓存的图标文件夹
  iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
  // 指定symbolId格式
  symbolId: "icon-[dir]-[name]",
});
```

vite 虚拟模块
[Vite 引入虚拟文件的实现](https://www.jb51.net/article/220164.htm)

```js
import "virtual:svg-icons-register";
```

## iconify icon

在线使用获取 icon

```js
import { Icon } from "@iconify/vue";

<Icon icon="mdi-light:home" />;
```
