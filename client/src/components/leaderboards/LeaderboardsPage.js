import React from "react";
import LeaderboardsList from "./LeaderboardsList";
import LeaderboardsNav from "./LeaderboardsNav";
import { useLocation } from "react-router-dom";
function LeaderboardsPage() {
  const location = useLocation();
  const user = location.state && location.state.user;
  const url = "http://127.0.0.1:5555";
  return (
    <div>
      <LeaderboardsNav user={user} />
      <LeaderboardsList url={url} />
    </div>
  );
}
export default LeaderboardsPage;
