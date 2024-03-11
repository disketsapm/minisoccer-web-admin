'use client';

import { ImageForm } from './components/image-form';
import { useGetBanners } from '@/hooks/banner/useGetBanners';

const BannerPage = ({ params }: { params: { imageId: string } }) => {
  const { data, isPending } = useGetBanners({ _id: params.imageId });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ImageForm data={(data?.data as object) ?? null} />
      </div>
    </div>
  );
};

export default BannerPage;
