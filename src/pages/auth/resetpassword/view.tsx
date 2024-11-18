import { useState } from 'react';

import Button from '@/components/button';
import Form from '@/components/form';
import IconRoot from '@/components/icon';
import { IconVariable } from '@/components/icon/types';
import InputRoot from '@/components/input';
import { Loading } from '@/components/loading';

interface IResetPassword {
  isLoading?: boolean;
  handleSubmit: (data: any) => void;
}

function ResetPasswordView({ isLoading = false, handleSubmit }: IResetPassword) {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setIsShowPassword(prev => !prev);
  };
  const [isShowPasswordConfirm, setIsShowPasswordConfirm] = useState(false);
  const togglePasswordConfirmVisibility = () => {
    setIsShowPasswordConfirm(prev => !prev);
  };

  return (
    <Form
      onSubmit={handleSubmit}
      customClassName='mt-4 flex flex-col'>
      {isLoading && <Loading />}
      <div className='mt-8 flex flex-col gap-4'>
        <InputRoot
          name='newPassword'
          label='Mật khẩu mới'
          type={isShowPassword ? 'text' : 'password'}
          placeholder='Nhập mật khẩu mới'
          iconEnd={
            isShowPassword ? (
              <IconRoot
                icon={IconVariable.closeEyes}
                onClick={togglePasswordVisibility}
                className='hover:cursor-pointer hover:opacity-85'
              />
            ) : (
              <IconRoot
                icon={IconVariable.openEyes}
                onClick={togglePasswordVisibility}
                className='hover:cursor-pointer hover:opacity-85'
              />
            )
          }
        />

        <InputRoot
          name='confirmNewPassword'
          label='Xác nhận lại mật khẩu'
          type={isShowPasswordConfirm ? 'text' : 'password'}
          placeholder='Nhập lại mật khẩu mới'
          iconEnd={
            isShowPasswordConfirm ? (
              <IconRoot
                icon={IconVariable.closeEyes}
                onClick={togglePasswordConfirmVisibility}
                className='hover:cursor-pointer hover:opacity-85'
              />
            ) : (
              <IconRoot
                icon={IconVariable.openEyes}
                onClick={togglePasswordConfirmVisibility}
                className='hover:cursor-pointer hover:opacity-85'
              />
            )
          }
        />
      </div>

      <Button
        disabled={false}
        text='Xác nhận'
        type='submit'
        className='mt-8 w-full rounded-lg bg-[#2DB976] py-3 text-white hover:bg-[#1e9159] hover:font-semibold'
      />
    </Form>
  );
}

export default ResetPasswordView;
