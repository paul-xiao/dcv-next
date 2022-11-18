import { listToTree } from "@/utils";
import _ from "lodash-es";

// 动态路由名称映射表
const modules = import.meta.glob("../../views/**/**.vue");

const components: any = {
  LAYOUT: (() => import("@/layout/main/index.vue")) as unknown as () => Promise<
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

// fix: 跳转至某个页面后，刷新404
const asyncRouter: any[] = [
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
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

/**
 * 菜单转换
 * @param menu 菜单选项
 */
const getParsedMenu = (menu: any[]) => {
  const routerList: any[] = listToTree(menu, 0);
  asyncRouter.forEach((v) => routerList.push(v));
  const parseMenu = (menu: any[]) => {
    return menu.map((m) => {
      m.name = m.path.split("/").join("_").replace(/^_*/, "");
      m.meta = {
        ...m.meta,
        title: m.title || m.meta.title,
        hidden: !!m.hidden || !!m?.meta?.hidden,
        activeMenu: m.activeMenu, // todo: 如果隐藏 默认选中父级
      };
      if (Array.isArray(m.children) && m.children.length) {
        // 默认跳转到第一个子菜单
        m.redirect = m.children[0].path;
        m.children = parseMenu(m.children);
      }
      return m;
    });
  };
  return parseMenu(routerList);
};
/**
 * 加载动态component
 * @param tree 菜单选项
 */
const getDynamicRoute = (tree: any[]) => {
  const traverse = (tree) => {
    return tree.map((t) => {
      const isSubRoot = t.pid !== 0 && t.component === "LAYOUT"; // 子节点root
      t.component =
        typeof t.component === "string"
          ? components[isSubRoot ? "Pageview" : t.component]
          : t.component;
      if (Array.isArray(t.children) && t.children.length) {
        t.children = traverse(t.children);
      }
      return t;
    });
  };
  const menuTree = _.cloneDeep(tree);
  return traverse(menuTree);
};

export { components, getDynamicRoute, getParsedMenu };
