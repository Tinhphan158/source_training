import { useEffect, useState } from 'react';

import { type IApiRequest } from '@/api/api.interface';
import { useRequest } from '@/api/api.middleware';
import { type IOption } from '@/components/select';
import Config from '@/env';
import AuthService from '@/utils/Auth';
import { LoggerService } from '@/utils/Logger';

export const useDepartments = () => {
  const [listDepartments, setListDepartments] = useState<IOption[]>([]);
  const config = new Config().getState();
  const getAllDepartmentsApi: IApiRequest = {
    url: `${config.api.apiPath.apiDepartment}?page=0&size=1000`,
    method: 'get',
    headers: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': 'application/json',
      Authorization: `Bearer ${AuthService.getPackageAuth()}`,
    },
  };

  const handleResponse = {
    handleRequestSuccess: (response: any) => {
      try {
        if (response.code === 2000) {
          const listDepartmentData = response?.data?.map((item: any) => ({
            label: item.name,
            value: item.code,
          }));

          setListDepartments(listDepartmentData);
        }
      } catch {}
    },
    handleRequestFailed: (response: any) => {
      LoggerService.error('Error', response.message);
    },
  };
  const { mutate: mutateGetAllDepartments } = useRequest(getAllDepartmentsApi, handleResponse);
  useEffect(() => {
    mutateGetAllDepartments({});
  }, []);

  return listDepartments;
};
