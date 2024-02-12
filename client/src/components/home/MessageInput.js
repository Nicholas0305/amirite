import React, { useState } from "react";

function MessageInput({ room, setMessages, user }) {
  const [message, setMessage] = useState("");
  const url = "http://127.0.0.1:5555";

  function addMessage(e) {
    e.preventDefault();

    fetch(`${url}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: message,
        room_id: room.room_id,
        user_id: user.user_id,
      }),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Message sent successfully");
          return response.json();
        } else {
          console.error("Failed to send message");
          throw new Error("Failed to send message");
        }
      })
      .then((data) => {
        setMessages((prevMessages) => [...prevMessages, data]);

        console.log("message state");
        setMessage("");
      })
      .catch((error) => {
        console.error("Error sending message:", error);
      });
  }

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
