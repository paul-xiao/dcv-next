export function listToTree(
  data: Array<any>,
  pid: string | number = 1,
  isChildNull = false
): Array<any> {
  const d: Array<any> = [];
  const compare = (a: any, b: any) => {
    if (a.pid === b.pid) {
      return a.order - b.order;
    } else {
      return a.pid - b.pid;
    }
  };
  data.sort(compare).forEach((val) => {
    if (val.pid == pid) {
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
