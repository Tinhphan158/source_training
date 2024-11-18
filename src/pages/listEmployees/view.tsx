import { Table } from 'antd';
import { useContext, useRef, useState } from 'react';

import Button from '@/components/button';
import { type ICheckboxProps } from '@/components/checkbox';
import IconRoot from '@/components/icon';
import { IconVariable } from '@/components/icon/types';
import { Pagination } from '@/components/pagination';
import { Search } from '@/components/search';
import SelectRoot from '@/components/select';
import { SelectCheckboxs } from '@/components/selectCheckboxs';
import { ModalContext } from '@/context/contextStore';
import useClickOutside from '@/hooks/useClickOutside';
import { useDepartments } from '@/hooks/useDepartments';
import { type IColumnsTableProps, type IOptionRowDisplay } from '@/types';

import { ModalFilter } from './components/modalFilter';
import { type IDataTableType } from './type';

interface IListEmployeesViewProps {
  data: IDataTableType[];
  columns: IColumnsTableProps[];
  currentPage: number;
  totalPages: number;
  checkboxStates: Record<string, boolean>;
  initialValues: any;
  setIsReset?: (valueL: boolean) => void;
  onCheckboxChange: (updatedStates: Record<string, boolean>) => void;
  onChangeRowDisplay: (value: number) => void;
  onPageChange: (newPage: number) => void;
  handleOnChangeSearch: (textSearch: string) => void;
  handleFormFilter: (value: any) => void;
  handleExportStaff: () => Promise<void>;
  setIsOpenModal: (value: boolean) => void;
  setIsAddNotUpdate: (value: boolean) => void;
}

const optionsRowDisplay: IOptionRowDisplay[] = [
  { label: '5 Dòng', value: 5 },
  { label: '10 Dòng', value: 10 },
  { label: '20 Dòng', value: 20 },
  { label: '25 Dòng', value: 25 },
  { label: '50 Dòng', value: 50 },
  { label: '100 Dòng', value: 100 },
];
const arrOptions: ICheckboxProps[] = [
  { label: 'STT', checked: true, name: 'stt' },
  { label: 'Mã nhân viên', checked: true, name: 'code' },
  { label: 'Mã chấm công', checked: false, name: 'timekeepingCode' },
  { label: 'Tên nhân viên', checked: true, name: 'fullName' },
  { label: 'Giới tính', checked: true, name: 'gender' },
  { label: 'Chức vụ', checked: true, name: 'position' },
  { label: 'Phòng ban', checked: true, name: 'departmentName' },
  { label: 'Bậc', checked: true, name: 'staffMetaDataLevel' },
  { label: 'BHXH', checked: false, name: 'socialInsuranceCode' },
  { label: 'MST', checked: false, name: 'taxCode' },
  { label: 'SĐT', checked: false, name: 'phoneNumber' },
  { label: 'Trạng thái', checked: true, name: 'status' },
];

