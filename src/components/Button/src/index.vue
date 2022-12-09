<template>
  <button
    type="button"
    v-bind="$attrs"
    :class="classes"
    :disabled="disabled || loading"
    v-on="$attrs"
  >
    <i
      v-if="icon || loading"
      class="px-1 el-icon"
      :class="`el-icon-${loading ? 'loading' : icon}`"
    ></i>
    <slot></slot>
  </button>
</template>
<script lang="ts" setup>
import { computed, useSlots } from "vue";
interface Props {
  type: string;
  text: boolean;
  size?: string;
  block?: boolean;
  plain?: boolean;
  rounded?: boolean;
  icon?: string;
  disabled?: boolean;
  loading?: boolean;
}
const _props = defineProps<Props>();

const slots = useSlots();

const classes = computed(() => {
  const {
    type = "default",
    size = "sm",
    block,
    plain,
    text,
    rounded,
    icon,
    disabled,
    loading,
  } = _props;
  return `dcv-btn dcv-btn-${size}  ${
    text ? "dcv-btn-text-" + type : "dcv-btn-" + type
  } ${plain ? "plain" : ""} ${rounded ? "rounded-full" : "rounded-sm"} ${
    block ? "w-full" : ""
  } ${disabled || loading ? "cursor-not-allowed" : ""} ${
    icon && !slots.default ? "dcv-btn-single-icon" : ""
  }`;
});
</script>
