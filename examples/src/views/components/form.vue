<template>
  <dc-page>
    <section>
      <h1>基础表单 Form</h1>
      <dc-form
        class="py-5"
        v-model="form"
        :schema="schema"
        v-bind="{ ...componentProps }"
        @submit="onSubmit"
      >
        <template #content>
          <h1>content</h1>
        </template>
      </dc-form>
    </section>
    <section>
      <h1>useForm Hook</h1>
      <p class="font-light leading-10">
        使用useForm钩子可支持所有参数在注册时完成配置
      </p>
      <pre>
        <code>
         const [registerForm, { validateForm }] = useForm({
          labelWidth: '120px',
          schema: schema,
          api: () => Promise.resolve('')
        })
        </code>
      </pre>
      <dc-form class="py-5" @register="registerForm" @submit="onSubmit">
        <template #footer>
          <el-button type="primary" @click="onCustomSubmit">111</el-button>
        </template>
      </dc-form>
    </section>
  </dc-page>
</template>
<script lang="ts" setup>
// import { codeToHtml } from 'shiki'

import { Form as DcForm, Page as DcPage, useForm } from "@dcv-next/components";
const form = {
  title: 111,
};
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
    span: 12,
    rules: [
      {
        required: false,
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
        trigger: "change",
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
        trigger: "change",
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

const [registerForm, { validateForm, getModel }] = useForm({
  schema: schema,
  componentProps: {
    labelWidth: 100,
    size: "small",
  },
});
function onSubmit(form: any) {
  console.log(form);
}

async function onCustomSubmit() {
  validateForm(async (valid: any) => {
    if (valid) {
      // todo 获取到表单数据
      const form = await getModel();
      console.log(form);
    }
  });
}

// const code = 'const a = 1' // input code
// const html = await codeToHtml(code, {
//   lang: 'javascript',
//   theme: 'vitesse-dark'
// })

// console.log(html) // highlighted html string
</script>
