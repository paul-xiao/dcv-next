import { AxiosResponse } from "axios";
import { nextTick, ref, unref } from "vue";
import { IFormItem } from "../types";

export interface IFormProps {
  labelWidth?: number;
  api?: (params?: any) => Promise<AxiosResponse<any, any>>;
  foot?: boolean;
  schema: IFormItem[];
}

export function useForm(props: IFormProps) {
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
  const register = (instance) => {
    instance.setProps(rest);
    instance.getSchema(schema);
    formRef.value = instance;
    console.log(instance);
  };

  function onSubmit() {}
  async function setValues(values) {
    const form = await getForm();
    console.log(form);

    form.setDefautValues(values);
  }
  // methods
  const methods = {
    onSubmit,
    setValues,
  };

  return [register, methods];
}
