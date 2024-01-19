export type DefaultRow = any;
export interface ITableOptionProps {
  conf: ITableConf;
  columns: ITableColumn[];
}

/**
 * @description 表格默认配置
 */
export interface ITableConf {
  stripe?: boolean;
  border?: boolean;
  height?: string | number | undefined;
  size?: "" | "default" | "small" | "large";
  optWidth?: string; // 操作栏宽度
  optFixed?: boolean; // 操作栏是否固定
}
export interface ITableColumn {
  id?: string;
  prop: string;
  label: string;
  componentProps?: TableColumnCtx;
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
export interface TableActionType {
  reload: (opt?: any) => Function<void>;
}

export type RegisterFn = (tableInstance: any) => void;

export type UseTableReturnType = [RegisterFn, TableActionType];
