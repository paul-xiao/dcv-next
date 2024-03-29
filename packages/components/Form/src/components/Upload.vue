<template>
  <ElUpload
    ref="upload"
    class="avatar-uploader"
    :action="action"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
  >
    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
    <ElIcon v-else class="avatar-uploader-icon"><Plus /></ElIcon>
  </ElUpload>
</template>

<script lang="ts" setup>
import {
  ElMessage,
  UploadInstance,
  UploadProps,
  UploadRawFile,
  genFileId,
} from "element-plus";
import { Plus } from "@element-plus/icons-vue";
import { ref, watch } from "vue";
interface Props {
  modelValue?: string;
  action: string;
}

const _props = defineProps<Props>();
const _emit = defineEmits(["update:modelValue", "change"]);

console.log(_props.action);
const imageUrl = ref<string | undefined>("");
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
    ElMessage.warning("Avatar picture must be JPG or PNG format!");
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.warning("Avatar picture size can not exceed 2MB!");
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
