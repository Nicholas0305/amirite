import React from "react";
import AboutNav from "./AboutNav";
import AboutPageBody from "./AboutPageBody";
import { useLocation } from "react-router-dom";
function AboutPage() {
  const location = useLocation();
  const user = location.state && location.state.user;
  return (
    <div id="about-page-container">
      <AboutNav user={user} />
      <div id="about-page-body-container">
        <AboutPageBody />
      </div>
    </div>
  );
}
export default AboutPage;
