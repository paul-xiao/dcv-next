<template>
  <dc-page-wrapper>
    <dc-form @register="registerForm" @submit="onSubmit" />
  </dc-page-wrapper>
</template>
<script lang="ts" setup>
import { useForm } from "@dcv_next/components/Form/src/hooks/useForm";
import { login } from "@/api/app";
import { useUserStore } from "@/store/modules/user";

const store = useUserStore();
const schema = [
  {
    label: "Username",
    prop: "username",
    rules: [
      {
        required: true,
        message: "please input username",
        trigger: "blur",
      },
    ],
  },
  {
    label: "Password",
    prop: "password",
    type: "password",
    clearable: true,
    rules: [
      {
        required: true,
        message: "please input password",
        trigger: "blur",
      },
    ],
  },
];
const [registerForm] = useForm({
  labelWidth: 100,
  foot: true,
  schema,
  api: login,
});

function onSubmit(form) {
  store.login(form);
}
</script>
