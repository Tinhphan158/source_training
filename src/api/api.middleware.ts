import { useMutation, useQuery } from '@tanstack/react-query';

import { type IAuth } from '../utils/Auth';
import { LoggerService } from '../utils/Logger';
import { type IApiRequest, type IDataResponse, type State } from './api.interface';
import { request } from './request';
import ResponseCode from './responseCode';
const requestApi = async ({ method, url, payload, params, headers }: IApiRequest) => {
  LoggerService.info('RequestAPI execute');
  LoggerService.debug('RequestAPI execute received url', url);
  LoggerService.debug('RequestAPI execute received method', method);
  LoggerService.debug('RequestAPI execute received payload', payload);
  LoggerService.debug('RequestAPI execute received params', params);
  // if (headers) {
  //   LoggerService.debug('RequestAPI execute received headers', headers);
  // }

  return await request<IDataResponse>({
    method,
    url,
    payload,
    params,
    headers,
  });
};

/**
 *
 * @param method
 * @param url string
 * @param payload any
 * @param params object
 * @param headers object
 * @param funcRequest
 * @returns  data, refetch, isSuccess,isLoading
 */
export const useGet = (
  { method, url, payload, params, headers, callbackWhenError }: IApiRequest,
  funcRequest: State,
  key: string[] = [],
  enabled = true,
) => {
  let queryKey;
  if (key.length > 0) {
    queryKey = [key];
  } else if (params) {
    queryKey = [method, url, params];
  } else {
    queryKey = [method, url];
  }

  const rs = useQuery({
    queryKey,
    queryFn: async () => {
      return await requestApi({ method, url, payload, params, headers });
    },
    onSuccess: data => {
      if (data.code === '4002' || data.code === '4003') {
        // onSetView({
        //   viewModal: ViewModal.none,
        //   data: {
        //     onSubmit: () => {
        //       AuthService.handleLogout();
        //       navigate(EnumPath.signIn);
        //     },
        //   },
        // });
      } else {
        ResponseCode.find(data, funcRequest);
      }
    },
    onError: () => {
      callbackWhenError && callbackWhenError();
      // toastDefault(EnumToast.ERROR, 'Network error, please check your network!');
    },
    enabled: !!enabled,
    refetchOnWindowFocus: false,
  });
  return rs;
};

/**
 *
 * @param method
 * @param url
 * @param headers
 * @returns data, refetch, isSuccess, isFetching
 */
export const useRequest = (
  { method, url, headers, callbackWhenError }: IApiRequest,
  funcRequest: State,
  key?: string,
) => {
  return useMutation(
    async (data: any) =>
      await requestApi({
        method,
        url,
        payload: data,
        params: method === 'get' ? data : null,
        headers,
      }),
    {
      onSuccess: data => {
        if (data.code === '4002' || data.code === '4003') {
          // onSetView({
          //   viewModal: ViewModal.none,
          //   data: {
          //     onSubmit: () => {
          //       AuthService.handleLogout();
          //       navigate(EnumPath.signIn);
          //     },
          //   },
          // });
        } else {
          ResponseCode.find(data, funcRequest);
        }
      },
      onError: () => {
        callbackWhenError && callbackWhenError();
        // toastDefault(EnumToast.ERROR, 'Network error, please check your network!');
      },
    },
  );
};
const requestApiLogin = async ({ method, url, payload, params, headers, timeout }: IApiRequest) =>
  await request<IAuth>({ method, url, payload, params, headers, timeout });

/**
 * api login
 * @param method
 * @param url
 * @param headers
 * @returns data, refetch, isSuccess, isFetching
 */
export const useLogin = ({ method, url, headers, timeout, callbackWhenError }: IApiRequest, funcRequest: State) => {
  return useMutation(async (data: any) => await requestApiLogin({ method, url, payload: data, headers, timeout }), {
    onSuccess: data => {
      ResponseCode.find(data, funcRequest);
    },
    onError: () => {
      callbackWhenError && callbackWhenError();
      // toastDefault(EnumToast.ERROR, 'Network error, please check your network!');
    },
  });
};
export const useLogout = ({ method, url, headers, callbackWhenError }: IApiRequest, funcRequest: State) => {
  return useMutation(async (data: any) => await requestApi({ method, url, payload: data, headers }), {
    onSuccess: data => {
      ResponseCode.find(data, funcRequest);
    },
    onError: () => {
      callbackWhenError && callbackWhenError();
      // toastDefault(EnumToast.ERROR, 'Network error, please check your network!');
    },
  });
};
