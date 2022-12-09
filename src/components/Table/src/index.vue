<template>
  <div class="dc-table">
    <div class="search-group"></div>
    <div class="flex items-center justify-between my-2">
      <div>
        <dc-button v-if="state.conf?.addBtn" type="primary" @click="handleAdd"
          >添加</dc-button
        >
        <dc-button
          v-if="state.conf?.batchDel"
          type="danger"
          @click="handleBatchDelete"
          >删除</dc-button
        >
        <slot name="batch" :selections="state.multipleSelection"></slot>
      </div>
      <div>
        <i
          class="cursor-pointer el-icon el-icon-refresh"
          @click="onRefeshTable"
        ></i>
      </div>
    </div>
    <ElTable
      :data="state.data"
      :stripe="state.conf?.stripe"
      :border="state.conf?.border"
      :height="state.conf?.height"
      row-key="id"
      :size="state.conf?.size"
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
        :width="item.width"
      >
        <template v-if="item.slot" #default="{ row }">
          <slot :name="item.prop" :row="row"></slot>
        </template>
      </ElTableColumn>
      <ElTableColumn
        :fixed="state.conf?.fixed"
        label="操作"
        :min-width="state.conf?.optWidth"
      >
        <template #default="{ row }">
          <dc-button
            v-if="state.conf?.viewBtn"
            type="primary"
            text
            size="xs"
            @click="handleView"
          >
            查看
          </dc-button>
          <dc-button
            v-if="state.conf?.editBtn"
            type="success"
            text
            size="xs"
            @click="handleEdit(row)"
          >
            编辑
          </dc-button>
          <dc-button
            v-if="state.conf?.delBtn"
            type="danger"
            text
            size="xs"
            @click="handleDelete(row)"
          >
            删除
          </dc-button>
          <slot name="opt" :row="row"></slot>
        </template>
      </ElTableColumn>
    </ElTable>
    <div v-if="state?.page?.total" class="py-5">
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
    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="30%">
      <dc-form
        ref="dialogFormRef"
        v-model="form"
        :schema="state.schema"
        :foot="false"
      >
        <!-- form插槽转移到table -->
        <template v-for="col of state.schema" :key="col.prop" #[col.prop]>
          <slot :name="`${col.prop}Form`"></slot>
        </template>
      </dc-form>
      <template #footer>
        <span class="dialog-footer">
          <dc-button @click="handleCancel">取消</dc-button>
          <dc-button type="primary" @click="handleSubmit(dialogFormRef)"
            >确认</dc-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref, computed, onMounted, watchEffect } from "vue";
import { ElTable, ElTableColumn, ElPagination } from "element-plus";
import tableProps from "./table";
import { IPageProps, ITableColumn, ITableConf } from "./types";
const dialogFormRef = ref(null);
const _props = defineProps(tableProps);
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

const dialogVisible = ref(false);

const state = reactive({
  data: [],
  multipleSelection: [],
  flag: "add",
  conf: {
    addBtn: true,
    viewBtn: true,
    delBtn: true,
    editBtn: true,
    border: true,
  } as ITableConf,
  schema: [] as ITableColumn[],
  api: (_params?: any) => {},
  page: {} as IPageProps,
});

const dialogTitle = computed(() => {
  const map: any = {
    add: "新增",
    view: "查看",
    edit: "编辑",
  };
  return map[state.flag];
});

function handleAdd() {
  emit("update:modelValue", {});
  dialogVisible.value = true;
  state.flag = "add";
}
async function handleSubmit(formRef: any) {
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

function handleCancel() {
  dialogVisible.value = false;
}

function handleView() {
  dialogVisible.value = true;
  state.flag = "view";
}
function handleEdit() {
  dialogVisible.value = true;
  state.flag = "edit";
}
function handleDelete(row: any) {
  emit("row-del", row);
}

function handleBatchDelete() {
  emit("batch-del", state.multipleSelection);
}
function handleSelectionChange(val: any) {
  state.multipleSelection = val;
}
function onRefeshTable() {
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

function setProps(props) {
  console.group("Set Props:");
  const { conf, api, schema, page } = props;
  state.conf = { ...state.conf, ...conf };
  state.api = api;
  state.schema = schema;
  state.page = { ...state.page, ...page };
  console.groupEnd();
}
async function onLoad(params = {}) {
  const res: any = await state.api(params);
  state.data = res?.data?.result;
  state.page.total = res?.data?.total;
}

watchEffect(() => {
  onLoad();
});

const tableAction = {
  setProps,
  onLoad,
};

onMounted(() => {
  emit("register", tableAction);
});
</script>
