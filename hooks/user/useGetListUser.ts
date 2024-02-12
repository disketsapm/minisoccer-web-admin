import { BaseResponse } from '@/interfaces/global.interface';
import { GetListUserResponse } from '@/interfaces/user.interface';
import { UserService } from '@/services/user/user.service';
import { useQuery } from '@tanstack/react-query';

export function useGetListUser() {
  const userService = new UserService();

  return useQuery<BaseResponse<Array<GetListUserResponse>>, Error>({
    queryKey: ['getListUser'],
    queryFn: () => userService.getListUser(),
  });
}
