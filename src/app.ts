import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import expressValidator from 'express-validator';
import db from './db';
import { router } from './Routes'
import {identifyUser} from './Middlewares/identifyUser';

dotenv.config();
db.connect();
const port = process.env.PORT || 5085;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(identifyUser)

app.listen(port, ()=> {
  console.log(`Listening on port ${port}`);
  router(app);
});
process.on('SIGINT', () => {
    console.warn('Shutting down server...');
    db.disconnect()
    console.log('Server successfully shutdown');
    process.exit(0);
  });