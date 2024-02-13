import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Draggable from "react-draggable";
import io from "socket.io-client";

const socket = io("http://127.0.0.1:5555"); // Replace with your server URL

function NewChatRoomForm({ rooms, setRooms }) {
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
      socket.emit("new_chat_room", values);

      // Assuming the server will emit "new_chat_room_created" event with the new room data
      socket.on("new_chat_room_created", (newRoom) => {
        setRooms([...rooms, newRoom]);
      });

      setSubmitting(false);
    },
  });

  return (
    <Draggable>
      <div id="newChatRoomForm">
        <form onSubmit={formik.handleSubmit}>
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
            {formik.errors.description && (
              <div>{formik.errors.description}</div>
            )}
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </Draggable>
  );
}

export default NewChatRoomForm;
