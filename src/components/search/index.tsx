import React, { useState } from 'react';

interface ISearchProps {
  onChangeText: (query: string) => void;
  iconStart?: React.ReactNode;
  iconEnd?: React.ReactNode;
  placeholder?: string;
  className?: string;
  classNameInput?: string;
}

export function Search({ onChangeText, ...props }: ISearchProps) {
  const [query, setQuery] = useState<string>('');
  const [isFocus, setIsFocus] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    if (onChangeText) {
      onChangeText(newQuery);
    }
  };
  const handleFocus = () => {
    setIsFocus(true);
  };
  const handleBlur = () => {
    setIsFocus(false);
  };

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-lg border px-[14px] py-2 text-[#667085] ${isFocus ? 'custom-shadow border-[#2db976]' : 'border-[#98A2B3]'} ${props.className}`}>
      {props.iconStart}
      <input
        type='text'
        value={query}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={props.placeholder ?? 'Tìm kiếm'}
        className={`outline-none ${props.classNameInput}`}
      />
      {props.iconEnd}
    </div>
  );
}
