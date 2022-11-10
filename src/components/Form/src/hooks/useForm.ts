import { AxiosResponse } from "axios";
import { IFormItem } from "../types";

export interface IFormProps {
  labelWidth?: number;
  api?: (params?: any) => Promise<AxiosResponse<any, any>>;
  foot?: boolean;
  schema: IFormItem[];
}

export function useForm(props: IFormProps) {
  const { schema, ...rest } = props;
  // 注册
  const register = (instance) => {
    console.log("registered", instance);
    instance.setProps(rest);
    instance.getSchema(schema);
  };

  function onSubmit() {}
  // methods
  const methods = {
    onSubmit,
  };

  return [register, methods];
}
