<template>
  <ElFormItem :label="label" :prop="prop" :labelWidth="labelWidth">
    <template v-if="slot">
      <slot :name="prop"></slot>
    </template>
    <component
      :is="getComponent(type)"
      v-model="myValue"
      v-bind="componentProps"
      v-else
    />
  </ElFormItem>
</template>
<script lang="ts">
// 动态组件处理方式有两种： component 或者 jsx
import { defineComponent } from "vue";
import { ElFormItem, ElInput } from "element-plus";
import { computed } from "vue";
export default defineComponent({
  components: { ElFormItem, ElInput },
  props: {
    label: { type: String, default: "" },
    labelWidth: { type: String, default: "" },
    prop: { type: String, default: "" },
    type: String,
    slot: { type: Boolean, default: false },
    componentProps: { type: Object, default: () => {} },
    modelValue: [String, Array],
  },
  emits: ["update:modelValue"],
  setup(_props, { emit }) {
    const myValue = computed({
      get: () => {
        return _props.modelValue;
      },
      set: (val) => {
        emit("update:modelValue", val);
      },
    });
    function capitalize(str) {
      return str && str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase();
    }
    const getComponent = (type = "input") => {
      const isInput = ["password", "input"].includes(type);
      switch (type) {
        case "select":
          return "BasicSelect";
        default:
          return `El${capitalize(isInput ? "input" : type)}`;
      }
    };
    return {
      getComponent,
      myValue,
    };
  },
});
</script>
