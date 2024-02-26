import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UserService } from '@/services/user/user.service';
import { CreateUserRequest } from '@/interfaces/user.interface';

export function useUpdateUser() {
  const userService = new UserService();
  const queryClient = useQueryClient();

  return useMutation<string, string, CreateUserRequest>({
    mutationFn: (payload) => userService.updateUser(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['listUser'] });
    },
  });
}
