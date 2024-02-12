import { useMutation } from '@tanstack/react-query';
import { BannerService } from '@/services/banner/banner.service';
import { Banner } from '@/interfaces/banner.interface';

export function useAddBanner() {
  const bannerService = new BannerService();
  return useMutation<any, string, Banner>({
    mutationFn: (payload) => bannerService.createBanner(payload),
  });
}
