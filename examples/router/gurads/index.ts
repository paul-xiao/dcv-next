import { configure, start, done } from "nprogress";
import { useAppStore } from "@/store/modules/app";
import type { Router, RouteRecordRaw } from "vue-router";
configure({ showSpinner: false });

export function setPermissionGurads(router: Router) {
  router.beforeEach(async (to) => {
    start();
    const {
      getMenu,
      getToken,
      setTab,
      generateRoutes,
      concatAllowRoutes,
      setCurrentPath,
    } = useAppStore();

    setCurrentPath(to.matched);
    if (getMenu.menuList.length === 0) {
      await generateRoutes();
      // 动态添加路由
      getMenu.menuList.forEach((route) => {
        route.pid
          ? router.addRoute(route as RouteRecordRaw)
          : router.addRoute("home", route as RouteRecordRaw);
      });
      console.log(router.getRoutes());
      console.log(!getToken);
      // 添加静态路由到菜单
      concatAllowRoutes();
      // 刷新页面 返回当前路由
      return to.fullPath;
    } else {
      // console.log(getMenu)
    }

    setTab(to);
  });

  router.afterEach(() => {
    done();
  });
}
