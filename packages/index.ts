import { App } from "vue";
import "./styles/index.scss";
import * as components from "./components";
export const install: any = (app: App) => {
  for (const key of Object.keys(components)) {
    app.component(`Dc${key}`, components[key]);
  }
};
export * from "./components";
export * from "./hooks";
export default { install };
