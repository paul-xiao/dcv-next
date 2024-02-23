<template>
  <dc-form
    v-model="state.form"
    :schema="schema"
    v-bind="componentProps"
    @submit="onSubmit"
  />
</template>
<script lang="ts" setup>
import { reactive } from "vue";
const state = reactive({
  form: {} as any,
});
// custom form schema
const schema = [
  {
    label: "输入框",
    prop: "user",
  },
  {
    label: "密码",
    prop: "password",
    componentProps: {
      type: "password",
    },
  },
  {
    label: "数字",
    prop: "number",
    componentProps: {
      type: "number",
    },
  },
  {
    label: "图片上传",
    prop: "upload",
    type: "upload",
    componentProps: {
      action: "locahost:8000/upload",
    },
  },
  {
    label: "下拉列表",
    prop: "sex",
    type: "select",
    componentProps: {
      options: [
        {
          label: "男",
          value: "man",
        },
        {
          label: "女",
          value: "woman",
        },
      ],
    },
  },
  {
    label: "文本框",
    prop: "description",
    componentProps: {
      type: "textarea",
    },
  },
];

// ElForm props
const componentProps = {
  labelWidth: 100,
  statusIcon: true,
  inline: false,
};
function onSubmit(form: any) {
  console.log(form);
  // your submit options here
}
</script>
