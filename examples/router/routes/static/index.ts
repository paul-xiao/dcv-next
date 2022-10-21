export default [
  {
    path: "/dashboard",
    name: "仪表盘",
    component: () => import("@/views/Dashboard/index.vue"),
    meta: {
      title: "仪表盘",
    },
  },
];
