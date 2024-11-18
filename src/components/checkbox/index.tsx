import React from 'react';

export interface ICheckboxProps {
  label?: string;
  checked: boolean;
  name: string;
  onChange?: (checked: boolean) => void;
  className?: string;
  classNameCheckbox?: string;
  classNameTicked?: string;
}

export function Checkbox({
  label,
  checked,
  name,
  onChange,
  className,
  classNameCheckbox,
  classNameTicked,
}: ICheckboxProps) {
  return (
    <div
      className={`my-1 flex items-center gap-2 rounded-md px-2 py-1 text-sm hover:cursor-pointer hover:bg-gray-200 ${className}`}>
      <input
        type='checkbox'
        checked={checked}
        onChange={e => {
          if (onChange) {
            onChange(e.target.checked);
          }
        }}
        name={name}
        className='hidden'
        id={name}
      />
      <label
        htmlFor={name}
        className={`relative flex cursor-pointer items-center gap-2`}>
        <span
          className={`relative inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-sm border border-gray-300 ${classNameCheckbox}`}
          style={{
            backgroundColor: checked ? '#2db976' : 'transparent',
            transition: 'background-color 0.2s ease',
          }}>
          {checked && <span className={`text-white ${classNameTicked}`}>&#10003;</span>}
        </span>
        {label}
      </label>
    </div>
  );
}
