<template>
  <div class="bg-white">
    <div class="h-12 leading-10 text-center" v-if="value">
      <el-icon @click="$emit('toggleAside')" v-if="asideExpanded"
        ><expand
      /></el-icon>
      <el-icon @click="$emit('toggleAside')" v-else><fold /></el-icon>
    </div>
    <div class="p-5">
      <div v-for="menu of menus" :key="menu.id">
        <div>{{ menu.menu_name }}</div>
        <div v-for="child of menu.children" class="font-light" :key="child.id">
          <div class="pl-2 cursor-pointer hover:bg-gray-200">
            {{ child.menu_name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useAppStore } from "@/store/modules/app";
import { computed } from "vue";
const appStore = useAppStore();
const menus = computed(() => appStore.getMenu);
defineProps({
  value: { type: Boolean },
  asideExpanded: { type: Boolean },
});
defineEmits(["toggleAside"]);
</script>
