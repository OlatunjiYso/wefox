export interface IAddress {
    street: string;
    streetNumber: string;
    town: string;
    postalcode: string;
    country: string;
}

export interface ICoordinates {
    lon: number;
    lat: number;
}

export interface INetWorkCallResponse {
    data?: {lat:number; lon:number;}[] | {};
    error?:string;
}