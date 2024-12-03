import type { APIContext } from "astro";
import { createId } from "@paralleldrive/cuid2";
import queryString from "query-string";
import "dotenv/config";

export async function POST({ cookies }: APIContext) {
  const auth0State = createId();
  cookies.set("auth0_state", auth0State, {
    path: "/",
  });

  const authorizationUrl = queryString.stringifyUrl({
    url: "https://dev-2mxcro8letr8o7ed.us.auth0.com/authorize",
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
}
