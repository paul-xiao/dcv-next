const path = require("path");

module.exports = {
  title: "Dcv Next",
  description: "Dcv base on vue3.x",
  themeConfig: {
    search: true,
    author: "paul",
    repo: "http://10.1.191.15:13480/fed/dcv_next",
    nav: [
      { text: "介绍", link: "/guide/" },
      { text: "组件", link: "/components/" },
      { text: "项目配置", link: "/config/" },
      { text: "Todo List", link: "/todo/" },
    ],
    sidebar: {
      "/guide/": [
        {
          text: "介绍",
        },
      ],
      "/components/": [
        {
          text: "Components",
          children: [
            { text: "Component A", link: "/components/component-a" },
            { text: "Component B", link: "/components/component-b" },
          ],
        },
      ],
      "/config/": [
        {
          text: "项目配置",
          children: [{ text: "", link: "/config/" }],
        },
      ],
      "/migrate/": [
        {
          text: "迁移指南",
          children: [{ text: "", link: "/migrate/" }],
        },
      ],
      "/todo/": [
        {
          text: "todo",
          children: [{ text: "", link: "/todo/" }],
        },
      ],
    },
  },
  vite: {
    resolve: {
      alias: {
        dcv: path.resolve(__dirname, "../../src"),
      },
      dedupe: ["vue", /primevue\/.+/], // avoid error when using dependencies that also use Vue
    },
  },
};
