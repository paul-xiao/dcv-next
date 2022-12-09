export interface IFormItem {
  label?: string;
  labelWidth?: string;
  prop: string;
  type?: string;
  span?: number;
  slot?: boolean;
  rules?: any[];
  componentProps?: any;
}

export interface ISelectOption {
  label?: String;
  value?: String;
}
