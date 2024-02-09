import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Draggable from "react-draggable";

function NewChatRoomForm() {
  const formSchema = yup.object({
    room_name: yup.string().required("Please enter a room name."),
    description: yup.string().required("Please enter a description."),
  });

  const formik = useFormik({
    initialValues: {
      room_name: "",
      description: "",
    },
    validationSchema: formSchema,
    onSubmit: (values, { setSubmitting }) => {
      fetch("http://127.0.0.1:5555/chat_rooms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          throw new Error("Network response was not ok.");
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
        })
        .finally(() => {
          setSubmitting(false);
        });
    },
  });

  return (
    <Draggable>
      <div id="newChatRoomForm">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            formik.handleSubmit(e);
          }}
        >
          {" "}
          <h2>New Chat Room</h2>
          <div>
            <input
              id="chatRoomName"
              name="chatRoomName"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.username}
              placeholder="Chat Room Name"
            />
            {formik.errors.username && <div>{formik.errors.username}</div>}
          </div>
          <div>
            <input
              id="description"
              name="description"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.password}
              placeholder="Description"
            />
            {formik.errors.password && <div>{formik.errors.password}</div>}
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </Draggable>
  );
}

export default NewChatRoomForm;
