<template>
  <div class="dc-table">
    <div class="search-group"></div>
    <div class="flex items-center justify-between my-2">
      <div>
        <dc-button v-if="option?.conf?.addBtn" type="primary" @click="handleAdd"
          >添加</dc-button
        >
        <dc-button
          v-if="option?.conf?.batchDel"
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
    <el-table
      :data="data"
      :stripe="option?.conf?.stripe"
      :border="option?.conf?.border"
      :height="option?.conf?.height"
      row-key="id"
      :size="option?.conf?.size"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column
        v-for="item of option.columns"
        :key="item.id"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
      >
        <template v-if="item.slot" #default="{ row }">
          <slot :name="item.prop" :row="row"></slot>
        </template>
      </el-table-column>
      <el-table-column
        :fixed="option?.conf?.fixed"
        label="操作"
        :min-width="option?.conf?.optWidth"
      >
        <template #default="slotProps">
          <dc-button
            v-if="option?.conf?.viewBtn"
            type="primary"
            plain
            size="xs"
            @click="handleView"
          >
            查看
          </dc-button>
          <dc-button
            v-if="option?.conf?.editBtn"
            type="primary"
            plain
            size="xs"
            @click="handleEdit"
          >
            编辑
          </dc-button>
          <dc-button
            v-if="option?.conf?.delBtn"
            type="danger"
            plain
            size="xs"
            @click="handleDelete(slotProps.row)"
          >
            删除
          </dc-button>
          <slot name="opt" :row="slotProps.row"></slot>
        </template>
      </el-table-column>
    </el-table>
    <div v-if="page?.total" class="py-5">
      <el-pagination
        :current-page="page.current"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="page.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="30%">
      <dc-form
        ref="dialogFormRef"
        v-model="form"
        :schema="option.columns"
        :foot="false"
      >
        <!-- form插槽转移到table -->
        <template v-for="col of option.columns" :key="col.prop" #[col.prop]>
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
import { reactive, ref, computed } from "vue";
import tableProps from "./table";
const dialogFormRef = ref(null);
const _props = defineProps(tableProps);
const emit = defineEmits([
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
  multipleSelection: [],
  flag: "add",
});

const dialogTitle = computed(() => {
  const map: any = {
    add: "新增",
    view: "查看",
    edit: "编辑",
  };
  return map[state.flag];
});
onLoad();

function onLoad() {
  emit("load");
}

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
// function handleAddChild() {
//   dialogVisible.value = true;
//   state.flag = "add";
// }
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
  console.log(val);
  emit("size-change", val);
}
function handleCurrentChange(val: any) {
  console.log(val);
  emit("current-change", val);
}
</script>
