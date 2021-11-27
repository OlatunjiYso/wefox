import mongoose from 'mongoose';
import { dbUrl, environment } from './config';

const connect = () => {
    mongoose.connect(dbUrl, {}, (err) => {
        if (err) {
            console.log(`An error occured while connecting to db on ${environment} environment`, err)
        }
    });
}
const disconnect = () => { mongoose.connection.close() }

export default {connect, disconnect}