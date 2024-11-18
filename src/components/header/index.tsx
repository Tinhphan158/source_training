import { useEffect, useRef, useState } from 'react';

import { type IApiRequest } from '@/api/api.interface';
import { useRequest } from '@/api/api.middleware';
import Config from '@/env';
import useClickOutside from '@/hooks/useClickOutside';
import { type IDataEmployeeInfoType, type IResponseDataEmployeeInfoAPIType } from '@/pages/infoPrivate/type';
import AuthService from '@/utils/Auth';

import IconRoot from '../icon';
import { IconVariable } from '../icon/types';
import DropdownHeader from './components/dropdown';
import ModalChangePassword from './components/modalChangePassword';

interface IHeaderProps extends React.HTMLProps<HTMLDivElement> {
  iconStart?: React.ReactNode;
  iconEnd?: React.ReactNode;
  title?: string;
  className?: string;
}

export function Header({ className, title, iconStart, iconEnd, ...rest }: IHeaderProps) {
  const [isOpenChatbox, setOpenChatbox] = useState<boolean>(false);
  const profile = AuthService.getPackageProfile();
  const [isOpenDropdown, setOpenDropdown] = useState<boolean>(false);
  const [isOpenModalChangePassword, setOpenModalChangePassword] = useState<boolean>(false);
  const [employee, setEmployee] = useState<IDataEmployeeInfoType | undefined>({
    staffMetaDataCode: profile?.staffId || '',
    phoneNumber: profile?.phoneNumber || '',
    email: profile?.email || '',
    departmentName: profile?.department || '',
    fullName: profile?.fullName || '',
  });
  const config = new Config().getState();
  const getEmployeeByIdApi: IApiRequest = {
    url: `${config.api.apiPath.apiEmployee}/info/${profile?.staffMetaDataId}`,
    method: 'get',
    headers: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': 'application/json',
      Authorization: `Bearer ${AuthService.getPackageAuth()}`,
    },
  };
  const handleResponseDetailEmployee = {
    handleRequestSuccess: (response: IResponseDataEmployeeInfoAPIType) => {
      try {
        if (response.code === 2000) {
          setEmployee(response.data);
        }
      } catch (error: any) {
        console.log(error);
      }
    },
    handleRequestFailed: (response: any) => {
      console.log('Lỗi khi gửi yêu cầu.', response.code);
    },
  };
  const { mutate: mutateGetEmployeeById } = useRequest(getEmployeeByIdApi, handleResponseDetailEmployee);
  useEffect(() => {
    if (profile.staffMetaDataId) {
      mutateGetEmployeeById({});
    }
  }, []);
  const refSelectChatbox = useRef(null);
  useClickOutside(refSelectChatbox, () => {
    setOpenChatbox(false);
  });

  return (
    <>
      {isOpenModalChangePassword && <ModalChangePassword setOpenModalChangePassword={setOpenModalChangePassword} />}
      <div
        className={`sticky right-0 top-0 z-50 flex items-center justify-between gap-[10px] border-y bg-white px-10 py-6 ${className} `}
        {...rest}>
        <div>
          <div className='flex items-center gap-5'>
            {iconStart} {title}
          </div>
          {iconEnd}
        </div>
        <div className='relative flex items-center gap-10'>
          <div
            ref={refSelectChatbox}
            onClick={() => {
              setOpenChatbox(!isOpenChatbox);
            }}
            className={`w-[200px] select-none rounded-lg ${isOpenChatbox ? 'bg-red-600' : 'bg-[#18a561da]'}  p-4 text-center text-base text-white hover:cursor-pointer hover:opacity-90`}>
            {isOpenChatbox ? 'Đóng chatbox test' : 'Bật chatbox test'}
          </div>
          {isOpenChatbox && (
            <div className='absolute right-1 top-16 z-50 border'>
              <iframe
                allow='microphone;'
                width='400'
                height='500'
                src='https://console.dialogflow.com/api-client/demo/embedded/8ecb2a6e-2402-4359-af5d-4769ab94f791'></iframe>
            </div>
          )}
          <div
            className='flex cursor-pointer select-none items-center gap-3'
            onClick={() => {
              setOpenDropdown(!isOpenDropdown);
            }}>
            {employee?.avatarPath ? (
              <img
                src={`https://cdn.tsp.com.vn/staffMetaData/avatar/${employee?.avatarPath}`}
                alt='avatar'
                className='h-11 w-11 rounded-full'
              />
            ) : (
              <div className='flex h-11 w-11 items-center justify-center rounded-full border-[2px] border-[#3c9d66] bg-[##F1F6FD]'>
                <IconRoot icon={IconVariable.avatarDefault} />
              </div>
            )}
            {isOpenDropdown ? <IconRoot icon={IconVariable.arrowDown} /> : <IconRoot icon={IconVariable.arrowUp} />}
          </div>
          {isOpenDropdown && (
            <DropdownHeader
              employee={employee}
              setOpenDropdown={setOpenDropdown}
              setOpenModalChangePassword={setOpenModalChangePassword}
            />
          )}
        </div>
      </div>
    </>
  );
}
