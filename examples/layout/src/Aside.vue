<template>
  <div class="bg-slate-100">
    <div class="h-12 leading-10 text-center" v-if="value">
      <el-icon @click="$emit('toggleAside')" v-if="asideExpanded"
        ><expand
      /></el-icon>
      <el-icon @click="$emit('toggleAside')" v-else><fold /></el-icon>
    </div>
    <div class="p-5">aside1</div>
  </div>
</template>
<script setup lang="ts">
defineProps({
  value: { type: Boolean },
  asideExpanded: { type: Boolean },
});
defineEmits(["toggleAside"]);
</script>
