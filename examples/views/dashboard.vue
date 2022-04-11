<template>
  <div class="flex p-5">
    <div class="flex-1">
      <el-card>
        <h1 class="mb-2">Todos</h1>
        <ul class="font-light">
          <li v-for="todo in todos" :key="todo.name">
            <template v-if="todo.children && Array.isArray(todo.children)">
              {{ todo.name }}
              <ul>
                <li v-for="child in todo.children" :key="child.name">
                  <el-checkbox v-model:value="child.state">{{
                    child.name
                  }}</el-checkbox>
                </li>
              </ul>
            </template>
            <el-checkbox v-else v-model:value="todo.state">{{
              todo.name
            }}</el-checkbox>
          </li>
        </ul>
      </el-card>
    </div>
    <div class="flex-1 ml-5">
      <el-card>
        <h1 class="mb-2">CHANGELOG</h1>
        <!-- <el-timeline>
          <el-timeline-item
            v-for="(activity, index) in activities"
            center
            placement="top"
            :key="index"
            :icon="activity.icon"
            :type="activity.type"
            :color="activity.color"
            :size="activity.size"
            :hollow="activity.hollow"
            :timestamp="activity.timestamp"
          >
            <el-card>
              <h4>Update Github template</h4>
              <p>{{ activity.content }}</p>
            </el-card>
          </el-timeline-item>
        </el-timeline> -->
        <!-- <ChangeLog /> -->
      </el-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ChangeLog from "../../CHANGELOG.md";
console.log(ChangeLog);

interface Todo {
  name: string;
  children?: Todo[];
  state?: Boolean;
}
// interface Activity {
//   title?: string;
//   content?: String;
//   timestamp?: String;
//   children?: Activity[];
// }

// const md2Tl = (ast: any) => {
//   let result: Activity[];
//   for (let item of ast) {
//     const { type } = item;
//     const row: Activity = {};
//     switch (type) {
//       case "heading":
//         if (item.depth === 1 || 2) {
//           row.timestamp = item.text.match(/\((.+?)\)/gi)[1];
//         }
//         break;

//       default:
//         break;
//     }
//   }
// };
// const activities = [
//   {
//     content: "Custom icon",
//     timestamp: "2018-04-12 20:46",
//     size: "large",
//     type: "primary",
//     icon: MoreFilled,
//   },
//   {
//     content: "Custom color",
//     timestamp: "2018-04-03 20:46",
//     color: "#0bbd87",
//   },
//   {
//     content: "Custom size",
//     timestamp: "2018-04-03 20:46",
//     size: "large",
//   },
//   {
//     content: "Custom hollow",
//     timestamp: "2018-04-03 20:46",
//     type: "primary",
//     hollow: true,
//   },
//   {
//     content: "Default node",
//     timestamp: "2018-04-03 20:46",
//   },
// ];
const todos: Todo[] = [
  {
    name: "基础框架",
    children: [
      {
        name: "动态路由",
      },
      {
        name: "动态路由",
      },
      {
        name: "Layout",
      },
      {
        name: "Tab",
      },
      {
        name: "Breadcrumb",
      },
    ],
  },
  {
    name: "基础组件",
    children: [
      {
        name: "图标",
      },
      {
        name: "表单",
      },
      {
        name: "表格",
      },
    ],
  },
];
</script>
<style>
.markdown-body {
  background-color: #f2f2f2;
}
</style>
