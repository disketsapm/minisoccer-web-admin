import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FieldService } from "@/services/field/field.service";

export function useDeleteField() {
  const fieldService = new FieldService();
  const queryClient = useQueryClient();

  return useMutation<string, string, any>({
    mutationFn: (payload) => fieldService.deleteField(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["listField"] });
    }
  });
}
