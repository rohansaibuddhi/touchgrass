import { type ActivitySteps } from "./Start";

export const Activity: React.FC<{ steps: ActivitySteps | undefined }> = ({
  steps,
}) => {
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
