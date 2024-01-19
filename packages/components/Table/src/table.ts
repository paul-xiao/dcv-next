import { PropType } from "vue";
import {
  DefaultRow,
  IPageProps,
  ITableConf,
  ITableOptionProps,
  TableProps,
} from "./types";

const tableProps = {
  data: {
    type: Array as PropType<DefaultRow[]>,
    default: () => {
      return [];
    },
  },
  page: {
    type: Object as PropType<IPageProps>,
    default: () => {},
  },
  option: {
    type: Object as PropType<ITableOptionProps>,
    default: () => {},
  },
  modelValue: {
    type: Object as PropType<TableProps<any>>,
    default: () => {},
  },
};

const defaultTableConf: ITableConf = {
  border: true,
  stripe: true,
  optWidth: "150px",
  optFixed: false,
};
export { tableProps, defaultTableConf };
