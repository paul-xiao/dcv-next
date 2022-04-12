export default [
  {
    id: 1,
    name: "基础组件",
    path: "/components",
    parentId: 0,
    component: "Layout",
    meta: { title: "基础组件", icon: "el-icon-phone" },
  },
  {
    id: 2,
    name: "表单",
    path: "/components/form",
    parentId: 1,
    component: "form",
    meta: { title: "表单", icon: "el-icon-phone" },
  },
  {
    id: 3,
    name: "表格",
    path: "/components/table",
    component: "table",
    parentId: 1,
    meta: { title: "表格", icon: "el-icon-phone" },
  },
  {
    id: 4,
    name: "可视化",
    path: "/visualization",
    component: "visualization",
    parentId: 0,
    meta: { title: "项目管理", icon: "el-icon-phone" },
  },
];
