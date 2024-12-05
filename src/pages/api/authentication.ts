import type { APIRoute } from "astro";
import { kv } from "../../config/kv.connection";
import { createId } from "@paralleldrive/cuid2";
import queryString from "query-string";
import "dotenv/config";

export const prerender = false;

export const POST: APIRoute = async ({ cookies }) => {
    const auth0State = createId();
    cookies.set("auth0_state", auth0State, {
        path: "/",
    });

    const authorizationUrl = queryString.stringifyUrl({
        url: process.env.AUTH0_ENDPOINT + "/authorize",
        query: {
            scope: "openid email profile",
            response_type: "code",
            client_id: process.env.AUTH0_CLIENT_ID,
            redirect_uri: process.env.AUTH0_CALLBACK_URL,
            state: auth0State,
            connection: "google-oauth2",
        },
    });

    return new Response(null, {
        status: 302,
        headers: {
            Location: authorizationUrl,
        },
    });
};

export const DELETE: APIRoute = async ({ redirect, cookies }) => {
    if (cookies.get("session")) {
        const session = cookies.get("session")?.value;
        cookies.set("session", "nop", {
            httpOnly: true,
            expires: new Date("December 17, 1995 03:24:00"),
            path: "/",
        });
        if (session) {
            await kv.del(session);
        }
    }

    return redirect("/signin");
};
