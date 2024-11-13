const baseUrl = "/api/authentication";

export const logout = async () => {
  const response = await fetch(`${baseUrl}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch activities");
  }
  window.location.href = "/";
};
