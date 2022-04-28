<script setup lang="ts">
interface Props {
  icon?: string;
  size?: string;
}
const props = withDefaults(defineProps<Props>(), {
  size: "20",
});
</script>

<template>
  <div class="inline-block">
    <span
      class="iconify"
      :data-icon="props.icon"
      :data-width="props.size"
      :data-height="props.size"
      v-bind="$attrs"
    ></span>
  </div>
</template>
