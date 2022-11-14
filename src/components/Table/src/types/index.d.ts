export type DefaultRow = any;
export interface ITableOptionProps {
  conf: ITableConf;
  columns: ITableColumn[];
}
export interface ITableConf {
  name: string;
  addBtn?: boolean;
  editBtn?: boolean;
  viewBtn?: boolean;
  delBtn?: boolean;
  batchDel?: boolean;
  stripe?: boolean;
  border?: boolean;
  height?: string | number | undefined;
  fixed?: boolean;
  size?: "small";
  optWidth?: string;
}
export interface ITableColumn {
  id?: string;
  prop: string;
  label: string;
  width?: string;
  slot?: boolean;
  formslot?: boolean;
  rules?: any[];
}
export interface IPageProps {
  size?: number;
  current?: number;
  total?: number;
}

export interface TableProps<T> {
  data: T[];
  option: any;
  page: IPageProps;
  modelValue: String | Object;
}
