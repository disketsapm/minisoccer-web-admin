import { BaseResponse } from '@/interfaces/global.interface';
import { RequestAdapter } from '../request-adapter.service';

import { CreateUserRequest, GetListUserResponse } from '@/interfaces/user.interface';

export class UserService extends RequestAdapter {
  constructor() {
    super();
  }
  public async getListUser(params?: any): Promise<BaseResponse<Array<GetListUserResponse>>> {
    try {
      const response = await this.sendGetRequest<BaseResponse<Array<GetListUserResponse>>>(`/user`, params);

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async createUser({ username, email, password, fullname, phoneNumber, roles }: CreateUserRequest) {
    try {
      const response = await this.sendPostRequest<CreateUserRequest, string>(`/user`, {
        username,
        email,
        password,
        fullname,
        phoneNumber,
        roles,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
