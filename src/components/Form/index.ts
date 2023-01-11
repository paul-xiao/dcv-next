import Form from "./src/index.vue";
import FormItem from "./src/components/FormItem.vue";
import Select from "./src/components/Select.vue";
import Upload from "./src/components/Upload.vue";
import { useForm } from "./src/hooks/useForm";
export type FormInstance = InstanceType<typeof Form>;
export { Form, FormItem, Select, Upload, useForm };
export * from "./src/types/index.d";
export default Form;
