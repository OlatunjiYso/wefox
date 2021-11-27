import {Express, Request, Response} from 'express';
import { signupHandler, loginHandler } from '../Controllers/auth';
import { addressVerificationHandler, weatherCheckHandler } from '../Controllers/geolocation';
import {requiresAuth} from '../Middlewares/requireAuth';
import {validateSignup } from '../Middlewares/validations';

export const router = (app:Express) => {
    app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200));
    app.post('/api/v1/users', validateSignup, signupHandler);
    app.post('/api/v1/users/auth', loginHandler);
    app.get('/api/v1/addresses/confirmation', addressVerificationHandler);
    app.get('/api/v1/addresses/weather',requiresAuth, weatherCheckHandler);
}