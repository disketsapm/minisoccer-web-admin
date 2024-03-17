import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FieldService } from "@/services/field/field.service";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export function useUpdateField() {
  const fieldService = new FieldService();
  const queryClient = useQueryClient();
  const route = useRouter();

  return useMutation<string, string, any>({
    mutationFn: (payload) => fieldService.updateField(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["listField"] });
      toast.success("Field updated successfully");
      route.push("/fields");
    },
    onError: (error: any) => {
      toast.error(error.message);
    }
  });
}
