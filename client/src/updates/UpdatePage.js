import React from "react";
import UpdateNav from "./UpdateNav";
import UpdateBody from "./UpdateBody";
import { useLocation } from "react-router-dom";
function UpdatePage() {
  const location = useLocation();
  const user = location.state && location.state.user;
  return (
    <div id="about-page-container">
      <UpdateNav user={user} />
      <div id="about-page-body-container">
        <UpdateBody />
      </div>
    </div>
  );
}
export default UpdatePage;
