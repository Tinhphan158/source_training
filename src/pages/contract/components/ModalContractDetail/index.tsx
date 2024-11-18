/* eslint-disable no-constant-condition */
import { Upload, type UploadFile, type UploadProps } from 'antd';

import Button from '@/components/button';
import { DatePickerField } from '@/components/DatePickerField';
import Form from '@/components/form';
import IconRoot from '@/components/icon';
import { IconVariable } from '@/components/icon/types';
import InputRoot from '@/components/input';
import SelectRoot from '@/components/select';
import TextAreaRoot from '@/components/textarea';
import AuthService from '@/utils/Auth';

interface IModalContractDetailProps {
  setIsOpenModal: (value: boolean) => void;
  typeModalContract?: string;
  fileList?: UploadFile[];
  setFileList?: (files: UploadFile[]) => void;
  fileListUpdate?: UploadFile[];
  setFileListUpdate?: (files: UploadFile[]) => void;
}

function ModalContractDetail({ setIsOpenModal, typeModalContract, fileList, setFileList }: IModalContractDetailProps) {
  const profile = AuthService.getPackageProfile();
  const handleSubmitData = (data: any) => {
    // Handle submit data here
    console.log('Submit data:', data);
  };
  const handleChange: UploadProps['onChange'] = info => {
    let newFileList = [...info.fileList];
    newFileList = newFileList.map(file => {
      if (file.response) {
        file.url = file.response.url;
      }
      return file;
    });
    if (setFileList) {
      setFileList(newFileList);
    }
    return false; // Ngăn chặn hành vi upload
  };
  const beforeUpload = () => {
    return false;
  };
  const handleRemoveFile = (fileUid: string) => {
    if (setFileList) {
      const newFileList = fileList?.filter(file => file.uid !== fileUid);
      if (newFileList) {
        setFileList(newFileList);
      }
    }
  };

  return (
    <Form
      onSubmit={handleSubmitData}
      defaultValues={{
        startDate: Date.now(),
      }}>
      <div className='fixed bottom-0 left-0 right-0 top-0 z-50 bg-black p-1'>
        <div className='relative h-full max-h-[100vh] overflow-y-auto rounded-xl bg-white'>
          <div className='sticky top-0 z-50 flex items-center justify-between border-b-[1px] border-[#E4E7EC] bg-white px-6  py-6'>
            <span className='font-semibold text-[#344054] sm:text-[18px]'>
              {typeModalContract === 'add' ? 'Tạo mới hợp đồng' : ''}
            </span>
            <div className='flex items-center gap-4'>
              <Button
                type='button'
                text='Đóng'
                onClick={() => {
                  setIsOpenModal(false);
                }}
                className='w-[70px] rounded-lg border border-[#98A2B3] px-2 py-1 text-center text-sm font-medium text-[#344054] hover:cursor-pointer hover:border-[#2DB976] hover:text-[#2DB976] sm:w-[90px] sm:px-4 sm:py-2'
              />
              <Button
                text='Lưu'
                type='submit'
                className='w-[70px] rounded-lg border border-[#2DB976] bg-[#2DB976] px-2 py-1 text-center text-sm font-medium text-[#fafafa] hover:cursor-pointer hover:bg-[#2db975d7] hover:text-white sm:w-[90px] sm:px-4 sm:py-2'
              />
            </div>
          </div>
          <div className='p-5'>
            <div className='border-b-2 border-b-[#E4E7EC] pb-6'>
              <span className='text-base font-semibold text-[#344054]'>Thông tin chi tiết</span>
              <div className='mt-4 flex flex-col gap-6 lg:flex-row'>
                <div className='w-full rounded-[10px] bg-[#a3ffbcc8] p-4 sm:w-full'>
                  <div>
                    <InputRoot
                      isRequire={true}
                      name='contractCode'
                      className='bg-white'
                      label='Mã hợp đồng'
                      placeholder='Nhập mã hợp đồng'
                      classNameLabel='text-[#344054] text-sm font-normal'
                    />
                  </div>
                  <div className='mb-[11px]'>
                    <p className='text-sm font-normal text-[#344054]'>
                      <span className='mr-1 text-red-500'>*</span>Mã nhân viên
                    </p>
                    <SelectRoot
                      className='mt-[6px] flex justify-between rounded-lg border bg-white px-[4px]'
                      classNameOptionList='top-8'
                      options={[]}
                      firstValue={{ label: 'Mã nhân viên', value: '' }}
                      name='staffCode'
                    />
                  </div>
                  <div className='mb-[11px]'>
                    <span className='text-sm font-normal text-[#344054]'>Phòng ban</span>
                    <SelectRoot
                      className='mt-[6px] flex justify-between rounded-lg border bg-white px-[4px]'
                      classNameOptionList='top-8'
                      options={[]}
                      firstValue={{ label: 'Chọn phòng ban', value: '' }}
                      name='departmentCode'
                    />
                  </div>
                  <div>
                    <InputRoot
                      name='allowance'
                      className='bg-white'
                      label='Phụ cấp'
                      placeholder='Nhập phụ cấp VND'
                      classNameLabel='text-[#344054] text-sm font-normal'
                    />
                  </div>
                  <div>
                    <p className='text-sm font-normal text-[#344054]'>Ngày kết thúc HĐ</p>
                    <DatePickerField
                      name='toDate'
                      placeholder='Nhập ngày kết thúc HĐ'
                      className='mt-2 flex justify-between rounded-lg border bg-white p-[13px]'
                      displayFormat='DD/MM/YYYY'
                    />
                  </div>
                </div>
                <div className='flex w-full flex-col justify-end rounded-[10px] bg-[#a3ffbcc8] p-4 sm:w-full sm:gap-4'>
                  <div className='mb-[-20px]'>
                    <InputRoot
                      name='staffName'
                      disabled={true}
                      className='bg-white'
                      label='Tên nhân viên'
                      placeholder='Tên nhân viên'
                      classNameLabel='mt-2 text-[#344054] text-sm font-normal'
                    />
                  </div>
                  <div className='mb-[-2px]'>
                    <p className='text-sm font-normal text-[#344054]'>Bậc</p>
                    <SelectRoot
                      className='mt-[6px] flex justify-between rounded-lg border bg-white px-[6px] py-[13px]'
                      classNameOptionList='top-8'
                      options={[]}
                      firstValue={{ label: 'Chọn bậc', value: '' }}
                      name='level'
                    />
                  </div>
                  <div className='mb-[4px]'>
                    <p className='text-sm font-normal text-[#344054]'>
                      <span className='text-red-500'>*</span> Loại HĐ
                    </p>
                    <SelectRoot
                      className='mt-[6px] flex justify-between rounded-lg border bg-white px-[6px] py-[13px]'
                      classNameOptionList='top-8'
                      options={[]}
                      firstValue={{ label: 'Chọn loại hợp đồng', value: '' }}
                      name='contractType'
                    />
                  </div>
                  <div>
                    <p className='text-sm font-normal text-[#344054]'>Người lập hợp đồng</p>
                    <SelectRoot
                      className='mt-[6px] flex justify-between rounded-lg border bg-white px-[6px] py-[13px]'
                      classNameOptionList='top-8'
                      options={[]}
                      firstValue={{ label: profile?.fullName, value: profile?.fullName }}
                      name='contractor'
                    />
                  </div>
                </div>
                <div className='flex w-full flex-col justify-end rounded-[10px] bg-[#a3ffbcc8] p-4 sm:w-full sm:gap-4'>
                  <div className='mb-[-20px]'>
                    <InputRoot
                      name='position'
                      className='bg-white'
                      label='Chức vụ'
                      placeholder='Nhập chức vụ'
                      classNameLabel='text-[#344054] text-sm font-normal'
                    />
                  </div>

                  <div className='mb-[-21px]'>
                    <InputRoot
                      name='salary'
                      className='bg-white'
                      label='Lương cơ bản'
                      placeholder='Nhập lương cơ bản VND'
                      classNameLabel='text-[#344054] text-sm font-normal'
                    />
                  </div>
                  <div className=''>
                    <p className='text-sm font-normal text-[#344054]'>
                      <span className='mr-1 text-red-500'>*</span>Ngày bắt đầu HĐ
                    </p>
                    <DatePickerField
                      name='fromDate'
                      placeholder='Chọn ngày bắt đầu HĐ'
                      className='mt-2 flex justify-between rounded-lg border bg-white p-[13px]'
                      displayFormat='DD/MM/YYYY'
                    />
                  </div>
                  <div className=''>
                    <p className='text-sm font-normal text-[#344054]'>Ngày lập hợp đồng</p>
                    <DatePickerField
                      name='startDate'
                      placeholder='Chọn ngày lập hợp đồng'
                      className='mt-2 flex justify-between rounded-lg border bg-white p-[13px]'
                      displayFormat='DD/MM/YYYY'
                    />
                  </div>
                </div>
              </div>
              <div className='mt-5 rounded-lg bg-[#b7ffca] p-4'>
                <TextAreaRoot
                  name='note'
                  className='h-[136px] bg-white'
                  label='Ghi chú'
                  placeholder='Nhập mô tả nếu có'
                  classNameLabel='text-[#344054] text-sm font-normal'
                />
              </div>
            </div>

            <div className={`mt-5 border-b-2 border-b-[#E4E7EC] pb-6`}>
              <p className='text-base font-semibold text-[#344054]'>Tài liệu, chứng từ</p>
              {typeModalContract === 'add' ? (
                <div className='mt-4 flex flex-col items-start gap-8 xl:flex-row'>
                  <Upload
                    showUploadList={false}
                    fileList={fileList}
                    onChange={handleChange}
                    beforeUpload={beforeUpload}
                    multiple={true}>
                    <Button
                      type='button'
                      className='flex items-center gap-2 rounded-lg border bg-[#F1F6FD] px-[14px] py-2 text-sm font-semibold text-[#365FBF]'
                      iconStart={<IconRoot icon={IconVariable.upload} />}>
                      Tải lên
                    </Button>
                  </Upload>

                  <div className='flex flex-wrap gap-[10px]'>
                    {fileList?.map(file => (
                      <div
                        key={file.uid}
                        className='flex items-center gap-2 rounded-md bg-[#f0f0f0] px-2 py-1 text-sm'>
                        <span>{file.name}</span>
                        <Button
                          type='button'
                          className='text-red-500'
                          onClick={() => {
                            handleRemoveFile(file.uid);
                          }}
                          text='Xóa'
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className='mt-4 inline-flex items-center gap-8'>
                  <Upload
                    showUploadList={false}
                    multiple={true}>
                    <Button
                      type='button'
                      className='flex items-center gap-2 rounded-lg border bg-[#F1F6FD] px-[14px] py-2 text-sm font-semibold text-[#365FBF]'
                      iconStart={<IconRoot icon={IconVariable.upload} />}>
                      Tải lên
                    </Button>
                  </Upload>

                  <div className='flex flex-wrap gap-[10px]'>
                    {[1, 2, 3, 4].map((file, index) => (
                      <div
                        key={index}
                        className='flex items-center gap-2 rounded-md bg-[#f0f0f0] px-2 py-1 text-sm'>
                        <span>gfgfgfgf</span>
                        <Button
                          type='button'
                          className='text-red-500'
                          onClick={() => {}}
                          text='Xóa'
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {typeModalContract !== 'add' && (
              <div className='mt-5 flex flex-col items-start justify-between gap-4 md:flex-row md:gap-0'>
                <>
                  <div>
                    <p className='text-base font-semibold text-[#344054]'>Mở khóa người dùng</p>
                    <p className='text-sm font-normal text-[#344054]'>Cho phép sử dụng thông tin này</p>
                  </div>
                  <Button
                    onClick={() => {}}
                    text='Mở khóa'
                    type='button'
                    className='flex items-center gap-2 rounded-lg border border-[#68E2A1] bg-white px-[14px] py-2 text-sm font-semibold text-[#12B76A] hover:cursor-pointer hover:border-[#12B76A]'
                  />
                </>
                {/* <>
                    <div>
                      <p className='text-base font-semibold text-[#344054]'>Khóa người dùng</p>
                      <p className='text-sm font-normal text-[#344054]'>Khóa và không cho phép sử dụng thông tin này</p>
                    </div>
                    <Button
                      onClick={() => {}}
                      text='Khóa'
                      type='button'
                      className='flex items-center gap-2 rounded-lg border border-[#FDA29B] bg-white px-[14px] py-2 text-sm font-semibold text-[#B42318] hover:cursor-pointer hover:border-[#B42318]'
                    />
                  </> */}
              </div>
            )}
          </div>
        </div>
      </div>
    </Form>
  );
}

export default ModalContractDetail;
