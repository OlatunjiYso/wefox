import { Request, Response } from 'express';
import { IAddress } from '../Interfaces/geolocation';
import { checkWeather, confirmAddress } from '../Services/geolocation';


export const addressVerificationHandler = async(req:Request, res:Response) => {
    const { street, streetNumber, town, postalcode, country} = req.query;
    const address = { street, streetNumber, town, postalcode, country} as IAddress;
    try{
    const response = await confirmAddress(address);
    return res.status(response.statusCode).json({response});
    } 
    catch(err) {
        const errMessage = (err as Error).message;
        return res.status(503).json(errMessage)
    }
}

export const weatherCheckHandler = async(req: Request, res:Response) => {
    const { street, streetNumber, town, postalcode, country} = req.query;
    const address = { street, streetNumber, town, postalcode, country} as IAddress;
    try{
        const response = await checkWeather(address);
        res.status(response.statusCode).json(response);
        } 
        catch(err) {
            const errMessage = (err as Error).message;
            return res.status(503).json(errMessage)
        }
}

