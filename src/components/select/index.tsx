import { useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { Localize } from '@/context/languages';
import { Helper } from '@/utils/Helper';

import IconRoot from '../icon';
import { IconVariable } from '../icon/types';

export interface IOption {
  value: any;
  label: string;
}

export interface ISelectProps {
  options: IOption[];
  firstValue?: IOption;
  name: string;
  isReset?: boolean;
  disabled?: boolean;
  isErrorWrongLogin?: boolean;
  errorString?: string;
  isError?: boolean;
  className?: string;
  classNameSelected?: string;
  classNameItemSelect?: string;
  classNameOptionList?: string;
  onChange?: (value: any) => void;
}

function SelectRoot({
  options,
  onChange,
  isError = false,
  isErrorWrongLogin,
  disabled = false,
  errorString,
  ...props
}: ISelectProps) {
  const methods = useFormContext();
  const err =
    (!Helper.isEmpty(methods?.formState?.errors[props.name]?.message) || isError || isErrorWrongLogin) ?? errorString;
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState<IOption>(props.firstValue?.value || props.firstValue);
  const handleReset = () => {
    methods?.reset();
    setValue(
      props.firstValue ?? {
        value: options[0].value,
        label: options[0].label,
      },
    );
  };

  useEffect(() => {
    if (props.firstValue?.value) {
      setValue(props.firstValue);
    }
  }, [props.firstValue?.value]);

  useEffect(() => {
    if (props.isReset) {
      handleReset();
    }
  }, [props.isReset]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    setIsFocus(!isFocus);
  };

  const handleOptionClick = (optionValue: IOption) => {
    methods?.setValue(props.name, optionValue.value);
    methods?.trigger(props.name);
    if (onChange) {
      onChange(optionValue.value);
    }
    setValue(optionValue);
    setIsOpen(false);
    setIsFocus(false);
  };
  const selectRef = useRef<HTMLDivElement>(null);
  const handleClickOutside = (event: MouseEvent) => {
    if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
      setIsOpen(false);
      setIsFocus(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const [isFocus, setIsFocus] = useState<boolean>(false);

  return (
    <>
      <div
        ref={selectRef}
        className={`relative select-none p-[13px] outline-none ${props.className ?? ''} ${isFocus ? 'custom-shadow border-[#2db976]' : 'border-[#98A2B3]'} ${disabled && 'border border-[#d9d9d9] bg-[#d9efe1]'}`}>
        <div
          className={`flex w-full items-center justify-between gap-2 px-2 text-sm text-black ${props.classNameSelected} ${!disabled && 'cursor-pointer'}`}
          // eslint-disable-next-line no-void
          onClick={disabled ? () => void 0 : handleToggle}>
          <span className={`text-[#0F1E34] ${value && value?.value === '' && 'text-gray-400'}`}>
            {value ? value.label : 'Lựa chọn'}
          </span>
          {isOpen ? (
            <span className='text-[#0F1E34]'>
              <IconRoot icon={IconVariable.arrowUp} />
            </span>
          ) : (
            <span className='text-[#0F1E34]'>
              <IconRoot icon={IconVariable.arrowDown} />
            </span>
          )}
        </div>

        {isOpen && (
          <div
            className={`absolute left-0 right-0 z-10 mt-[17px] w-full overflow-y-auto rounded-md border border-gray-200 bg-white p-1 text-start shadow-md ${props.classNameOptionList}`}>
            <ul>
              {options.map(option => (
                <li
                  key={option.value}
                  className={`cursor-pointer rounded px-2 py-2 text-sm text-gray-700 hover:bg-[#e1e1e1] ${props.classNameItemSelect}`}
                  onClick={() => {
                    handleOptionClick(option);
                  }}>
                  {option.label}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {err && (
        <div className='mt-2 flex items-center text-sm'>
          {err && (
            <div className='bg-danger-bg_color flex gap-1 p-1'>
              <IconRoot icon={IconVariable.error} />
              <span className='text-12x16 text-neutral-100'>
                <Localize tid={err ?? ''} />
              </span>
            </div>
          )}
          {methods?.formState?.errors[props.name]?.message && (
            <p className='text-red-500'>{methods?.formState?.errors[props.name]?.message}</p>
          )}
        </div>
      )}
    </>
  );
}

export default SelectRoot;
