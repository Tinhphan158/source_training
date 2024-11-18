import { matchPath, useLocation } from 'react-router-dom';

// ----------------------------------------------------------------------

type ReturnType = boolean;

export const useActiveLink = (path: string, deep = true): ReturnType => {
  const { pathname } = useLocation();

  const isNormalActive = path ? !!matchPath({ path, end: true }, pathname) : false;

  const isDeepActive = path ? !!matchPath({ path, end: false }, pathname) : false;

  return deep ? isDeepActive : isNormalActive;
};
