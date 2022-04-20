<template>
  <div class="bg-white">
    <div class="h-12 leading-10 text-center" v-if="value">
      <dc-icon @click="$emit('toggleAside')" icon="ep:expand" />
    </div>
    <div class="p-5">
      <template v-for="menu of menus" :key="menu.id">
        <template v-if="menu.meta && !menu.meta.hidden">
          <template v-if="menu.children.length">
            <div @click="toggleChild(menu)" class="flex items-center leading-8">
              <dc-icon :icon="menu.meta.icon" /><span v-if="asideExpanded">
                {{ menu.name }}</span
              >
            </div>
          </template>
          <template v-else>
            <router-link
              :to="menu.path"
              @click="toggleChild(menu)"
              class="flex items-center leading-8"
              :class="{ 'bg-slate-100': $route.name === menu.name }"
            >
              <dc-icon :icon="menu.meta.icon" /><span v-if="asideExpanded">
                {{ menu.name }}</span
              ></router-link
            >
          </template>
          <template v-if="asideExpanded && menu.isExpand">
            <menu-item :menu="menu.children" />
          </template>
        </template>
      </template>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useAppStore } from "@/store/modules/app";
import MenuItem from "./MenuItem.vue";
import { computed } from "vue";
const { setMenuItem, getMenu } = useAppStore();
const menus = computed(() => getMenu.menuList);
defineProps({
  value: { type: Boolean },
  asideExpanded: { type: Boolean },
});
defineEmits(["toggleAside"]);
const toggleChild = (menu: any) => {
  console.log(menus.value.some((d: any) => d.isExpand));

  menu.isExpand = !menu.isExpand;
  setMenuItem(menu);
};
</script>
