import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ImageFieldService } from "@/services/image-field/image-field.service";
import { ImageField } from "@/interfaces/image-field.interface";

export function useAddImageField() {
  const imageService = new ImageFieldService();
  const queryClient = useQueryClient();
  return useMutation<any, string, any>({
    mutationFn: (payload) => imageService.createImage(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["listImageField"] });
    }
  });
}
