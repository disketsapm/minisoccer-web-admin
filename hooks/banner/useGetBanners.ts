import { useMutation } from "@tanstack/react-query";
import { BannerService } from "@/services/banner/banner.service";
import { Banner } from "@/interfaces/banner.interface";
import { BaseResponse } from "@/interfaces/global.interface";

export function useGetBanners() {
  const bannerService = new BannerService();
  return useMutation<BaseResponse<Array<Banner>>, Error, any>({
    mutationFn: (params) => bannerService.getBanners(params)
  });
}
