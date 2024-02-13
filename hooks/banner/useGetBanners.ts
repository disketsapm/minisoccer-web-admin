import { useQuery } from '@tanstack/react-query';
import { BannerService } from '@/services/banner/banner.service';
import { Banner } from '@/interfaces/banner.interface';
import { BaseResponse } from '@/interfaces/global.interface';

export function useGetBanners() {
  const bannerService = new BannerService();
  return useQuery<BaseResponse<Array<Banner>>, Error>({
    queryKey: ['getBanners'],
    queryFn: () => bannerService.getBanners(),
  });
}
