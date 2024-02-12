import react from "react";
function StatsCard({ user }) {
  return (
    <div className="stats-card">
      <p id="username">{user.username}</p>
      <p>{"L/DL Ratio: " + user.likes / user.dislikes}</p>
      <p id="likes">{"Likes:" + user.likes}</p>
      <p id="dislikes">{"Dislikes:" + user.dislikes}</p>
    </div>
  );
}
export default StatsCard;
