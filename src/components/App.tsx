import { useEffect, useState } from "react";
import History, { type Activity } from "./History";
import { type ActivitySteps, type Location } from "./Start";
import { fetchTaskSteps } from "../services/taskSteps";
import Start from "./Start";
import Header from "./Header";
import { fetchActivities } from "../services/activities";
import Profile, { type User } from "./Profile";
import { fetchUser } from "../services/users";
import { Activity as CurrActivity } from "./Activity";

function doSomething() {}

enum DisplayOptions {
  ShowTouchGrassOptions,
  ShowActivityDetails,
  ShowActivityCompletion,
  ShowActivityHistory,
  ShowProfile,
}

export default function App() {
  const [displayOptions, setDisplayOptions] = useState(
    DisplayOptions.ShowTouchGrassOptions
  );

  const [currentTask, setCurrentTask] = useState<ActivitySteps>();

  const [location, setLocation] = useState<Location>();
  const [pastActivities, setPastActivities] = useState<Activity[]>([]);
  const [user, setUser] = useState<User>();

  async function renderNewActivity(currLocation: Location) {
    setCurrentTask(
      await fetchTaskSteps(currLocation.latitude, currLocation.longitude)
    );
    setDisplayOptions(DisplayOptions.ShowActivityDetails);
  }

  async function renderProfile() {
    setUser(await fetchUser());
    setDisplayOptions(DisplayOptions.ShowProfile);
  }

  async function renderActivityHistory() {
    setPastActivities(await fetchActivities());
    setDisplayOptions(DisplayOptions.ShowActivityHistory);
  }

  async function handleLogout() {
    window.location.href = "/signout";
  }

  return (
    <>
      <Header
        renderProfile={renderProfile}
        renderActivityHistory={renderActivityHistory}
        handleLogout={handleLogout}
        renderNewActivity={renderNewActivity}
        location={location}
      />

      {/** start of conditionally rendered content */}

      {displayOptions === DisplayOptions.ShowTouchGrassOptions && (
        <h1 className="mt-20">Welcome to Touch Grass</h1>
      )}

      {displayOptions === DisplayOptions.ShowTouchGrassOptions && (
        <Start
          setLocation={setLocation}
          renderNewActivity={renderNewActivity}
        />
      )}

      {displayOptions === DisplayOptions.ShowActivityDetails && (
        <CurrActivity steps={currentTask} />
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
