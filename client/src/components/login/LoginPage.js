import React from "react";
import LoginForm from "./LoginForm";
import LoginNav from "./LoginNav";
function LoginPage() {
  return (
    <div id="loginPage-container">
      <LoginNav />
      <div id="loginForm-container">
        <LoginForm />
      </div>
    </div>
  );
}
export default LoginPage;
