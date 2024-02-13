import { RegisterRequestBody } from "@/interfaces/auth.interface";
import { AuthService } from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function useRegister() {
  const authService = new AuthService();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: RegisterRequestBody) => authService.register(data),
    onSuccess: () => {
      toast.success("Register success");
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });
}
