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
  size: string;
  block: boolean;
  plain: boolean;
  rounded: boolean;
  icon: string;
  disabled: boolean;
  loading: boolean;
}
const _props = defineProps<Props>();

const slots = useSlots();

const classes = computed(() => {
  const {
    type = "default",
    size = "sm",
    block,
    plain,
    rounded,
    icon,
    disabled,
    loading,
  } = _props;
  return `dc-btn dc-btn-${size}  dc-btn-${type} ${plain ? "plain" : ""} ${
    rounded ? "rounded-full" : "rounded-sm"
  } ${block ? "w-full" : ""} ${
    disabled || loading ? "cursor-not-allowed" : ""
  } ${icon && !slots.default ? "dc-btn-single-icon" : ""}`;
});
</script>
<style lang="scss">
.dc-btn {
  @apply font-medium tracking-wide capitalize transition-colors duration-200 transform disabled:opacity-50  outline-none;
  &.dc-btn-lg {
    @apply px-8 py-4 text-lg;
  }
  &.dc-btn-md {
    @apply px-6 py-3 text-base;
  }
  &.dc-btn-sm {
    @apply px-4 py-2 text-sm;
  }
  &.dc-btn-xs {
    @apply px-3 py-1 text-xs;
  }
  &.dc-btn-plain {
    @apply border-blue-200;
  }
  &.dc-btn-single-icon {
    @apply p-2;
  }
  &-default {
    @apply bg-gray-600 hover:bg-gray-400 text-white;
    &.plain {
      @apply bg-gray-100 text-gray-400;
    }
  }
  &-primary {
    @apply bg-blue-600 hover:bg-blue-400 text-white;
    &.plain {
      @apply bg-blue-100 text-blue-400;
    }
  }
  &-success {
    @apply bg-green-600 hover:bg-green-400 text-white;
    &.plain {
      @apply bg-green-100 text-green-400;
    }
  }
  &-warning {
    @apply bg-yellow-600 hover:bg-yellow-400 text-white;
    &.plain {
      @apply bg-yellow-100 text-yellow-400;
    }
  }
  &-danger {
    @apply bg-red-600 hover:bg-red-400 text-white;
    &.plain {
      @apply bg-red-100 text-red-400;
    }
  }
}
.dc-btn + .dc-btn {
  @apply ml-2;
}
</style>
