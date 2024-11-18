import { useNavigate } from 'react-router-dom';

import Button from '@/components/button';
import Form from '@/components/form';
import IconRoot from '@/components/icon';
import { IconVariable } from '@/components/icon/types';
import InputRoot from '@/components/input';

interface IForgotPassword {
  isLoading?: boolean;
  handleSubmitEmail: (value: any) => void;
  isCheckEmail: boolean;
  isError: boolean;
  setError: (value: any) => void;
  errorStringEmail?: string;

  setOtpValues: (data: any) => void;
  otpValues: string[];
  handleSubmitOTP: (value: any) => void;
  timeResetOTP: number;
  setTimeResetOTP: (value: any) => void;
  isCounting: boolean;
  setIsCounting: (data: boolean) => void;
  errorStringOTP?: string;
}

function ForgotPasswordView(props: IForgotPassword) {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };
  const handleInputChange = (index: number, value: string) => {
    props.setOtpValues((prevValues: string[]) => {
      prevValues[index] = value;
      return [...prevValues];
    });
  };
  return (
    <>
      <div
        className='absolute left-0 top-0 ml-6 mt-4 flex cursor-pointer items-center gap-3'
        onClick={handleGoBack}>
        <IconRoot icon={IconVariable.arrowLeft} />
        <span>Trở về</span>
      </div>

      <div className='mx-20 flex w-full flex-col items-center justify-center gap-4 px-10'>
        <img
          src='src/public/img_forgot_password.png'
          alt='logo forgot password'
          className='h-[180px] w-[280px]'
        />
        <div className='flex flex-col items-center justify-center gap-3'>
          <p className='text-3xl font-bold text-[#1A1A1A]'>Xác thực email</p>
          <p className='text-center text-sm text-[#616161]'>
            {props.isCheckEmail
              ? 'Mã xác thực 6 số đã được gửi đến email bạn vừa nhập'
              : 'Nhập email bạn muốn xác thực'}
          </p>
        </div>
        {props.isError && (
          <div className='mt-2 flex items-center justify-center gap-2'>
            <IconRoot icon={IconVariable.error} />
            <span className='text-sm font-medium text-[#C60808]'>{props.errorStringOTP}</span>
          </div>
        )}
        {props.isCheckEmail ? (
          <div className='flex w-full flex-col gap-2'>
            <p className='text-base font-medium'>Nhập mã xác thực (OTP):</p>
            <div className='flex items-center justify-between'>
              {Array.from({ length: 6 }).map((item, index) => (
                <InputRoot
                  maxLength={1}
                  name={`${index + 1}`}
                  key={index}
                  readOnly={false}
                  onChange={e => {
                    let value = e.target.value;
                    value = value.replace(/\D/g, '');
                    handleInputChange(index, value);
                  }}
                  onKeyDown={e => {
                    if (
                      e.key === 'Backspace' &&
                      (e.target as HTMLInputElement).value === '' &&
                      index > 0 &&
                      index < 6
                    ) {
                      const prevInput = document.querySelector(`input[name="${index}"]`);
                      if (prevInput && prevInput instanceof HTMLInputElement) {
                        prevInput.focus();
                      }
                    }
                  }}
                  onKeyUp={e => {
                    if ((e.target as HTMLInputElement).value.length === 1 && index < 5) {
                      const nextInput = document.querySelector(`input[name="${index + 2}"]`);
                      if (nextInput && nextInput instanceof HTMLInputElement) {
                        nextInput.focus();
                      }
                    }
                  }}
                  value={props.otpValues[index]}
                  className={`w-[40px] ${props.otpValues[index] && 'border-[#2DB976]'} focus:border-2 focus:border-[#2DB976]`}
                  classNameInput='text-center border-[#E0E0E0]'
                />
              ))}
            </div>
            {props.isCounting && (
              <div className='mt-5 flex items-center justify-center gap-2'>
                Gửi lại mã xác thực sau <span className='text-blue-500'>{props.timeResetOTP}</span> giây{' '}
                <IconRoot
                  icon={IconVariable.refresh}
                  className='p-1 hover:rounded-[50%] hover:bg-gray-100 active:bg-gray-200'
                />
              </div>
            )}
          </div>
        ) : (
          <Form
            onSubmit={props.handleSubmitEmail}
            customClassName='flex w-full flex-col gap-8'>
            {!props.isCheckEmail && props.errorStringEmail !== undefined && props.errorStringEmail.length > 0 && (
              <div className='mt-2 flex items-center justify-center gap-2'>
                <IconRoot icon={IconVariable.error} />
                <span className='text-sm font-medium text-[#C60808]'>{props.errorStringEmail}</span>
              </div>
            )}
            <InputRoot
              name='email'
              label='Email'
              isError={props.isCheckEmail && props.errorStringEmail !== undefined && props.errorStringEmail.length > 0}
              iconStart={<IconRoot icon={IconVariable.email} />}
              placeholder='Nhập email'
              className='w-full'
            />
            <Button
              disabled={false}
              text='Tiếp theo'
              type='submit'
              className='w-full rounded-lg bg-[#2DB976] py-3 text-white hover:bg-[#1e9159] hover:font-semibold'
            />
          </Form>
        )}
      </div>
    </>
  );
}

export default ForgotPasswordView;
