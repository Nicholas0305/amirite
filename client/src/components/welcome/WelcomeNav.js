//MainPageNav.js
//Main page Navbar, houses all client side routes
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";

function WelcomeNav() {
  const navigate = useNavigate();
  const navigateToWelcome = () => {
    navigate("/");
  };
  const navigateToLogin = () => {
    navigate("/Login");
  };
  const navigateToRegister = () => {
    navigate("/Register");
  };

  return (
    <nav className="navbar">
      <div id="navbar-left-container">
        <h1 onClick={navigateToWelcome}>
          Amirite{"  "}
          <FontAwesomeIcon
            style={{ color: "dodgerblue" }}
            id="fa-comment"
            icon={faComment}
          />
        </h1>
        <p onClick={navigateToLogin}>Login</p>
        <p onClick={navigateToRegister}>Register</p>
      </div>
      <div id="navbar-right-container"></div>
    </nav>
  );
}
export default WelcomeNav;
