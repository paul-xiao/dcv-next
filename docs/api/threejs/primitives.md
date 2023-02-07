# 基础图元

## 点（Points）

```js
var geometry = new THREE.BoxGeometry(100, 100, 100); //创建一个立方体几何对象Geometry
// 点渲染模式
var material = new THREE.PointsMaterial({
  color: 0xff0000,
  size: 5.0, //点对象像素尺寸
}); //材质对象
var points = new THREE.Points(geometry, material); //点模型对象
```

## 形状（Shape）

使用路径以及可选的孔洞来定义一个二维形状平面。 它可以和 ExtrudeGeometry、ShapeGeometry 一起使用，获取点，或者获取三角面。

代码示例

```js
const heartShape = new THREE.Shape();

heartShape.moveTo(25, 25);
heartShape.bezierCurveTo(25, 25, 20, 0, 0, 0);
heartShape.bezierCurveTo(-30, 0, -30, 35, -30, 35);
heartShape.bezierCurveTo(-30, 55, -10, 77, 25, 95);
heartShape.bezierCurveTo(60, 77, 80, 55, 80, 35);
heartShape.bezierCurveTo(80, 35, 80, 0, 50, 0);
heartShape.bezierCurveTo(35, 0, 25, 25, 25, 25);

const extrudeSettings = {
  depth: 8,
  bevelEnabled: true,
  bevelSegments: 2,
  steps: 2,
  bevelSize: 1,
  bevelThickness: 1,
};

const geometry = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);

const mesh = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial());
```

例子

- [geometry / shapes](https://threejs.org/examples/#webgl_geometry_shapes)
- [geometry / extrude / shapes](https://threejs.org/examples/#webgl_geometry_extrude_shapes)
- [geometry / extrude / shapes2](https://threejs.org/examples/#webgl_geometry_extrude_shapes2)
