import { useState } from 'react';

import IconRoot from '@/components/icon';
import { IconVariable } from '@/components/icon/types';

import ResetPasswordView from './view';

function ResetPassword() {
  const [errorString, setErrorString] = useState<string>('');
  const handleUpdatePassword = (data: any) => {
    console.log(data);
  };
  return (
    <>
      {errorString.length > 0 && errorString !== undefined && (
        <div className='mt-2 flex items-center justify-center gap-2'>
          <IconRoot icon={IconVariable.error} />
          <span className='text-sm font-medium text-[#C60808]'>{errorString}</span>
        </div>
      )}
      <ResetPasswordView handleSubmit={handleUpdatePassword} />
    </>
  );
}

export default ResetPassword;
