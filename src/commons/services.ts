export const fetchUser = async () => {
    const response = await fetch("/api/users", {
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

export const fetchTaskSteps = async (
    latitude: string = "",
    longitude: string = "",
) => {
    const response = await fetch("/api/task", {
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
    const response = await fetch(`/api/task/${activityId}`, {
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

export const updateTaskStatus = async (
    taskId: Number,
    taskCompleted: boolean,
) => {
    const response = await fetch("/api/task", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ taskId: taskId, taskCompleted: taskCompleted }),
    });

    if (!response.ok) {
        throw new Error("Failed to update task status");
    }

    return response.json();
};

export const logout = async () => {
    const response = await fetch("/api/authentication", {
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

export const fetchActivities = async () => {
    const response = await fetch("/api/activities", {
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
    const response = await fetch("/api/activities", {
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
    id: Number,
) => {
    const response = await fetch("/api/activities", {
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

export const fetchScores = async () => {
    const response = await fetch("/api/scores", {
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
