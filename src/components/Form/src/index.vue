<template>
  <ElForm
    ref="formRef"
    :model="state.ruleForm"
    status-icon
    :label-width="state?.conf?.labelWidth"
    :size="modelSize"
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
    <ElFormItem v-if="!slotFoot && !state.conf.foot">
      <slot name="footer"></slot>
    </ElFormItem>
    <ElFormItem v-else>
      <ElButton type="primary" :size="modelSize" @click="submitForm(formRef)"
        >确认</ElButton
      >
      <ElButton @click="resetForm(formRef)">重置</ElButton>
    </ElFormItem>
  </ElForm>
</template>
<script setup lang="ts">
import { FormInstance, ElForm, ElFormItem, ElButton } from "element-plus";
import FormItem from "./components/FormItem.vue";
import { computed, onMounted, reactive, ref, unref, watch } from "vue";
import { useSlots } from "vue";
import { IFormProps } from "./hooks/useForm";
import { IFormItem } from "./types";
interface Props {
  modelValue?: object;
  schema?: IFormItem[];
  rules?: Element;
  modelSize?: "small" | "default" | "large";
  detailed?: boolean;
  foot?: boolean;
}
const _props = withDefaults(defineProps<Props>(), {
  foot: true,
});
const formRef = ref<FormInstance>();
const schema = ref<any[]>([]);
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
  await formEl.validate(async (valid) => {
    if (valid) {
      // https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#non-null-assertion-operator-postfix-
      // await state?.conf?.api!({ ...unref(ruleForm) })
      _emits("submit", { ...unref(state.ruleForm) });
    } else {
      console.warn("valid fail!", state.ruleForm);
    }
  });
};

const validate = (cb: any) => formRef.value && formRef.value.validate(cb);

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

function setProps(props) {
  state.conf = { ...props };
  console.log(state.conf);
}
function setDefautValues(values) {
  state.ruleForm = { ...values };
}
function setFormItem(key, val) {
  state.ruleForm[key] = val;
  state.ruleForm = { ...state.ruleForm };

  console.log(state.ruleForm);
}

function getSchema(data) {
  schema.value = data;
  console.log(schema.value);
}

function handleChange(item, props) {
  item.change && item.change(formActions, props);
}

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
