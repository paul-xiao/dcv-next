<template>
  <div>
    <h1>md editor</h1>
    <div class="btn btn-indigo">测试</div>
  </div>
  <div class="p-5">
    <dc-editor v-model="content" />
  </div>
</template>
<script lang="ts" setup>
/*
 * 1、空格触发渲染
 * 2、替换当前dom内容
 */

import { ref, watch } from "vue";
const content = ref("test");
watch(
  () => content,
  (val) => {
    console.log("xxx", val);
  }
);
</script>
