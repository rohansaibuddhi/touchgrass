import { useEffect, useState } from "react";
import History, { type Activity } from "./History";
import { type ActivitySteps, type Location } from "./Start";
import { fetchTaskSteps, fetchCurrentTask } from "../services/taskSteps";
import { requestLocation } from "./Start";
import Start from "./Start";
import Header from "./Header";
import { fetchActivities, storeActivity } from "../services/activities";
import Profile, { type User } from "./Profile";
import { fetchUser } from "../services/users";
import { Activity as CurrActivity } from "./Activity";
import ActivityCompletion from "./ActivityCompletion";

function doSomething() {}

enum DisplayOptions {
  ShowTouchGrassOptions,
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
    DisplayOptions.ShowTouchGrassOptions
  );

  const [currentTask, setCurrentTask] = useState<ActivitySteps>();
  const [location, setLocation] = useState<Location>();
  const [pastActivities, setPastActivities] = useState<Activity[]>([]);
  const [user, setUser] = useState<User>();
  const [currActivity, setCurrActivity] = useState<Number>(-1);

  //useEffect with empty dependency to run once on page load to fetch existing activity if any
  useEffect(() => {
    const initializeActivity = async () => {
      await getCurrentActivity();
    };
    initializeActivity();
  }, []);

  async function renderNewActivity(currLocation: Location) {
    if (!currentTask) {
      const task = await fetchTaskSteps(
        currLocation.latitude,
        currLocation.longitude
      );
      setCurrentTask(task);
      storeActivity(task);
    }

    setDisplayOptions(DisplayOptions.ShowTouchGrassOptions);
  }

  async function renderProfile() {
    setUser(await fetchUser());
    setDisplayOptions(DisplayOptions.ShowProfile);
  }

  async function getCurrentActivity() {
    //fetch all activities
    if (pastActivities.length === 0) {
      const allActivities = await fetchActivities();
      //console.log(allActivities);
      allActivities.forEach(async (activity: returnedActivities) => {
        //check for incomplete activity
        //console.log(activity.completed);
        if (!activity.completed) {
          //get tasks of incomplete activity
          setCurrActivity(activity.id);
          const currActivity = await fetchCurrentTask(activity.id);

          const currTask: ActivitySteps = {
            step1: currActivity[0].description,
            step2: currActivity[1].description,
            step3: currActivity[2].description,
            location: activity.location,
            summary: activity.summary,
            completed: activity.completed,
          };
          setCurrentTask(currTask);
        }
      });
    }
  }

  async function renderActivityHistory() {
    setPastActivities(await fetchActivities());
    setDisplayOptions(DisplayOptions.ShowActivityHistory);
  }

  async function handleLogout() {
    window.location.href = "/signout";
  }

  function renderActivityCompletion() {
    setDisplayOptions(DisplayOptions.ShowActivityCompletion);
    setCurrentTask(undefined);
    console.log(displayOptions);
  }

  return (
    <>
      <Header
        renderProfile={renderProfile}
        renderActivityHistory={renderActivityHistory}
        handleLogout={handleLogout}
        requestLocation={requestLocation}
        setLocation={setLocation}
        renderNewActivity={renderNewActivity}
        location={location}
        currTask={currentTask}
      />

      {/** start of conditionally rendered content */}

      {displayOptions === DisplayOptions.ShowTouchGrassOptions && (
        <h1 className="mt-20">Welcome to Touch Grass</h1>
      )}

      {displayOptions === DisplayOptions.ShowTouchGrassOptions &&
        !currentTask && (
          <Start
            setLocation={setLocation}
            renderNewActivity={renderNewActivity}
          />
        )}

      {displayOptions === DisplayOptions.ShowTouchGrassOptions &&
        currentTask && (
          <CurrActivity
            steps={currentTask}
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
