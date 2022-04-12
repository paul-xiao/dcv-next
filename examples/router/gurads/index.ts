import { configure, start, done } from "nprogress";
import { useAppStore } from "@/store/modules/app";
import type { Router, RouteRecordRaw } from "vue-router";
configure({ showSpinner: false });

export function setPermissionGurads(router: Router) {
  router.beforeEach(async () => {
    start();
    const { getMenu, generateRoutes } = useAppStore();
    if (getMenu.menuList.length === 0) {
      await generateRoutes();
      console.log(getMenu.menuList.length);

      // 添加路由
      for (let i = 0; i < getMenu.menuList.length; i++) {
        console.log(getMenu.menuList[i]);
        router.addRoute(getMenu.menuList[i] as RouteRecordRaw);
      }
    } else {
      // console.log(getMenu)
    }
  });

  router.afterEach(() => {
    done();
  });
}
