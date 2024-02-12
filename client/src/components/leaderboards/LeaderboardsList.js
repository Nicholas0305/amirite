import React, { useState, useEffect } from "react";

function LeaderboardsList({ url }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users data
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    fetch(`${url}/users`)
      .then((response) => response.json())
      .then((data) => {
        // Calculate like-dislike ratio and add it to each user
        const usersWithRatio = data.map((user) => ({
          ...user,
          ratio: calculateRatio(user.likes, user.dislikes),
        }));

        // Sort users by ratio in descending order
        const sortedUsers = usersWithRatio.sort((a, b) => b.ratio - a.ratio);

        // Update state with sorted users
        setUsers(sortedUsers);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  };

  const calculateRatio = (likes, dislikes) => {
    // Calculate the like-dislike ratio
    return dislikes !== 0 ? likes / dislikes : likes;
  };

  return (
    <div id="leaderboards-container">
      <div id="leaderboards-title">
        <h2>Leaderboards</h2>
      </div>
      <ul id="leaderboards-list">
        {users.map((user, index) => (
          <li key={user.user_id} id="Leaderboards-card">
            <span>
              {index + 1}. {user.username}
            </span>
            <span>Ratio: {user.ratio.toFixed(2)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LeaderboardsList;
