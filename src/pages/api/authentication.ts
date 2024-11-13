import type { APIRoute } from "astro";
import { kv } from "../../config/kv.connection";
import { db } from "../../config/db.connection";
import { users } from "../../models/users";
import { v4 as uuidv4 } from "uuid";
import { eq } from "drizzle-orm";

export const prerender = false;

export const POST: APIRoute = async ({ request, redirect, cookies }) => {
  const formBody = await request.formData();
  const email = formBody.get("uname");
  if (email) {
    const results = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, email.toString()));
    const session = uuidv4().toString();
    await kv.set(session, results[0].id);
    cookies.set("session", session, {
      httpOnly: true,
      maxAge: 5 * 24 * 60 * 60,
      path: "/",
    });
  }

  return redirect("/");
};
