import * as bcrypt from 'bcryptjs';
import Crypto from 'crypto-js';
import dayjs from 'dayjs';
import Jsencrypt from 'jsencrypt';
import { v4 as uuuid } from 'uuid';

import Config from '@/env';
declare global {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface Window {
    opera: any;
    MSStream: any;
  }
}
export class Helper {
  static randomKey(): string {
    return uuuid();
  }

  static randomBase64(): string {
    const hash = Crypto.SHA256(uuuid());
    const base64 = Crypto.enc.Base64url.stringify(hash);

    if (base64.includes('-')) {
      return base64.replace('-', '');
    }
    return base64;
  }

  static hashSHA256(data: any): string {
    const hash = Crypto.SHA256(data).toString();

    return hash;
  }

  static hashRSA(data: any): string {
    const config = new Config().getState();
    const key = config.cookie.rsaKey;
    const jsencrypt = new Jsencrypt();

    jsencrypt.setPublicKey(key);
    const encryption = jsencrypt.encrypt(data).toString();

    return encryption;
  }

  static async hashBcrypt(data: any): Promise<string> {
    const config = new Config().getState();
    const { alg, cost, salt } = config.password;
    const genSalt = `${alg}${cost}$${salt}`;
    return await bcrypt.hash(data, genSalt).then(hash => {
      return hash;
    });
  }

  static async hashPassword(data: any): Promise<string> {
    const hash = this.hashRSA(await this.hashBcrypt(data));

    return hash;
  }

  static isEmpty(value: any): boolean {
    if (typeof value === 'string') {
      return value.trim() === '';
    }

    return (
      value === undefined ||
      value === null ||
      (Object.keys(value).length === 0 && Object.getPrototypeOf(value) === Object.prototype) ||
      (Array.isArray(value) && value.length === 0)
    );
  }

  static exactTypeOf(variable: any): string {
    return Object.prototype.toString.call(variable).slice(8, -1).toLowerCase();
  }

  static isNullOrUndefined(variable: any): boolean {
    return Helper.exactTypeOf(variable) === 'null' || Helper.exactTypeOf(variable) === 'undefined';
  }

  static removeObjectEmpty(obj: any): any {
    if (Helper.isEmpty(obj)) {
      return obj;
    }
    for (const key of Object.keys(obj)) {
      if (Helper.isEmpty(obj[key])) {
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete obj[key];
      }
    }
    return obj;
  }

  static equalTwoNumber(number1: number, number2: number) {
    return number1 === number2;
  }

  static createObjectURL(item: File) {
    return URL.createObjectURL(item);
  }

  static revokeObjectURL(item: string) {
    URL.revokeObjectURL(item);
  }

  static isString(string: any) {
    return typeof string === 'string';
  }

  static isArray(array: any) {
    return typeof array === 'object';
  }

  static isEmail(email: string) {
    const regex = new RegExp(/^[\da-z]+@[a-z]+\.[a-z]{2,5}$/g);
    return regex.test(email.toLowerCase());
  }

  static equalTwoString(string1: string, string2: string): boolean {
    return string1 === string2;
  }

  static millisecondsToDate(milliseconds: number) {
    return dayjs(milliseconds)?.format('MM-DD-YYYY');
  }

  static convertToDate(milliseconds: any) {
    const date = new Date(milliseconds);
    return date;
  }

  static convertToHourMinusSecond(milliseconds: number) {
    const hours = dayjs(milliseconds).get('hours');
    const minus = dayjs(milliseconds).get('minute');
    if (hours > 12) {
      if (minus > 9) {
        return `${hours - 12}:${minus} PM`;
      }
      return `${hours - 12}:0${minus} PM`;
    }
    if (minus > 9) {
      return `${hours}:${minus} AM`;
    }
    return `${hours}:0${minus} AM`;
  }

  static formatDateFull(time: number): string {
    return dayjs(time).format('MM-DD-YYYY HH:mm:ss');
  }

  static formatDate(time: number, format = 'MM-DD-YYYY'): string {
    return dayjs(time).format(format);
  }

  static equalWithZeroNumber(number: number) {
    if (number === 0) {
      return true;
    }
    return false;
  }

  static generateSrcImage(src: any) {
    const config = new Config().getState();
    if (Helper.isEmpty(src)) {
      return '';
    }
    return `${config.api.static.host}${src}`;
  }

  static removeStaticHost(link: string | undefined) {
    if (!link) return '';
    const config = new Config().getState();
    return link.slice(config.api.static.host.length);
  }

  static parseImage(strings: string) {
    // const replaceStrings = strings.replace('[', '').replace(']', '').replace(/"/g, '');
    // return replaceStrings.split(',');
    if (Helper.isEmpty(strings)) {
      return [];
    }
    try {
      const parse = JSON.parse(strings);
      return parse;
    } catch {
      return [];
    }
  }

  static convertObjectToArray(array: File[]) {
    return array.map((item, index) => {
      return {
        id: index,
        file: item,
      };
    });
  }

  static convertObjectToArrayMulti(array: File[], length: number) {
    return array.map((item, index) => {
      return {
        id: length + index,
        file: item,
      };
    });
  }

  static createObjectURLForImages(array: Array<{ id: number; file: File }>) {
    return array.map((item, index) => {
      return {
        id: item.id,
        src: Helper.createObjectURL(item.file),
      };
    });
  }

  static createObjectForImagesDefault(array: string[]) {
    return array.map((item: string) => {
      return {
        id: Helper.randomKey(),
        src: Helper.generateSrcImage(item),
      };
    });
  }

