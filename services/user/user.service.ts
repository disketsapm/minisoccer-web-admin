import { BaseResponse } from '@/interfaces/global.interface';
import { RequestAdapter } from '../request-adapter.service';

import { CreateUserRequest, GetListUserResponse, UpdateUserRequest } from '@/interfaces/user.interface';

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

  public async getUserById(id: number): Promise<BaseResponse<GetListUserResponse>> {
    try {
      const response = await this.sendGetRequest<BaseResponse<GetListUserResponse>>(`/user/${id}`);

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

  public async updateUser({ id, username, email, password, fullname, phoneNumber, roles }: UpdateUserRequest) {
    try {
      const response = await this.sendPostRequest<UpdateUserRequest, string>(`/user/${id}`, {
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

  public async deleteUser(id: number) {
    try {
      const response = await this.sendDeleteRequest<string>(`/user/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
