import { useState } from 'react';
import * as yup from 'yup';

import { type IApiRequest } from '@/api/api.interface';
import { useRequest } from '@/api/api.middleware';
import Button from '@/components/button';
import Form from '@/components/form';
import IconRoot from '@/components/icon';
import { IconVariable } from '@/components/icon/types';
import InputRoot from '@/components/input';
import toastDefault, { EnumToast } from '@/components/toast';
import Config from '@/env';
import AuthService from '@/utils/Auth';

interface IModalChangePasswordProps {
  setOpenModalChangePassword: (value: boolean) => void;
}
function ModalChangePassword({ setOpenModalChangePassword }: IModalChangePasswordProps) {
  const [isVisibleOldPassword, setVisibleOldPassword] = useState<boolean>(false);
  const [isVisibleNewPassword, setVisibleNewPassword] = useState<boolean>(false);
  const [isVisibleConfirmNewPassword, setVisibleConfirmNewPassword] = useState<boolean>(false);

  const profile = AuthService.getPackageProfile();
  const config = new Config().getState();

  const updatePasswordApi: IApiRequest = {
    url: `${config.api.apiPath.core}/${profile.staffId}/updatePassword`,
    method: 'put',
    headers: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': 'application/json',
      Authorization: `Bearer ${AuthService.getPackageAuth()}`,
    },
  };
  const handleResponseUpdatePassword = {
    handleRequestSuccess: (response: any) => {
      try {
        if (response.code === 2000) {
          toastDefault(EnumToast.SUCCESS, 'Cập nhật mật khẩu thành công');
          handleCloseModal();
        }
      } catch (error: any) {
        toastDefault(EnumToast.ERROR, 'Cập nhật mật khẩu thất bại', error.message);
        console.log(error);
      }
    },
    handleRequestFailed: (response: any) => {
      toastDefault(EnumToast.ERROR, 'Lỗi khi gửi yêu cầu');
      console.log('Lỗi khi gửi yêu cầu.', response.code);
    },
  };
  const { mutate: mutateUpdatePassword } = useRequest(updatePasswordApi, handleResponseUpdatePassword);

  const handleSubmit = (data: any) => {
    const body = {
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    };
    mutateUpdatePassword({ ...body });
  };
  const handleCloseModal = () => {
    setOpenModalChangePassword(false);
  };

  return (
    <div
      className='fixed inset-0 z-[100] flex items-start justify-center bg-overlay-modal'
      onClick={handleCloseModal}>
      <div
        className='mt-[140px] flex w-[90%] flex-col gap-y-5 rounded-2xl bg-white p-8 sm:w-[70%] lg:w-[40%] xl:w-[30%]'
        onClick={e => {
          e.stopPropagation();
        }}>
        <div className='flex items-center justify-between'>
          <span className='select-none text-xl font-semibold'>Đổi mật khẩu</span>
          <span
            onClick={handleCloseModal}
            className='flex h-12 w-12 cursor-pointer select-none items-center justify-center rounded-md text-xl font-semibold text-gray-400 hover:bg-gray-200 hover:text-black'>
            &#x2715;
          </span>
        </div>
        <Form
          onSubmit={handleSubmit}
          validator={{
            oldPassword: yup
              .string()
              .trim()
              .typeError('Vui lòng nhập mật khẩu hiện tại')
              .required('Vui lòng nhập mật khẩu hiện tại')
              .min(6, 'Mật khẩu phải tối thiểu 6 ký tự'),
            newPassword: yup
              .string()
              .trim()
              .typeError('Vui lòng nhập mật khẩu mới')
              .required('Vui lòng nhập mật khẩu mới')
              .min(6, 'Mật khẩu mới phải tối thiểu 6 ký tự'),
            confirmNewPassword: yup
              .string()
              .trim()
              .oneOf([yup.ref('newPassword')], 'Mật khẩu xác nhận không khớp')
              .typeError('Vui lòng nhập lại mật khẩu mới')
              .required('Vui lòng nhập lại mật khẩu mới')
              .min(6, 'Mật khẩu mới phải tối thiểu 6 ký tự'),
          }}>
          <div className='flex flex-col gap-y-4'>
            <InputRoot
              label='Mật khẩu hiện tại'
              isRequire={true}
              name='oldPassword'
              classNameLabel='font-normal select-none text-base'
              iconStart={<IconRoot icon={IconVariable.changePasswordModal} />}
              type={isVisibleOldPassword ? 'text' : 'password'}
              iconEnd={
                <IconRoot
                  onClick={() => {
                    setVisibleOldPassword(!isVisibleOldPassword);
                  }}
                  icon={isVisibleOldPassword ? IconVariable.closeEyes : IconVariable.openEyes}
                />
              }
            />
            <InputRoot
              label='Mật khẩu mới'
              isRequire={true}
              name='newPassword'
              classNameLabel='font-normal select-none text-base'
              iconStart={<IconRoot icon={IconVariable.changePasswordModal} />}
              type={isVisibleNewPassword ? 'text' : 'password'}
              iconEnd={
                <IconRoot
                  onClick={() => {
                    setVisibleNewPassword(!isVisibleNewPassword);
                  }}
                  icon={isVisibleNewPassword ? IconVariable.closeEyes : IconVariable.openEyes}
                />
              }
            />
            <InputRoot
              label='Nhập lại mật khẩu mới'
              isRequire={true}
              name='confirmNewPassword'
              classNameLabel='font-normal select-none text-base'
              iconStart={<IconRoot icon={IconVariable.changePasswordModal} />}
              type={isVisibleConfirmNewPassword ? 'text' : 'password'}
              iconEnd={
                <IconRoot
                  onClick={() => {
                    setVisibleConfirmNewPassword(!isVisibleConfirmNewPassword);
                  }}
                  icon={isVisibleConfirmNewPassword ? IconVariable.closeEyes : IconVariable.openEyes}
                />
              }
            />
          </div>
          <div className='mt-6 flex items-center justify-end gap-5'>
            <Button
              type='button'
              text='Đóng'
              onClick={handleCloseModal}
              className='w-20 rounded-md border border-[#818da0] px-4 py-1 text-center text-base font-normal text-[#818da0] hover:cursor-pointer hover:border-[#2db976] hover:text-[#2db976]'
            />
            <Button
              type='submit'
              text='Lưu'
              className='w-20 rounded-md border border-[#2db976] bg-[#2db976] px-4 py-1 text-center text-base font-normal text-[#fff] hover:cursor-pointer hover:border-[#2db976] hover:opacity-85'
            />
          </div>
        </Form>
      </div>
    </div>
  );
}

export default ModalChangePassword;
