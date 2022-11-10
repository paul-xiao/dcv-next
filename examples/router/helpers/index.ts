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
  console.log(data);

  const { setMenu } = useAppStore();
  const routerList: any[] = listToTree(data, 0);
  asyncRouter.forEach((v) => routerList.push(v));
  const parseRoute = (data: any[]) => {
    for (let i = 0, len = data.length; i < len; i++) {
      const v: any = data[i];
      v.name = v.path.split("/").join("_").replace(/^_*/, "");
      v.component = components[v.component];
      v.meta = {
        title: v.title,
      };
      if (v.children && v.children.length > 0) {
        // 默认跳转到第一个子菜单
        v.redirect = v.children[0].path;
        parseRoute(v.children);
      }
    }
  };
  parseRoute(routerList);

  setMenu(routerList);
};

export { components, generatorDynamicRouter };
