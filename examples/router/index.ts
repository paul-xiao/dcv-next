import { createRouter, createWebHashHistory } from "vue-router";

export const allowRoutes = [
  {
    path: "/",
    name: "root",
    meta: {
      title: "首页",
      hidden: true,
      breadcrumbHidden: true,
    },
    redirect: "/guide",
  },
  {
    path: "/guide",
    name: "guide",
    component: () => import("@/views/guide.vue"),
    meta: {
      title: "指南",
      hidden: true,
    },
  },
  {
    path: "/components",
    name: "components",
    redirect: "/components/button",
    meta: {
      title: "组件",
      hidden: true,
      breadcrumbHidden: true,
    },
    component: () => import("@/views/components/index.vue"),
    children: [
      {
        path: "/components/button",
        name: "button",
        component: () => import("@/views/components/button.vue"),
        meta: {
          title: "按钮",
          hidden: true,
        },
      },
      {
        path: "/components/form",
        name: "form",
        component: () => import("@/views/components/form.vue"),
        meta: {
          title: "表单",
          hidden: true,
        },
      },
      {
        path: "/components/table",
        name: "table",
        component: () => import("@/views/components/table.vue"),
        meta: {
          title: "表格",
          hidden: true,
        },
      },
    ],
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
