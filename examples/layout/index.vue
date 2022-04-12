<template>
  <div class="flex w-full h-screen min-h-full">
    <div class="flex-1">
      <Head
        @toggleConfig="isPanelShow = !isPanelShow"
        @toggleAside="toggleAside"
        :value="value"
        :asideExpanded="asideExpanded"
        v-if="value"
      />
      <div class="flex">
        <div class="w-20" :class="{ 'w-60': asideExpanded }">
          <Logo v-if="!value" :value="value" />
          <Aside
            @toggleAside="toggleAside"
            :value="value"
            :asideExpanded="asideExpanded"
          />
        </div>
        <div class="flex-1">
          <Head
            @toggleConfig="isPanelShow = !isPanelShow"
            @toggleAside="toggleAside"
            :value="value"
            :asideExpanded="asideExpanded"
            v-if="!value"
          />
          <div class="p-5 bg-gray-50">
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
import Aside from "./src/Aside.vue";
import { ref } from "vue";
const value = ref(false);
const asideExpanded = ref(true);
const isPanelShow = ref(false);
function toggleAside() {
  asideExpanded.value = !asideExpanded.value;
}
</script>
<style lang="scss" scoped></style>
