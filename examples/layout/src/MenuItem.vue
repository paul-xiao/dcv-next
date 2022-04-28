<template>
  <div
    :class="{ 'h-0': !expanded }"
    class="overflow-hidden transition-all duration-150 ease-in-out delay-150"
  >
    <div v-for="item of menu" class="px-2 font-light" :key="item.id">
      <template v-if="item.meta && !item.meta.hidden">
        <div
          class="pl-2 cursor-pointer hover:bg-gray-600"
          :class="{ 'bg-gray-600': $route.name === item.name }"
        >
          <router-link :to="item.path" class="flex items-center"
            ><dc-icon :icon="item.meta.icon" />
            <span>{{ item.meta.title }}</span></router-link
          >
        </div>
      </template>
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts" setup>
const _props = defineProps<{
  menu: any[];
  expanded: boolean;
}>();
</script>
