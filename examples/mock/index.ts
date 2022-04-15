import user from "./model/user";
import menu from "./model/menu";
export default [
  {
    url: "/api/getUsers",
    method: "get",
    response: () => {
      return {
        code: 0,
        message: "ok",
        data: { ...user },
      };
    },
  },
  {
    url: "/api/getMenu",
    method: "get",
    timeout: 0,
    response: () => {
      return {
        code: 0,
        message: "ok",
        data: [...menu],
      };
    },
  },
];
