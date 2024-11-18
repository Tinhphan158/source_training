import { useEffect } from 'react';
import { Controller } from 'react-hook-form';

export interface ICheckboxProps {
  label?: string;
  name: string;
  disabled?: boolean;
  control: any;
  className?: string;
  classNameCheckbox?: string;
  classNameTicked?: string;
  onChange?: (checked: boolean) => void;
}

export function CustomCheckbox({
  label,
  name,
  control,
  disabled,
  className,
  classNameCheckbox,
  classNameTicked,
  onChange,
}: ICheckboxProps) {
  useEffect(() => {}, []);

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={false}
      render={({ field }) => (
        <div
          className={`my-1 flex items-center gap-2 rounded-md px-2 py-1 text-sm hover:cursor-pointer hover:bg-gray-200 ${className} ${disabled && 'border-none bg-[#f5f5f5] hover:cursor-default'}`}>
          <input
            type='checkbox'
            checked={field.value}
            disabled={disabled}
            onChange={e => {
              field.onChange(e.target.checked);
              if (onChange) {
                onChange(e.target.checked);
              }
            }}
            className='hidden'
            id={name}
          />
          <label
            htmlFor={name}
            className={`relative flex cursor-pointer items-center gap-2`}>
            <span
              className={`relative inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-sm border border-gray-300 ${classNameCheckbox}`}
              style={{
                backgroundColor: field.value ? '#2db976' : 'transparent',
                transition: 'background-color 0.2s ease',
              }}>
              {field.value && <span className={`text-white ${classNameTicked}`}>&#10003;</span>}
            </span>
            {label}
          </label>
        </div>
      )}
    />
  );
}
