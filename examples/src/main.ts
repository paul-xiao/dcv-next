import { createApp } from "vue";
import router from "./router";

import App from "./App.vue";
// import DcvNext from 'dcv-next/packages';
import ElementPlus from "element-plus";
import "tailwindcss/tailwind.css";
import "@dcv-next/theme/src/index.scss";
import "./styles/index.scss";
import "element-plus/theme-chalk/dark/css-vars.css";
import { ID_INJECTION_KEY } from "element-plus";
const app = createApp(App);

app.provide(ID_INJECTION_KEY, {
  prefix: 1024,
  current: 0,
});
app.use(ElementPlus);
// app.use(DcvNext);
app.use(router);
app.mount("#app");
