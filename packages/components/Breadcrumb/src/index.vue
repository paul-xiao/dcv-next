<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item
      v-for="item of paths"
      :key="item.path"
      :to="{ path: item.path }"
      >{{ item.meta.title }}</el-breadcrumb-item
    >
  </el-breadcrumb>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import { IPathProps } from "./index";
import { ElBreadcrumb, ElBreadcrumbItem } from "element-plus";
interface Props {
  paths: IPathProps[];
}
const _props = defineProps<Props>();

const paths = computed(() => {
  return _props.paths;
});
</script>
