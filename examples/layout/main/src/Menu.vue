<template>
  <el-menu
    :default-active="activeMenu"
    :collapse="!menus.asideExpanded"
    class="border-0"
    :unique-opened="true"
    active-text-color="#ffd04b"
    background-color="#1f2937"
    router
    text-color="#fff"
  >
    <menu-item :menu="menus.menuList" />
  </el-menu>
</template>
<script lang="ts" setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import MenuItem from "./MenuItem.vue";
const route = useRoute();
const activeMenu = ref<string>("");
const _props = defineProps<{
  menus: {
    menuList: any;
    asideExpanded: boolean;
  };
}>();
activeMenu.value = route.path;
watch(
  () => route.path,
  (val) => {
    activeMenu.value = val;
  }
);
defineEmits(["toggleChild"]);
</script>
