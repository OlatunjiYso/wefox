import dotenv from 'dotenv';
dotenv.config();

interface IConnectionStrings {
    development: string,
    test: string,
    production: string,
}

let dbUrls:IConnectionStrings = {
    development: process.env.DEVELOPMENT_DB,
    test: process.env.TEST_DB,
    production: process.env.PRODUCTION_DB
}

export const environment = process.env.NODE_ENV;
export const dbUrl:string = dbUrls[environment];