import type { APIRoute } from "astro";
import { activities } from '../../models/activities.ts';
import { db } from '../../config/db.connection.ts';
import { kv } from "../../config/kv.connection.ts";
import { eq } from "drizzle-orm";

export const prerender = false;
export const GET: APIRoute = async ({ cookies }) => {
    const session = cookies.get("session");
    const id = await kv.get(session?.value);
    const rec = await db.select()
        .from(activities)
        .where(eq(activities.userid, id));
    return new Response(JSON.stringify(rec), { status: 200 });
};