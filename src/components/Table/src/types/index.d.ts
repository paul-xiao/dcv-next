interface ITable {
  conf: ITableConf;
  cloumn: ITableCol[];
}
interface ITableConf {
  striped: boolean;
}
interface ITableCol {
  label: string;
  prop: string;
  type: string;
  overHidden: boolean;
}
interface IPageProps {
  label: string;
  prop: string;
  type: string;
  overHidden: boolean;
}
