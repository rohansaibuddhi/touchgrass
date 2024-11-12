const baseUrl = "/api/task";

export const fetchTaskSteps = async (
  latitude: string = "",
  longitude: string = ""
) => {
  const response = await fetch(`${baseUrl}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      latitude: latitude,
      longitude: longitude,
    }),
  });
  if (!response.ok) {
    throw new Error("Failed to fetch activities");
  }

  return response.json();
};
