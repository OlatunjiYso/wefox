import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const {
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_PORT,
    DB_NAME,
  } = process.env;

//const dbUrl = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?authSource=admin`;
const dbUrl = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`;
const environment = process.env.NODE_ENV;

const connect = () => {
    mongoose.connect(dbUrl, {}, (err) => {
        if (err) {
            console.log(`An error occured while connecting to db on ${environment} environment`, err)
        }
    });
}
const disconnect = ()=> { mongoose.connection.close() }

export default { connect, disconnect }