  static createObjectForImagesDefaultNotGeneralSrcImage(array: string[]) {
    return array.map((item: string, index: any) => {
      return {
        id: index,
        src: item,
      };
    });
  }

  static returnImagesDefault(array1: Array<{ id: number; src: string }>, array2: Array<{ id: number; src: string }>) {
    return array1.filter(itemCreateBaseURL => array2.find(itemDefault => itemDefault.id === itemCreateBaseURL.id));
  }

  static formatCurrency(amount: number | bigint) {
    const formatter = new Intl.NumberFormat('en-US', {
      currency: 'USD',
      minimumFractionDigits: 2,
    });

    return formatter.format(amount);
  }

  static equalNumberAndConditionNumber(number: number, conditionNumber: number) {
    if (number > conditionNumber) {
      return true;
    }
    return false;
  }

  static equalTwoIdCategory(id1: string, id2: string) {
    if (id1 === id2) {
      return true;
    }
    return false;
  }

  static equalLengthArrayAndIndex(index: number, array: any[]) {
    if (index === array.length - 1) {
      return true;
    }
    return false;
  }

  static isArrayEmpty(array: any[]) {
    if (array.length === 0) {
      return true;
    }
    return false;
  }

  static encodeBase64(string: string): string {
    return btoa(
      encodeURIComponent(string).replace(/%([\dA-F]{2})/g, (match, p1: number) => {
        return String.fromCodePoint(0 + p1);
      }),
    );
  }

  static hashMD5(string = '') {
    return CryptoJS.MD5(string).toString();
  }

  static decodeBase64(string: string): string {
    return decodeURIComponent(
      [...atob(string)]
        .map(c => {
          // eslint-disable-next-line unicorn/prefer-code-point
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join(''),
    );
  }

  static getMobileOperatingSystem = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // Windows Phone must come first because its UA also contains "Android"
    // if (/windows phone/i.test(userAgent)) {
    //   return "Windows Phone";
    // }

    if (/android/i.test(userAgent)) {
      return 'Android';
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      return 'IOS';
    }

    return 'unknown';
  };

  static isJson = (val: any) => {
    try {
      JSON.parse(val);
      return true;
    } catch {
      return false;
    }
  };

  static equalLessThenZero(number: number) {
    if (number < 0) {
      return true;
    }
    return false;
  }

  static convertMillisecondTo(milliseconds: number, format: string) {
    return dayjs(milliseconds).format(format);
  }

  static convertMillisecondToDay(milliseconds: number) {
    return dayjs(milliseconds).format('DD');
  }

  static convertMillisecondToMonth(milliseconds: number) {
    return dayjs(milliseconds).format('MM');
  }

  static convertMillisecondToYear(milliseconds: number) {
    return dayjs(milliseconds).format('YYYY');
  }

  static convertDateToMillisecond(date: any) {
    return dayjs(date).unix() * 1000;
  }

  static convertDateToUTCMillisecond(date: Date) {
    const now = new Date(date);
    const time = now.getTime();
    const offset = now.getTimezoneOffset();
    return time - offset * 60_000;
  }

  static parseStringified(str: string) {
    try {
      return JSON.parse(str);
    } catch {
      return str;
    }
  }

  static convertStringifyToParse(stringify: string) {
    try {
      return JSON.parse(stringify);
    } catch {
      return stringify;
    }
  }

  static parseStringImageToArray(images: string) {
    if (Helper.isEmpty(images)) {
      return [];
    }
    try {
      const parse = JSON.parse(images);
      return Helper.createObjectForImagesDefault(parse);
    } catch {
      return [];
    }
  }

  static parseStringImageToArrayAndGetFirstElement(images: string) {
    if (Helper.isEmpty(images)) {
      return '';
    }
    try {
      const parse = JSON.parse(images);
      return Helper.generateSrcImage(parse[0]);
    } catch {
      return '';
    }
  }

  static isEmptyObject(object: any): boolean {
    for (const key in object) {
      if (Helper.isEmpty(object[key])) {
        return true;
      }
    }
    return false;
  }

  static concatAddress(
    address?: string,
    wardName?: string,
    districtName?: string,
    cityName?: string,
    countryName?: string,
  ) {
    const addressArray = [address, wardName, districtName, cityName, countryName];
    return addressArray.filter(item => !Helper.isEmpty(item)).join(', ') || '-';
  }

  static detectVideoFile(fileList: File[]) {
    const mimeVideo = new Set(['video/x-msvideo', 'video/mp4', 'video/mpeg', 'video/ogg', 'video/mp2t', 'video/webm']);
    return fileList.filter(item => mimeVideo.has(item.type));
  }

  static detectImageFile(fileList: File[]) {
    const mimeImage = new Set([
      'image/avif',
      'image/bmp',
      'image/vnd.microsoft.icon',
      'image/jpeg',
      'image/png',
      'image/svg+xml',
      'image/tiff',
      'image/webp',
    ]);
    return fileList.filter(item => mimeImage.has(item.type));
  }

  static hasNoEmptyFields(obj: Record<string, any>) {
    for (const key in obj) {
      if (
        // eslint-disable-next-line no-prototype-builtins
        obj.hasOwnProperty(key) &&
        (obj[key] === undefined || obj[key] === null || obj[key] === '' || obj[key].length === 0)
      ) {
        return false;
      }
    }
    return true;
  }

  static compareTwoObject(obj1: any, obj2: any) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  }
}
