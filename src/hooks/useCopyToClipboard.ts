import { useState } from 'react';

import { Helper } from '@/utils/Helper';

// ----------------------------------------------------------------------

type CopiedValue = string | null;

type CopyFn = (text: string) => Promise<boolean>;

interface IReturnType {
  copy: CopyFn;
  copiedText: CopiedValue;
}

export const useCopyToClipboard = (): IReturnType => {
  const [copiedText, setCopiedText] = useState<CopiedValue>(null);

  const copy: CopyFn = async text => {
    if (Helper.isNullOrUndefined(navigator?.clipboard)) {
      console.warn('Clipboard not supported');
      return false;
    }

    // Try to save to clipboard then save it in the state if worked
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      return true;
    } catch (error) {
      console.warn('Copy failed', error);
      setCopiedText(null);
      return false;
    }
  };

  return { copiedText, copy };
};
