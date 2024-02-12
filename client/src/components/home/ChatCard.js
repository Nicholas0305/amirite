import React from "react";
function ChatCard({ message, users }) {
  return (
    <li>
      <p>{message.message}</p>
    </li>
  );
}
export default ChatCard;
