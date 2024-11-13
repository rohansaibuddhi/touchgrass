/// <reference path="../.astro/types.d.ts" />
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      REDIS_URL: string;
      VITE_GEMINI_KEY: string;
    }
  }
}

export {};
