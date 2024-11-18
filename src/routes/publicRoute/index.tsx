import { memo } from 'react';
import { Navigate } from 'react-router-dom';

import AuthService from '@/utils/Auth';
import { Helper } from '@/utils/Helper';
import { LoggerService } from '@/utils/Logger';

function PublicRoute(props: any) {
  const auth = AuthService.getPackageAuth();
  if (!Helper.isEmpty(auth)) {
    LoggerService.info('Navigate to HOME PAGE because user is authenticated');
    return (
      <Navigate
        to={'/'}
        replace
      />
    );
  }

  return props.children;
}

export default memo(PublicRoute);
