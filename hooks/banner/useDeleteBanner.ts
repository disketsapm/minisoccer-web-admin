import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BannerService } from '@/services/banner/banner.service';

export function useDeleteBanner() {
  const bannerService = new BannerService();
  const queryClient = useQueryClient();

  return useMutation<string, string, any>({
    mutationFn: (payload) => bannerService.deleteBanner(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['listBanner'] });
    },
  });
}
