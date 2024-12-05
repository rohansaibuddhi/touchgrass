import { useEffect, useRef, useState } from "react";

export interface ActivitySteps {
    [step: string]: string | boolean;
    location: string;
    summary: string;
    completed: boolean;
}

export interface Location {
    latitude: string;
    longitude: string;
}

interface StartProps {
    renderActivityDetails: (location: Location) => void;
}

export default function Start({ renderActivityDetails }: StartProps) {
    const popupElem = useRef<HTMLDivElement>(null);
    const [location, setLocation] = useState<Location>();

    async function updateLocation() {
        const permissionStatus = await navigator.permissions.query({
            name: "geolocation" as PermissionName,
        });

        if (
            permissionStatus.state === "prompt" ||
            permissionStatus.state === "denied"
        ) {
            popupElem.current?.classList.remove("hidden");

            setTimeout(() => {
                popupElem.current?.classList.add("hidden");
            }, 5000);
        }

        navigator.geolocation.getCurrentPosition((position) => {
            setLocation({
                latitude: position.coords.latitude.toString(),
                longitude: position.coords.longitude.toString(),
            });
        });
    }

    useEffect(() => {
        if (location) {
            renderActivityDetails(location);
        }
    }, [location]);

    return (
        <div>
            <div className="flex items-center justify-center ">
                <section className="whitebox w-full max-w-md">
                    <form id="touchgrass" className="items-center">
                        <h1>Do you want to touch grass today?</h1>
                        <button
                            type="button"
                            className="mt-4 mr-4"
                            onClick={(e) => updateLocation()}
                        >
                            Yes
                        </button>
                        <button
                            type="button"
                            className="mt-4 ml-4"
                            onClick={(e) => updateLocation()}
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
                ref={popupElem}
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
