<template>
  <h1>{{ $route.name }}</h1>
  <h1>SvgIcon</h1>
  <p class="font-light">缺点：不可作为组件打包</p>
  <div class="flex">
    <svg-icon iconClass="404" className="m-2" />
    <svg-icon iconClass="bug" className="m-2" />
    <svg-icon iconClass="chart" className="m-2" />
    <svg-icon iconClass="clipboard" className="m-2" />
    <svg-icon iconClass="dashboard" className="m-2" />
  </div>
</template>
