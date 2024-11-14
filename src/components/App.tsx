import { useEffect, useState } from "react";
import History, { type Activity } from "./History";
import { type ActivitySteps, type Location } from "./Start";
import { fetchTaskSteps, fetchCurrentTask } from "../services/taskSteps";
import Start from "./Start";
import Header from "./Header";
import { fetchActivities, storeActivity } from "../services/activities";
import Profile, { type User } from "./Profile";
import { fetchUser } from "../services/users";
import { Activity as CurrActivity, type TaskStatus } from "./Activity";
import ActivityCompletion from "./ActivityCompletion";
import { logout } from "../services/authentication";

function doSomething() {}

enum DisplayOptions {
  ShowActivityDetails,
  ShowActivityCompletion,
  ShowActivityHistory,
  ShowProfile,
}

interface returnedActivities {
  id: Number;
  userid: Number;
  summary: string;
  requestedOn: Date;
  location: string;
  completed: boolean;
  points: Number;
}

export default function App() {
  const [displayOptions, setDisplayOptions] = useState(
    DisplayOptions.ShowActivityDetails
  );

  const [currentTask, setCurrentTask] = useState<ActivitySteps>();
  const [pastActivities, setPastActivities] = useState<Activity[]>([]);
  const [user, setUser] = useState<User>();
  const [currActivity, setCurrActivity] = useState<Number>(-1);
  const [taskStatus, setTaskStatus] = useState<TaskStatus[]>([
    { taskId: 0, completed: false },
    { taskId: 1, completed: false },
    { taskId: 2, completed: false },
  ]);

  useEffect(() => {
    const initializeActivity = async () => {
      await getCurrentActivity();
    };
    initializeActivity();
  }, []);

  function renderNewActivity() {
    setDisplayOptions(DisplayOptions.ShowActivityDetails);
  }

  async function renderActivityDetails(currLocation: Location) {
    if (!currentTask) {
      const task = await fetchTaskSteps(
        currLocation.latitude,
        currLocation.longitude
      );
      setCurrentTask(task);
      const currTaskIds = await storeActivity(task);
      setTaskStatus(currTaskIds); // taskId, completed
    }

    setDisplayOptions(DisplayOptions.ShowActivityDetails);
  }

  async function renderProfile() {
    setUser(await fetchUser());
    setDisplayOptions(DisplayOptions.ShowProfile);
  }

  async function getCurrentActivity() {
    if (pastActivities.length !== 0) return;

    const allActivities = await fetchActivities();
    allActivities.forEach(async (activity: returnedActivities) => {
      if (!activity.completed) {
        setCurrActivity(activity.id);
        const currActivity = await fetchCurrentTask(activity.id);
        const currTaskStatus = currActivity.map(
          (task: { id: Number; completed: boolean }) => ({
            taskId: task.id,
            completed: task.completed,
          })
        );

        const currTask: ActivitySteps = {
          step1: currActivity[0].description,
          step2: currActivity[1].description,
          step3: currActivity[2].description,
          location: activity.location,
          summary: activity.summary,
          completed: activity.completed,
        };
        setCurrentTask(currTask);
        setTaskStatus(currTaskStatus);
      }
    });
  }

  async function renderActivityHistory() {
    setPastActivities(await fetchActivities());
    setDisplayOptions(DisplayOptions.ShowActivityHistory);
  }

  async function handleLogout() {
    await logout();
  }

  function renderActivityCompletion() {
    setDisplayOptions(DisplayOptions.ShowActivityCompletion);
    setCurrentTask(undefined);
    setTaskStatus([
      { taskId: 0, completed: false },
      { taskId: 1, completed: false },
      { taskId: 2, completed: false },
    ]);
  }

  return (
    <>
      <Header
        renderProfile={renderProfile}
        renderActivityHistory={renderActivityHistory}
        handleLogout={handleLogout}
        renderNewActivity={renderNewActivity}
      />

      {/** start of conditionally rendered content */}

      {displayOptions === DisplayOptions.ShowActivityDetails && (
        <h1 className="mt-20">Welcome to Touch Grass</h1>
      )}

      {displayOptions === DisplayOptions.ShowActivityDetails &&
        !currentTask && <Start renderActivityDetails={renderActivityDetails} />}

      {displayOptions === DisplayOptions.ShowActivityDetails &&
        currentTask &&
        taskStatus.length !== 0 && (
          <CurrActivity
            steps={currentTask}
            taskStatus={taskStatus}
            setTaskStatus={setTaskStatus}
            renderActivityCompletion={renderActivityCompletion}
            id={currActivity}
          />
        )}

      {displayOptions === DisplayOptions.ShowActivityCompletion && (
        <ActivityCompletion
          renderNewActivity={renderNewActivity}
          renderActivityHistory={renderActivityHistory}
        />
      )}

      {displayOptions === DisplayOptions.ShowActivityHistory && (
        <History activities={pastActivities} handleRetry={doSomething} />
      )}

      {displayOptions === DisplayOptions.ShowProfile && user && (
        <Profile {...user} />
      )}

      {/** end of conditionally rendered content */}
    </>
  );
}
