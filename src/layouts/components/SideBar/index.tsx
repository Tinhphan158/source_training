import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { EnumPath, EnumSidebar } from '@/common/enum/Enums';
import IconRoot from '@/components/icon';
import { IconVariable } from '@/components/icon/types';
import { Localize } from '@/context/languages';
import AuthService from '@/utils/Auth';
import { getLastNameInitial } from '@/utils/GetLastNameInitial';

import { type IItemSideBar, ItemSideBar } from './ItemSideBar';

interface ISideBarProps extends React.HTMLProps<HTMLDivElement> {
  className?: string;
}
const itemSidebar: IItemSideBar[] = [
  {
    id: 0,
    to: EnumPath.home,
    title: EnumSidebar.home,
    iconStart: <IconRoot icon={IconVariable.home} />,
  },
  {
    id: 1,
    to: EnumPath.department,
    title: EnumSidebar.department,
    iconStart: <IconRoot icon={IconVariable.department} />,
  },
  {
    id: 2,
    to: EnumPath.listEmployees,
    title: EnumSidebar.employees,
    iconStart: <IconRoot icon={IconVariable.employee} />,
  },
  {
    id: 3,
    to: EnumPath.contracts,
    title: EnumSidebar.contracts,
    iconStart: <IconRoot icon={IconVariable.contract} />,
  },
  {
    id: 4,
    to: EnumPath.help,
    title: EnumSidebar.help,
    iconStart: <IconRoot icon={IconVariable.help} />,
  },
];
export function SideBarHR(props: ISideBarProps) {
  const [activeItem, setActiveItem] = useState<number>(0);

  const navigate = useNavigate();

  const handleLogOut = () => {
    AuthService.handleLogout();
    navigate(EnumPath.login);
  };
  const profile = AuthService.getPackageProfile();

  const { className, ...rest } = props;

  return (
    <div
      className={`flex flex-col border bg-[#289E65] px-4 py-10 ${className}`}
      {...rest}>
      <Link
        to={EnumPath.home}
        className='outline-none hover:cursor-pointer'>
        <div className='flex items-center justify-center gap-2 '>
          <img
            src='./src/public/logo_cty.png'
            alt='logo cty'
            className='h-[60px] w-[87px] rounded-[8px] border-[2px] border-white'
          />
          <div className='text-[18px] font-bold leading-[22px] text-white'>
            <p>HR</p>
            <p>Management</p>
          </div>
        </div>
        <hr className='mt-4 border-[#c8c8c8]' />
      </Link>

      <Link
        to={EnumPath.userProfile}
        onClick={() => {
          setActiveItem(5);
        }}>
        <div
          className={`mt-[20px] flex items-center justify-between rounded-[12px] ${activeItem === 5 && 'border border-white'} bg-[#a9d8c1] p-2 hover:cursor-pointer`}>
          <div className='flex items-center justify-center gap-2'>
            <div className='flex h-10 w-10 items-center justify-center rounded-full border-[2px] border-white bg-[#289E65] font-medium text-white'>
              {getLastNameInitial(profile?.fullName || 'Unknow')}
            </div>
            <div className='flex flex-col'>
              <span className='text-[14px] font-medium leading-[18px] text-[#1A1A1A]'>
                {profile?.fullName || 'No name'}
              </span>
              <span className='text-[12px] font-normal leading-[16px] text-[#484848]'>
                {profile?.isCustomer ? 'Khách hàng' : 'Nhân viên'}
              </span>
            </div>
          </div>
          <IconRoot
            className='inline '
            icon={IconVariable.caret}
          />
        </div>
      </Link>

      <div className='my-[20px] flex flex-col'>
        {itemSidebar.map(item => (
          <ItemSideBar
            key={item.id}
            id={item.id}
            onClick={() => {
              setActiveItem(item.id);
            }}
            iconStart={item.iconStart}
            to={item.to}
            title={item.title}
            className={`mt-2 font-medium text-white hover:bg-[#1e724ada] ${item.id === 3 && 'mt-2 font-normal text-[#C8ECDA] '} ${activeItem === item.id && 'border border-white'}`}
          />
        ))}
      </div>

      <div
        onClick={handleLogOut}
        className={`mt-10 bg-[#1e724ada] p-4 text-center font-medium text-white hover:cursor-pointer hover:bg-[#1e7249f3]`}>
        <Localize tid='logout' />
      </div>
    </div>
  );
}
