<template>
  <div class="flex w-full">
    <div class="flex-1">
      <Head
        @toggleConfig="isPanelShow = !isPanelShow"
        @toggleAside="toggleMenu"
        :value="value"
        :asideExpanded="menus.asideExpanded"
        :currentPath="menus.currentPath"
        v-if="value"
      />
      <div class="flex h-screen">
        <div class="flex flex-col" :class="{ 'w-64': menus.asideExpanded }">
          <Logo
            v-if="!value"
            :value="value"
            :asideExpanded="menus.asideExpanded"
          />
          <aside-menu
            :menus="menus"
            @toggle-aside="toggleMenu"
            @toggle-child="toggleChild"
            :value="value"
          />
        </div>
        <div class="flex flex-col flex-1 h-screen overflow-hidden">
          <Head
            @toggleConfig="isPanelShow = !isPanelShow"
            @toggleAside="toggleMenu"
            :value="value"
            :asideExpanded="menus.asideExpanded"
            :currentPath="menus.currentPath"
            v-if="!value"
          />
          <Tab :tab="tab" @tab-click="onTabClick" @tab-close="removeTab" />
          <div class="flex-1 p-5 overflow-auto bg-gray-50">
            <router-view />
          </div>
        </div>
      </div>
    </div>
    <div class="h-full p-5 w-60 bg-slate-100" v-show="isPanelShow">
      <div class="flex items-center justify-between">
        <h4>config panel</h4>
        <el-icon @click="isPanelShow = false"><close /></el-icon>
      </div>
      <div class="flex items-center justify-between">
        <span>layout</span>
        <el-switch
          v-model="value"
          size="large"
          active-text="Flat"
          inactive-text="Divide"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Logo from "./src/Logo.vue";
import Head from "./src/Head.vue";
import AsideMenu from "./src/Aside.vue";
import Tab from "./src/Tab.vue";
import { computed, ref, watch } from "vue";
import { useAppStore } from "@/store/modules/app";
import { useRouter } from "vue-router";

const value = ref(false);
const isPanelShow = ref(false);
const { toggleMenu, removeTab, setMenuItem, getMenu, getTab } = useAppStore();
const router = useRouter();
const tab = computed(() => getTab);
const onTabClick = (item: IPath) => {
  router.push({ name: item.name });
};
const menus = computed(() => getMenu);

const toggleChild = (menu: any) => {
  menu.expanded = !menu.expanded;
  setMenuItem(menu);
};

// watch(
//   () => router.currentRoute.value,
//   () => {
//     console.log('route changed')
//   }
// )
</script>
<style lang="scss" scoped></style>
