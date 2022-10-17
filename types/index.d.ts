interface IPath {
  name: RouteRecordName | null | undefined;
  path: string;
  matched: any[];
}

interface Window {
  ActiveXObject?: Class;
}
