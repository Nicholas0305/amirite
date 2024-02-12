import React from "react";
import { useNavigate } from "react-router-dom";
function StatsNav({ user }) {
  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate("/MainPage", { state: { user } });
  };
  const navigateToStats = () => {
    navigate("/Stats", { state: { user } });
  };

  return (
    <nav className="navbar">
      <h1 onClick={navigateToHome}>Amirite</h1>
      <p onClick={navigateToStats}>Statistics</p>
      {user && <p id="userNav"> {user.username}</p>}
      <p>Logout</p>
    </nav>
  );
}
export default StatsNav;
