<template>
  <dc-page>
    <dc-form @register="registerForm" @submit="onSubmit">
      <template #content="{ model }"> 自定义 {{ model.content }} </template>
    </dc-form>
  </dc-page>
</template>
<script lang="ts" setup>
import { useForm, Form as DcForm, Page as DcPage } from "@dcv-next/components";
import { onMounted } from "vue";

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
    prop: "api_tags",
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

onMounted(() => {
  setValues({
    content: "11",
    title: "测试标题",
  });
});

function onSubmit(form: any) {
  console.log(form);
}
</script>
