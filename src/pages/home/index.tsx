import { useEffect, useState } from 'react';

import AuthService from '@/utils/Auth';

import HomeView from './view';

function HomeIndex() {
  const profile = AuthService.getPackageProfile();

  const [data, setData] = useState<any>();
  useEffect(() => {
    setData(profile || null);
  }, []);
  return <HomeView data={data} />;
}

export default HomeIndex;
