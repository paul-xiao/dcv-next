import { getTagList } from "@/api/tag";
import { IFormItem } from "@dcv_next/components/Form/src/types";

export const schema: IFormItem[] = [
  {
    label: "标题",
    prop: "title",
    span: 12,
    rules: [
      {
        required: true,
        message: "请输入标题",
        trigger: "blur",
      },
    ],
  },
  {
    label: "分类",
    prop: "tags",
    type: "select",
    componentProps: {
      multiple: true,
      clearable: true,
      filterable: true,
      allowCreate: true,
      api: getTagList,
      props: {
        label: "name",
        value: "id",
      },
    },
    span: 12,
    rules: [
      {
        required: true,
        message: "请选择分类",
        trigger: "blur",
      },
    ],
  },
  {
    label: "内容",
    prop: "content",
    span: 12,
    slot: true,
    rules: [
      {
        required: true,
        message: "请输入内容",
        trigger: "blur",
      },
    ],
  },
];
