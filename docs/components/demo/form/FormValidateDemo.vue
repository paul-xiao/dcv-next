<template>
  <dc-form @register="registerForm" @submit="onSubmit" />
</template>
<script lang="ts" setup>
import { useForm } from "dcv-next";
// custom form schema
const schema = [
  {
    label: "输入框",
    prop: "user",
    rules: [
      {
        required: true,
        message: "请输入标题",
        trigger: "blur",
      },
    ],
  },
  {
    label: "密码",
    prop: "password",
    componentProps: {
      type: "password",
    },
    rules: [
      {
        required: true,
        message: "请输入密码",
        trigger: "blur",
      },
    ],
  },
  {
    label: "数字",
    prop: "number",
    componentProps: {
      type: "number",
    },
    rules: [
      {
        required: true,
        message: "请输入密码",
        trigger: "blur",
      },
    ],
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
    rules: [
      {
        required: true,
        message: "请输入密码",
        trigger: "blur",
      },
    ],
  },
  {
    label: "文本框",
    prop: "description",
    componentProps: {
      type: "textarea",
    },
    rules: [
      {
        required: true,
        message: "请输入密码",
        trigger: "blur",
      },
    ],
  },
];

const [registerForm] = useForm({
  schema: schema,
  componentProps: {
    labelWidth: 100,
    statusIcon: true,
    inline: false,
  },
});

function onSubmit(form: any) {
  console.log(form);
  // your submit options here
}
</script>
