import { useEffect, useState } from 'react';

import ForgotPasswordView from './view';

function ForgotPassword() {
  const [isError, setError] = useState(false);
  const [errorStringEmail, setErrorStringEmail] = useState<string>('');
  const [errorStringOTP, setErrorStringOTP] = useState<string>('');
  const [isCheckEmail, setCheckEmail] = useState(false);
  const [otpValues, setOtpValues] = useState(['', '', '', '', '', '']);
  const [timeResetOTP, setTimeResetOTP] = useState(59);
  const [isCounting, setIsCounting] = useState(false);

  const handleSubmitEmail = (email: any) => {
    console.log(email);
    // Check if email valid then routing to resetPassword Page and starting counting timeResetOTP, Beside setIsCounting(true) and setCheckEmail(true).
    // Check if email unvalid then setError(false) and setErrorStringEmail('message error').
  };
  useEffect(() => {
    let intervalId: any;

    if (isCounting) {
      intervalId = setInterval(() => {
        if (timeResetOTP > 0) {
          setTimeResetOTP(timeResetOTP - 1);
        } else {
          setIsCounting(false);
        }
      }, 1000);
    }
    console.log(timeResetOTP);
    return () => {
      clearInterval(intervalId);
    };
  }, [isCounting, timeResetOTP]);

  const handleSubmitOTP = (data: string[]) => {
    console.log('OTP arr:', data);
  };

  useEffect(() => {
    if (otpValues.every(value => value !== '')) {
      handleSubmitOTP(otpValues);
    }
  }, [otpValues]);

  return (
    <ForgotPasswordView
      handleSubmitEmail={handleSubmitEmail}
      handleSubmitOTP={handleSubmitOTP}
      setError={setError}
      isError={isError}
      isCheckEmail={isCheckEmail}
      setOtpValues={setOtpValues}
      otpValues={otpValues}
      timeResetOTP={timeResetOTP}
      setIsCounting={setIsCounting}
      isCounting={isCounting}
      setTimeResetOTP={setTimeResetOTP}
      errorStringOTP={errorStringOTP}
      errorStringEmail={errorStringEmail}
    />
  );
}

export default ForgotPassword;
