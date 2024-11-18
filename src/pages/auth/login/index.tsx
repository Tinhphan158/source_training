/* eslint-disable @typescript-eslint/no-misused-promises */
import { useNavigate } from 'react-router-dom';

import { type IApiRequest } from '@/api/api.interface';
import { useRequest } from '@/api/api.middleware';
import { EnumPath } from '@/common/enum/Enums';
import IconRoot from '@/components/icon';
import { IconVariable } from '@/components/icon/types';
import Config from '@/env';
import AuthService from '@/utils/Auth';
import { LoggerService } from '@/utils/Logger';

import { type IRootObject } from './type';
import LoginView from './view';

function Login() {
  const navigate = useNavigate();
  const config = new Config().getState();

  const loginApi: IApiRequest = {
    url: `${config.api.apiPath.login}`,
    method: 'post',
  };

  const handleSubmitLogin = (data: any) => {
    mutate({ ...data, tenant: 'ebst' });
  };

  const handleResponse = {
    handleRequestSuccess: (response: IRootObject) => {
      try {
        const auth = {
          token: `${response.accessToken}`,
          expireAt: Date.now() + 86_400_000,
          refreshAt: 60_000,
          profileDetails: response?.user,
        };

        const profile = {
          fullName: response.user.fullName,
          username: response.user.username,
          email: response.user.email,
          phoneNumber: response.user.phoneNumber,
          staffId: response.user.staffId,
          department: response.user.department,
          accountEnabled: response.user.accountEnabled,
          accountExpired: response.user.accountExpired,
          accountLocked: response.user.accountLocked,
          isCustomer: response.user.isCustomer,
          customerId: response.user.customerId,
          staffMetaDataId: response.user.staffMetaDataId,
        };

        AuthService.setAllPackage(auth, profile);
        navigate(EnumPath.home);
      } catch (error: any) {
        LoggerService.error('HandleLogin execute handleRequestSuccess receive error', error);
      }
    },
    handleRequestFailed: (response: any) => {
      LoggerService.error('Error', response.message);
    },
  };

  const { mutate } = useRequest(loginApi, handleResponse);

  return (
    <>
      {false && (
        <div className='mt-2 flex items-center justify-center gap-2'>
          <IconRoot icon={IconVariable.error} />
          <span className='text-sm font-medium text-[#C60808]'>Tên đăng nhập hoặc mật khẩu của bạn không đúng.</span>
        </div>
      )}
      <LoginView handleSubmit={handleSubmitLogin} />
    </>
  );
}

export default Login;
