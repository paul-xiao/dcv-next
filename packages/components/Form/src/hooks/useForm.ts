import { nextTick, ref, unref } from "vue";
import { IFormItem } from "../types";

// 区分自定义配置和ElForm默认配置， Form默认配置直接由$attrs或者useForm的conf参数传人
// 支持的ElForm参数

type Data = Record<string, unknown>;

// useForm 钩子配置
export interface HookConfig {
  schema?: IFormItem[] | undefined; // 表单schema
  detailed?: boolean; // 是否为详情模式
  footer?: boolean; // 是否显示footer
  componentProps?: Data;
}
/**
 * @description 通用函数
 */
type GenericFunction = (args?: any) => void;

type FormHooks = {
  validateForm: GenericFunction;
  setValues: GenericFunction;
  getModel: GenericFunction;
};
export function useForm(props: HookConfig): [GenericFunction, FormHooks] {
  const { schema, ...rest } = props;
  const formRef = ref<any>();

  async function getForm() {
    const form = unref(formRef);
    if (!form) {
      console.error(
        "The form instance has not been obtained, please make sure that the form has been rendered when performing the form operation!"
      );
    }
    await nextTick();
    return form as any;
  }
  // 注册
  const register = (instance: any) => {
    instance.setProps(rest);
    instance.getSchema(schema);
    formRef.value = instance;
  };

  // 表单验证
  async function validateForm(cb: any) {
    const form = await getForm();
    return form.validate(cb);
  }
  // 获取表单数据
  async function getModel() {
    const form = await getForm();
    return form.model;
  }
  /**
   * @description: 设置默认值
   * @param {*} values
   * @return {*}
   */
  async function setValues(values: any) {
    const form = await getForm();
    form.setDefautValues(values);
  }
  // methods
  const methods = {
    validateForm,
    setValues,
    getModel,
  };

  return [register, methods];
}
