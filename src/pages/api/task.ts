import type { APIRoute } from "astro";
import { GoogleGenerativeAI } from "@google/generative-ai";
import type { GenerateContentResult } from "@google/generative-ai";
export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const formBody = await request.formData();
  const parsedData = Object.fromEntries(formBody.entries());
  console.log(parsedData);
  if (formBody.get("latitude") && formBody.get("longitude")) {
    const lat = Number(formBody.get("latitude"));
    const long = Number(formBody.get("longitude"));

    async function getInterestingPlaces(latitude: number, longitude: number) {
      const apiKey = import.meta.env.VITE_GEMINI_KEY;
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `You are playing the role of an activity organizer. Your job is to figure out nearby places of interest to suggest activites that a person can engage in, within a 1 mile radius of the location given to you. You will be given a location in the form of longitude and latitude coordinates which you will use to suggest a location. You will also be given an activity difficulty level to generate activities using, which can be one of the following: Easy - an activity that a single person can do alone, Medium - an activity that requires a friend, Hard - an activity involving a stranger.
You need to generate 1 activity of any one of the difficulties. This activity should be split into three steps. Step 1 should be "Go to 'place of the activity'". Step 2 should be doing the activity. Step 3 should be taking a photo doing the activity. Be as precise as possible and not verbose.
Return the above as a JSON object with keys 'step1', 'step2', 'step3'. For this location:  ${latitude}, ${longitude}`;
      const result: GenerateContentResult = await model.generateContent(prompt);
      return result;
    }

    try {
      const result = await getInterestingPlaces(lat, long);
      if (result) {
        const candidates = result.response?.candidates || null;
        if (candidates && candidates.length !== 0) {
          const content = candidates[0].content.parts[0].text || null;
          if (content) {
            const match = content.match(/{[\s\S]*}/);
            const jsonObject = match ? match[0] : "";

            try {
              const contentObj = JSON.parse(jsonObject);
              return new Response(JSON.stringify(contentObj), {
                status: 200,
                headers: { "Content-Type": "application/json" },
              });
            } catch (error) {
              console.error("JSON parsing error:", error);
            }
          }
        }
      }
    } catch (error) {
      console.error("Error generating content:", error);
    }
  }

  // Failsafe response if generation or parsing fails
  return new Response(
    JSON.stringify({
      success: false,
      message: "Failed to generate content",
    }),
    { status: 500, headers: { "Content-Type": "application/json" } }
  );
};
