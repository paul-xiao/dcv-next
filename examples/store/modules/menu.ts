import http from "@/utils/http";
export default {
  state: {
    menuList: [],
  },
  mutations: {
    setMenu(state: any, menu: []) {
      state.menuList = menu;
    },
  },
  actions: {
    initMenu({ commit }) {
      return new Promise(async (resolve, reject) => {
        try {
          const res = await http.get("/getMenu");
          commit("setMenu", res.data);
          resolve(res.data);
        } catch (error) {
          reject(error);
        }
      });
    },
  },
  getters: {
    menuList: (state) => state.menuList,
  },
};
