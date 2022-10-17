<template>
  <div class="flex px-5 py-2 border-b toolbar">
    <div class="flex-1">
      <span v-for="item of list" :key="item.name" class="toolbar-item">
        <div v-if="item.type === 'title'" class="dropdown">
          <div tabindex="0" class="m-1">
            <i class="iconfont" :class="`${item.icon}`"></i>
          </div>
          <ul
            tabindex="0"
            class="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52"
          >
            <li v-for="c of item.children" :key="c.name">
              <a @click.stop="onToolBarClick(c)">{{ c.name }}</a>
            </li>
          </ul>
        </div>
        <div v-else-if="item.type === 'img'" class="dropdown">
          <div tabindex="0" class="m-1">
            <i class="iconfont" :class="`${item.icon}`"></i>
          </div>
          <ul
            tabindex="0"
            class="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <a @click.stop="onToolBarClick(item)">外部链接</a>
            </li>
            <li>
              <a @click="onUpload">上传 </a>
              <input
                ref="upload"
                type="file"
                name="flie"
                hidden
                @change="onFileChange"
              />
            </li>
          </ul>
        </div>

        <i
          v-else
          class="iconfont"
          :class="`${item.icon}`"
          @click="onToolBarClick(item)"
        ></i>
      </span>
    </div>
    <div class="flex-1 text-right">
      <span class="toolbar-item">
        <i
          class="iconfont dc-e-col"
          @click="onToolBarClick({ type: 'col' })"
        ></i
      ></span>
      <span class="toolbar-item">
        <i
          class="iconfont dc-e-toc"
          @click="onToolBarClick({ type: 'toc' })"
        ></i
      ></span>
      <span class="toolbar-item">
        <i
          class="iconfont dc-e-screen"
          @click="onToolBarClick({ type: 'screen' })"
        ></i
      ></span>
      <span class="toolbar-item">
        <i
          class="iconfont dc-e-delete"
          @click="onToolBarClick({ type: 'clear' })"
        ></i
      ></span>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { list } from "./config/toolbar";
const props = defineProps({
  conf: {
    type: Object,
    default: () => {},
  },
});
const emit = defineEmits(["update:conf", "set-screen", "clear", "set-type"]);

const uploadRef = ref<null | HTMLElement>(null);
const onToolBarClick = ({ type = "blod" }) => {
  switch (type) {
    case "toc":
      emit("update:conf", {
        ...props.conf,
        toc: !props?.conf?.toc,
      });
      break;
    case "col":
      emit("update:conf", {
        ...props.conf,
        preview: !props?.conf?.preview,
      });
      break;
    case "screen":
      emit("set-screen");
      break;
    case "clear":
      emit("clear");
      break;

    default:
      emit("set-type", type);
      break;
  }
};

const onUpload = () => {
  if (!props.conf.api) {
    alert("请先设置api");
    return;
  }
  uploadRef?.value?.click();
};

const onFileChange = (e) => {
  const file = e.target.files[0];
  const formData = new FormData();
  formData.append("file", file);
  // 1. 创建 xhr 对象
  const xhr = new XMLHttpRequest();
  // 2. 调用 open 函数，指定请求类型与URL地址。其中，请求类型必须为 POST
  xhr.open("POST", props.conf.api);
  // 3. 发起请求

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);
      if (data.code === 200) {
        // 上传文件成功
        emit("set-type", "img", "static/" + data.url);
      } else {
        // 上传文件失败
        console.log(data.message);
      }
    }
  };
  xhr.send(formData);
};
</script>
<style lang="scss">
.toolbar {
  background: #fafafa;
  &-item {
    margin-right: 10px;
    cursor: pointer;
    display: inline-block;
  }
}
</style>
