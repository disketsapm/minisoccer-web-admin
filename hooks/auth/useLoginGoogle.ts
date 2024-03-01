import { BaseResponse } from "@/interfaces/global.interface";
import { AuthService } from "@/services/auth.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { redirect, useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function useLoginGoogle(loginId: any) {
  const authService = new AuthService();
  const router = useRouter();

  return useQuery<any, Error, any>({
    queryKey: ["loginGoogle"],
    queryFn: () => authService.loginWithGoogle(loginId),
    enabled: !!loginId
  });
}
