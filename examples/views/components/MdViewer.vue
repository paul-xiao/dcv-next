<template>
  <div class="p-5">
    <h1>{{ state.article.title }}</h1>
    <dc-editor-viewer v-model:value="state.article.content" />
  </div>
</template>
<script lang="ts" setup>
import { getArticleById } from "@/api/article";
import { onMounted, reactive } from "vue";
const state = reactive({
  article: {
    title: "",
    content: "",
  },
});
onMounted(async () => {
  try {
    const res = await getArticleById(1);
    state.article = res.data;
  } catch (error) {
    console.log(error);
  }
});
</script>
