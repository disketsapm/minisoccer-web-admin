import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ImageService } from '@/services/image/image.service';
import { Image } from '@/interfaces/image.interface';

export function useAddImage() {
  const imageService = new ImageService();
  const queryClient = useQueryClient();
  return useMutation<any, string, Image>({
    mutationFn: (payload) => imageService.createImage(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['listImage'] });
    },
  });
}
