import { createApp } from "vue";
import router from "./router";

import App from "./App.vue";
import DcvNext from "../src";
import "element-plus/dist/index.css";
const app = createApp(App);
app.use(DcvNext);
app.use(router);
app.mount("#app");
