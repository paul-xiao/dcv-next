import http from "@/utils/http";

export const getTagList = (params: any = {}) => {
  return http.get("/tag/list", {
    params,
  });
};
