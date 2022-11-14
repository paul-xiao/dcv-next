<template>
  <div class="shadow">
    <div class="tabs">
      <div
        v-for="item of tab.tabList"
        class="tab tab-lifted"
        :class="{ 'tab-active': $route.name === item.name }"
        :key="item.name"
        @click="$emit('tabClick', item)"
      >
        <span>{{ item.meta.title || item.name }}</span>
        <dc-icon
          v-if="item.name !== 'dashboard'"
          icon="ion:close-outline"
          class="text-xs text-gray-400"
          @click="$emit('tabClose', item)"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
const _props = defineProps<{
  tab: any;
}>();
defineEmits(["tabClick", "tabClose"]);
</script>
