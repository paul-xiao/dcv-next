<template>
  <el-menu
    default-active="2"
    :collapse="!menus.asideExpanded"
    class="border-0"
    active-text-color="#ffd04b"
    background-color="#1f2937"
    router
    text-color="#fff"
  >
    <menu-item :menu="menus.menuList"></menu-item>
  </el-menu>
</template>
<script lang="ts" setup>
import MenuItem from "./MenuItem.vue";
const _props = defineProps<{
  menus: {
    menuList: any;
    asideExpanded: boolean;
  };
}>();
defineEmits(["toggleChild"]);
</script>
