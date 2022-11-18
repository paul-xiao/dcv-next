<template>
  <dc-page-wrapper>
    <dc-form @register="registerForm" @submit="onSubmit">
      <template #content="{ model }">
        <dc-editor v-model="model.content" />
      </template>
    </dc-form>
  </dc-page-wrapper>
</template>
<script lang="ts" setup>
import { useForm } from "@dcv_next/components/Form/src/hooks/useForm";
import { create } from "@/api/article";
import { schema } from "./add";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
const router = useRouter();
const [registerForm] = useForm({
  labelWidth: 100,
  foot: true,
  schema,
});

async function onSubmit(form) {
  try {
    const res: any = await create(form);
    ElMessage.success(res.msg);
    router.push("/notes");
  } catch (error) {
    console.log(error);
  }
}
</script>
