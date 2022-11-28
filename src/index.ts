import { App } from "vue";
import * as components from "./components";
import "./assets/font/iconfont.css";
function install(app: App) {
  for (const key in Object.keys(components)) {
    app.component(`Dc${key}`, components[key]);
  }
}

export * from "./components";
export * from "./hooks";
export default { install };
