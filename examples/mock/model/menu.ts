export default [
  {
    menu_name: "数据结构",
    id: "@id",
    code: "Nav1",
    children: [
      {
        code: "栈",
        menu_url: "views/about",
        access_permissions: '["about"]',
        children: [],
        menu_name: "栈",
        id: "@id",
      },
      {
        code: "堆",
        menu_url: "views/home",
        access_permissions: '["home"]',
        children: [],
        menu_name: "堆",
        id: "@id",
      },
      {
        code: "队列",
        menu_url: "views/home",
        access_permissions: '["home"]',
        children: [],
        menu_name: "队列",
        id: "@id",
      },
    ],
  },
];
