import { useState } from 'react';

import Button from '@/components/button';
import IconRoot from '@/components/icon';
import { IconVariable } from '@/components/icon/types';

import InfoFieldColumn from './components/infoFieldColumn';
import InfoFieldRow from './components/infoFieldRow';
import { type IDataEmployeeInfoType } from './type';

interface IInfoPrivateProps {
  data?: IDataEmployeeInfoType;
  avatar?: string;
  handleAvatarChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
function InfoPrivateView({ data, avatar, handleAvatarChange }: IInfoPrivateProps) {
  const [isOpen, setOpen] = useState<boolean>(true);

  return (
    <div className='flex h-full flex-col'>
      <div className='p-3'>
        <div className='flex-col items-center justify-center rounded-xl bg-white p-10'>
          <div>
            <div className='flex items-center justify-between'>
              <span className='text-base font-semibold leading-[28px] text-[#344054] sm:text-lg'>
                Thông tin cá nhân
              </span>
              <Button
                text={isOpen ? 'Đóng' : 'Mở'}
                onClick={() => {
                  setOpen(!isOpen);
                }}
                className={`${isOpen ? 'w-16 cursor-pointer rounded-md border-[2px] border-gray-400 px-2 py-1 text-center text-sm font-medium text-gray-400 hover:border-[#3c9d66] hover:text-[#3c9d66] sm:w-20 sm:px-4 sm:py-2 sm:text-base' : 'w-16 cursor-pointer rounded-md border-[2px] border-[#3c9d66] bg-[#3c9d66] px-2 py-1 text-center text-sm font-medium text-white hover:opacity-85 sm:w-20 sm:px-4 sm:py-2 sm:text-base'}`}
              />
            </div>
            <hr className='mt-5 w-full border' />
            {
              <div
                className={`overflow-hidden transition-[height] duration-700 ease-in-out ${
                  isOpen ? 'max-h-screen' : 'max-h-0'
                }`}>
                <div className='my-6 flex flex-col items-center gap-10 lg:flex-row lg:gap-16 xl:gap-20 2xl:gap-40'>
                  <div className='inline-flex flex-col items-center justify-center'>
                    <input
                      type='file'
                      accept='image/*'
                      onChange={handleAvatarChange}
                      className='hidden'
                      id='avatar-upload'
                    />
                    <label
                      htmlFor='avatar-upload'
                      className='cursor-pointer'>
                      {avatar ? (
                        <img
                          src={avatar}
                          alt='avatar'
                          className='h-24 w-24 rounded-full'
                        />
                      ) : (
                        <div className='flex h-24 w-24 items-center justify-center rounded-full border-[2px] border-[#3c9d66] bg-[##F1F6FD]'>
                          <IconRoot icon={IconVariable.avatarDefault} />
                        </div>
                      )}
                    </label>
                    <label
                      htmlFor='avatar-upload'
                      className='mt-2 cursor-pointer rounded-md border border-[#F1F6FD] bg-[#F1F6FD] px-4 py-2 text-center text-sm font-semibold text-[#3c9d66] hover:border-[#3c9d66]'>
                      Đổi ảnh đại diện
                    </label>
                  </div>

                  <div className='inline-flex flex-col justify-center gap-y-4'>
                    <div className='flex items-center gap-2'>
                      <span className='text-2xl font-semibold text-[#344054]'>
                        {data?.fullName ?? 'Không có thông tin'}
                      </span>
                      <div className='flex h-[32px] items-center justify-center rounded-2xl bg-[#FEF0C7] px-3 py-1 text-sm font-medium text-[#344054]'>
                        {data?.staffMetaDataLevel ?? 'Không có thông tin'}
                      </div>
                    </div>
                    <InfoFieldRow
                      icon={<IconRoot icon={IconVariable.cake} />}
                      content={data?.birthDate ?? 'Không có thông tin'}
                    />
                    <InfoFieldRow
                      icon={<IconRoot icon={IconVariable.gender} />}
                      content={data?.gender === null ? 'Không có thông tin' : data?.gender === 'MALE' ? 'Nam' : 'Nữ'}
                    />
                    <InfoFieldRow
                      icon={<IconRoot icon={IconVariable.office} />}
                      content={data?.departmentName ?? 'Không có thông tin'}
                    />
                  </div>

                  <div className='inline-flex flex-col justify-center gap-y-4'>
                    <InfoFieldRow
                      icon={<IconRoot icon={IconVariable.phoneProfile} />}
                      content={data?.phoneNumber ?? 'Không có thông tin'}
                    />
                    <InfoFieldRow
                      icon={<IconRoot icon={IconVariable.mail} />}
                      content={data?.email ?? 'Không có thông tin'}
                    />

                    <InfoFieldRow
                      icon={<IconRoot icon={IconVariable.calendar} />}
                      content={`Ngày vào làm: ${data?.hireDate ?? 'Không có thông tin'}`}
                    />
                  </div>
                </div>
                <hr className='mt-5 w-full border' />
                <div className='mt-8'>
                  <p className='text-base font-semibold leading-[28px] text-[#344054] sm:text-lg'>Thông tin hợp đồng</p>
                  <div className='mt-5 flex flex-col items-center gap-10 lg:gap-8 xl:flex-row xl:gap-20 2xl:gap-40'>
                    <InfoFieldColumn
                      title='Chức vụ'
                      content={data?.position ?? 'Không có thông tin'}
                    />
                    <InfoFieldColumn
                      title='Loại hợp đồng'
                      content={data?.contractType ?? 'Không có thông tin'}
                    />
                    <InfoFieldColumn
                      title='Ngày bắt đầu hợp đồng'
                      content={data?.fromDate ?? 'Không có thông tin'}
                    />
                    <InfoFieldColumn
                      title='Ngày kết thúc hợp đồng'
                      content={data?.toDate ?? 'Không có thông tin'}
                    />
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoPrivateView;
