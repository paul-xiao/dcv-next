import { getMenuList } from "@/api/app";
import { allowRoutes } from "@/router";
import { generatorDynamicRouter } from "@/router/helpers";
import { defineStore } from "pinia";
interface AppState {
  aside: {
    menuList: any[];
  };
}
export const useAppStore = defineStore("app", {
  state: (): AppState => ({
    aside: {
      menuList: [],
    },
  }),
  getters: {
    getMenu(): any {
      return this.aside;
    },
  },
  actions: {
    setMenu(menu: any) {
      console.log(menu);
      this.aside.menuList = menu;
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
