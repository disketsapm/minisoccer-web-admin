import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ImageFieldService } from "@/services/image-field/image-field.service";

export function useDeleteImageField() {
  const imageService = new ImageFieldService();
  const queryClient = useQueryClient();

  return useMutation<string, string, any>({
    mutationFn: (payload) => imageService.deleteImage(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["listImageField"] });
    }
  });
}
