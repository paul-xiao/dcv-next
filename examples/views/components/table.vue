<template>
  <dc-page>
    <dc-table @register="registerTable">
      <template #opt>
        <el-button>详情</el-button>
      </template>
    </dc-table>
  </dc-page>
</template>
<script lang="ts" setup>
import { useTable, Page as DcPage, Table as DcTable } from "#dcv_next";
import { ElButton } from "element-plus";
const schema = [
  {
    label: "标题",
    prop: "title",
  },
  {
    label: "正文",
    prop: "content",
  },
  {
    label: "标签",
    prop: "tags",
  },
  {
    label: "API下拉",
    prop: "tags1",
  },
];
const [registerTable]: any = useTable({
  labelWidth: 100,
  foot: true,
  schema,
  api: () =>
    new Promise((res) => {
      res({
        data: {
          result: [
            {
              title: "111",
              content: "222",
              tags: "122",
              tags1: "22222",
            },
            {
              title: "111",
              content: "222",
              tags: "122",
              tags1: "22222",
            },
            {
              title: "111",
              content: "222",
              tags: "122",
              tags1: "22222",
            },
          ],
        },
      });
    }),
});
</script>
