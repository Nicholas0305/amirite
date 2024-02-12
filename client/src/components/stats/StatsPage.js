import React from "react";
import StatsNav from "./StatsNav";
import { useLocation } from "react-router-dom";
function StatsPage({}) {
  const location = useLocation();
  const user = location.state && location.state.user;
  return (
    <div>
      <StatsNav user={user} />
    </div>
  );
}
export default StatsPage;
