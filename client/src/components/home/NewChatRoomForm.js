//NewChatRoomForm.js
/*
Form that renders when the + button is clicked on the main page. Allows the user to post a new chat room to the database
Form utilizes Formik
*/
import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";

function NewChatRoomForm({ rooms, setRooms, user }) {
  function addParticipant(currentRoom, currentUser) {
    fetch("http://127.0.0.1:5555/room_participants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add any other headers if needed
      },
      body: JSON.stringify({
        room_id: currentRoom,
        user_id: currentUser,
        // Add any other data you need to send in the request body
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add participant");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Participant added successfully:", data);
      })
      .catch((error) => {
        console.error("Error adding participant:", error);
      });
  }
  //Formik fields
  const formSchema = yup.object({
    room_name: yup.string().required("Please enter a room name."),
    description: yup.string().required("Please enter a description."),
  });
  //Formik values
  const formik = useFormik({
    initialValues: {
      room_name: "",
      description: "",
      user_id: user.user_id,
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
        .then((data) => {
          setRooms([...rooms, data]);

          addParticipant(data.room_id, data.user_id);
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
        })
        .finally(() => {
          setSubmitting(false);
        });
    },
  });
  //Input form for new Chat room
  return (
    <div id="newChatRoomForm">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit(e);
        }}
      >
        <h2>New Chat Room</h2>
        <div>
          <input
            id="chatRoomName"
            name="room_name"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.room_name}
            placeholder="Chat Room Name"
          />
          {formik.errors.room_name && <div>{formik.errors.room_name}</div>}
        </div>
        <div>
          <input
            id="description"
            name="description"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.description}
            placeholder="Description"
          />
          {formik.errors.description && <div>{formik.errors.description}</div>}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default NewChatRoomForm;
