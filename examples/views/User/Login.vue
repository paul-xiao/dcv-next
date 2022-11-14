<template>
  <div class="login-wrap">
    <div class="login-wrap-inner">
      <div class="title">Login</div>
      <dc-form @register="registerForm" @submit="onSubmit" />
    </div>
  </div>
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
<style lang="scss">
html,
body {
  height: 100%;
  margin: 0;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  background-color: #fff;
}
</style>
<style lang="scss">
.login-wrap {
  &-inner {
    position: absolute;
    padding: 50px;
    width: 500px;
    height: 300px;
    box-shadow: 0 0px 1px 0 rgba(0, 0, 0, 0.5), 0 0px 1px 0 rgba(0, 0, 0, 0.39);
    border-radius: 0.5rem;
    left: 50%;
    top: 50%;
    transform: translate3D(-50%, -50%, 0);
    .title {
      text-align: center;
      margin-bottom: 2rem;
    }
  }
}
</style>
