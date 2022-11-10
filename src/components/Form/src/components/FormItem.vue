<template>
  <ElFormItem
    :label="_props.label"
    :prop="_props.prop"
    :labelWidth="_props.labelWidth"
  >
    <component :is="getComponent(type)" v-model="myValue" v-bind="_props" />
  </ElFormItem>
</template>
<script lang="ts" setup>
import { ElFormItem } from "element-plus";
import { computed } from "vue";
export interface IFormItem {
  label?: string;
  labelWidth?: string;
  prop: string;
  type?: string;
  modelValue?: string;
}
const _props = defineProps<IFormItem>();
const emits = defineEmits(["update:modelValue"]);

const myValue = computed({
  get: () => {
    return _props.modelValue;
  },
  set: (val) => {
    emits("update:modelValue", val);
  },
});
function capitalize(str) {
  return str && str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase();
}
const getComponent = (type = "input") => {
  const isInput = ["password", "input"].includes(type);
  return `El${capitalize(isInput ? "input" : type)}`;
};
</script>
