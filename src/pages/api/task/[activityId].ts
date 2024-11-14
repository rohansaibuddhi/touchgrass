import type { APIContext, APIRoute } from "astro";
import { tasks } from "../../../models/tasks.ts";
import { db } from "../../../config/db.connection.ts";
import { eq } from "drizzle-orm";
export const prerender = false;

export const GET: APIRoute = async ({ params }: APIContext) => {
  const stringId = params.activityId;
  if (!stringId) {
    return new Response(JSON.stringify({ error: "Activity ID is required" }), {
      status: 400,
    });
  }
  const activityId = parseInt(stringId, 10);

  if (isNaN(activityId)) {
    return new Response(JSON.stringify({ error: "Invalid Activity ID" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const rec = await db
    .select()
    .from(tasks)
    .where(eq(tasks.activityId, activityId))
    .orderBy(tasks.id);
  return new Response(JSON.stringify(rec), { status: 200 });
};
