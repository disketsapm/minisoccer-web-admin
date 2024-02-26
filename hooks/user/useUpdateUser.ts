import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UserService } from '@/services/user/user.service';
import { CreateUserRequest } from '@/interfaces/user.interface';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export function useUpdateUser() {
  const router = useRouter();
  const userService = new UserService();
  const queryClient = useQueryClient();

  return useMutation<string, string, CreateUserRequest>({
    mutationFn: (payload) => userService.updateUser(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['listUser'] });
      toast.success('User has been created');
      router.push('/users');
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });
}
