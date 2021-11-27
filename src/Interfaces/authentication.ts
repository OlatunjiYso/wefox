import jwt, {JwtPayload} from 'jsonwebtoken';
export interface ITokenPayload {
    userId:string;
    sessionId?: string;
}

export interface ITokenDecodeResponse {
    valid:boolean;
    expired:boolean;
    decoded: JwtPayload | string
}

declare module "jsonwebtoken" {
    export interface JwtPayload {
        userId:string;
        sessionId?: string;
    }
}
