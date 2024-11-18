import React, { useEffect, useState } from 'react';

import { type IApiRequest } from '@/api/api.interface';
import { useRequest } from '@/api/api.middleware';
import IconRoot from '@/components/icon';
import { IconVariable } from '@/components/icon/types';
import { Loading } from '@/components/loading';
import { Tag } from '@/components/tag';
import Config from '@/env';
import { type IColumnsTableProps } from '@/types';
import AuthService from '@/utils/Auth';
import { LoggerService } from '@/utils/Logger';

import { type IDataSubmitDepartmentType, type IDataTableDepartmentType, type IQueryParamsDepartmentType } from './type';
import DepartmentView from './view';

function DepartmentPage() {
  const config = new Config().getState();
  const initStateColumns: IColumnsTableProps[] = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
      render: (_, __, index) => (currentPage - 1) * totalPages + index + 1,
      width: '10%',
    },
    {
      title: 'Mã phòng ban',
      dataIndex: 'code',
      key: 'code',
      render: (_, text) => (
        <div
          className='text-[#2bb371] underline hover:cursor-pointer'
          onClick={() => {
            setDepartmentIdSelected(text.id);
            setIsModalUpdate(true);
          }}>
          {text.code}
        </div>
      ),
      width: '15%',
    },
    {
      title: 'Tên phòng ban',
      dataIndex: 'name',
      key: 'name',
      width: '20%',
    },
    {
      title: 'Số lượng nhân viên',
      key: 'totalStaff',
      dataIndex: 'totalStaff',
      width: '15%',
    },
    {
      title: 'Ghi chú',
      key: 'note',
      dataIndex: 'note',
      width: '30%',
    },
    {
      title: 'Trạng thái',
      key: 'active',
      dataIndex: 'active',
      render: text => (
        <Tag
          className={`w-[85px] text-justify ${text === 'Hoạt động' ? 'bg-[#ECFDF3] text-[#027A48]' : 'bg-[#FEF3F2] text-[#B42318]'} w-80 text-nowrap`}
          text={text}
          iconStart={
            text === 'Hoạt động' ? <IconRoot icon={IconVariable.tick} /> : <IconRoot icon={IconVariable.lock} />
          }
        />
      ),
    },
  ];
  const [departmentIdSelected, setDepartmentIdSelected] = useState<number>(0);
  const [initialValues, setInitialValues] = useState<IDataSubmitDepartmentType>({
    code: '',
    name: '',
    note: '',
    phoneNumber: '',
    blockForTimesheet: '',
    active: true,
  });
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isModalUpdate, setIsModalUpdate] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [checkboxStates, setCheckboxStates] = useState<Record<string, boolean>>(() => ({
    stt: true,
    code: true,
    name: true,
    totalStaff: true,
    active: true,
    note: true,
  }));
  const [columns, setColumns] = useState<IColumnsTableProps[]>(initStateColumns);
  const [listDepartments, setListDepartments] = useState<IDataTableDepartmentType[]>([]);
  const [queryParams, setQueryParams] = useState<IQueryParamsDepartmentType>({
    page: 0,
    size: 25,
    codeOrName: '',
  });
  const [queryParamsString, setQueryParamsString] = useState<string>('');

  const handleOnChangeSearch = (textSearch: string) => {
    setQueryParams(prev => ({ ...prev, codeOrName: textSearch }));
  };
  const handleCheckboxChange = (updatedStates: Record<string, boolean>) => {
    setCheckboxStates(updatedStates);
  };
  useEffect(() => {
    const updatedColumns = initStateColumns.filter(column => checkboxStates[column.key]);
    setColumns(updatedColumns);
  }, [checkboxStates]);

  const handleChangeRowDisplay = (value: number) => {
    setQueryParams(prev => ({ ...prev, size: value }));
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setQueryParams(prev => ({ ...prev, page: newPage - 1 }));
    setCurrentPage(newPage);
  };
  useEffect(() => {
    const params = new URLSearchParams();
    for (const key of Object.keys(queryParams)) {
      const value = (queryParams as any)[key];
      if (value) params.append(key, value);
    }
    setQueryParamsString(params.toString());
  }, [queryParams]);

  const getAllDepartmentsApi: IApiRequest = {
    url: `${config.api.apiPath.apiDepartment}?${queryParamsString}`,
    method: 'get',
    headers: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': 'application/json',
      Authorization: `Bearer ${AuthService.getPackageAuth()}`,
    },
  };
  const handleResponseGetAllDepartments = {
    handleRequestSuccess: (response: any) => {
      try {
        setIsLoading(true);
        if (response.code === 2000) {
          const dataTable: IDataTableDepartmentType[] =
            response?.data?.map((item: any) => {
              return {
                id: item.id,
                name: item.name,
                code: item.code,
                note: item.note,
                totalStaff: item.totalStaff,
                active: item.active ? 'Hoạt động' : 'Đã khóa',
              };
            }) ?? [];

          setColumns(initStateColumns.filter(column => checkboxStates[column.key]));
          setListDepartments(dataTable);
          setTotalPages(response?.totalPages ?? 0);
        }
      } catch (error: any) {
        LoggerService.error('error when get list departments', error);
      } finally {
        setIsLoading(false);
      }
    },
    handleRequestFailed: (response: any) => {
      LoggerService.error('Error', response.message);
    },
  };
  const { mutate: mutateGetAllDepartments } = useRequest(getAllDepartmentsApi, handleResponseGetAllDepartments);
  const getAllDepartments = async () => {
    mutateGetAllDepartments({});
  };
  useEffect(() => {
    getAllDepartments();
  }, [queryParamsString]);

  const getDepartmentByIdApi: IApiRequest = {
    url: `${config.api.apiPath.apiDepartment}/${departmentIdSelected}`,
    method: 'get',
    headers: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': 'application/json',
      Authorization: `Bearer ${AuthService.getPackageAuth()}`,
    },
  };
  const handleResponseDetailDepartment = {
    handleRequestSuccess: (response: any) => {
      try {
        if (response.code === 2000) {
          const detailDepartment = {
            code: response.data.code,
            name: response.data.name,
            note: response.data.note,
            phoneNumber: response.data.phoneNumber,
            blockForTimesheet: response.data.blockForTimesheet,
            active: response.data.active,
          };
          setInitialValues(detailDepartment);
          setIsOpenModal(true);
        }
      } catch (error: any) {
        console.log('Lấy thông tin nhân viên thất bại.', error);
      }
    },
    handleRequestFailed: (response: any) => {
      console.log('Lỗi khi gửi yêu cầu.', response.code);
    },
  };
  const { mutate: mutateGetDepartmentById } = useRequest(getDepartmentByIdApi, handleResponseDetailDepartment);

  useEffect(() => {
    if (departmentIdSelected && departmentIdSelected !== 0) {
      mutateGetDepartmentById({});
    }
  }, [departmentIdSelected]);

  return (
    <>
      {isLoading && <Loading />}
      <DepartmentView
        data={listDepartments}
        columns={columns}
        currentPage={currentPage}
        totalPages={totalPages}
        checkboxStates={checkboxStates}
        onCheckboxChange={handleCheckboxChange}
        onPageChange={handlePageChange}
        onChangeRowDisplay={handleChangeRowDisplay}
        handleOnChangeSearch={handleOnChangeSearch}
        initialValues={initialValues}
        getAllDepartments={getAllDepartments}
        setIsLoading={setIsLoading}
        isOpenModal={isOpenModal}
        isModalUpdate={isModalUpdate}
        setIsOpenModal={setIsOpenModal}
        setInitialValues={setInitialValues}
        setDepartmentIdSelected={setDepartmentIdSelected}
        setIsModalUpdate={setIsModalUpdate}
        departmentIdSelected={departmentIdSelected}
      />
    </>
  );
}

export default DepartmentPage;
