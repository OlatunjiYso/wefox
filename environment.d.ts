declare global {
    namespace NodeJS {
      interface ProcessEnv {
        OPEN_WEATHER_API_KEY: string;
        GOOGLE_MAPS_API_KEY: string;
        NODE_ENV: 'development' | 'production' | 'test';
        PORT?: string;
        DEVELOPMENT_DB: string;
        PRODUCTION_DB: string;
        TEST_DB: string;
        JWT_SECRET:string
      }
    }
  }

  declare module 'jsonwebtoken' {
    export interface JwtPayload {
        userId:string;
        sessionId?: string;
    }
}

  export {}