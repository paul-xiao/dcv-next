<template>
  <el-select v-model="model" v-bind="$attrs" class="w-full">
    <el-option
      v-for="item in myOptions"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>
<script lang="ts" setup>
import { watch, ref, onMounted } from "vue";

interface ISelectOption {
  label?: String;
  value?: String;
}

interface BasicSelectProps {
  api?: Function;
  options?: ISelectOption[];
  modelValue?: string | string[];
  props: ISelectOption;
}
const model = ref<string | string[] | undefined>("");
const myOptions = ref<ISelectOption[] | Record<string, any>>([]);
const _props = defineProps<BasicSelectProps>();
const emit = defineEmits(["update:modelValue"]);
const { modelValue, ...rest } = { ..._props };
// set default
model.value = modelValue;
myOptions.value = rest.options || [];
// function onSelectChange(val) {
//   console.log(val)
//   emit('update:modelValue', val)
// }
function getMatched(data, filter: ISelectOption) {
  if (!filter) return data;
  return data.map((d) => {
    d.label = d[`${filter.label}`];
    d.value = d[`${filter.value}`];
    const hasChild = Array.isArray(d.children) && d.children.length;
    if (hasChild) {
      d.children = getMatched(d.children, filter);
    }
    return d;
  });
}

async function loadDataFromApi(api: Function) {
  const res = await api();
  myOptions.value = getMatched(res.data, rest.props);
  console.log(res.data);
}
watch(
  () => model.value,
  (val) => {
    console.log(val);
    emit("update:modelValue", val);
  }
);
onMounted(() => {
  if (typeof rest.api === "function") {
    loadDataFromApi(rest.api);
  }
});
</script>
