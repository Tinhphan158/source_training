/* eslint-disable @typescript-eslint/naming-convention */
import React, { createContext, useContext, useState } from 'react';

import Config from '@/env';
import { dictionaryList, type IDictionaryList, languageOptions } from '@/languages';
interface IContextLanguage {
  userLanguage: string;
  dictionary: object;
  userLanguageChange: (selected: any) => void;
  handleChangeLanguage: (value: string) => void;
}
const config = new Config().getState();
const initContextLanguage: IContextLanguage = {
  userLanguage: config.locale,
  dictionary: dictionaryList.en,
  userLanguageChange: (selected: any) => {},
  handleChangeLanguage: (value: string) => {},
};
export const LanguageContext = createContext(initContextLanguage);
interface IPropsProviderLanguage {
  children: React.ReactNode;
}
export const LanguageProvider = ({ children }: IPropsProviderLanguage) => {
  const defaultLanguage = localStorage.getItem('locale');
  const [userLanguage, setUserLanguage] = useState(defaultLanguage ?? config.locale);
  const handleChangeLanguage = (value: string) => {
    if (value) {
      setUserLanguage(value);
    }
  };
  const value = React.useMemo(
    () => ({
      userLanguage,
      dictionary: dictionaryList[userLanguage as keyof IDictionaryList],
      userLanguageChange: (selected: any) => {
        const find = languageOptions.find(i => i.value === selected);
        const newLanguage = find ? selected : config.locale;
        setUserLanguage(newLanguage);
        localStorage.setItem('locale', newLanguage);
      },
      handleChangeLanguage,
    }),
    [userLanguage],
  );
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

interface IProps {
  tid: any;
}
export const Localize = ({ tid }: IProps) => {
  const languageContext = useContext(LanguageContext);
  return languageContext.dictionary[tid as keyof object] || tid;
};

export function LocalizeTypeFunc(tid: string | undefined): any {
  const languageContext = useContext(LanguageContext);
  return languageContext.dictionary[tid as keyof object] || tid;
}

export const LocalizeContent = () => {
  const languageContext = useContext(LanguageContext);
  const SetLocalizeId = (tid: string) => {
    return languageContext.dictionary[tid as keyof object] || tid;
  };
  return { SetLocalizeId };
};
