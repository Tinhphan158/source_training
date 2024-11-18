import React from 'react';

interface IInfoFieldRowProps {
  icon?: React.ReactNode;
  content?: string;
}
function InfoFieldRow(props: IInfoFieldRowProps) {
  return (
    <div className='flex items-center gap-2 font-medium text-[#475467]'>
      {props.icon}
      <span>{props.content}</span>
    </div>
  );
}

export default InfoFieldRow;
