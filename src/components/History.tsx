import { useEffect, useState } from "react";
import Button from "../layouts/Button";
import TimelineMarker from "../layouts/TimelineMarker";
import { fetchActivities } from "../services/activities";

interface TimelineContent {
    id: number,
    summary: string,
    location: string,
    completed: boolean
}

export default function History() {
    const [activities, setActivities] = useState<TimelineContent[]>([]);

    async function loadActivities() {
        const act = await fetchActivities();
        setActivities(act);
    }

    useEffect(() => {
        loadActivities()
    }, []);

  return (
    <div id="history">
        <ol className="relative border-s border-gray-700">
            {activities.map(item => (
                <li key="{item.id}" className="mb-10 ms-4">
                    <TimelineMarker/>
                    <h3>
                        {item.location}
                    </h3>
                    <p className="text-base font-normal text-gray-400">
                        {item.summary}
                    </p>
                    {
                        !item.completed && 
                        <Button 
                            text="Try Again"
                            clickHandler={evt => console.log(evt)}
                            alignment="mt-2"/>
                    }
                </li>
            ))}
        </ol>
    </div>
  );
}