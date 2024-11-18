import Cookies, { type CookieSetOptions } from 'universal-cookie';

import Config from '@/env';

import { type IAuthProfile } from '../common/enum/Enums';
import { LoggerService } from './Logger';

export interface IProfile {
  cusName: string;
  status: number;
  dob: number;
  email: string;
  phone: string;
  [property: string]: any;
}
export interface IAuth {
  token: string;
  expireAt: number;
  refreshAt: number;
  profileDetails: IAuthProfile;
}
class AuthService {
  static setPackageAuth(auth: IAuth, expireAt: number) {
    const config = new Config().getState();
    const cookie = new Cookies();
    const options: CookieSetOptions = {
      path: '/',
      expires: new Date(expireAt),
    };
    cookie.set(config.cookie.auth, auth.token, options);
  }

  static setPackageProfile(profile: IAuthProfile, expireAt: number) {
    const config = new Config().getState();
    const cookie = new Cookies();
    const options: CookieSetOptions = {
      path: '/',
      expires: new Date(expireAt),
    };
    cookie.set(config.cookie.profile, profile, options);
  }

  static setPackageExpireAt(expireAt: number) {
    const config = new Config().getState();
    const cookie = new Cookies();
    const options: CookieSetOptions = {
      path: '/',
      expires: new Date(expireAt),
    };
    cookie.set(config.cookie.expireAt, expireAt, options);
  }

  static getPackageAuth() {
    const config = new Config().getState();
    const cookie = new Cookies();
    return cookie.get(config.cookie.auth);
  }

  static getPackageProfile(): IAuthProfile {
    const config = new Config().getState();
    const cookie = new Cookies();
    return cookie.get(config.cookie.profile);
  }

  static getPackageExpiredAt() {
    const config = new Config().getState();
    const cookie = new Cookies();
    return cookie.get(config.cookie.expireAt);
  }

  static removeAll() {
    const config = new Config().getState();
    const cookie = new Cookies();

    cookie.remove(config.cookie.auth, { path: '/' });
    cookie.remove(config.cookie.profile, { path: '/' });
    cookie.remove(config.cookie.expireAt, { path: '/' });
    cookie.remove(config.cookie.auth, { path: '/' });
    cookie.remove(config.cookie.profile, { path: '/' });
    cookie.remove(config.cookie.expireAt, { path: '/' });
  }

  static setAllPackage(auth: IAuth, profile: any) {
    try {
      LoggerService.info('AuthService execute setAllPackage');
      AuthService.setPackageAuth(auth, auth.expireAt);
      AuthService.setPackageProfile(profile, auth.expireAt);
      AuthService.setPackageExpireAt(auth.expireAt);
    } catch (error: any) {
      LoggerService.error('AuthService execute setAllPackage', error);
    }
  }

  static handleLogout() {
    try {
      LoggerService.info('AuthService execute handleLogout');
      AuthService.removeAll();
    } catch (error: any) {
      LoggerService.error('AuthService execute handleLogout fail', error);
    }
  }
}

export default AuthService;
