import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BannerService } from "@/services/banner/banner.service";
import { Banner } from "@/interfaces/banner.interface";

export function useUpdateBanner() {
  const bannerService = new BannerService();
  const queryClient = useQueryClient();

  return useMutation<string, string, Banner>({
    mutationFn: (payload) => bannerService.updateBanner(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getBanners"] });
    }
  });
}
