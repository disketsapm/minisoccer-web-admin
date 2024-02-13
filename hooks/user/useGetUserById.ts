import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UserService } from '@/services/user/user.service';
import { BaseResponse } from '@/interfaces/global.interface';
import { GetListUserResponse } from '@/interfaces/user.interface';

export function useGetUserById() {
  const userService = new UserService();

  return useMutation<BaseResponse<GetListUserResponse>, Error, any>({
    mutationFn: (payload) => userService.getUserById(payload),
  });
}