export function ListEmployeesView({
  data,
  columns,
  currentPage,
  totalPages,
  checkboxStates,
  initialValues,
  setIsReset,
  onCheckboxChange,
  onChangeRowDisplay,
  onPageChange,
  handleOnChangeSearch,
  handleFormFilter,
  handleExportStaff,
  setIsOpenModal,
  setIsAddNotUpdate,
}: IListEmployeesViewProps) {
  const refBtn = useRef(null);
  const refSelectCheckbox = useRef(null);
  useClickOutside(refBtn, () => {
    setIsOpenModalFilter(false);
  });
  useClickOutside(refSelectCheckbox, () => {
    setIsOpenSelectCheckbox(false);
  });

  const [isOpenModalFilter, setIsOpenModalFilter] = useState<boolean>(false);
  const [isOpenSelectCheckbox, setIsOpenSelectCheckbox] = useState<boolean>(false);
  const listDepartments = useDepartments();
  const { handleSetEmployeeDetail } = useContext(ModalContext);
  return (
    <div className='flex h-full flex-col'>
      <>
        <div className='p-3'>
          <div className='flex-col rounded-xl bg-white p-6'>
            <div className='flex flex-col items-center justify-center xl:flex-row xl:items-center xl:justify-between'>
              <Search
                onChangeText={handleOnChangeSearch}
                placeholder='Mã / Tên nhân viên'
                iconStart={<IconRoot icon={IconVariable.search} />}
                className='mb-5 w-full lg:w-[300px]'
                classNameInput='w-full'
              />

              <div className='flex flex-col items-center gap-4 xl:flex-row'>
                <div className='flex items-center gap-4'>
                  <Button
                    onClick={() => {
                      window.location.reload();
                    }}
                    iconStart={<IconRoot icon={IconVariable.refresh} />}
                    className='relative flex items-center gap-2 rounded-lg border px-4 py-[12px] hover:border-[#2DB976]'></Button>
                  <Button
                    text='Cột'
                    className='relative flex items-center gap-2 rounded-lg border px-4 py-[10px] hover:border-[#2DB976]'
                    iconStart={<IconRoot icon={IconVariable.setting} />}
                    refTo={refSelectCheckbox}
                    onClick={() => {
                      setIsOpenSelectCheckbox(!isOpenSelectCheckbox);
                    }}>
                    {isOpenSelectCheckbox && (
                      <SelectCheckboxs
                        arrOptions={arrOptions}
                        checkboxStates={checkboxStates}
                        onChangeCheckboxs={onCheckboxChange}
                      />
                    )}
                  </Button>
                  <Button
                    text='Bộ lọc'
                    refTo={refBtn}
                    className='relative box-border flex items-center gap-2 rounded-lg border px-4 py-[10px] hover:border-[#2DB976]'
                    iconStart={<IconRoot icon={IconVariable.filter} />}
                    onClick={() => {
                      setIsOpenModalFilter(!isOpenModalFilter);
                    }}>
                    {isOpenModalFilter && (
                      <ModalFilter
                        listDepartment={listDepartments}
                        handleSubmitFormFilter={handleFormFilter}
                        initialValues={initialValues}
                      />
                    )}
                  </Button>
                </div>

                <div className='flex items-center gap-4'>
                  <Button
                    // eslint-disable-next-line @typescript-eslint/no-misused-promises
                    onClick={handleExportStaff}
                    text='Xuất dữ liệu'
                    className='flex items-center gap-2 rounded-lg border px-4 py-[10px] hover:border-[#2DB976]'
                    iconStart={<IconRoot icon={IconVariable.download} />}
                  />

                  <Button
                    onClick={() => {
                      handleSetEmployeeDetail({});
                      setIsOpenModal(true);
                      setIsAddNotUpdate(true);
                      if (setIsReset) {
                        setIsReset(true);
                      }
                    }}
                    className='flex items-center rounded-lg border bg-[#2DB976] px-4 py-[10px] text-white hover:border-[#2DB976]'
                    text='Thêm mới'
                    iconStart={<IconRoot icon={IconVariable.plus} />}
                  />
                </div>
              </div>
            </div>
            <div className='mt-5 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-10 xl:items-center xl:justify-end'>
              <div className=' flex items-center justify-center xl:mb-0'>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={onPageChange}
                />
              </div>
              <SelectRoot
                name='size'
                options={optionsRowDisplay}
                firstValue={optionsRowDisplay[3]}
                onChange={onChangeRowDisplay}
                className='gap-[10px] rounded-md border px-4 py-2 text-center'
                classNameItemSelect='text-center'
              />
            </div>
            <Table<IDataTableType>
              columns={columns}
              dataSource={data}
              scroll={{ x: 800, y: '100vh' }}
              className='custom-table mt-5 h-[540px] overflow-y-hidden overflow-x-scroll'
              pagination={false}
              size='small'
              bordered
              rowKey='code'
            />
          </div>
        </div>
      </>
    </div>
  );
}
