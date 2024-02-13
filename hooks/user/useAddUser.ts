import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserService } from "@/services/user/user.service";
import { CreateUserRequest } from "@/interfaces/user.interface";

export function useAddUser() {
  const userService = new UserService();
  const queryClient = useQueryClient();

  return useMutation<string, string, CreateUserRequest>({
    mutationFn: (payload) => userService.createUser(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getListUser"] });
    }
  });
}
