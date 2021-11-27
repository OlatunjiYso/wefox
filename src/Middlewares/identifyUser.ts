import { Request, Response, NextFunction } from 'express';
import { decodeToken } from '../helper';
import { reIssueAccessToken } from '../Services/user';

export const identifyUser = async(req:Request, res:Response, next:NextFunction) => {
    let accessToken = req.headers.authorization;
    const refreshToken:any = req.headers['x-refresh'];
    if (!accessToken) return next();
    accessToken = accessToken?.split(' ')[1];
        const { decoded, valid, expired } = decodeToken(accessToken);
        if(decoded) {
            //@ts-ignore
            req.user = decoded;
            return next();
        }
        if(expired && refreshToken) {
            const newAccessToken = await reIssueAccessToken(refreshToken);
            if(newAccessToken) {
                res.setHeader("x-access-token", newAccessToken);
                const { decoded } = decodeToken(newAccessToken);
                 //@ts-ignore
                 req.user = decoded;
            }
        }
        return next();
    }