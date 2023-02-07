<template>
  <div>
    <canvas id="c" class="w-full"></canvas>
  </div>
</template>
<script lang="ts" setup>
import * as THREE from "three";
import { onMounted } from "vue";
import useAnmimateHook from "./hooks/useAnmimateHook";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

function main() {
  const canvas = document.querySelector("#c");
  if (!canvas) return;
  const renderer = new THREE.WebGLRenderer({ canvas });
  renderer.setClearColor(0xaaaaaa);
  renderer.shadowMap.enabled = false;

  const fov = 10;
  const aspect = 1; // canvas 的默认宽高 300:150
  const near = 0.1;
  const far = 100;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 0, 10);
  camera.lookAt(0, 0, 0);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.update();

  const scene = new THREE.Scene();

  {
    // 方向光
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 10, 10);
    scene.add(light);
  }

  {
    // 环境光
    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.AmbientLight(color, intensity);
    scene.add(light);
  }

  {
    const loader = new GLTFLoader();

    loader.load(
      "/glb/marble_bust_01_4k.glb",
      function (gltf) {
        console.log(gltf);

        scene.add(gltf.scene);
      },
      undefined,
      function (error) {
        console.error(error);
      }
    );
  }

  useAnmimateHook({
    renderer,
    camera,
    scene,
    controls,
    cb: () => {
      // groundMesh.rotation.z = time
      // rabbit.rotation.y = time
    },
  });
}

onMounted(() => {
  main();
});
</script>
