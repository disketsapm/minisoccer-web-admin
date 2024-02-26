import { BaseResponse } from '@/interfaces/global.interface';
import { RequestAdapter } from '../request-adapter.service';

import { CreateUserRequest, GetListUserResponse, UpdateUserRequest } from '@/interfaces/user.interface';

export class UserService extends RequestAdapter {
  constructor() {
    super();
  }
  public async getListUser(params?: any): Promise<BaseResponse<Array<GetListUserResponse>>> {
    try {
      const response = await this.sendGetRequest<BaseResponse<Array<GetListUserResponse>>>(`/admin/users`, params);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async getUserById(payload: { _id: string }): Promise<BaseResponse<GetListUserResponse>> {
    try {
      const response = await this.sendPostRequest<object, BaseResponse<GetListUserResponse>>(`/admin/users`, payload);

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async createUser({ email, password, fullName, phoneNumber, roles }: CreateUserRequest) {
    try {
      const response = await this.sendPostRequest<CreateUserRequest, string>(`/admin/user`, {
        email,
        password,
        fullName,
        phoneNumber,
        roles,
      });

      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  public async updateUser({ _id, email, password, fullName, phoneNumber, roles }: UpdateUserRequest) {
    try {
      const response = await this.sendPutRequest<UpdateUserRequest, string>(`/admin/user`, {
        _id,
        email,
        password,
        fullName,
        phoneNumber,
        roles,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async deleteUser(payload: { _id: string }) {
    try {
      const response = await this.sendDeleteRequest<object, string>(`/admin/user`, payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
