<template>
  <div class="p-5">
    <h1>Color</h1>
    <h2>Base</h2>
    <p>三原色</p>
    <div class="box blue"></div>
    <div class="box green"></div>
    <div class="box red"></div>
    <h2>色彩的属性</h2>
    <h3>色相</h3>
    <p>
      在 CSS 中，可以使用
      <a
        class="text-blue-500 underline"
        href="https://baike.baidu.com/item/HSL/1443144?fr=ge_ala"
        >HSL</a
      >
      (Hue, Saturation, Lightness) 颜色模式来表示色相、明度和饱和度。HSL
      是色调（Hue）、饱和度（Saturation）和亮度（Lightness）的缩写。
    </p>
    <p>
      色相：表示颜色的基本性质，通常用角度表示，范围从 0° 到 360°。例如，红色为
      0°，绿色为 120°，蓝色为 240°。
    </p>
    <p>
      饱和度：表示颜色的鲜艳程度，用百分比表示，范围从 0% 到
      100%。饱和度越高，颜色越鲜艳。
    </p>
    <p>
      亮度：表示颜色的明暗程度，也用百分比表示，范围从 0% 到
      100%。亮度越高，颜色越亮。
    </p>
    <div
      class="box"
      :style="{
        background: `hsl(${state.hsl.Hue}, ${state.hsl.Saturation}%, ${state.hsl.Lightness}%)`,
      }"
    ></div>
    <div>
      <div>
        <label for="">色相</label>
        <input type="range" :min="0" :max="240" v-model="state.hsl.Hue" />
        {{ state.hsl.Hue }}
      </div>
      <div class="">
        <label for="">饱和度</label>
        <input type="range" v-model="state.hsl.Saturation" />{{
          state.hsl.Saturation
        }}
      </div>
      <div class="">
        <label for="">亮度</label
        ><input type="range" v-model="state.hsl.Lightness" />{{
          state.hsl.Lightness
        }}
      </div>
    </div>
    <h2>色彩的混合</h2>
    <div>
      混合模式
      <select v-model="mixMode" class="mb-5 border outline-none">
        <option
          :value="item.value"
          :label="item.label"
          :key="item.value"
          v-for="item of mixOptions"
        ></option>
      </select>
    </div>
    <div class="relative">
      <div class="bg-red-500 box" :style="`mix-blend-mode: ${mixMode};`"></div>
      <div
        class="!-ml-10 box bg-yellow-500"
        :style="`mix-blend-mode: ${mixMode};`"
      ></div>
    </div>
    <div class="relative">
      <div class="bg-blue-500 box" :style="`mix-blend-mode: ${mixMode};`"></div>
      <div
        class="!-ml-10 box bg-red-500"
        :style="`mix-blend-mode: ${mixMode};`"
      ></div>
    </div>
    <div class="relative">
      <div
        class="bg-green-500 box"
        :style="`mix-blend-mode: ${mixMode};`"
      ></div>
      <div
        class="!-ml-10 box bg-yellow-500"
        :style="`mix-blend-mode: ${mixMode};`"
      ></div>
    </div>
    <div class="relative">
      <div class="bg-blue-500 box" :style="`mix-blend-mode: ${mixMode};`"></div>
      <div
        class="!-ml-10 box bg-yellow-500"
        :style="`mix-blend-mode: ${mixMode};`"
      ></div>
    </div>
    <div class="relative">
      <div
        class="bg-yellow-500 box"
        :style="`mix-blend-mode: ${mixMode};`"
      ></div>
      <div
        class="!-ml-10 box bg-green-500"
        :style="`mix-blend-mode: ${mixMode};`"
      ></div>
    </div>
    <div class="relative">
      <div class="bg-black box" :style="`mix-blend-mode: ${mixMode};`"></div>
      <div
        class="!-ml-10 box bg-white"
        :style="`mix-blend-mode: ${mixMode};`"
      ></div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from "vue";
const mixMode = ref("screen");
const state = reactive({
  hsl: {
    Hue: 240,
    Saturation: 100,
    Lightness: 50,
  },
});
const mixOptions = [
  {
    label: "normal 正常",
    value: "normal",
  },
  {
    label: "multiply 正片叠底",
    value: "multiply",
  },
  {
    label: "screen 滤色",
    value: "screen",
  },
  {
    label: "overlay 叠加",
    value: "overlay",
  },
  {
    label: "darken 变暗",
    value: "darken",
  },
  {
    label: "lighten 变亮",
    value: "lighten",
  },
  {
    label: "color-dodge 颜色减淡",
    value: "color-dodge",
  },
  {
    label: "color-burn 颜色加深",
    value: "color-burn",
  },
  {
    label: "hard-light 强光",
    value: "hard-light",
  },
  {
    label: "soft-light 柔光",
    value: "soft-light",
  },
  {
    label: "difference 差值",
    value: "difference",
  },
  {
    label: "exclusion 排除",
    value: "exclusion",
  },
  {
    label: "hue 色相",
    value: "hue",
  },
  {
    label: "saturation 饱和度",
    value: "saturation",
  },
  {
    label: "color 颜色",
    value: "color",
  },
  {
    label: "luminosity 亮度",
    value: "luminosity",
  },
];
</script>
<style lang="scss" scoped>
h1 {
  @apply text-2xl text-lg mb-5;
}
h2 {
  @apply text-xl text-lg mb-5;
}
h3 {
  @apply text-base text-lg mb-5;
}
p {
  font-size: 13px;
  color: #777;
}
label {
  width: 5em;
  display: inline-block;
}
.box {
  width: 50px;
  height: 50px;
  display: inline-block;
  margin: 5px;
}
.blue {
  background-color: blue;
}
.green {
  background-color: green;
}
.red {
  background-color: red;
}
</style>
