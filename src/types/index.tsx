export interface IOptionRowDisplay {
  label: string;
  value: number;
}
export interface IColumnsTableProps {
  title: string;
  dataIndex: string;
  key: string;
  render?: (text: any, data: any, index: number) => React.ReactNode;
  width?: number | string;
}
