function TimelineMarker() {
    return (
        <div
            className="absolute
        w-2
        h-2
        bg-gray-700
        rounded-full
        border
        border-gray-900
        -start-1
        mt-2"
        ></div>
    );
}

export interface Activity {
    id: number;
    summary: string;
    location: string;
    completed: boolean;
}

interface HistoryProps {
    activities: Activity[];
    handleRetry: Function;
}

export default function History({ activities, handleRetry }: HistoryProps) {
    return (
        <>
            <h1 className="mt-20 flex mb-5 text-center justify-center">
                Activity History
            </h1>
            <div
                id="history"
                className="w-full max-w-md justify-self-center bg-white shadow-md rounded px-8 pt-6 pb-8"
            >
                <ol className="relative border-s border-gray-700">
                    {activities.map((item) => (
                        <li key="{item.id}" className="mb-10 ms-4">
                            <TimelineMarker />
                            <h3>{item.location}</h3>
                            <p className="text-base font-normal text-gray-400">
                                {item.summary}
                            </p>
                        </li>
                    ))}
                </ol>
            </div>
        </>
    );
}
