<template>
  <div>
    <canvas id="c" class="w-full"></canvas>
  </div>
</template>
<script lang="ts" setup>
import * as THREE from "three";
import { onMounted } from "vue";

function main() {
  const canvas = document.querySelector("#c");
  if (!canvas) return;
  const renderer = new THREE.WebGLRenderer({ canvas });
  renderer.shadowMap.enabled = false;

  function makeCamera(fov = 35) {
    const aspect = 2; // the canvas default
    const zNear = 0.1;
    const zFar = 1000;
    return new THREE.PerspectiveCamera(fov, aspect, zNear, zFar);
  }
  const camera = makeCamera();
  camera.position.set(8, 4, 10).multiplyScalar(3);
  camera.lookAt(0, 0, 0);

  const scene = new THREE.Scene();

  {
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 20, 0);
    scene.add(light);
    light.castShadow = true;
    light.shadow.mapSize.width = 2048;
    light.shadow.mapSize.height = 2048;

    const d = 50;
    light.shadow.camera.left = -d;
    light.shadow.camera.right = d;
    light.shadow.camera.top = d;
    light.shadow.camera.bottom = -d;
    light.shadow.camera.near = 1;
    light.shadow.camera.far = 50;
    light.shadow.bias = 0.001;
  }

  {
    // 作用域？
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1, 2, 4);
    scene.add(light);
  }
  // cube
  // {
  //   const boxWidth = 1;
  //   const boxHeight = 1;
  //   const boxDepth = 1;
  //   const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

  //   const material = new THREE.MeshBasicMaterial({ color: 0x44aa88 }); // greenish blue

  //   const cube = new THREE.Mesh(geometry, material);
  // }

  const groundGeometry = new THREE.PlaneGeometry(50, 50);
  const groundMaterial = new THREE.MeshPhongMaterial({ color: 0x777777 });
  const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
  groundMesh.rotation.x = Math.PI * -0.5;
  groundMesh.receiveShadow = true;
  scene.add(groundMesh);

  const tank = new THREE.Object3D();
  scene.add(tank);
  {
    // 车身
    const width = 12; // ui: width
    const height = 3; // ui: height
    const depth = 8; // ui: depth
    const widthSegments = 4; // ui: widthSegments
    const heightSegments = 4; // ui: heightSegments
    const depthSegments = 4; // ui: depthSegments
    const geometry = new THREE.BoxGeometry(
      width,
      height,
      depth,
      widthSegments,
      heightSegments,
      depthSegments
    );
    const bodyMaterial = new THREE.MeshPhongMaterial({
      color: 0x00ffff, // 红色 (也可以使用CSS的颜色字符串)
      flatShading: true,
    });
    const bodyMesh = new THREE.Mesh(geometry, bodyMaterial);
    bodyMesh.position.set(0, 2, 0);
    tank.add(bodyMesh);

    // 锅盖
    const domeGeometry = new THREE.BoxGeometry(
      width / 2,
      height / 2,
      depth / 2,
      widthSegments,
      heightSegments,
      depthSegments
    );
    const domeMaterial = new THREE.MeshPhongMaterial({
      color: "0xFFFF00", // 红色 (也可以使用CSS的颜色字符串)
      flatShading: true,
    });
    const domeMesh = new THREE.Mesh(domeGeometry, domeMaterial);
    domeMesh.position.set(0, height / 2, 0);
    bodyMesh.add(domeMesh);

    // 轮子

    const wheelsPos = [
      [4, 0, 4],
      [-4, 0, 4],
      [4, 0, -4],
      [-4, 0, -4],
    ];

    const setWheel = (pos = [4, 0, 4]) => {
      const radius = 1.5; // ui: radius
      const detail = 1; // ui: detail
      const wheelGeometry = new THREE.DodecahedronGeometry(radius, detail);
      const wheelMaterial = new THREE.MeshPhongMaterial({
        color: 0x000000, // 红色 (也可以使用CSS的颜色字符串)
        flatShading: true,
      });
      const wheelMesh = new THREE.Mesh(wheelGeometry, wheelMaterial);
      const [x, y, z] = pos;
      wheelMesh.position.set(x, y, z);
      bodyMesh.add(wheelMesh);
    };

    wheelsPos.forEach((pos) => {
      setWheel(pos);
    });

    // 枪杆子 哈哈 turret
    {
      const radiusTop = 0.5; // ui: radiusTop
      const radiusBottom = 0.5; // ui: radiusBottom
      const height = 8; // ui: height
      const radialSegments = 20; // ui: radialSegments
      const turretGeometry = new THREE.CylinderGeometry(
        radiusTop,
        radiusBottom,
        height,
        radialSegments
      );
      const turretMaterial = new THREE.MeshPhongMaterial({
        color: 0x00ffff, // 红色 (也可以使用CSS的颜色字符串)
        flatShading: true,
      });
      const turretMesh = new THREE.Mesh(turretGeometry, turretMaterial);
      turretMesh.position.set(-5, 2, 0);
      turretMesh.rotation.x = 10;
      turretMesh.rotation.z = 30;
      bodyMesh.add(turretMesh);
    }
  }

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const pixelRatio = window.devicePixelRatio;
    const width = (canvas.clientWidth * pixelRatio) | 0;
    const height = (canvas.clientHeight * pixelRatio) | 0;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  function render(time) {
    time *= 0.0001;

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }
    groundMesh.rotation.z = time;
    tank.rotation.y = time;
    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

onMounted(() => {
  main();
});
</script>
