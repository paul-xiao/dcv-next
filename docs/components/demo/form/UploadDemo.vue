<template>
  <dc-form @register="registerForm" @submit="onSubmit" />
</template>
<script lang="ts" setup>
import { useForm } from "dcv-next";
// custom form schema
const schema = [
  {
    label: "图片上传",
    prop: "upload",
    type: "upload",
    componentProps: {
      action: "#",
    },
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
