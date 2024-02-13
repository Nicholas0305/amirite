import React from "react";
import RegisterForm from "./RegisterForm";
import RegisterNav from "./RegisterNav";
function RegisterPage() {
  return (
    <div id="register-page-container">
      <div>
        <RegisterNav />
      </div>
      <div id="register-form-container">
        <RegisterForm />
      </div>
    </div>
  );
}
export default RegisterPage;
