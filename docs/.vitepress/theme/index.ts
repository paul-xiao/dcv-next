import DefaultTheme from "vitepress/theme";

import DcvNext from "../../../src";
import DemoContainer from "../components/DemoContainer.vue";
import "./custom.css";

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.use(DcvNext);
    app.component("DemoContainer", DemoContainer);
  },
};
