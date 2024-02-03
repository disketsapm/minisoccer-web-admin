import { RequestAdapter } from './request-adapter.service';
import {
    LoginRequestBody,
    RegisterRequestBody,
    SignInResponse,
    SignUpResponse,
} from '@/interfaces/auth.interface';
import { BaseResponse } from '@/interfaces/global.interface';

export class AuthService extends RequestAdapter {
    constructor() {
        super();
    }

    public async login(body: LoginRequestBody): Promise<string> {
        try {
            const { data } = await this.sendPostRequest<
                LoginRequestBody,
                BaseResponse<SignInResponse>
            >('/auth/login', body);

            console.log(data);
            console.log(data?.data?.token);
            if (data?.data?.token) {
                localStorage.setItem('token', data?.data?.token);
            }

            return data?.data?.token || '';
        } catch (error) {
            throw error;
        }
    }

    public async register(body: RegisterRequestBody): Promise<string> {
        try {
            const { data } = await this.sendPostRequest<
                RegisterRequestBody,
                BaseResponse<SignUpResponse>
            >('/auth/register', body);

            return data?.data?.message || '';
        } catch (error) {
            throw error;
        }
    }
}
