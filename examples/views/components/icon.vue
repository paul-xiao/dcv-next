<template>
  <h1>{{ $route.name }}</h1>
  <h1>SvgIcon</h1>
  <p class="font-light">缺点：不可作为组件打包</p>
  <div class="flex">
    <dc-svg-icon iconClass="404" className="m-2" />
    <dc-svg-icon iconClass="bug" className="m-2" />
    <dc-svg-icon iconClass="chart" className="m-2" />
    <dc-svg-icon iconClass="clipboard" className="m-2" />
    <dc-svg-icon iconClass="dashboard" className="m-2" />
  </div>
  <h1>Iconify Icon</h1>

  <div class="flex">
    <dc-icon icon="mdi-light:home" size="20" />
  </div>
</template>
<script lang="ts" setup></script>
