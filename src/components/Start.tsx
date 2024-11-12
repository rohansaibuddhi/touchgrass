import React, { useEffect, useState } from "react";

export interface ActivitySteps {
  step1: string;
  step2: string;
  step3: string;
}

export interface Location {
  latitude: string;
  longitude: string;
}

interface StartProps {
  setLocation: (location: Location) => void;
  renderNewActivity: (location: Location) => void;
}

export default function Start({ setLocation, renderNewActivity }: StartProps) {
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
        popup?.classList.remove("hidden");

        // Hide popup after 5 seconds
        setTimeout(() => {
          popup?.classList.add("hidden");
        }, 5000);
      }

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            console.log("User Location:", latitude, longitude);
            const currLoc: Location = {
              latitude: latitude.toString(),
              longitude: longitude.toString(),
            };
            setLocation(currLoc);
            renderNewActivity(currLoc);
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

  return (
    <div>
      <div className="flex items-center justify-center min-h-screen">
        <section className="whitebox w-full max-w-md">
          <form id="touchgrass" className="items-center">
            <h1>Do you want to touch grass today?</h1>
            <button
              type="button"
              className="mt-4 mr-4"
              onClick={(e) => {
                requestLocation();
              }}
            >
              Yes
            </button>
            <button
              type="button"
              className="mt-4 ml-4"
              onClick={(e) => {
                requestLocation();
              }}
            >
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
  );
}
