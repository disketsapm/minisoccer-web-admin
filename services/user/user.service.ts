import { BaseResponse } from '@/interfaces/global.interface';
import { RequestAdapter } from '../request-adapter.service';

import { CreateUserRequest, GetListUserResponse, UpdateUserRequest } from '@/interfaces/user.interface';

export class UserService extends RequestAdapter {
  constructor() {
    super();
  }
  public async getListUser(): Promise<BaseResponse<Array<GetListUserResponse>>> {
    try {
      const response = await this.sendPostRequest<object, BaseResponse<Array<GetListUserResponse>>>(`/users`, {});
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async getUserById(payload: { _id: string }): Promise<BaseResponse<GetListUserResponse>> {
    try {
      const response = await this.sendPostRequest<object, BaseResponse<GetListUserResponse>>(`/users`, payload);

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async createUser({ username, email, password, fullname, phone, roles }: CreateUserRequest) {
    try {
      const response = await this.sendPostRequest<CreateUserRequest, string>(`/user`, {
        username,
        email,
        password,
        fullname,
        phone,
        roles,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async updateUser({ username, email, password, fullname, phone, roles }: UpdateUserRequest) {
    try {
      const response = await this.sendPostRequest<UpdateUserRequest, string>(`/user`, {
        username,
        email,
        password,
        fullname,
        phone,
        roles,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async deleteUser(payload: { _id: string }) {
    try {
      const response = await this.sendDeleteRequest<object, string>(`/user`, payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
