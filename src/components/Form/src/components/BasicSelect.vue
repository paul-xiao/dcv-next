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
import { watch, ref, onMounted, toRefs } from "vue";
import { ElSelect, ElOption } from "element-plus";
import { ISelectOption } from "../types";

interface BasicSelectProps {
  api?: Function;
  options?: ISelectOption[];
  modelValue?: string | string[];
  props?: ISelectOption;
}
const model = ref<any>("");
const myOptions = ref<ISelectOption[] | Record<string, any>>([]);
const _props = defineProps<BasicSelectProps>();
const emit = defineEmits(["update:modelValue"]);
// set default
// toRefs :将响应式对象转换为普通对象，其中结果对象的每个 property 都是指向原始对象相应 property 的 ref。
model.value = toRefs(_props).modelValue;
myOptions.value = _props.options || [];

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
  model.value = toRefs(_props).modelValue;
}
watch(
  () => model.value,
  (val) => {
    console.log(val);
    emit("update:modelValue", val);
  }
);
onMounted(() => {
  if (typeof _props.api === "function") {
    loadDataFromApi(_props.api);
  }
});
</script>
