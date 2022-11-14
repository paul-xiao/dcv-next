import http from "@/utils/http";

export const getArticleList = (data: any = {}) => {
  return http.post("/article/list", {
    ...data,
  });
};
export const getArticleById = (id: number) => {
  return http.get(`/article/detail/${id}`);
};
