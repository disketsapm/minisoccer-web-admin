import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ImageService } from '@/services/image/image.service';

export function useDeleteImage() {
  const imageService = new ImageService();
  const queryClient = useQueryClient();

  return useMutation<string, string, any>({
    mutationFn: (payload) => imageService.deleteImage(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['listImage'] });
    },
  });
}
