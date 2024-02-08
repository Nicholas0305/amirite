import React, { useState, useEffect, useRef } from "react";
import ChatCard from "./ChatCard";
import MessageInput from "./MessageInput";

function Chat({ room }) {
  const [messages, setMessages] = useState([]);
  const url = "http://127.0.0.1:5555";
  const chatListRef = useRef(null);

  const scrollToBottom = () => {
    chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
  };

  useEffect(() => {
    fetch(`${url}/messages/${room.room_id}`)
      .then((res) => res.json())
      .then((messages) => {
        setMessages(messages);
        console.log("Messages:", messages);
        scrollToBottom();
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [room]);

  return (
    <div id="chat-container">
      <ul id="chat-list" ref={chatListRef}>
        <h1>Chat Room: {room.room_name}</h1>
        {messages &&
          messages.map((message) => (
            <ChatCard key={message.message_id} message={message.message} />
          ))}

        <MessageInput
          url={url}
          room={room}
          messages={messages}
          setMessages={setMessages}
        />
      </ul>
    </div>
  );
}

export default Chat;
