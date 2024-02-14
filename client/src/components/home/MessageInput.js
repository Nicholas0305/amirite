// MessageInput.js
/*Message Input component that allows users to send/post messages to chat rooms
Form is structered using Formik */
import React, { useState } from "react";

function MessageInput({ user, socket, room, messages, setMessages }) {
  const [message, setMessage] = useState("");

  const addMessage = (e) => {
    e.preventDefault();

    // Send message to WebSocket server
    socket.emit("new_message", {
      message: message,
      room_id: room.room_id,
      user_id: user.user_id,
    });

    // Create a new message object
    const newMessage = {
      message: message,
      username: user.username, // Assuming you have the username available in the user object
      // Add other necessary properties here
    };

    // Update the messages state with the new message
    setMessages([...messages, newMessage]);

    // Reset the message input field
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
