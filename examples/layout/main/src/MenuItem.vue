<template>
  <template v-for="item of menu" :key="item.id">
    <template v-if="item.meta && !item.meta.hidden">
      <el-sub-menu
        :index="item.path"
        v-if="item.children && item.children.length > 0"
      >
        <template #title>
          <dc-icon :icon="item.meta.icon" />
          <span>{{ item.meta.title || item.name }}</span>
        </template>
        <el-menu-item-group>
          <menu-item :menu="item.children" />
        </el-menu-item-group>
      </el-sub-menu>
      <el-menu-item :index="item.path" v-else>
        <dc-icon :icon="item.meta.icon" />
        <template #title>{{ item.meta.title || item.name }}</template>
      </el-menu-item>
    </template>
  </template>
</template>
<script lang="ts" setup>
const _props = defineProps<{
  menu: any[];
}>();
</script>
<style lang="scss" scoped>
.-offset-top-20 {
  transform: translateY(-20px);
}
</style>
