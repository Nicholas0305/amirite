import React, { useState } from "react";

function MessageInput({ user, socket, room, messages, setMessages }) {
  const [message, setMessage] = useState("");

  const addMessage = (e) => {
    e.preventDefault();

    // Create a new message object
    const newMessage = {
      message: message,
      room_id: room.room_id,
      user_id: user.user_id,
    };

    // Send message to WebSocket server
    socket.emit("new_message", newMessage);

    // Update messages state with the new message
    // setMessages([...messages, newMessage]);

    // Reset the message input field
    setMessage("");
  };

  return (
    <form
      id="form-container"
      onSubmit={(e) => {
        addMessage(e);
      }}
    >
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
