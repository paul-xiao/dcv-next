<template>
  <div class="flex">
    <div class="w-64 p-5">
      <ul>
        <li
          v-for="item of componentsRoutes"
          :key="item.name"
          class="px-2 leading-10 hover:bg-gray-100 active:bg-gray-200"
        >
          <router-link :to="item.path">{{ item.name }}</router-link>
        </li>
      </ul>
    </div>
    <div class="flex-1 h-screen overflow-auto bg-gray-200">
      <router-view />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { componentsRoutes } from "../router";
console.log(componentsRoutes);
</script>
