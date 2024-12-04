/// <reference path="../.astro/types.d.ts" />
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DATABASE_URL: string;
            REDIS_URL: string;
            GEMINI_KEY: string;
            AUTH0_CLIENT_ID: string;
            AUTH0_CLIENT_SECRET: string;
            AUTH0_CALLBACK_URL: string;
            AUTH0_ENDPOINT: string;
        }
    }
}

export {};
