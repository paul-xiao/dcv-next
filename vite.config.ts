const path = require("path");
const { defineConfig } = require("vite");
import Vue from "@vitejs/plugin-vue";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import PurgeIcons from "vite-plugin-purge-icons";
// const localEnabled: boolean = process.env.NODE_ENV === "development";

module.exports = defineConfig({
  plugins: [
    Vue(),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
      // 指定symbolId格式
      symbolId: "icon-[dir]-[name]",
    }),
    PurgeIcons({
      content: ["**/*.html", "**/*.ts", "**/*.js", "**/*.vue"],
    }),
  ],
  resolve: {
    alias: {
      "@": "/examples/",
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "dcv-next",
      formats: ["es"], // adding 'umd' requires globals set to every external module
      fileName: () => `index.js`,
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
  server: {
    port: 3002,
    hmr: true,
    fs: {
      allow: [".."],
    },
    proxy: {
      // 选项写法
      "/api": {
        target: "http://localhost:8082",
        logLevel: "debug",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
