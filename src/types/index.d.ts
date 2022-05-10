declare interface ITableOptionProps {
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
  columns: ITableColumn[];
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
