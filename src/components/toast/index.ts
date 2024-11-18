import type React from 'react';
import { toast, type ToastOptions } from 'react-toastify';

export enum EnumToast {
  ERROR = 1,
  SUCCESS,
  INFO,
  WARNING,
}

// ToastOptions extends CommonOptions, which contains the common properties for all toast types, such as position, autoClose, pauseOnHover, etc.
// ToastOptions also has some specific properties for each toast type, such as className, style, type, progress, delay, etc.
// You can use ToastOptions to customize the appearance and behavior of your toast components.
const toastDefault = (type: EnumToast, content: React.ReactNode | string, options?: ToastOptions) => {
  const option = {
    position: options?.position ?? 'top-right',
    autoClose: options?.autoClose ?? 1500,
    hideProgressBar: options?.hideProgressBar ?? true,
    closeOnClick: options?.closeOnClick ?? true,
    pauseOnHover: options?.pauseOnHover ?? true,
    draggable: options?.draggable ?? true,
    progress: undefined,
    theme: options?.theme ?? 'colored',
  };
  switch (type) {
    case EnumToast.ERROR:
      toast.error(content, option);
      break;
    case EnumToast.INFO:
      toast.info(content, option);
      break;
    case EnumToast.SUCCESS:
      toast.success(content, option);
      break;
    case EnumToast.WARNING:
      toast.warning(content, option);
      break;
    default:
      break;
  }
};

export default toastDefault;
