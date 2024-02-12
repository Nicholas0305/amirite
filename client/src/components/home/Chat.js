import React, { useState, useEffect } from "react";
import ChatCard from "./ChatCard";
import MessageInput from "./MessageInput";
import EditMessageButton from "./EditMessageButton";
function Chat({ room, user }) {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const url = "http://127.0.0.1:5555";
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    fetch(`${url}/messages/${room.room_id}`)
      .then((res) => res.json())
      .then((messages) => {
        setMessages(messages);
      })
      .catch((error) => console.error("Error fetching messages:", error));

    fetch(`${url}/users`)
      .then((res) => res.json())
      .then((users) => {
        setUsers(users);
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, [room]);

  const getMessageUserName = (userId) => {
    const user = users.find((user) => user.user_id === userId);
    return user ? user.username : "Unknown User";
  };

  const isCurrentUserMessage = (messageUserId) => {
    return messageUserId === user.user_id;
  };
  const handleEditClick = () => {
    setEdit((prev) => !prev);
    console.log("clicked");
  };

  return (
    <div id="chat-container">
      <ul id="chat-list">
        <div id="chatRoomName">
          <h1>Chat Room: {room.room_name}</h1>
        </div>
        {messages.length > 0 &&
          messages.map((message) => (
            <div key={message.message_id}>
              <p id="username">{getMessageUserName(message.user_id)}</p>
              <ChatCard
                key={message.message_id}
                message={message}
                user={user}
                edit={edit}
                id={message.message_id}
              />
              {isCurrentUserMessage(message.user_id) && (
                <button onClick={handleEditClick}>Edit</button>
              )}
            </div>
          ))}
        {edit && <input></input>}
        <MessageInput
          url={url}
          room={room}
          messages={messages}
          setMessages={setMessages}
          user={user}
        />
      </ul>
    </div>
  );
}

export default Chat;
