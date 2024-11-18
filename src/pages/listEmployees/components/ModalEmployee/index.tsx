import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

import { type IApiRequest } from '@/api/api.interface';
import { useRequest } from '@/api/api.middleware';
import toastDefault, { EnumToast } from '@/components/toast';
import Config from '@/env';
import AuthService from '@/utils/Auth';

import { type IAddNewEmployeeDataType, type IModalEmployeeProps, type IUpdateEmployeeDataType } from './type';
import { ModalEmployeeView } from './view';

export function ModalEmployee({
  setIsOpenModal,
  setIsLoading,
  handleGetAllEmployee,
  isAddNotUpdate,
  fileList,
  setFileList,
  fileListUpdate,
  setFileListUpdate,
  setEmployeeIdSelected,
  employeeIdSelected,
}: IModalEmployeeProps) {
  const [idEmployee, setIdEmployee] = useState(employeeIdSelected);
  const config = new Config().getState();

  const addNewEmployeeApi: IApiRequest = {
    url: `${config.api.apiPath.apiEmployee}`,
    method: 'post',
    headers: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': 'application/json',
      Authorization: `Bearer ${AuthService.getPackageAuth()}`,
    },
  };
  const handleResponseNewEmployee = {
    handleRequestSuccess: (response: any) => {
      try {
        setIsLoading && setIsLoading(true);
        if (response.code === 2000) {
          setIdEmployee(response.data.id);
          toastDefault(EnumToast.SUCCESS, 'Thêm nhân viên mới thành công');
          setIsOpenModal(false);
          if (handleGetAllEmployee) {
            handleGetAllEmployee();
          }
        }
      } catch (error: any) {
        toastDefault(EnumToast.ERROR, error.message, response.code);
      } finally {
        setIsLoading && setIsLoading(false);
      }
    },
    handleRequestFailed: (response: any) => {
      toastDefault(EnumToast.ERROR, response.message, response.code);
    },
  };
  const { mutate: mutateAddNewEmployee } = useRequest(addNewEmployeeApi, handleResponseNewEmployee);
  const handleAddNewEmployee = (data: IAddNewEmployeeDataType) => {
    const formattedData = {
      ...data,
      birthDate: data.birthDate ? dayjs(data.birthDate).format('DD-MM-YYYY') : null,
      issueDateIdentityCard: data.issueDateIdentityCard ? dayjs(data.issueDateIdentityCard).format('DD-MM-YYYY') : null,
      hireDate: data.hireDate ? dayjs(data.hireDate).toISOString() : null,
      resignDate: data.resignDate ? dayjs(data.resignDate).toISOString() : null,
    };
    const cleanedData = Object.fromEntries(Object.entries(formattedData).filter(([_, value]) => value !== null));
    mutateAddNewEmployee({ ...cleanedData });
  };
  const uploadApi: IApiRequest = {
    url: `${config.api.apiPath.uploadFiles}/${idEmployee}`,
    method: 'post',
    headers: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${AuthService.getPackageAuth()}`,
    },
  };
  const handleResponseUpload = {
    handleRequestSuccess: (response: any) => {},
    handleRequestFailed: (response: any) => {
      console.log('Lỗi khi gửi yêu cầu.', response.code);
    },
  };
  const { mutate: mutateUpload } = useRequest(uploadApi, handleResponseUpload);

  useEffect(() => {
    if (idEmployee && fileList && fileList.length > 0) {
      const formData = new FormData();
      let hasFilesToUpload = false;

      for (const file of fileList) {
        if (file.originFileObj) {
          formData.append('file', file.originFileObj);
          hasFilesToUpload = true;
        }
      }

      if (hasFilesToUpload) {
        mutateUpload(formData);
        if (setFileList) {
          setFileList([]);
        }
      }
    }
  }, [idEmployee]);

  const [filesDeleted, setFilesDeleted] = useState<string[]>([]);

  const uploadDeleteApi: IApiRequest = {
    url: `${config.api.apiPath.uploadFiles}/delete/${idEmployee}?staffMetaDataFileIds=${filesDeleted.join(',')}`,
    method: 'delete',
    headers: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${AuthService.getPackageAuth()}`,
    },
  };
  const handleResponseUploadDelete = {
    handleRequestSuccess: (response: any) => {},
    handleRequestFailed: (response: any) => {
      toastDefault(EnumToast.ERROR, 'Lỗi khi gửi yêu cầu. ', response.code);
    },
  };
  const { mutate: mutateUploadDelete } = useRequest(uploadDeleteApi, handleResponseUploadDelete);

  const updateEmployeeApi: IApiRequest = {
    url: `${config.api.apiPath.apiEmployee}/${employeeIdSelected}`,
    method: 'put',
    headers: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': 'application/json',
      Authorization: `Bearer ${AuthService.getPackageAuth()}`,
    },
  };

  const handleResponseUpdateEmployee = {
    handleRequestSuccess: (response: any) => {
      try {
        setIsLoading && setIsLoading(true);
        if (response.code === 2000) {
          if (handleGetAllEmployee) {
            handleGetAllEmployee();
          }
          toastDefault(EnumToast.SUCCESS, 'Cập nhật thông tin nhân viên mới thành công');
          setIsOpenModal(false);
        }
      } catch (error: any) {
        console.log(error.message, response.code);
      } finally {
        setIsLoading && setIsLoading(false);
        setEmployeeIdSelected(0);
      }
    },
    handleRequestFailed: (response: any) => {
      toastDefault(EnumToast.ERROR, response.message, response.code);
    },
  };
  const { mutate: mutateUpdateEmployee } = useRequest(updateEmployeeApi, handleResponseUpdateEmployee);
  const handleUpdateEmployee = (data: IUpdateEmployeeDataType) => {
    const formattedData = {
      ...data,
      birthDate: data.birthDate ? dayjs(data.birthDate).format('DD-MM-YYYY') : null,
      issueDateIdentityCard: data.issueDateIdentityCard ? dayjs(data.issueDateIdentityCard).format('DD-MM-YYYY') : null,
      hireDate: data.hireDate ? dayjs(data.hireDate).toISOString() : null,
      resignDate: data.resignDate ? dayjs(data.resignDate).toISOString() : null,
    };
    const cleanedData = Object.fromEntries(
      Object.entries(formattedData).map(([key, value]) => [key, value === '' ? null : value]),
    );
    mutateUpdateEmployee({ ...cleanedData });

    if (fileListUpdate) {
      const formData = new FormData();
      let hasFilesToUpload = false;

      for (const file of fileListUpdate) {
        if (file.originFileObj) {
          formData.append('file', file.originFileObj);
          hasFilesToUpload = true;
        }
      }
      if (hasFilesToUpload && [...formData.entries()].length > 0) {
        mutateUpload(formData);
      }
    }
    if (filesDeleted && filesDeleted.length > 0) {
      mutateUploadDelete({});
    }
  };

  const [isOpenModalLock, setIsOpenModalLock] = useState<boolean>(false);
  const lockAccountApi: IApiRequest = {
    url: `${config.api.apiPath.changeStatusEmployee}/${employeeIdSelected}`,
    method: 'put',
    headers: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': 'application/json',
      Authorization: `Bearer ${AuthService.getPackageAuth()}`,
    },
  };
  const handleResponseLockAccount = {
    handleRequestSuccess: (response: any) => {
      toastDefault(EnumToast.SUCCESS, 'Thành công. Tài khoản đã khóa.');
      setIsOpenModalLock(false);
      setIsOpenModal(false);
      setEmployeeIdSelected(0);
      if (handleGetAllEmployee) {
        handleGetAllEmployee();
      }
    },
    handleRequestFailed: (response: any) => {
      toastDefault(EnumToast.ERROR, 'Lỗi khi gửi yêu cầu. ', response.code);
    },
  };
  const { mutate: mutateLockAccount } = useRequest(lockAccountApi, handleResponseLockAccount);
  const handleConfirmModalLock = () => {
    mutateLockAccount({
      status: 'DEACTIVE',
    });
  };
  const [isOpenModalUnLock, setIsOpenModalUnLock] = useState<boolean>(false);
  const unLockAccountApi: IApiRequest = {
    url: `${config.api.apiPath.changeStatusEmployee}/${employeeIdSelected}`,
    method: 'put',
    headers: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': 'application/json',
      Authorization: `Bearer ${AuthService.getPackageAuth()}`,
    },
  };
  const handleResponseUnLockAccount = {
    handleRequestSuccess: (response: any) => {
      toastDefault(EnumToast.SUCCESS, 'Mở khóa thành công tài khoản.');
      setIsOpenModalUnLock(false);
      setIsOpenModal(false);
      setEmployeeIdSelected(0);
      if (handleGetAllEmployee) {
        handleGetAllEmployee();
      }
    },
    handleRequestFailed: (response: any) => {
      toastDefault(EnumToast.ERROR, 'Lỗi khi gửi yêu cầu. ', response.code);
    },
  };
  const { mutate: mutateUnLockAccount } = useRequest(unLockAccountApi, handleResponseUnLockAccount);
  const handleConfirmModalUnLock = () => {
    mutateUnLockAccount({
      status: 'ACTIVE',
    });
  };

  return (
    <ModalEmployeeView
      isAddNotUpdate={isAddNotUpdate}
      handleSubmitAdd={handleAddNewEmployee}
      handleSubmitUpdate={handleUpdateEmployee}
      setIsOpenModal={setIsOpenModal}
      fileList={fileList}
      setFileList={setFileList}
      fileListUpdate={fileListUpdate}
      setFileListUpdate={setFileListUpdate}
      setEmployeeIdSelected={setEmployeeIdSelected}
      setFilesDeleted={setFilesDeleted}
      isOpenModalLock={isOpenModalLock}
      setIsOpenModalLock={setIsOpenModalLock}
      handleConfirmModalLock={handleConfirmModalLock}
      isOpenModalUnLock={isOpenModalUnLock}
      setIsOpenModalUnLock={setIsOpenModalUnLock}
      handleConfirmModalUnLock={handleConfirmModalUnLock}
    />
  );
}
