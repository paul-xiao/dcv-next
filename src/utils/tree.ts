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
