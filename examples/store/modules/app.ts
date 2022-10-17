import { getMenuList } from "@/api/app";
import { allowRoutes } from "@/router";
import { generatorDynamicRouter } from "@/router/helpers";
import { defineStore } from "pinia";
interface AppState {
  aside: {
    menuList: any[];
    currentPath: any[];
    asideExpanded: boolean;
  };
  tab: any;
}
export const useAppStore = defineStore("app", {
  state: (): AppState => ({
    aside: {
      menuList: [],
      currentPath: [],
      asideExpanded: true,
    },
    tab: {
      tabList: [],
      curTab: {},
    },
  }),
  getters: {
    getMenu(): any {
      return this.aside;
    },
    getCurrentPath(): any {
      return this.aside.currentPath.filter((p) => p.path !== "/");
    },
    getTab(): any {
      return this.tab;
    },
  },
  actions: {
    setMenu(menu: any) {
      this.aside.menuList = menu;
    },
    setMenuItem(menu: any) {
      // 关闭其他
      this.aside.menuList = this.aside.menuList.map((d) => {
        d = d.name === menu.name ? menu : { ...d, expanded: false };
        return d;
      });
    },
    toggleMenu() {
      this.aside.asideExpanded = !this.aside.asideExpanded;
    },
    setCurrentPath(menu: any) {
      this.aside.currentPath = menu;
    },
    setTab(tab: IPath) {
      const isTabExsit = this.tab.tabList.find((t: any) => t.name === tab.name);
      const menu = this.aside.menuList.find(
        (m) => m.name === tab.matched[0].name
      );
      this.setMenuItem({ ...menu, expanded: true });
      if (isTabExsit) return;
      this.tab.tabList.push(tab);
    },
    removeTab(tab: IPath) {
      this.tab.tabList = this.tab.tabList.filter(
        (d: any) => d.name !== tab.name
      );
    },
    async generateRoutes() {
      try {
        const res = await getMenuList();
        generatorDynamicRouter(res.data);
      } catch (error) {
        console.log(error);
      }
    },
    concatAllowRoutes(): void {
      allowRoutes.reverse().forEach((v) => this.aside.menuList.unshift(v));
    },
  },
});
