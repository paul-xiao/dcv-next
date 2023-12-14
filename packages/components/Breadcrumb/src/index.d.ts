export interface IPathMeta {
  breadcrumbHidden?: boolean;
  title?: string;
}
export interface IPathProps {
  name: string;
  path: string;
  meta?: IPathMeta;
}
