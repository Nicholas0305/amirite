import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Draggable from "react-draggable";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client"; // Import socket.io-client

function LoginForm() {
  const navigate = useNavigate();
  const [socket, setSocket] = useState(null); // State to store the WebSocket connection

  const formSchema = yup.object({
    username: yup.string().required("Please enter username"),
    password: yup.string().required("Please enter password."),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: formSchema,
    onSubmit: (values, { setSubmitting }) => {
      if (socket) {
        socket.emit("login", values); // Send login data via WebSocket
        setSubmitting(false); // Reset submitting state after form submission
      }
    },
  });

  // Establish WebSocket connection when the component mounts
  React.useEffect(() => {
    const newSocket = io("http://127.0.0.1:5555");
    setSocket(newSocket);

    // Clean up WebSocket connection when the component unmounts
    return () => {
      newSocket.close();
    };
  }, []);

  // Listen for response from server
  React.useEffect(() => {
    if (socket) {
      socket.on("login_response", (data) => {
        if (data.success) {
          navigate("/MainPage", { state: { user: data } });
        } else {
          alert(data.message);
        }
      });
    }
  }, [socket]);

  function navigateToRegister() {
    navigate("/Register");
  }

  return (
    <div className="login_form">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit(e);
        }}
      >
        <h2>Login</h2>
        <div>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.username}
            placeholder="Username"
          />
          {formik.errors.username && <div>{formik.errors.username}</div>}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            placeholder="Password"
          />
          {formik.errors.password && <div>{formik.errors.password}</div>}
        </div>
        <button type="submit">Submit</button>
        <div id="register-message-container">
          <p>New here? </p>
          <p onClick={navigateToRegister} id="register-message">
            Register here
          </p>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
