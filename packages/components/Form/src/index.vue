<template>
  <ElForm
    ref="formRef"
    :model="state.ruleForm"
    status-icon
    :size="modelSize"
    v-bind="$attrs"
  >
    <template v-for="item of schema" :key="item.prop">
      <FormItem
        v-model="state.ruleForm[item.prop]"
        @change="(val) => handleChange(item, val)"
        v-bind="item"
      >
        <template v-if="item.slot" #[item.prop]>
          <slot :name="item.prop" :row="item" :model="state.ruleForm"></slot>
        </template>
      </FormItem>
    </template>
    <ElFormItem v-if="slotFoot">
      <slot name="footer"></slot>
    </ElFormItem>
    <ElFormItem v-else-if="$attrs.footer || state.conf.foot">
      <ElButton type="primary" :size="modelSize" @click="submitForm(formRef)"
        >确认</ElButton
      >
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
import { FormInstance } from "element-plus";
import FormItem from "./components/FormItem.vue";
import { IFormProps } from "./hooks/useForm";
import { IFormItem } from "./types";

interface FormProps {
  modelValue?: object;
  schema?: IFormItem[] | undefined;
  rules?: Element;
  modelSize?: "small" | "default" | "large";
  detailed?: boolean;
  foot?: boolean;
}
const _props = withDefaults(defineProps<FormProps>(), {
  foot: true,
});
const formRef = ref<FormInstance>();
const schema = ref<IFormItem[]>([]);
const state = reactive({
  conf: {} as IFormProps,
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

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  console.log(formEl);

  await formEl.validate(async (valid) => {
    console.log(valid);

    if (valid) {
      // https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#non-null-assertion-operator-postfix-
      // await state?.conf?.api!({ ...unref(ruleForm) })
      _emits("submit", { ...unref(state.ruleForm) });
    } else {
      console.warn("valid fail!", state.ruleForm);
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
  console.log(schema.value);
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
};

onMounted(() => {
  _emits("register", formActions);
});
defineExpose({
  validate,
});
</script>
