import { useQuery } from '@tanstack/react-query';
import { BannerService } from '@/services/banner/banner.service';
import { Banner } from '@/interfaces/banner.interface';
import { BaseResponse } from '@/interfaces/global.interface';

export function useGetBanners(params?: any) {
  const bannerService = new BannerService();
  return useQuery<BaseResponse<Array<Banner>>, Error>({
    queryKey: ['listBanner', params],
    queryFn: () => {
      return bannerService.getBanners(params);
    },
    enabled: !!params,
  });
}
