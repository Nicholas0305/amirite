import React, { useState, useEffect } from "react";
import StatsNav from "./StatsNav";
import StatsCard from "./StatsCard";

import { useLocation } from "react-router-dom";
function StatsPage() {
  const location = useLocation();
  const [user, setUser] = useState(location.state?.user); // Initialize user state as null
  const url = "http://127.0.0.1:5555";
  useEffect(() => {
    if (user) {
      fetch(`${url}/users/${user.user_id}`)
        .then((res) => res.json())
        .then((userData) => {
          setUser(userData);
        })
        .catch((error) => console.error("Error fetching user data:", error));
    }
  }, []);
  return (
    <div>
      <StatsNav user={user} />
      <div id="stats-card-container">
        <StatsCard user={user} />
      </div>
    </div>
  );
}
export default StatsPage;
