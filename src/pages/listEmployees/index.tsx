import { type UploadFile } from 'antd';
import { useContext, useEffect, useState } from 'react';

import { type IApiRequest } from '@/api/api.interface';
import { useRequest } from '@/api/api.middleware';
import IconRoot from '@/components/icon';
import { IconVariable } from '@/components/icon/types';
import { Loading } from '@/components/loading';
import { Tag } from '@/components/tag';
import toastDefault, { EnumToast } from '@/components/toast';
import { ModalContext } from '@/context/contextStore';
import Config from '@/env';
import { type IColumnsTableProps } from '@/types';
import AuthService from '@/utils/Auth';
import { handleExportExcel } from '@/utils/ExportFile';
import { LoggerService } from '@/utils/Logger';

import { ModalEmployee } from './components/ModalEmployee';
import { type IFilterType } from './components/modalFilter';
import {
  type IDataEmployeeType,
  type IDataResponseAPIType,
  type IDataTableType,
  type IQueryParamsExportFileType,
  type IQueryParamsType,
} from './type';
import { ListEmployeesView } from './view';

export function ListEmployeesPage() {
  const { handleSetEmployeeDetail } = useContext(ModalContext);
  const initStateColumns: IColumnsTableProps[] = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
      render: (_, __, index) => (currentPage - 1) * totalPages + index + 1,
    },
    {
      title: 'Mã NV',
      dataIndex: 'code',
      key: 'code',
      render: (_, text) => (
        <div
          className='text-[#2bb371] underline hover:cursor-pointer'
          onClick={() => {
            setIsAddNotUpdate(false);
            setEmployeeIdSelected(text.id);
          }}>
          {text.code}
        </div>
      ),
    },
    {
      title: 'Mã chấm công',
      dataIndex: 'timekeepingCode',
      key: 'timekeepingCode',
      width: 120,
    },
    {
      title: 'Tên nhân viên',
      key: 'fullName',
      dataIndex: 'fullName',
    },
    {
      title: 'Giới tính',
      key: 'gender',
      dataIndex: 'gender',
    },
    {
      title: 'Chức vụ',
      key: 'position',
      dataIndex: 'position',
    },
    {
      title: 'Phòng ban',
      key: 'departmentName',
      dataIndex: 'departmentName',
    },
    {
      title: 'Bậc',
      key: 'staffMetaDataLevel',
      dataIndex: 'staffMetaDataLevel',
    },
    {
      title: 'BHXH',
      key: 'socialInsuranceCode',
      dataIndex: 'socialInsuranceCode',
    },
    {
      title: 'MST',
      key: 'taxCode',
      dataIndex: 'taxCode',
    },
    {
      title: 'SDT',
      key: 'phoneNumber',
      dataIndex: 'phoneNumber',
    },
    {
      title: 'Trạng thái',
      key: 'status',
      dataIndex: 'status',
      render: text => (
        <Tag
          className={`w-[100px] text-center ${text === 'Hoạt động' ? 'bg-[#ECFDF3] text-[#027A48]' : text === 'Đã khóa' ? 'bg-[#FEF3F2] text-[#B42318]' : 'bg-[#F2F4F7] text-[#344054]'} `}
          text={text}
          iconStart={
            text === 'Hoạt động' ? (
              <IconRoot icon={IconVariable.tick} />
            ) : text === 'Đã khóa' ? (
              <IconRoot icon={IconVariable.lock} />
            ) : (
              <IconRoot icon={IconVariable.layoff} />
            )
          }
        />
      ),
    },
  ];
  const [isReset, setIsReset] = useState<boolean>(false);
  const [employeeIdSelected, setEmployeeIdSelected] = useState<number>(0);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [fileListUpdate, setFileListUpdate] = useState<UploadFile[]>([]);
  const [isAddNotUpdate, setIsAddNotUpdate] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [listEmployee, setListEmployee] = useState<IDataTableType[]>([]);
  const [columns, setColumns] = useState<IColumnsTableProps[]>(initStateColumns);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [checkboxStates, setCheckboxStates] = useState<Record<string, boolean>>(() => ({
    stt: true,
    code: true,
    timekeepingCode: false,
    fullName: true,
    gender: true,
    position: true,
    departmentName: true,
    staffMetaDataLevel: true,
    socialInsuranceCode: false,
    taxCode: false,
    phoneNumber: false,
    status: true,
  }));
  const [filterValues, setFilterValues] = useState<IFilterType>({
    position: '',
    taxCode: '',
    status: '',
    socialInsuranceCode: '',
    departmentCode: '',
  });
  const [queryParams, setQueryParams] = useState<IQueryParamsType>({
    page: 0,
    size: 25,
    position: '',
    socialInsuranceCode: '',
    taxCode: '',
    departmentCode: '',
    status: '',
    codeOrFullName: '',
  });
  const [queryParamsString, setQueryParamsString] = useState<string>('');
  const [queryParamsExportFile, setQueryParamsExportFile] = useState<IQueryParamsExportFileType>({
    position: '',
    socialInsuranceCode: '',
    taxCode: '',
    departmentCode: '',
    status: '',
    codeOrFullName: '',
  });
  const [queryParamsStringExportFile, setQueryParamsStringExportFile] = useState<string>('');
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const config = new Config().getState();
  const getAllEmployeeApi: IApiRequest = {
    url: `${config.api.apiPath.apiEmployee}?${queryParamsString}`,
    method: 'get',
    headers: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': 'application/json',
      Authorization: `Bearer ${AuthService.getPackageAuth()}`,
    },
  };

  const handleResponse = {
    handleRequestSuccess: (response: IDataResponseAPIType) => {
      try {
        setIsLoading(true);
        if (response.code === 2000) {
          const dataTable: IDataTableType[] =
            response?.data?.map((item: IDataEmployeeType) => {
              return {
                id: item.id,
                code: item.code,
                timekeepingCode: item.timekeepingCode,
                fullName: item.fullName,
                gender: item.gender === 'MALE' ? 'Nam' : 'Nữ',
                position: item.position,
                departmentName: item?.department?.name,
                staffMetaDataLevel: item?.staffMetaDataLevel,
                socialInsuranceCode: item.socialInsuranceCode,
                taxCode: item.taxCode,
                phoneNumber: item.phoneNumber,
                status: item.status === 'ACTIVE' ? 'Hoạt động' : item.status === 'DEACTIVE' ? 'Đã khóa' : 'Nghỉ việc',
              };
            }) ?? [];

          setColumns(initStateColumns.filter(column => checkboxStates[column.key]));
          setListEmployee(dataTable);
          setTotalPages(response?.totalPages ?? 0);
        }
      } catch (error: any) {
        LoggerService.error('error when get info employees', error);
      } finally {
        setIsLoading(false);
      }
    },
    handleRequestFailed: (response: any) => {
      LoggerService.error('Error', response.message);
    },
  };
  const { mutate: mutateGetAllEmployees } = useRequest(getAllEmployeeApi, handleResponse);
  const handleGetAllEmployee = async () => {
    mutateGetAllEmployees({});
  };

  const getEmployeeByIdApi: IApiRequest = {
    url: `${config.api.apiPath.apiEmployee}/${employeeIdSelected}`,
    method: 'get',
    headers: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': 'application/json',
      Authorization: `Bearer ${AuthService.getPackageAuth()}`,
    },
  };
  const handleResponseDetailEmployee = {
    handleRequestSuccess: (response: any) => {
      try {
        if (response.code === 2000) {
          handleSetEmployeeDetail(response.data);

          const files = response.data.staffMetaDataFiles.map((file: any) => ({
            uid: file.id.toString(),
            name: file.filePath.split('/').pop(),
            url: `${config.api.host}/${file.filePath}`,
            status: 'done',
            originFileObj: new File([], file.filePath.split('/').pop(), { type: file.contentType }),
          }));
          setFileList([]);
          setFileListUpdate(files);
          setIsOpenModal(true);
        }
      } catch (error: any) {
        toastDefault(EnumToast.ERROR, 'Lấy thông tin nhân viên thất bại.', error);
      }
    },
    handleRequestFailed: (response: any) => {
      toastDefault(EnumToast.ERROR, 'Lỗi khi gửi yêu cầu.', response.code);
    },
  };
  const { mutate: mutateGetEmployeeById } = useRequest(getEmployeeByIdApi, handleResponseDetailEmployee);

  useEffect(() => {
    if (employeeIdSelected && employeeIdSelected !== 0) {
      mutateGetEmployeeById({});
    }
  }, [employeeIdSelected]);

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

  const handleFormFilter = (value: IFilterType) => {
    setFilterValues(value);
    setQueryParams(prev => ({
      ...prev,
      departmentCode: value.departmentCode || '',
      position: value.position || '',
      status: value.status || '',
      socialInsuranceCode: value.socialInsuranceCode || '',
      taxCode: value.taxCode || '',
    }));
    setQueryParamsExportFile(prev => ({
      ...prev,
      departmentCode: value.departmentCode || '',
      position: value.position || '',
      status: value.status || '',
      socialInsuranceCode: value.socialInsuranceCode || '',
      taxCode: value.taxCode || '',
    }));
  };

  const handleOnChangeSearch = (textSearch: string) => {
    setQueryParams(prev => ({ ...prev, codeOrFullName: textSearch }));
    setQueryParamsExportFile(prev => ({ ...prev, codeOrFullName: textSearch }));
  };

  const handleExportClick = async () => {
    const url = `${config.api.host}/${config.api.apiPath.exportStaff}?${queryParamsStringExportFile}`;
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
    const fileName = `hosonhanvien_${formattedDate}`;

    await handleExportExcel(url, fileName, setIsLoading);
  };

  useEffect(() => {
    const params = new URLSearchParams();
    for (const key of Object.keys(queryParams)) {
      const value = (queryParams as any)[key];
      if (value) params.append(key, value);
    }
    setQueryParamsString(params.toString());
  }, [queryParams]);

  useEffect(() => {
    const params = new URLSearchParams();
    for (const key of Object.keys(queryParamsExportFile)) {
      const value = (queryParamsExportFile as any)[key];
      if (value) params.append(key, value);
    }
    setQueryParamsStringExportFile(params.toString());
  }, [queryParamsExportFile]);

  useEffect(() => {
    handleGetAllEmployee();
  }, [queryParamsString]);

  return (
    <>
      {isLoading && <Loading />}
      {isOpenModal && (
        <ModalEmployee
          setIsLoading={setIsLoading}
          setIsOpenModal={setIsOpenModal}
          handleGetAllEmployee={handleGetAllEmployee}
          isAddNotUpdate={isAddNotUpdate}
          setIsAddNotUpdate={setIsAddNotUpdate}
          fileList={fileList}
          setFileList={setFileList}
          fileListUpdate={fileListUpdate}
          setFileListUpdate={setFileListUpdate}
          employeeIdSelected={employeeIdSelected}
          setEmployeeIdSelected={setEmployeeIdSelected}
          isReset={isReset}
          setIsReset={setIsReset}
        />
      )}
      <ListEmployeesView
        data={listEmployee}
        columns={columns}
        currentPage={currentPage}
        totalPages={totalPages}
        checkboxStates={checkboxStates}
        initialValues={filterValues}
        onCheckboxChange={handleCheckboxChange}
        onChangeRowDisplay={handleChangeRowDisplay}
        onPageChange={handlePageChange}
        handleFormFilter={handleFormFilter}
        handleOnChangeSearch={handleOnChangeSearch}
        handleExportStaff={handleExportClick}
        setIsOpenModal={setIsOpenModal}
        setIsAddNotUpdate={setIsAddNotUpdate}
        setIsReset={setIsReset}
      />
    </>
  );
}
