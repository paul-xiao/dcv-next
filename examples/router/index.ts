import { createRouter, createWebHashHistory } from "vue-router";
// 动态路由名称映射表
const modules = import.meta.glob("../components/**/**.vue");
console.log(modules);

const components: any = {
  LAYOUT: (() => import("@/components/index.vue")) as unknown as () => Promise<
    typeof import("*.vue")
  >,
};
export const componentsRoutes: any[] = [];
Object.keys(modules).forEach((key) => {
  const route = {} as any;
  const nameMatch = key.match(/^\.\.\/components\/(.+)\.vue/);
  if (!nameMatch) return;
  // 排除_Components文件夹下的文件
  // if(nameMatch[1].includes('_Components')) return
  // 如果页面以Index命名，则使用父文件夹作为name
  const indexMatch = nameMatch[1].match(/(.*)\/index$/i);
  let name = indexMatch ? indexMatch[1] : nameMatch[1];
  name = route.name = name.replace("/", "_");
  if (name === "index") return;
  components[name] = modules[key] as () => Promise<typeof import("*.vue")>;
  route.path = `/components/${name}`;
  route.component = components[name];
  componentsRoutes.push(route);
});

console.log(components);
console.log(componentsRoutes);

export const allowRoutes = [
  {
    path: "/",
    name: "root",
    meta: {
      title: "首页",
      hidden: true,
      breadcrumbHidden: true,
    },
    redirect: "/components",
  },
  {
    path: "/components",
    name: "components",
    meta: {
      title: "components",
      hidden: true,
      breadcrumbHidden: true,
    },
    component: components["LAYOUT"],
    children: componentsRoutes,
  },
];

console.log(allowRoutes);

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes: allowRoutes, // `routes: routes` 的缩写
});
export default router;
