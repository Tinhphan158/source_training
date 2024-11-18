import { type IDepartmentType } from '../department/type';

export interface IStaffMetaDataFilesType {
  contentType?: string;
  createdBy?: string;
  createdSourceType?: string;
  dateCreated?: string;
  filePath?: string;
  id?: number;
  lastUpdated?: string;
  modifiedBy?: string;
  tenantId?: number;
}
export interface IDataEmployeeType {
  avatarPath?: string;
  birthDate?: string;
  code?: string;
  createdBy?: string;
  dateCreated?: string;
  department?: IDepartmentType;
  email?: string;
  fullName?: string;
  gender?: string;
  hireDate?: string;
  id?: number;
  identityCard?: string;
  isResigned?: boolean;
  issueDateIdentityCard?: string;
  issuePlaceIdentityCard?: string;
  lastUpdated?: string;
  modifiedBy?: string;
  note?: string;
  permanentAddress?: string;
  phoneNumber?: string;
  position?: string;
  resignDate?: string;
  socialInsuranceCode?: string;
  staffMetaDataFiles?: IStaffMetaDataFilesType[];
  staffMetaDataLevel?: string | number;
  status?: string;
  taxCode?: string;
  temporaryAddress?: string;
  tenantId?: number;
  timekeepingCode?: string;
}
export interface IDataResponseAPIType {
  code?: number;
  data?: IDataEmployeeType[];
  message?: string;
  totalElements?: number;
  totalPages?: number;
}
export interface IDetailEmployeeResponseAPIType {
  code?: number;
  data?: IDataEmployeeType;
  message?: string;
}
export interface IDataTableType {
  id: number | null | undefined;
  code: string | null | undefined;
  timekeepingCode: string | null | undefined;
  fullName: string | null | undefined;
  gender: string | null | undefined;
  position: string | null | undefined;
  departmentName: string | null | undefined;
  staffMetaDataLevel: string | number | null | undefined;
  socialInsuranceCode: string | null | undefined;
  taxCode: string | null | undefined;
  phoneNumber: string | null | undefined;
  status: string | null | undefined;
}
export interface ICheckboxType {
  stt: boolean;
  code: boolean;
  timekeepingCode: boolean;
  fullName: boolean;
  gender: boolean;
  position: boolean;
  departmentName: boolean;
  level: boolean;
  socialInsuranceCode: boolean;
  taxCode: boolean;
  phoneNumber: boolean;
  status: boolean;
}

export interface IQueryParamsExportFileType {
  position: string;
  socialInsuranceCode: string;
  taxCode: string;
  departmentCode: string;
  status: string;
  codeOrFullName: string;
}

export interface IQueryParamsType {
  page: number;
  size: number;
  position: string;
  socialInsuranceCode: string;
  taxCode: string;
  departmentCode: string;
  status: string;
  codeOrFullName: string;
}
