import { AxiosResponse } from "axios";
import { ref, unref } from "vue";
import {
  ITableColumn,
  ITableConf,
  IPageProps,
  UseTableReturnType,
  TableActionType,
} from "../types";
export interface ITableProps {
  conf: ITableConf;
  api?: (params?: any) => Promise<AxiosResponse<any, any>>;
  schema: ITableColumn[];
  page: IPageProps;
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
