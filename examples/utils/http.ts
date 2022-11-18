import axios from "axios";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
import { getToken } from "./token";
import { ElMessage } from "element-plus";
import { useUserStore } from "@/store/modules/user";

// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: "/api",
  // 超时
  timeout: 20000,
});
// request拦截器
service.interceptors.request.use(
  (config: any) => {
    NProgress.start(); // start progress bar
    if (getToken()) {
      config.headers.Authorization = "Bearer " + getToken(); // 让每个请求携带token--['Authorization']为自定义key 请根据实际情况自行修改
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    NProgress.done();
    // const res = response.data
    // if (res.code !== 200) {
    //   let message = ''
    //   if (res.code === 401) {
    //     message = '登录超时,请重新登录'
    //     const userStore = useUserStore()
    //     userStore.logout()
    //   } else if (res.code === 403) {
    //     message = '您的权限不足,请向管理员申请后重试'
    //   } else if (res.code === -1) {
    //     message = res.errorMsg
    //   } else {
    //     message = '未知异常,请联系工作人员'
    //     console.log('未知异常：' + JSON.stringify(res))
    //   }
    //   ElMessage.warning(message)
    // }
    return response.data;
  },
  (error) => {
    NProgress.done();
    if (error.response.status === 401) {
      const message = "登录超时,请重新登录";
      ElMessage.warning(message);
      const userStore = useUserStore();
      userStore.logout();
    }
    return Promise.reject(error);
  }
);
export default service;
