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
  if (formBody.get("latitude") && formBody.get("longitude")) {
    const lat = Number(formBody.get("latitude"));
    const long = Number(formBody.get("longitude"));
    //console.log(formBody.get("latitude"), formBody.get("longitude"));

    async function getInterestingPlaces(latitude: Number, longitude: Number) {
      const apiKey = "YOUR_GOOGLE_API_KEY";
      const radius = 5000; // Radius in meters (adjust as needed)
      const type = "tourist_attraction";

      const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=${type}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.status === "OK") {
          return data.results; // Array of places
        } else {
          console.error("API error:", data.status, data.error_message);
          return null;
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    }

    // Example usage:
    getInterestingPlaces(lat, long).then((places) => {
      if (places) {
        places.forEach((place) => console.log(place.name, place.vicinity));
      }
    });

    return new Response(
      JSON.stringify({ success: true, message: "Data received", lat, long }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  return new Response(null, { status: 400 });
};
