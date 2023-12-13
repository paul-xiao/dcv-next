<template>
  <ElUpload
    ref="upload"
    class="avatar-uploader"
    :api="api"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
  >
    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
    <ElIcon v-else class="avatar-uploader-icon"><Plus /></ElIcon>
  </ElUpload>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import {
  ElMessage,
  ElUpload,
  ElIcon,
  UploadInstance,
  UploadRawFile,
  genFileId,
} from "element-plus";
import { Plus } from "@element-plus/icons-vue";

import type { UploadProps } from "element-plus";
interface Props {
  modelValue?: string;
  api?: any;
}

const _props = defineProps<Props>();
const _emit = defineEmits(["update:modelValue", "change"]);

const imageUrl = ref<string | undefined>("");
// const httpRequest = ref<any>();

watch(
  () => _props.modelValue,
  (val) => {
    imageUrl.value = val;
    console.log("set val success", val);
  }
);

const handleAvatarSuccess: UploadProps["onSuccess"] = (response) => {
  console.log(response);
  imageUrl.value = response.url;
  _emit("update:modelValue", response.url);
  _emit("change", response);
};

const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
  if (!["image/jpeg", "image/png"].includes(rawFile.type)) {
    ElMessage.error("Avatar picture must be JPG or PNG format!");
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error("Avatar picture size can not exceed 2MB!");
    return false;
  }
  return true;
};
const upload = ref<UploadInstance>();

const handleExceed: UploadProps["onExceed"] = (files) => {
  upload.value!.clearFiles();
  const file = files[0] as UploadRawFile;
  file.uid = genFileId();
  upload.value!.handleStart(file);
};
defineExpose({ handleExceed });
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
