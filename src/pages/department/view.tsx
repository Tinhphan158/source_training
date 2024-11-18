import { Table } from 'antd';
import { useRef, useState } from 'react';

import Button from '@/components/button';
import { type ICheckboxProps } from '@/components/checkbox';
import IconRoot from '@/components/icon';
import { IconVariable } from '@/components/icon/types';
import { Pagination } from '@/components/pagination';
import { Search } from '@/components/search';
import SelectRoot from '@/components/select';
import { SelectCheckboxs } from '@/components/selectCheckboxs';
import useClickOutside from '@/hooks/useClickOutside';
import { type IColumnsTableProps, type IOptionRowDisplay } from '@/types';

import ModalDepartment from './components/modalDepartment';
import { type IDataSubmitDepartmentType, type IDataTableDepartmentType } from './type';

interface IDepartmentViewProps {
  data: IDataTableDepartmentType[];
  columns: IColumnsTableProps[];
  currentPage: number;
  totalPages: number;
  checkboxStates: Record<string, boolean>;
  initialValues: IDataSubmitDepartmentType;
  isOpenModal?: boolean;
  isModalUpdate?: boolean;
  departmentIdSelected?: number;
  setDepartmentIdSelected: (value: number) => void;
  setInitialValues: (value: any) => void;
  setIsOpenModal?: (value: boolean) => void;
  setIsModalUpdate?: (value: boolean) => void;
  setIsLoading?: (value: boolean) => void;
  getAllDepartments: () => Promise<void>;
  onCheckboxChange: (updatedStates: Record<string, boolean>) => void;
  onChangeRowDisplay: (value: number) => void;
  onPageChange: (newPage: number) => void;
  handleOnChangeSearch: (textSearch: string) => void;
}

const arrOptions: ICheckboxProps[] = [
  { label: 'STT', checked: true, name: 'stt' },
  { label: 'Mã phòng ban', checked: true, name: 'code' },
  { label: 'Tên phòng ban', checked: true, name: 'name' },
  { label: 'Số lượng NV', checked: true, name: 'totalStaff' },
  { label: 'Ghi chú', checked: true, name: 'note' },
  { label: 'Trạng thái', checked: true, name: 'active' },
];

const optionsRowDisplay: IOptionRowDisplay[] = [
  { label: '5 Dòng', value: 5 },
  { label: '10 Dòng', value: 10 },
  { label: '20 Dòng', value: 20 },
  { label: '25 Dòng', value: 25 },
  { label: '50 Dòng', value: 50 },
  { label: '100 Dòng', value: 100 },
];
function DepartmentView({
  data,
  columns,
  currentPage,
  totalPages,
  checkboxStates,
  initialValues,
  isOpenModal,
  isModalUpdate,
  departmentIdSelected,
  setIsModalUpdate,
  setDepartmentIdSelected,
  setInitialValues,
  setIsOpenModal,
  setIsLoading,
  getAllDepartments,
  handleOnChangeSearch,
  onPageChange,
  onChangeRowDisplay,
  onCheckboxChange,
}: IDepartmentViewProps) {
  const [isOpenSelectCheckbox, setIsOpenSelectCheckbox] = useState<boolean>(false);
  const refSelectCheckbox = useRef(null);
  useClickOutside(refSelectCheckbox, () => {
    setIsOpenSelectCheckbox(false);
  });
  return (
    <>
      {isOpenModal && setIsOpenModal && (
        <ModalDepartment
          setIsOpenModal={setIsOpenModal}
          initialValues={initialValues}
          getAllDepartments={getAllDepartments}
          setIsLoading={setIsLoading}
          isModalUpdate={isModalUpdate}
          setInitialValues={setInitialValues}
          setDepartmentIdSelected={setDepartmentIdSelected}
          setIsModalUpdate={setIsModalUpdate}
          departmentIdSelected={departmentIdSelected}
        />
      )}
      <div className='flex h-full flex-col'>
        <div className='p-3'>
          <div className='flex-col items-center justify-center rounded-xl bg-white p-6'>
            <div className='flex flex-col items-center justify-center sm:flex-row sm:items-center sm:justify-between'>
              <Search
                onChangeText={handleOnChangeSearch}
                placeholder='Mã / Tên phòng ban'
                iconStart={<IconRoot icon={IconVariable.search} />}
                className='mb-5 w-full sm:w-[300px]'
                classNameInput='w-full'
              />

              <div className='flex items-center justify-center gap-4'>
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
                  className='flex items-center rounded-lg border bg-[#2DB976] px-4 py-[10px] text-white hover:border-[#2DB976]'
                  text='Tạo mới'
                  onClick={() => {
                    setIsOpenModal && setIsOpenModal(true);
                  }}
                  iconStart={<IconRoot icon={IconVariable.plus} />}
                />
              </div>
            </div>
            <div className='mt-5 flex flex-col items-center justify-center gap-4 sm:flex-row sm:items-center sm:justify-end'>
              <div className='mb-5 flex items-center justify-center sm:mb-0'>
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
            <Table<IDataTableDepartmentType>
              columns={columns}
              dataSource={data}
              scroll={{ x: 800, y: '100vh' }}
              className='custom-table mt-5 h-[540px] overflow-y-hidden overflow-x-scroll'
              pagination={false}
              size='small'
              bordered
              rowKey='id'
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default DepartmentView;
