<template>
  <div class="h-10">
    <div
      v-for="item of tab.tabList"
      class="relative inline-block px-8 font-light leading-10 cursor-pointer group hover:shadow-md hover:bg-slate-100"
      :class="{ 'bg-slate-100': $route.name === item.name }"
      :key="item.name"
      @click="$emit('tabClick', item)"
    >
      <span>{{ item.name }}</span>
      <dc-icon
        icon="ion:close-outline"
        class="absolute hidden h-10 text-xs text-gray-400 right-1 group-hover:inline-block"
        @click="$emit('tabClose', item)"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
interface Props {
  tab: any;
}
const _props = defineProps<Props>();
defineEmits(["tabClick", "tabClose"]);
</script>
