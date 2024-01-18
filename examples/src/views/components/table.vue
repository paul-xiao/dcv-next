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
import {
  useTable,
  Page as DcPage,
  Table as DcTable,
} from "@dcv-next/components";
import { ElButton } from "element-plus";
const schema = [
  {
    label: "标题",
    prop: "title",
  },
  {
    label: "更新时间",
    prop: "updateTime",
  },
];

const getArticleList = async (params: any) => {
  console.log(params);

  return await fetch(
    `/api/article/list?current=${params?.current}&size=${params?.size}`
  ).then((res) => res.json());
};

const [registerTable]: any = useTable({
  conf: {
    name: "xxx",
  },
  schema,
  api: getArticleList,
});
</script>
