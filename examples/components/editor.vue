<template>
  <div class="p-5">
    <dc-editor v-model="content" />
    <dc-editor-viewer v-model:value="content" />
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";

const content = ref("");
</script>
