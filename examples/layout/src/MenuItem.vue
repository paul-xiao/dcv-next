<template>
  <div v-for="item of menu" class="font-light" :key="item.id">
    <template v-if="item.meta && !item.meta.hidden">
      <div
        class="pl-2 cursor-pointer hover:bg-gray-200"
        :class="{ 'bg-slate-100': $route.name === item.name }"
      >
        <router-link :to="item.path" class="flex items-center"
          ><dc-icon :icon="item.meta.icon" />
          <span>{{ item.meta.title }}</span></router-link
        >
      </div>
    </template>
    <slot></slot>
  </div>
</template>
<script lang="ts" setup>
interface Props {
  menu: any[];
}
const _props = defineProps<Props>();
</script>
