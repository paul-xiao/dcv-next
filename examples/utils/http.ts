import axios from "axios";
import router from "@/router";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
import { getToken } from "./token";
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
  (res) => {
    NProgress.done();
    return res.data;
  },
  (error) => {
    NProgress.done();
    if (error.response.status === 401) {
      router.push("/login");
    }
    return Promise.reject(error);
  }
);
export default service;
