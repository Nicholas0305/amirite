//MainPageNav.js
//Main page Navbar, houses all client side routes
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import UserSettingsForm from "./UserSettingsForm";
function MainPageNav({ user }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleForm = () => {
    setIsOpen(!isOpen);
  };
  const navigateToHome = () => {
    navigate("/MainPage", { state: { user } });
  };
  const navigateToStats = () => {
    navigate("/Stats", { state: { user } });
  };
  const navigateToLeaderboards = () => {
    navigate("/Leaderboards", { state: { user } });
  };
  const navigateToAbout = () => {
    navigate("/About", { state: { user } });
  };

  const navigateToLogin = () => {
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div id="navbar-left-container">
        <h1 onClick={navigateToHome}>
          Amirite{"  "}
          <FontAwesomeIcon
            style={{ color: "dodgerblue" }}
            id="fa-comment"
            icon={faComment}
          />
        </h1>
        <p onClick={navigateToStats}>Statistics</p>
        <p onClick={navigateToLeaderboards}>Leaderboard</p>
        <p onClick={navigateToAbout}>About</p>
      </div>
      <div id="navbar-right-container">
        {user && (
          <div id="user-container">
            <FontAwesomeIcon id="user-icon" icon={faUserCircle} />
            <p id="userNav" onClick={toggleForm}>
              {" "}
              {user.username}
            </p>
            <p onClick={navigateToLogin}>Logout</p>
          </div>
        )}
      </div>

      <UserSettingsForm isOpen={isOpen} user={user} />
    </nav>
  );
}
export default MainPageNav;
