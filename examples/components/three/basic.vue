<template>
  <div class="p-4">
    <h1>threejs</h1>
    <div id="stage"></div>
  </div>
</template>
<script lang="ts" setup>
import * as THREE from "three";
import { onMounted } from "vue";
const stateWidth = 600;
const stateHeight = 600;
const camera = new THREE.PerspectiveCamera(
  70,
  stateWidth / stateHeight,
  0.01,
  10
);
camera.position.z = 1;

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
const material = new THREE.MeshNormalMaterial();

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(stateWidth, stateHeight);
renderer.setAnimationLoop(animation);

onMounted(() => {
  document.getElementById("stage")?.appendChild(renderer.domElement);
});

// animation

function animation(time) {
  mesh.rotation.x = time / 2000;
  mesh.rotation.y = time / 1000;

  renderer.render(scene, camera);
}
</script>
