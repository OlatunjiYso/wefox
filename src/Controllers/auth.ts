import { Request, Response } from 'express';
import { IAuthServiceResponse, ISignupRequest } from '../Interfaces/users';
import { addUser, authenticate } from '../Services/user';
import { validationResult } from 'express-validator';


export const signupHandler = async (req: Request, res: Response) => {
    const { fullName, email, password } = req.body;
    try {
        const response: IAuthServiceResponse = await addUser({ fullName, email, password });
        const { statusCode } = response;
        return res.status(statusCode).json({ response });
    }
    catch (err) {
        const errMessage = (err as Error).message;
        return res.status(503).json({ errMessage })
    }
}

export const loginHandler = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const response:IAuthServiceResponse = await authenticate({email, password});
        const { statusCode } = response;
        return res.status(statusCode).json({ response });
    } 
    catch(err) {
        const errMessage = (err as Error).message;
        return res.status(503).json({errMessage});
    }
}


