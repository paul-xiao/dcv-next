<template>
  <div>
    <Header />
    <div class="m-auto max-w-screen-2xl max-w-screen">
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts" setup>
import Header from "../components/Header.vue";
</script>
