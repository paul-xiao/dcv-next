<template>
  <div
    class="flex items-center justify-center w-full h-12 text-white bg-gray-800"
    :class="{ 'bg-slate-100': !value }"
  >
    <img src="@/assets/logo.png" class="w-5" />
    <span class="mx-2 font-extralight" v-if="asideExpanded">DCV</span>
  </div>
</template>
<script setup lang="ts">
interface Props {
  value: boolean;
  asideExpanded?: boolean;
}
const _props = defineProps<Props>();
</script>
