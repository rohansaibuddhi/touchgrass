import type { APIRoute } from "astro";
import { kv } from "../../config/kv.connection";
import { db } from "../../config/db.connection";
import { users } from "../../models/users";
import { eq } from "drizzle-orm";

export const prerender = false;

export const GET: APIRoute = async ({ request, cookies }) => {
  const session = cookies.get("session");
  let id = null;
  if (session) {
    id = await kv.get(session?.value);
  }

  if (id) {
    const rec = await db
      .select()
      .from(users)
      .where(eq(users.id, parseInt(id)));
    return new Response(JSON.stringify(rec[0]), { status: 200 });
  }

  return new Response(JSON.stringify({}), { status: 403 });
};
