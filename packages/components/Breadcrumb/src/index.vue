<template>
  <div class="text-sm breadcrumbs">
    <ul>
      <li v-for="(item, index) of paths" :key="item.name">
        <template
          v-if="index < paths.length - 1 && !item.meta?.breadcrumbHidden"
        >
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
import { computed } from "vue";
import { IPathProps } from "./index";
interface Props {
  paths: IPathProps[];
}
const _props = defineProps<Props>();

const paths = computed(() => {
  return _props.paths.filter((p) => !p?.meta?.breadcrumbHidden);
});
</script>
