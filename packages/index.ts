import { App } from "vue";
import * as components from "./components";
const t: any = components;
export const install: any = (app: App) => {
  for (const key of Object.keys(components)) {
    app.component(`Dc${key}`, t[key]);
  }
};
export * from "./components";
export * from "./hooks";
export default { install };
