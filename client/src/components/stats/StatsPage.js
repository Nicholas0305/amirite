import React from "react";
import StatsNav from "./StatsNav";
import StatsCard from "./StatsCard";
import { useLocation } from "react-router-dom";
function StatsPage() {
  const location = useLocation();
  const user = location.state && location.state.user;
  console.log(user);
  return (
    <div>
      <StatsNav user={user} />
      <StatsCard user={user} />
    </div>
  );
}
export default StatsPage;
