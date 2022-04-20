import { getMenuList } from "@/api/app";
import { allowRoutes } from "@/router";
import { generatorDynamicRouter } from "@/router/helpers";
import { defineStore } from "pinia";
interface AppState {
  aside: {
    menuList: any[];
    currentPath: any[];
  };
}
export const useAppStore = defineStore("app", {
  state: (): AppState => ({
    aside: {
      menuList: [],
      currentPath: [],
    },
  }),
  getters: {
    getMenu(): any {
      return this.aside;
    },
    getCurrentPath(): any {
      return this.aside.currentPath.filter((p) => p.path !== "/");
    },
  },
  actions: {
    setMenu(menu: any) {
      this.aside.menuList = menu;
    },
    setMenuItem(menu: any) {
      this.aside.menuList = this.aside.menuList.map((d) => {
        d = d.name === menu.name ? menu : { ...d, isExpand: false };
        return d;
      });
    },
    setCurrentPath(menu: any) {
      this.aside.currentPath = menu;
    },
    async generateRoutes() {
      const res = await getMenuList();
      generatorDynamicRouter(res.data);
    },
    concatAllowRoutes(): void {
      allowRoutes.reverse().forEach((v) => this.aside.menuList.unshift(v));
    },
  },
});
