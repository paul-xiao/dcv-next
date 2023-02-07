interface animateArgs {
  renderer: any;
  scene: any;
  camera: any;
  controls: any;
  cb: Function;
}
export default (args: animateArgs) => {
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

  function animate() {
    if (resizeRendererToDisplaySize(args.renderer)) {
      const canvas = args.renderer.domElement;
      args.camera.aspect = canvas.clientWidth / canvas.clientHeight;
      args.camera.updateProjectionMatrix();
    }
    // required if controls.enableDamping or controls.autoRotate are set to true
    // args.controls.update()
    args.cb();
    args.renderer.render(args.scene, args.camera);

    // requestAnimationFrame(animate)
  }

  // requestAnimationFrame(animate)
  animate();
};
