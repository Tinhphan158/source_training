import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { Localize, LocalizeTypeFunc } from '@/context/languages';
import { Helper } from '@/utils/Helper';

import IconRoot from '../icon';
import { IconVariable } from '../icon/types';
export interface IInputRootProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  iconEnd?: React.ReactNode;
  iconStart?: React.ReactNode;
  className?: string;
  text?: string;
  type?: string;
  isReset?: boolean;
  classNameInput?: string;
  classNameLabel?: string;
  name: string;
  isError?: boolean;
  isActive?: boolean | boolean[];
  disabled?: boolean;
  isErrorWrongLogin?: boolean;
  errorString?: string;
  isRequire?: boolean;
}
function InputRoot({
  type = 'text',
  isError = false,
  classNameInput,
  isActive,
  isErrorWrongLogin,
  errorString,
  isRequire = false,
  ...props
}: IInputRootProps) {
  const methods = useFormContext();
  const err =
    (!Helper.isEmpty(methods?.formState?.errors[props.name]?.message) || isError || isErrorWrongLogin) ?? errorString;
  const [state, setState] = React.useState<string | number>(methods?.getValues()[props.name]);
  const handleReset = () => {
    methods?.reset();
    setState('');
  };
  useEffect(() => {
    if (props.isReset) {
      handleReset();
    }
  }, [props.isReset]);
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;
    if (typeof value === 'string') {
      value = event.target.value.trim();
    }
    setState(value);
    methods?.setValue(props.name, value);
    methods?.trigger(props.name);
  };
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const handleFocus = () => {
    setIsFocus(true);
  };
  const handleBlur = () => {
    setIsFocus(false);
  };
  return (
    <div className={`flex w-full flex-col gap-2`}>
      {props.label && (
        <span className={`text-16x20 text-start font-medium text-[#1A1A1A] ${props.classNameLabel}`}>
          {isRequire && <span className='text-red-500'>*</span>} <Localize tid={props.label} />
        </span>
      )}
      <div
        className={` text-neutral-80 flex h-12 items-center gap-2 rounded-lg border px-3 py-[6px] text-base transition ${props.className} ${isError ? 'border-red-500' : 'border-neutral-40 hover:border-primary-hover hover:bg-primary-bg_color focus:border-primary-hover active:border-primary-hover '} ${
          props.disabled && 'hover:bg-neutral-40  cursor-not-allowed border bg-[#b7ffcac8]'
        } ${methods?.formState?.errors[props.name]?.message ? 'border-red-500' : isFocus ? 'custom-shadow border-[#2db976]' : 'border-[#98A2B3]'}`}>
        {props.iconStart}
        <input
          autoFocus={props.autoFocus}
          value={state}
          disabled={props.disabled}
          type={type}
          onChange={handleOnChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
          className={`h-full w-full bg-inherit outline-none ${
            props.disabled && 'bg-neutral-40 cursor-not-allowed'
          } ${classNameInput}`}
          placeholder={LocalizeTypeFunc(props.placeholder ?? '')}
        />
        {props.iconEnd}
      </div>
      <div className='mb-2 flex items-center'>
        {err && (
          <div className='bg-danger-bg_color flex gap-1 p-1'>
            <IconRoot icon={IconVariable.error} />
            <span className='text-12x16 text-neutral-100'>
              <Localize tid={err ?? ''} />
            </span>
          </div>
        )}
        {methods?.formState?.errors[props.name]?.message && (
          <span className='text-sm text-red-500'>{methods?.formState?.errors[props.name]?.message}</span>
        )}
      </div>
    </div>
  );
}

export default InputRoot;
