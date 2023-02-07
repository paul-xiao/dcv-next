<template>
  <canvas id="c" class="w-full"></canvas>
</template>
<script lang="ts" setup>
import { onMounted } from "vue";
import jsondata from "./data/china1.json";
import fontdata from "./data/font.json";
import MyGeoMap from "./utils/threeMap";

onMounted(() => {
  new MyGeoMap({
    geojson: jsondata,
    fontjson: fontdata,
  });
});
</script>
