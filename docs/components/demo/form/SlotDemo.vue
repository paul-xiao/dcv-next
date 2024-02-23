<template>
  <dc-form @register="registerForm" @submit="onSubmit">
    <template #slot="{ model }">
      <p>this is slot</p>
      <ElInput v-model="model.slot" />
    </template>
  </dc-form>
</template>
<script lang="ts" setup>
import { useForm } from "../../../../packages";
// custom form schema
const schema = [
  {
    label: "自定义",
    prop: "slot",
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
