import Form from "./src/index.vue";
import FormItem from "./src/components/FormItem.vue";
import BasicSelect from "./src/components/BasicSelect.vue";
import { useForm } from "./src/hooks/useForm";

export type FormInstance = InstanceType<typeof Form>;
export { Form, FormItem, BasicSelect, useForm };
export * from "./src/types/index.d";
export default Form;
