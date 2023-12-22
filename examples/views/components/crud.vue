<template>
  <dc-page>
    <template #search>
      <dc-form @register="registerForm" @submit="onSubmit" :inline="true" />
    </template>
    <template #batch>
      <el-button type="primary">新增</el-button>
    </template>

    <dc-table @register="registerTable">
      <template #opt>
        <el-button>详情</el-button>
      </template>
    </dc-table>
  </dc-page>
</template>
<script lang="ts" setup>
import {
  useForm,
  useTable,
  Page as DcPage,
  Form as DcForm,
  Table as DcTable,
} from "#dcv_next";
import { ElButton } from "element-plus";

const searchSchema = [
  {
    label: "标题",
    prop: "title",
    span: 6,
  },
  {
    label: "标签",
    prop: "tags",
    type: "select",
    span: 12,
    componentProps: {
      options: [
        {
          label: "JS",
          value: "JS",
        },
      ],
    },
  },
  {
    label: "API下拉",
    prop: "api_tags",
    type: "select",
    span: 12,
    componentProps: {
      api: () => Promise.resolve({ data: [{ label: "value", value: "222" }] }),
    },
  },
];
const [registerForm]: any = useForm({
  labelWidth: 100,
  foot: true,
  schema: searchSchema,
});
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
  page: {
    current: 1,
    size: 10,
  },
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
          total: 3,
        },
      });
    }),
});

function onSubmit(table) {
  console.log(table);
}
</script>
