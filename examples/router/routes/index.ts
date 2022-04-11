const files: any = import.meta.globEager("./../../views/**/*.vue");

const pages = {} as any;
// 生成路由规则
const generator: any = [];
Object.keys(files).forEach((key: any) => {
  console.log(key.replace(/(\.\/|\.vue)/g, ""));

  pages[key.replace(/(\.\/..\/..\/views\/|\.vue)/g, "")] = files[key].default;
});

console.log(pages);

/**
 * 如果当前文件夹包含index则视为嵌套, 默认嵌套下层文件夹内的组件，平级组件不视为嵌套
 * @param route Object
 * @param depth Number
 *
 */
const getNestRoute = (generator: any, depth = 1, parent = "") => {
  for (const [key, val] of Object.entries(pages)) {
    const isNested = key.includes("index");
    const isParentNested = parent.includes("index");
    const curDepth = key.split("/").length;
    const rowKey = key.replace(/(index)$/, "").replace(/\/$/, "") || "";
    const isParent = key.includes(parent.replace(/(index)$/, ""));
    const path = rowKey.replace(`${parent}/`, "");
    const name = key.split("/").join("_");
    const item: any = {
      path: curDepth === 1 ? `/${path}` : path,
      name: name,
      component: val,
    };
    if (curDepth === depth && isParent) {
      if (isParentNested || isNested) {
        item.children = [];
        generator.push(item);
        getNestRoute(item.children, depth + 1, rowKey);
      } else {
        generator.push(item);
      }
    }
  }
  return generator;
};

getNestRoute(generator);
console.log(generator);

export default [...generator];
