<template>
  <div class="shadow">
    <div class="m-auto bg-gray-100 max-w-screen-2xl max-w-screen">
      <el-menu
        :default-active="activeIndex"
        class="items-center !border-none"
        mode="horizontal"
        :ellipsis="false"
        @select="handleSelect"
      >
        <el-menu-item index="0">
          <img
            style="height: 40px"
            src="/images/element-plus-logo.svg"
            alt="Element logo"
          />
        </el-menu-item>
        <div class="flex-grow"></div>
        <el-menu-item index="guide">
          <router-link to="/guide">指南</router-link>
        </el-menu-item>
        <el-menu-item index="components">
          <router-link to="/components">组件</router-link>
        </el-menu-item>
        <el-sub-menu index="theme">
          <template #title>主题</template>
          <el-menu-item index="dark">Dark</el-menu-item>
          <el-menu-item index="light">Light</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ElMenu, ElMenuItem, ElSubMenu } from "element-plus";
import { ref } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const activeIndex = ref("");
activeIndex.value = route.path.split("/")[1];
console.log(route.path.split("/")[1]);

const handleSelect = (key: string) => {
  if (["dark", "light"].includes(key)) {
    document.documentElement.className = key;
  }
};
</script>

<style>
.flex-grow {
  flex-grow: 1;
}
</style>
