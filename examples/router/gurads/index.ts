import { configure, start, done } from "nprogress";
import { useAppStore } from "@/store/modules/app";
import type { Router, RouteRecordRaw } from "vue-router";
configure({ showSpinner: false });

export function setPermissionGurads(router: Router) {
  router.beforeEach(async (to) => {
    start();
    const {
      getMenu,
      setTab,
      generateRoutes,
      concatAllowRoutes,
      setCurrentPath,
    } = useAppStore();
    setCurrentPath(to.matched);
    if (getMenu.menuList.length === 0) {
      await generateRoutes();
      // 动态添加路由
      for (let i = 0; i < getMenu.menuList.length; i++) {
        if (
          getMenu.menuList[i].children &&
          getMenu.menuList[i].children.length
        ) {
          router.addRoute(getMenu.menuList[i] as RouteRecordRaw);
        } else {
          // 没有子页面 添加到home下
          router.addRoute("home", getMenu.menuList[i] as RouteRecordRaw);
        }
      }
      console.log(router.getRoutes());

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
