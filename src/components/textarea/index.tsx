import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { Localize, LocalizeTypeFunc } from '@/context/languages';
import { Helper } from '@/utils/Helper';

import IconRoot from '../icon';
import { IconVariable } from '../icon/types';
export interface ITextAreaRootProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  iconEnd?: React.ReactNode;
  iconStart?: React.ReactNode;
  className?: string;
  text?: string;
  classNameInput?: string;
  classNameLabel?: string;
  name: string;
  isError?: boolean;
  isActive?: boolean | boolean[];
  disabled?: boolean;
  isErrorWrongLogin?: boolean;
  errorString?: string;
}
function TextAreaRoot({
  isError = false,
  classNameInput,
  isActive,
  isErrorWrongLogin,
  errorString,
  ...props
}: ITextAreaRootProps) {
  const methods = useFormContext();
  const isErrorVariable =
    (!Helper.isEmpty(methods?.formState?.errors[props.name]) || isError || isErrorWrongLogin) ?? errorString;
  const [state, setState] = React.useState<string | number>(methods?.getValues()[props.name]);

  const handleOnChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    setState(value);
    methods?.setValue(props.name, value);
  };
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const handleFocus = () => {
    setIsFocus(true);
  };
  const handleBlur = () => {
    setIsFocus(false);
  };
  return (
    <div className={` flex h-full w-full flex-col gap-2`}>
      {props.label && (
        <span className={`text-16x20 text-start font-medium text-[#1A1A1A] ${props.classNameLabel}`}>
          <Localize tid={props.label} />
        </span>
      )}
      <div
        className={` text-16x20 text-neutral-80 flex h-full items-center gap-2 rounded-lg border p-3 transition ${props.className} ${isError ? 'border-red-500' : 'border-neutral-40 hover:border-primary-hover hover:bg-primary-bg_color focus:border-primary-hover active:border-primary-hover '} ${
          props.disabled && 'hover:bg-neutral-40 cursor-not-allowed border border-[#d9d9d9] bg-[#d9efe1]'
        } ${isFocus ? 'custom-shadow border-[#2db976]' : 'border-[#98A2B3]'}`}>
        {props.iconStart}
        <textarea
          onChange={handleOnChange}
          autoFocus={props.autoFocus}
          value={state}
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
      {!Helper.isEmpty(methods?.formState?.errors[props.name]) && (
        <div className='bg-danger-bg_color flex gap-1 p-1'>
          <IconRoot icon={IconVariable.error} />
          <span className='text-12x16 text-neutral-100'>
            <Localize tid={methods?.formState?.errors[props.name]?.message ?? ''} />
          </span>
        </div>
      )}
      {errorString && (
        <div className='bg-danger-bg_color flex gap-1 p-1'>
          <IconRoot icon={IconVariable.error} />
          <span className='text-12x16 text-neutral-100'>
            <Localize tid={errorString ?? ''} />
          </span>
        </div>
      )}
    </div>
  );
}

export default TextAreaRoot;
