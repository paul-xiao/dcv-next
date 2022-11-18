<template>
  <dc-page-wrapper>
    <dc-table @register="registerTable" />
  </dc-page-wrapper>
</template>
<script lang="ts" setup>
import { getArticleList } from "@/api/article";
import { useTable } from "@dcv_next/components/Table/src/hooks/useTable";
const [registerTable, {}] = useTable({
  api: getArticleList,
  schema: [
    {
      label: "标题",
      prop: "title",
    },
    {
      label: "创建时间",
      prop: "createTime",
    },
  ],
  page: {
    current: 1,
    size: 10,
    total: 0,
  },
  conf: {
    name: "",
    addBtn: true,
  },
});
</script>
