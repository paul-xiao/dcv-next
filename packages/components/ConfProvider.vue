<script setup lang="ts">
interface Props {
  config: Element;
}
const props = defineProps<Props>();
</script>

<template>
  <el-config-provider :message="props.config">
    <slot></slot>
  </el-config-provider>
</template>
