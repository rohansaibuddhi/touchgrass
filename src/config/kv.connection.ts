import 'dotenv/config';
import { createClient } from 'redis';

const kv = createClient({
        url: process.env.REDIS_URL
    });
await kv.connect();

export { kv };