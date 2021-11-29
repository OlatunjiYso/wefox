declare global {
    namespace NodeJS {
        interface ProcessEnv {
            OPEN_WEATHER_API_KEY: string;
            NODE_ENV: 'development' | 'test';
            PORT?: string;
            JWT_SECRET: string;
            DB_USER: string;
            DB_PASSWORD: string;
            DB_HOST: string;
            DB_PORT: string;
            DB_NAME: string;
            DB_USER_TEST: string;
            DB_PASSWORD_TEST: string;
            DB_HOST_TEST: string;
            DB_PORT_TEST: string;
            DB_NAME_TEST: string;
        }
    }
}

declare module 'jsonwebtoken' {
    export interface JwtPayload {
        userId: string;
        sessionId?: string;
    }
}

export { }