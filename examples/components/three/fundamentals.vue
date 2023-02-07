<template>
  <div class="">
    <canvas id="c"></canvas>
    <div class="w-40">xxx</div>
  </div>
</template>
<script lang="ts" setup>
import * as THREE from "three";
import { onMounted } from "vue";

function main() {
  const canvas: HTMLElement | null = document.querySelector("#c");
  if (!canvas) return;
  const renderer = new THREE.WebGLRenderer({ canvas });

  const fov = 75;
  const aspect = 2; // the canvas default
  const near = 0.1;
  const far = 5;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 2;

  const scene = new THREE.Scene();

  const boxWidth = 1;
  const boxHeight = 1;
  const boxDepth = 1;
  const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

  const material = new THREE.MeshBasicMaterial({ color: 0x44aa88 }); // greenish blue

  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  renderer.render(scene, camera);
}

onMounted(() => {
  main();
});
</script>
