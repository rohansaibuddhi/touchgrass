import React, { useEffect, useState } from "react";

interface ActivitySteps {
  step1: string;
  step2: string;
  step3: string;
}

const Activity: React.FC<{ steps: ActivitySteps | null }> = ({ steps }) => {
  if (!steps) return <p className="text-xl"> Could not generate activity.</p>;
  return (
    <div className="flex justify-center place-items-center items-center min-h-screen ">
      <div className="flex max-w-2xl max-h-4xl min-h-96 w-full place-items-center whitebox">
        <form id="tasks">
          <h1> Your Task : </h1>
          <ol>
            <li>
              <input type="checkbox" className="step1" value="done" />
              <label htmlFor="step1">
                {" "}
                <strong>Step 1:</strong> {steps.step1}{" "}
              </label>
            </li>
            <li>
              <input type="checkbox" className="step2" value="done" />
              <label htmlFor="step2">
                {" "}
                <strong>Step 2:</strong> {steps.step2}{" "}
              </label>
            </li>
            <li>
              <input type="checkbox" className="step3" value="done" />
              <label htmlFor="step3">
                {" "}
                <strong>Step 3:</strong> {steps.step3}{" "}
              </label>
              <br />
              <input type="file" name="photo" />
            </li>
          </ol>
          <button type="submit" className="mt-4">
            Proceed
          </button>
        </form>
      </div>
    </div>
  );
};

const Start: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [activitySteps, setActivitySteps] = useState<ActivitySteps | null>(
    null
  );
  useEffect(() => {
    const buttons = document.querySelectorAll("button");

    const requestLocation = async () => {
      const popup = document.getElementById("location-popup");

      try {
        const permissionStatus = await navigator.permissions.query({
          name: "geolocation" as PermissionName,
        });

        if (
          permissionStatus.state === "prompt" ||
          permissionStatus.state === "denied"
        ) {
          // Show the popup only if permission is 'prompt'
          popup?.classList.remove("hidden");

          // Hide popup after 5 seconds
          setTimeout(() => {
            popup?.classList.add("hidden");
          }, 5000);
        }

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;
              console.log("User Location:", latitude, longitude);

              // Set latitude and longitude in hidden inputs
              (document.getElementById("latitude") as HTMLInputElement).value =
                latitude.toString();
              (document.getElementById("longitude") as HTMLInputElement).value =
                longitude.toString();

              //fetch the api response
              //   (
              //     document.getElementById("touchgrass") as HTMLFormElement
              //   ).submit();
              const response = await fetch("/api/task", {
                method: "POST",
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                  latitude: latitude.toString(),
                  longitude: longitude.toString(),
                }),
              });

              if (!response.ok) {
                console.log("Failed to fetch activity steps");
              }

              const data = await response.json();
              setActivitySteps(data);
              setLoading(false);
            },
            (error) => {
              console.log("Location access denied", error);
            }
          );
        } else {
          console.log("Geolocation is not supported by this browser");
        }
      } catch (error) {
        console.log("Permission query failed", error);
      }
    };

    buttons.forEach((button) => {
      button.addEventListener("click", requestLocation);
    });

    // Cleanup event listeners on component unmount
    return () => {
      buttons.forEach((button) => {
        button.removeEventListener("click", requestLocation);
      });
    };
  }, []);

  return loading ? (
    <div>
      <div className="flex items-center justify-center min-h-screen">
        <section className="whitebox w-full max-w-md">
          <form id="touchgrass" className="items-center">
            <h1>Do you want to touch grass today?</h1>
            <button type="button" className="mt-4 mr-4">
              Yes
            </button>
            <button type="button" className="mt-4 ml-4">
              Yes Please!
            </button>
            {/* Hidden inputs for location data */}
            <input type="hidden" id="latitude" name="latitude" />
            <input type="hidden" id="longitude" name="longitude" />
          </form>
        </section>
      </div>

      {/* Popup for Location Access Message */}
      <div
        id="location-popup"
        className="hidden fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75"
      >
        <div className="bg-white p-6 rounded shadow-lg max-w-xl text-center">
          <p className="text-l">
            Please enable Location access in the top left corner...
          </p>
        </div>
      </div>
    </div>
  ) : (
    <Activity steps={activitySteps} />
  );
};

export default Start;
