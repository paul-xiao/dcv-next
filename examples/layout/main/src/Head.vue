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
            class="mr-2"
            :class="{ 'rotate-180 ': !asideExpanded }"
            icon="ep:expand"
          />
        </template>
        <dc-breadcrumb :paths="currentPath" />
      </div>
      <div class="opt">
        <el-icon class="ml-2"><bell /></el-icon>
        <el-icon class="ml-2"><collection /></el-icon>
        <el-icon class="ml-2" @click="$emit('toggleConfig')"
          ><operation
        /></el-icon>
        <el-dropdown class="ml-2">
          <span class="el-dropdown-link">
            用户AAA<el-icon class="el-icon--right"><arrow-down /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>个人信息</el-dropdown-item>
              <el-dropdown-item>修改密码</el-dropdown-item>
              <el-dropdown-item @click="onLogout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useUserStore } from "@/store/modules/user";
import Logo from "./Logo.vue";
const userStore = useUserStore();
const _props = defineProps<{
  value: boolean;
  asideExpanded: boolean;
  currentPath: any;
}>();
defineEmits(["toggleAside", "toggleConfig"]);

function onLogout() {
  userStore.logout();
}
</script>
