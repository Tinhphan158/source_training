import { useState } from 'react';
import * as yup from 'yup';

import { type IApiRequest } from '@/api/api.interface';
import { useRequest } from '@/api/api.middleware';
import Button from '@/components/button';
import Form from '@/components/form';
import InputRoot from '@/components/input';
import Modal from '@/components/modal';
import SelectRoot from '@/components/select';
import toastDefault, { EnumToast } from '@/components/toast';
import Config from '@/env';
import AuthService from '@/utils/Auth';

import { type IDataSubmitDepartmentType } from '../../type';

interface IModalDepartmentProps {
  setIsOpenModal: (value: boolean) => void;
  initialValues: IDataSubmitDepartmentType;
  getAllDepartments: () => Promise<void>;
  setIsLoading?: (value: boolean) => void;
  setIsModalUpdate?: (value: boolean) => void;
  isModalUpdate?: boolean;
  setInitialValues: (value: any) => void;
  setDepartmentIdSelected: (value: number) => void;
  departmentIdSelected?: number;
}

const arrBlockForTimesheet = [
  { label: 'Văn phòng', value: 'OFFICE' },
  { label: 'Nhà Máy', value: 'FACTORY' },
  { label: 'Tài xế & Áp tải', value: 'DRIVER' },
  { label: 'Giao nhận', value: 'DELIVERY' },
];
function ModalDepartment({
  initialValues,
  isModalUpdate,
  departmentIdSelected,
  setIsModalUpdate,
  setDepartmentIdSelected,
  setInitialValues,
  setIsOpenModal,
  getAllDepartments,
  setIsLoading,
}: IModalDepartmentProps) {
  const [isOpenModalLock, setOpenModalLock] = useState(false);
  const [isOpenModalUnLock, setOpenModalUnLock] = useState(false);
  const phoneRegExp = /(84|0[357-9|])+(\d{8})\b/g;
  const config = new Config().getState();

  const handleCloseModal = () => {
    setIsOpenModal(false);
    setInitialValues({});
    setDepartmentIdSelected(0);
    setIsModalUpdate && setIsModalUpdate(false);
  };

  // add department
  const addNewDepartmentApi: IApiRequest = {
    url: `${config.api.apiPath.apiDepartment}`,
    method: 'post',
    headers: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': 'application/json',
      Authorization: `Bearer ${AuthService.getPackageAuth()}`,
    },
  };
  const handleResponseNewDepartment = {
    handleRequestSuccess: (response: any) => {
      try {
        setIsLoading && setIsLoading(true);
        if (response.code === 2000) {
          toastDefault(EnumToast.SUCCESS, 'Thêm phòng ban mới thành công');
          getAllDepartments();
          setIsOpenModal(false);
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
  const { mutate: mutateAddNewDepartment } = useRequest(addNewDepartmentApi, handleResponseNewDepartment);
  // update department
  const updateDepartmentApi: IApiRequest = {
    url: `${config.api.apiPath.apiDepartment}/${departmentIdSelected}`,
    method: 'put',
    headers: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': 'application/json',
      Authorization: `Bearer ${AuthService.getPackageAuth()}`,
    },
  };
  const handleResponseUpdateDepartment = {
    handleRequestSuccess: (response: any) => {
      try {
        setIsLoading && setIsLoading(true);
        if (response.code === 2000) {
          toastDefault(EnumToast.SUCCESS, 'cập nhật thành công');
          getAllDepartments();
          setIsOpenModal(false);
          setInitialValues({});
          setDepartmentIdSelected(0);
          setIsModalUpdate && setIsModalUpdate(false);
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
  const { mutate: mutateUpdateDepartment } = useRequest(updateDepartmentApi, handleResponseUpdateDepartment);

  const handleSubmit = (data: IDataSubmitDepartmentType) => {
    if (isModalUpdate) {
      mutateUpdateDepartment({ ...data });
    } else {
      mutateAddNewDepartment({ ...data });
    }
  };

  // lock department
  const lockDepartmentApi: IApiRequest = {
    url: `${config.api.apiPath.apiDepartment}/${departmentIdSelected}/deactivate`,
    method: 'post',
    headers: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': 'application/json',
      Authorization: `Bearer ${AuthService.getPackageAuth()}`,
    },
  };
  const handleResponseLockDepartment = {
    handleRequestSuccess: (response: any) => {
      try {
        setIsLoading && setIsLoading(true);
        if (response.code === 2000) {
          toastDefault(EnumToast.SUCCESS, 'Khóa phòng ban thành công');
          getAllDepartments();
          setIsOpenModal(false);
          setInitialValues({});
          setDepartmentIdSelected(0);
          setIsModalUpdate && setIsModalUpdate(false);
          setOpenModalLock(false);
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
  const { mutate: mutateLockDepartment } = useRequest(lockDepartmentApi, handleResponseLockDepartment);
  const handleClickLock = () => {
    mutateLockDepartment({});
  };

  // unlock department
  const unlockDepartmentApi: IApiRequest = {
    url: `${config.api.apiPath.apiDepartment}/${departmentIdSelected}/activate`,
    method: 'post',
    headers: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': 'application/json',
      Authorization: `Bearer ${AuthService.getPackageAuth()}`,
    },
  };
  const handleResponseUnlockDepartment = {
    handleRequestSuccess: (response: any) => {
      try {
        setIsLoading && setIsLoading(true);
        if (response.code === 2000) {
          toastDefault(EnumToast.SUCCESS, 'Mở khóa phòng ban thành công');
          getAllDepartments();
          setIsOpenModal(false);
          setInitialValues({});
          setDepartmentIdSelected(0);
          setIsModalUpdate && setIsModalUpdate(false);
          setOpenModalUnLock(false);
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
  const { mutate: mutateUnlockDepartment } = useRequest(unlockDepartmentApi, handleResponseUnlockDepartment);
  const handleClickUnlock = () => {
    mutateUnlockDepartment({});
  };

  return (
    <>
      <Modal
        isOpenModal={isOpenModalLock}
        setIsOpenModal={setOpenModalLock}
        title='Khóa phòng ban'
        content='Xác nhận khóa phòng ban'
        onClose={() => {
          setOpenModalLock(false);
        }}
        onConfirm={handleClickLock}
      />
      <Modal
        isOpenModal={isOpenModalUnLock}
        setIsOpenModal={setOpenModalUnLock}
        title='Mở khóa phòng ban'
        content='Xác nhận mở khóa phòng ban'
        onClose={() => {
          setOpenModalUnLock(false);
        }}
        onConfirm={handleClickUnlock}
      />
      <Form
        defaultValues={{
          code: initialValues.code,
          name: initialValues.name,
          phoneNumber: initialValues.phoneNumber,
          note: initialValues.note,
          blockForTimesheet: initialValues.blockForTimesheet,
        }}
        validator={{
          code: yup.string().typeError('Vui lòng nhập mã phòng ban').required('Vui lòng nhập mã phòng ban'),
          name: yup.string().typeError('Vui lòng nhập tên phòng ban').required('Vui lòng nhập tên phòng ban'),
          blockForTimesheet: yup
            .string()
            .typeError('Vui lòng chọn khối phòng ban')
            .required('Vui lòng chọn khối phòng ban'),
          phoneNumber: yup
            .string()
            .nullable()
            .transform((value, originalValue) => (originalValue === '' ? null : value))
            .notRequired()
            .matches(phoneRegExp, 'Số điện thoại không hợp lệ'),
        }}
        onSubmit={handleSubmit}>
        <div className='fixed inset-0 z-50 flex items-center justify-center'>
          <div
            className='fixed inset-0 bg-[#000] opacity-40'
            onClick={handleCloseModal}
          />

          <div
            className='relative z-50 w-[90%] rounded-xl bg-white px-8 py-4 text-black sm:w-[65%] xl:w-[54%]'
            onClick={e => {
              e.stopPropagation();
            }}>
            <div className='flex-col justify-between'>
              <div>
                <div className='pt-1'>
                  <p className='font-medium'>{isModalUpdate ? 'Chi tiết phòng ban' : 'Thêm phòng ban'}</p>
                </div>

                <div className='my-6 border-y py-5'>
                  <div className='flex gap-6'>
                    <div className='w-[50%]'>
                      <InputRoot
                        isRequire={true}
                        name='code'
                        className='h-9 bg-white p-1 text-sm'
                        label='Mã phòng ban'
                        placeholder='Mã phòng ban'
                        classNameLabel='text-[#344054] text-sm font-normal'
                      />
                    </div>
                    <div className='w-[50%]'>
                      <InputRoot
                        isRequire={true}
                        name='name'
                        className='h-9 bg-white p-1 text-sm'
                        label='Tên phòng ban'
                        placeholder='Tên phòng ban'
                        classNameLabel='text-[#344054] text-sm font-normal'
                      />
                    </div>
                  </div>

                  <div className='flex gap-6'>
                    <div className='w-[50%]'>
                      <InputRoot
                        name='phoneNumber'
                        className='h-9 bg-white p-1 text-sm'
                        label='Số điện thoại'
                        placeholder='Số điện thoại'
                        classNameLabel='text-[#344054] text-sm font-normal'
                      />
                    </div>
                    <div className='w-[50%]'>
                      <p className='text-sm font-normal text-[#344054]'>
                        <span className='text-red-500'>*</span> Khối
                      </p>
                      <SelectRoot
                        className='mt-2 flex h-9 justify-between rounded-lg border bg-white p-1 text-sm'
                        classNameOptionList='top-8 max-h-[226px] overflow-y-auto'
                        options={arrBlockForTimesheet}
                        firstValue={
                          initialValues.blockForTimesheet
                            ? arrBlockForTimesheet.find(item => item.value === initialValues.blockForTimesheet)
                            : { label: 'Chọn khối', value: '' }
                        }
                        name='blockForTimesheet'
                      />
                    </div>
                  </div>

                  <InputRoot
                    name='note'
                    className='h-9 bg-white p-1 text-sm'
                    label='Ghi chú'
                    placeholder='Ghi chú'
                    classNameLabel='text-[#344054] text-sm font-normal'
                  />
                </div>
              </div>

              <div className='flex items-center justify-end'>
                {isModalUpdate &&
                  (initialValues?.active ? (
                    <div className='mb-[28px] flex items-center'>
                      <Button
                        text='Khóa'
                        type='button'
                        onClick={() => {
                          setOpenModalLock(true);
                        }}
                        className='w-20 rounded-lg border-[1.6px] border-[#db3636] bg-[#db3636] px-4 py-1 font-medium text-[#fff] hover:cursor-pointer hover:opacity-85'
                      />
                    </div>
                  ) : (
                    <div className='mb-[28px] flex items-center'>
                      <Button
                        text='Mở khóa'
                        onClick={() => {
                          setOpenModalUnLock(true);
                        }}
                        type='button'
                        className='w-28 rounded-lg border-[1.6px] border-[#2db976] bg-[#2db976] px-4 py-1 font-medium text-[#fff] hover:cursor-pointer hover:opacity-85'
                      />
                    </div>
                  ))}
                <div className='mx-4 mb-[28px] flex items-center justify-center gap-6 sm:mx-8 sm:justify-end'>
                  <Button
                    type='button'
                    onClick={handleCloseModal}
                    text='Đóng'
                    className='ml-2 w-20 rounded-lg border-[1.6px] border-[#98a2b3] bg-white px-4 py-1 font-medium text-[#5b5f66] hover:cursor-pointer hover:border-[#2db976] hover:text-[#2db976]'
                  />
                  <Button
                    type='submit'
                    text='Lưu'
                    className='w-20 rounded-lg border-[1.6px] border-[#2db976] bg-[#2db976] px-4 py-1 font-medium text-[#fff] hover:cursor-pointer hover:opacity-85'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Form>
    </>
  );
}

export default ModalDepartment;
