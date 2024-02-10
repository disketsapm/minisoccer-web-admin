import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UserService } from '@/services/user/user.service';

export function useDeleteUser() {
  const userService = new UserService();
  const queryClient = useQueryClient();

  return useMutation<string, string, number>({
    mutationFn: (userId: number) => userService.deleteUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getListUser'] });
    },
  });
}
