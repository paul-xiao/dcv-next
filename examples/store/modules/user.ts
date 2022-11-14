import { defineStore } from "pinia";
import { setToken, removeToken } from "@/utils/token";
import { login } from "@/api/user";
import { ElMessage } from "element-plus";
import router from "@/router";
import { getStore, setStore } from "@/utils/storage";
import { useAppStore } from "./app";
interface UserState {
  userinfo: any;
}
export const useUserStore = defineStore("user", {
  state: (): UserState => ({
    userinfo: getStore("userinfo") || {},
  }),
  getters: {
    getToken(): any {
      return this.userinfo?.token;
    },
    getUserInfo(): any {
      return this.userinfo;
    },
  },
  actions: {
    setUserIno(userinfo) {
      this.userinfo = userinfo;
      setStore("userinfo", this.userinfo);
      setToken(this.userinfo?.token);
    },
    removeUserIno() {
      this.userinfo = {};
      setStore("userinfo", {});
      removeToken();
    },
    async login(form) {
      const res: any = await login(form);
      const { code, msg, data } = res;
      if (code === 200) {
        data && this.setUserIno(data);
        ElMessage.success(msg);
        router.push("/");
      } else {
        ElMessage.warning(msg);
      }
    },
    async logout() {
      this.removeUserIno();
      useAppStore().resetAside();
      removeToken();
      router.push("/login");
    },
  },
});
