<template>
  <div>
    <a
      href="https://www.npmjs.com/package/mavon-editor/v/next"
      class="capitalize"
      >mavon editor</a
    >
  </div>
  <div class="p-5">
    <mavon-editor :subfield="false" v-model="content" />
    <h1 class="my-5">预览</h1>
    <mavon-editor
      :toolbarsFlag="false"
      :subfield="false"
      defaultOpen="preview"
      v-model="markedContent"
    />
    <dc-button @click="OnSave">保存</dc-button>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { marked } from "marked";
const content = ref("");
const markedContent = ref("");
const OnSave = () => {
  console.log(content.value);
  markedContent.value = marked.parse(content.value);
};
</script>
