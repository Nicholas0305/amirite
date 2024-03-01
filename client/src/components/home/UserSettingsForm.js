import React, { useState } from "react";

function UserSettingsForm({ isOpen, user }) {
  return (
    <div className={`form-container ${isOpen ? "open" : ""}`}>
      <div className="form">
        <p>{user && user.username}</p>
        <p>Settings</p>
      </div>
    </div>
  );
}

export default UserSettingsForm;
