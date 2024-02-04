import React, { useState, useEffect } from "react";
import ChatCard from "./ChatCard";
function Chat({ room }) {
  const [messages, setMessages] = useState();
  const url = "http://127.0.0.1:5555";
  useEffect(() => {
    fetch(`${url}/messages/${room.room_id}`)
      .then((res) => res.json())
      .then((messages) => {
        setMessages(messages);
        console.log("Messages:", messages);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [room]);

  return (
    <div id="chat-container">
      <ul id="chat-list">
        <h1>Chat Room: {room.room_name}</h1>
        {messages &&
          messages.map((message) => (
            <ChatCard key={message.message_id} message={message.message} />
          ))}
        <input placeholder="Message" id="chat-input"></input>
      </ul>
    </div>
  );
}

export default Chat;
