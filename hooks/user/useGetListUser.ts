import { BaseResponse } from "@/interfaces/global.interface";
import { GetListUserResponse } from "@/interfaces/user.interface";
import { UserService } from "@/services/user/user.service";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useGetListUser() {
  const userService = new UserService();

  return useMutation<BaseResponse<Array<GetListUserResponse>>, any, any>({
    mutationFn: (params) => userService.getListUser(params)
  });
}
