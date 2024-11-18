import { type UploadFile } from 'antd';
import { useContext, useEffect, useState } from 'react';

import { type IApiRequest } from '@/api/api.interface';
import { useRequest } from '@/api/api.middleware';
import IconRoot from '@/components/icon';
import { IconVariable } from '@/components/icon/types';
import { Loading } from '@/components/loading';
import { type IOption } from '@/components/select';
import { Tag } from '@/components/tag';
import toastDefault, { EnumToast } from '@/components/toast';
import { ModalContext } from '@/context/contextStore';
import Config from '@/env';
import { type IColumnsTableProps } from '@/types';
import AuthService from '@/utils/Auth';
import { handleExportExcel } from '@/utils/ExportFile';
import { LoggerService } from '@/utils/Logger';

import ModalContractDetail from './components/ModalContractDetail';
import { type IFilterContractsType } from './components/modalFilter';
import { type IDataResponseAPIType } from './type';
import { ContractsView } from './view';

export function ContractsPage() {
  const { handleSetContractDetail } = useContext(ModalContext);
  const initStateColumns: IColumnsTableProps[] = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
      render: (_, __, index) => (currentPage - 1) * totalPages + index + 1,
    },
    {
      title: 'Mã HĐLĐ',
      dataIndex: 'contractCode',
      key: 'contractCode',
      render: (_, text) => (
        <div
          className='text-[#2bb371] underline hover:cursor-pointer'
          onClick={() => {
            setContractIdSelected(text.id);
          }}>
          {text.contractCode}
        </div>
      ),
    },
    {
      title: 'Mã nhân viên',
      dataIndex: 'staffCode',
      key: 'staffCode',
    },
    {
      title: 'Tên nhân viên',
      dataIndex: 'staffName',
      key: 'staffName',
    },
    {
      title: 'Lương cơ bản',
      key: 'salary',
      dataIndex: 'salary',
    },
    {
      title: 'Phụ cấp',
      key: 'allowance',
      dataIndex: 'allowance',
    },
    {
      title: 'Phòng ban',
      key: 'departmentName',
      dataIndex: 'departmentName',
    },
    {
      title: 'Bậc',
      key: 'level',
      dataIndex: 'level',
    },
    {
      title: 'Chức vụ',
      key: 'position',
      dataIndex: 'position',
    },
    {
      title: 'Ngày bắt đầu HĐ',
      key: 'fromDate',
      dataIndex: 'fromDate',
    },
    {
      title: 'Ngày kết thúc HĐ',
      key: 'toDate',
      dataIndex: 'toDate',
    },
    {
      title: 'Loại hợp đồng',
      key: 'contractType',
      dataIndex: 'contractType',
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
              <IconRoot icon={IconVariable.expire} />
            )
          }
        />
      ),
    },
    {
      title: 'Lịch sử',
      key: 'historyUpdate',
      dataIndex: 'historyUpdate',
      render: (_, text) => (
        <IconRoot
          icon={IconVariable.historyUpdateContract}
          className='text-center text-[#2bb371] underline hover:cursor-pointer'
          onClick={() => {
            setContractIdSelected(text.id);
          }}
        />
      ),
    },
  ];
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [typeModalContract, setTypeModalContract] = useState<string>();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [fileListUpdate, setFileListUpdate] = useState<UploadFile[]>([]);
  const [contractIdSelected, setContractIdSelected] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [listContract, setListContract] = useState<any[]>([]);
  const [columns, setColumns] = useState<IColumnsTableProps[]>(initStateColumns);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [checkboxStates, setCheckboxStates] = useState<Record<string, boolean>>(() => ({
    stt: true,
    contractCode: true,
    staffCode: true,
    staffName: true,
    salary: false,
    allowance: false,
    departmentName: true,
    level: true,
    position: true,
    fromDate: false,
    toDate: false,
    contractType: true,
    status: true,
    historyUpdate: true,
  }));
  const [filterValues, setFilterValues] = useState<IFilterContractsType>({
    staffName: '',
    departmentCode: '',
    level: '',
    position: '',
    contractType: '',
    status: '',
  });
  const [queryParams, setQueryParams] = useState<any>({
    page: 0,
    size: 25,
    staffName: '',
    departmentCode: '',
    level: '',
    position: '',
    contractType: '',
    status: '',
    codeOrStaffCode: '',
  });
  const [queryParamsString, setQueryParamsString] = useState<string>('');
  const [queryParamsExportFile, setQueryParamsExportFile] = useState<any>({
    staffName: '',
    departmentCode: '',
    level: '',
    position: '',
    contractType: '',
    status: '',
    codeOrStaffCode: '',
  });
  const [queryParamsStringExportFile, setQueryParamsStringExportFile] = useState<string>('');
  const [listStaffName, setListStaffName] = useState<IOption[]>([]);

  const config = new Config().getState();
  const getAllContractsApi: IApiRequest = {
    url: `${config.api.apiPath.apiContract}?${queryParamsString}`,
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
          const dataTable: any[] =
            response?.data?.map((item: any) => {
              return {
                id: item.id,
                contractCode: item?.contractCode,
                staffCode: item.staffCode,
                staffName: item.staffName,
                salary: item?.salary || 0,
                allowance: item?.allowance || 0,
                fromDate: item?.fromDate,
                toDate: item?.toDate,
                contractType:
                  item.contractType === 'CADET'
                    ? 'Học việc'
                    : item.contractType === 'SERVICE'
                      ? 'Dịch vụ'
                      : item.contractType === 'DEADLINE'
                        ? 'Có thời hạn'
                        : item.contractType === 'PROBATION'
                          ? 'Thử việc'
                          : item.contractType === 'COLLABORATOR'
                            ? 'Cộng tác viên'
                            : item.contractType === 'NO_DEADLINE'
                              ? 'Không thời hạn'
                              : 'Khác',
                position: item?.position,
                departmentName: item?.department?.name,
                level: item?.level,
                historyUpdate: item?.id,
                status: item.status === 'ACTIVE' ? 'Hoạt động' : item.status === 'DEACTIVE' ? 'Đã khóa' : 'Hết hạn',
              };
            }) ?? [];

          setColumns(initStateColumns.filter(column => checkboxStates[column.key]));
          setListContract(dataTable);
          setTotalPages(response?.totalPages ?? 0);
        }
      } catch (error: any) {
        LoggerService.error('error when get info contracts', error);
      } finally {
        setIsLoading(false);
      }
    },
    handleRequestFailed: (response: any) => {
      LoggerService.error('Error', response.message);
    },
  };
  const { mutate: mutateGetAllContracts } = useRequest(getAllContractsApi, handleResponse);
  const handleGetAllContracts = async () => {
    mutateGetAllContracts({});
  };

  const getListStaffNameApi: IApiRequest = {
    url: `${config.api.apiPath.apiEmployee}/${config.api.apiPath.apiListStaffName}`,
    method: 'get',
    headers: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': 'application/json',
      Authorization: `Bearer ${AuthService.getPackageAuth()}`,
    },
  };
  const handleResponseListStaffName = {
    handleRequestSuccess: (response: any) => {
      try {
        if (response.code === 2000) {
          const listStaffName = response?.data?.map((item: any) => {
            return {
              label: item.fullName,
              value: item.fullName,
            };
          });
          setListStaffName(listStaffName);
        }
      } catch (error: any) {
        toastDefault(EnumToast.ERROR, 'Lấy danh sách tên nhân viên thất bại.', error);
      }
    },
    handleRequestFailed: (response: any) => {
      toastDefault(EnumToast.ERROR, 'Lỗi khi gửi yêu cầu.', response.code);
    },
  };
  const { mutate: mutateGetListStaffName } = useRequest(getListStaffNameApi, handleResponseListStaffName);
  useEffect(() => {
    mutateGetListStaffName({});
  }, []);

  const getContractByIdApi: IApiRequest = {
    url: `${config.api.apiPath.apiContract}/${contractIdSelected}`,
    method: 'get',
    headers: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': 'application/json',
      Authorization: `Bearer ${AuthService.getPackageAuth()}`,
    },
  };
  const handleResponseDetailContract = {
    handleRequestSuccess: (response: any) => {
      try {
        if (response.code === 2000) {
          handleSetContractDetail(response.data);

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
          console.log('data nè:', response.data);
        }
      } catch (error: any) {
        toastDefault(EnumToast.ERROR, 'Lấy thông tin hợp đồng thất bại.', error);
      }
    },
    handleRequestFailed: (response: any) => {
      toastDefault(EnumToast.ERROR, 'Lỗi khi gửi yêu cầu.', response.code);
    },
  };
  const { mutate: mutateGetContractById } = useRequest(getContractByIdApi, handleResponseDetailContract);

  useEffect(() => {
    if (contractIdSelected && contractIdSelected !== 0) {
      mutateGetContractById({});
    }
  }, [contractIdSelected]);

  const handleCheckboxChange = (updatedStates: Record<string, boolean>) => {
    setCheckboxStates(updatedStates);
  };
  useEffect(() => {
    const updatedColumns = initStateColumns.filter(column => checkboxStates[column.key]);
    setColumns(updatedColumns);
  }, [checkboxStates]);

  const handleChangeRowDisplay = (value: number) => {
    setQueryParams((prev: any) => ({ ...prev, size: value }));
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setQueryParams((prev: any) => ({ ...prev, page: newPage - 1 }));
    setCurrentPage(newPage);
  };

  const handleFormFilter = (value: IFilterContractsType) => {
    setFilterValues(value);
    setQueryParams((prev: any) => ({
      ...prev,
      staffName: value.staffName || '',
      departmentCode: value.departmentCode || '',
      position: value.position || '',
      status: value.status || '',
      level: value.level || '',
      contractType: value.contractType || '',
    }));
    setQueryParamsExportFile((prev: any) => ({
      ...prev,
      staffName: value.staffName || '',
      departmentCode: value.departmentCode || '',
      position: value.position || '',
      status: value.status || '',
      level: value.level || '',
      contractType: value.contractType || '',
    }));
  };

  const handleOnChangeSearch = (textSearch: string) => {
    setQueryParams((prev: any) => ({ ...prev, codeOrStaffCode: textSearch }));
    setQueryParamsExportFile((prev: any) => ({ ...prev, codeOrStaffCode: textSearch }));
  };

  const handleExportClick = async () => {
    const url = `${config.api.host}/${config.api.apiPath.exportContracts}?${queryParamsStringExportFile}`;
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
    const fileName = `hopdong_${formattedDate}`;

    await handleExportExcel(url, fileName, setIsLoading);
  };

  useEffect(() => {
    const params = new URLSearchParams();
    for (const key of Object.keys(queryParams)) {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
      const value = (queryParams as any)[key];
      if (value) params.append(key, value);
    }
    setQueryParamsString(params.toString());
  }, [queryParams]);

  useEffect(() => {
    const params = new URLSearchParams();
    for (const key of Object.keys(queryParamsExportFile)) {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
      const value = (queryParamsExportFile as any)[key];
      if (value) params.append(key, value);
    }
    setQueryParamsStringExportFile(params.toString());
  }, [queryParamsExportFile]);

  useEffect(() => {
    handleGetAllContracts();
  }, [queryParamsString]);

  return (
    <>
      {isLoading && <Loading />}
      {isOpenModal && (
        <ModalContractDetail
          fileList={fileList}
          setFileList={setFileList}
          fileListUpdate={fileListUpdate}
          setFileListUpdate={setFileListUpdate}
          typeModalContract={typeModalContract}
          setIsOpenModal={setIsOpenModal}
        />
      )}
      <ContractsView
        data={listContract}
        columns={columns}
        currentPage={currentPage}
        totalPages={totalPages}
        checkboxStates={checkboxStates}
        filterValues={filterValues}
        onCheckboxChange={handleCheckboxChange}
        onChangeRowDisplay={handleChangeRowDisplay}
        onPageChange={handlePageChange}
        handleFormFilter={handleFormFilter}
        handleOnChangeSearch={handleOnChangeSearch}
        handleExportContracts={handleExportClick}
        listStaffName={listStaffName}
        setIsOpenModal={setIsOpenModal}
        setTypeModalContract={setTypeModalContract}
      />
    </>
  );
}
