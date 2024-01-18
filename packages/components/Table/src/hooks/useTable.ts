import { ref, unref } from "vue";
import {
  ITableColumn,
  ITableConf,
  IPageProps,
  UseTableReturnType,
  TableActionType,
} from "../types";
export interface PageResult<T> {
  data: T;
  total: number;
}
export interface HttpResponse<T> {
  code: number;
  message: string;
  result: T;
}
export interface ITableProps {
  conf?: ITableConf;
  api: (params?: any) => Promise<HttpResponse<PageResult<any> | any>>;
  schema: ITableColumn[];
  page?: IPageProps;
}

export function useTable(props: ITableProps): UseTableReturnType {
  const tableRef = ref<any>(null);

  // 注册
  const register = (instance: any) => {
    instance.setProps(props);
    tableRef.value = instance;
  };

  function reload() {
    unref(tableRef)?.onLoad();
  }
  // methods
  const methods: TableActionType = {
    reload,
  };

  return [register, methods];
}
