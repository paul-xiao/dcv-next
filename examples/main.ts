import { createApp } from "vue";
import App from "./App.vue";
import "tailwindcss/tailwind.css";
import ElementPlus from "element-plus";
import * as ElIcons from "@element-plus/icons-vue";
import "element-plus/dist/index.css";
import router from "./router";
import store from "./store";

const app = createApp(App);

app.use(ElementPlus);
for (const name in ElIcons) {
  app.component(name, (ElIcons as any)[name]);
}

app.use(router);
app.use(store);
app.mount("#app");
