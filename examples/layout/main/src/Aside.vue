<template>
  <div class="flex-1 text-white bg-gray-800">
    <div class="h-12 leading-10 text-center" v-if="value">
      <dc-icon @click="$emit('toggleAside')" icon="ep:expand" />
    </div>
    <div>
      <Menu :aside="aside" @toggle-child="toggleChild" class="!border-r-0" />
    </div>
  </div>
</template>
<script setup lang="ts">
import Menu from "./Menu.vue";
const _props = defineProps<{
  value: boolean;
  aside: any;
}>();
const emit = defineEmits(["toggleAside", "toggleChild"]);
const toggleChild = (menu: any) => {
  emit("toggleChild", menu);
};
</script>
