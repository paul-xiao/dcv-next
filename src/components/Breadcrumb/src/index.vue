<template>
  <div class="text-sm breadcrumbs">
    <ul>
      <li v-for="(item, index) of paths" :key="item.name">
        <template v-if="index < paths.length - 1">
          <router-link :to="item.path">{{
            item?.meta?.title || item.name
          }}</router-link>
        </template>
        <span v-else class="font-light">{{
          item?.meta?.title || item.name
        }}</span>
      </li>
    </ul>
  </div>
</template>
<script lang="ts" setup>
interface IPathMeta {
  breadcrumb?: boolean;
  title?: string;
}
interface IPath {
  name: string;
  path: string;
  meta?: IPathMeta;
}
interface Props {
  paths: IPath[];
}
const _props = defineProps<Props>();
</script>
