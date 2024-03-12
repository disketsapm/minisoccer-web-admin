import { useQuery } from "@tanstack/react-query";
import { ImageFieldService } from "@/services/image-field/image-field.service";
import { ImageField } from "@/interfaces/image-field.interface";
import { BaseResponse } from "@/interfaces/global.interface";

export function useGetImageFields(params?: any) {
  const imageFieldService = new ImageFieldService();
  return useQuery<BaseResponse<Array<ImageField>>, Error>({
    queryKey: ["listImageField", params],
    queryFn: () => {
      return imageFieldService.getImages(params);
    },
    enabled: !!params
  });
}
