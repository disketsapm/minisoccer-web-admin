import { LoginRequestBody } from "@/interfaces/auth.interface";
import { AuthService } from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function useLogin() {
  const authService = new AuthService();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: LoginRequestBody) => authService.login(data),
    onSuccess: () => router.push("/dashboard"),
    onError: (error) => {
      toast.error(error.message);
    }
  });
}
