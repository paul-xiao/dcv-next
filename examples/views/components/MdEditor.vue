<template>
  <div class="p-5">
    <dc-editor v-model="content" :conf="state.conf" />
  </div>
</template>
<script lang="ts" setup>
/*
 * 1、空格触发渲染
 * 2、替换当前dom内容
 */

import { ref, watch, reactive } from "vue";
const content = ref("test");
const state = reactive({
  conf: {
    preview: true,
  },
});
watch(
  () => content,
  (val) => {
    console.log("xxx", val);
  }
);
</script>
