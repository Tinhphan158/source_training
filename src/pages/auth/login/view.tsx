import { useState } from 'react';
import * as yup from 'yup';

import Button from '@/components/button';
import Form from '@/components/form';
import IconRoot from '@/components/icon';
import { IconVariable } from '@/components/icon/types';
import InputRoot from '@/components/input';
import { Loading } from '@/components/loading';
import TextLink from '@/components/textlink';

interface ILogin {
  isLoading?: boolean;
  handleSubmit: (data: any) => void;
}
function LoginView({ isLoading = false, handleSubmit }: ILogin) {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setIsShowPassword(prev => !prev);
  };
  return (
    <Form
      onSubmit={handleSubmit}
      customClassName='flex flex-col'
      validator={{
        username: yup
          .string()
          .trim()
          .typeError('Vui lòng nhập username để đăng nhập')
          .required('Vui lòng nhập username để đăng nhập'),
        password: yup
          .string()
          .trim()
          .typeError('Vui lòng nhập mật khẩu để đăng nhập')
          .required('Vui lòng nhập mật khẩu để đăng nhập'),
      }}>
      {isLoading && <Loading />}
      <div className='mt-6 flex flex-col gap-4'>
        <InputRoot
          label='Tên đăng nhập'
          placeholder='Nhập tên đăng nhập'
          name='username'
        />
        <InputRoot
          label='Mật khẩu'
          name='password'
          type={isShowPassword ? 'text' : 'password'}
          placeholder='Nhập mật khẩu'
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
      </div>
      <TextLink
        to='/forgot-password'
        text='Quên mật khẩu?'
        className='float-right mt-2 text-[#2DB976]'
      />
      <Button
        disabled={false}
        text='Đăng nhập'
        type='submit'
        className='z-[1000] mt-8 w-full rounded-lg bg-[#2DB976] py-3 text-white hover:bg-[#198350]'
      />
    </Form>
  );
}

export default LoginView;
