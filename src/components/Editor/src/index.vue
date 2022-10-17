<template>
  <div ref="elementRef" class="shadow editor">
    <Toolbar
      v-bind="$attrs"
      v-model:conf="state.myConf"
      @set-type="onSetType"
      @clear="onClear"
      @set-screen="setFullScreen"
    />
    <div class="flex editor-main">
      <div class="flex flex-col flex-1 overflow-auto">
        <Main
          ref="editorRef"
          v-model="content"
          :parent="instance"
          v-bind="$attrs"
        />
      </div>
      <div v-show="state.myConf?.preview" class="flex flex-1">
        <span class="w-1 h-auto bg-gray-300 cursor-move"></span>
        <div ref="edipreviewerRef" class="flex-1 overflow-auto">
          <Previewer :value="content" v-model:toc="toc" v-bind="$attrs" />
        </div>
      </div>
      <div v-show="state.myConf?.toc" class="flex w-60">
        <span class="w-1 h-auto bg-gray-300 cursor-move"></span>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div class="flex-1" v-html="toc"></div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import Toolbar from "./toolbar.vue";
import Previewer from "./previewer.vue";
import Main from "./main.vue";
import {
  computed,
  getCurrentInstance,
  reactive,
  ref,
  toRefs,
  unref,
  watch,
} from "vue";
const instance: any = getCurrentInstance();
const props = defineProps({
  conf: {
    type: Object,
    default: () => {
      return {
        toc: false,
        preivew: false,
      };
    },
  },
  modelValue: {
    type: String,
    default: "",
  },
});
const editorRef = ref<any>();
const edipreviewerRef = ref<null | HTMLElement>(null);
const elementRef = ref<null | HTMLElement>(null);
const toc = ref("");
const state = reactive({
  myConf: {
    ...props.conf,
  },
});
const emit = defineEmits(["update:modelValue"]);

const content = computed({
  get: () => {
    return props.modelValue;
  },
  set: (val) => {
    emit("update:modelValue", val);
  },
});

watch(
  () => content,
  (val) => {
    console.log("content changed ==> ", val);
  }
);
watch(
  () => props.conf,
  (val) => {
    console.log("conf changed ==> ", val);
  }
);

const onSetType = (type: string, url: string) => {
  editorRef?.value?.setCurType(type, url);
};
const setScrollTop = (scrollTop: any) => {
  if (edipreviewerRef?.value) {
    edipreviewerRef.value.scrollTop = scrollTop;
  }
};
const onClear = () => {
  content.value = "";
};
const setFullScreen = () => {
  const element = unref(elementRef);
  console.log(element);

  element && requestFullScreen(element);
};
const requestFullScreen = (element: HTMLElement) => {
  // 兼容谷歌、火狐、IE
  const requestMethod = element.requestFullscreen;
  if (requestMethod) {
    requestMethod.call(element);
  } else if (window.ActiveXObject) {
    const ActiveXObject = window.ActiveXObject;
    const wscript = new ActiveXObject("WScript.Shell");
    if (wscript !== null) {
      wscript.SendKeys("{F11}");
    }
  }
};
// 将方法暴露出
defineExpose({ ...toRefs(state), setScrollTop });
console.log(state);
</script>
<style lang="scss">
.editor {
  background: #fafafa;
  &-main {
    min-height: 600px;
    overflow: hidden;
  }
}
</style>
