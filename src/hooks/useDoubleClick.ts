import { type MouseEvent, useCallback, useRef } from 'react';

import { Helper } from '@/utils/Helper';

// ----------------------------------------------------------------------

interface IProps {
  click?: (e: React.SyntheticEvent) => void;
  doubleClick: (e: React.SyntheticEvent) => void;
  timeout?: number;
}

export const useDoubleClick = ({ click, doubleClick, timeout = 250 }: IProps) => {
  const clickTimeout = useRef<any>(null);

  const clearClickTimeout = () => {
    if (!Helper.isNullOrUndefined(clickTimeout.current)) {
      clearTimeout(clickTimeout.current);
      clickTimeout.current = null;
    }
  };

  return useCallback(
    (event: MouseEvent<HTMLElement>) => {
      clearClickTimeout();
      if (click != null && event.detail === 1) {
        clickTimeout.current = setTimeout(() => {
          click(event);
        }, timeout);
      }
      if (event.detail % 2 === 0) {
        doubleClick(event);
      }
    },
    [click, doubleClick, timeout],
  );
};
