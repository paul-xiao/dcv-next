import { createStore } from "vuex";
import menu from "./modules/menu";
const store = createStore({
  modules: {
    menu,
  },
});

export default store;
