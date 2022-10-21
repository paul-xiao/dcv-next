interface IPath {
  name: RouteRecordName | null | undefined;
  path: string;
  meta?: Object;
  matched: any[];
}

interface Window {
  ActiveXObject?: Class;
}
