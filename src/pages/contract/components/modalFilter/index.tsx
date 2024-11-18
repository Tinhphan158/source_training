import { useRef, useState } from 'react';

import Button from '@/components/button';
import Form, { type IFormRef } from '@/components/form';
import InputRoot from '@/components/input';
import SelectRoot, { type IOption } from '@/components/select';

export interface IFilterContractsType {
  staffName: string;
  departmentCode: string;
  level: string;
  position: string;
  contractType: string;
  status: string;
}
interface IModalFilterProps {
  handleSubmitFormFilter: (value: IFilterContractsType) => void;
  listDepartment: IOption[];
  listStaffName: IOption[];
  initialValues: IFilterContractsType;
}
export function ModalFilter({
  handleSubmitFormFilter,
  listDepartment,
  initialValues,
  listStaffName,
}: IModalFilterProps) {
  const formRef = useRef<IFormRef>(null);

  const [isReset, setIsReset] = useState<boolean>(false);
  const handleResetForm = () => {
    setIsReset(true);
  };

  return (
    <div
      className='custom-shadow absolute right-0 top-16 z-50 w-[600px] rounded-lg bg-white'
      onClick={e => {
        e.stopPropagation();
      }}>
      <div className='absolute right-8 top-[-12px] h-0 w-0'>
        <div className='h-0 w-0 border-b-[10px] border-l-[8px] border-r-[8px] border-b-green-300 border-l-transparent border-r-transparent shadow-lg'></div>
      </div>
      <Form
        ref={formRef}
        defaultValues={{
          position: initialValues.position,
          status: initialValues.status,
          departmentCode: initialValues.departmentCode,
          contractType: initialValues.contractType,
          staffName: initialValues.staffName,
          level: initialValues.level,
        }}
        onSubmit={handleSubmitFormFilter}>
        <div className='flex gap-5 p-4'>
          <div className='w-[50%]'>
            <div>
              <p className='ml-1 text-start text-[15px] font-normal'>Tên nhân viên</p>
              <SelectRoot
                isReset={isReset}
                firstValue={{ label: 'Tên nhân viên', value: '' }}
                options={listStaffName}
                name='staffName'
                className='mt-2 rounded-lg border p-[13px]'
                classNameOptionList='max-h-80'
              />
            </div>
            <div className='mt-4'>
              <p className='ml-1 text-start text-[15px] font-normal'>Bậc</p>
              <SelectRoot
                isReset={isReset}
                firstValue={{ label: 'Bậc', value: '' }}
                options={[
                  { label: '0', value: 0 },
                  { label: '1', value: 1 },
                  { label: '2', value: 2 },
                  { label: '3', value: 3 },
                  { label: '4', value: 4 },
                  { label: '5', value: 5 },
                  { label: '6', value: 6 },
                  { label: '7', value: 7 },
                  { label: '8', value: 8 },
                ]}
                name='level'
                className='mt-2 rounded-lg border p-[13px]'
                classNameOptionList='max-h-82'
              />
            </div>
            <div className='mt-4'>
              <p className='ml-1 text-start text-[15px] font-normal'>Loại hợp đồng</p>
              <SelectRoot
                isReset={isReset}
                firstValue={{ label: 'Loại hợp đồng', value: '' }}
                options={[
                  { value: 'CADET', label: 'Học việc' },
                  { value: 'SERVICE', label: 'Dịch vụ' },
                  { value: 'DEADLINE', label: 'Có thời hạn' },
                  { value: 'PROBATION', label: 'Thử việc' },
                  { value: 'COLLABORATOR', label: 'Cộng tác viên' },
                  { value: 'NO_DEADLINE', label: 'Không thời hạn' },
                  { value: 'OTHERS', label: 'Khác' },
                ]}
                name='contractType'
                className='mt-2 rounded-lg border p-[13px]'
                classNameOptionList='max-h-80'
              />
            </div>
          </div>
          <div className='w-[50%]'>
            <div>
              <p className='ml-1 text-start text-[15px] font-normal'>Phòng ban</p>
              <SelectRoot
                isReset={isReset}
                firstValue={{ label: 'Phòng ban', value: '' }}
                options={listDepartment}
                name='departmentCode'
                className='mt-2 rounded-lg border p-[13px]'
                classNameOptionList='max-h-80'
              />
            </div>
            <InputRoot
              isReset={isReset}
              name='position'
              placeholder='Chức vụ'
              label='Chức vụ'
              className='h-12'
              classNameLabel='mt-4 text-start font-normal text-[15px] ml-1'
            />
            <div>
              <p className='ml-1 text-start text-[15px] font-normal'>Trạng thái</p>
              <SelectRoot
                isReset={isReset}
                name='status'
                firstValue={{ label: 'Trạng thái', value: '' }}
                options={[
                  { label: 'Hoạt động', value: 'ACTIVE' },
                  { label: 'Đã khóa', value: 'DEACTIVE' },
                  { label: 'Hết hạn', value: 'RESIGNED' },
                ]}
                className='mt-2 rounded-lg border p-[13px]'
              />
            </div>
          </div>
        </div>
        <div className='my-5 flex items-center justify-end gap-5 px-5'>
          <Button
            type='button'
            text='Đặt lại'
            onClick={handleResetForm}
            className='rounded-md border border-[#818da0] px-4 py-1 text-[#818da0] hover:cursor-pointer hover:border-[#2db976] hover:text-[#2db976]'
          />
          <Button
            type='submit'
            text='Áp dụng'
            className='rounded-md border border-[#2db976] bg-[#2db976] px-4 py-1 text-[#fff] hover:cursor-pointer hover:border-[#2db976] hover:opacity-85'
          />
        </div>
      </Form>
    </div>
  );
}
