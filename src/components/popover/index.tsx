import React, { useState } from 'react';

interface IPopoverProps {
  children?: React.ReactNode;
  text: string;
}

export function Popover(props: IPopoverProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const handleMouseEnter = () => {
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  return (
    <div className='relative inline-block'>
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
        {props.children}
      </div>
      {isVisible && (
        <div className='absolute z-10 ml-10 mt-1 rounded border border-[#ccc] bg-white p-2 text-[12px] text-black shadow-md'>
          {props.text}
        </div>
      )}
    </div>
  );
}
