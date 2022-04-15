<template>
  <div
    class="flex items-center justify-center w-full h-12 bg-white"
    :class="{ 'bg-slate-100': !value }"
  >
    <img src="@/assets/logo.png" class="w-5" />
    <span class="mx-2 font-extralight" v-if="asideExpanded">DCV</span>
  </div>
</template>
<script setup lang="ts">
defineProps({
  value: { type: Boolean },
  asideExpanded: { type: Boolean },
});
</script>
