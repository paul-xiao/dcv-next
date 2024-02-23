<template>
  <div class="dc-table">
    <ElTable
      :data="state.data"
      v-bind="elTableConf"
      row-key="id"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <ElTableColumn type="selection" width="55" />
      <ElTableColumn
        v-for="item of state.schema"
        :key="item.id"
        :prop="item.prop"
        :label="item.label"
        v-bind="item.componentProps"
      >
        <template v-if="isSlot(item)" #default="{ row }">
          <slot :name="item.prop" :row="row"></slot>
        </template>
      </ElTableColumn>
      <ElTableColumn
        :fixed="state.conf?.fixed"
        v-if="Object.keys($slots).length"
        label="操作"
        :width="state.conf?.optWidth"
      >
        <template #default="{ row }">
          <slot name="opt" :row="row"></slot>
        </template>
      </ElTableColumn>
    </ElTable>
    <div v-if="state?.page?.total" class="dc-table-pagination">
      <ElPagination
        :current-page="state?.page?.current"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="state?.page?.size"
        layout="total, sizes, prev, pager, next"
        :total="state?.page?.total"
        small
        prev-text="上一页"
        next-text="下一页"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref, computed, onMounted, useSlots } from "vue";
import { tableProps, defaultTableConf } from "./table";
import { IPageProps, ITableColumn } from "./types";

const slots = useSlots();

const _props = defineProps(tableProps);

const dialogVisible = ref(false);

//
const state = reactive({
  data: [],
  multipleSelection: [],
  flag: "add",
  conf: {} as any,
  schema: [] as ITableColumn[],
  api: (_params?: any) => {},
  page: {} as IPageProps,
});

const emit = defineEmits([
  "register",
  "update:modelValue",
  "load",
  "row-add",
  "row-update",
  "row-del",
  "batch-del",
  "size-change",
  "current-change",
]);

const form = computed({
  get() {
    return _props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

const _dialogTitle = computed(() => {
  const map: any = {
    add: "新增",
    view: "查看",
    edit: "编辑",
  };
  return map[state.flag];
});
const elTableConf = computed(() => {
  const { optWidth: _optWidth, ...rest } = state.conf;
  return rest;
});

function isSlot(item: { prop: PropertyKey }) {
  return slots.hasOwnProperty(item.prop);
}

function _handleAdd() {
  emit("update:modelValue", {});
  dialogVisible.value = true;
  state.flag = "add";
}
async function _handleSubmit(formRef: any) {
  if (!formRef) return;

  await formRef.validate((valid: any, fields: any) => {
    console.log(valid);

    if (valid) {
      console.log("submit!", form.value);
      dialogVisible.value = false;
    } else {
      console.log("error submit!", fields);
    }
  });
}

function _handleCancel() {
  dialogVisible.value = false;
}

function _handleView() {
  dialogVisible.value = true;
  state.flag = "view";
}
function _handleEdit() {
  dialogVisible.value = true;
  state.flag = "edit";
}
function _handleDelete(row: any) {
  emit("row-del", row);
}

function _handleBatchDelete() {
  emit("batch-del", state.multipleSelection);
}
function handleSelectionChange(val: any) {
  state.multipleSelection = val;
}
function _onRefeshTable() {
  onLoad();
}
function handleSizeChange(val: any) {
  state.page.size = val;
  const { current, size } = state.page;
  onLoad({ current, size });
}
function handleCurrentChange(val: any) {
  state.page.current = val;
  const { current, size } = state.page;
  onLoad({ current, size });
}

function setProps(props: any) {
  console.group("Set Props:");
  const { conf, api, schema, page } = props;
  state.conf = { ...defaultTableConf, ...state.conf, ...conf };
  state.api = api;
  state.schema = schema;
  state.page = { ...state.page, ...page };
  console.groupEnd();
}
/**
 * @description 加载表格数据
 * @param query object 查询条件
 */
async function onLoad(query = {}) {
  try {
    const { current, size } = state.page;
    const params = current && size ? { ...query, current, size } : query;
    const res: any = await state.api(params);
    // 分页
    if (res?.result?.total) {
      state.data = res?.result?.data;
      state.page.total = res?.result?.total;
    } else {
      // 不分页
      state.data = res?.result;
    }
  } catch (error) {
    console.warn("表格数据加载错误！", error);
  }
}

// table hooks
const tableHooks = {
  setProps,
  onLoad,
};

onMounted(() => {
  emit("register", tableHooks);
  onLoad();
});
</script>
<style lang="scss" scoped>
.dc-table {
  &-pagination {
    margin-top: 15px;
  }
}
:deep(.el-table--border th.el-table__cell) {
  background-color: #f2f2f2;
  font-size: 14px;
  color: #999;
  font-family: system-ui;
  border-color: #e2e2e2;
}
</style>
