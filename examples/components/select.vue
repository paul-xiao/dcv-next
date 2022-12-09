<template>
  <div class="p-5">
    <div class="w-40">
      <dc-basic-select v-model="text" :options="options" multiple />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, watch } from "vue";

const text = ref(["test"]);
const options = [
  { label: "test", value: "test" },
  { label: "test1", value: "test1" },
];
watch(
  () => text.value,
  (val) => {
    console.log(val);
  }
);
</script>
