import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BannerService } from '@/services/banner/banner.service';
import { Banner } from '@/interfaces/banner.interface';

export function useAddBanner() {
  const bannerService = new BannerService();
  const queryClient = useQueryClient();
  return useMutation<any, string, Banner>({
    mutationFn: (payload) => bannerService.createBanner(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['listBanner'] });
    },
  });
}
