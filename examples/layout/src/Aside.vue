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
        <template v-if="menu.meta && !menu.meta.hidden">
          <router-link :to="menu.path">{{ menu.name }}</router-link>
          <div
            v-for="child of menu.children"
            class="font-light"
            :key="child.id"
          >
            <template v-if="child.meta && !child.meta.hidden">
              <div class="pl-2 cursor-pointer hover:bg-gray-200">
                <router-link :to="child.path">{{ child.name }}</router-link>
              </div>
            </template>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useAppStore } from "@/store/modules/app";
import { computed } from "vue";
const appStore = useAppStore();
const menus = computed(() => appStore.getMenu.menuList);
defineProps({
  value: { type: Boolean },
  asideExpanded: { type: Boolean },
});
defineEmits(["toggleAside"]);
</script>
