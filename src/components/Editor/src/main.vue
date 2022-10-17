<template>
  <textarea
    ref="textareaRef"
    v-model="text"
    :placeholder="placeholder"
    class="flex-1 w-full p-5 outline-none resize-none"
    @scroll="onScroll"
  ></textarea>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { tpls } from "./config/toolbar";
const props = defineProps({
  placeholder: {
    type: String,
    default: "请输入内容",
  },
  modelValue: {
    type: String,
    default: "",
  },
  parent: {
    type: Object,
    default: () => {},
  },
});
// const ischecked = ref(false);
const textareaRef = ref<null | HTMLElement>(null);
const emit = defineEmits(["update:modelValue"]);
const text: any = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit("update:modelValue", val);
  },
});

// watch(
//   () => props.modelValue,
//   val => {
//     // 解决光标跳动BUG
//     if (!ischecked.value) {
//       console.log('--->', val)
//       text.value = val
//     }
//   }
// )

const setCurType = (type, url) => {
  if (typeof tpls[type] === "function") {
    text.value += `\n${tpls[type](url)}`;
  } else {
    text.value += `\n${tpls[type]}`;
    console.log(tpls[type]);
  }
};
const onScroll = () => {
  props?.parent?.setScrollTop(textareaRef?.value?.scrollTop);
};
defineExpose({
  setCurType,
});
</script>
