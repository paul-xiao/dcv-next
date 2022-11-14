import { configure, start, done } from "nprogress";
import { useAppStore } from "@/store/modules/app";
import type { Router, RouteRecordRaw } from "vue-router";
import { useUserStore } from "@/store/modules/user";
import { getDynamicRoute } from "../helpers";
import { removeToken } from "@/utils/token";
configure({ showSpinner: true });

function hasNecessaryRoute(router, to) {
  // 路由不存在时， to.name 为 undefine
  const routeName = to.fullPath.split("/").join("_").replace(/^_*/, "");
  return router.hasRoute(routeName) && to.name !== routeName;
}

function setRoute(router, menuList) {
  const routes = getDynamicRoute(menuList); // 动态加载组件 不能缓存到Sessionstorage
  // 动态添加路由
  routes.forEach((route) => {
    if (route?.children?.length) {
      router.addRoute(route as RouteRecordRaw);
    } else {
      router.addRoute("root", route as RouteRecordRaw);
    }
  });
}

export function setPermissionGurads(router: Router) {
  router.beforeEach(async (to) => {
    start();
    const { getAside, setTab, getMenuList, setCurrentPath } = useAppStore();
    const { getToken } = useUserStore();

    setCurrentPath(to.matched);
    if (to.name !== "login") {
      if (!getToken) {
        // ❗️ 避免无限重定向
        done();
        return { name: "login" };
      }
      if (!getAside.menuList.length) {
        await getMenuList(); // 接口获取路由数据
        setRoute(router, getAside.menuList);
        return to.fullPath;
      } else {
        setRoute(router, getAside.menuList);
        if (hasNecessaryRoute(router, to)) {
          return to.fullPath;
        }
      }
      setTab(to);
    } else {
      removeToken();
    }
  });

  router.afterEach(() => {
    done();
  });
}
