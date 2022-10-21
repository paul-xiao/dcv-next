import { useAppStore } from "@/store/modules/app";
import { listToTree } from "@/utils";

// 动态路由名称映射表
const modules = import.meta.glob("../../views/**/**.vue");

const components: any = {
  Layout: (() => import("@/layout/main/index.vue")) as unknown as () => Promise<
    typeof import("*.vue")
  >,
  Pageview: (() =>
    import("@/layout/pageview/index.vue")) as unknown as () => Promise<
    typeof import("*.vue")
  >,
};
Object.keys(modules).forEach((key) => {
  const nameMatch = key.match(/^\.\.\/.\.\/views\/(.+)\.vue/);
  if (!nameMatch) return;
  // 排除_Components文件夹下的文件
  // if(nameMatch[1].includes('_Components')) return
  // 如果页面以Index命名，则使用父文件夹作为name
  const indexMatch = nameMatch[1].match(/(.*)\/index$/i);
  let name = indexMatch ? indexMatch[1] : nameMatch[1];
  name = name.replace("/", "_");
  components[name] = modules[key] as () => Promise<typeof import("*.vue")>;
});

const asyncRouter: any[] = [
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    //component: components["ErrorPage_404"],
    meta: {
      title: "NotFound",
      icon: "",
      hidden: true,
    },
    redirect: {
      name: "404",
    },
  },
];

const generatorDynamicRouter = (data: any[]): void => {
  const { setMenu } = useAppStore();
  const routerList: any[] = listToTree(data, 0);
  asyncRouter.forEach((v) => routerList.push(v));
  const foo = (data: any[], pData: any | null) => {
    for (let i = 0, len = data.length; i < len; i++) {
      const v: any = data[i];
      if (typeof v.component === "string")
        v.component = components[v.component];
      if (!v.meta.permission || (pData && v.meta.permission.length === 0)) {
        v.meta.permission =
          pData && pData.meta && pData.meta.permission
            ? pData.meta.permission
            : [];
      }
      if (v.children && v.children.length > 0) {
        // 默认跳转到第一个子菜单
        v.redirect = v.children[0].path;
        foo(v.children, v);
      }
    }
  };
  foo(routerList, null);
  console.log(routerList);

  setMenu(routerList);
};

export { components, generatorDynamicRouter };
