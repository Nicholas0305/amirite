import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-regular-svg-icons";
function RegisterNav() {
  const navigate = useNavigate();
  const navigateToWelcome = () => {
    navigate("/");
  };
  return (
    <nav className="navbar">
      <h1 onClick={navigateToWelcome}>
        Amirite{" "}
        <FontAwesomeIcon
          style={{ color: "dodgerblue" }}
          id="fa-comment"
          icon={faComment}
        />
      </h1>
    </nav>
  );
}
export default RegisterNav;
