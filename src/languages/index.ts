import en from './en.json';
import vn from './vn.json';

export type Locale = 'vn' | 'en';

interface IItemListLangue {
  value: Locale;
  name: string;
  icon: string;
}
export interface IDictionaryList {
  en: object;
  vn: object;
}
export const dictionaryList = { en, vn };
export const languageOptions: IItemListLangue[] = [
  { value: 'en', name: 'EN', icon: 'fi-us' },
  { value: 'vn', name: 'VN', icon: 'fi-vn' },
];
