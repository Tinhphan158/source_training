import axios, { type AxiosRequestConfig, toFormData } from 'axios';

import toastDefault, { EnumToast } from '@/components/toast';
import Config from '@/env';

// import toastDefault, { EnumToast } from '@/core/toast';
import { type IApiRequest } from './api.interface';
const configGet = new Config().getState();
const axiosInstance = axios.create();

let errorMessage = 'System exception!';

axiosInstance.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    void Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  config => {
    return config?.data;
  },
  error => {
    // if needs to navigate to login page when request exception
    errorMessage = error?.message?.includes('Network Error')
      ? 'Network error, please check your network!'
      : error?.message;

    error.message && toastDefault(EnumToast.ERROR, errorMessage);

    return {
      status: false,
      message: errorMessage,
      result: null,
    };
  },
);

export interface IResponse<T = any> {
  code: string;
  data: T;
  message: string;
}

export type MyResponse<T = any> = Promise<IResponse<T>>;

/**
 *
 * @param method - request methods
 * @param url - request url
 * @param data - request data or params
 */
export const request = async <T>({
  method,
  url,
  payload,
  params,
  headers,
  host,
  timeout,
}: IApiRequest): MyResponse<T> => {
  const options: AxiosRequestConfig = {
    method,
    headers: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': 'application/json',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Cache-control': 'max-age=0, no-cache, no-store, must-revalidate',
      ...headers,
    },
    baseURL: host ?? configGet.api.host,
    url,
    data: payload,
    params,
    timeout: timeout ?? 1_000_000,
  };

  return await axiosInstance.request(options);
};

export const postForm = async <T>({ method, url, payload, params, headers, host }: IApiRequest): MyResponse<T> => {
  const options: AxiosRequestConfig = {
    method,
    headers: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': 'application/x-www-form-urlencoded',
      ...headers,
    },
    baseURL: host ?? configGet.api.host,
    url,
    data: payload,
    params,
  };

  return await axiosInstance.postForm(url, payload, options);
};

export const putForm = async <T>({ method, url, payload, params, headers, host }: IApiRequest): MyResponse<T> => {
  const options: AxiosRequestConfig = {
    method,
    headers: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': 'application/x-www-form-urlencoded',
      ...headers,
    },
    baseURL: host ?? configGet.api.host,
    url,
    data: payload,
    params,
  };

  return await axiosInstance.putForm(url, payload, options);
};

export const requestForm = async <T>({ method, url, payload, params, headers, host }: IApiRequest): MyResponse<T> => {
  const options: AxiosRequestConfig = {
    method,
    headers: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': 'application/x-www-form-urlencoded',
      ...headers,
    },
    baseURL: host ?? configGet.api.host,
    url,
    data: toFormData(payload),
    params,
  };

  return await axiosInstance.request(options);
};
