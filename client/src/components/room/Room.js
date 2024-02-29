import React, { useState, useEffect, useRef } from "react";
import Message from "./Message";
import MessageInput from "./MessageInput";
import io from "socket.io-client";
import { useLocation, useNavigate } from "react-router-dom";

const socket = io("http://127.0.0.1:5555"); // Replace with your Flask server URL

function Room() {
  const location = useLocation();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [edit, setEdit] = useState(false);
  const [user, setUser] = useState(location.state?.user); // Initialize user state as null
  const [room, setRoom] = useState(location.state?.room);
  const messageListRef = useRef(null);
  useEffect(() => {
    // Define scrollInterval function
    const scrollInterval = () => {
      const interval = setInterval(() => {
        scrollToBottom();

        // Clear the interval after executing the scroll function once
        clearInterval(interval);
      }, 50);
    };

    // Initial message and user fetch on mount
    scrollInterval();
    fetchUsers();
    socket.emit("fetch_messages", { room_id: room.room_id });

    // Updates state on message emit
    socket.on("message", (new_message) => {
      if (room && new_message.room_id === room.room_id) {
        setMessages((prevMessages) => [...prevMessages, new_message]);
        scrollInterval(); // Call scrollInterval function here
      }
    });

    socket.on("fetched_messages", (fetchedMessages) => {
      setMessages(fetchedMessages);
    });

    // Clean up event listeners when component unmounts
    return () => {
      socket.off("message");
      socket.off("fetched_messages");
    };
  }, [room]); // Re-run effect when room changes

  const fetchUsers = () => {
    fetch("http://127.0.0.1:5555/users")
      .then((res) => res.json())
      .then((users) => {
        setUsers(users);
      })
      .catch((error) => console.error("Error fetching users:", error));
  };

  const scrollToBottom = () => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  };

  const getMessageUserName = (userId) => {
    const user = users.find((user) => user.user_id === userId);
    return user ? user.username : "Unknown User";
  };

  const addMessage = (message) => {
    if (room) {
      socket.emit("new_message", {
        message,
        room_id: room.room_id,
        user_id: user.user_id,
      });
    }
  };
  const handleNavigate = () => {
    navigate("/MainPage", { state: { user } });
  };
  return (
    <div id="room-container">
      <div id="room-header">
        <h1 onClick={handleNavigate}>{"<"}</h1>
        <h1>{room && room.room_name}</h1>
      </div>
      <ul id="message-list" ref={messageListRef}>
        {messages.length > 0 &&
          messages.map((message, index) => (
            <div id="message-container" key={index}>
              <p id="message-username">{getMessageUserName(message.user_id)}</p>
              <Message
                key={message.message_id} // This key might not be needed inside ChatCard
                message={message}
                user={user}
                edit={edit}
              />
            </div>
          ))}
      </ul>
      <div id="message-input-container">
        <MessageInput
          user={user}
          socket={socket}
          room={room}
          messages={messages}
          setMessages={setMessages}
          addMessage={addMessage}
          scrollToBottom={scrollToBottom}
        />
      </div>
    </div>
  );
}

export default Room;
