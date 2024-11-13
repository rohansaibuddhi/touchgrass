import React, { useRef, useState } from "react";
import { type ActivitySteps } from "./Start";
import { verifyActivity } from "../services/activities";

interface ActivityProps {
  id: Number;
  steps: ActivitySteps;
  renderActivityCompletion: Function;
}

export function Activity({
  id,
  steps,
  renderActivityCompletion,
}: ActivityProps) {
  if (!steps) return <p className="text-xl"> Could not generate activity.</p>;

  const [stepsCompleted, setStepsCompleted] = useState(0);
  const spanElem = useRef<HTMLSpanElement>(null);

  const [verificationImage, setVerificationImage] = useState<File>();

  function updateSteps(evt: React.ChangeEvent<HTMLInputElement>) {
    if (evt.target.checked) setStepsCompleted(stepsCompleted + 1);
    else setStepsCompleted(stepsCompleted - 1);
  }

  function handleImageCapture(evt: React.ChangeEvent<HTMLInputElement>) {
    if (evt.target && evt.target.files) {
      setVerificationImage(evt.target.files[0]);
    }
  }

  async function submitVerificaton(
    evt: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    evt.preventDefault();
    if (stepsCompleted !== 3) {
      spanElem.current?.classList.remove("hidden");
      setTimeout(() => spanElem.current?.classList.add("hidden"), 5000);
    } else {
      const fileReader = new FileReader();
      const renderActivityComplete = renderActivityCompletion;
      const activityId = id;
      if (verificationImage) fileReader.readAsDataURL(verificationImage);
      fileReader.onloadend = async () => {
        const resp: any = await verifyActivity(
          fileReader.result,
          steps.step3,
          activityId
        );
        console.log(resp);
        if (resp.verification === "true") renderActivityComplete();
      };
    }
  }

  return (
    <div className="flex justify-center place-items-center items-center min-h-screen ">
      <div className="flex max-w-2xl max-h-4xl min-h-96 w-full place-items-center whitebox">
        <form id="tasks">
          <h1> Your Task : </h1>
          <ol>
            <li>
              <input type="checkbox" className="step1" onChange={updateSteps} />
              <label htmlFor="step1">
                {" "}
                <strong>Step 1:</strong> {steps.step1}{" "}
              </label>
            </li>
            <li>
              <input type="checkbox" className="step2" onChange={updateSteps} />
              <label htmlFor="step2">
                {" "}
                <strong>Step 2:</strong> {steps.step2}{" "}
              </label>
            </li>
            <li>
              <input type="checkbox" className="step3" onChange={updateSteps} />
              <label htmlFor="step3">
                {" "}
                <strong>Step 3:</strong> {steps.step3}{" "}
              </label>
              <br />
              <input
                type="file"
                name="photo"
                accept=".jpeg,.jpg,.png"
                onChange={handleImageCapture}
              />
            </li>
          </ol>
          <button type="submit" className="mt-4" onClick={submitVerificaton}>
            Proceed
          </button>
        </form>
        <span className="hidden" ref={spanElem}>
          You need to complete all activities before submitting!
        </span>
      </div>
    </div>
  );
}
