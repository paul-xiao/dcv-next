import { createApp } from "vue";
import App from "./App.vue";
import "tailwindcss/tailwind.css";
import ElementPlus from "element-plus";
import * as ElIcons from "@element-plus/icons-vue";
import "element-plus/dist/index.css";
import "nprogress/nprogress.css";
import "./theme/index.scss";
import router from "./router";
import store from "./store";
import { setPermissionGurads } from "./router/gurads";
import dcv from "../src";
import "virtual:svg-icons-register";
import "@purge-icons/generated"; // 添加进来
const app = createApp(App);

app.use(ElementPlus);
for (const name in ElIcons) {
  app.component(name, (ElIcons as any)[name]);
}

app.use(dcv);
app.use(router);
setPermissionGurads(router);
app.use(store);
app.mount("#app");
