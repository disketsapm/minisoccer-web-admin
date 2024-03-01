import { RequestAdapter } from "./request-adapter.service";
import {
  LoginRequestBody,
  RegisterRequestBody,
  SignInResponse,
  SignUpResponse
} from "@/interfaces/auth.interface";
import { BaseResponse } from "@/interfaces/global.interface";

export class AuthService extends RequestAdapter {
  constructor() {
    super();
  }

  public async login(body: LoginRequestBody): Promise<string> {
    try {
      const { data } = await this.sendPostRequest<LoginRequestBody, BaseResponse<SignInResponse>>(
        "/login",
        body
      );

      if (data?.data?.token) {
        localStorage.setItem("token", data?.data?.token);
        localStorage.setItem("user", JSON.stringify(body));
      }

      return data?.data?.token || "";
    } catch (error) {
      throw error;
    }
  }

  public async register(body: RegisterRequestBody): Promise<string> {
    try {
      const { data } = await this.sendPostRequest<
        RegisterRequestBody,
        BaseResponse<SignUpResponse>
      >("/auth/register", body);

      return data?.data?.message || "";
    } catch (error) {
      throw error;
    }
  }
  public async loginWithGoogle(token: string) {
    try {
      const { data } = await this.sendGetRequest<any>(`/auth/${token}?role=Admin`);
      if (data?.data[0].token) {
        localStorage.setItem("token", data?.data[0]?.token);
        localStorage.setItem("user", JSON.stringify(data?.data[0]));
      }

      return data?.data;
    } catch (error) {
      throw error;
    }
  }

  public async logout(token: object): Promise<string> {
    try {
      const { data } = await this.sendPostRequest<object, BaseResponse<string>>(`/logout`, token);
      return data?.data || "";
    } catch (error) {
      throw error;
    }
  }
}
