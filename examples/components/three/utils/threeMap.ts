import * as THREE from "three";
import * as d3 from "d3";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js";
/**
 * 3d 地图功能点
 * 1、geojson绘制地图，边界线
 * 2、地图上绘制点
 * 3、地图上绘制线
 * 4、地图上加载字体
 * 5、地图上加载tooltip
 */
interface MyGeoMapOption {
  type?: string;
  geojson: any;
  fontjson?: any;
}
export default class MyGeoMap {
  option: MyGeoMapOption;
  renderer: any;
  scene: any;
  camera: any;
  controls: any;
  ground: any;
  map: any;
  projection: any;
  renderEnabled: boolean;
  font: any;
  constructor(option) {
    this.option = option;
    this.renderEnabled = true;
    this.projection = d3.geoMercator().center([104.0, 37.5]).translate([0, 0]);

    this.init();
  }
  async init() {
    //
    this.setStage();
    this.setCamera();
    this.setLights();
    this.setControls();

    this.font = await this.asyncLoadFont();

    this.setGroundPlane();
    this.setRegionBlock();
    this.setPoint();
    this.setLines();
    // this.addHelper()
    this.animate();
  }
  setStage() {
    const canvas: HTMLElement | null = document.querySelector("#c");
    if (!canvas) {
      console.warn("dom not loaded!");
      return;
    }
    this.renderer = new THREE.WebGLRenderer({ canvas });
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color("black");
  }
  setCamera() {
    const fov = 75;
    const aspect = 2; // the canvas default
    const near = 0.1;
    const far = 10000;
    this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    this.camera.position.set(0, 0, 150);
    this.camera.lookAt(this.scene?.position);
    // helper
    const helper = new THREE.CameraHelper(this.camera);
    this.scene.add(helper);
  }
  setLights() {
    const color = 0xffffff;
    const intensity = 2;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(0, 50, 10);
    light.target.position.set(-5, 10, 5);
    this.scene.add(light);
    this.scene.add(light.target);
    // DirectionalLightHelper
    const helper = new THREE.DirectionalLightHelper(light, 5);
    this.scene.add(helper);
    class ColorGUIHelper {
      object;
      prop;
      constructor(object, prop) {
        this.object = object;
        this.prop = prop;
      }
      get value() {
        return `#${this.object[this.prop].getHexString()}`;
      }
      set value(hexString) {
        this.object[this.prop].set(hexString);
      }
    }
    const gui = new GUI();
    gui.addColor(new ColorGUIHelper(light, "color"), "value").name("color");
    gui.add(light, "intensity", 0, 2, 0.01);
    gui.add(light.target.position, "x", -10, 10);
    gui.add(light.target.position, "z", -10, 10);
    gui.add(light.target.position, "y", 0, 10);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2); // 创建环境光
    this.scene.add(ambientLight); // 将环境光添加到场景

