import type { APIRoute } from "astro";
import { db } from "../../config/db.connection";
import { users } from "../../models/users";
import { activities } from "../../models/activities";
import { eq, sql, desc } from "drizzle-orm";
import { buildResponse, isValidSession } from "../../commons/utils";

export const prerender = false;

export const GET: APIRoute = async ({ request, cookies, redirect }) => {
    try {
        const decodedToken = await isValidSession(cookies);
        if (!decodedToken) {
            return redirect("/signin");
        }

        const scores = await db
            .select({
                name: users.name,
                score: sql<number>`sum(${activities.points})`.mapWith(Number),
            })
            .from(users)
            .innerJoin(activities, eq(users.id, activities.userid))
            .where(eq(activities.completed, true))
            .groupBy(users.name)
            .orderBy(
                desc(sql<number>`sum(${activities.points})`.mapWith(Number)),
                desc(sql<string>`min(${activities.requestedOn})`.mapWith(Date)),
            )
            .limit(10);
        return buildResponse(scores, 200);
    } catch (error) {
        console.log("Error: ", error);
    }

    return buildResponse({ success: false }, 500);
};
