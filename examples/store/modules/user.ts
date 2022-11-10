import { defineStore } from "pinia";
import { setToken } from "@/utils/token";
import { login } from "@/api/user";
import { ElMessage } from "element-plus";
import router from "@/router";
interface UserState {
  userinfo: any;
}
export const useUserStore = defineStore("user", {
  state: (): UserState => ({
    userinfo: {
      token: "",
    },
  }),
  getters: {
    getToken(): any {
      return this.userinfo?.token;
    },
  },
  actions: {
    setToken(token) {
      this.userinfo.token = token;
      setToken(token);
    },
    async login(form) {
      const res: any = await login(form);
      const { code, msg, data } = res;
      if (code === 200) {
        data?.token && this.setToken(data?.token);
        ElMessage.success(msg);
        router.push("/");
      } else {
        ElMessage.warning(msg);
      }
    },
  },
});