    // const spotLight = new THREE.SpotLight(0xffffff) // 创建聚光灯
    // spotLight.position.set(0, 20, 50)
    // spotLight.castShadow = true
    // this.scene.add(spotLight)
    // // PointLightHelper
    // const sphereSize = 5
    // const pointLightHelper = new THREE.PointLightHelper(spotLight, sphereSize, 'red')
    // this.scene.add(pointLightHelper)
  }
  setControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.target.set(0, 0, 0);
    this.controls.update();
    this.controls.addEventListener("change", () => {
      this.timeRender();
    });
  }
  setGroundPlane() {
    const groundGeometry = new THREE.PlaneGeometry(5000, 5000);
    const groundMaterial = new THREE.MeshPhongMaterial({ color: 0x777777 });
    this.ground = new THREE.Mesh(groundGeometry, groundMaterial);
    this.ground.receiveShadow = true;
    this.ground.rotation.x = Math.PI * -0.2;
    this.scene.add(this.ground);
  }
  setRegionBlock() {
    {
      this.map = new THREE.Group();

      this.option.geojson.features.forEach((elem) => {
        let coordinates: any = elem.geometry.coordinates;
        const type = elem.geometry.type;
        if (type === "Polygon") {
          coordinates = [coordinates];
        }
        coordinates.forEach((multiPolygon: any[]) => {
          multiPolygon.forEach((polygon: any) => {
            const pointArr: any = [];
            const extrudeSettings = {
              depth: 5,
              bevelEnabled: false, //  是否给这个形状加斜面，默认加斜面。
            };
            for (let i = 0; i < polygon.length; i++) {
              const [x, y] = this.projection(polygon[i]);
              pointArr.push(new THREE.Vector3(x, -y, 5));
            }
            const shape = new THREE.Shape(pointArr);
            const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
            const material = new THREE.MeshBasicMaterial({ color: 0x203a9a });
            const mesh = new THREE.Mesh(geometry, material);
            // 添加边缘线
            const edges = new THREE.EdgesGeometry(geometry);
            const line = new THREE.LineSegments(
              edges,
              new THREE.LineBasicMaterial({ color: 0x000000 })
            );
            mesh.add(line);
            this.map.add(mesh);
          });
        });
      });
      this.ground.add(this.map);
    }
  }
  setPoint() {
    this.option.geojson.features.forEach((elem) => {
      const properties: any = elem.properties;
      if (!Array.isArray(properties.centroid)) return;
      const [x, y] = this.projection(properties.centroid);
      this.setText(properties.name, [x, y]);
      {
        const radiusTop = 1; // ui: radiusTop
        const radiusBottom = 1; // ui: radiusBottom
        const height = 5; // ui: height
        const radialSegments = 12; // ui: radialSegments
        const geometry = new THREE.CylinderGeometry(
          radiusTop,
          radiusBottom,
          height,
          radialSegments
        );
        const material = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // greenish blue

        const cube = new THREE.Mesh(geometry, material);
        cube.position.set(x, -y, 10);
        cube.rotateX(Math.PI / 2);
        this.map.add(cube);
      }
      {
        const radiusTop = 1; // ui: radiusTop
        const radiusBottom = 1; // ui: radiusBottom
        const height = 8; // ui: height
        const radialSegments = 12; // ui: radialSegments
        const geometry = new THREE.CylinderGeometry(
          radiusTop,
          radiusBottom,
          height,
          radialSegments
        );
        const material = new THREE.MeshBasicMaterial({ color: 0x44aa88 }); // greenish blue

        const cube = new THREE.Mesh(geometry, material);
        cube.position.set(x, -y, 17);
        cube.rotateX(Math.PI / 2);
        this.map.add(cube);
      }
    });
  }
  setLines() {
    const data = [
      {
        label: "北京-四川",
        coordinates: [
          [116.41995, 40.18994],
          [102.693453, 30.674545],
        ],
      },
      {
        label: "海南-四川",
        coordinates: [
          [109.754859, 19.189767],
          [102.693453, 30.674545],
        ],
      },
    ];

    data.forEach((d) => {
      const coordinates0 = d.coordinates[0];
      const coordinates1 = d.coordinates[1];
      // const startLon = (Math.PI / 180) * coordinates0[0];
      // const startLan = (Math.PI / 180) * coordinates0[1];
      // const endLon = (Math.PI / 180) * coordinates1[0];
      // const endtLan = (Math.PI / 180) * coordinates1[1];
      // const earthR = 6378;
      // const distance =
      //   Math.acos(
      //     Math.sin(startLan) * Math.sin(endtLan) +
      //       Math.cos(startLan) * Math.cos(endtLan) * Math.cos(endLon - startLon)
      //   ) * earthR;
      const partCount = 10;

      const [x0, y0] = this.projection(coordinates0);
      const [x1, y1] = this.projection(coordinates1);
      const pointsArr: any = [];
      for (let i = 0; i <= partCount; i++) {
        const x = (x0 * (partCount - i)) / partCount + (x1 * i) / partCount;
        const y = (y0 * (partCount - i)) / partCount + (y1 * i) / partCount;
        const z = (partCount - i) * i + 50 / partCount; // 基于z轴的平滑曲线

        pointsArr.push(new THREE.Vector3(x, -y, z));
      }

      /**
       * 创建线条模型
       */
      const geometry = new THREE.BufferGeometry(); //创建一个缓冲类型几何体
      console.log(pointsArr);

      // 三维样条曲线
      const curve = new THREE.CatmullRomCurve3(pointsArr);
      //曲线上等间距返回多个顶点坐标
      const points = curve.getSpacedPoints(partCount); //分段数100，返回101个顶点
      // setFromPoints方法从points中提取数据赋值给attributes.position
      geometry.setFromPoints(points);
      const material = new THREE.LineBasicMaterial({
        color: 0xff0000, //轨迹颜色
        linewidth: 2,
        linecap: "round", //ignored by WebGLRenderer
        linejoin: "round", //ignored by WebGLRenderer
      });
      //线条模型对象
      const line = new THREE.Line(geometry, material);
      this.map.add(line);
    });
  }
  addHelper() {
    const helper = new THREE.CameraHelper(this.camera);
    this.scene?.add(helper);
  }
  async asyncLoadFont() {
    const loader = new FontLoader();
    function loadFont(url) {
      return new Promise((resolve, reject) => {
        loader.load(url, resolve, undefined, reject);
      });
    }
    return await loadFont("font/font.json");
  }
  setText(text, position) {
    if (!this.font) return;
    const textGeo: any = new TextGeometry(text, {
      font: this.font,
      size: 2.0,
      height: 0.2,
      curveSegments: 12,
      bevelEnabled: false,
      bevelThickness: 0.15,
      bevelSize: 0.3,
      bevelSegments: 5,
    });

    textGeo.computeBoundingBox();
    const material = new THREE.MeshNormalMaterial({
      flatShading: true,
      transparent: true,
    });
    const centerOffsetX =
      -0.5 * (textGeo.boundingBox.max.x - textGeo.boundingBox.min.x);
    const centerOffsetY =
      -0.5 * (textGeo.boundingBox.max.y - textGeo.boundingBox.min.y);

    const mesh = new THREE.Mesh(textGeo, material);
    const [x, y] = position;
    mesh.position.set(x + centerOffsetX, -y + centerOffsetY - 2, 5);

    this.map.add(mesh);
  }
  timeRender() {
    let timeOut: any = null;
    //设置为可渲染状态
    this.renderEnabled = true;
    this.animate();

    //清除上次的延迟器
    if (timeOut) {
      clearTimeout(timeOut);
    }
    timeOut = setTimeout(() => {
      this.renderEnabled = false;
    }, 500);
  }
  resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    if (!canvas) return;
    const pixelRatio = window.devicePixelRatio;
    const width = (canvas.clientWidth * pixelRatio) | 0;
    const height = (canvas.clientHeight * pixelRatio) | 0;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }
  animate() {
    const render = () => {
      if (this.resizeRendererToDisplaySize(this.renderer)) {
        const canvas = this.renderer.domElement;
        this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
        this.camera.updateProjectionMatrix();
      }
      if (this.renderEnabled) {
        this.renderer.render(this.scene, this.camera);
      }
      // requestAnimationFrame(render)
    };
    // todo: 地图开启requestAnimationFrame cpu 100%
    // requestAnimationFrame(render)
    render();
  }
}
