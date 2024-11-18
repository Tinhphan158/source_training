import React from 'react';

interface IItemDropdownHeaderProps {
  iconStart?: React.ReactNode;
  title?: string;
  onClick?: () => void;
  className?: string;
}
function ItemDropdownHeader({ iconStart, title, className, onClick }: IItemDropdownHeaderProps) {
  return (
    <div
      onClick={onClick}
      className={`flex select-none items-center gap-3 rounded p-2 font-medium text-[#344054] hover:cursor-pointer hover:bg-slate-200 ${className}`}>
      {iconStart}
      <span className='text-lg'>{title}</span>
    </div>
  );
}

export default ItemDropdownHeader;
