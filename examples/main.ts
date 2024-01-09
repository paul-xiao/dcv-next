import { createApp } from "vue";
import router from "./router";

import App from "./App.vue";
// import DcvNext from "#";
// import ElementPlus from "element-plus";
import "#/styles/index.scss";
import "./styles/index.scss";
import "element-plus/theme-chalk/dark/css-vars.css";
const app = createApp(App);
// app.use(ElementPlus);
// app.use(DcvNext);
app.use(router);
app.mount("#app");
