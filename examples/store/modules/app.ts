import { getList as getMenuList } from "@/api/menu";
import { allowRoutes } from "@/router";
import { getParsedMenu } from "@/router/helpers";
import { getStore, setStore } from "@/utils/storage";
import { defineStore } from "pinia";
interface AppState {
  aside: {
    menuList: any[];
    currentPath: any[];
    asideExpanded: boolean;
  };
  tab: {
    tabList: any[];
    curTab: {};
  };
}
export const useAppStore = defineStore("app", {
  state: (): AppState => ({
    aside: getStore("aside") || {
      menuList: [],
      currentPath: [],
      asideExpanded: true,
    },
    tab: getStore("tab") || {
      tabList: [],
      curTab: {},
    },
  }),
  getters: {
    getAside(): any {
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
      this.aside.menuList = [...menu];
      setStore("aside", this.aside);
    },
    setMenuItem(menu: any) {
      // 关闭其他
      this.aside.menuList = this.aside.menuList.map((d) => {
        d = d.name === menu.name ? menu : { ...d, expanded: false };
        return d;
      });
      setStore("aside", this.aside);
    },
    toggleMenu() {
      this.aside.asideExpanded = !this.aside.asideExpanded;
      setStore("aside", this.aside);
    },
    setCurrentPath(menu: any) {
      this.aside.currentPath = menu;
      setStore("aside", this.aside);
    },
    setTab(tab: IPath) {
      const isTabExsit = this.tab.tabList.find((t: any) => t.name === tab.name);
      const menu = this.aside.menuList.find(
        (m) => m.name === tab?.matched[0]?.name
      );
      this.setMenuItem({ ...menu, expanded: true });
      if (isTabExsit) return;
      this.tab.tabList.push(tab);
      setStore("tab", this.tab);
    },
    removeTab(tab: IPath) {
      this.tab.tabList = this.tab.tabList.filter(
        (d: any) => d.name !== tab.name
      );
      setStore("tab", this.tab);
    },
    concatAllowRoutes(): void {
      allowRoutes.reverse().forEach((v) => this.aside.menuList.unshift(v));
      setStore("aside", this.aside);
    },
    async getMenuList() {
      try {
        const res = await getMenuList();
        this.setMenu(getParsedMenu(res.data));
      } catch (error) {
        console.log(error);
      }
    },
    resetAside() {
      this.aside = Object.assign(
        {},
        { menuList: [], currentPath: [], asideExpanded: true }
      );
      setStore("aside", this.aside);
    },
  },
});
