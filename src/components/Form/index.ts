import Form from "./src/index.vue";
import BasicSelect from "./src/components/BasicSelect.vue";
import { useForm } from "./src/hooks/useForm";

export type FormInstance = InstanceType<typeof Form>;
export { Form, BasicSelect, useForm };
export default Form;
