// MessageInput.js
import React, { useState } from "react";

function MessageInput({ user, socket }) {
  const [message, setMessage] = useState("");

  const addMessage = (e) => {
    e.preventDefault();

    // Send message to WebSocket server
    socket.emit("message", { message, user_id: user.user_id });

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
