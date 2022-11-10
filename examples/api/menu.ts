import http from "@/utils/http";

const baseUrl = {
  List: "/menu/list",
};
export const getList = (params: any = {}) => {
  return http.get(baseUrl.List, {
    params,
  });
};
