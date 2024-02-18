<template>
  <ElFormItem v-bind="$attrs" :prop="prop">
    <template v-if="!!$slots[prop]">
      <slot :name="prop"></slot>
    </template>

    <component
      :is="getComponent(type)"
      v-model="myValue"
      v-bind="componentProps"
      @change="onChange"
      v-else
    />
  </ElFormItem>
</template>
<script lang="ts">
// 动态组件处理方式有两种： component 或者 jsx
import { defineComponent } from "vue";
import ISelect from "./Select.vue";
import { computed } from "vue";
export default defineComponent({
  components: { ISelect },
  props: {
    prop: {
      type: String,
      required: true,
    },
    type: String,
    componentProps: { type: Object, default: () => {} },
    modelValue: [String, Number, Array],
  },
  emits: ["update:modelValue", "change"],
  setup(_props, { emit }) {
    const myValue = computed({
      get: () => {
        return _props.modelValue;
      },
      set: (val) => {
        emit("update:modelValue", val);
      },
    });
    function capitalize(str: string) {
      return str && str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase();
    }
    function onChange(val: any) {
      emit("change", val);
    }
    const getComponent = (type = "input") => {
      const isInput = ["password", "input"].includes(type);
      switch (type) {
        case "select":
          return "ISelect";
        case "upload":
          return "ElUpload";
        default:
          return `El${capitalize(isInput ? "input" : type)}`;
      }
    };
    return {
      getComponent,
      onChange,
      myValue,
    };
  },
});
</script>
