import type { APIRoute } from "astro";
import { activities } from "../../models/activities.ts";
import { tasks } from "../../models/tasks.ts";
import { db } from "../../config/db.connection.ts";
import { kv } from "../../config/kv.connection.ts";
import { eq } from "drizzle-orm";

interface activityData {
  [step: string]: string;
  location: string;
  summary: string;
}

export const prerender = false;
export const GET: APIRoute = async ({ cookies }) => {
  const session = cookies.get("session");
  const id = await kv.get(session?.value);
  const rec = await db
    .select()
    .from(activities)
    .where(eq(activities.userid, id));
  return new Response(JSON.stringify(rec), { status: 200 });
};

export const POST: APIRoute = async ({ request, cookies }) => {
  const session = cookies.get("session");
  const id: number = parseInt(await kv.get(session?.value));
  const data: activityData = await request.json();
  let date = new Date();
  //console.log(id, date);
  const activity = {
    userid: id,
    summary: data.summary,
    requestedOn: date.toISOString(),
    location: data.location,
    completed: false,
    points: 20,
  };
  const actRec = await db.insert(activities).values(activity).returning();
  const activity_id = actRec[0].id;

  //insert tasks to the tasks table
  const tasksArr = [];
  for (let i = 0; i < 3; i++) {
    let currStep = "step" + (i + 1);
    console.log(currStep);
    tasksArr[i] = {
      activityId: activity_id,
      description: data[currStep],
      completed: false,
    };
  }
  //console.log(tasksArr);
  const taskRec = await db.insert(tasks).values(tasksArr);

  return new Response(JSON.stringify({ hello: "world" }), { status: 200 });
};
