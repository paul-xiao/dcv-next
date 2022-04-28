<template>
  <div class="flex-1 text-white bg-gray-800">
    <div class="h-12 leading-10 text-center" v-if="value">
      <dc-icon @click="$emit('toggleAside')" icon="ep:expand" />
    </div>
    <div>
      <template v-for="menu of menus.menuList" :key="menu.id">
        <template v-if="menu.meta && !menu.meta.hidden">
          <template v-if="menu.children.length">
            <div
              @click="$emit('toggleChild', menu)"
              class="flex items-center px-2 leading-8"
              :class="{ 'bg-gray-600': $route.name === menu.name }"
            >
              <dc-icon :icon="menu.meta.icon" /><span
                v-if="menus.asideExpanded"
              >
                {{ menu.name }}</span
              >
            </div>
          </template>
          <template v-else>
            <router-link
              :to="menu.path"
              @click="$emit('toggleChild', menu)"
              class="flex items-center px-2 leading-8"
              :class="{ 'bg-gray-600': $route.name === menu.name }"
            >
              <dc-icon :icon="menu.meta.icon" /><span
                v-if="menus.asideExpanded"
              >
                {{ menu.name }}</span
              ></router-link
            >
          </template>
          <menu-item :menu="menu.children" :expanded="menu.isExpand" />
        </template>
      </template>
    </div>
  </div>
</template>
<script setup lang="ts">
import MenuItem from "./MenuItem.vue";
const _props = defineProps<{
  value: boolean;
  menus: any;
}>();
defineEmits(["toggleAside", "toggleChild"]);
</script>
