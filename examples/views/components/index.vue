<template>
  <BaseLayout>
    <div class="flex mt-5">
      <div class="w-60">
        <router-link
          :to="item.path"
          v-for="item of componentRoutes"
          :key="item.name"
          class="block px-2 text-sm leading-10 text-gray-700 hover:bg-gray-50"
          :class="{ 'border-r-2 bg-gray-100': $route.path === item.path }"
          >{{ item.name }}</router-link
        >
      </div>
      <div class="flex-1 h-screen overflow-auto">
        <router-view />
      </div>
    </div>
  </BaseLayout>
</template>
<script lang="ts" setup>
import BaseLayout from "@/layout/index.vue";

const componentRoutes = [
  {
    name: "按钮",
    path: "/components/button",
  },
  {
    name: "表单",
    path: "/components/form",
  },
  {
    name: "表格",
    path: "/components/table",
  },
];
</script>
