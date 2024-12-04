interface ActivityCompletionProps {
    renderNewActivity: Function;
    renderActivityHistory: Function;
}

export default function ActivityCompletion({
    renderNewActivity,
    renderActivityHistory,
}: ActivityCompletionProps) {
    return (
        <form
            id="taskcomplete"
            className="whitebox mt-20 w-full max-w-md justify-self-center"
        >
            <h1>Congrats, you've completed your task!</h1>
            <p>Image here!</p>
            <button
                type="submit"
                className="mt-4 mr-4"
                onClick={(evt) => {
                    evt.preventDefault();
                    renderNewActivity();
                }}
            >
                New Task
            </button>
            <button
                type="submit"
                className="mt-4 ml-4"
                onClick={(evt) => {
                    evt.preventDefault();
                    renderActivityHistory();
                }}
            >
                Home
            </button>
        </form>
    );
}
