import * as THREE from "three";
import { Camera, Renderer, Scene, Vector3 } from "three";
interface CameraOpt {
  fov: number;
  aspect: number;
  near: number;
  far: number;
  position: Vector3;
}
interface MyThreeConf {
  container: string;
  camera: CameraOpt;
}
export class MyThree {
  opt: MyThreeConf;
  renderer: Renderer | null;
  camera: Camera | null;
  scene: Scene | null;
  constructor(opt: MyThreeConf) {
    this.opt = opt;
    this.renderer = null;
    this.camera = null;
    this.scene = null;
  }
  init() {
    const canvas: HTMLElement | null = document.querySelector(
      this.opt.container
    );
    if (!canvas) return;
    this.renderer = new THREE.WebGLRenderer({ canvas });

    const { fov, aspect, near, far, position } = this.opt.camera;
    this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    const { x, y, z } = position;
    this.camera.position.set(x, y, z);

    this.scene = new THREE.Scene();

    this.render();
  }
  setGeoMap() {}
  makePoint(coord, data) {
    console.log(coord, data);
  }
  makeline(from, to, data) {
    console.log(from, to, data);
  }
  setCube() {
    const boxWidth = 1;
    const boxHeight = 1;
    const boxDepth = 1;
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

    const material = new THREE.MeshBasicMaterial({ color: 0x44aa88 }); // greenish blue

    const cube = new THREE.Mesh(geometry, material);
    this.scene?.add(cube);
  }
  setToolTip() {}
  render() {
    this.scene && this.camera && this.renderer?.render(this.scene, this.camera);
  }
  animate() {}
}
