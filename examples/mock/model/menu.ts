export default [
  {
    id: 1,
    name: "基础组件",
    path: "/components",
    parentId: 0,
    component: "Layout",
    meta: { title: "基础组件", icon: "mdi-light:home" },
  },
  {
    id: 2,
    name: "icon",
    path: "/components/icon",
    parentId: 1,
    component: "Components_Icon",
    meta: { title: "图标", icon: "mdi-light:icon" },
  },
  {
    id: 2,
    name: "表单",
    path: "/components/form",
    parentId: 1,
    component: "Components_Form",
    meta: { title: "表单", icon: "ep:xx" },
  },
  {
    id: 3,
    name: "表格",
    path: "/components/table",
    component: "Components_Table",
    parentId: 1,
    meta: { title: "表格", icon: "ep:xx" },
  },
  {
    id: 4,
    name: "可视化",
    path: "/visualization",
    component: "Visualization",
    parentId: 0,
    meta: { title: "可视化", icon: "ep:user" },
  },
  {
    id: 4,
    name: "仪表盘",
    path: "/dashboard",
    component: "Dashboard",
    parentId: 0,
    meta: { title: "仪表盘", icon: "ep:user" },
  },
];
