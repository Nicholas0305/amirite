import React from "react";
function ChatRoomCard({ room, toggleComponent }) {
  return (
    <div onClick={() => toggleComponent(room)}>
      <li className="card">
        <h3>{room.room_name}</h3>
        <p>{"Description: " + room.description}</p>
        {room.participants && <p>{"People: " + room.participants.length}</p>}
        <p>{"Created on: " + room.created_at}</p>
      </li>
    </div>
  );
}
export default ChatRoomCard;
