import { useRef, useState } from 'react';

import Button from '@/components/button';
import Form, { type IFormRef } from '@/components/form';
import InputRoot from '@/components/input';
import SelectRoot, { type IOption } from '@/components/select';

export interface IFilterType {
  position: string;
  taxCode: string;
  socialInsuranceCode: string;
  status: string;
  departmentCode: string;
}
interface IModalFilterProps {
  handleSubmitFormFilter: (value: any) => void;
  listDepartment: IOption[];
  initialValues: IFilterType;
}
export function ModalFilter({ handleSubmitFormFilter, listDepartment, initialValues }: IModalFilterProps) {
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
          taxCode: initialValues.taxCode,
          socialInsuranceCode: initialValues.socialInsuranceCode,
          status: initialValues.status,
          departmentCode: initialValues.departmentCode,
        }}
        onSubmit={handleSubmitFormFilter}>
        <div className='flex gap-5 p-4'>
          <div className='w-[50%]'>
            <InputRoot
              isReset={isReset}
              name='position'
              placeholder='Chức vụ'
              label='Chức vụ'
              classNameLabel='text-start font-normal text-[15px] ml-1'
            />
            <InputRoot
              isReset={isReset}
              name='taxCode'
              placeholder='Mã số thuế'
              label='MST'
              classNameLabel='text-start font-normal text-[15px] ml-1 mt-4'
            />
            <div className='mt-4'>
              <p className='ml-1 text-start text-[15px] font-normal'>Trạng thái</p>
              <SelectRoot
                isReset={isReset}
                name='status'
                firstValue={{ label: 'Trạng thái', value: '' }}
                options={[
                  { label: 'Hoạt động', value: 'ACTIVE' },
                  { label: 'Đã khóa', value: 'DEACTIVE' },
                  { label: 'Nghỉ việc', value: 'RESIGNED' },
                ]}
                className='mt-2 rounded-lg border p-[10px]'
              />
            </div>
          </div>
          <div className='w-[50%]'>
            <InputRoot
              isReset={isReset}
              name='socialInsuranceCode'
              placeholder='BHXH'
              label='BHXH'
              classNameLabel='text-start font-normal text-[15px] ml-1'
            />
            <div className='mt-4'>
              <p className='ml-1 text-start text-[15px] font-normal'>Phòng ban</p>
              <SelectRoot
                isReset={isReset}
                firstValue={{ label: 'Phòng ban', value: '' }}
                options={listDepartment}
                name='departmentCode'
                className='mt-2 rounded-lg border p-[10px]'
                classNameOptionList='max-h-40'
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
