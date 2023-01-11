import Form from "./src/index.vue";
import FormItem from "./src/components/FormItem.vue";
export * from "./src/components";
import { useForm } from "./src/hooks/useForm";

export type FormInstance = InstanceType<typeof Form>;
export { Form, FormItem, useForm };
export * from "./src/types/index.d";
export default Form;
