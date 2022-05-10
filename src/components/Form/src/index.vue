<template>
  <el-form
    ref="ruleFormRef"
    :model="model"
    status-icon
    label-width="120px"
    :size="modelSize"
  >
    <template v-for="item of schema">
      <template v-if="item.slot || item.formslot">
        <el-row
          v-if="!item.hide"
          :key="item.prop"
          type="flex"
          class="el-form-item el-form-item--mini"
          :class="{ 'is-required': !detailed && isRequired(item) }"
        >
          <label
            :style="{ width: item.labelWidth || '120px' }"
            class="el-form-item__label"
            >{{ item.label }}</label
          >
          <slot :name="item.prop" :row="model" :column="item"></slot>
        </el-row>
      </template>
      <template v-else>
        <el-form-item
          v-if="!item.hide"
          :key="item.prop"
          :label="item.label"
          :label-width="item.labelWidth"
          :prop="item.prop"
          :rules="detailed ? [] : item.rules"
          :class="{ inline: item.span < 24 }"
          :style="`width:${(item.span / 24) * 100}%`"
        >
          <template v-if="detailed">
            {{ model[item.prop] }}
          </template>
          <el-switch
            v-else-if="item.type === 'switch'"
            v-model="model[item.prop]"
            :active-text="item.activeText"
            :inactive-text="item.inactiveText"
            :active-value="item.activeValue || true"
            :inactive-value="item.inactiveValue || false"
          />
          <template v-else-if="item.type === 'select'">
            <el-select
              v-model="model[item.prop]"
              placeholder="请选择"
              style="width: 100%"
              @change="(val) => item.change && item.change(val, item)"
            >
              <el-option
                v-for="{ label, value } in item.dicData"
                :key="value"
                :label="label"
                :value="value"
              />
            </el-select>
          </template>
          <el-input-number
            v-else-if="item.type === 'number'"
            v-model="model[item.prop]"
            :max="item.max"
            :min="item.min"
            :type="item.type"
            autocomplete="off"
            @change="(val) => item.change && item.change(val)"
          />
          <el-input
            v-else
            v-model="model[item.prop]"
            :type="item.type"
            :placeholder="item.placeholder"
            autocomplete="off"
          />
        </el-form-item>
      </template>
    </template>
    <el-form-item>
      <slot name="footer"></slot>
      <template v-if="!slotFoot && foot">
        <dc-button type="primary" @click="submitForm(ruleFormRef)"
          >保存</dc-button
        >
        <dc-button @click="resetForm(ruleFormRef)">取消</dc-button>
      </template>
    </el-form-item>
  </el-form>
</template>
<script setup lang="ts">
import { FormInstance } from "element-plus";
import { computed, ref } from "vue";
import { useSlots } from "vue";

interface Props {
  modelValue: object;
  schema: any[];
  rules?: Element;
  modelSize?: "" | "small" | "default" | "large";
  detailed?: boolean;
  foot?: boolean;
}
const _props = withDefaults(defineProps<Props>(), {
  foot: true,
  modelSize: "small",
});
const _emits = defineEmits(["update:modelValue"]);

const model: any = computed({
  get() {
    return _props.modelValue;
  },
  set(value) {
    _emits("update:modelValue", value);
  },
});
const isRequired = computed(() => {
  return function (row: any) {
    return row.rules && row.rules.some((r: any) => r.required);
  };
});
const slotFoot = !!useSlots().footer;
const ruleFormRef = ref<FormInstance>();

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log("submit!", model.value);
    } else {
      console.log("error submit!", fields);
    }
  });
};

const validate = (cb: any) =>
  ruleFormRef.value && ruleFormRef.value.validate(cb);

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

defineExpose({
  validate,
});
</script>
