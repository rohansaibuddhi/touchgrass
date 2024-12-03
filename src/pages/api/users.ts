import type { APIRoute } from "astro";
import { kv } from "../../config/kv.connection";
import jwt from "jsonwebtoken";

export const prerender = false;

export const GET: APIRoute = async ({ request, cookies }) => {
  const session = cookies.get("session");
  let idToken = null;
  if (session) {
    idToken = await kv.get(session?.value);
  }

  if (idToken) {
    const idTokenRes = (await jwt.decode(idToken, {
      complete: true,
    })) as jwt.JwtPayload;
    const user = {
      name: idTokenRes.name,
      email: idTokenRes.email,
    };

    return new Response(JSON.stringify(user), { status: 200 });
  }

  return new Response(JSON.stringify({}), { status: 403 });
};
