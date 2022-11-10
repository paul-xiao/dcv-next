import http from "@/utils/http";

const baseUrl = {
  List: "/article/list",
};
export const getList = (params: any = {}) => {
  return http.get(baseUrl.List, {
    params,
  });
};
