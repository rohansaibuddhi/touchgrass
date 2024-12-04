import type { APIContext, APIRoute } from "astro";
import { tasks } from "../../../models/tasks.ts";
import { db } from "../../../config/db.connection.ts";
import { eq } from "drizzle-orm";
import { buildResponse, isValidSession } from "../../../commons/utils.ts";
export const prerender = false;

export const GET: APIRoute = async ({
    params,
    cookies,
    redirect,
}: APIContext) => {
    try {
        const decodedToken = await isValidSession(cookies);
        if (!decodedToken) return redirect("/signin");

        const stringId = params.activityId;
        if (!stringId) {
            return buildResponse({ error: "Activity ID is required" }, 400);
        }
        const activityId = parseInt(stringId, 10);

        if (isNaN(activityId)) {
            return buildResponse({ error: "Invalid Activity ID" }, 400);
        }

        const rec = await db
            .select()
            .from(tasks)
            .where(eq(tasks.activityId, activityId))
            .orderBy(tasks.id);
        return new Response(JSON.stringify(rec), { status: 200 });
    } catch (error) {
        console.log("Error: ", error);
    }

    return buildResponse({ success: false }, 500);
};
