import type { APIRoute } from "astro";
export const prerender = false;

export const POST: APIRoute = async ({ request, redirect, cookies }) => {
  if (request) {
    console.log("yes");
    request.headers.forEach((obj) => {
      console.log(obj);
    });
  }
  const formBody = await request.formData();
  if (formBody.get("uname") && formBody.get("pwd")) {
    //console.log(formBody.get("uname"));
    const fiveDays = 5 * 24 * 60 * 60 * 1000;
    cookies.set("session", "abcdefgh", {
      maxAge: fiveDays,
      path: "/",
    });
    return redirect("/");
  }

  return new Response(null, { status: 400 });
};
