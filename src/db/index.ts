import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const {
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_PORT,
    DB_NAME,
    DB_USER_TEST,
    DB_PASSWORD_TEST,
    DB_HOST_TEST,
    DB_PORT_TEST,
    DB_NAME_TEST
} = process.env;

const dbUsers = {
    test: DB_USER_TEST,
    development: DB_USER
}
const dbPasswords = {
    test: DB_PASSWORD_TEST,
    development: DB_PASSWORD
}
const dbHosts = {
    test: DB_HOST_TEST,
    development: DB_HOST
}
const dbPorts = {
    test: DB_PORT_TEST,
    development: DB_PORT
}

const dbNames = {
    test: DB_NAME_TEST,
    development: DB_NAME
}
const env = process.env.NODE_ENV;
export const dbUrl = `mongodb://${dbUsers[env]}:${dbPasswords[env]}@${dbHosts[env]}:${dbPorts[env]}/${dbNames[env]}?authSource=admin`;

// const connect = () => {
//     mongoose.connect(dbUrl, {}, (err) => {
//         if (err) {
//             console.log(`An error occured while connecting to db on ${env} environment`, err)
//         }
//     });
// }
const connect = async() => {
    try {
        await mongoose.connect(dbUrl, {});
    } 
    catch(err) {
        const errMessage = (err as Error).message;
        console.log(`Error connecting to db on ${env} environment`, errMessage)
    }
}
const disconnect = async() => { 
    try {
        await mongoose.connection.close();
    } 
    catch(err) {
        const errMessage = (err as Error).message;
        console.log(`Error Disonnecting from db on ${env} environment`, errMessage)
    }
}

export default { connect, disconnect }