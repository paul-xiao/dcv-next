<template>
  <div class="flex p-5">
    <div class="flex-1">
      <el-card>
        <template #header>
          <div class="card-header">
            <span>Todos</span>
            <!-- <el-button class="button" type="text">Operation button</el-button> -->
          </div>
        </template>
        <ul class="font-light h-96">
          <li v-for="todo in todos" :key="todo.name">
            <template v-if="todo.children && Array.isArray(todo.children)">
              {{ todo.name }}
              <ul>
                <li v-for="child in todo.children" :key="child.name">
                  <el-checkbox v-model="child.state" size="small">{{
                    child.name
                  }}</el-checkbox>
                </li>
              </ul>
            </template>
            <el-checkbox v-else v-model="todo.state" size="small">{{
              todo.name
            }}</el-checkbox>
          </li>
        </ul>
      </el-card>
    </div>
    <div class="flex-1 ml-5">
      <el-card>
        <template #header>
          <div class="card-header">
            <span>CHANGELOG</span>
            <!-- <el-button class="button" type="text">Operation button</el-button> -->
          </div>
        </template>
        <div class="overflow-auto h-96">
          <el-timeline class="p-5">
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
                <h1 class="text-2xl font-bold">
                  <a
                    :href="activity.link"
                    class="text-blue-400"
                    v-if="activity.link"
                    target="blank"
                    >{{ activity.title }}</a
                  >
                  <span v-else>{{ activity.title }}</span>
                </h1>
                <h4 class="text-xl font-light text-gray-600">
                  {{ activity.subtitle }}
                </h4>
                <p
                  class="font-thin text-gray-600"
                  v-for="c in activity.content"
                  :key="c.commitId"
                >
                  <span>{{ c.text }}</span>
                  <a :href="c.commitLink" class="text-blue-400" target="blank"
                    >[{{ c.commitId }}]</a
                  >
                </p>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </div>
        <!-- <ChangeLog /> -->
      </el-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ChangeLog from "../../../CHANGELOG.md";
interface Todo {
  name: string;
  children?: Todo[];
  state?: boolean;
}
interface ActivityContent {
  text: string;
  commitLink: string;
  commitId: string;
}
interface Activity {
  title?: string;
  subtitle?: string;
  content?: ActivityContent[];
  link?: string;
  timestamp?: string;
  icon?: string;
  type?: string;
  size?: string;
  color?: string;
  hollow?: boolean;
  children?: Activity[];
}

const md2Json = (ast: any) => {
  let result: Activity[] = [];
  let row: Activity = {};
  const conf = {
    icon: "",
    type: "primary",
    size: "large",
    hollow: true,
  };
  for (let item of ast) {
    const { type } = item;
    if (type === "heading") {
      if (item.depth === 2) {
        row = Object.assign({}, conf);

        const link = item.tokens.find((t: any) => t.type === "link");
        const { text } = item.tokens.find((t: any) => t.type === "text");
        if (link) {
          row.link = link.href;
          row.timestamp = text.match(/\((.+?)\)/)[1];
          row.title = link.text;
        } else {
          row.timestamp = item.text.match(/\((.+?)\)/)[1];
          row.title = text.split(" ")[0];
        }
      } else if (item.depth === 3) {
        row.subtitle = item.text;
      }
    } else if (type === "list") {
      row.content = item.items.map((d: any) => {
        d.commitId = d.raw.match(/\[(.+?)\]/)[1];
        d.commitLink = d.raw.match(/\]\((.+?)\)/)[1];
        d.text = d.raw.replace(/\((.+?)\)\)/, "");
        return d;
      });
      result.push(row);
    }
  }
  return result;
};
const activities: any[] = md2Json(ChangeLog);
const todos: Todo[] = [
  {
    name: "基础框架",
    children: [
      {
        name: "动态路由",
        state: true,
      },
      {
        name: "Layout",
        state: true,
      },
      {
        name: "Tab",
        state: true,
      },
      {
        name: "Breadcrumb",
        state: true,
      },
      {
        name: "权限管理",
      },
      {
        name: "菜单优化",
      },
    ],
  },
  {
    name: "基础组件",
    children: [
      {
        name: "图标",
        state: true,
      },
      {
        name: "表单",
        state: true,
      },
      {
        name: "表格",
      },
      {
        name: "Tree",
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
