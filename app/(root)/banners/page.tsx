'use client';

import { useEffect } from 'react';
import { BannerClient } from './components/client';
import { useGetBanners } from '@/hooks/banner/useGetBanners';

const BannerPage = () => {
  const { data, error, mutate } = useGetBanners();

  useEffect(() => {
    mutate(null);
  }, []);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BannerClient data={data?.data ?? []} />
      </div>
    </div>
  );
};

export default BannerPage;
