interface LeadercardProps {
    rank: number;
    name: string;
    score: number;
}

function Leadercard({ rank, name, score }: LeadercardProps) {
    return (
        <tr className="bg-gray-100 border-b">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                {rank}
            </td>
            <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                {name}
            </td>
            <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                {score}
            </td>
        </tr>
    );
}

export interface Scoreboard {
    rank: number;
    name: string;
    score: number;
}

interface LeaderboardProps {
    leaderboard: Scoreboard[];
}

export default function Leaderboard({ leaderboard }: LeaderboardProps) {
    return (
        <div className="mt-20 justify-self-center">
            <h1 className="text-center m-5">Leaderboard</h1>
            <table className="table-auto">
                <thead className="bg-white border-b">
                    <tr>
                        <th className="text-md font-bold text-gray-900 px-6 py-4 text-left">
                            Rank
                        </th>{" "}
                        <th className="text-md font-bold text-gray-900 px-6 py-4 text-left">
                            Name
                        </th>{" "}
                        <th className="text-md font-bold text-gray-900 px-6 py-4 text-left">
                            Points
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {leaderboard.map((elem, index) => (
                        <Leadercard
                            rank={index + 1}
                            name={elem.name}
                            score={elem.score}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}
