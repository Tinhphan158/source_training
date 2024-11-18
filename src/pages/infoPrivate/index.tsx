import React, { useEffect, useState } from 'react';

import { type IApiRequest } from '@/api/api.interface';
import { useRequest } from '@/api/api.middleware';
import toastDefault, { EnumToast } from '@/components/toast';
import Config from '@/env';
import AuthService from '@/utils/Auth';

import { type IDataEmployeeInfoType, type IResponseDataEmployeeInfoAPIType } from './type';
import InfoPrivateView from './view';

function InfoPrivatePage() {
  const [avatar, setAvatar] = useState<string>();
  const profile = AuthService.getPackageProfile();
  const [employee, setEmployee] = useState<IDataEmployeeInfoType | undefined>({
    staffMetaDataCode: profile.staffId,
    phoneNumber: profile.phoneNumber,
    email: profile.email,
    departmentName: profile.department,
    fullName: profile.fullName,
  });
  const config = new Config().getState();
  const getEmployeeByIdApi: IApiRequest = {
    url: `${config.api.apiPath.apiEmployee}/info/${profile?.staffMetaDataId}`,
    method: 'get',
    headers: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': 'application/json',
      Authorization: `Bearer ${AuthService.getPackageAuth()}`,
    },
  };
  const handleResponseDetailEmployee = {
    handleRequestSuccess: (response: IResponseDataEmployeeInfoAPIType) => {
      try {
        if (response.code === 2000) {
          setEmployee(response.data);
          setAvatar(
            response?.data?.avatarPath
              ? `https://cdn.tsp.com.vn/staffMetaData/avatar/${response?.data?.avatarPath}`
              : '',
          );
        }
      } catch (error: any) {
        console.log(error);
      }
    },
    handleRequestFailed: (response: any) => {
      console.log('Lỗi khi gửi yêu cầu.', response.code);
    },
  };
  const { mutate: mutateGetEmployeeById } = useRequest(getEmployeeByIdApi, handleResponseDetailEmployee);
  useEffect(() => {
    if (profile.staffMetaDataId) {
      mutateGetEmployeeById({});
    }
  }, []);

  const uploadApi: IApiRequest = {
    url: `${config.api.apiPath.uploadFiles}/avatar/${profile?.staffMetaDataId}`,
    method: 'put',
    headers: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${AuthService.getPackageAuth()}`,
    },
  };
  const handleResponseUpload = {
    handleRequestSuccess: (response: any) => {
      if (response.code === 2000) {
        setAvatar(`https://cdn.tsp.com.vn/staffMetaData/avatar/${response?.data}`);
        mutateGetEmployeeById({});
        toastDefault(EnumToast.SUCCESS, 'Cập nhật ảnh đại diện thành công');
      } else {
        toastDefault(EnumToast.ERROR, 'Cập nhật ảnh đại diện thất bại');
      }
    },
    handleRequestFailed: (response: any) => {
      console.log('Lỗi khi gửi yêu cầu.', response.code);
      toastDefault(EnumToast.ERROR, 'Cập nhật ảnh đại diện thất bại');
    },
  };
  const { mutate: mutateUpload } = useRequest(uploadApi, handleResponseUpload);

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (profile?.staffMetaDataId) {
      const formData = new FormData();
      const file = event.target.files?.[0];
      if (file) {
        formData.append('file', file);
        mutateUpload(formData);
      }
    } else {
      toastDefault(EnumToast.ERROR, 'Thông tin người dùng thiếu ID để có thể upload');
    }
  };

  return (
    <InfoPrivateView
      data={employee}
      avatar={avatar}
      handleAvatarChange={handleAvatarChange}
    />
  );
}

export default InfoPrivatePage;
