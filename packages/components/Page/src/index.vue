<template>
  <div class="dc-page">
    <div class="dc-page-breadcrumb">
      <dc-breadcrumb :paths="breadcrumb" />
    </div>
    <div class="dc-page-search">
      <slot name="search"></slot>
    </div>
    <div class="dc-page-batch">
      <slot name="batch"></slot>
    </div>
    <slot></slot>
    <div class="dc-page-foot">
      <slot name="pagination"></slot>
    </div>
  </div>
</template>
<script lang="ts">
import { ref, defineComponent } from "vue";
import { useRoute } from "vue-router";
import { Breadcrumb as DcBreadcrumb } from "../../Breadcrumb";
export default defineComponent({
  name: "DcPage",
  components: { DcBreadcrumb },
  setup() {
    const route = useRoute();
    const breadcrumb = ref([]);
    breadcrumb.value = route.matched;
    return {
      breadcrumb,
    };
  },
});
</script>
<style lang="scss" scoped>
.dc-page {
  padding: 15px;
  &-breadcrumb {
    margin-bottom: 15px;
  }
  &-batch {
    margin-bottom: 15px;
  }
  &-search {
    padding: 15px 0;
  }
}
</style>
