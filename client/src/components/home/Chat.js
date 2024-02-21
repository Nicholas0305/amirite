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
    // Set up WebSocket event listeners

    socket.on("message", (new_message) => {
      if (new_message.room_id == room.room_id) {
        setMessages((prevMessages) => [...prevMessages, new_message]);
      }
    });

    socket.on("fetched_messages", (fetchedMessages) => {
      setMessages(fetchedMessages);
    });

    // Fetch initial messages when component mounts
    socket.emit("fetch_messages", { room_id: room.room_id });

    // Fetch users when room changes
    fetchUsers();

    // Clean up event listeners when component unmounts
    return () => {
      socket.off("message");
      socket.off("fetched_messages");
    };
  }, [room, socket]); // Re-run effect when room changes

  const fetchUsers = () => {
    fetch("http://127.0.0.1:5555/users")
      .then((res) => res.json())
      .then((users) => {
        setUsers(users);
      })
      .catch((error) => console.error("Error fetching users:", error));
  };

  const getMessageUserName = (userId) => {
    const user = users.find((user) => user.user_id === userId);
    return user ? user.username : "Unknown User";
  };
  const addMessage = (message) => {
    socket.emit("new_message", {
      message,
      room_id: room.room_id,
      user_id: user.user_id,
    });
  };

  return (
    <div id="chat-container">
      <ul id="chat-list">
        <div id="chatRoomName">
          <h1>Chat Room: {room.room_name}</h1>
        </div>
        {messages.length > 0 &&
          messages.map((message, index) => (
            <div key={index}>
              <p id="username">{getMessageUserName(message.user_id)}</p>
              <ChatCard
                key={message.message_id} // This key might not be needed inside ChatCard
                message={message}
                user={user}
                edit={edit}
              />
            </div>
          ))}
        {edit && <input></input>}
        <MessageInput
          user={user}
          socket={socket}
          room={room}
          messages={messages}
          setMessages={setMessages}
          addMessage={addMessage}
        />
      </ul>
    </div>
  );
}

export default Chat;
