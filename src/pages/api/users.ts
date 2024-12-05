import type { APIRoute } from "astro";
import { buildResponse, isValidSession } from "../../commons/utils";

export const prerender = false;

export const GET: APIRoute = async ({ cookies, redirect }) => {
    try {
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
    } catch (error) {
        console.log("Error: ", error);
    }
    return buildResponse({ success: false }, 500);
};
