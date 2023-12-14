<template>
  <div class="p-5">
    <dc-form @register="registerForm" @submit="onSubmit">
      <template #content="{ model }"> 自定义 {{ model }} </template>
    </dc-form>
  </div>
</template>
<script lang="ts" setup>
import { useForm } from "../../../packages";

const schema = [
  {
    label: "标题",
    prop: "title",
    span: 12,
    rules: [
      {
        required: true,
        message: "请输入标题",
        trigger: "blur",
      },
    ],
  },
  {
    label: "正文",
    prop: "content",
    slot: true,
    span: 12,
    rules: [
      {
        required: true,
        message: "请输入标题",
        trigger: "blur",
      },
    ],
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
    rules: [
      {
        required: true,
        message: "请输入标题",
        trigger: "blur",
      },
    ],
  },
  {
    label: "API下拉",
    prop: "tags",
    type: "select",
    span: 12,
    componentProps: {
      api: () => Promise.resolve({ data: [{ label: "value", value: "222" }] }),
    },
    rules: [
      {
        required: true,
        message: "请输入标题",
        trigger: "blur",
      },
    ],
  },
];
const [registerForm, { setValues }]: any = useForm({
  labelWidth: 100,
  foot: true,
  schema,
});

function onSubmit(form) {
  console.log(form);
  setValues();
}
</script>
