import { AxiosResponse } from "axios";
import { ITableColumn, ITableConf, IPageProps } from "../types";
export interface IFormProps {
  conf: ITableConf;
  api?: (params?: any) => Promise<AxiosResponse<any, any>>;
  schema: ITableColumn[];
  page: IPageProps;
}

export function useTable(props: IFormProps) {
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
