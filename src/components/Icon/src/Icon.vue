<script setup lang="ts">
const props = defineProps({
  icon: {
    type: String,
    default: () => "",
  },
  size: {
    type: String,
    default: () => "20",
  },
});
</script>

<template>
  <span class="inline-block">
    <span
      class="iconify"
      :data-icon="props.icon"
      :data-width="props.size"
      :data-height="props.size"
      v-bind="$attrs"
    ></span>
  </span>
</template>
