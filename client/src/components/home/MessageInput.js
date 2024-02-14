// MessageInput.js
/*Message Input component that allows users to send/post messages to chat rooms
Form is structered using Formik */
import React, { useState } from "react";

function MessageInput({ user, socket, room }) {
  const [message, setMessage] = useState("");

  const addMessage = (e) => {
    e.preventDefault();

    // Send message to WebSocket server
    socket.emit("message", {
      message,
      room_id: room.room_id,
      user_id: user.user_id,
    });

    // Reset message input
    setMessage("");
  };

  return (
    <form id="form-container" onSubmit={addMessage}>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Message"
        id="chat-input"
      />
      <button type="submit" id="submit">
        Send
      </button>
    </form>
  );
}

export default MessageInput;
