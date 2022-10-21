<template>
  <dc-page-wrapper>
    <dc-form v-model="ruleForm" :schema="schema" />
  </dc-page-wrapper>
</template>
<script lang="ts" setup>
import { reactive, watch, watchEffect } from "vue";
const ruleForm = reactive({});
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

watch(
  () => ruleForm,
  (val) => {
    console.log(val);
  }
);
watchEffect(() => {
  console.log(ruleForm);
});
</script>
