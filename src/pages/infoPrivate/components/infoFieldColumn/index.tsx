import React from 'react';

interface IInfoFieldColumnProps {
  title?: string;
  content?: string;
}
function InfoFieldColumn(props: IInfoFieldColumnProps) {
  return (
    <div className='flex flex-col gap-y-1'>
      <span className='text-sm font-medium text-[#667085]'>{props.title}</span>
      <span className='text-base font-medium text-[#101828]'>{props.content}</span>
    </div>
  );
}

export default InfoFieldColumn;
