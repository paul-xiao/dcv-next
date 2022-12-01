import { App } from "vue";
import components from "./components";
import "./assets/font/iconfont.css";
import "./styles/index.scss";
export const install: any = (app: App) => {
  for (const key of Object.keys(components)) {
    app.component(`Dc${key}`, components[key]);
  }
};
export * from "./components";
export * from "./hooks";
export default { install };
