<template>
  <div class="flex h-12 bg-white">
    <div class="w-60" v-if="value"><Logo :value="value" /></div>
    <div class="flex items-center justify-between flex-1 px-5">
      <div class="flex-1">
        <div v-if="!value">
          <el-icon @click="$emit('toggleAside')" v-if="asideExpanded"
            ><expand
          /></el-icon>
          <el-icon @click="$emit('toggleAside')" v-else><fold /></el-icon>
        </div>
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
defineProps({
  value: { type: Boolean },
  asideExpanded: { type: Boolean },
});
defineEmits(["toggleAside", "toggleConfig"]);
</script>
