import { BaseResponse } from "@/interfaces/global.interface";
import { RequestAdapter } from "../request-adapter.service";

import {
  CreateUserRequest,
  GetListUserResponse,
  UpdateUserRequest
} from "@/interfaces/user.interface";

export class UserService extends RequestAdapter {
  constructor() {
    super();
  }
  public async getListUser(): Promise<BaseResponse<Array<GetListUserResponse>>> {
    try {
      const response = await this.sendPostRequest<object, BaseResponse<Array<GetListUserResponse>>>(
        `/users`,
        {}
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async getUserById(payload: { _id: string }): Promise<BaseResponse<GetListUserResponse>> {
    try {
      const response = await this.sendPostRequest<object, BaseResponse<GetListUserResponse>>(
        `/users`,
        payload
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async createUser({ email, password, fullName, phoneNumber, roles }: CreateUserRequest) {
    try {
      const response = await this.sendPostRequest<CreateUserRequest, string>(`/user`, {
        email,
        password,
        fullName,
        phoneNumber,
        roles
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async updateUser({
    _id,
    email,
    password,
    fullName,
    phoneNumber,
    roles
  }: UpdateUserRequest) {
    try {
      const response = await this.sendPutRequest<UpdateUserRequest, string>(`/user`, {
        _id,
        email,
        password,
        fullName,
        phoneNumber,
        roles
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
