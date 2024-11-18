import type React from 'react';
import { type MutableRefObject } from 'react';
import { useEffect } from 'react';

const useClickOutside = <T extends HTMLElement | HTMLDivElement | SVGGElement>(
  ref: React.RefObject<T>,
  callback: (event: MouseEvent) => void,
): void => {
  const handleClick = (e: MouseEvent): void => {
    if (ref.current && !ref.current.contains((e.target as Node) || null)) {
      callback(e);
    }
  };
  useEffect(() => {
    document.addEventListener('click', handleClick);

    return (): void => {
      document.removeEventListener('click', handleClick);
    };
  }, [ref as MutableRefObject<T>, callback]);
};

export default useClickOutside;
