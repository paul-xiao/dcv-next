<template>
  <dc-page-wrapper>
    <dc-table
      v-model="state.form"
      :data="state.tableData"
      :option="state.tableOption"
    >
      <template #imgForm>
        <div>
          <h1>111</h1>
        </div>
      </template>
      <template #img>
        <div>
          <h1>2222</h1>
        </div>
      </template>
    </dc-table>
  </dc-page-wrapper>
</template>
<script lang="ts" setup>
import { reactive } from "vue";
const state = reactive({
  form: {},
  tableData: [
    {
      title: "test",
      img: "xxx",
      description: "22",
    },
  ],
  tableOption: {
    conf: {
      stripe: true,
      viewBtn: true,
      addBtn: true,
      editBtn: true,
      delBtn: true,
      border: true,
      optWidth: 100,
    },
    columns: [
      {
        prop: "title",
        label: "标题",
        type: "text",
        rules: [{ required: true, message: "请输入标题" }],
      },
      {
        prop: "img",
        label: "缩略图",
        type: "text",
        rules: [{ required: true, message: "请输入缩略图" }],
        slot: true,
        formslot: true,
      },
      {
        prop: "description",
        label: "描述",
        rules: [],
        type: "textarea",
      },
    ],
  },
});
</script>
