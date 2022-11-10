import { createRouter, createWebHashHistory } from "vue-router";
import { components } from "./helpers";
// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
export const allowRoutes = [
  {
    path: "/",
    redirect: "/dashboard",
  },
  {
    path: "/404",
    name: "404",
    component: components["ErrorPage_404"],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/User/Login.vue"),
  },
];

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes: allowRoutes, // `routes: routes` 的缩写
});
export default router;
