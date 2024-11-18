export interface IDataEmployeeInfoType {
  staffMetaDataCode?: string;
  gender?: string;
  phoneNumber?: string;
  email?: string;
  position?: string;
  departmentName?: string;
  staffMetaDataLevel?: string;
  hireDate?: string;
  hircontractTypeeDate?: string;
  fromDate?: string;
  toDate?: string;
  avatarPath?: string;
  fullName?: string;
  birthDate?: string;
  contractType?: string;
}

export interface IResponseDataEmployeeInfoAPIType {
  code?: number;
  data?: IDataEmployeeInfoType;
  message?: string;
}
