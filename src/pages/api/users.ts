import type { APIRoute } from "astro";
import { buildResponse, isValidSession } from "../../commons/utils";

export const prerender = false;

export const GET: APIRoute = async ({ request, cookies, redirect }) => {
    const decodedToken = await isValidSession(cookies);
    if (!decodedToken) {
        return redirect("/signin");
    }

    return buildResponse(
        {
            name: decodedToken.name,
            email: decodedToken.email,
            imageUrl: decodedToken.picture,
        },
        200,
    );
};
