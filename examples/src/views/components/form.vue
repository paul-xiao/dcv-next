<template>
  <dc-page>
    <dc-form
      v-model="form"
      :schema="schema"
      v-bind="{ ...componentProps }"
      @submit="onSubmit"
    >
      <template #content>
        <h1>content</h1>
      </template>
    </dc-form>
  </dc-page>
</template>
<script lang="ts" setup>
import { Form as DcForm, Page as DcPage } from "@dcv-next/components";
const form = {
  title: 111,
};
// const rules = {
//   name: [{
//     required: true,
//     message: 'please input name',
//     trigger: 'blur'
//   }]
// }
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

// el-form attrs
const componentProps = {
  labelWidth: "120px",
  statusIcon: false,
  footer: true,
};

function onSubmit(form: any) {
  console.log(form);
}
</script>
