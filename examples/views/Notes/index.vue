<template>
  <dc-page-wrapper>
    <dc-table @register="registerTable" @rowDel="onRowDel">
      <template #batch>
        <dc-button type="primary" @click="onAdd">添加</dc-button>
      </template>
    </dc-table>
  </dc-page-wrapper>
</template>
<script lang="ts" setup>
import { getArticleList, remove } from "@/api/article";
import { useTable } from "@dcv_next/components/Table";
import { useRouter } from "vue-router";
const router = useRouter();
const [registerTable, { reload }] = useTable({
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
  page: {},
  conf: {
    addBtn: false,
    name: "",
  },
});
function onAdd() {
  router.push("/notes/add");
}

async function onRowDel(row) {
  await remove(row.id);
  reload();
}
</script>
