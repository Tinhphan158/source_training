import { useCallback, useState } from 'react';

// ----------------------------------------------------------------------

export const useBoolean = (defaultValue = false) => {
  const [isValue, setValue] = useState<boolean>(!!defaultValue);

  const onTrue = useCallback(() => {
    setValue(true);
  }, []);

  const onFalse = useCallback(() => {
    setValue(false);
  }, []);

  const onToggle = useCallback(() => {
    setValue(prev => !prev);
  }, []);

  return {
    isValue,
    onTrue,
    onFalse,
    onToggle,
    setValue,
  };
};
