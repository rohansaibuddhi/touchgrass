import { eq } from "drizzle-orm";
import { db } from "../config/db.connection";
import { users } from "../models/users";
import { kv } from "../config/kv.connection";
import jwt, { type JwtPayload } from "jsonwebtoken";
import {
    GoogleGenerativeAI,
    type GenerateContentResult,
} from "@google/generative-ai";
import type { AstroCookies } from "astro";

export interface JWTToken {
    given_name: string;
    family_name: string;
    nickname: string;
    name: string;
    picture: string;
    updated_at: string;
    email: string;
    email_verified: boolean;
    iss: string;
    aud: string;
    iat: number;
    exp: number;
    sub: string;
    sid: string;
}

export async function registerUser(name: string, email: string, sub: string) {
    const ret = await db
        .select({ id: users.id })
        .from(users)
        .where(eq(users.location, sub));

    console.log("fetched users", ret);

    if (!ret || ret.length === 0) {
        console.log("creating user");
        await db
            .insert(users)
            .values({ name: name, email: email, location: sub });
    }
}

export async function isValidSession(cookies: AstroCookies) {
    const session = cookies.get("session")?.value;

    if (!session) return null;

    const idToken = await kv.get(session);

    if (!idToken) {
        cookies.set("session", "nop", {
            httpOnly: true,
            expires: new Date("December 17, 1995 03:24:00"),
            path: "/",
        });
        return null;
    }

    const decodedToken = jwt.decode(idToken) as JwtPayload;

    return decodedToken;
}

export function buildResponse(json: any, status: number) {
    return new Response(JSON.stringify(json), {
        status: status,
        headers: { "Content-Type": "application/json" },
    });
}

export async function getInterestingPlaces(
    latitude: number,
    longitude: number,
) {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);
    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
    });
    const prompt = `You are playing the role of an activity organizer. Your job is to figure out nearby places of interest to suggest activites that a person can engage in, within a 1 mile radius of the location given to you. You will be given a location in the form of longitude and latitude coordinates which you will use to suggest a location. You will also be given an activity difficulty level to generate activities using, which can be one of the following: Easy - an activity that a single person can do alone, Medium - an activity that requires a friend, Hard - an activity involving a stranger.
You need to generate 1 activity of any one of the difficulties. This activity should be split into three steps. Step 1 should be "Go to 'place of the activity'". Step 2 should be doing the activity. Step 3 should be taking a photo doing the activity. The location should be the place of the activity. The summary should be a 100 characters summary of the whole activity. Be as precise as possible and not verbose.
Return the above as a JSON object with keys 'step1', 'step2', 'step3', 'location', 'summary'. For this location:  ${latitude}, ${longitude}`;
    const result: GenerateContentResult = await model.generateContent(prompt);
    return result;
}
