import type { APIRoute } from "astro";

import { tasks } from "../../models/tasks.ts";
import { db } from "../../config/db.connection.ts";
import { eq } from "drizzle-orm";
import {
    getInterestingPlaces,
    buildResponse,
    isValidSession,
    type JWTToken,
} from "../../commons/utils.ts";
import { users } from "../../models/users.ts";
import { activities } from "../../models/activities.ts";
export const prerender = false;

export const POST: APIRoute = async ({ cookies, request, redirect }) => {
    try {
        const decodedToken = await isValidSession(cookies);
        if (!decodedToken) {
            return redirect("/signin");
        }

        const formBody = await request.formData();
        if (!formBody.get("latitude") || !formBody.get("longitude")) {
            throw Error("Missing location data");
        }
        const lat = Number(formBody.get("latitude"));
        const long = Number(formBody.get("longitude"));

        const location = (decodedToken as JWTToken).sub;
        const ret = await db
            .select({ id: users.id })
            .from(users)
            .where(eq(users.location, location));

        if (!ret || ret.length == 0) {
            throw Error("Invalid User");
        }

        const pastLocations = await db
            .select({ location: activities.location })
            .from(activities)
            .where(eq(activities.userid, ret[0].id));

        let locationsToAvoid = "";
        if (pastLocations && pastLocations.length !== 0) {
            locationsToAvoid = pastLocations.map((l) => l.location).join(", ");
        }

        const result = await getInterestingPlaces(lat, long, locationsToAvoid);
        if (!result) {
            throw Error("No Response from Gemini");
        }
        const candidates = result.response?.candidates || null;
        if (!candidates || candidates.length === 0) {
            throw Error("Invalid response from Gemini");
        }
        const content = candidates[0].content.parts[0].text || null;
        if (!content) {
            throw Error("Invalid Response from Gemini");
        }

        const match = content.match(/{[\s\S]*}/);
        const jsonObject = match ? match[0] : "";
        const contentObj = JSON.parse(jsonObject);

        return buildResponse(contentObj, 200);
    } catch (error) {
        console.error("Error generating content:", error);
    }

    // Failsafe response if generation or parsing fails
    return buildResponse(
        {
            success: false,
            message: "Failed to generate content",
        },
        500,
    );
};

//update subtask completion acc to id
export const PUT: APIRoute = async ({ request, cookies, redirect }) => {
    const { taskId, taskCompleted } = await request.json();

    if (!isValidSession(cookies)) {
        return redirect("/signin");
    }

    if (!taskId) {
        return buildResponse({ error: "Invalid task ID or step" }, 400);
    }

    try {
        await db
            .update(tasks)
            .set({ completed: taskCompleted })
            .where(eq(tasks.id, taskId));

        return buildResponse({ success: true }, 200);
    } catch (error) {
        return buildResponse({ error: "Unable to update task" }, 500);
    }
};
