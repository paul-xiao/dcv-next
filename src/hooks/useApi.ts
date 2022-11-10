import { Ref, ref } from "vue";

function useApi<T>(url: RequestInfo, options?: RequestInit) {
  const response: Ref<undefined | T> = ref();
  const request = async () => {
    const res = await fetch(url, options);
    const data = await res.json();
    response.value = data;
  };
  return {
    response,
    request,
  };
}
// 两种抛出方式
export default useApi;
export { useApi };
