<template>
  <ElSelect v-model="model" v-bind="$attrs" class="w-full">
    <ElOption
      v-for="item in myOptions"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </ElSelect>
</template>
<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";
import { ElSelect, ElOption } from "element-plus";
import { ISelectOption } from "../types";

interface SelectProps {
  api?: Function;
  options?: ISelectOption[];
  modelValue?: string | string[];
  props?: ISelectOption;
}
const myOptions = ref<ISelectOption[] | Record<string, any>>([]);
const _props = defineProps<SelectProps>();
const emit = defineEmits(["update:modelValue"]);
// set default
myOptions.value = _props.options || [];
const model = computed({
  get: () => _props.modelValue,
  set: (val) => emit("update:modelValue", val),
});

function getMatched(data, filter: ISelectOption) {
  if (!filter) return data;
  return data.reduce((res, cur) => {
    const result = {};
    Object.keys(filter).forEach((f) => {
      const filterKey = filter[f];
      if (f === "children") {
        result[f] = getMatched(cur[filterKey], filter);
      } else {
        result[f] = cur[filterKey];
      }
    });
    res.push(result);
    return res;
  }, []);
}

async function loadDataFromApi(api: Function) {
  const res = await api();
  myOptions.value = getMatched(
    res.data,
    _props.props || { label: "label", value: "value" }
  );
}
onMounted(() => {
  if (typeof _props.api === "function") {
    loadDataFromApi(_props.api);
  }
});
</script>
