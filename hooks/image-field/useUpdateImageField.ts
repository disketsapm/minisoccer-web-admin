import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ImageFieldService } from "@/services/image-field/image-field.service";
import { ImageField } from "@/interfaces/image-field.interface";

export function useUpdateImageField() {
  const imageFieldService = new ImageFieldService();
  const queryClient = useQueryClient();

  return useMutation<string, string, ImageField>({
    mutationFn: (payload) => imageFieldService.updateImage(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["listImageField"] });
    }
  });
}
