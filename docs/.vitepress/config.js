const path = require("path");

module.exports = {
  title: "Dcv Next",
  description: "Dcv base on vue3.x",
  themeConfig: {
    repo: "http://10.1.191.15:13480/fed/dcv_next",
    sidebar: [
      {
        text: "Introduction",
        children: [
          { text: "What is Dcv Next?", link: "/" },
          { text: "Getting Started", link: "/guide/" },
          { text: "项目配置", link: "/config/" },
        ],
      },
      {
        text: "Components",
        children: [
          { text: "Component A", link: "/components/component-a" },
          { text: "Component B", link: "/components/component-b" },
        ],
      },
    ],
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
