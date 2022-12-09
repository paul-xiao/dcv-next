import path from "path";
import { defineConfig } from "vitepress";

export default defineConfig({
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
            { text: "Button", link: "/components/button" },
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
    },
  },
  vite: {
    resolve: {
      alias: {
        dcv: path.resolve(__dirname, "../../src"),
      },
      dedupe: ["vue"], // avoid error when using dependencies that also use Vue
    },
  },
});
