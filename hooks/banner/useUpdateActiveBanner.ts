import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BannerService } from '@/services/banner/banner.service';
import toast from 'react-hot-toast';

export function useUpdateActiveBanner() {
  const bannerService = new BannerService();
  const queryClient = useQueryClient();

  return useMutation<string, string, any>({
    mutationFn: (payload: { _id: string; isActive: boolean }) => bannerService.updateActiveBanner(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['listBanner'] });
      toast.success('Updated status successfully');
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });
}
