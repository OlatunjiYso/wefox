import axios from 'axios';
import dotenv from 'dotenv';
import { IAddress, ICoordinates, INetWorkCallResponse } from '../Interfaces/geolocation';
import { IBaseServiceResponse } from '../Interfaces/users';

dotenv.config();
const weatherApiKey = process.env.OPEN_WEATHER_API_KEY;



export const confirmAddress = async (address: IAddress): Promise<IBaseServiceResponse> => {
    try {
        const response = await lookupAddress(address);
        if (!response.data) throw new Error(response.error);
        const data = response.data as {}[]
        const isValid = data.length > 0;
        const message = isValid ? 'Address found' : 'Address cannot be found';
        const success = isValid;
        const statusCode = 200;
        return { success, message, statusCode }
    }
    catch (err) {
        let errMessage = (err as Error).message;
        return { success: false, message: errMessage, statusCode: 503 }
    }
}

export const checkWeather = async (address: IAddress): Promise<IBaseServiceResponse> => {
    try {
        const response = await lookupAddress(address);
        if (!response.data) throw new Error(response.error);
        const data = response.data as ICoordinates[]
        if (data.length === 0) {
            return { success: false, message: 'Address cannot be found', statusCode: 200 }
        }
        const { lat, lon } = data[0];
        const weatherResponse = await lookUpWeather({ lat, lon });
        if (!weatherResponse.data) throw new Error(response.error);
        return {
            success: true,
            message: 'Weather report',
            statusCode: 200,
            data: weatherResponse.data
        }
    }
    catch (err) {
        let errMessage = (err as Error).message;
        return { success: false, message: errMessage, statusCode: 503 }
    }
}


const lookupAddress = async (address: IAddress): Promise<INetWorkCallResponse> => {
    const { street, streetNumber, town, country, postalcode } = address;
    try {
        const response = await axios({
            method: 'get',
            url: 'https://nominatim.openstreetmap.org/search?',
            params: {
                street: `${streetNumber} ${street}`,
                city: town,
                country,
                postalcode: postalcode,
                format: 'json',
                limit: 1
            }
        });
        const data = response.data;
        return { data }
    }
    catch (err) {
        let errMessage = (err as Error).message;
        return { error: errMessage };
    }
}

const lookUpWeather = async (coords: ICoordinates): Promise<INetWorkCallResponse> => {
    const { lon, lat } = coords;
    try {
        const response = await axios({
            method: 'get',
            url: 'https://api.openweathermap.org/data/2.5/weather/',
            params: {
                lat,
                lon,
                appid: weatherApiKey
            }
        });
        const data = response.data;
        return { data }
    }
    catch (err) {
        let errMessage = (err as Error).message;
        return { error: errMessage };
    }
}