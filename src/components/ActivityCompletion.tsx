import Button from "./Button";

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
            <img src="/Grass.jpg" className="h-20 w-20" />
            <Button
                text="New Task"
                alignment="mt-4 mr-4"
                clickHandler={(evt) => {
                    evt.preventDefault();
                    renderNewActivity();
                }}
                disable={false}
            />
            <Button
                text="Home"
                alignment="mt-4 ml-4"
                clickHandler={(evt) => {
                    evt.preventDefault();
                    renderActivityHistory();
                }}
                disable={false}
            />
        </form>
    );
}
