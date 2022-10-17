import { App } from "vue";
import * as components from "./components";
import "./assets/font/iconfont.css";
function install(app: App) {
  for (const key in components) {
    app.component(`Dc${key}`, components[key]);
  }
}

export default { install };

// export * from "./components";
// export * from "./constants";
// export * from "./utils";
