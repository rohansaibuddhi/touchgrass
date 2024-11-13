import type { APIRoute } from "astro";
import { activities } from "../../models/activities.ts";
import { tasks } from "../../models/tasks.ts";
import { db } from "../../config/db.connection.ts";
import { kv } from "../../config/kv.connection.ts";
import { eq } from "drizzle-orm";
import "dotenv/config";
import { GoogleGenerativeAI } from "@google/generative-ai";

interface activityData {
  [step: string]: string;
  location: string;
  summary: string;
}

interface activityVerification {
  id: number;
  image: string;
  type: string;
  activity: string;
}

export const prerender = false;

export const GET: APIRoute = async ({ cookies }) => {
  const session = cookies.get("session");
  const id = await kv.get(session?.value);
  const rec = await db
    .select()
    .from(activities)
    .where(eq(activities.userid, id))
    .orderBy(activities.id);
  return new Response(JSON.stringify(rec), { status: 200 });
};

export const POST: APIRoute = async ({ request, cookies }) => {
  const session = cookies.get("session");
  const id: number = parseInt(await kv.get(session?.value));
  const data: activityData = await request.json();
  let date = new Date();

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

    tasksArr[i] = {
      activityId: activity_id,
      description: data[currStep],
      completed: false,
    };
  }
  const taskRec = await db.insert(tasks).values(tasksArr);

  return new Response(JSON.stringify({ actRec }), { status: 200 });
};

export const PUT: APIRoute = async ({ request, cookies }) => {
  const body: activityVerification = await request.json();

  const id = body.id;

  const genAI = new GoogleGenerativeAI(process.env.VITE_GEMINI_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const type = body.image.split(";base64,")[0].split("data:")[1];
  const image = body.image.split(";base64,")[1];

  const prompt =
    "This user was asked perform a certain action. If the image corresponds to the given action respond with true if verification is successful else false. The action is: " +
    body.activity;

  const generatedContent = await model.generateContent([
    prompt,
    {
      inlineData: {
        data: image,
        mimeType: type,
      },
    },
  ]);

  if (generatedContent.response.text() === "true") {
    await db
      .update(activities)
      .set({ completed: true })
      .where(eq(activities.id, id));
  }

  return new Response(
    JSON.stringify({ verification: generatedContent.response.text() }),
    {
      status: 200,
    }
  );
};
