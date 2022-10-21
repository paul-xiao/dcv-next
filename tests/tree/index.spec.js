// /**
//  * @param tree tree data
//  * @param node tree data
//  */

// const MockData = [
//   {
//     path: "/",
//     name: "home",
//     redirect: "/dashboard",
//   },
//   {
//     path: "/404",
//     name: "404",
//   },
//   {
//     path: "/login",
//     name: "login",
//   },
//   {
//     id: 1,
//     name: "基础组件",
//     path: "/components",
//     parentId: 0,
//     redirect: "/components/form",
//     order: 2,
//     meta: {
//       title: "基础组件",
//       icon: "mdi-light:home",
//     },
//     children: [
//       {
//         id: 12,
//         name: "表单",
//         path: "/components/form",
//         parentId: 1,
//         order: 1,
//         meta: {
//           title: "表单",
//           icon: "ep:xx",
//         },
//         children: [],
//       },
//       {
//         id: 11,
//         name: "icon",
//         path: "/components/icon",
//         parentId: 1,
//         order: 2,
//         meta: {
//           title: "图标",
//           icon: "mdi-light:icon",
//         },
//         children: [],
//       },
//       {
//         id: 13,
//         name: "表格",
//         path: "/components/table",
//         parentId: 1,
//         meta: {
//           title: "表格",
//           icon: "ep:xx",
//         },
//         children: [],
//       },
//       {
//         id: 14,
//         name: "编辑器",
//         path: "/components/editor",
//         parentId: 1,
//         meta: {
//           title: "编辑器",
//           icon: "ep:xx",
//         },
//         children: [],
//       },
//     ],
//     hasChildren: true,
//   },
//   {
//     id: 7,
//     name: "visualization",
//     path: "/visualization",
//     parentId: 0,
//     order: 3,
//     meta: {
//       title: "可视化",
//       icon: "ep:user",
//     },
//     children: [
//       {
//         id: 8,
//         name: "chart",
//         path: "/visualization/chart",
//         parentId: 7,
//         order: 3,
//         meta: {
//           title: "基础图表",
//           icon: "ep:user",
//         },
//         children: [
//           {
//             id: 81,
//             name: "chartA",
//             path: "/visualization/chart/chartA",
//             parentId: 8,
//             order: 3,
//             meta: {
//               title: "chartA",
//               icon: "ep:user",
//             },
//             children: [
//               {
//                 id: 811,
//                 name: "chartAA",
//                 path: "/visualization/chart/chartA",
//                 parentId: 81,
//                 order: 3,
//                 meta: {
//                   title: "chartAA",
//                   icon: "ep:user",
//                 },
//               },
//               {
//                 id: 812,
//                 name: "chartAB",
//                 path: "/visualization/chart/chartA",
//                 parentId: 81,
//                 order: 3,
//                 meta: {
//                   title: "chartAA",
//                   icon: "ep:user",
//                 },
//               },
//             ],
//           },
//           {
//             id: 82,
//             name: "chartB",
//             path: "/visualization/chart/chartB",
//             parentId: 8,
//             order: 3,
//             meta: {
//               title: "chartB",
//               icon: "ep:user",
//             },
//             children: [],
//           },
//         ],
//         redirect: "/visualization/chart/chartA",
//         hasChildren: true,
//       },
//       {
//         id: 9,
//         name: "topo",
//         path: "/visualization/topo",
//         parentId: 7,
//         order: 3,
//         meta: {
//           title: "拓扑图",
//           icon: "ep:user",
//         },
//         children: [],
//       },
//     ],
//     redirect: "/visualization/chart",
//     hasChildren: true,
//   },
//   {
//     id: 10,
//     name: "lowcode",
//     path: "/lowcode",
//     parentId: 0,
//     order: 3,
//     meta: {
//       title: "低代码",
//       icon: "ep:user",
//     },
//     children: [],
//   },
//   {
//     path: "/dashboard",
//     name: "仪表盘",
//     meta: {
//       title: "仪表盘",
//     },
//   },
//   {
//     path: "/:pathMatch(.*)*",
//     name: "NotFound",
//     meta: {
//       title: "NotFound",
//       icon: "",
//       hidden: true,
//     },
//     redirect: {
//       name: "404",
//     },
//   },
// ];

// /**
//  * 获取指定 target 路径
//  */
// const getValuePathsByTarget = (dataSource, target) => {
//   let result = [];
//   if (!dataSource || dataSource.length === 0 || !target) return [];

//   const constructPaths = (data, target, path) => {
//     data.forEach(({ name, children }) => {
//       path.push(name);
//       if (name === target) {
//         result = JSON.parse(JSON.stringify(path));
//         return;
//       }
//       if (children && children.length) {
//         constructPaths(children, target, path);
//       }
//       path.pop();
//     });
//   };

//   constructPaths(dataSource, target, []);
//   return result[0];
// };

// function promoteToLevel2(tree, depth = 0) {
//   let result = [];
//   tree.forEach((t) => {
//     if (depth >= 2) {
//       const parent = result.find((r) => r.id === t.parentId);
//       console.log(t.name, depth);
//       console.log(parent);
//     } else {
//       result.push(t);
//       // console.log(result);
//     }
//     if (t.children && t.children.length) {
//       promoteToLevel2(t.children, +depth + 1);
//     }
//   });

//   // console.log(result);
// }

// // console.log(getValuePathsByTarget(MockData, 'topo'))

// console.log(promoteToLevel2(MockData, 0));
