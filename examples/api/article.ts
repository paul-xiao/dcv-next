import http from "@/utils/http";

export const getArticleList = (params: any = {}) => {
  return http.get("/article/list", {
    params,
  });
};
export const getArticleById = (id: number) => {
  return http.get(`/article/detail/${id}`);
};
export const create = (data) => {
  return http.post("/article/create", data);
};
export const remove = (id) => {
  return http.delete(`/article/delete/${id}`);
};
