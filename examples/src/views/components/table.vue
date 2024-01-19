<template>
  <dc-page>
    <dc-table @register="registerTable">
      <template #id>
        <el-button type="primary" size="small">自定义</el-button>
      </template>
      <template #opt>
        <el-button size="small">详情</el-button>
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
import dayjs from "dayjs";
const schema = [
  {
    label: "标题",
    prop: "title",
  },
  {
    label: "更新时间",
    prop: "updateTime",
    componentProps: {
      formatter: (row: { updateTime: any }) => dataFormat(row.updateTime),
      width: 300,
    },
  },
  {
    label: "ID",
    prop: "id",
  },
];

const dataFormat = (val: any) => dayjs(val).format("YYYY-MM-DD HH:MM:ss");
const getArticleList = async (params: any) => {
  console.log(params);

  return await fetch(
    `/api/article/list?current=${params?.current}&size=${params?.size}`
  ).then((res) => res.json());
};

const [registerTable]: any = useTable({
  conf: {
    optWidth: "100px",
  },
  schema,
  api: getArticleList,
  page: {
    current: 1,
    size: 10,
  },
});
</script>
