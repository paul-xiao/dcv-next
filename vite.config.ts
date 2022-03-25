const path = require("path");
const { defineConfig } = require("vite");
import vue from "@vitejs/plugin-vue";
import { viteMockServe } from "vite-plugin-mock";
const localEnabled: boolean = process.env.NODE_ENV === "development";

module.exports = defineConfig({
  plugins: [
    vue(),
    viteMockServe({
      // ↓解析根目录下的mock文件夹
      mockPath: "/examples/mock",
      localEnabled: localEnabled, // 开发打包开关
      // prodEnabled: !localEnabled, // 生产打包开关
      supportTs: true, // 打开后，可以读取 ts 文件模块。 请注意，打开后将无法监视.js 文件。
      watchFiles: true, // 监视文件更改
    }),
  ], // to process SFC
  resolve: {
    alias: {
      "@": "/examples/", // '@/': new URL('./src/', import.meta.url).pathname
      "@assets": "/examples/assets",
      "@components": "/src/",
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "dcv",
      formats: ["es"], // adding 'umd' requires globals set to every external module
      fileName: () => `dcv.js`,
    },
    rollupOptions: {
      // external modules won't be bundled into your library
      external: ["vue", /primevue\/.+/], // not every external has a global
      output: {
        // disable warning on src/index.ts using both default and named export
        exports: "named",
        // Provide global variables to use in the UMD build
        // for externalized deps (not useful if 'umd' is not in lib.formats)
        globals: {
          vue: "Vue",
        },
      },
    },
    emptyOutDir: false, // to retain the types folder generated by tsc
  },
});
