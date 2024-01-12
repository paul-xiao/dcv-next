<template>
  <dc-page>
    <el-button type="primary">primary</el-button>
    <el-button type="success">success</el-button>
    <el-button type="warning">warning</el-button>
    <el-button type="danger">danger</el-button>
    <el-button type="info">info</el-button>
    <el-button>default</el-button>
  </dc-page>
</template>
<script lang="ts" setup>
import { Page as DcPage } from "@dcv-next/components";
import { ElButton } from "element-plus";
</script>
