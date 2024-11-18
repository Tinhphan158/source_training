import { type UploadFile } from 'antd';

export interface IModalEmployeeProps {
  setIsOpenModal: (value: boolean) => void;
  handleSubmitAdd?: (data: any) => void;
  handleSubmitUpdate?: (data: any) => void;
  setIsLoading?: (value: boolean) => void;
  fileList?: UploadFile[];
  setFileList?: (files: UploadFile[]) => void;
  fileListUpdate?: UploadFile[];
  setFileListUpdate?: (files: UploadFile[]) => void;
  handleGetAllEmployee?: () => Promise<void>;
  isAddNotUpdate?: boolean;
  isReset?: boolean;
  setIsReset?: (value: boolean) => void;
  setIsAddNotUpdate?: (value: boolean) => void;
  setEmployeeIdSelected: (value: number) => void;
  employeeIdSelected?: number;
  setFilesDeleted?: (value: any) => void;
  isOpenModalLock?: boolean;
  setIsOpenModalLock?: (value: boolean) => void;
  handleConfirmModalLock?: () => void;
  isOpenModalUnLock?: boolean;
  setIsOpenModalUnLock?: (value: boolean) => void;
  handleConfirmModalUnLock?: () => void;
}

export interface IAddNewEmployeeDataType {
  code: string;
  fullName: string;
  position?: string;
  departmentCode: string;
  staffMetaDataLevel?: string;
  email?: string;
  note?: string;
  birthDate?: string;
  gender: string;
  socialInsuranceCode?: string;
  taxCode?: string;
  identityCard?: string;
  issueDateIdentityCard?: string;
  issuePlaceIdentityCard?: string;
  permanentAddress?: string;
  temporaryAddress?: string;
  hireDate?: string;
  resignDate?: string;
  isResigned?: string;
}

export interface IUpdateEmployeeDataType {
  code: string;
  fullName: string;
  position?: string;
  departmentCode: string;
  staffMetaDataLevel?: string;
  email?: string;
  note?: string;
  birthDate?: string;
  gender: string;
  socialInsuranceCode?: string;
  taxCode?: string;
  identityCard?: string;
  issueDateIdentityCard?: string;
  issuePlaceIdentityCard?: string;
  permanentAddress?: string;
  temporaryAddress?: string;
  hireDate?: string;
  resignDate?: string;
  isResigned?: string;
}
