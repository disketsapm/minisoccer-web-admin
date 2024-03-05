import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FieldService } from "@/services/field/field.service";
import { Field } from "@/interfaces/field.interface";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export function useAddField() {
  const fieldService = new FieldService();
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<any, string, Field>({
    mutationFn: (payload) => fieldService.createField(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["listField"] });
      toast.success("Field added successfully");
      router.push("/fields");
    },
    onError: (error: any) => {
      toast.error(error.message);
    }
  });
}
