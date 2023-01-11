export interface IFormItem {
  label?: string;
  labelWidth?: string;
  prop: string;
  type?: string;
  span?: number;
  slot?: boolean;
  rules?: any[];
  componentProps?: any;
  change?: Function;
}

export interface ISelectOption {
  label?: String;
  value?: String;
}
