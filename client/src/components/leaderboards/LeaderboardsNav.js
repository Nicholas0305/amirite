import React from "react";
import { useNavigate } from "react-router-dom";

function MainPageNav({ user }) {
  const navigate = useNavigate();

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
      <h1 onClick={navigateToHome}>Amirite</h1>
      <p onClick={navigateToStats}>Statistics</p>
      <p onClick={navigateToLeaderboards}>Leaderboard</p>
      <p onClick={navigateToAbout}>About</p>
      {user && <p id="userNav"> {user.username}</p>}
      <p onClick={navigateToLogin}>Logout</p>
    </nav>
  );
}
export default MainPageNav;