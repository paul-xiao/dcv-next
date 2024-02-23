<template>
  <ElForm
    ref="formRef"
    :model="state.ruleForm"
    status-icon
    v-bind="{ ...$attrs, ...state.conf.componentProps }"
  >
    <template v-for="item of schema" :key="item.prop">
      <FormItem
        v-model="state.ruleForm[item.prop]"
        @change="(val) => handleChange(item, val)"
        v-bind="item"
      >
        <template v-if="$slots[item.prop]" #[item.prop]>
          <slot :name="item.prop" :row="item" :model="state.ruleForm"></slot>
        </template>
      </FormItem>
    </template>
    <ElFormItem v-if="slotFoot">
      <slot name="footer"></slot>
    </ElFormItem>
    <ElFormItem v-else-if="state.conf.footer || $props.footer">
      <ElButton type="primary" @click="submitForm(formRef)">确认</ElButton>
      <ElButton @click="resetForm(formRef)">重置</ElButton>
    </ElFormItem>
  </ElForm>
</template>
<script lang="ts" setup>
import {
  computed,
  onMounted,
  reactive,
  ref,
  unref,
  watch,
  useSlots,
} from "vue";
import { FormInstance, ElForm } from "element-plus";
import FormItem from "./components/FormItem.vue";
import { IFormItem } from "./types";
import { HookConfig } from "./hooks/useForm";
// 组件Props配置
interface IFormProps extends HookConfig {
  modelValue?: object;
}
// defineProps
const _props = withDefaults(defineProps<IFormProps>(), {
  footer: true,
});

const formRef = ref<FormInstance>();
const schema = ref<IFormItem[]>([]);
const state = reactive({
  conf: {} as HookConfig,
  ruleForm: {} as any,
});
const _emits = defineEmits(["update:modelValue", "register", "submit"]);
watch(
  () => _props.modelValue,
  (val) => {
    console.log(val);
  }
);
const _isRequired = computed(() => {
  return function (row: any) {
    return row.rules && row.rules.some((r: any) => r.required);
  };
});
const slotFoot = !!useSlots().footer;

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid: boolean) => {
    if (valid) {
      _emits("submit", { ...unref(state.ruleForm) });
    } else {
      console.warn("form validate failed!");
    }
  });
};

function validate(cb: any) {
  return formRef.value && formRef.value.validate(cb);
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

function setProps(props: any) {
  state.conf = { ...props };
  console.log(state.conf);
}
function setDefautValues(values: any) {
  state.ruleForm = { ...values };
}
function setFormItem(key: string, val: any) {
  state.ruleForm[key] = val;
  state.ruleForm = { ...state.ruleForm };

  console.log(state.ruleForm);
}
// set schema
function getSchema(data: IFormItem[]) {
  schema.value = data;
}

function handleChange(item: any, props: any) {
  item.change && item.change(formActions, props);
}

// init props
_props.schema && getSchema(_props.schema);
_props.modelValue && setDefautValues(_props.modelValue);
// useForm  register hooks
const formActions = {
  setProps,
  getSchema,
  setDefautValues,
  setFormItem,
  validate,
  model: state.ruleForm,
};

onMounted(() => {
  _emits("register", formActions);
});
defineExpose({
  validate,
});
</script>
