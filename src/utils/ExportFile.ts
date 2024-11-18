import axios from 'axios';

import toastDefault, { EnumToast } from '@/components/toast';

import AuthService from './Auth';

export const handleExportExcel = async (url: string, fileName: string, setIsLoading: (loading: boolean) => void) => {
  setIsLoading(true);
  try {
    const response = await axios({
      method: 'get',
      url,
      headers: {
        Authorization: `Bearer ${AuthService.getPackageAuth()}`,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Accept-Language': 'vi',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Content-Type': 'application/json',
      },
      responseType: 'blob',
    });

    if (response.status === 200) {
      const blob = new Blob([response.data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      const fileNameDownload = `${fileName}.xlsx`;
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = fileNameDownload;
      link.click();
      toastDefault(EnumToast.SUCCESS, 'Xuất file thành công.');
    }
  } catch {
    toastDefault(EnumToast.ERROR, 'Lỗi khi xuất file.');
  } finally {
    setIsLoading(false);
  }
};
