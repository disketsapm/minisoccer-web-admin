import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UserService } from '@/services/user/user.service';

export function useDeleteUser() {
  const userService = new UserService();
  const queryClient = useQueryClient();

  return useMutation<string, string, any>({
    mutationFn: (payload) => userService.deleteUser(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['listUser'] });
    },
  });
}
