import React, { useState } from "react";

function UserSettingsForm({ isOpen, user }) {
  return (
    <section className={`form-container ${isOpen ? "open" : ""}`}>
      <div className="form">
        <p>{user && user.username}</p>
        <p>Settings</p>
      </div>
    </section>
  );
}

export default UserSettingsForm;
