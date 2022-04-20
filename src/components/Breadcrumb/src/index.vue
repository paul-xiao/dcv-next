<template>
  <div class="mx-2">
    <template v-for="(item, index) of paths" :key="item.name">
      <template v-if="index < paths.length - 1">
        <router-link :to="item.path">{{ item.name }}</router-link>
        <span class="mx-1">/</span>
      </template>
      <span v-else class="font-light">{{ item.name }}</span>
    </template>
  </div>
</template>
<script lang="ts" setup>
interface IPath {
  name: string;
  path: string;
}
interface Props {
  paths: IPath[];
}
const _props = defineProps<Props>();
</script>
