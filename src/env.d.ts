/// <reference path="../.astro/types.d.ts" />
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      REDIS_URL: string;
      GEMINI_KEY: string;
    }
  }
}

export {};
