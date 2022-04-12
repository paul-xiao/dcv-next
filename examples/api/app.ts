import http from "@/utils/http";

export const getMenuList = (params: any = {}) => {
  return http.get("/getMenu", {
    params,
  });
};
