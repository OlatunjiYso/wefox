export interface IBaseServiceResponse {
    statusCode: number;
    message: string;
    success: boolean;
    data?: object
}
export interface ILoginRequest {
    email: string;
    password: string;
}
export interface ISignupRequest {
    fullName: string;
    email: string;
    password: string;
}

export interface IAuthServiceResponse extends IBaseServiceResponse {
    accessToken?: string
    refreshToken?: string
}
