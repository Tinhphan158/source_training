export interface IDepartmentType {
  active?: boolean;
  blockForTimesheet?: string;
  code?: string;
  createdBy?: string;
  dateCreated?: string;
  id?: number;
  lastUpdated?: string;
  modifiedBy?: string;
  name?: string;
  note?: string;
  phoneNumber?: string;
  tenantId?: number;
}

export interface IDataTableDepartmentType {
  stt: number | null | undefined;
  id: number | null | undefined;
  code: string | null | undefined;
  name: string | null | undefined;
  totalStaff: string | null | undefined;
  active: boolean | null | undefined;
  note: string | null | undefined;
}

export interface IQueryParamsDepartmentType {
  page: number;
  size: number;
  codeOrName: string;
}

export interface IDataSubmitDepartmentType {
  phoneNumber?: string;
  blockForTimesheet?: string;
  code?: string;
  name?: string;
  note?: string;
  active?: boolean;
}
