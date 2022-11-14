declare interface ITableOptionProps {
  conf: ITableConf;
  columns: ITableColumn[];
}
declare interface ITableConf {
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
declare interface ITableColumn {
  id?: string;
  prop: string;
  label: string;
  width?: string;
  slot?: boolean;
  formslot?: boolean;
  rules?: any[];
}
declare interface IPageProps {
  size?: number;
  current?: number;
  total?: number;
}
