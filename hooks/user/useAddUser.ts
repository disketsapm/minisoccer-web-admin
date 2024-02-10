import { useMutation } from '@tanstack/react-query';
import { UserService } from '@/services/user/user.service';
import { CreateUserRequest } from '@/interfaces/user.interface';

export function useAddUser() {
  const userService = new UserService();

  return useMutation<string, string, CreateUserRequest>({
    queryKey: ['addUser'],
    mutationFn: (payload) => userService.createUser(payload),
  });
}
