<template>
  <div class="bg-slate-100">
    <div class="h-12 leading-10 text-center" v-if="value">
      <el-icon @click="$emit('toggleAside')" v-if="asideExpanded"
        ><expand
      /></el-icon>
      <el-icon @click="$emit('toggleAside')" v-else><fold /></el-icon>
    </div>
    <div class="p-5">
      <div v-for="menu of getters.menuList" :key="menu.id">
        <div>{{ menu.menu_name }}</div>
        <div v-for="child of menu.children" class="font-light" :key="child.id">
          <div>{{ child.menu_name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useStore } from "vuex";
const { getters } = useStore();
defineProps({
  value: { type: Boolean },
  asideExpanded: { type: Boolean },
});
defineEmits(["toggleAside"]);
</script>
