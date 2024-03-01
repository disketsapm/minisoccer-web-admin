import { AuthService } from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { redirect, useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function useLogout() {
  const authService = new AuthService();
  const router = useRouter();

  return useMutation({
    mutationFn: (token: object) => authService.logout(token),
    onSuccess: () => {
      toast.success("Logout success ");
      router.replace("/login");
    },
    onError: (error: any) => {
      toast.error(error.message);
    }
  });
}
