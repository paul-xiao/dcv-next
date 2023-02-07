import * as THREE from "three";
import * as d3 from "d3";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
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
    this.render();
  }
  setStage() {
    const canvas: HTMLElement | null = document.querySelector("#c");
    if (!canvas) {
      console.warn("dom not loaded!");
      return;
    }
    this.renderer = new THREE.WebGLRenderer({ canvas });
    this.scene = new THREE.Scene();
  }
  setCamera() {
    const fov = 75;
    const aspect = 2; // the canvas default
    const near = 0.1;
    const far = 10000;
    this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    this.camera.position.set(0, 0, 120);
    this.camera.lookAt(this.scene?.position);
  }
  setLights() {
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1, 2, 4);
    this.scene.add(light);
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
    const groundGeometry = new THREE.PlaneGeometry(5500, 5500);
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
      if (!Array.isArray(properties.center)) return;
      const [x, y] = this.projection(properties.center);
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
        label: "北京-天津",
        coordinates: [
          [116.405285, 39.904989],
          [117.190182, 39.125596],
        ],
      },
    ];
    data.forEach((d) => {
      const [x0, y0] = this.projection(d.coordinates[0]);
      const [x1, y1] = this.projection(d.coordinates[1]);
      console.log(x0, y0);
      console.log(x1, y1);
      /**
       * 创建线条模型
       */
      const geometry = new THREE.BufferGeometry(); //创建一个缓冲类型几何体
      // 三维样条曲线
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(x0, y0, 25),
        new THREE.Vector3(x1, y1, 50),
      ]);
      //曲线上等间距返回多个顶点坐标
      const points = curve.getSpacedPoints(100); //分段数100，返回101个顶点
      // setFromPoints方法从points中提取数据赋值给attributes.position
      geometry.setFromPoints(points);
      const material = new THREE.LineBasicMaterial({
        color: 0x006666, //轨迹颜色
      });
      //线条模型对象
      const line = new THREE.Line(geometry, material);
      this.scene.add(line);

      const index = 20; //取点索引位置
      const num = 10; //从曲线上获取点数量
      const points2 = points.slice(index, index + num); //从曲线上获取一段
      const geometry2 = new THREE.BufferGeometry();
      geometry2.setFromPoints(points2);

      // 批量计算所有顶点颜色数据
      const posNum = points2.length - 2; //分界点黄色，两端和轨迹线一个颜色青色
      const colorArr = [];
      for (let i = 0; i < points2.length; i++) {
        const color1 = new THREE.Color(0x006666); //轨迹线颜色 青色
        const color2 = new THREE.Color(0xffff00); //黄色
        let color;
        // 飞线段里面颜色设置为黄色，两侧设置为青色，也就是说中间某个位置向两侧颜色渐变
        if (i < posNum) {
          color = color1.lerp(color2, i / posNum);
        } else {
          color = color2.lerp(color1, (i - posNum) / (points2.length - posNum));
        }
        colorArr.push(color.r, color.g, color.b);
      }
      // 设置几何体顶点颜色数据
      geometry2.attributes.color = new THREE.BufferAttribute(
        new Float32Array(colorArr),
        3
      );

      const material2 = new THREE.LineBasicMaterial({
        // color: 0xffff00, //轨迹颜色
        vertexColors: THREE.VertexColors, //使用顶点颜色，不用设置color
        linewidth: 3.0, // 设置线宽
      });
      //线条模型对象
      const line2 = new THREE.Line(geometry2, material2);
      this.scene.add(line2);
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
    this.render();

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
    const pixelRatio = window.devicePixelRatio;
    const width = (canvas.clientWidth * pixelRatio) | 0;
    const height = (canvas.clientHeight * pixelRatio) | 0;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }
  render() {
    if (this.resizeRendererToDisplaySize(this.renderer)) {
      const canvas = this.renderer.domElement;
      this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
      this.camera.updateProjectionMatrix();
    }
    if (this.renderEnabled) {
      this.renderer.render(this.scene, this.camera);
    }
  }
}
