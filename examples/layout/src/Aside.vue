<template>
  <div class="bg-white">
    <div class="h-12 leading-10 text-center" v-if="value">
      <dc-icon @click="$emit('toggleAside')" icon="ep:expand" />
    </div>
    <div class="p-5">
      <div v-for="menu of menus" :key="menu.id">
        <template v-if="menu.meta && !menu.meta.hidden">
          <template v-if="menu.children.length">
            <div @click="toggleChild(menu)" class="flex items-center">
              <dc-icon :icon="menu.meta.icon" /><span v-if="asideExpanded">
                {{ menu.name }}</span
              >
            </div>
          </template>
          <template v-else>
            <router-link
              :to="menu.path"
              @click="toggleChild(menu)"
              class="flex items-center"
            >
              <dc-icon :icon="menu.meta.icon" /><span v-if="asideExpanded">
                {{ menu.name }}</span
              ></router-link
            >
          </template>
          <template v-if="asideExpanded && menu.isExpand">
            <div
              v-for="child of menu.children"
              class="font-light"
              :key="child.id"
            >
              <template v-if="child.meta && !child.meta.hidden">
                <div class="pl-2 cursor-pointer hover:bg-gray-200">
                  <router-link :to="child.path" class="flex items-center"
                    ><dc-icon :icon="child.meta.icon" />
                    <span>{{ child.name }}</span></router-link
                  >
                </div>
              </template>
            </div>
          </template>
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
const toggleChild = (menu: any) => {
  menu.isExpand = !menu.isExpand;
};
</script>
