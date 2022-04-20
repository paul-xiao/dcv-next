export function listToTree(
  data: Array<any>,
  pid: string | number = 1,
  isChildNull = false
): Array<any> {
  const d: Array<any> = [];
  const compare = (a: any, b: any) => {
    if (a.parentId === b.parentId) {
      return a.order - b.order;
    } else {
      return a.parentId - b.parentId;
    }
  };
  data.sort(compare).forEach((val) => {
    if (val.parentId == pid) {
      const list = listToTree(data, val.id, isChildNull);
      const obj: any = { ...val };
      if (!isChildNull || list.length !== 0) {
        obj.children = list;
      }
      d.push(obj);
    }
  });
  return d;
}

export function sortBy(menu: any[], attr: string) {
  const res = menu.sort((a, b) => a[attr] - b[attr]);
  for (const item of res) {
    if (item.children && item.children.length) {
      sortBy(item.children, attr);
    }
  }
  return res;
}

export function traverseSort(menu: any[], attr: string) {
  menu = menu.sort((a, b) => a[attr] - b[attr]);
}
export function setStore(key: string, store: object) {
  sessionStorage.setItem(key, JSON.stringify(store));
}
export function getStore(key: string) {
  const store: string | null = sessionStorage.getItem(key);
  return store ? JSON.parse(store) : null;
}
