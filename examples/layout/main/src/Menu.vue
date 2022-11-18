<template>
  <el-menu
    :default-active="activeMenu"
    :collapse="!aside?.asideExpanded"
    class="border-0"
    :unique-opened="true"
    active-text-color="#ffd04b"
    background-color="#1f2937"
    router
    text-color="#fff"
  >
    <menu-item :menu="aside.menuList" />
  </el-menu>
</template>
<script lang="ts" setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import MenuItem from "./MenuItem.vue";
const route = useRoute();
const activeMenu = ref<string | unknown>("");
const _props = defineProps<{
  aside: {
    menuList: any;
    asideExpanded: boolean;
  };
}>();
setActiveMenu();
watch(
  () => route.path,
  (val) => {
    setActiveMenu(val);
  }
);
function setActiveMenu(val = route.path) {
  activeMenu.value = route.meta?.activeMenu || val;
}
defineEmits(["toggleChild"]);
</script>
