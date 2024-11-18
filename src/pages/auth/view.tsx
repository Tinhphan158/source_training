import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { EnumPath } from '@/common/enum/Enums';
import IconRoot from '@/components/icon';
import { IconVariable } from '@/components/icon/types';
import SelectRoot, { type IOption } from '@/components/select';
import TextLink from '@/components/textlink';
import { LanguageContext, LocalizeTypeFunc } from '@/context/languages';

import ForgotPassword from './forgotpassword';
import Login from './login';
import ResetPassword from './resetpassword';

function AuthView() {
  const location = useLocation();
  const { handleChangeLanguage: changeLanguageContext } = useContext(LanguageContext);
  const options: IOption[] = [
    { value: 'vn', label: 'Tiếng Việt' },
    { value: 'en', label: 'Tiếng Anh' },
  ];
  const handleChangeLanguage = (value: string) => {
    if (value) {
      localStorage.setItem('locale', value);
      changeLanguageContext(value);
    }
  };
  return (
    <div className="fixed flex h-full w-full items-center justify-center bg-[url('@/public/background_theme_auth.png')] bg-cover bg-center">
      <div className='relative flex h-[86%] w-[90%] items-center justify-center rounded-[20px] bg-white md:w-[60%] xl:w-[40%]'>
        {location.pathname === EnumPath.forgotPassword ? (
          <ForgotPassword />
        ) : (
          <div className='md:py:4 flex h-full w-full flex-col px-4 py-5 md:px-20 xl:px-32 xl:py-6'>
            <div className='flex h-10 justify-around'>
              <SelectRoot
                className='flex items-center rounded-md hover:bg-gray-100'
                classNameOptionList='top-8'
                options={options}
                firstValue={options[0]}
                onChange={handleChangeLanguage}
                name='language'
              />

              <TextLink
                to={EnumPath.contact}
                text={LocalizeTypeFunc('contact')}
                className='rounded-md bg-transparent px-2 text-sm text-black hover:cursor-pointer hover:bg-gray-100'
              />

              {location.pathname === EnumPath.login ? (
                <TextLink
                  to={EnumPath.forgotPassword}
                  text='Quên mật khẩu'
                  className='rounded-md bg-transparent px-2 text-sm text-black hover:cursor-pointer hover:bg-gray-100'
                />
              ) : (
                <TextLink
                  to={EnumPath.login}
                  text='Đăng nhập'
                  className='rounded-md bg-transparent px-2 text-sm text-black hover:cursor-pointer hover:bg-gray-100'
                />
              )}
            </div>

            <div className='mt-4 flex flex-col items-center'>
              <Link to={EnumPath.home}>
                <img
                  src={`src/public/logo_web_page.png`}
                  alt='hr management'
                  className='h-10 w-20'
                />
              </Link>
              <span className='mt-2 text-xl font-bold md:text-2xl xl:text-3xl'>
                {location.pathname === EnumPath.login ? 'Đăng nhập TSP' : 'Cập nhật mật khẩu mới'}
              </span>
            </div>

            {location.pathname === EnumPath.login ? <Login /> : <ResetPassword />}

            <div className='mt-auto flex items-center justify-center gap-[6px] text-sm text-[#616161]'>
              <span>HRM</span>
              <IconRoot icon={IconVariable.copyRight} />
              <span>2024</span>
              <IconRoot icon={IconVariable.dot} />
              <span>Stg</span>
              <IconRoot icon={IconVariable.dot} />
              <span>Version 0.0.1</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AuthView;
