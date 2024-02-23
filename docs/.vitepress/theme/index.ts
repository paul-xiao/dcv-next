import elementPlus from "element-plus";
import DcvNext from "../../../packages";
import DemoContainer from "../components/DemoContainer.vue";

import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import "element-plus/dist/index.css";
import "../../../dist/style.css";

import "./custom.css";

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.use(elementPlus);
    app.use(DcvNext);
    app.component("DemoContainer", DemoContainer);
  },
} satisfies Theme;
