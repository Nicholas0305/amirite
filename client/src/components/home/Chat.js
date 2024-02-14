// Chat.js
import React, { useState, useEffect } from "react";
import ChatCard from "./ChatCard";
import MessageInput from "./MessageInput";
import io from "socket.io-client";

const socket = io("http://127.0.0.1:5555"); // Replace with your Flask server URL

function Chat({ room, user }) {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    // WebSocket event listeners
    socket.on("connect", () => {
      console.log("Connected to WebSocket server");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from WebSocket server");
    });

    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
      console.log(message);
    });

    // Fetch initial messages when component mounts
    socket.emit("fetch_messages", { room_id: room.room_id });

    socket.on("fetched_messages", (fetchedMessages) => {
      setMessages(fetchedMessages);
    });

    return () => {
      // Clean up event listeners
      socket.disconnect();
    };
  }, []); // Re-run effect when room changes

  return (
    <div id="chat-container">
      <ul id="chat-list">
        <div id="chatRoomName">
          <h1>Chat Room: {room.room_name}</h1>
        </div>
        {messages.length > 0 &&
          messages.map((message, index) => (
            <div key={index}>
              <p id="username">{message.username}</p>
              <ChatCard
                key={message.message_id} // This key might not be needed inside ChatCard
                message={message}
                user={user}
                edit={edit}
              />
            </div>
          ))}

        {edit && <input></input>}
        <MessageInput user={user} socket={socket} room={room} />
      </ul>
    </div>
  );
}

export default Chat;
