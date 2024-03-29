import path from "path";
import { defineConfig } from "vitepress";

export default defineConfig({
  base: "/dcv-next/",
  title: "Dcv Next",
  description: "Dcv base on vue3.x",
  head: [["link", { rel: "icon", href: "logo.png" }]],
  themeConfig: {
    // search: true,
    // author: 'paul',
    // repo: 'http://10.1.191.15:13480/fed/dcv_next',
    // outlineTitle: '当前页',
    nav: [
      { text: "起步", link: "/guide/" },
      { text: "组件", link: "/components/" },
      { text: "项目配置", link: "/config/" },
      { text: "迁移指南", link: "/migrate/" },
      { text: "任务清单", link: "/todo/" },
      { text: "常见问题", link: "/issues/" },
      { text: "常用API", link: "/api/" },
    ],
    sidebar: {
      "/guide/": [
        {
          text: "起步",
          items: [],
        },
      ],
      "/components/": [
        {
          text: "Components",
          items: [
            { text: "表单 Form", link: "/components/form" },
            { text: "按钮 Button", link: "/components/button" },
            { text: "Editor", link: "/components/editor" },
          ],
        },
      ],
      "/config/": [
        {
          text: "项目配置",
          items: [{ text: "", link: "/config/" }],
        },
      ],
      "/migrate/": [
        {
          text: "迁移指南",
          items: [{ text: "", link: "/migrate/" }],
        },
      ],
      "/todo/": [
        {
          text: "任务清单",
          items: [{ text: "", link: "/todo/" }],
        },
      ],
      "/issues/": [
        {
          text: "常见问题",
          items: [{ text: "", link: "/issues/" }],
        },
      ],
      "/api/": [
        {
          text: "ThreeJS",
          collapsed: true,
          items: [
            { text: "介绍", link: "/api/threejs/" },
            { text: "基础图元", link: "/api/threejs/primitives" },
          ],
        },
      ],
    },
  },
  vite: {
    resolve: {
      alias: {
        "dcv-next": path.resolve(__dirname, "../../packages"),
      },
      dedupe: ["vue", "dcv-next"], // avoid error when using dependencies that also use Vue
    },
  },
});
