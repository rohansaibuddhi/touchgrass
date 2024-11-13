const baseUrl = "/api/activities";

export const fetchActivities = async () => {
  const response = await fetch(`${baseUrl}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch activities");
  }
  return response.json();
};

export const storeActivity = async (activity: any) => {
  const response = await fetch(`${baseUrl}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(activity),
  });

  if (!response.ok) {
    throw new Error("Failed to store activity");
  }

  return response.json();
};
