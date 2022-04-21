<template>
  <h1>{{ $route.name }}</h1>
  <dc-form v-model="ruleForm" :schema="schema" />
</template>
<script lang="ts" setup>
import { reactive } from "vue";

const ruleForm = reactive({
  name: "",
  region: "",
  date1: "",
  date2: "",
  delivery: false,
  type: [],
  resource: "",
  desc: "",
});
const schema = [
  {
    prop: "name",
    label: "名称",
    rules: [{ required: true, message: "请输入邮箱地址", trigger: "blur" }],
  },
  {
    prop: "region",
    label: "区域",
    type: "select",
    dicData: [
      {
        label: "区域1",
        value: 1,
      },
    ],
  },
  {
    prop: "switch",
    label: "时间",
    type: "switch",
  },
];
</script>
