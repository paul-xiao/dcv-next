import http from "@/utils/http";
import { defineStore } from "pinia";
interface AppState {
  menu: any[];
}
export const useAppStore = defineStore("app", {
  state: (): AppState => ({
    menu: [],
  }),
  getters: {
    getMenu: (state) => state.menu,
  },
  actions: {
    async loadMenu() {
      const res = await http.get("/getMenu");
      this.setMenu(res.data);
    },
    setMenu(menu: any) {
      this.menu = menu;
    },
  },
});
