import { PropType } from "vue";
import { DefaultRow, IPageProps, ITableOptionProps, TableProps } from "./types";

export default {
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
