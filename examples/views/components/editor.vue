<template>
  <div class="p-5">
    <dc-editor v-model="content" />
    <dc-editor-viewer v-model:value="content" />

    <ol>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
    </ol>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
const content = ref("");
</script>
