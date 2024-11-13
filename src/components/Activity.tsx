import React, { useRef, useState } from "react";
import { type ActivitySteps } from "./Start";
import { verifyActivity } from "../services/activities";
import { updateTaskStatus } from "../services/taskSteps";

interface ActivityProps {
  id: Number;
  steps: ActivitySteps;
  renderActivityCompletion: Function;
  currTaskStatus: TaskStatus[];
}

export interface TaskStatus {
  taskId: number;
  completed: boolean;
}

export function Activity({
  id,
  steps,
  renderActivityCompletion,
  currTaskStatus,
}: ActivityProps) {
  if (!steps) return <p className="text-xl"> Could not generate activity.</p>;

  const [taskStatuses, setTaskStatuses] = useState(currTaskStatus); // Local state for task statuses
  const [stepsCompleted, setStepsCompleted] = useState<number>(
    currTaskStatus.filter((task) => task.completed).length
  );
  const spanElem = useRef<HTMLSpanElement>(null);

  const [verificationImage, setVerificationImage] = useState<File>();

  async function updateSteps(
    evt: React.ChangeEvent<HTMLInputElement>,
    taskId: number,
    index: number
  ) {
    const taskCompleted = evt.target.checked;

    setStepsCompleted((prev) => (taskCompleted ? prev + 1 : prev - 1));

    // Update local state to re-render the checkboxes
    setTaskStatuses((prevStatuses) =>
      prevStatuses.map((task, i) =>
        i === index ? { ...task, completed: taskCompleted } : task
      )
    );

    // Send request to update task status
    try {
      await updateTaskStatus(taskId, taskCompleted);
    } catch (error) {
      console.error("Failed to update task status", error);
    }
  }

  function handleImageCapture(evt: React.ChangeEvent<HTMLInputElement>) {
    if (evt.target && evt.target.files) {
      setVerificationImage(evt.target.files[0]);
    }
  }

  async function submitVerification(
    evt: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    evt.preventDefault();
    if (stepsCompleted !== 3) {
      spanElem.current?.classList.remove("hidden");
      setTimeout(() => spanElem.current?.classList.add("hidden"), 5000);
    } else {
      const fileReader = new FileReader();
      const activityId = id;
      if (verificationImage) fileReader.readAsDataURL(verificationImage);
      fileReader.onloadend = async () => {
        const resp: any = await verifyActivity(
          fileReader.result,
          steps.step3,
          activityId
        );
        if (resp.verification === "true") renderActivityCompletion();
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
              <input
                type="checkbox"
                className="step1"
                onChange={(evt) =>
                  updateSteps(evt, currTaskStatus[0].taskId, 0)
                }
                id={currTaskStatus[0].taskId.toString()}
                checked={taskStatuses[0].completed} // Use local state to control checked status
              />
              <label htmlFor="step1">
                <strong>Step 1:</strong> {steps.step1}
              </label>
            </li>
            <li>
              <input
                type="checkbox"
                className="step2"
                onChange={(evt) =>
                  updateSteps(evt, currTaskStatus[1].taskId, 1)
                }
                id={currTaskStatus[1].taskId.toString()}
                checked={taskStatuses[1].completed}
              />
              <label htmlFor="step2">
                <strong>Step 2:</strong> {steps.step2}
              </label>
            </li>
            <li>
              <input
                type="checkbox"
                className="step3"
                onChange={(evt) =>
                  updateSteps(evt, currTaskStatus[2].taskId, 2)
                }
                id={currTaskStatus[2].taskId.toString()}
                checked={taskStatuses[2].completed}
              />
              <label htmlFor="step3">
                <strong>Step 3:</strong> {steps.step3}
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
          <button type="submit" className="mt-4" onClick={submitVerification}>
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
