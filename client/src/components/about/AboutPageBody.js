// AboutPageBody.js
import React from "react";

function AboutPageBody() {
  return (
    <div className="about-page-container">
      <div className="about-card">
        <h1>Current State of Amirite</h1>
        <p>
          Welcome to Amirite! Here you can find what I plan on adding next and
          also learn a little about me! This is my biggest project yet,
          developed solely by me as I continue on my path to be a software
          engineer. Here's what I plan on adding next:
        </p>
        <ul>
          <li>
            Leveling system to go with the global leaderboards (Levels based on
            likes received)
          </li>
          <li>Private Chat Rooms for 1v1 debates</li>
          <li>Reworked like/dislike system</li>
          <li>Audio message implementation</li>
          <li>Real time message updates</li>
        </ul>
      </div>
    </div>
  );
}

export default AboutPageBody;
