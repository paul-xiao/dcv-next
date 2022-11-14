import { appSetting } from "@/enums/setting";

export function setStore(key: string, store: object) {
  sessionStorage.setItem(`${appSetting.PREFIX}_${key}`, JSON.stringify(store));
}
export function getStore(key: string) {
  const store: string | null = sessionStorage.getItem(
    `${appSetting.PREFIX}_${key}`
  );
  return store ? JSON.parse(store) : null;
}
