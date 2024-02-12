import React from "react";
function ChatCard({ message, edit, id }) {
  return (
    <li>
      <p>{message.message}</p>
    </li>
  );
}
export default ChatCard;
