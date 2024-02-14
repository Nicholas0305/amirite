// StatsCard.js
import React from "react";
import BarChart from "./BarChart";

function StatsCard({ user }) {
  // Calculate the likes/dislikes ratio
  const likeDislikeRatio = user.likes / user.dislikes;

  // Data for the bar chart
  const chartData = {
    labels: ["Likes", "Dislikes"],
    datasets: [
      {
        label: "Likes vs Dislikes",
        data: [user.likes, user.dislikes],
        backgroundColor: ["rgba(75,192,192,0.2)", "rgba(255,99,132,0.2)"],
        borderColor: ["rgba(75,192,192,1)", "rgba(255,99,132,1)"],
        borderWidth: 1,
        hoverBackgroundColor: ["rgba(75,192,192,0.4)", "rgba(255,99,132,0.4)"],
        hoverBorderColor: ["rgba(75,192,192,1)", "rgba(255,99,132,1)"],
      },
    ],
  };

  return (
    <div className="stats-card">
      <p id="username">{user.username}</p>
      <p>{"L/DL Ratio: " + likeDislikeRatio}</p>
      <p id="likes">{"Likes:" + user.likes}</p>
      <p id="dislikes">{"Dislikes:" + user.dislikes}</p>
      <BarChart chartData={chartData} />
    </div>
  );
}

export default StatsCard;
