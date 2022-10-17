export const tpls = {
  bold: "**粗体**",
  italic: "*斜体*",
  h1: "# 一级标题",
  h2: "## 二级标题",
  h3: "### 三级标题",
  h4: "#### 四级标题",
  h5: "##### 五级标题",
  h6: "##### 六级标题",
  underline: "<u>下划线</u>",
  crossline: "~~中划线~~",
  mark: "`标记`",
  topMark: "^上角标^",
  bottomMark: "~下角标~",
  quote: "> 段落引用",
  ol: "1. ",
  li: "- ",
  code: "```language \n```",
  table: `|column1|column2|column3|
  |-|-|-|
  |content1|content2|content3|`,
  link: (url = "https://via.placeholder.com/50.png") => `[link](${url})`,
  img: (url = "https://via.placeholder.com/50.png") => `![image](${url})`,
};

export const list = [
  {
    name: "粗体",
    type: "bold",
    icon: "dc-e-bold",
  },
  {
    name: "斜体",
    type: "italic",
    icon: "dc-e-italic",
  },
  {
    name: "标题",
    type: "title",
    icon: "dc-e-title",
    children: [
      {
        name: "一级标题",
        type: "h1",
        icon: "h1",
      },
      {
        name: "二级标题",
        type: "h2",
        icon: "h2",
      },
      {
        name: "三级标题",
        type: "h3",
        icon: "h3",
      },
      {
        name: "四级标题",
        type: "h4",
        icon: "h4",
      },
      {
        name: "五级标题",
        type: "h5",
        icon: "h5",
      },
      {
        name: "六级标题",
        type: "h6",
        icon: "h6",
      },
    ],
  },
  {
    name: "下划线",
    type: "underline",
    icon: "dc-e-underline",
  },
  {
    name: "中划线",
    type: "crossline",
    icon: "dc-e-crossline",
  },
  {
    name: "标记",
    type: "mark",
    icon: "dc-e-mark",
  },
  {
    name: "引用",
    type: "quote",
    icon: "dc-e-quote",
  },
  {
    name: "有序列表",
    type: "ol",
    icon: "dc-e-ol",
  },
  {
    name: "无序列表",
    type: "li",
    icon: "dc-e-li",
  },
  {
    name: "代码块",
    type: "code",
    icon: "dc-e-code",
  },
  {
    name: "表格",
    type: "table",
    icon: "dc-e-table",
  },
  {
    name: "链接",
    type: "link",
    icon: "dc-e-link",
  },
  {
    name: "上传",
    type: "img",
    icon: "dc-e-img",
  },
];
