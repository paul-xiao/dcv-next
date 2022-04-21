<template>
  <div class="flex h-12 bg-white">
    <div class="w-60" v-if="value">
      <Logo :value="value" :asideExpanded="asideExpanded" />
    </div>
    <div class="flex items-center justify-between flex-1 px-5">
      <div class="flex items-center flex-1">
        <template v-if="!value">
          <dc-icon
            @click="$emit('toggleAside')"
            :class="{ 'rotate-180 ': !asideExpanded }"
            icon="ep:expand"
          />
        </template>
        <dc-breadcrumb :paths="currentPath" />
      </div>
      <div class="opt">
        <el-icon><bell /></el-icon>
        <el-icon><collection /></el-icon>
        <el-icon @click="$emit('toggleConfig')"><operation /></el-icon>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Logo from "./Logo.vue";
interface Props {
  value: boolean;
  asideExpanded: boolean;
  currentPath: any;
}
const _props = defineProps<Props>();
defineEmits(["toggleAside", "toggleConfig"]);
</script>
