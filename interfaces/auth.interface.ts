export interface SignInResponse {
    token: string;
    accountId: number;
    fullName: string;
    email: string;
    active: number;
}
export interface SignUpResponse {
    message: string;
}

export interface LoginRequestBody {
    email: string;
    password: string;
    // captcha: string;
    deviceId: string;
}

export interface RegisterRequestBody {
    fullname: string;
    gender: string;
    birthDate: string;
    identityType: string;
    identityNumber: number;
    phoneNumber: number;
    city: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export enum AuthTypeForm {
    LOGIN = 'login',
    SSO = 'sso',
    FORGOT_PASSWORD = 'forgot_password',
}
