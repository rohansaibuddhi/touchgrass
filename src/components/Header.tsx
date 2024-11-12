import { useEffect, useState } from "react";
import { type Location } from "./Start";

interface HeaderProps {
  renderProfile: Function;
  renderActivityHistory: Function;
  handleLogout: Function;
  renderNewActivity: Function;
  location: Location | undefined;
}

export default function Header({
  renderProfile,
  renderActivityHistory,
  handleLogout,
  renderNewActivity,
  location,
}: HeaderProps) {
  const [showMenu, setShowMenu] = useState(false);
  let menuStyles =
    "mt-16 flex flex-col absolute right-5 bg-white shadow-md rounded " +
    (!showMenu ? "hidden" : "");

  useEffect(() => {
    menuStyles =
      "mt-16 flex flex-col absolute right-5 bg-white shadow-md rounded " +
      (!showMenu ? "hidden" : "");
  }, [showMenu]);
  const menuItemStyles =
    "block text-gray-700 text-sm px-4 py-2 hover:bg-gray-400 hover:text-white";

  return (
    <header className="flex justify-between bg-gray-800 fixed top-0 right-0 left-0">
      <img src="/Grass.jpg" className="rounded h-10 w-20 m-2" />
      <span className="text-center justify-self-end m-4 align-middle text-white font-medium">
        Touch Grass
      </span>
      <img
        src="/User.jpg"
        className="rounded-full h-10 w-10 m-2 justify-self-end"
        onClick={(evt) => setShowMenu(!showMenu)}
      />
      <div className={menuStyles}>
        <a className={menuItemStyles} onClick={(evt) => renderProfile()}>
          Your Profile
        </a>
        <a
          className={menuItemStyles}
          onClick={(evt) => renderNewActivity(location)}
        >
          Touch Grass
        </a>
        <a
          className={menuItemStyles}
          onClick={(evt) => renderActivityHistory()}
        >
          Activity History
        </a>
        <a className={menuItemStyles} onClick={(evt) => handleLogout()}>
          Logout
        </a>
      </div>
    </header>
  );
}
