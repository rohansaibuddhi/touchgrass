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

export const verifyActivity = async (
  imageData: any,
  activity: any,
  id: Number
) => {
  const response = await fetch(`${baseUrl}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
      image: imageData,
      type: "image/jpeg",
      activity: activity,
    }),
  });

  if (!response.ok) {
    throw new Error("Unable to verify image");
  }

  return response.json();
};
