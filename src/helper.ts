import {  ITokenDecodeResponse, ITokenPayload } from "./Interfaces/authentication";
import dotenv from 'dotenv';
import jwt, { JwtPayload } from 'jsonwebtoken';
dotenv.config();
const jwtSecret = process.env.JWT_SECRET

/**
 * @description An Helper method to Verify Access token
 * @returns 
 */
export const decodeToken = (token: string): ITokenDecodeResponse => {
    try {
        const decoded: JwtPayload|string = jwt.verify(token, jwtSecret);
        return {
            valid: true,
            expired: false,
            decoded: decoded
        }
    } 
    catch (err) {
        let errorMessage:string = (err as Error).message;
        return {
            valid: false,
            expired: errorMessage === 'jwt expired',
            decoded: ''
        }
    }
}

/**
 * @decription An helper to generate AccessToken.
 * @returns string
 */
export const generateAccessToken = (payload:JwtPayload) => {
    //Generate token that expires in 10 hours.
    const accessToken:string = jwt.sign({ userId: payload.userId }, jwtSecret, { expiresIn: 60 * 60 * 10 });
    return accessToken;
}

/**
 * @decription An helper to generate RefreshToken.
 * @returns 
 */
 export const generateRefreshToken = (payload:JwtPayload) => {
    //Generate token that expires in 72 hours.
    const { userId, sessionId } = payload;
    const refreshToken:string = jwt.sign({ userId, sessionId }, jwtSecret, { expiresIn: 60 * 60 * 72 });
    return refreshToken;
}