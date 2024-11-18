import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { EnumPath } from '@/common/enum/Enums';
import IconRoot from '@/components/icon';
import { IconVariable } from '@/components/icon/types';
import { type IDataEmployeeInfoType } from '@/pages/infoPrivate/type';
import AuthService from '@/utils/Auth';

import ItemDropdownHeader from '../itemDropdown';

interface IDropdownHeaderProps {
  employee?: IDataEmployeeInfoType;
  setOpenDropdown: (value: boolean) => void;
  setOpenModalChangePassword: (value: boolean) => void;
}
function DropdownHeader({ employee, setOpenDropdown, setOpenModalChangePassword }: IDropdownHeaderProps) {
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setOpenDropdown(false);
    }
  };
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    AuthService.handleLogout();
    navigate(EnumPath.login);
  };
  return (
    <div
      ref={dropdownRef}
      className='custom-shadow absolute right-0 top-16 flex w-[240px] flex-col justify-center rounded-md border bg-white p-1'>
      <div
        className='flex cursor-pointer items-center gap-4 rounded-md p-4 hover:bg-gray-300'
        onClick={() => {
          navigate(EnumPath.userProfile);
        }}>
        {employee?.avatarPath ? (
          <img
            src={`https://cdn.tsp.com.vn/staffMetaData/avatar/${employee?.avatarPath}`}
            alt='avatar'
            className='h-10 w-10 rounded-full bg-red-500'
          />
        ) : (
          <div className='flex h-10 w-10 items-center justify-center rounded-full border-[2px] border-[#3c9d66] bg-[##F1F6FD]'>
            <IconRoot icon={IconVariable.avatarDefault} />
          </div>
        )}
        <div className='flex flex-col'>
          <span className='text-base font-semibold text-[#344054]'>{employee?.fullName ?? 'Không có thông tin'}</span>
          <span className='text-sm font-normal text-[#475467]'>
            {employee?.staffMetaDataCode ?? 'Không có thông tin'}
          </span>
        </div>
      </div>
      <hr />
      <div className='flex flex-col gap-y-1 px-4 py-2'>
        <ItemDropdownHeader
          onClick={() => {
            navigate(EnumPath.userProfile);
          }}
          iconStart={<IconRoot icon={IconVariable.userPrivate} />}
          title='Trang cá nhân'
        />
        <ItemDropdownHeader
          onClick={() => {
            setOpenDropdown(false);
            setOpenModalChangePassword(true);
          }}
          iconStart={<IconRoot icon={IconVariable.changePassword} />}
          title='Đổi mật khẩu'
        />
      </div>
      <hr />
      <ItemDropdownHeader
        onClick={handleLogout}
        iconStart={<IconRoot icon={IconVariable.logoutRed} />}
        title='Đăng xuất'
        className='mx-4 my-2 text-[#D92D20]'
      />
    </div>
  );
}

export default DropdownHeader;
