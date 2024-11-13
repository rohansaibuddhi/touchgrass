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

export const fetchCurrentTask = async (activityId: Number) => {
  const response = await fetch(`${baseUrl}/${activityId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to get current activity");
  }

  return response.json();
};
